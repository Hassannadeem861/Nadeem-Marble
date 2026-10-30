// Primary navigation. Labels come from the dictionary (`nav` keys).
// Items with `menu` open a dropdown (desktop) or an expandable section (mobile).
export const mainNavigation = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services", menu: "services" },
  { key: "portfolio", href: "/portfolio", menu: "portfolio" },
  { key: "industries", href: "/industries" },
  { key: "blog", href: "/blog", menu: "blog" },
  { key: "contact", href: "/contact" },
];

// Static routes included in the sitemap (detail routes are added from data).
export const staticRoutes = ["/", "/about", "/services", "/service-areas", "/portfolio", "/industries", "/blog", "/room-visualizer", "/contact", "/privacy-policy", "/terms"];

// Services dropdown: services grouped the way customers think about them,
// each with a one-line description written for non-technical visitors.
export const serviceMenuGroups = [
  {
    title: { en: "Installation", ur: "تنصیب" },
    items: [
      { slug: "tile-installation", text: { en: "Floor and wall tiles fixed level and neat", ur: "فرش اور دیوار کی ٹائلز ہموار اور صاف" } },
      { slug: "marble-installation", text: { en: "Marble fixed with matched veins and tight joints", ur: "ملی دھاریوں اور تنگ جوڑوں کے ساتھ ماربل" } },
      { slug: "marble-flooring", text: { en: "Polished or honed marble floors for homes", ur: "گھروں کے لیے پالش یا ہونڈ ماربل فرش" } },
      { slug: "bathroom-tile-and-marble-installation", text: { en: "Showers, floors and walls with proper falls", ur: "درست ڈھلوان کے ساتھ شاور، فرش اور دیواریں" } },
      { slug: "kitchen-tile-and-marble-installation", text: { en: "Splashbacks and floors lined up with cabinets", ur: "کیبنٹس کی سیدھ میں اسپلیش بیک اور فرش" } },
      { slug: "staircases-and-custom-marble-work", text: { en: "Stair treads, sills and made-to-measure stone", ur: "سیڑھیاں، سِل اور ناپ کے مطابق پتھر" } },
      { slug: "wall-cladding-and-feature-walls", text: { en: "Marble feature walls, TV walls and receptions", ur: "ماربل کی نمایاں دیواریں، ٹی وی وال اور استقبالیہ" } },
    ],
  },
  {
    title: { en: "Design & planning", ur: "ڈیزائن اور منصوبہ بندی" },
    items: [
      { slug: "2d-3d-surface-modelling", text: { en: "See your floor in 2D/3D before work starts", ur: "کام سے پہلے فرش 2D/3D میں دیکھیں" } },
      { slug: "surface-design", text: { en: "Tile and marble designs that suit your space", ur: "آپ کی جگہ کے مطابق ٹائل اور ماربل ڈیزائن" } },
      { slug: "pattern-and-layout-planning", text: { en: "Herringbone, borders and balanced cuts", ur: "ہیرنگ بون، بارڈر اور متوازن کٹنگ" } },
    ],
  },
  {
    title: { en: "Care & materials", ur: "دیکھ بھال اور مٹیریل" },
    items: [
      { slug: "marble-polishing-and-restoration", text: { en: "Bring dull or scratched marble back to life", ur: "مدھم یا خراش زدہ ماربل کو نیا بنائیں" } },
      { slug: "tile-and-marble-supply", text: { en: "Help choosing and sourcing the right material", ur: "درست مٹیریل کے انتخاب اور حصول میں مدد" } },
    ],
  },
];

// One-line descriptions for the Design Ideas and Blog category links.
export const categoryMenuText = {
  portfolio: {
    residential: { en: "Homes, apartments and villas", ur: "گھر، اپارٹمنٹس اور ولاز" },
    commercial: { en: "Offices, lobbies and hotels", ur: "دفاتر، لابیاں اور ہوٹل" },
    flooring: { en: "Marble and tile floors", ur: "ماربل اور ٹائل کے فرش" },
    bathrooms: { en: "Showers, vanities and walls", ur: "شاور، وینٹی اور دیواریں" },
    kitchens: { en: "Islands, splashbacks and floors", ur: "آئی لینڈ، اسپلیش بیک اور فرش" },
    "marble-work": { en: "Feature walls, stairs and details", ur: "نمایاں دیواریں، سیڑھیاں اور تفصیلات" },
  },
  blog: {
    choosing: { en: "Marble types, tiles vs marble", ur: "ماربل کی اقسام، ٹائلز بمقابلہ ماربل" },
    care: { en: "Cleaning and protecting stone", ur: "پتھر کی صفائی اور حفاظت" },
    planning: { en: "Sizes, patterns and quantities", ur: "سائز، پیٹرن اور مقدار" },
  },
};
