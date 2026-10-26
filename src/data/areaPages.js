// Areas with their own page. Content is limited to public, well-known facts
// (roads and landmarks), nearby areas from serviceAreas.js and the business's
// confirmed services; the owner supplied no area-specific project details, so
// none are claimed. `area` must match an `en` name in serviceAreas.js.

export const areaPages = [
  {
    slug: "shah-faisal-town",
    area: "Shah Faisal Town",
    intro: {
      en: "Shah Faisal Town is where Nadeem Marbles is based, on Reta Plot in Shah Faisal Colony, close to Shahrah-e-Faisal and Jinnah International Airport. Being local means we can come round to measure homes, flats and shops in the area without a long trip across the city.",
      ur: "ندیم ماربلز کا مرکز شاہ فیصل ٹاؤن میں، شاہ فیصل کالونی کے ریتا پلاٹ پر، شاہراہِ فیصل اور جناح انٹرنیشنل ایئرپورٹ کے قریب ہے۔ مقامی ہونے کی وجہ سے ہم علاقے کے گھروں، فلیٹس اور دکانوں کی پیمائش کے لیے شہر کا لمبا سفر کیے بغیر آ سکتے ہیں۔",
    },
    landmarks: { en: ["Shahrah-e-Faisal", "Jinnah International Airport", "Drigh Road", "Shah Faisal Colony"], ur: ["شاہراہِ فیصل", "جناح انٹرنیشنل ایئرپورٹ", "ڈرگ روڈ", "شاہ فیصل کالونی"] },
    nearby: ["Model Colony", "Malir", "Korangi", "Gulistan-e-Johar", "Shahrah-e-Faisal"],
  },
  {
    slug: "gulshan-e-iqbal",
    area: "Gulshan-e-Iqbal",
    intro: {
      en: "Gulshan-e-Iqbal is one of Karachi's largest residential areas, spread over many blocks between University Road and Rashid Minhas Road. Whether you live in a house, a flat or run a shop here, we can measure on site and quote for tile or marble work.",
      ur: "گلشنِ اقبال کراچی کے سب سے بڑے رہائشی علاقوں میں سے ہے، جو یونیورسٹی روڈ اور راشد منہاس روڈ کے درمیان کئی بلاکس میں پھیلا ہے۔ آپ یہاں گھر یا فلیٹ میں رہتے ہوں یا دکان چلاتے ہوں، ہم سائٹ پر پیمائش کر کے ٹائل یا ماربل کے کام کی کوٹیشن دے سکتے ہیں۔",
    },
    landmarks: { en: ["University Road", "Rashid Minhas Road", "NIPA Chowrangi", "Maskan Chowrangi"], ur: ["یونیورسٹی روڈ", "راشد منہاس روڈ", "نیپا چورنگی", "مسکن چورنگی"] },
    nearby: ["Gulistan-e-Johar", "Dhoraji", "Gulshan-e-Jamal", "University Road", "Scheme 33"],
  },
  {
    slug: "gulistan-e-johar",
    area: "Gulistan-e-Johar",
    intro: {
      en: "Gulistan-e-Johar, around Johar Mor and Rashid Minhas Road, is a short drive from our base in Shah Faisal Town. It has a mix of apartment blocks and houses, and we can plan and fix tile or marble for a single bathroom or a whole floor.",
      ur: "گلستانِ جوہر، جوہر موڑ اور راشد منہاس روڈ کے اطراف، شاہ فیصل ٹاؤن میں ہمارے مرکز سے تھوڑے فاصلے پر ہے۔ یہاں اپارٹمنٹ بلاکس اور گھر دونوں ہیں، اور ہم ایک باتھ روم سے لے کر پورے فرش تک ٹائل یا ماربل کی منصوبہ بندی اور فکسنگ کر سکتے ہیں۔",
    },
    landmarks: { en: ["Johar Mor", "Rashid Minhas Road", "Kamran Chowrangi"], ur: ["جوہر موڑ", "راشد منہاس روڈ", "کامران چورنگی"] },
    nearby: ["Gulshan-e-Iqbal", "Safora Goth", "Scheme 33", "Shah Faisal Town", "Rufi Lake Drive"],
  },
  {
    slug: "dha-karachi",
    area: "Defence (DHA)",
    intro: {
      en: "Defence Housing Authority (DHA) stretches across several phases along the sea in south Karachi. For houses and apartments here we measure on site, plan the layout in 2D/3D and fix floors, walls, staircases and feature walls in tile or marble.",
      ur: "ڈیفنس ہاؤسنگ اتھارٹی (ڈی ایچ اے) جنوبی کراچی میں سمندر کے ساتھ کئی فیزز میں پھیلی ہے۔ یہاں کے گھروں اور اپارٹمنٹس کے لیے ہم سائٹ پر پیمائش کرتے، لے آؤٹ 2D/3D میں بناتے اور فرش، دیواریں، سیڑھیاں اور نمایاں دیواریں ٹائل یا ماربل میں لگاتے ہیں۔",
    },
    landmarks: { en: ["Khayaban-e-Ittehad", "Khayaban-e-Shahbaz", "Sea View", "DHA Phases 1 to 8"], ur: ["خیابانِ اتحاد", "خیابانِ شہباز", "سی ویو", "ڈی ایچ اے فیز 1 تا 8"] },
    nearby: ["Clifton", "Zamzama", "Gizri Society", "Darakshan", "Bukhari Commercial", "Creek Vista"],
  },
  {
    slug: "clifton",
    area: "Clifton",
    intro: {
      en: "Clifton, around Boat Basin and Teen Talwar, is a mix of apartments, houses, offices and shops. We take on tile and marble work here for homes and for commercial spaces such as receptions and showrooms.",
      ur: "کلفٹن، بوٹ بیسن اور تین تلوار کے اطراف، اپارٹمنٹس، گھروں، دفاتر اور دکانوں کا ملا جلا علاقہ ہے۔ ہم یہاں گھروں اور استقبالیہ اور شو روم جیسی کاروباری جگہوں کے لیے ٹائل اور ماربل کا کام کرتے ہیں۔",
    },
    landmarks: { en: ["Boat Basin", "Teen Talwar", "Bath Island", "Clifton Blocks 1 to 9"], ur: ["بوٹ بیسن", "تین تلوار", "باتھ آئی لینڈ", "کلفٹن بلاک 1 تا 9"] },
    nearby: ["Defence (DHA)", "Boat Basin", "Bath Island", "Kehkashan Society", "Emaar Crescent Bay"],
  },
  {
    slug: "north-nazimabad",
    area: "North Nazimabad",
    intro: {
      en: "North Nazimabad, around Hyderi Market and Five Star Chowrangi, is an established residential area in central Karachi. We measure, plan and fix tile and marble here, from a single room to a full renovation.",
      ur: "نارتھ ناظم آباد، حیدری مارکیٹ اور فائیو اسٹار چورنگی کے اطراف، وسطی کراچی کا ایک پرانا رہائشی علاقہ ہے۔ ہم یہاں ایک کمرے سے لے کر مکمل تزئین و آرائش تک ٹائل اور ماربل کی پیمائش، منصوبہ بندی اور فکسنگ کرتے ہیں۔",
    },
    landmarks: { en: ["Hyderi Market", "Five Star Chowrangi", "KDA Chowrangi", "Sakhi Hasan"], ur: ["حیدری مارکیٹ", "فائیو اسٹار چورنگی", "کے ڈی اے چورنگی", "سخی حسن"] },
    nearby: ["Nazimabad", "Sakhi Hasan", "Hyderi", "Five Star Chowrangi", "Buffer Zone", "North Karachi"],
  },
  {
    slug: "pechs",
    area: "PECHS",
    intro: {
      en: "PECHS, around Tariq Road and Shahrah-e-Quaideen, mixes family homes with busy shopping streets. We fix and polish tile and marble here for houses, flats and shops, and can work around trading hours for commercial spaces.",
      ur: "پی ای سی ایچ ایس، طارق روڈ اور شاہراہِ قائدین کے اطراف، خاندانی گھروں اور مصروف بازاروں کا علاقہ ہے۔ ہم یہاں گھروں، فلیٹس اور دکانوں کے لیے ٹائل اور ماربل لگاتے اور پالش کرتے ہیں، اور کاروباری جگہوں پر کام کاروباری اوقات کے مطابق رکھ سکتے ہیں۔",
    },
    landmarks: { en: ["Tariq Road", "Shahrah-e-Quaideen", "Allama Iqbal Road", "Khalid Bin Waleed Road"], ur: ["طارق روڈ", "شاہراہِ قائدین", "علامہ اقبال روڈ", "خالد بن ولید روڈ"] },
    nearby: ["Bahadurabad", "Tariq Road", "KAECHS", "Muhammad Ali Society", "Shahrah-e-Faisal"],
  },
  {
    slug: "bahadurabad",
    area: "Bahadurabad",
    intro: {
      en: "Bahadurabad, around Bahadurabad Chowrangi and Shaheed-e-Millat Road, is a central residential and market area. We measure on site and plan the layout before fixing, so floors and walls line up in older and newer buildings alike.",
      ur: "بہادرآباد، بہادرآباد چورنگی اور شہیدِ ملت روڈ کے اطراف، شہر کے بیچ رہائشی اور بازاری علاقہ ہے۔ ہم فکسنگ سے پہلے سائٹ پر پیمائش اور لے آؤٹ کی منصوبہ بندی کرتے ہیں تاکہ پرانی اور نئی دونوں عمارتوں میں فرش اور دیواریں سیدھ میں رہیں۔",
    },
    landmarks: { en: ["Bahadurabad Chowrangi", "Shaheed-e-Millat Road", "Alamgir Road"], ur: ["بہادرآباد چورنگی", "شہیدِ ملت روڈ", "عالمگیر روڈ"] },
    nearby: ["PECHS", "Dhoraji", "Jamshed Quarters", "Tariq Road", "Shaheed-e-Millat Road"],
  },
  {
    slug: "federal-b-area",
    area: "Federal B Area",
    intro: {
      en: "Federal B Area, also called Gulberg, runs across many blocks around Water Pump and Ayesha Manzil. We work on homes, flats and shops here, from re-polishing an existing marble floor to fixing new tiles throughout.",
      ur: "فیڈرل بی ایریا، جسے گلبرگ بھی کہتے ہیں، واٹر پمپ اور عائشہ منزل کے اطراف کئی بلاکس میں پھیلا ہے۔ ہم یہاں گھروں، فلیٹس اور دکانوں پر کام کرتے ہیں، پرانے ماربل فرش کی دوبارہ پالش سے لے کر پوری جگہ میں نئی ٹائلیں لگانے تک۔",
    },
    landmarks: { en: ["Water Pump", "Ayesha Manzil", "Karimabad", "Gulberg Chowrangi"], ur: ["واٹر پمپ", "عائشہ منزل", "کریم آباد", "گلبرگ چورنگی"] },
    nearby: ["Gulberg", "Ancholi", "Azizabad", "Karimabad", "Ayesha Manzil", "North Nazimabad"],
  },
  {
    slug: "nazimabad",
    area: "Nazimabad",
    intro: {
      en: "Nazimabad, numbered from No. 1 to No. 7 and home to Abbasi Shaheed Hospital, is one of Karachi's older planned neighbourhoods. Older buildings often need the floor checked and levelled before new tile or marble goes down, which we assess on site.",
      ur: "ناظم آباد، جو نمبر 1 سے نمبر 7 تک ہے اور جہاں عباسی شہید اسپتال ہے، کراچی کے پرانے منصوبہ بند علاقوں میں سے ہے۔ پرانی عمارتوں میں نئی ٹائل یا ماربل لگانے سے پہلے اکثر فرش کی جانچ اور ہمواری ضروری ہوتی ہے، جس کا اندازہ ہم سائٹ پر کرتے ہیں۔",
    },
    landmarks: { en: ["Nazimabad No. 1 to 7", "Abbasi Shaheed Hospital", "Golimar"], ur: ["ناظم آباد نمبر 1 تا 7", "عباسی شہید اسپتال", "گولیمار"] },
    nearby: ["North Nazimabad", "Paposh Nagar", "Liaquatabad", "Lasbella", "Rizvia Society"],
  },
  {
    slug: "saddar-town",
    area: "Saddar Town",
    intro: {
      en: "Saddar, around Empress Market, Zainab Market and Burns Road, is Karachi's old commercial centre with shops, offices and flats above them. We take on tile and marble work for both homes and commercial premises here.",
      ur: "صدر، ایمپریس مارکیٹ، زینب مارکیٹ اور برنس روڈ کے اطراف، کراچی کا پرانا تجارتی مرکز ہے جہاں دکانیں، دفاتر اور ان کے اوپر فلیٹس ہیں۔ ہم یہاں گھروں اور کاروباری جگہوں دونوں کے لیے ٹائل اور ماربل کا کام کرتے ہیں۔",
    },
    landmarks: { en: ["Empress Market", "Zainab Market", "Burns Road", "Regal Chowk"], ur: ["ایمپریس مارکیٹ", "زینب مارکیٹ", "برنس روڈ", "ریگل چوک"] },
    nearby: ["Burns Road", "Garden East", "Lines Area", "Soldier Bazaar", "I.I. Chundrigar Road"],
  },
  {
    slug: "malir",
    area: "Malir",
    intro: {
      en: "Malir, along the National Highway around Malir Halt and Malir Cantonment, is close to our base in Shah Faisal Town. We fix and polish tile and marble for houses and flats across the area.",
      ur: "ملیر، نیشنل ہائی وے کے ساتھ ملیر ہالٹ اور ملیر کینٹ کے اطراف، شاہ فیصل ٹاؤن میں ہمارے مرکز کے قریب ہے۔ ہم پورے علاقے کے گھروں اور فلیٹس میں ٹائل اور ماربل لگاتے اور پالش کرتے ہیں۔",
    },
    landmarks: { en: ["Malir Halt", "Malir Cantonment", "National Highway"], ur: ["ملیر ہالٹ", "ملیر کینٹ", "نیشنل ہائی وے"] },
    nearby: ["Model Colony", "Saudabad", "Kala Board", "Quaidabad", "Shah Faisal Town"],
  },
  {
    slug: "korangi",
    area: "Korangi",
    intro: {
      en: "Korangi, along Korangi Road and around Korangi Industrial Area, has homes, workshops and factories side by side. We work on residential floors and walls, and on hard-wearing floors for commercial and industrial spaces.",
      ur: "کورنگی، کورنگی روڈ کے ساتھ اور کورنگی انڈسٹریل ایریا کے اطراف، جہاں گھر، ورکشاپس اور فیکٹریاں ساتھ ساتھ ہیں۔ ہم رہائشی فرش اور دیواروں کے ساتھ کاروباری اور صنعتی جگہوں کے مضبوط فرش پر بھی کام کرتے ہیں۔",
    },
    landmarks: { en: ["Korangi Road", "Korangi Industrial Area", "Korangi Crossing"], ur: ["کورنگی روڈ", "کورنگی انڈسٹریل ایریا", "کورنگی کراسنگ"] },
    nearby: ["Landhi", "Shah Faisal Town", "Qayyumabad", "Mehmoodabad"],
  },
  {
    slug: "bahria-town",
    area: "Bahria Town",
    intro: {
      en: "Bahria Town Karachi, off the Super Highway (M-9), has many new houses and apartments being finished. We can measure an empty space, plan the layout in 2D/3D and fix floors, walls and staircases before you move in.",
      ur: "بحریہ ٹاؤن کراچی، سپر ہائی وے (M-9) کے پاس، جہاں بہت سے نئے گھر اور اپارٹمنٹس تیار ہو رہے ہیں۔ ہم خالی جگہ کی پیمائش، لے آؤٹ کی 2D/3D منصوبہ بندی اور آپ کے منتقل ہونے سے پہلے فرش، دیواریں اور سیڑھیاں لگا سکتے ہیں۔",
    },
    landmarks: { en: ["Super Highway (M-9)", "Bahria Town Grand Jamia Mosque"], ur: ["سپر ہائی وے (M-9)", "بحریہ ٹاؤن گرینڈ جامع مسجد"] },
    nearby: ["Scheme 33", "Gulshan-e-Maymar", "Saima Highway Villas", "Gulzar-e-Hijri"],
  },
];

export const getAreaPage = (slug) => areaPages.find((page) => page.slug === slug);
export const areaPageSlug = (enName) => areaPages.find((page) => page.area === enName)?.slug;
