// Portfolio entries.
//
// IMPORTANT: every entry below is a DESIGN IDEA built from licensed stock
// photography, not a completed Nadeem Marbles project. The section is presented
// as "Design Ideas" (nav, headings, summaries "A concept for..."), so it must
// never be renamed to imply finished work while these photos are used.
// When real projects are available, add them with illustrative: false and
// real photos, and consider a separate "Projects" section for them.

export const projectCategories = [
  { id: "residential", label: { en: "Residential", ur: "رہائشی" } },
  { id: "commercial", label: { en: "Commercial", ur: "کمرشل" } },
  { id: "flooring", label: { en: "Flooring", ur: "فرش" } },
  { id: "bathrooms", label: { en: "Bathrooms", ur: "باتھ روم" } },
  { id: "kitchens", label: { en: "Kitchens", ur: "کچن" } },
  { id: "marble-work", label: { en: "Marble Work", ur: "ماربل کا کام" } },
];

export const projects = [
  {
    slug: "gold-vein-marble-kitchen",
    illustrative: true,
    categories: ["residential", "kitchens", "marble-work"],
    cover: "kitchenGoldVein",
    gallery: ["kitchenGoldVein", "kitchenWhiteIsland", "marbleGold"],
    title: { en: "Gold-Vein Marble Kitchen", ur: "سنہری دھاریوں والا ماربل کچن" },
    summary: {
      en: "A concept for a bright family kitchen where a gold-veined island and splashback become the centrepiece.",
      ur: "ایک روشن فیملی کچن کا تصور جہاں سنہری دھاریوں والا آئی لینڈ اور دیوار مرکزی کشش بنتے ہیں۔",
    },
    approach: {
      en: [
        "Measure the island and wall runs and model them in 3D to plan where the strongest veining should sit.",
        "Continue the vein direction from the worktop up the splashback so the stone reads as one surface.",
        "Keep surrounding floor tiles calm and light so the marble remains the focus.",
      ],
      ur: [
        "آئی لینڈ اور دیواروں کی پیمائش کر کے 3D ماڈل بنانا تاکہ نمایاں ترین دھاریوں کی جگہ طے ہو۔",
        "ورک ٹاپ سے دیوار تک دھاریوں کی سمت جاری رکھنا تاکہ پتھر ایک ہی سطح لگے۔",
        "اردگرد کی فرش ٹائلز کو ہلکا اور سادہ رکھنا تاکہ توجہ ماربل پر رہے۔",
      ],
    },
    thinking: {
      en: [
        "Gold-veined marble is busy stone, so everything around it is kept quiet: plain cabinet fronts, a light floor and one strong surface. The veining is placed on the island and splashback because that is where people look and gather.",
        "A kitchen like this starts with kitchen tile and marble installation backed by 2D/3D modelling, which shows where each slab's strongest veins will land before anything is cut. Marble on a working counter will etch from lemon and vinegar over time, so it suits people who are happy with a lived-in look.",
      ],
      ur: [
        "سنہری دھاریوں والا ماربل خود بہت نمایاں ہوتا ہے، اس لیے اس کے اردگرد سب کچھ سادہ رکھا گیا ہے: سادہ کیبنٹس، ہلکا فرش اور صرف ایک نمایاں سطح۔ دھاریاں آئی لینڈ اور اسپلیش بیک پر رکھی گئی ہیں کیونکہ وہیں نظر جاتی ہے اور لوگ جمع ہوتے ہیں۔",
        "ایسا کچن، کچن ٹائل اور ماربل کی تنصیب اور 2D/3D ماڈلنگ سے شروع ہوتا ہے، جو کاٹنے سے پہلے دکھاتی ہے کہ ہر سلیب کی نمایاں دھاریاں کہاں آئیں گی۔ کام والے کاؤنٹر پر ماربل وقت کے ساتھ لیموں اور سرکے سے مدھم نشان لے لیتا ہے، اس لیے یہ ان لوگوں کے لیے ہے جنہیں استعمال کا تاثر قبول ہو۔",
      ],
    },
    services: ["kitchen-tile-and-marble-installation", "2d-3d-surface-modelling", "surface-design", "marble-installation"],
    materials: { en: ["White marble with gold veining", "Light porcelain floor tiles"], ur: ["سنہری دھاریوں والا سفید ماربل", "ہلکے رنگ کی پورسلین فرش ٹائلز"] },
  },
  {
    slug: "marble-clad-bathroom",
    illustrative: true,
    categories: ["residential", "bathrooms", "marble-work"],
    cover: "bathroomMarbleWalls",
    gallery: ["bathroomMarbleWalls", "bathroomVanity", "bathroomShower"],
    title: { en: "Full-Height Marble Bathroom", ur: "پوری اونچائی کا ماربل باتھ روم" },
    summary: {
      en: "A concept for a bathroom wrapped in large marble panels, with a floating vanity and concealed lighting.",
      ur: "بڑے ماربل پینلز سے ڈھکے باتھ روم کا تصور، تیرتی وینٹی اور چھپی ہوئی روشنی کے ساتھ۔",
    },
    approach: {
      en: [
        "Set out panel joints to line up with the vanity, mirror and shower niche.",
        "Use a slip-aware finish on the floor while keeping walls polished.",
        "Plan cut-outs for taps and lighting before panels are fixed.",
      ],
      ur: [
        "پینلز کے جوڑ وینٹی، آئینے اور شاور کے طاق کی سیدھ میں رکھنا۔",
        "دیواروں کو پالش رکھتے ہوئے فرش پر پھسلن سے محفوظ فنش استعمال کرنا۔",
        "پینل لگانے سے پہلے نلکوں اور روشنی کے لیے کٹ آؤٹ کی منصوبہ بندی۔",
      ],
    },
    thinking: {
      en: [
        "Full-height marble only looks calm when the joints line up. Large panels keep joints to a minimum, and the ones that remain are set out from the vanity and the shower so they run straight from floor to ceiling. A floating vanity and hidden lighting keep the stone as the focus and leave the floor easy to clean.",
        "This is bathroom tile and marble installation combined with wall cladding. On the floor of a wet room, a honed or textured marble finish gives much better grip than polished stone.",
      ],
      ur: [
        "فرش سے چھت تک ماربل تبھی پُرسکون لگتا ہے جب جوڑ سیدھ میں ہوں۔ بڑے پینلز سے جوڑ کم رہتے ہیں، اور باقی جوڑ وینٹی اور شاور سے ناپ کر رکھے جاتے ہیں تاکہ فرش سے چھت تک سیدھے چلیں۔ دیوار سے لگی وینٹی اور چھپی روشنی پتھر کو نمایاں رکھتی ہے اور فرش کی صفائی آسان بناتی ہے۔",
        "یہ باتھ روم ٹائل اور ماربل کی تنصیب اور دیواری کلیڈنگ کا کام ہے۔ گیلے کمرے کے فرش پر ہونڈ یا کھردرا ماربل فنش پالش شدہ پتھر سے کہیں بہتر گرفت دیتا ہے۔",
      ],
    },
    services: ["bathroom-tile-and-marble-installation", "marble-installation", "pattern-and-layout-planning", "wall-cladding-and-feature-walls"],
    materials: { en: ["Gold-veined marble wall panels", "Honed stone floor"], ur: ["سنہری دھاریوں والے ماربل دیواری پینل", "ہونڈ پتھر کا فرش"] },
  },
  {
    slug: "office-lobby-stone-floor",
    illustrative: true,
    categories: ["commercial", "flooring", "marble-work"],
    cover: "elevatorLobby",
    gallery: ["elevatorLobby", "lobbyReception", "officeLobby"],
    title: { en: "Office Lobby Stone Floor", ur: "دفتری لابی کا پتھریلا فرش" },
    summary: {
      en: "A concept for a commercial lobby with a polished light marble floor and stone-clad lift walls.",
      ur: "ایک کمرشل لابی کا تصور جس میں چمکدار ہلکا ماربل فرش اور پتھر سے ڈھکی لفٹ کی دیواریں ہیں۔",
    },
    approach: {
      en: [
        "Align floor joints with the lift doors and reception desk for a calm, ordered look.",
        "Choose a finish suited to heavy daily foot traffic.",
        "Phase the work so parts of the lobby can stay in use.",
      ],
      ur: [
        "پرسکون اور منظم تاثر کے لیے فرش کے جوڑ لفٹ کے دروازوں اور استقبالیہ کی سیدھ میں رکھنا۔",
        "روزانہ کی بھاری آمد و رفت کے مطابق فنش کا انتخاب۔",
        "کام کو مراحل میں تقسیم کرنا تاکہ لابی کا کچھ حصہ استعمال میں رہے۔",
      ],
    },
    thinking: {
      en: [
        "A lobby floor takes constant traffic and is the first thing visitors see. Light polished marble reflects light and makes the space feel larger, but the walking routes lose their shine first, so this concept assumes the floor will be re-polished from time to time.",
        "The joints are lined up with the lift doors and the entrance so the floor looks planned from the doorway. Marble flooring and marble polishing and restoration are the related services; our commercial flooring guide covers wear and slip resistance.",
      ],
      ur: [
        "لابی کا فرش مسلسل آمد و رفت برداشت کرتا ہے اور آنے والوں کی پہلی نظر اسی پر پڑتی ہے۔ ہلکا پالش شدہ ماربل روشنی منعکس کر کے جگہ کو کشادہ دکھاتا ہے، مگر چلنے کے راستوں کی چمک پہلے کم ہوتی ہے، اس لیے اس تصور میں وقتاً فوقتاً دوبارہ پالش شامل سمجھی گئی ہے۔",
        "جوڑ لفٹ کے دروازوں اور داخلی راستے کی سیدھ میں رکھے گئے ہیں تاکہ دروازے سے فرش منصوبہ بند نظر آئے۔ ماربل فلورنگ اور ماربل پالشنگ و بحالی متعلقہ خدمات ہیں؛ ہماری کمرشل فلورنگ گائیڈ گھساؤ اور پھسلن پر بات کرتی ہے۔",
      ],
    },
    services: ["marble-flooring", "marble-polishing-and-restoration", "2d-3d-surface-modelling", "marble-installation"],
    materials: { en: ["Light polished marble floor", "Stone wall cladding"], ur: ["ہلکا چمکدار ماربل فرش", "پتھر کی دیواری کلیڈنگ"] },
  },
  {
    slug: "stone-staircase",
    illustrative: true,
    categories: ["residential", "marble-work"],
    cover: "staircaseStone",
    gallery: ["staircaseStone", "staircaseCurved"],
    title: { en: "Stone Staircase & Landing", ur: "پتھر کی سیڑھی اور لینڈنگ" },
    summary: {
      en: "A concept for a staircase with stone treads, a glass balustrade and a matching marble wall.",
      ur: "پتھر کے پائیدان، شیشے کی ریلنگ اور ہم رنگ ماربل دیوار والی سیڑھی کا تصور۔",
    },
    approach: {
      en: [
        "Measure every rise and going on site so each tread sits level.",
        "Keep nosing profiles consistent from bottom to top.",
        "Match the wall stone to the treads for a continuous look.",
      ],
      ur: [
        "ہر سیڑھی کی اونچائی اور گہرائی سائٹ پر ناپنا تاکہ ہر پائیدان لیول ہو۔",
        "نیچے سے اوپر تک کناروں کی پروفائل یکساں رکھنا۔",
        "مسلسل تاثر کے لیے دیوار کے پتھر کو پائیدانوں سے ملانا۔",
      ],
    },
    thinking: {
      en: [
        "A staircase is judged edge by edge: if one nosing is thicker or one tread sits out of level, people notice it every time they walk up. The concept uses single-piece treads with the same nosing on every step and carries the marble up the wall, so the stair and the wall read as one.",
        "This is staircases and custom marble work, measured step by step because steps on site are rarely identical. On busy or outdoor stairs, a honed finish or anti-slip grooves near the edge are safer than a high polish.",
      ],
      ur: [
        "سیڑھی کو ہر کنارے سے پرکھا جاتا ہے: اگر ایک کنارہ موٹا ہو یا ایک پائیدان لیول سے ہٹا ہو تو ہر بار اوپر جاتے ہوئے نظر آتا ہے۔ اس تصور میں ہر سیڑھی پر ایک ہی ٹکڑے کا پائیدان اور ایک جیسا کنارہ ہے، اور وہی ماربل دیوار پر بھی جاری ہے تاکہ سیڑھی اور دیوار ایک لگیں۔",
        "یہ سیڑھیوں اور خصوصی ماربل کا کام ہے، جو ہر سیڑھی کی الگ پیمائش سے ہوتا ہے کیونکہ سائٹ پر سیڑھیاں شاذ و نادر ہی ایک جیسی ہوتی ہیں۔ مصروف یا باہر کی سیڑھیوں پر تیز پالش کے بجائے ہونڈ فنش یا کنارے کے قریب پھسلن روکنے والی لکیریں زیادہ محفوظ ہیں۔",
      ],
    },
    services: ["staircases-and-custom-marble-work", "2d-3d-surface-modelling"],
    materials: { en: ["Stone stair treads", "Pale marble wall"], ur: ["پتھر کے پائیدان", "ہلکے رنگ کی ماربل دیوار"] },
  },
  {
    slug: "geometric-pattern-floor",
    illustrative: true,
    categories: ["residential", "flooring"],
    cover: "tilePattern",
    gallery: ["tilePattern", "installTrowel"],
    title: { en: "Geometric Pattern Tile Floor", ur: "جیومیٹرک ڈیزائن والا ٹائل فرش" },
    summary: {
      en: "A concept for a decorative tiled entrance using a three-colour cube pattern centred on the doorway.",
      ur: "دروازے کے مرکز پر رکھے گئے تین رنگوں کے کیوب پیٹرن کے ساتھ آرائشی ٹائل والے داخلی راستے کا تصور۔",
    },
    approach: {
      en: [
        "Plan the pattern from the doorway centre line so it greets visitors straight on.",
        "Balance cut tiles evenly at both side walls.",
        "Frame the pattern with a plain border to finish the edges cleanly.",
      ],
      ur: [
        "پیٹرن کو دروازے کی مرکزی لائن سے ترتیب دینا تاکہ آنے والوں کے سامنے سیدھا نظر آئے۔",
        "دونوں دیواروں پر کٹی ٹائلوں کا یکساں توازن۔",
        "کناروں کو صاف رکھنے کے لیے سادہ بارڈر سے پیٹرن کو گھیرنا۔",
      ],
    },
    thinking: {
      en: [
        "A cube pattern plays tricks on the eye, so a small mistake in the set-out becomes very obvious. The pattern starts from the centre of the doorway so it looks symmetrical as you walk in, and the cuts at both walls are kept the same width.",
        "This is pattern and layout planning followed by tile fixing. Our tile layout patterns guide explains why patterned floors need more spare tiles than a straight layout.",
      ],
      ur: [
        "کیوب پیٹرن آنکھ کو دھوکا دیتا ہے، اس لیے ترتیب میں چھوٹی سی غلطی بھی صاف نظر آتی ہے۔ پیٹرن دروازے کے مرکز سے شروع کیا گیا ہے تاکہ اندر آتے ہوئے متوازن لگے، اور دونوں دیواروں پر کٹنگ کی چوڑائی برابر رکھی گئی ہے۔",
        "یہ پیٹرن اور لے آؤٹ کی منصوبہ بندی کے بعد ٹائل فکسنگ کا کام ہے۔ ہماری ٹائل لے آؤٹ پیٹرن گائیڈ بتاتی ہے کہ پیٹرن والے فرش کو سیدھے لے آؤٹ سے زیادہ اضافی ٹائلیں کیوں چاہییں۔",
      ],
    },
    services: ["pattern-and-layout-planning", "tile-installation"],
    materials: { en: ["Patterned ceramic tiles", "Plain border tiles"], ur: ["ڈیزائن والی سیرامک ٹائلز", "سادہ بارڈر ٹائلز"] },
  },
  {
    slug: "hotel-reception-onyx",
    illustrative: true,
    categories: ["commercial", "marble-work"],
    cover: "receptionStone",
    gallery: ["receptionStone", "heroLobby", "hospitalityCorridor"],
    title: { en: "Back-Lit Stone Reception", ur: "پیچھے سے روشن پتھر کا استقبالیہ" },
    summary: {
      en: "A concept for a hospitality reception with a glowing stone counter front and warm stone corridors.",
      ur: "مہمان نوازی کے استقبالیہ کا تصور، روشن پتھر کے کاؤنٹر اور گرم رنگ کی پتھریلی راہداریوں کے ساتھ۔",
    },
    approach: {
      en: [
        "Coordinate the stone panels with the lighting installer before fixing.",
        "Book-match the counter panels so the pattern mirrors across the centre.",
        "Carry the floor finish from the lobby into the corridors for continuity.",
      ],
      ur: [
        "فکسنگ سے پہلے پتھر کے پینلز کو روشنی لگانے والوں کے ساتھ ہم آہنگ کرنا۔",
        "کاؤنٹر پینلز کو بُک میچ کرنا تاکہ ڈیزائن مرکز کے دونوں طرف آئینے کی طرح ہو۔",
        "تسلسل کے لیے لابی کا فرش راہداریوں تک جاری رکھنا۔",
      ],
    },
    thinking: {
      en: [
        "Back-lit stone is chosen for its glow, so the design starts with the light. Evenly spaced lighting behind the panels avoids bright spots, and the panels are matched so the veining flows across the whole counter front.",
        "Onyx is softer and more fragile than most marble, which is why it suits a counter front or wall rather than a floor. Wall cladding and feature walls and surface design consultation are the related services.",
      ],
      ur: [
        "پیچھے سے روشن پتھر اپنی چمک کے لیے چنا جاتا ہے، اس لیے ڈیزائن روشنی سے شروع ہوتا ہے۔ پینلز کے پیچھے برابر فاصلے پر روشنی تیز دھبوں سے بچاتی ہے، اور پینلز اس طرح ملائے جاتے ہیں کہ دھاریاں پورے کاؤنٹر پر بہتی نظر آئیں۔",
        "اونکس زیادہ تر ماربل سے نرم اور نازک ہوتا ہے، اسی لیے یہ فرش کے بجائے کاؤنٹر کے سامنے یا دیوار کے لیے موزوں ہے۔ دیواری کلیڈنگ اور نمایاں دیواریں، اور سطح کے ڈیزائن کی مشاورت متعلقہ خدمات ہیں۔",
      ],
    },
    services: ["wall-cladding-and-feature-walls", "surface-design", "marble-installation"],
    materials: { en: ["Translucent onyx-style stone", "Light stone flooring"], ur: ["شفاف اونکس طرز کا پتھر", "ہلکے رنگ کا پتھریلا فرش"] },
  },
];

// All design-idea pages are indexable (owner's decision, October 2026).
export const isProjectIndexable = () => true;

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}
