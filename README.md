# Nadeem Marbles website

Bilingual (English / Urdu) business website for **Nadeem Marbles**, a tiles and marble design and installation business.
_Tiles | Marble | Quality Work_

Built with Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4, shadcn/ui (Base UI, RTL-aware), GSAP and Lucide icons. All content is local JavaScript data, and every page is prerendered as static HTML.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000 (redirects to /en)
npm run lint
npm run build      # production build
npm run start      # serve the production build
npm run assets     # regenerate favicon, logo PNG and Open Graph image
```

Copy `.env.example` to `.env.local` to set environment variables locally.

## Deploy to Vercel (free Hobby plan)

1. Push this folder to a GitHub, GitLab or Bitbucket repository.
2. In Vercel, choose **Add New → Project** and import the repository. The Next.js framework preset and default build settings are correct; no `vercel.json` is needed.
3. Under **Environment Variables**, add `NEXT_PUBLIC_SITE_URL` with the final public URL, e.g. `https://haroonmarble.com` (no trailing slash). Without it, canonical URLs, hreflang tags and the sitemap point at `https://nadeem-marble.vercel.app`.
4. Deploy. If you add a custom domain later, update `NEXT_PUBLIC_SITE_URL` and redeploy.
5. After going live, verify the domain in Google Search Console and submit `/sitemap.xml`.

Notes for the free plan: the Proxy (locale redirect) runs as a lightweight function, and images are served through Vercel Image Optimization, which has a monthly free allowance; this site has about 30 source images.

## Languages and URLs

- Every page exists at `/en/...` and `/ur/...`. English is the default.
- `src/proxy.js` redirects unprefixed URLs (`/`, `/about`) to the visitor's saved language, falling back to English. The language switcher keeps the current page and stores the choice in a `NEXT_LOCALE` cookie.
- Urdu pages render with `lang="ur"` and `dir="rtl"` in Noto Nastaliq Urdu. That font is not preloaded, so English pages never download it.
- Each page declares its own canonical URL plus `en`, `ur` and `x-default` hreflang alternates. The sitemap lists the same alternates.

## Where content lives

| What | File |
| --- | --- |
| Phone, email, WhatsApp, owner name, address, hours | `src/data/site.js` |
| Services (with `verified` flag) | `src/data/services.js` |
| Industries | `src/data/industries.js` |
| Portfolio projects | `src/data/projects.js` |
| Blog articles | `src/data/blogPosts.js` |
| Process, pillars, standards, material swatches | `src/data/company.js` |
| Images: sizes, bilingual alt text, credits | `src/data/images.js` |
| In-depth service landing content (problems, options, FAQs, related guides) | `src/data/serviceLandings.js` |
| Newer guides (marble types, tile sizes, patterns, quantity calculator) | `src/data/blogGuides.js` |
| FAQs for each page | `src/data/faqs.js` |
| Statistics, client testimonials, events | `src/data/socialProof.js` |
| "Why choose us" reasons | `src/data/company.js` (`reasons`) |
| Interface text (English / Urdu) | `src/dictionaries/en.js`, `src/dictionaries/ur.js` |

### Statistics, testimonials and events

These sections (the animated counter, the testimonial slider and "Events we participated in") are built and animated, but are **not shown anywhere until real data is added** to the lists in `src/data/socialProof.js` (the file shows the entry format). Each section appears automatically once its list has entries.

Only add genuine figures, events and testimonials (with the client's permission). Invented numbers or reviews mislead customers, and fake reviews are illegal in many countries.

To add a blog post, project or service, add an entry to the relevant data file with both `en` and `ur` text. Its page, sitemap entry and metadata are generated automatically.

**Search indexing rule:** all services are currently confirmed and indexed. A service set to `verified: false` would be published with `noindex, follow` and left out of the sitemap. All portfolio pages are indexed. Because they use stock photos, the section is presented as **Design Ideas** (URL `/portfolio`); do not rename it to "Projects" or "Our work" while stock photos are used. Add real projects with `illustrative: false` once photos are available.

## Contact form

The site has no backend, so by default the form never sends anything itself. After validation it shows the prepared enquiry and offers **Send via WhatsApp** and **Send via email**. These open the visitor's own app with the details filled in, and the page says clearly that nothing is sent until they press send there.

Direct email delivery (optional): create a free access key at [web3forms.com](https://web3forms.com) using the business email, then set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in Vercel and redeploy. The form then posts to Web3Forms and shows success only when the service confirms delivery; on failure it shows an error with direct contact options. Web3Forms access keys are designed to be public (they only allow sending to the registered email). Check its current free-plan limits on its pricing page before relying on it, and send a test enquiry after deploying.

## Before publishing: information needed from Nadeem Marbles

Nothing below was invented. Each item is hidden or clearly labelled until supplied.

- [ ] **Owner's name** and preferred title (`site.owner` in `src/data/site.js`). The About page currently says "Founder, Nadeem Marbles".
- [ ] **Confirm the owner portrait.** `public/images/founder-portrait.webp` is the portrait supplied for the project. Confirm the subject approves it and that it is an accurate likeness, or replace it with a real photograph.
- [ ] **Confirm WhatsApp** is active on +92 316 4593747 (calls go to +92 315 1283438).
- [ ] **Opening hours and service areas.** Once added to `site.js`, they can be shown on the Contact page. (The business address is already set.)
- [ ] **Confirm the industries** served (`industries.js`). The page currently asks visitors to confirm availability.
- [ ] **Real projects.** The six entries in Design Ideas use stock photos. Add real projects (with `illustrative: false`) when photos are available.
- [ ] **Read the eight blog guides** to make sure the advice matches how Nadeem Marbles works.
- [ ] **Social media profiles**, if any (`site.socialProfiles`).
- [ ] **Logo source file.** The logo is recreated in SVG from the hiring poster (`src/components/shared/LogoMark.js`, `public/images/logo-mark.svg`). Replace it with the original artwork if available.
- [ ] Years of experience, project counts, certifications, warranties and testimonials: add only verified figures.

## Images

Photos in `public/images/stock/` come from Unsplash (Unsplash License) and two from Wikimedia Commons (CC BY 2.0 and CC BY 3.0, which require attribution). Every credit is listed on the `/image-credits` page, generated from `src/data/images.js`. None of them shows Nadeem Marbles' own work. Replace them with authentic project photography over time, especially the portfolio, service and "craft" images.

## Notes on technical choices

- **Static content, no database or CMS.** All pages are prerendered at build time.
- **GSAP** is loaded lazily after the page renders (`src/hooks/useLazyGsap.js`) and is skipped entirely for visitors who prefer reduced motion. It is used for section entrances (fade-up, image wipe reveals, drawn process lines), a scroll-linked hero, a subtle hero image settle, a gentle parallax, the 3D tile transitions and portfolio filter transitions (Flip).
- **Three.js** powers the home-page tile visualiser (`src/components/home/visualizer/`): visitors pick a stone, a laying pattern and a finish and see it as a 3D tiled floor. three.js is loaded only when that section nears the viewport, rendering pauses off-screen, motion is reduced for visitors who ask for it, and browsers without WebGL see a still image.
- **SEO:** unique titles and descriptions per page and language, canonical and hreflang tags, Open Graph and Twitter cards, `sitemap.xml`, `robots.txt`, breadcrumbs, and JSON-LD (Organization, WebSite, BreadcrumbList, Article, and Service for confirmed services only). Rankings depend on content, links and time; monitor Search Console after launch.
