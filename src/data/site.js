// Core business facts. Only information supplied by Nadeem Marbles belongs here.
// Fields set to null are unknown and are hidden from the site and from
// structured data until the business supplies them.

export const site = {
  name: "Nadeem Marbles",
  tagline: { en: "Tiles | Marble | Quality Work", ur: "ٹائلز | ماربل | معیاری کام" },
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://nadeem-marble.vercel.app").replace(/\/$/, ""),

  phone: "+923151283438",
  phoneDisplay: "+92 315 1283438",
  email: "marblesnadeem@gmail.com",
  // wa.me requires the number without "+" or spaces.
  // TODO(client): confirm this number is registered on WhatsApp.
  whatsappNumber: "923164593747",
  whatsappDisplay: "+92 316 4593747",

  // TODO(client): supply before publishing; these stay hidden while null.
  owner: { name: "Muhammad Nadeem", role: { en: "Founder", ur: "بانی" } },
  address: "Reta Plot, Shah Faisal Colony, Sector 23, Karachi 75230",
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
  socialProfiles: ["https://www.facebook.com/profile.php?id=61595722965428"],
  // Google Business Profile (owner-supplied link) and its map pin, as Google Maps shows it.
  googleBusiness: {
    shareUrl: "https://maps.app.goo.gl/sVjQrGdRx7nybseh7",
    cid: "11104969176550638531",
    geo: { latitude: 24.877503, longitude: 67.154444 },
  },
};

export const telHref = `tel:${site.phone}`;
export const mailHref = `mailto:${site.email}`;

export function whatsappHref(message) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// The CID link opens the Google Business listing itself (directions, call,
// reviews) and does not expire the way short share links can.
export const mapsHref = `https://maps.google.com/?cid=${site.googleBusiness.cid}`;

// No-API-key embed for the Contact page, centred on the listing's own pin.
const { latitude, longitude } = site.googleBusiness.geo;
export const mapsEmbedHref = `https://www.google.com/maps?q=${latitude},${longitude}&z=17&output=embed`;
