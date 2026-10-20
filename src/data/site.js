// Core business facts. Only information supplied by Nadeem Marbles belongs here.
// Fields set to null are unknown and are hidden from the site and from
// structured data until the business supplies them.

export const site = {
  name: "Nadeem Marbles",
  tagline: { en: "Tiles | Marble | Quality Work", ur: "ٹائلز | ماربل | معیاری کام" },
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://nadeem-marble.vercel.app").replace(/\/$/, ""),

  phone: "+923151283438",
  phoneDisplay: "+92 315 1283438",
  email: "m.hassan.nadeem987@gmail.com",
  // wa.me requires the number without "+" or spaces.
  // TODO(client): confirm this number is registered on WhatsApp.
  whatsappNumber: "923164593747",
  whatsappDisplay: "+92 316 4593747",

  // TODO(client): supply before publishing; these stay hidden while null.
  owner: { name: null, role: { en: "Founder", ur: "بانی" } },
  address: "2/2 Reta Plot, Shah Faisal Colony, Shah Faisal Town, Karachi, 75230",
  // Confirmed: open 24 hours, Monday through Sunday.
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  // Primary: all of Karachi. Secondary: other cities in Pakistan (no specific cities confirmed).
  serviceAreas: [
    { "@type": "City", name: "Karachi" },
    { "@type": "Country", name: "Pakistan" },
  ],
  foundingYear: null,
  socialProfiles: [],
};

export const telHref = `tel:${site.phone}`;
export const mailHref = `mailto:${site.email}`;

export function whatsappHref(message) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Stable Google Maps search link built from the address text, rather than a
// share.google short link (those can expire or be revoked by the owner).
export const mapsHref = site.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}` : null;

// No-API-key embed URL for the <iframe> map on the Contact page.
export const mapsEmbedHref = site.address ? `https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed` : null;
