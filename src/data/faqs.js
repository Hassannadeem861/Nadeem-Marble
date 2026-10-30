// Frequently asked questions, grouped by page. Answers use only information
// the business has supplied; where a detail is unknown (prices, areas served,
// timelines) the answer says so and points visitors to contact the business.
// TODO(client): review answers and add specifics (areas served, typical
// timelines, payment terms) once confirmed.
// In Urdu text, phone numbers and emails are wrapped in \u2066…\u2069
// (left-to-right isolate) so they are not reversed inside right-to-left text.

const quote = {
  q: { en: "How do I get a quote?", ur: "کوٹیشن کیسے حاصل کروں؟" },
  a: {
    en: "Call +92 315 1283438, WhatsApp +92 316 4593747, email marblesnadeem@gmail.com, or use the enquiry form on the Contact page. Photos of your space and approximate measurements help us respond more accurately.",
    ur: "\u2066+92 315 1283438\u2069 پر کال کریں، \u2066+92 316 4593747\u2069 پر واٹس ایپ کریں، \u2066marblesnadeem@gmail.com\u2069 پر ای میل کریں، یا رابطہ صفحے پر انکوائری فارم استعمال کریں۔ اپنی جگہ کی تصاویر اور اندازاً پیمائش سے ہم زیادہ درست جواب دے سکتے ہیں۔",
  },
};

const price = {
  q: { en: "How much does tile or marble work cost?", ur: "ٹائل یا ماربل کے کام پر کتنا خرچ آتا ہے؟" },
  a: {
    en: "It depends on the area, the material, the pattern and the condition of the base surface. We give a price after understanding your project, usually once the space has been measured.",
    ur: "یہ رقبے، مٹیریل، پیٹرن اور بنیادی سطح کی حالت پر منحصر ہے۔ ہم آپ کے منصوبے کو سمجھنے کے بعد، عموماً جگہ کی پیمائش کے بعد قیمت بتاتے ہیں۔",
  },
};

const areas = {
  q: { en: "Which areas do you work in?", ur: "آپ کن علاقوں میں کام کرتے ہیں؟" },
  a: {
    en: "We work across all of Karachi, and also take on projects in other cities in Pakistan. Tell us where your project is and we will discuss the details with you.",
    ur: "ہم پورے کراچی میں کام کرتے ہیں، اور پاکستان کے دیگر شہروں میں بھی منصوبے لیتے ہیں۔ اپنے منصوبے کا مقام بتائیں، ہم آپ سے تفصیلات پر بات کریں گے۔",
  },
};

const modelling = {
  q: { en: "What is 2D/3D modelling and why does it help?", ur: "2D/3D ماڈلنگ کیا ہے اور یہ کیوں مفید ہے؟" },
  a: {
    en: "We measure your actual floors and walls and draw them in 2D and 3D, so you can see the layout, the pattern and where cut tiles will fall before any material is cut. It also makes material quantities clearer.",
    ur: "ہم آپ کے اصل فرش اور دیواروں کی پیمائش کر کے انہیں 2D اور 3D میں بناتے ہیں، تاکہ کوئی مٹیریل کاٹنے سے پہلے آپ لے آؤٹ، پیٹرن اور کٹی ٹائلوں کی جگہ دیکھ سکیں۔ اس سے مٹیریل کی مقدار بھی واضح ہو جاتی ہے۔",
  },
};

const ownMaterial = {
  q: { en: "Can you install tiles or marble that I have bought myself?", ur: "کیا آپ میرا خود خریدا ہوا ٹائل یا ماربل لگا سکتے ہیں؟" },
  a: {
    en: "Tile and marble fixing is our core work. Tell us what you have bought (size, thickness and type) and we will advise on how it should be laid. Ask us if you also need help sourcing material.",
    ur: "ٹائل اور ماربل کی فکسنگ ہمارا بنیادی کام ہے۔ ہمیں بتائیں کہ آپ نے کیا خریدا ہے (سائز، موٹائی اور قسم)، ہم مشورہ دیں گے کہ اسے کیسے لگایا جائے۔ اگر مٹیریل حاصل کرنے میں بھی مدد چاہیے تو پوچھیں۔",
  },
};

const timeline = {
  q: { en: "How long does a project take?", ur: "ایک منصوبے میں کتنا وقت لگتا ہے؟" },
  a: {
    en: "It depends on the size of the area, the pattern and site conditions. We will discuss a realistic timeline with you after measuring the space.",
    ur: "یہ رقبے کے سائز، پیٹرن اور سائٹ کی حالت پر منحصر ہے۔ جگہ کی پیمائش کے بعد ہم آپ کے ساتھ حقیقت پسندانہ وقت پر بات کریں گے۔",
  },
};

export const faqs = {
  home: [quote, modelling, price, areas],
  serviceAreas: [
    areas,
    {
      q: { en: "How do I check whether you can work in my area?", ur: "میں کیسے معلوم کروں کہ آپ میرے علاقے میں کام کر سکتے ہیں؟" },
      a: {
        en: "Send us your area, what you need and, if you can, a few photos on WhatsApp or by phone. We will reply to confirm and to arrange a visit to measure.",
        ur: "واٹس ایپ یا فون پر اپنا علاقہ، کام کی تفصیل اور ہو سکے تو چند تصاویر بھیجیں۔ ہم تصدیق کے لیے اور پیمائش کی وزٹ طے کرنے کے لیے جواب دیں گے۔",
      },
    },
    {
      q: { en: "Is my area missing from the list?", ur: "کیا میرا علاقہ فہرست میں نہیں ہے؟" },
      a: {
        en: "The list shows common areas to help you find yours; it is not complete. We work across all of Karachi, so please ask even if your area is not shown.",
        ur: "یہ فہرست صرف عام علاقے دکھاتی ہے تاکہ آپ اپنا علاقہ ڈھونڈ سکیں؛ یہ مکمل نہیں۔ ہم پورے کراچی میں کام کرتے ہیں، اس لیے آپ کا علاقہ نظر نہ آئے تب بھی پوچھ لیں۔",
      },
    },
    quote,
    price,
  ],
  about: [
    {
      q: { en: "What does Nadeem Marbles do?", ur: "ندیم ماربلز کیا کرتا ہے؟" },
      a: {
        en: "We work with tiles and marble: 2D/3D modelling from site measurements, surface design, pattern and layout planning, and proper fixing and finishing.",
        ur: "ہم ٹائلز اور ماربل کے ساتھ کام کرتے ہیں: سائٹ کی پیمائش سے 2D/3D ماڈلنگ، سطح کا ڈیزائن، پیٹرن اور لے آؤٹ کی منصوبہ بندی، اور درست فکسنگ و فنشنگ۔",
      },
    },
    {
      q: { en: "Who will I deal with?", ur: "میں کس سے بات کروں گا؟" },
      a: {
        en: "You contact the business directly by phone, WhatsApp or email to discuss your project.",
        ur: "آپ اپنے منصوبے پر بات کرنے کے لیے فون، واٹس ایپ یا ای میل کے ذریعے براہِ راست کاروبار سے رابطہ کرتے ہیں۔",
      },
    },
    {
      q: { en: "What standards do you hold your team to?", ur: "آپ اپنی ٹیم کو کن معیارات پر رکھتے ہیں؟" },
      a: {
        en: "Quality work completed on time, responsibility and teamwork, and special care for cleanliness and finishing.",
        ur: "وقت پر مکمل ہونے والا معیاری کام، ذمہ داری اور ٹیم ورک، اور صفائی و فنشنگ کا خاص خیال۔",
      },
    },
  ],
  services: [modelling, ownMaterial, price, timeline],
  portfolio: [
    {
      q: { en: "Can you create a design similar to one of these concepts?", ur: "کیا آپ ان تصورات میں سے کسی جیسا ڈیزائن بنا سکتے ہیں؟" },
      a: {
        en: "Yes, share the concept you like along with photos of your space, and we will discuss how it could be adapted to your measurements and budget.",
        ur: "جی ہاں، جو تصور آپ کو پسند ہو وہ اپنی جگہ کی تصاویر کے ساتھ شیئر کریں، ہم بات کریں گے کہ اسے آپ کی پیمائش اور بجٹ کے مطابق کیسے ڈھالا جا سکتا ہے۔",
      },
    },
    modelling,
  ],
  industries: [
    areas,
    {
      q: { en: "Do you work on commercial as well as residential projects?", ur: "کیا آپ رہائشی کے ساتھ کمرشل منصوبوں پر بھی کام کرتے ہیں؟" },
      a: {
        en: "Please tell us about your project type and size, and we will confirm whether we can take it on.",
        ur: "براہِ کرم ہمیں اپنے منصوبے کی قسم اور سائز بتائیں، ہم تصدیق کر دیں گے کہ ہم یہ کام کر سکتے ہیں یا نہیں۔",
      },
    },
    timeline,
  ],
  blog: [
    {
      q: { en: "Is marble a good choice for kitchens and bathrooms?", ur: "کیا کچن اور باتھ روم کے لیے ماربل اچھا انتخاب ہے؟" },
      a: {
        en: "It can be, with the right finish and care. Marble is porous and sensitive to acids, so honed finishes, sealing and gentle cleaning matter. Our guides explain the trade-offs in more detail.",
        ur: "درست فنش اور دیکھ بھال کے ساتھ ہو سکتا ہے۔ ماربل مسام دار ہے اور تیزاب سے متاثر ہوتا ہے، اس لیے ہونڈ فنش، سیلنگ اور نرم صفائی اہم ہیں۔ ہماری گائیڈز ان پہلوؤں کو تفصیل سے بیان کرتی ہیں۔",
      },
    },
    {
      q: { en: "Should I choose marble or porcelain?", ur: "مجھے ماربل چننا چاہیے یا پورسلین؟" },
      a: {
        en: "Marble offers natural character; porcelain is lower maintenance. Many projects use porcelain on busy floors and marble where it will be seen and appreciated.",
        ur: "ماربل قدرتی خوبصورتی دیتا ہے؛ پورسلین کی دیکھ بھال کم ہے۔ بہت سے منصوبوں میں مصروف فرش پر پورسلین اور نمایاں جگہوں پر ماربل استعمال ہوتا ہے۔",
      },
    },
    {
      q: { en: "How should I clean a marble floor?", ur: "ماربل فرش کیسے صاف کروں؟" },
      a: {
        en: "Sweep often, mop with a pH-neutral stone cleaner and avoid vinegar, lemon and bleach. Wipe spills straight away.",
        ur: "اکثر جھاڑو لگائیں، نیوٹرل (pH) اسٹون کلینر سے پونچھا کریں اور سرکہ، لیموں اور بلیچ سے بچیں۔ گری ہوئی چیز فوراً صاف کریں۔",
      },
    },
  ],
  contact: [
    quote,
    {
      q: { en: "What information should I send with my enquiry?", ur: "انکوائری کے ساتھ کیا معلومات بھیجوں؟" },
      a: {
        en: "Your location, the rooms or areas involved, approximate measurements, photos of the space and any materials you have in mind.",
        ur: "آپ کا مقام، متعلقہ کمرے یا حصے، اندازاً پیمائش، جگہ کی تصاویر اور جو مٹیریل آپ کے ذہن میں ہو۔",
      },
    },
    {
      q: { en: "Does the website form send my message automatically?", ur: "کیا ویب سائٹ کا فارم میرا پیغام خود بھیج دیتا ہے؟" },
      a: {
        en: "The form prepares your enquiry and opens WhatsApp or your email app with the details filled in. It is sent when you press send there.",
        ur: "فارم آپ کی انکوائری تیار کرتا ہے اور تفصیلات کے ساتھ واٹس ایپ یا ای میل ایپ کھولتا ہے۔ وہاں 'بھیجیں' دبانے پر پیغام جاتا ہے۔",
      },
    },
    areas,
  ],
};
