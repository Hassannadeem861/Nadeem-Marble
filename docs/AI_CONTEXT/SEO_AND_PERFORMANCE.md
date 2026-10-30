# SEO and performance

## Metadata
- Every page: `generateMetadata` → `buildMetadata` (`src/lib/seo.js`): unique title (brand suffix via template), description, canonical, hreflang `en`/`ur`/`x-default` (= en), Open Graph (`en_PK`/`ur_PK`), Twitter card.
- Root layout adds Google Search Console verification meta and `robots: index, follow`.
- `noIndex` pages: unverified services.

## Sitemap and robots
- `/sitemap.xml` from `src/app/sitemap.js` (static routes, verified services, projects, posts, area pages × 2 locales, with alternates). 124 URLs as of 2026-10-30.
- `/robots.txt` allows all and points to the sitemap.

## Structured data (`src/lib/structured-data.js`, rendered by `JsonLd`)
Organization (HomeAndConstructionBusiness, with address, hours, geo, Google Business `hasMap`), WebSite, BreadcrumbList, Article (blog), Service (service pages). No AggregateRating/Review (none exist).

## Images
- `next/image` via `RegistryImage`; formats AVIF/WebP, qualities 75/85 (`next.config.mjs`).
- Stock images stored as ~1600px WebP in `public/images/stock/`; `npm run images:audit|optimize|verify` (sharp) for checks.
- Every image has en/ur alt text.

## Performance
- All pages prerendered; `cacheComponents` + `partialPrefetching`.
- three.js loaded only when the visualizer runs (dynamic import); GSAP lazy-loaded (`useLazyGsap`, dynamic import).
- Fonts via `next/font` (self-hosted).

## Checking
After content changes: build, then confirm in `.next/server/app/{en,ur}/...html` one `<h1>`, canonical/hreflang, no raw `[text](/path)` left, and no broken internal links.
