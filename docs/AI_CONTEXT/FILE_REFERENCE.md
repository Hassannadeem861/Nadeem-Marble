# File reference

Line numbers verified 2026-10-30; re-check before relying on them.

## src/proxy.js
Redirects every request without `/en` or `/ur` prefix to the `NEXT_LOCALE` cookie locale (default `en`); 308-redirects the old host `haroon-marble.vercel.app` to `CURRENT_ORIGIN`. `config.matcher` excludes `_next/`, `api/` and files with extensions. Breaking it breaks every URL. Keep the export name `proxy` (Next 16).

## src/lib/i18n.js
`locales`, `defaultLocale`, `LOCALE_COOKIE`, `localeMeta` (dir, ogLocale), `hasLocale`, `getDirection`, `localizePath(locale, path)`, `stripLocale(pathname)`, `pick(field, locale)` (falls back to `en`). Client-safe: keep it free of server-only imports. Used by nearly every file.

## src/lib/dictionaries.js
`getDictionary(locale)` returns `dictionaries/en.js` or `ur.js`. `server-only`: client components receive strings via props (`labels`).

## src/lib/seo.js
- `absoluteUrl(path)`, `OG_IMAGE` (`/images/og-default.jpg`).
- `localeAlternates(locale, path)` → `{ canonical, languages: { en, ur, x-default } }`. Used by metadata and `sitemap.js`.
- `buildMetadata({ locale, path, title, description, absoluteTitle, image, type, publishedTime, noIndex })` (lines 23-55): calls `notFound()` for invalid locale; appends ` | site.name` unless `absoluteTitle`; `noIndex` → `robots: { index:false, follow:true }`.

## src/lib/structured-data.js
`organizationSchema` (HomeAndConstructionBusiness, line 11), `websiteSchema` (54), `breadcrumbSchema` (67), `articleSchema` (80), `serviceSchema` (97). Values come only from `site.js`; null fields are omitted. Do not add ratings/reviews/prices (owner has none).

## src/app/[locale]/layout.js
`generateStaticParams` (locales); root metadata with title template and Google Search Console verification token; renders `<html lang dir>`, toploader, `SmoothScroll`, skip link, `Header`, `main#main`, `Footer`, `FloatingActions`.

## src/app/sitemap.js
Builds entries from `staticRoutes` (`data/navigation.js`), verified services, indexable projects, all `blogPosts`, all `areaPages`, one per locale with hreflang alternates. `lastModified` only for posts. New data entries appear automatically.

## src/app/[locale]/blog/[slug]/page.js
Article renderer. `renderInline` (line 45) turns `[label](/path)` into localized `<Link>`. `ArticleBlock` (line 57) renders `{h2}`, `{calculator}` (QuantityCalculator), `{table:{head,rows}}` (first cell of each row is a row header; cells are plain text), `{ul}` (inline links supported), `{p}`. Also outputs Article + Breadcrumb JSON-LD, related services, FAQ (`post.faqs`) and CtaBand.

## src/app/api/contact/route.js
See [API_DOCUMENTATION.md](API_DOCUMENTATION.md).

## Data files (src/data)
| File | Exports | Notes |
|---|---|---|
| site.js | `site`, `telHref`, `mailHref`, `whatsappHref(msg)`, `mapsHref`, `mapsEmbedHref` | Single source of business facts; `null` = hidden |
| services.js | `services`, `getService`, `verifiedServices`, `isServiceIndexable` | `verified` flag gates indexing |
| serviceLandings.js | `serviceLandings`, `getServiceLanding` | Long-form service page sections |
| blogPosts.js | `blogCategories`, `blogPosts` (= starter + `guidePosts`), `getPost` | |
| blogGuides.js | `guidePosts` | Append new guides before final `];` |
| areaPages.js | `areaPages`, `getAreaPage`, `areaPageSlug` | 14 area pages |
| serviceAreas.js | `serviceAreas` | Owner-supplied list; `aka` search aliases, `base` = business area |
| images.js | `images`, `getImage` | Registry with `credit` helpers `unsplash`, `pexels`, `commons` |
| navigation.js | `mainNavigation`, `staticRoutes`, `serviceMenuGroups`, `categoryMenuText` | |
| projects.js | `projectCategories`, `projects`, `isProjectIndexable`, `getProject` | |
| company.js | `pillars`, `processSteps`, `commitments`, `materialSwatches`, `reasons` | |
| faqs.js | `faqs` (per page key) | |
| socialProof.js | `stats` (areas count derived from `serviceAreas.length`), `testimonials=[]`, `events=[]` | Keep empty unless real |
| legal.js | `privacyPolicy`, `termsAndConditions` | |
| industries.js | `industries` | |

## Other lib
`format.js`: `format(template, values)`, `searchKey`, `formatDate(iso, locale)`. `fonts.js`: next/font setup, `fontVariables`. `navMenus.js`: `buildNavMenus(locale, dict)`. `smoothScroll.js`: Lenis helpers. `utils.js`: `cn`.

## Safe modification
- Adding content: edit data files only; run build to confirm sitemap/metadata.
- Changing a shared helper (`i18n`, `seo`, `site`): affects every page — run the full build and spot-check `/en` and `/ur` pages.
- Renaming a slug changes a public URL: avoid, or add a redirect.
