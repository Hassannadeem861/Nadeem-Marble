# API

Only one endpoint exists. No auth.

## POST /api/contact
File: `src/app/api/contact/route.js`. Called by `ContactForm` and `AreaBooking` only when `canSendDirect` is true (the page checks that all four `EMAILJS_*` env vars are set).

### Request (JSON)
| Field | Max | Rule |
|---|---|---|
| name | 100 | required |
| enquiry | 120 | required |
| phone | 30 | phone or email required; `/^\+?[\d\s()-]{7,20}$/` |
| email | 254 | basic email pattern |
| propertyType, location | 120 | optional |
| message | 3000 | optional |
| pageUrl | 500 | kept only if same origin as site/request |
| website | – | honeypot, must be empty |
| elapsedMs | – | number, must be >= 3000 |
| browserTimezone | – | optional, validated pattern |

### Processing order
1. Missing env config → `503 {ok:false,error:"not_configured"}`.
2. Bad JSON → `400 invalid`.
3. Honeypot filled or `elapsedMs` < 3000 → fake `200 {ok:true}` (nothing sent).
4. Rate limit 5 per 10 min per IP (in-memory, per serverless instance, best effort) → `429 rate_limited`.
5. Validation fails → `400 invalid`.
6. Adds Karachi-time timestamp and, on Vercel only, IP and approximate IP location/timezone headers.
7. Sends to EmailJS REST (`template_params`: subject, from_name, reply_to, summary_html (HTML-escaped table), summary_text).
8. EmailJS failure → `502 send_failed` (logged); success → `200 {ok:true}`.

The recipient address is set in the EmailJS template (dashboard), not in code.
