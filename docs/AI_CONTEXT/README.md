# AI context docs

Start with [/AI_INSTRUCTIONS.md](../../AI_INSTRUCTIONS.md). Then open only what the task needs:

| File | Read when |
|---|---|
| [PROJECT_ARCHITECTURE.md](PROJECT_ARCHITECTURE.md) | Routing, folder structure, request/data flow, diagrams |
| [FILE_REFERENCE.md](FILE_REFERENCE.md) | Changing a lib, data or route file |
| [COMPONENT_REFERENCE.md](COMPONENT_REFERENCE.md) | Using or changing a component |
| [API_DOCUMENTATION.md](API_DOCUMENTATION.md) | Contact form / `/api/contact` |
| [BUSINESS_LOGIC.md](BUSINESS_LOGIC.md) | Content rules, data shapes, calculators, gating |
| [SEO_AND_PERFORMANCE.md](SEO_AND_PERFORMANCE.md) | Metadata, sitemap, schema, images, performance |
| [ENVIRONMENT_AND_DEPLOYMENT.md](ENVIRONMENT_AND_DEPLOYMENT.md) | Env vars, local setup, Vercel |
| [DEPENDENCIES.md](DEPENDENCIES.md) | Packages and upgrade cautions |
| [TESTING_AND_DEBUGGING.md](TESTING_AND_DEBUGGING.md) | Checks, common errors, known issues |

Not present in this project (do not create docs or code assuming them): database, ORM, authentication, user accounts, file uploads, CMS, global state library, automated tests.

## Documentation status

Last verified: 2026-10-30 against commit `418c889`.

- Analyzed: `src/proxy.js`, `src/lib/*`, `src/app/[locale]/layout.js`, `src/app/sitemap.js`, `src/app/robots.js`, `src/app/api/contact/route.js`, blog `[slug]` renderer, route-to-data mapping of all pages, component exports and props, data file exports, `package.json`, `next.config.mjs`, `.env.example`.
- Partially analyzed (exports and purpose only, not line by line): page component bodies, `ContactForm.js` UI, `TileVisualizer.js`/`tileScene.js`, home motion components, nav menus, dictionaries content, large content files (`serviceLandings.js`, `blogGuides.js`).
- Not analyzed: `scripts/*.mjs` internals, `src/components/ui/*` (stock shadcn), `seo-tools/` (local Search Console helper, not part of the site).
- Open questions: none blocking. Business facts marked `TODO(client)` in `site.js` await the owner.

## Keeping docs current

When a change touches architecture, routes, the API, a shared component's props, env vars or dependencies: update the matching file above (only the affected section), update `AI_INSTRUCTIONS.md` if a rule or path changed, and refresh "Last verified" here.
