# Component reference

Props verified from the function signatures. Server components unless noted "client". Most take `locale` + `dict` (full dictionary) or `labels` (strings passed into client components).

## Layout (`components/layout`)
| Component | Props | Notes |
|---|---|---|
| Header | locale, dict | Builds menus with `buildNavMenus` |
| DesktopNav (client) | locale, items, menus, label | |
| MobileNavigation (client) | locale, dir, items, menus, labels, contact | Base UI sheet |
| LanguageSwitcher (client) | locale, label, srLabel, className, onNavigate | Sets `NEXT_LOCALE` cookie |
| Footer | locale, dict | |
| FloatingActions (client) | whatsappHref, labels | WhatsApp + scroll buttons |
| SmoothScroll (client) | – | Lenis |

## Shared (`components/shared`)
| Component | Props | Notes |
|---|---|---|
| PageHeader | locale, dict, breadcrumbs, eyebrow, title, text, imageKey, children | Page H1 + breadcrumbs; optional image |
| CtaBand | locale, dict, title?, text? | Call/WhatsApp band with `phoneMockup` image |
| RegistryImage | imageKey, locale, sizes, fill, hero, quality, className, alt | Only way to show registry images |
| SectionHeading / SectionHeadingWithLink / Eyebrow | id, eyebrow, title, text, onDark, align, as | |
| SplitHeading | id, top, accent, as, onDark, className | Two-tone heading |
| Breadcrumbs | locale, label, items, onDark | |
| ButtonLink | href, variant, size, external, ... | |
| EnquiryPanel | locale, dict, title, text, topic, serviceSlug | |
| LegalPage | locale, dict, path, title, document | Privacy / Terms |
| PhoneMockups | labels, areas, area | CSS-only two-phone mockup (area pages) |
| PillarsGrid, ProcessSteps, Commitments | locale (+ eyebrow/title/text) | Data from `company.js` |
| Reveal (client) | children, className, stagger, as | GSAP reveal |
| Icon | name, className | Lucide by name |
| Logo, LogoMark | locale?, onDark, className | |

## Proof (`components/proof`)
FaqSection(locale, dict, page, items) — uses `faqs[page]` or `items`; visible accordion only, deliberately no FAQPage schema. StatsSection, HeroStats(locale), WhyCards, WhyChooseSection, EventsSection, TestimonialsSection (render nothing while data arrays are empty), TestimonialSlider (client), CountUp (client).

## Feature components
| Component | Props |
|---|---|
| contact/ContactForm (client) | labels, serviceOptions, projectTypeOptions, contact, canSendDirect |
| serviceAreas/AreaBooking (client) | areas, services, labels, canSendDirect, defaultArea |
| serviceAreas/AreaDirectory (client) | areas, labels |
| serviceAreas/ServiceGrid | locale, top, accent, text, linkLabel |
| blog/BlogExplorer (client) | items, categories, featuredKey, labels |
| blog/QuantityCalculator (client) | labels |
| portfolio/PortfolioExplorer (client) | filters, items, labels |
| portfolio/ProjectGallery (client) | images, title, dir, labels |
| cards/ArticleCard, ProjectCard, ServiceCard | post/project/service, locale, dict, headingLevel |
| home/* | locale, dict (HomeHero, MarbleFeature, MaterialGallery, SectorsSection); motion wrappers take children, className |
| home/visualizer/TileVisualizer (client) | locale, materials, contrastIds, labels — loads `tileScene.js` (three.js) on demand; room presets (`ROOMS`), lighting, room-size tile estimate, keyboard control in full screen |
| seo/JsonLd | data |

`components/ui/*` are stock shadcn components (Base UI); change them only for global UI fixes.

## Room visualizer (`components/roomVisualizer`, page `/room-visualizer`)
| Component | Props | Notes |
|---|---|---|
| RoomVisualizer (client) | materials, samples, labels | Room photo (sample from `data/roomSamples.js` or visitor upload, processed locally) with tiles per surface (floor, back/left/right wall, ceiling). Room modelled as a box: `inner` far-wall corners + `outer` near frame; draggable corner handles. Before/after, grout, room size (ft) for tile scale, WhatsApp/download |
| roomRenderer.js | – | Raw WebGL2, loaded with dynamic import. Homography per surface, grout, photo light preserved, `keep` polygons (fixtures) drawn over tiles |

Uploaded photos have no `keep` mask, so fixtures in front of a wall get tiled over (known limitation).
