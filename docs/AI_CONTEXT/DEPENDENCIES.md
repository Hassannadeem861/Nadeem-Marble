# Dependencies

| Package | Version | Used for |
|---|---|---|
| next | 16.4.3 | Framework (upgraded for a security fix; keep `eslint-config-next` in step) |
| react, react-dom | 19.3.0 | UI |
| tailwindcss, @tailwindcss/turbopack | ^4 | Styling (loaded through a Turbopack CSS rule in `next.config.mjs`) |
| @base-ui/react | ^1.9.0 | Primitives behind `components/ui` (shadcn, `components.json`) |
| class-variance-authority, cn | | Button variants, class merging |
| gsap, @gsap/react | ^3.15 / ^2.1 | Scroll/reveal motion (lazy) |
| three | ^0.186.1 | 3D tile visualizer only |
| lenis | 1.3.26 (pinned) | Smooth scrolling |
| nextjs-toploader | 3.9.17 (pinned) | Route progress bar |
| lucide-react | ^1.57 | Icons |
| server-only | | Guards `lib/dictionaries.js` |
| tw-animate-css | | Animation utilities |
| sharp (dev) | ^0.35 | Image scripts |
| shadcn (dev) | ^4 | Component generator |
| eslint, eslint-config-next | ^9 / 16.4.3 | Lint |

## Cautions
- Do not upgrade Next/React without reading `node_modules/next/dist/docs/` and running a full build: this project relies on Next 16 APIs (`proxy.js`, `cacheComponents`, `globalNotFound`, async `params`).
- Never add npm `scripts` like `preinstall`/`postinstall` or unknown packages; unexpected changes to `package.json` scripts were part of the malware incidents.
