// Blog articles. Content blocks: { h2 }, { p }, { ul: [...] }.
//

import { guidePosts } from "@/data/blogGuides";

export const blogCategories = [
  { id: "choosing", label: { en: "Choosing materials", ur: "مٹیریل کا انتخاب" } },
  { id: "care", label: { en: "Care & maintenance", ur: "دیکھ بھال" } },
  { id: "planning", label: { en: "Planning", ur: "منصوبہ بندی" } },
];

const starterPosts = [
  {
    slug: "choose-marble-for-your-home",
    category: "choosing",
    published: "2026-10-14",
    readingMinutes: 6,
    cover: "marbleGold",
    relatedServices: ["marble-flooring", "marble-installation"],
    title: { en: "How to Choose Marble for Your Home", ur: "اپنے گھر کے لیے ماربل کا انتخاب کیسے کریں" },
    excerpt: {
      en: "Colour, veining, finish and where the stone will live: a practical way to narrow down the right marble for each room.",
      ur: "رنگ، دھاریاں، فنش اور پتھر کہاں لگے گا: ہر کمرے کے لیے درست ماربل چننے کا عملی طریقہ۔",
    },
    content: {
      en: [
        { p: "Marble is chosen with the eyes, but it should be confirmed with questions. A stone that looks perfect in a showroom can disappoint in a busy kitchen, while a modest-looking slab can be ideal for a hallway. These steps help you choose with confidence." },
        { h2: "Start with the room, not the slab" },
        { p: "Ask how the space is used before falling for a colour. Entrances and corridors take grit and constant footfall. Kitchens see acidic spills such as lemon, vinegar and tomato. Bathrooms are wet and need grip underfoot. Living rooms and feature walls are gentler and give you the most freedom." },
        { h2: "Understand colour and veining" },
        { p: "White marbles with soft grey veins create a calm, bright look and suit smaller rooms. Gold or brown veining adds warmth. Dark marbles feel dramatic but show dust and water marks more easily on floors. Strong, bold veining makes a statement and is often best kept to one surface, such as an island or a feature wall, so the room does not feel busy." },
        { p: "Because marble is natural, every slab is different. Always look at the actual material, or clear photos of it, rather than a small sample alone." },
        { h2: "Pick the right finish" },
        {
          ul: [
            "Polished: glossy and reflective, shows the colour and veining at their richest. Best for walls and low-traffic floors.",
            "Honed: smooth and matt, hides small scratches and is less slippery. A sensible choice for busy floors and bathrooms.",
            "Textured (brushed or leathered): more grip and a natural feel, useful for wet areas and outdoor steps.",
          ],
        },
        { h2: "Think about care from day one" },
        { p: "Marble is porous and sensitive to acids. A good sealer slows down staining but does not make the stone stain-proof. If you want a low-maintenance surface for a hard-working kitchen counter, discuss whether marble is right there, or whether to use it on a splashback or feature area instead." },
        { h2: "Plan the layout before you buy" },
        { p: "Measuring the site and planning the layout in 2D or 3D shows how veins will flow across the room, where cuts will fall and how much material you actually need. It also lets you decide where the most beautiful pieces should go." },
        { h2: "A quick checklist" },
        {
          ul: [
            "Where will the marble go, and how hard will that area be used?",
            "Do you want a calm look or a bold statement?",
            "Which finish suits the safety and maintenance needs of the room?",
            "Have you seen the actual material, not only a small sample?",
            "Has the layout been planned from real site measurements?",
          ],
        },
        { p: "If you would like help working through these questions for your own space, contact Nadeem Marbles and share a few photos of the area." },
      ],
      ur: [
        { p: "ماربل آنکھوں سے پسند کیا جاتا ہے مگر اس کی تصدیق سوالات سے ہونی چاہیے۔ شو روم میں بہترین لگنے والا پتھر مصروف کچن میں مایوس کر سکتا ہے، جبکہ سادہ دکھنے والا سلیب راہداری کے لیے بہترین ہو سکتا ہے۔ یہ اقدامات آپ کو اعتماد کے ساتھ انتخاب میں مدد دیں گے۔" },
        { h2: "سلیب سے نہیں، کمرے سے شروع کریں" },
        { p: "رنگ پسند کرنے سے پہلے پوچھیں کہ جگہ کیسے استعمال ہوتی ہے۔ داخلی راستے اور راہداریاں مٹی اور مسلسل آمد و رفت برداشت کرتی ہیں۔ کچن میں لیموں، سرکہ اور ٹماٹر جیسی تیزابی چیزیں گرتی ہیں۔ باتھ روم گیلے ہوتے ہیں اور فرش پر گرفت چاہیے۔ رہنے کے کمرے اور نمایاں دیواریں نسبتاً نرم استعمال میں ہوتی ہیں اور زیادہ آزادی دیتی ہیں۔" },
        { h2: "رنگ اور دھاریوں کو سمجھیں" },
        { p: "ہلکی سرمئی دھاریوں والا سفید ماربل پُرسکون اور روشن تاثر دیتا ہے اور چھوٹے کمروں کے لیے موزوں ہے۔ سنہری یا بھوری دھاریاں گرمائش لاتی ہیں۔ گہرے رنگ کا ماربل شاندار لگتا ہے مگر فرش پر دھول اور پانی کے نشان زیادہ دکھاتا ہے۔ نمایاں اور گہری دھاریاں ایک بیان کی طرح ہوتی ہیں، انہیں عموماً ایک ہی سطح جیسے آئی لینڈ یا نمایاں دیوار تک رکھنا بہتر ہے تاکہ کمرہ بھرا بھرا نہ لگے۔" },
        { p: "چونکہ ماربل قدرتی ہے، ہر سلیب مختلف ہوتا ہے۔ صرف چھوٹے نمونے کے بجائے ہمیشہ اصل مٹیریل یا اس کی واضح تصاویر دیکھیں۔" },
        { h2: "درست فنش کا انتخاب" },
        {
          ul: [
            "پالش: چمکدار اور عکس دار، رنگ اور دھاریاں بھرپور دکھاتا ہے۔ دیواروں اور کم آمد و رفت والے فرش کے لیے بہترین۔",
            "ہونڈ: ہموار اور میٹ، چھوٹی خراشیں چھپاتا ہے اور کم پھسلن والا ہے۔ مصروف فرش اور باتھ روم کے لیے سمجھدار انتخاب۔",
            "کھردرا (برشڈ یا لیدرڈ): زیادہ گرفت اور قدرتی احساس، گیلی جگہوں اور باہر کی سیڑھیوں کے لیے مفید۔",
          ],
        },
        { h2: "پہلے دن سے دیکھ بھال کا سوچیں" },
        { p: "ماربل مسام دار ہوتا ہے اور تیزاب سے متاثر ہوتا ہے۔ اچھا سیلر داغ لگنے کی رفتار کم کرتا ہے مگر پتھر کو مکمل داغ پروف نہیں بناتا۔ اگر آپ مصروف کچن کاؤنٹر کے لیے کم دیکھ بھال والی سطح چاہتے ہیں تو بات کریں کہ وہاں ماربل مناسب ہے یا اسے دیوار یا نمایاں حصے پر استعمال کرنا بہتر ہوگا۔" },
        { h2: "خریدنے سے پہلے لے آؤٹ کی منصوبہ بندی" },
        { p: "سائٹ کی پیمائش اور 2D یا 3D میں لے آؤٹ بنانے سے پتہ چلتا ہے کہ دھاریاں کمرے میں کیسے بہیں گی، کٹنگ کہاں ہوگی اور اصل میں کتنا مٹیریل چاہیے۔ اس سے یہ بھی طے ہوتا ہے کہ سب سے خوبصورت ٹکڑے کہاں لگنے چاہییں۔" },
        { h2: "مختصر چیک لسٹ" },
        {
          ul: [
            "ماربل کہاں لگے گا اور وہ جگہ کتنی استعمال ہوگی؟",
            "آپ پُرسکون تاثر چاہتے ہیں یا نمایاں انداز؟",
            "کون سا فنش کمرے کی حفاظت اور دیکھ بھال کی ضروریات کے مطابق ہے؟",
            "کیا آپ نے صرف چھوٹا نمونہ نہیں بلکہ اصل مٹیریل دیکھا ہے؟",
            "کیا لے آؤٹ اصل سائٹ کی پیمائش سے بنایا گیا ہے؟",
          ],
        },
        { p: "اگر آپ اپنی جگہ کے لیے ان سوالات پر مدد چاہتے ہیں تو ندیم ماربلز سے رابطہ کریں اور جگہ کی چند تصاویر شیئر کریں۔" },
      ],
    },
  },
  {
    slug: "marble-vs-porcelain-tiles",
    category: "choosing",
    published: "2026-10-14",
    updated: "2026-10-23",
    readingMinutes: 8,
    cover: "floorPolishedMarble",
    title: { en: "Marble vs Tiles in Pakistan: Which Is Better for Your Home?", ur: "پاکستان میں ماربل بمقابلہ ٹائلز: آپ کے گھر کے لیے کون سا بہتر ہے؟" },
    excerpt: {
      en: "Marble or porcelain tiles for a Pakistani home? A room-by-room comparison of looks, durability, maintenance, installation and long-term cost.",
      ur: "پاکستانی گھر کے لیے ماربل یا پورسلین ٹائلز؟ کمرہ بہ کمرہ موازنہ: شکل، پائیداری، دیکھ بھال، تنصیب اور طویل مدتی لاگت۔",
    },
    relatedServices: ["marble-flooring", "tile-installation", "marble-polishing-and-restoration"],
    content: {
      en: [
        { p: "Modern porcelain tiles can look remarkably like marble, so many people wonder whether natural stone is worth it. Neither is simply better. They suit different priorities." },
        { h2: "What they are" },
        { p: "Marble is a natural stone cut from quarried blocks. Its colour and veining are formed over a very long time, so every piece is unique. Porcelain is a dense ceramic tile made from refined clay fired at high temperature. Marble-look porcelain has a printed surface design that imitates stone." },
        { h2: "Ceramic or porcelain?" },
        { p: "Both are fired clay tiles. Porcelain is made from finer clay fired at a higher temperature, so it is denser, absorbs very little water and is harder wearing, which makes it the usual choice for floors. Ceramic tiles are lighter and easier to cut, and work well on walls, splashbacks and lightly used floors." },
        { h2: "Where granite fits" },
        { p: "Granite is also a natural stone, but it is much harder than marble and less affected by acids and scratches. It is often chosen for kitchen worktops, stairs and busy entrances. Its look is usually speckled or grainy rather than softly veined, so it offers a different character from marble." },
        { h2: "Appearance" },
        { p: "Marble has depth: light passes slightly into the surface and veins vary naturally from piece to piece. Porcelain designs are repeated across a set number of faces, so on large floors the pattern can occasionally repeat. Good porcelain is very convincing, especially in large formats." },
        { h2: "Durability and maintenance" },
        {
          ul: [
            "Porcelain is very hard, has very low water absorption and generally resists stains and acids well.",
            "Marble is softer and porous. It can scratch, and acids can dull polished surfaces. It usually needs sealing and gentler cleaning products.",
            "Marble can often be honed and re-polished to renew its surface. A damaged porcelain tile is normally replaced instead.",
          ],
        },
        { h2: "Installation" },
        { p: "Both need a flat, sound base and the correct adhesive. Natural stone requires extra care to match tone and veining between pieces and to avoid chipping edges. Large-format porcelain is thin and heavy for its size, so it needs careful handling and a very flat surface to avoid uneven edges." },
        { h2: "Room by room in a Pakistani home" },
        {
          table: {
            head: ["Room", "Marble", "Porcelain tiles", "What to check"],
            rows: [
              ["Lounge and drawing room", "A good fit where the floor is meant to be seen; polished or honed", "A good fit; large formats give fewer joints", "Felt pads under furniture protect both"],
              ["Bedrooms", "Suits well; light foot traffic", "Suits well", "Choose by look and budget"],
              ["Kitchen", "Possible, but lemon, vinegar and spills leave dull marks; a honed finish hides them better", "Usually the more practical floor", "Grease and daily mopping"],
              ["Bathroom", "Best on a feature wall; on the floor only with a honed or textured finish, sealed", "Matt or textured porcelain is the safer floor", "Grip and the slope to the drain matter most"],
              ["Stairs", "Widely used; a honed finish or anti-slip grooves near the edge add grip", "Possible with step tiles or nosing trims; edges can chip", "The nosing profile and grip"],
              ["Outdoor, porch and roof", "Polished marble is slippery when wet; use a honed or textured finish if any", "Textured porcelain rated for outdoor use", "Rain, sun and dust; check the grip"],
            ],
          },
        },
        { h2: "Long-term cost: re-polishing or replacing" },
        { p: "The floor that costs less on the day it is laid is not always the cheaper one over many years, so it helps to think about how each material ages." },
        { p: "Marble wears at the surface. Scratches and dull patches can usually be removed by grinding and re-polishing, which brings back an even finish without lifting the floor. Deep cracks, broken pieces and some stains are different: those pieces may need replacing, and finding stone that matches an older floor can be difficult." },
        { p: "Porcelain resists everyday wear well, but a cracked or chipped tile cannot be polished out; it has to be replaced. Tile designs are often discontinued after some time, so keep a few spare tiles from the same batch after installation. The same advice applies to marble." },
        { p: "To compare costs fairly, include the material, the fixing and, for marble, the grinding and polishing. Our guide to [marble flooring cost in Karachi](/blog/marble-flooring-cost-karachi) explains each item in a quotation, and the [tile and marble calculator](/blog/calculate-tiles-and-marble-quantity) works out quantities and a total at your own rate. If you already have a dull marble floor, see [marble polishing and restoration](/services/marble-polishing-and-restoration)." },
        { h2: "Which should you choose?" },
        {
          ul: [
            "Choose marble for feature walls, vanity tops, statement floors and spaces where natural character matters most.",
            "Choose porcelain for busy family kitchens, commercial floors and wet areas where low maintenance is the priority.",
            "Many projects combine both: porcelain on hard-working floors and marble where it will be seen and appreciated.",
          ],
        },
        { p: "Nadeem Marbles works with both tiles and marble, and can help you decide which material belongs where in your project." },
      ],
      ur: [
        { p: "جدید پورسلین ٹائلز ماربل جیسی دکھ سکتی ہیں، اس لیے بہت سے لوگ سوچتے ہیں کہ کیا قدرتی پتھر واقعی ضروری ہے۔ دونوں میں سے کوئی بھی مطلقاً بہتر نہیں، دونوں مختلف ترجیحات کے لیے موزوں ہیں۔" },
        { h2: "یہ کیا ہیں" },
        { p: "ماربل کان سے نکالے گئے بلاکس سے کاٹا گیا قدرتی پتھر ہے۔ اس کا رنگ اور دھاریاں بہت طویل عرصے میں بنتی ہیں، اس لیے ہر ٹکڑا منفرد ہوتا ہے۔ پورسلین ایک گھنی سیرامک ٹائل ہے جو صاف کی گئی مٹی کو بہت زیادہ درجہ حرارت پر پکا کر بنائی جاتی ہے۔ ماربل نما پورسلین کی سطح پر پتھر جیسا ڈیزائن پرنٹ ہوتا ہے۔" },
        { h2: "سیرامک یا پورسلین؟" },
        { p: "دونوں پکی ہوئی مٹی کی ٹائلیں ہیں۔ پورسلین زیادہ باریک مٹی سے زیادہ درجہ حرارت پر بنتی ہے، اس لیے یہ زیادہ گھنی ہوتی ہے، بہت کم پانی جذب کرتی ہے اور زیادہ مضبوط ہوتی ہے، اسی لیے فرش کے لیے عام انتخاب ہے۔ سیرامک ٹائلیں ہلکی اور کاٹنے میں آسان ہوتی ہیں، اور دیواروں، اسپلیش بیک اور کم استعمال والے فرش کے لیے اچھی رہتی ہیں۔" },
        { h2: "گرینائٹ کہاں موزوں ہے" },
        { p: "گرینائٹ بھی قدرتی پتھر ہے، مگر ماربل سے کہیں زیادہ سخت ہے اور تیزاب اور خراشوں سے کم متاثر ہوتا ہے۔ اسے اکثر کچن ورک ٹاپ، سیڑھیوں اور مصروف داخلی راستوں کے لیے چنا جاتا ہے۔ اس کی شکل عموماً نرم دھاریوں کے بجائے دانے دار یا چتکبری ہوتی ہے، اس لیے یہ ماربل سے مختلف تاثر دیتا ہے۔" },
        { h2: "ظاہری شکل" },
        { p: "ماربل میں گہرائی ہوتی ہے: روشنی سطح میں ہلکا سا داخل ہوتی ہے اور دھاریاں ہر ٹکڑے میں قدرتی طور پر مختلف ہوتی ہیں۔ پورسلین کے ڈیزائن محدود چہروں پر دہرائے جاتے ہیں، اس لیے بڑے فرش پر کبھی کبھی ڈیزائن دہرایا ہوا نظر آ سکتا ہے۔ اچھی پورسلین خاص طور پر بڑے سائز میں بہت حقیقی لگتی ہے۔" },
        { h2: "پائیداری اور دیکھ بھال" },
        {
          ul: [
            "پورسلین بہت سخت ہوتی ہے، بہت کم پانی جذب کرتی ہے اور عموماً داغ اور تیزاب کے خلاف اچھی مزاحمت رکھتی ہے۔",
            "ماربل نسبتاً نرم اور مسام دار ہے۔ اس پر خراش آ سکتی ہے اور تیزاب پالش شدہ سطح کو مدھم کر سکتا ہے۔ اسے عموماً سیلنگ اور نرم صفائی کی اشیا کی ضرورت ہوتی ہے۔",
            "ماربل کو اکثر ہون اور دوبارہ پالش کر کے نیا کیا جا سکتا ہے، جبکہ خراب پورسلین ٹائل عموماً بدلی جاتی ہے۔",
          ],
        },
        { h2: "تنصیب" },
        { p: "دونوں کے لیے ہموار اور مضبوط بنیاد اور درست مسالہ ضروری ہے۔ قدرتی پتھر میں ٹکڑوں کے درمیان رنگ اور دھاریاں ملانے اور کناروں کو ٹوٹنے سے بچانے کے لیے زیادہ احتیاط چاہیے۔ بڑے سائز کی پورسلین اپنے سائز کے لحاظ سے پتلی اور بھاری ہوتی ہے، اس لیے اسے احتیاط سے اٹھانا اور بالکل ہموار سطح پر لگانا ضروری ہے۔" },
        { h2: "پاکستانی گھر میں کمرہ بہ کمرہ" },
        {
          table: {
            head: ["کمرہ", "ماربل", "پورسلین ٹائلز", "کیا دیکھیں"],
            rows: [
              ["لاؤنج اور ڈرائنگ روم", "جہاں فرش نمایاں ہو وہاں اچھا انتخاب؛ پالش یا ہونڈ", "اچھا انتخاب؛ بڑے سائز میں جوڑ کم", "فرنیچر کے نیچے فیلٹ پیڈ دونوں کو بچاتے ہیں"],
              ["بیڈ روم", "مناسب؛ آمد و رفت کم", "مناسب", "شکل اور بجٹ دیکھ کر چنیں"],
              ["کچن", "ممکن، مگر لیموں، سرکہ اور گری چیزیں مدھم نشان چھوڑتی ہیں؛ ہونڈ فنش انہیں بہتر چھپاتا ہے", "عموماً زیادہ عملی فرش", "چکنائی اور روزانہ پوچا"],
              ["باتھ روم", "نمایاں دیوار پر بہتر؛ فرش پر صرف ہونڈ یا کھردرے فنش اور سیلنگ کے ساتھ", "میٹ یا کھردری پورسلین زیادہ محفوظ فرش", "گرفت اور نالی کی طرف ڈھلوان سب سے اہم"],
              ["سیڑھیاں", "عام استعمال؛ ہونڈ فنش یا کنارے کے قریب پھسلن روکنے والی لکیریں گرفت بڑھاتی ہیں", "اسٹیپ ٹائلز یا کنارے کی ٹرم کے ساتھ ممکن؛ کنارے چِپ ہو سکتے ہیں", "کنارے کی پروفائل اور گرفت"],
              ["باہر، پورچ اور چھت", "پالش شدہ ماربل گیلا ہو کر پھسلتا ہے؛ اگر لگائیں تو ہونڈ یا کھردرا فنش", "باہر کے لیے بنی کھردری پورسلین", "بارش، دھوپ اور مٹی؛ گرفت چیک کریں"],
            ],
          },
        },
        { h2: "طویل مدتی لاگت: دوبارہ پالش یا تبدیلی" },
        { p: "جو فرش لگتے وقت سستا پڑتا ہے، ضروری نہیں کہ برسوں بعد بھی سستا رہے، اس لیے یہ سوچنا مفید ہے کہ ہر مٹیریل وقت کے ساتھ کیسا رہتا ہے۔" },
        { p: "ماربل سطح پر گھستا ہے۔ خراشیں اور مدھم حصے عموماً گرائنڈنگ اور دوبارہ پالش سے ختم ہو جاتے ہیں، جس سے فرش اکھاڑے بغیر یکساں فنش واپس آ جاتا ہے۔ گہری دراڑیں، ٹوٹے ٹکڑے اور کچھ داغ مختلف ہیں: ان ٹکڑوں کو بدلنا پڑ سکتا ہے، اور پرانے فرش سے ملتا پتھر ڈھونڈنا مشکل ہو سکتا ہے۔" },
        { p: "پورسلین روزمرہ گھساؤ اچھی طرح برداشت کرتی ہے، مگر ٹوٹی یا چِپ ہوئی ٹائل پالش سے ٹھیک نہیں ہوتی؛ اسے بدلنا پڑتا ہے۔ ٹائلوں کے ڈیزائن کچھ عرصے بعد اکثر بند ہو جاتے ہیں، اس لیے لگوانے کے بعد اسی بیچ کی چند اضافی ٹائلیں رکھ لیں۔ یہی مشورہ ماربل کے لیے بھی ہے۔" },
        { p: "لاگت کا منصفانہ موازنہ کرنے کے لیے مٹیریل، فکسنگ اور ماربل کی صورت میں گرائنڈنگ اور پالش بھی شامل کریں۔ [کراچی میں ماربل فرش کی لاگت](/blog/marble-flooring-cost-karachi) والی ہماری گائیڈ کوٹیشن کی ہر چیز سمجھاتی ہے، اور [ٹائل اور ماربل کیلکولیٹر](/blog/calculate-tiles-and-marble-quantity) مقدار اور آپ کے اپنے ریٹ پر کل رقم نکالتا ہے۔ اگر آپ کا ماربل فرش پہلے سے مدھم ہے تو [ماربل پالشنگ اور بحالی](/services/marble-polishing-and-restoration) دیکھیں۔" },
        { h2: "آپ کو کیا چننا چاہیے؟" },
        {
          ul: [
            "نمایاں دیواروں، وینٹی ٹاپ، شاندار فرش اور ایسی جگہوں کے لیے ماربل چنیں جہاں قدرتی کردار سب سے اہم ہو۔",
            "مصروف فیملی کچن، کمرشل فرش اور گیلی جگہوں کے لیے پورسلین چنیں جہاں کم دیکھ بھال ترجیح ہو۔",
            "بہت سے منصوبوں میں دونوں کا امتزاج ہوتا ہے: محنت طلب فرش پر پورسلین اور جہاں نظر آئے وہاں ماربل۔",
          ],
        },
        { p: "ندیم ماربلز ٹائلز اور ماربل دونوں کے ساتھ کام کرتا ہے اور آپ کو یہ فیصلہ کرنے میں مدد دے سکتا ہے کہ آپ کے منصوبے میں کون سا مٹیریل کہاں لگے۔" },
      ],
    },
    faqs: [
      {
        q: { en: "Is marble or tile cheaper in Pakistan?", ur: "پاکستان میں ماربل سستا ہے یا ٹائل؟" },
        a: {
          en: "It depends on the exact marble and tile being compared; prices for the two overlap. Compare complete quotations that include fixing and, for marble, grinding and polishing.",
          ur: "یہ اس پر منحصر ہے کہ کون سا ماربل اور کون سی ٹائل موازنہ کی جا رہی ہے؛ دونوں کی قیمتیں ایک دوسرے سے ملتی جلتی رہتی ہیں۔ مکمل کوٹیشنز کا موازنہ کریں جن میں فکسنگ اور ماربل کی صورت میں گرائنڈنگ اور پالش شامل ہو۔",
        },
      },
      {
        q: { en: "Which is better for a bathroom floor?", ur: "باتھ روم کے فرش کے لیے کون سا بہتر ہے؟" },
        a: {
          en: "Matt or textured porcelain is usually the safer choice, because it grips better and absorbs very little water. Marble can be used with a honed or textured finish and sealing; many people use marble on a feature wall instead.",
          ur: "میٹ یا کھردری پورسلین عموماً زیادہ محفوظ انتخاب ہے کیونکہ یہ بہتر گرفت دیتی ہے اور بہت کم پانی جذب کرتی ہے۔ ماربل ہونڈ یا کھردرے فنش اور سیلنگ کے ساتھ استعمال ہو سکتا ہے؛ بہت سے لوگ اس کے بجائے نمایاں دیوار پر ماربل لگاتے ہیں۔",
        },
      },
      {
        q: { en: "Can marble be used on stairs?", ur: "کیا سیڑھیوں پر ماربل لگایا جا سکتا ہے؟" },
        a: {
          en: "Yes, it is common in Pakistani homes. Choose a honed finish or anti-slip grooves near the edge for grip, especially on outdoor or often wet steps.",
          ur: "جی ہاں، پاکستانی گھروں میں یہ عام ہے۔ گرفت کے لیے ہونڈ فنش یا کنارے کے قریب پھسلن روکنے والی لکیریں رکھیں، خاص طور پر باہر یا اکثر گیلی رہنے والی سیڑھیوں پر۔",
        },
      },
      {
        q: { en: "Does a marble floor need sealing?", ur: "کیا ماربل فرش کو سیلنگ کی ضرورت ہوتی ہے؟" },
        a: {
          en: "Many marbles benefit from a penetrating sealer, especially in kitchens and bathrooms. Sealing slows down staining, but it does not stop acids from leaving dull marks on the surface.",
          ur: "بہت سے ماربل کے لیے اندر جذب ہونے والا سیلر فائدہ مند ہے، خاص طور پر کچن اور باتھ روم میں۔ سیلنگ داغ لگنے کی رفتار کم کرتی ہے مگر تیزاب کو سطح پر مدھم نشان چھوڑنے سے نہیں روکتی۔",
        },
      },
    ],
  },
  {
    slug: "how-to-maintain-marble-flooring",
    category: "care",
    published: "2026-10-14",
    readingMinutes: 5,
    cover: "elevatorLobby",
    relatedServices: ["marble-flooring"],
    title: { en: "How to Maintain Marble Flooring", ur: "ماربل فرش کی دیکھ بھال کیسے کریں" },
    excerpt: {
      en: "Simple daily habits and a few things to avoid that keep a marble floor looking its best for years.",
      ur: "روزمرہ کی چند آسان عادات اور کچھ احتیاطیں جو ماربل فرش کو برسوں تک خوبصورت رکھتی ہیں۔",
    },
    content: {
      en: [
        { p: "A marble floor does not need complicated care, but it does need the right care. Most damage comes from grit, acids and harsh cleaners rather than from age." },
        { h2: "Daily and weekly care" },
        {
          ul: [
            "Sweep or dust-mop often. Fine grit acts like sandpaper under shoes and slowly dulls the surface.",
            "Use mats at entrances to catch dirt before it reaches the stone.",
            "Mop with clean water and a pH-neutral cleaner made for natural stone, then dry with a soft cloth if the floor stays wet.",
          ],
        },
        { h2: "What to avoid" },
        {
          ul: [
            "Vinegar, lemon, and acidic or bleach-based cleaners, which can etch and dull marble.",
            "Abrasive powders and scouring pads.",
            "Dragging furniture. Use felt pads under chair and table legs.",
            "Leaving spills to sit, especially juice, tea, oil and coloured liquids.",
          ],
        },
        { h2: "Dealing with spills" },
        { p: "Blot spills straight away with a soft cloth rather than wiping, which spreads them. Rinse the area with clean water and dry it. If a mark remains, ask for advice before trying strong products, because the wrong cleaner can make a stain worse." },
        { h2: "Sealing" },
        { p: "Many marble floors benefit from a penetrating sealer that slows down how fast liquids soak in. How often to reseal depends on the stone, the finish and how much the floor is used. A simple test: if drops of water darken the stone within a few minutes, it may be time to reseal." },
        { h2: "When to call a professional" },
        { p: "If the floor has lost its shine across large areas, has deep scratches or etch marks, or shows uneven patches, professional honing and polishing can often restore it. An inspection first will show what the stone needs." },
      ],
      ur: [
        { p: "ماربل فرش کو پیچیدہ دیکھ بھال کی ضرورت نہیں، مگر درست دیکھ بھال ضروری ہے۔ زیادہ تر نقصان عمر سے نہیں بلکہ مٹی کے ذرات، تیزاب اور سخت کیمیکلز سے ہوتا ہے۔" },
        { h2: "روزانہ اور ہفتہ وار دیکھ بھال" },
        {
          ul: [
            "اکثر جھاڑو یا ڈسٹ موپ لگائیں۔ باریک مٹی جوتوں کے نیچے ریگمال کی طرح کام کرتی ہے اور سطح کو آہستہ آہستہ مدھم کرتی ہے۔",
            "داخلی راستوں پر میٹ رکھیں تاکہ مٹی پتھر تک پہنچنے سے پہلے رک جائے۔",
            "صاف پانی اور قدرتی پتھر کے لیے بنے نیوٹرل (pH) کلینر سے پونچھا لگائیں، اور فرش گیلا رہے تو نرم کپڑے سے خشک کریں۔",
          ],
        },
        { h2: "کن چیزوں سے بچیں" },
        {
          ul: [
            "سرکہ، لیموں اور تیزابی یا بلیچ والے کلینر، جو ماربل کو مدھم اور خراب کر سکتے ہیں۔",
            "کھردرے پاؤڈر اور رگڑنے والے پیڈ۔",
            "فرنیچر گھسیٹنا۔ کرسیوں اور میزوں کے پایوں کے نیچے فیلٹ پیڈ لگائیں۔",
            "گری ہوئی چیزوں کو دیر تک چھوڑ دینا، خاص طور پر جوس، چائے، تیل اور رنگین مائعات۔",
          ],
        },
        { h2: "گری ہوئی چیزوں سے نمٹنا" },
        { p: "گری ہوئی چیز کو رگڑنے کے بجائے فوراً نرم کپڑے سے دبا کر جذب کریں، کیونکہ رگڑنے سے وہ پھیلتی ہے۔ جگہ کو صاف پانی سے دھو کر خشک کریں۔ اگر نشان رہ جائے تو سخت کیمیکل آزمانے سے پہلے مشورہ کریں، کیونکہ غلط کلینر داغ کو مزید خراب کر سکتا ہے۔" },
        { h2: "سیلنگ" },
        { p: "بہت سے ماربل فرشوں کو ایسے سیلر سے فائدہ ہوتا ہے جو مائعات کے جذب ہونے کی رفتار کم کرتا ہے۔ دوبارہ سیل کرنے کا وقفہ پتھر، فنش اور استعمال پر منحصر ہے۔ ایک آسان جانچ: اگر پانی کے قطرے چند منٹ میں پتھر کو گہرا کر دیں تو شاید دوبارہ سیل کرنے کا وقت ہے۔" },
        { h2: "ماہر کو کب بلائیں" },
        { p: "اگر فرش کے بڑے حصوں کی چمک ختم ہو گئی ہو، گہری خراشیں یا تیزاب کے نشان ہوں، یا سطح ناہموار دکھے، تو ماہرانہ ہوننگ اور پالشنگ سے اکثر اسے بحال کیا جا سکتا ہے۔ پہلے معائنہ بتائے گا کہ پتھر کو کیا چاہیے۔" },
      ],
    },
  },
  {
    slug: "select-tiles-for-kitchens-and-bathrooms",
    category: "planning",
    published: "2026-10-14",
    readingMinutes: 6,
    cover: "bathroomShower",
    relatedServices: ["bathroom-tile-and-marble-installation", "kitchen-tile-and-marble-installation"],
    title: { en: "How to Select Tiles for Kitchens and Bathrooms", ur: "کچن اور باتھ روم کے لیے ٹائلز کا انتخاب کیسے کریں" },
    excerpt: {
      en: "Grip, water resistance, size, grout and layout: what to check before choosing tiles for the hardest-working rooms in the house.",
      ur: "گرفت، پانی سے مزاحمت، سائز، گراؤٹ اور لے آؤٹ: گھر کے سب سے مصروف کمروں کے لیے ٹائلز چننے سے پہلے کیا دیکھیں۔",
    },
    content: {
      en: [
        { p: "Kitchens and bathrooms are where tiles work hardest. They face water, steam, grease, cleaning products and daily traffic, so practical performance should guide the choice as much as appearance." },
        { h2: "Floors: put grip first" },
        { p: "Bathroom and kitchen floors get wet. A matt or textured tile gives more grip than a high-gloss one. Ask about the tile's slip rating where available, especially for showers, and remember that smaller tiles with more grout lines also add grip underfoot." },
        { h2: "Choose a suitable body" },
        { p: "Porcelain tiles absorb very little water and are hard-wearing, which makes them a dependable choice for floors and showers. Ceramic wall tiles are lighter and easier to cut and are well suited to splashbacks and bathroom walls." },
        { h2: "Size and layout" },
        {
          ul: [
            "Large-format tiles mean fewer grout lines and a clean, modern look, but need a very flat surface.",
            "Smaller tiles and mosaics follow slopes towards drains more easily, which suits shower floors.",
            "Plan the layout so cut tiles are balanced at each side and do not end up as thin slivers at doorways or around the basin.",
          ],
        },
        { h2: "Grout matters more than you think" },
        { p: "Grout colour changes the whole look. A matching grout makes the surface read as one, while a contrasting grout highlights the pattern. In kitchens and showers, consider stain-resistant grout options and plan for sealing where recommended." },
        { h2: "Kitchen splashbacks" },
        { p: "Behind the hob and sink, choose a glazed surface that wipes clean easily. Plan the tile edges around sockets, windows and the underside of wall cabinets before fixing so there are no awkward cuts." },
        { h2: "Bring it together with a plan" },
        { p: "Measuring the room and drawing the layout in 2D or 3D lets you see the finished result, check how floor and wall tiles line up, and order the right quantity. This is exactly the planning Nadeem Marbles carries out before work begins." },
      ],
      ur: [
        { p: "کچن اور باتھ روم وہ جگہیں ہیں جہاں ٹائلز سب سے زیادہ محنت کرتی ہیں۔ انہیں پانی، بھاپ، چکنائی، صفائی کی اشیا اور روزانہ کی آمد و رفت کا سامنا ہوتا ہے، اس لیے انتخاب میں عملی کارکردگی اتنی ہی اہم ہے جتنی خوبصورتی۔" },
        { h2: "فرش: گرفت سب سے پہلے" },
        { p: "باتھ روم اور کچن کے فرش گیلے ہوتے ہیں۔ میٹ یا کھردری ٹائل زیادہ چمکدار ٹائل سے بہتر گرفت دیتی ہے۔ جہاں دستیاب ہو، خاص طور پر شاور کے لیے، ٹائل کی سلپ ریٹنگ پوچھیں، اور یاد رکھیں کہ زیادہ گراؤٹ لائنوں والی چھوٹی ٹائلیں بھی گرفت بڑھاتی ہیں۔" },
        { h2: "مناسب قسم کا انتخاب" },
        { p: "پورسلین ٹائلز بہت کم پانی جذب کرتی ہیں اور مضبوط ہوتی ہیں، اس لیے فرش اور شاور کے لیے قابل اعتماد انتخاب ہیں۔ سیرامک دیواری ٹائلز ہلکی اور کاٹنے میں آسان ہوتی ہیں اور کچن کی دیوار اور باتھ روم کی دیواروں کے لیے موزوں ہیں۔" },
        { h2: "سائز اور لے آؤٹ" },
        {
          ul: [
            "بڑے سائز کی ٹائلز میں گراؤٹ لائنیں کم اور تاثر صاف اور جدید ہوتا ہے، مگر انہیں بالکل ہموار سطح چاہیے۔",
            "چھوٹی ٹائلز اور موزیک نالی کی طرف ڈھلوان کو آسانی سے اپناتی ہیں، جو شاور کے فرش کے لیے موزوں ہے۔",
            "لے آؤٹ اس طرح بنائیں کہ کٹی ٹائلیں دونوں طرف متوازن ہوں اور دروازوں یا بیسن کے گرد باریک پٹیاں نہ بنیں۔",
          ],
        },
        { h2: "گراؤٹ آپ کی سوچ سے زیادہ اہم ہے" },
        { p: "گراؤٹ کا رنگ پورا تاثر بدل دیتا ہے۔ ہم رنگ گراؤٹ سطح کو یکجا دکھاتا ہے، جبکہ متضاد گراؤٹ پیٹرن کو نمایاں کرتا ہے۔ کچن اور شاور میں داغ سے مزاحم گراؤٹ پر غور کریں اور جہاں تجویز ہو وہاں سیلنگ کی منصوبہ بندی کریں۔" },
        { h2: "کچن کی دیوار (اسپلیش بیک)" },
        { p: "چولہے اور سنک کے پیچھے ایسی گلیزڈ سطح چنیں جو آسانی سے صاف ہو۔ فکسنگ سے پہلے ساکٹس، کھڑکیوں اور اوپری کیبنٹ کے نیچے ٹائل کے کناروں کی منصوبہ بندی کریں تاکہ عجیب کٹنگ نہ ہو۔" },
        { h2: "منصوبہ بندی سے سب کچھ یکجا کریں" },
        { p: "کمرے کی پیمائش اور 2D یا 3D میں لے آؤٹ بنانے سے آپ مکمل نتیجہ دیکھ سکتے ہیں، فرش اور دیوار کی ٹائلوں کی سیدھ جانچ سکتے ہیں اور درست مقدار منگوا سکتے ہیں۔ ندیم ماربلز کام شروع کرنے سے پہلے بالکل یہی منصوبہ بندی کرتا ہے۔" },
      ],
    },
  },
];

// Newer guides live in blogGuides.js; the starter articles are listed first.
export const blogPosts = [...starterPosts, ...guidePosts];

export function getPost(slug) {
  return blogPosts.find((post) => post.slug === slug);
}
