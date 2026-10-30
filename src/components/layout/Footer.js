import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { mainNavigation } from "@/data/navigation";
import { verifiedServices } from "@/data/services";
import { mailHref, mapsHref, site, telHref, whatsappHref } from "@/data/site";
import { localeMeta, localizePath, locales, pick } from "@/lib/i18n";

const COPYRIGHT_YEAR = 2026;

function FooterHeading({ children }) {
  return <h2 className="tracking-eyebrow font-sans text-xs font-semibold text-gold">{children}</h2>;
}

const linkClass = "text-mist transition-colors hover:text-ivory underline-offset-4 hover:underline";

export function Footer({ locale, dict }) {
  return (
    <footer className="on-dark border-t border-gold/20 bg-charcoal text-ivory">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo locale={locale} onDark />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-mist">{dict.footer.blurb}</p>
          <p lang="en" dir="ltr" className="mt-4 text-sm font-medium tracking-wide text-gold">
            {pick(site.tagline, "en")}
          </p>
        </div>

        <div className="lg:col-span-2">
          <FooterHeading>{dict.footer.company}</FooterHeading>
          <ul className="mt-5 space-y-3 text-sm">
            {[...mainNavigation, { key: "serviceAreas", href: "/service-areas" }].map((item) => (
              <li key={item.href}>
                <Link href={localizePath(locale, item.href)} className={linkClass}>
                  {dict.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterHeading>{dict.footer.servicesTitle}</FooterHeading>
          <ul className="mt-5 space-y-3 text-sm">
            {verifiedServices.map((service) => (
              <li key={service.slug}>
                <Link href={localizePath(locale, `/services/${service.slug}`)} className={linkClass}>
                  {pick(service.title, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterHeading>{dict.footer.contactTitle}</FooterHeading>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={telHref} className={`${linkClass} inline-flex items-center gap-3`}>
                <Phone aria-hidden="true" className="size-4 text-gold" />
                <span lang="en" dir="ltr">
                  {site.phoneDisplay}
                </span>
              </a>
            </li>
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-3`}>
                <MessageCircle aria-hidden="true" className="size-4 text-gold" />
                {dict.common.chatOnWhatsapp}
              </a>
            </li>
            <li>
              <a href={mailHref} className={`${linkClass} inline-flex items-center gap-3 break-all`}>
                <Mail aria-hidden="true" className="size-4 shrink-0 text-gold" />
                <span lang="en" dir="ltr">
                  {site.email}
                </span>
              </a>
            </li>
            {site.address ? (
              <li>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-start gap-3`}
                >
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span lang="en" dir="ltr">
                    {site.address}
                  </span>
                </a>
              </li>
            ) : null}
            {site.socialProfiles.map((href) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-3`}>
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-gold">
                    <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H6v4h3v9h4v-9h3l1-4h-4V9c0-.6.4-1 1-1z" />
                  </svg>
                  Facebook
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <FooterHeading>{dict.footer.languageTitle}</FooterHeading>
            <ul className="mt-4 flex gap-4 text-sm">
              {locales.map((code) => (
                <li key={code}>
                  <Link
                    href={localizePath(code)}
                    hrefLang={code}
                    lang={code}
                    aria-current={code === locale ? "true" : undefined}
                    className={`${linkClass} aria-[current=true]:text-gold`}
                  >
                    {localeMeta[code].nativeLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-mist md:flex-row md:items-center md:justify-between">
          <p>
            © {COPYRIGHT_YEAR} <span lang="en">{site.name}</span>. {dict.footer.rights}
          </p>
          <nav aria-label={dict.legal.navLabel} className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href={localizePath(locale, "/privacy-policy")} className={linkClass}>
              {dict.legal.privacyTitle}
            </Link>
            <Link href={localizePath(locale, "/terms")} className={linkClass}>
              {dict.legal.termsTitle}
            </Link>
            {/* Kept because two photos are CC BY licensed, which requires attribution. */}
            <Link href={localizePath(locale, "/image-credits")} className={linkClass}>
              {dict.common.photoCredits}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
