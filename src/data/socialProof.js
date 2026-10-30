// Statistics, client testimonials and events.
//
// ONLY REAL, VERIFIABLE INFORMATION BELONGS HERE. Publishing invented figures,
// reviews or events would mislead customers (and fake reviews are illegal in
// many countries). While a list is empty, its section is not shown at all;
// as soon as real entries are added, the section appears on the site.
//
// Entry formats:
//   stats:        { value: 120, suffix: "+", label: { en: "Projects completed", ur: "مکمل شدہ منصوبے" } }
//   testimonials: { quote: { en, ur }, name: "Client name (with permission)", context: { en, ur } }
//   events:       { title: { en, ur }, date: "2026-03-10", location: { en, ur }, text: { en, ur }, image: "imageKey" }

import { serviceAreas } from "@/data/serviceAreas";
import { verifiedServices } from "@/data/services";

// Experience confirmed by the owner (October 2026); the other figures are counted from the site's own data.
export const stats = [
  { value: 20, suffix: "+", label: { en: "Years of experience", ur: "سال کا تجربہ" } },
  { value: Math.floor(serviceAreas.length / 10) * 10, suffix: "+", label: { en: "Karachi areas covered", ur: "کراچی کے علاقے" } },
  { value: verifiedServices.length, label: { en: "Tile and marble services", ur: "ٹائل اور ماربل کی خدمات" } },
  { text: "24/7", label: { en: "Open, every day", ur: "ہر روز کھلا" } },
];

export const testimonials = [];

export const events = [];
