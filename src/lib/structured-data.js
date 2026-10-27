// JSON-LD builders. Only facts present in src/data/site.js are emitted, so
// unknown details (address, hours, ratings, founding date) never appear.

import { site } from "@/data/site";
import { localizePath, pick } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";

const ORGANIZATION_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

export function organizationSchema(locale) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": ORGANIZATION_ID,
    name: site.name,
    url: absoluteUrl(localizePath(locale)),
    logo: absoluteUrl("/images/logo-nadeem-marbles.webp"),
    image: absoluteUrl("/images/og-default.jpg"),
    slogan: pick(site.tagline, "en"),
    email: site.email,
    telephone: site.phone,
    knowsAbout: ["Tile installation", "Marble installation", "2D/3D surface modelling", "Tile pattern and layout design"],
    // A plain string is valid for schema.org's address property; we only have
    // one confirmed line of text, not separately confirmed street/city/postal fields.
    ...(site.address ? { address: site.address } : {}),
    ...(site.serviceAreas ? { areaServed: site.serviceAreas } : {}),
    geo: { "@type": "GeoCoordinates", ...site.googleBusiness.geo },
    hasMap: `https://maps.google.com/?cid=${site.googleBusiness.cid}`,
    ...(site.owner.name ? { founder: { "@type": "Person", name: site.owner.name, jobTitle: site.owner.role.en } } : {}),
    ...(site.openingHours
      ? {
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: site.openingHours.days,
            opens: site.openingHours.opens,
            closes: site.openingHours.closes,
          },
        }
      : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phone,
        email: site.email,
        contactType: "customer service",
        availableLanguage: ["English", "Urdu"],
      },
    ],
    sameAs: [site.googleBusiness.shareUrl, ...site.socialProfiles],
  };
}

export function websiteSchema(locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: absoluteUrl(localizePath(locale)),
    inLanguage: locale,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** items: [{ name, path }] with paths relative to the locale root. */
export function breadcrumbSchema(locale, items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localizePath(locale, item.path)),
    })),
  };
}

export function articleSchema(locale, post, image) {
  const url = absoluteUrl(localizePath(locale, `/blog/${post.slug}`));
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pick(post.title, locale),
    description: pick(post.excerpt, locale),
    image: [absoluteUrl(image.src)],
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    inLanguage: locale,
    mainEntityOfPage: url,
    author: { "@type": "Organization", "@id": ORGANIZATION_ID, name: site.name },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function serviceSchema(locale, service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: pick(service.title, locale),
    description: pick(service.summary, locale),
    serviceType: pick(service.title, "en"),
    url: absoluteUrl(localizePath(locale, `/services/${service.slug}`)),
    provider: { "@id": ORGANIZATION_ID },
    ...(site.serviceAreas ? { areaServed: site.serviceAreas } : {}),
  };
}
