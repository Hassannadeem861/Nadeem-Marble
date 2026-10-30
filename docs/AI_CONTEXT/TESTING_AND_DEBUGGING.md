# Testing and debugging

## Checks
No automated test suite exists. After a change:
```
npm run lint
npm run build
npm run start   # then open /en and /ur pages you changed
```

## Common errors
| Symptom | Cause / fix |
|---|---|
| Build fails with `EBUSY ... rmdir .next/server/app` (Windows) | A shell or process is holding `.next`; move out of the folder / stop `next start`, then rebuild |
| Build sometimes fails once then passes | Retry the build once |
| `SecurityFatalError` at startup | Outdated Next; must stay on 16.4.3+ |
| ESLint "purity" error | No `Date.now()`/`performance.now()` during render; move into handlers or a module-level helper (see `ContactForm.js`) |
| `[text](/path)` shows as raw text | Inline links only render in `p` and `ul` blocks, not table cells or FAQs |
| Page 404 for a new slug | Missing in the data file or `generateStaticParams` source |
| Contact form says not configured | `EMAILJS_*` env vars missing |

## Known limitations / technical debt
- Contact rate limiting is per serverless instance (in-memory), not global.
- Blog table cells and FAQ answers do not support inline links.
- React keys in blog tables/lists use cell/item text; duplicate text in the same row or list can trigger key warnings.
- `isProjectIndexable` always returns true.
- `site.js` has `TODO(client)` items (WhatsApp number confirmation, founding year).
- Git history contains two malicious commits (removed from the tree); do not check them out.
