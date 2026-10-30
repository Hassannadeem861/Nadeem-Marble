# Environment and deployment

## Environment variables (names only; see `.env.example`)
| Name | Scope | Purpose |
|---|---|---|
| NEXT_PUBLIC_SITE_URL | public | Base URL for canonical, hreflang, OG, sitemap, robots. Default `https://nadeem-marble.vercel.app` |
| EMAILJS_SERVICE_ID | server | EmailJS service |
| EMAILJS_TEMPLATE_ID | server | EmailJS template (recipient email is set here, in the EmailJS dashboard) |
| EMAILJS_PUBLIC_KEY | server | EmailJS user id |
| EMAILJS_PRIVATE_KEY | server | EmailJS access token |
| VERCEL | platform | Set by Vercel; enables IP/location headers in the contact email |

If any `EMAILJS_*` is missing, forms fall back to "prepare message" (WhatsApp/email) and `/api/contact` returns 503.

## Local setup
```
npm install
cp .env.example .env.local   # fill values locally, never commit
npm run dev
```

## Deployment
- Vercel, Next.js preset, no `vercel.json`. Pushes to `main` on GitHub deploy.
- Old domain `haroon-marble.vercel.app` 308-redirects to the current origin (`src/proxy.js`); update `CURRENT_ORIGIN` there and `NEXT_PUBLIC_SITE_URL` if the domain changes.
- After domain changes: re-verify in Google Search Console and resubmit `/sitemap.xml`.
