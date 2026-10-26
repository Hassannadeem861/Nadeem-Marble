/**
 * Search Console ka poora SEO data pull karke gsc_full_report.md banata hai.
 *
 * Usage:
 *   node gsc_full.mjs <SITE_URL> [days] [rows]
 *
 * Example:
 *   node gsc_full.mjs https://nadeem-marble.vercel.app/
 */
import { google } from "googleapis";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";

const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"];
const DIR = path.dirname(fileURLToPath(import.meta.url));
const CREDS = path.join(DIR, "credentials.json");
const TOKEN = path.join(DIR, "token.json");
const OUT = path.join(DIR, "gsc_full_report.md");
const MAX_INSPECT = 60; // kitne URLs ka index status check karna hai

/* ---------- Login ---------- */
function openBrowser(url) {
  const cmd =
    process.platform === "win32"
      ? `start "" "${url}"`
      : process.platform === "darwin"
      ? `open "${url}"`
      : `xdg-open "${url}"`;
  exec(cmd, () => {});
}

function readClientInfo() {
  const raw = JSON.parse(fs.readFileSync(CREDS, "utf8"));
  const c = raw.installed || raw.web;
  return { clientId: c.client_id, clientSecret: c.client_secret };
}

function login() {
  const { clientId, clientSecret } = readClientInfo();
  return new Promise((resolve, reject) => {
    let client;
    const server = http.createServer(async (req, res) => {
      const url = new URL(req.url, "http://localhost");
      const code = url.searchParams.get("code");
      if (!code) {
        res.statusCode = 404;
        res.end();
        return;
      }
      try {
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);
        fs.writeFileSync(TOKEN, JSON.stringify(tokens, null, 2));
        res.end("Login ho gaya. Ye tab band kar sakte ho.");
        server.close();
        resolve(client);
      } catch (e) {
        res.end("Login fail hua. Terminal dekho.");
        server.close();
        reject(e);
      }
    });
    server.listen(0, () => {
      const port = server.address().port;
      client = new google.auth.OAuth2(clientId, clientSecret, `http://localhost:${port}`);
      const authUrl = client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
        prompt: "consent",
      });
      console.log("Browser khul raha hai. Agar na khule to ye link kholo:\n" + authUrl);
      openBrowser(authUrl);
    });
  });
}

async function authorize() {
  if (!fs.existsSync(TOKEN)) return login();
  const { clientId, clientSecret } = readClientInfo();
  const client = new google.auth.OAuth2(clientId, clientSecret);
  client.setCredentials(JSON.parse(fs.readFileSync(TOKEN, "utf8")));
  client.on("tokens", (t) => {
    const old = JSON.parse(fs.readFileSync(TOKEN, "utf8"));
    fs.writeFileSync(TOKEN, JSON.stringify({ ...old, ...t }, null, 2));
  });
  return client;
}

/* ---------- Helpers ---------- */
const fmt = (d) => d.toISOString().slice(0, 10);
const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function mdTable(title, headers, rows, note) {
  const lines = [`## ${title}`, ""];
  if (note) lines.push(note, "");
  if (!rows.length) {
    lines.push("_Koi data nahi mila._", "");
    return lines.join("\n");
  }
  lines.push(`| ${headers.join(" | ")} |`, `|${headers.map(() => "---").join("|")}|`);
  for (const r of rows) lines.push(`| ${r.join(" | ")} |`);
  lines.push("");
  return lines.join("\n");
}

// Errors ek section ko tod na dein; sirf invalid_grant dobara login ke liye bahar jaye
async function safe(name, fn) {
  try {
    return await fn();
  } catch (e) {
    const msg = String(e?.message || e);
    if (msg.includes("invalid_grant")) throw e;
    console.log(`  (skip) ${name}: ${msg}`);
    return `## ${name}\n\n_Is section mein error aaya: ${msg}_\n`;
  }
}

/* ---------- Search Analytics ---------- */
async function perf(sc, site, dims, start, end, rowLimit) {
  const requestBody = { startDate: start, endDate: end, rowLimit };
  if (dims.length) requestBody.dimensions = dims;
  const res = await sc.searchanalytics.query({ siteUrl: site, requestBody });
  return res.data.rows || [];
}

const clean = (v, site) => String(v).replace(site, "/").replace(/\|/g, "/");
const metricCells = (r) => [
  r.clicks,
  r.impressions,
  (r.ctr * 100).toFixed(1),
  r.position.toFixed(1),
];
const toRow = (r, site) => [...(r.keys || []).map((k) => clean(k, site)), ...metricCells(r)];

/* ---------- Sitemaps + Index status ---------- */
async function fetchText(u) {
  const r = await fetch(u);
  if (!r.ok) throw new Error(`${u} -> ${r.status}`);
  return r.text();
}
const locs = (xml) => [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1]);

async function sitemapUrls(paths) {
  const urls = new Set();
  for (const p of paths) {
    try {
      const xml = await fetchText(p);
      const l = locs(xml);
      if (/<sitemapindex/i.test(xml)) {
        for (const child of l.slice(0, 10)) {
          try {
            locs(await fetchText(child)).forEach((u) => urls.add(u));
          } catch {}
        }
      } else {
        l.forEach((u) => urls.add(u));
      }
    } catch {}
  }
  return [...urls];
}

/* ---------- Main report ---------- */
async function run(auth, site, days, rows) {
  const sc = google.searchconsole({ version: "v1", auth });

  const end = addDays(new Date(), -3); // GSC data mein ~2-3 din ki der hoti hai
  const start = addDays(end, -(days - 1));
  const prevEnd = addDays(start, -1);
  const prevStart = addDays(prevEnd, -(days - 1));
  const [S, E, PS, PE] = [fmt(start), fmt(end), fmt(prevStart), fmt(prevEnd)];

  const parts = [`# GSC full report: ${site}`, `Range: ${S} to ${E} (${days} din) | Pichla period: ${PS} to ${PE}`, ""];

  // 1) Summary + pichle period se comparison
  parts.push(
    await safe("Summary", async () => {
      const [cur] = await perf(sc, site, [], S, E, 1);
      const [prev] = await perf(sc, site, [], PS, PE, 1);
      const c = cur || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
      const p = prev || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
      return mdTable(
        "Summary (is period vs pichla period)",
        ["Metric", "Ab", "Pehle"],
        [
          ["Clicks", c.clicks, p.clicks],
          ["Impressions", c.impressions, p.impressions],
          ["CTR%", (c.ctr * 100).toFixed(1), (p.ctr * 100).toFixed(1)],
          ["Avg position", c.position.toFixed(1), p.position.toFixed(1)],
        ]
      );
    })
  );

  // 2) Date-wise trend
  parts.push(
    await safe("Daily trend", async () => {
      const r = await perf(sc, site, ["date"], S, E, 500);
      r.sort((a, b) => a.keys[0].localeCompare(b.keys[0]));
      return mdTable("Daily trend", ["Date", "Clicks", "Impr", "CTR%", "Pos"], r.map((x) => toRow(x, site)));
    })
  );

  // 3) Queries
  const queries = await safe("Top queries", async () => {
    const r = await perf(sc, site, ["query"], S, E, rows);
    return mdTable("Top queries", ["Query", "Clicks", "Impr", "CTR%", "Pos"], r.map((x) => toRow(x, site)));
  });
  parts.push(queries);

  // 4) Pages (aur unki list index check ke liye)
  let perfPages = [];
  parts.push(
    await safe("Top pages", async () => {
      const r = await perf(sc, site, ["page"], S, E, rows);
      perfPages = r.map((x) => x.keys[0]);
      return mdTable("Top pages", ["Page", "Clicks", "Impr", "CTR%", "Pos"], r.map((x) => toRow(x, site)));
    })
  );

  // 5) Query + page (kaun si keyword kaun se page par aa rahi hai)
  parts.push(
    await safe("Query x Page", async () => {
      const r = await perf(sc, site, ["query", "page"], S, E, rows * 2);
      const table = mdTable(
        "Query x Page (kaun si keyword kaun se page par)",
        ["Query", "Page", "Clicks", "Impr", "CTR%", "Pos"],
        r.map((x) => toRow(x, site))
      );
      // Quick wins: position 5 se 30 ke beech, impressions ke hisab se
      const wins = r
        .filter((x) => x.position >= 5 && x.position <= 30)
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 30);
      const winsTable = mdTable(
        "Quick wins (position 5-30, in par kaam karo to page 1 ke qareeb aa sakte hain)",
        ["Query", "Page", "Clicks", "Impr", "CTR%", "Pos"],
        wins.map((x) => toRow(x, site))
      );
      return table + "\n" + winsTable;
    })
  );

  // 6) Countries
  parts.push(
    await safe("Countries", async () => {
      const r = await perf(sc, site, ["country"], S, E, 20);
      return mdTable("Countries", ["Country", "Clicks", "Impr", "CTR%", "Pos"], r.map((x) => toRow(x, site)));
    })
  );

  // 7) Devices
  parts.push(
    await safe("Devices", async () => {
      const r = await perf(sc, site, ["device"], S, E, 10);
      return mdTable("Devices", ["Device", "Clicks", "Impr", "CTR%", "Pos"], r.map((x) => toRow(x, site)));
    })
  );

  // 8) Search appearance
  parts.push(
    await safe("Search appearance", async () => {
      const r = await perf(sc, site, ["searchAppearance"], S, E, 20);
      return mdTable(
        "Search appearance",
        ["Type", "Clicks", "Impr", "CTR%", "Pos"],
        r.map((x) => toRow(x, site)),
        "Khali ho to matlab abhi koi rich result / special appearance nahi mila."
      );
    })
  );

  // 9) Sitemaps
  let smPaths = [];
  parts.push(
    await safe("Sitemaps", async () => {
      const res = await sc.sitemaps.list({ siteUrl: site });
      const list = res.data.sitemap || [];
      smPaths = list.map((s) => s.path);
      const rowsOut = list.map((s) => [
        clean(s.path, site),
        (s.lastSubmitted || "").slice(0, 10),
        (s.lastDownloaded || "").slice(0, 10),
        s.errors ?? 0,
        s.warnings ?? 0,
        (s.contents || []).map((c) => `${c.type}: ${c.submitted} submitted`).join(", "),
      ]);
      return mdTable(
        "Sitemaps",
        ["Sitemap", "Submitted", "Last read", "Errors", "Warnings", "URLs"],
        rowsOut,
        "Agar yahan khali hai to Search Console mein sitemap submit nahi hui."
      );
    })
  );

  // 10) Index status (har URL ka alag check)
  parts.push(
    await safe("Index status", async () => {
      if (!smPaths.length) smPaths = [new URL("sitemap.xml", site).href];
      const fromSitemap = await sitemapUrls(smPaths);
      const all = [...new Set([...fromSitemap, ...perfPages])].slice(0, MAX_INSPECT);
      const out = [];
      for (const u of all) {
        try {
          const res = await sc.urlInspection.index.inspect({
            requestBody: { inspectionUrl: u, siteUrl: site },
          });
          const i = res.data.inspectionResult?.indexStatusResult || {};
          out.push([
            clean(u, site),
            i.verdict || "-",
            i.coverageState || "-",
            (i.lastCrawlTime || "").slice(0, 10) || "-",
            i.googleCanonical && i.googleCanonical !== u ? clean(i.googleCanonical, site) : "same",
          ]);
        } catch (e) {
          out.push([clean(u, site), "ERROR", String(e?.message || e).slice(0, 60), "-", "-"]);
        }
        await sleep(300);
      }
      return mdTable(
        `Index status (${all.length} URLs, sitemap + performance pages)`,
        ["URL", "Verdict", "Coverage", "Last crawl", "Google canonical"],
        out,
        `Sitemap mein ${fromSitemap.length} URLs mile.`
      );
    })
  );

  fs.writeFileSync(OUT, parts.join("\n"), "utf8");
  console.log(`Done -> ${OUT}`);
}

async function main() {
  const site = process.argv[2];
  if (!site) {
    console.log("Usage: node gsc_full.mjs <SITE_URL> [days] [rows]");
    process.exit(1);
  }
  const days = parseInt(process.argv[3] || "28", 10);
  const rows = parseInt(process.argv[4] || "100", 10);

  let auth = await authorize();
  try {
    await run(auth, site, days, rows);
  } catch (e) {
    if (String(e?.message || e).includes("invalid_grant")) {
      console.log("Token expire ho gaya. Dobara login karte hain...");
      fs.rmSync(TOKEN, { force: true });
      auth = await login();
      await run(auth, site, days, rows);
    } else {
      throw e;
    }
  }
}

main().catch((e) => {
  console.error("Error:", e?.message || e);
  process.exit(1);
});
