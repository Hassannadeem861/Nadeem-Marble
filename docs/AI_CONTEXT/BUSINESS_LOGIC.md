# Business logic and content rules

## Facts
- Business: Nadeem Marbles, founder Muhammad Nadeem, Reta Plot, Shah Faisal Colony, Sector 23, Karachi 75230; open 24/7; 20+ years of experience; serves all of Karachi (secondary: Pakistan). Source of truth: `src/data/site.js`.
- Unknown facts stay `null` and are hidden (e.g. `foundingYear`). `socialProfiles` holds the Facebook page (footer link + schema `sameAs`). Do not fill them without the owner.
- No real reviews, ratings, testimonials, project counts or prices exist. Never add them to content or schema.

## Gating
- `services[].verified`: `true` = confirmed; `false` = page renders with noindex and is excluded from the sitemap (`isServiceIndexable`).
- `isProjectIndexable` currently returns `true` for all projects.
- Area list (`serviceAreas.js`) is owner-supplied; do not add areas without confirmation. Home/area stat = `floor(serviceAreas.length / 10) * 10` + "+".

## Content shapes
- Localized field: `{ en, ur }`, read with `pick()`.
- Blog post / guide: `slug, category (planning|care|choosing), published (YYYY-MM-DD), readingMinutes, cover (image key), relatedServices [service slugs], title, optional seoTitle, excerpt (<=160 chars), content { en: [blocks], ur: [blocks] }, optional faqs [{ q:{en,ur}, a:{en,ur} }]`.
- Blocks: `{ p }`, `{ h2 }`, `{ ul: [] }`, `{ table: { head, rows } }`, `{ calculator: true }`. Inline links `[text](/path)` work in `p` and `ul`.
- Area page: see `src/data/areaPages.js` (area, slug, intro, landmarks, nearby, en/ur). Avoid near-duplicate area pages (doorway risk).
- Image entry: `src, width, height, alt {en,ur}, credit` (use `unsplash`/`pexels`/`commons` helpers).

## Calculations
- `QuantityCalculator` (blog): `tiles = ceil(area / tileArea × (1 + wastage/100))`, wastage default 10% (`src/components/blog/QuantityCalculator.js` line 36).
- `TileVisualizer`: 3D floor preview with selectable materials, sizes, pattern, finish, grout and lighting (day / warm bulbs / tube light); room presets set a suggested size + finish and show a tip with a guide link; room length × width (ft) gives area and tiles needed with the same 10% wastage; visitor can upload their own tile photo (client-side only, not uploaded). Settings, room and estimate go into the WhatsApp message.

## Writing rules (owner)
Helpful-first, Karachi-first, natural Urdu, no invented facts, no keyword stuffing, honest claims. Owner prefers replies in Roman Urdu and minimal changes.
