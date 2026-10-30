# AI_INSTRUCTIONS — read this first

Nadeem Marbles website: bilingual (English/Urdu, RTL) marketing site for a Karachi tiles and marble installation business. Static content, one API route (contact email). No database, no auth, no CMS.

Live: https://nadeem-marble.vercel.app (Vercel). Repo: GitHub `Hassannadeem861/Nadeem-Marble`, branch `main`.

## Stack (exact, from package.json)

Next.js 16.4.3 (App Router, Turbopack, `cacheComponents`, `partialPrefetching`), React 19.3.0, Tailwind CSS 4, shadcn/ui on Base UI (`@base-ui/react`), GSAP 3 (+ `@gsap/react`), three.js 0.186 (3D tile visualizer only, lazy-loaded), Lenis 1.3.26 (smooth scroll), nextjs-toploader 3.9.17, lucide-react. Plain JavaScript (no TypeScript). Node >= 20.9.

**This Next.js differs from older versions.** Read `node_modules/next/dist/docs/` before using a Next API (see `AGENTS.md`). Middleware is `src/proxy.js` (exports `proxy`), not `middleware.js`.

## Where things are

| Need | Go to |
|---|---|
| Business facts (name, phone, email, address, hours, Google Business) | `src/data/site.js` |
| UI text in both languages | `src/dictionaries/en.js`, `src/dictionaries/ur.js` (same key shape) |
| Services / service page bodies | `src/data/services.js`, `src/data/serviceLandings.js` |
| Blog posts / guides | `src/data/blogPosts.js` (starter posts + categories), `src/data/blogGuides.js` (guides) |
| Area pages / area list | `src/data/areaPages.js` (14 pages), `src/data/serviceAreas.js` (120 names, owner-supplied) |
| Images + credits | `src/data/images.js` (registry), files in `public/images/stock/` |
| Routes | `src/app/[locale]/...` |
| SEO helpers / JSON-LD | `src/lib/seo.js`, `src/lib/structured-data.js`, `src/app/sitemap.js`, `src/app/robots.js` |
| Contact API | `src/app/api/contact/route.js` |

Detailed docs: [docs/AI_CONTEXT/README.md](docs/AI_CONTEXT/README.md).

## Conventions

- Every page lives under `/en` or `/ur`. Build links with `localizePath(locale, path)`; read `{ en, ur }` fields with `pick(field, locale)` (`src/lib/i18n.js`).
- Page metadata always via `buildMetadata({ locale, path, title, description })` — it sets canonical, hreflang (en, ur, x-default) and OG. Title gets ` | Nadeem Marbles` appended automatically.
- Content is data, not JSX: add a service/post/area by adding an object to the data file; routes, sitemap and nav pick it up.
- Every new user-visible string needs both `en` and `ur` (natural Urdu, not word-for-word).
- Images only through the registry (`RegistryImage imageKey="..."`), each with en/ur alt and a `credit` (shown on `/image-credits`).
- Components: PascalCase files, named exports; data files export camelCase arrays/objects. Import alias `@/` = `src/`.
- Styling: Tailwind utility classes + tokens in `src/app/globals.css` (charcoal, ivory, gold, gold-deep, muted-foreground). Use logical properties (`ms-`, `pe-`, `start-`) for RTL. Container class `container-page`.
- Server components by default; `"use client"` only for interactive pieces (forms, explorers, motion, visualizer).

## Content rules (owner's standing rules)

- Never invent facts: no prices, ratings, reviews, testimonials, project counts, guarantees, "best in Karachi", response times. `testimonials`/`events` are intentionally empty.
- Services with `verified: false` render as noindex and stay out of the sitemap.
- Karachi first; natural Urdu; helpful-first writing. Meta description <= 160 chars.
- Blog inline links: `[text](/path)` inside `p` and `ul` items (not table cells or FAQs).

## Commands

```
npm run dev     # localhost:3000 -> redirects to /en
npm run lint    # eslint
npm run build   # production build (on Windows, retry once if it fails with EBUSY on .next)
npm run start
```
No automated tests exist. Verify with lint + build, then check the built pages.

## Do not break

Locale redirect + old-host 308 (`src/proxy.js`); hreflang/canonical; sitemap; contact form fallback (works without EmailJS env vars via WhatsApp/email); RTL layout; image credits page; `verified` gating of services.

## Security

- The repo was hit twice by unauthorized pushes that injected obfuscated malware (`init`, `.vscode/tasks.json`, `*.orc` "font" files under `src/app/.../public/fonts`, altered `package.json` scripts). Before pulling, check `git log origin/main` for unexpected commits and never run unknown scripts.
- Never commit `.env*` values or `seo-tools` credentials. EmailJS keys are server-only (no `NEXT_PUBLIC_`).

## Mandatory rules for AI assistants

1. Always read `AI_INSTRUCTIONS.md` before working.
2. Read only the relevant detailed documentation for the task.
3. Inspect the actual source files before modifying them.
4. Do not blindly trust documentation if the source code has changed.
5. Never do a full-project analysis for small tasks.
6. Never rewrite existing functionality without a clear requirement.
7. Reuse existing components, utilities and patterns.
8. Make the smallest safe changes.
9. Do not upgrade dependencies without explicit need.
10. Never invent APIs, database fields, routes, business rules or functionality.
11. Preserve existing behavior unless the task requires a change.
12. Run lint and build after changes.
13. Update these docs when architecture, APIs, components or important behavior change.
14. Report exactly which files changed and why.
15. Clearly mention anything that could not be verified.

Commit or push only when the owner asks.
