import { site } from "@/data/site";

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";
const BUSINESS_TIMEZONE = "Asia/Karachi";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/;
const TIMEZONE_PATTERN = /^[A-Za-z0-9_+\-/]{1,64}$/;
const LIMITS = { name: 100, phone: 30, email: 254, enquiry: 120, propertyType: 120, location: 120, message: 3000, pageUrl: 500 };
// Humans take longer than this to fill the form; most bots submit instantly.
const MIN_FILL_MS = 3000;
// Best effort only: serverless instances do not share this memory.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const recentByIp = new Map();
const UNAVAILABLE = "Not available";

function rateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const recent = (recentByIp.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  recent.push(now);
  recentByIp.set(ip, recent);
  return recent.length > RATE_MAX;
}

function text(value, max) {
  if (value == null) return "";
  if (typeof value !== "string" || value.length > max) return null;
  return value.trim();
}

function decodedHeader(request, name) {
  const value = request.headers.get(name);
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function clientIp(request) {
  return request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0].trim() || null;
}

function samePageUrl(value, request) {
  try {
    const url = new URL(value);
    const allowed = new Set([new URL(site.url).origin, new URL(request.url).origin]);
    return allowed.has(url.origin) ? url.href : null;
  } catch {
    return null;
  }
}

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

export async function POST(request) {
  const config = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_PUBLIC_KEY,
    accessToken: process.env.EMAILJS_PRIVATE_KEY,
  };
  if (Object.values(config).some((value) => !value)) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot or instant submission: answer as if sent so bots learn nothing.
  if (body?.website || typeof body?.elapsedMs !== "number" || body.elapsedMs < MIN_FILL_MS) {
    return Response.json({ ok: true });
  }

  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const fields = Object.fromEntries(Object.entries(LIMITS).map(([key, max]) => [key, text(body[key], max)]));
  const invalid =
    Object.values(fields).some((value) => value === null) ||
    !fields.name ||
    !fields.enquiry ||
    (!fields.phone && !fields.email) ||
    (fields.phone && !PHONE_PATTERN.test(fields.phone)) ||
    (fields.email && !EMAIL_PATTERN.test(fields.email));
  if (invalid) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Vercel derives these from the connecting IP; they are approximate and absent elsewhere.
  const onVercel = Boolean(process.env.VERCEL);
  const city = onVercel ? decodedHeader(request, "x-vercel-ip-city") : null;
  const country = onVercel ? decodedHeader(request, "x-vercel-ip-country") : null;
  const region = onVercel ? decodedHeader(request, "x-vercel-ip-country-region") : null;
  const ipTimezone = onVercel ? decodedHeader(request, "x-vercel-ip-timezone") : null;
  const browserTimezone = typeof body.browserTimezone === "string" && TIMEZONE_PATTERN.test(body.browserTimezone) ? body.browserTimezone : null;
  const pageUrl = fields.pageUrl ? samePageUrl(fields.pageUrl, request) : null;

  const now = new Date();
  const submittedAt = `${new Intl.DateTimeFormat("en-GB", { timeZone: BUSINESS_TIMEZONE, dateStyle: "full", timeStyle: "long" }).format(now)} (${BUSINESS_TIMEZONE}) | ${now.toISOString()}`;
  const ipLocation = [city, region, country].filter(Boolean).join(", ");

  const rows = [
    ["Name", fields.name],
    ["Email", fields.email || "Not provided"],
    ["Phone", fields.phone || "Not provided"],
    ["Enquiry", fields.enquiry],
    ["Property type", fields.propertyType || "Not provided"],
    ["Project location (entered by visitor)", fields.location || "Not provided"],
    ["Message", fields.message || "Not provided"],
    ["Submitted at", submittedAt],
    ["Page URL (reported by browser)", pageUrl ?? UNAVAILABLE],
    ["IP address", onVercel && ip ? ip : UNAVAILABLE],
    ["Approximate location (from IP, not verified)", ipLocation ? ipLocation : UNAVAILABLE],
    ["Region code (from IP)", country && region ? `${country}-${region}` : UNAVAILABLE],
    ["Timezone (from IP)", ipTimezone ?? UNAVAILABLE],
    ["Timezone (reported by browser)", browserTimezone ?? UNAVAILABLE],
  ];

  const summaryHtml = `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top" style="border-bottom:1px solid #ddd;white-space:nowrap">${escapeHtml(label)}</th><td style="border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table>`;

  const response = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...config,
      template_params: {
        subject: `Website enquiry from ${fields.name}`,
        from_name: fields.name,
        reply_to: fields.email,
        summary_html: summaryHtml,
        summary_text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
      },
    }),
  }).catch(() => null);

  if (!response?.ok) {
    console.error("contact: EmailJS send failed", response?.status ?? "network error");
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
