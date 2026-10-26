import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { FaqSection } from "@/components/proof/FaqSection";
import { HeroStats } from "@/components/proof/HeroStats";
import { WhyCards } from "@/components/proof/WhyCards";
import { AreaBooking } from "@/components/serviceAreas/AreaBooking";
import { ServiceGrid } from "@/components/serviceAreas/ServiceGrid";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { SplitHeading } from "@/components/shared/SplitHeading";
import { areaPages, areaPageSlug, getAreaPage } from "@/data/areaPages";
import { serviceAreas } from "@/data/serviceAreas";
import { verifiedServices } from "@/data/services";
import { telHref, whatsappHref } from "@/data/site";
import { getDictionary } from "@/lib/dictionaries";
import { format } from "@/lib/format";
import { localizePath, pick } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return areaPages.map((page) => ({ area: page.slug }));
}

const areaName = (enName, locale) => pick(serviceAreas.find((item) => item.en === enName) ?? { en: enName }, locale);

export async function generateMetadata({ params }) {
  const { locale, area } = await params;
  const page = getAreaPage(area);
  if (!page) return {};
  const dict = getDictionary(locale);
  const name = areaName(page.area, locale);
  return buildMetadata({
    locale,
    path: `/service-areas/${page.slug}`,
    title: format(dict.areaPage.metaTitle, { area: name }),
    description: format(dict.areaPage.metaDescription, { area: name, landmarks: pick(page.landmarks, locale)[0] }),
  });
}

export default async function AreaPage({ params }) {
  const { locale, area } = await params;
  const page = getAreaPage(area);
  if (!page) notFound();

  const dict = getDictionary(locale);
  const copy = dict.areaPage;
  const name = areaName(page.area, locale);
  const fill = (text) => format(text, { area: name });
  const canSendDirect = Boolean(
    process.env.EMAILJS_SERVICE_ID && process.env.EMAILJS_TEMPLATE_ID && process.env.EMAILJS_PUBLIC_KEY && process.env.EMAILJS_PRIVATE_KEY,
  );
  const collator = new Intl.Collator(locale);
  const allAreaNames = serviceAreas.map((item) => pick(item, locale)).sort((a, b) => collator.compare(a, b));
  const whatsapp = whatsappHref(format(dict.serviceAreas.directory.askMessage, { area: name }));
  const faqs = copy.faqs.map((item) => ({ q: { [locale]: fill(item.q) }, a: { [locale]: fill(item.a) } }));

  return (
    <>
      <header className="bg-charcoal text-ivory">
        <div className="container-page pt-8 pb-14 md:pt-10 md:pb-20">
          <Breadcrumbs
            locale={locale}
            label={dict.common.breadcrumb}
            onDark
            items={[
              { name: dict.nav.home, path: "/" },
              { name: dict.nav.serviceAreas, path: "/service-areas" },
              { name, path: `/service-areas/${page.slug}` },
            ]}
          />
          <div className="mt-10 max-w-3xl animate-rise md:mt-14">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold">
              <MapPin aria-hidden="true" className="size-3.5" />
              {dict.serviceAreas.hero.badge}
            </p>
            <SplitHeading as="h1" top={copy.titleTop} accent={fill(copy.titleAccent)} onDark className="mt-6 text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem]" />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{pick(page.intro, locale)}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={whatsapp} variant="gold">
                <MessageCircle aria-hidden="true" />
                {dict.common.chatOnWhatsapp}
              </ButtonLink>
              <ButtonLink href={telHref} variant="outline" className="border-ivory/30 text-ivory hover:bg-ivory hover:text-charcoal">
                <Phone aria-hidden="true" />
                {dict.common.callUs}
              </ButtonLink>
            </div>
          </div>
          <HeroStats locale={locale} />
        </div>
      </header>

      <section aria-labelledby="booking-heading" className="py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <SplitHeading id="booking-heading" top={copy.bookingTop} accent={fill(copy.bookingAccent)} />
            <p className="mt-4 leading-relaxed text-muted-foreground">{dict.serviceAreas.booking.text}</p>
          </div>
          <div className="mx-auto mt-10 max-w-5xl">
            <AreaBooking
              areas={allAreaNames}
              services={verifiedServices.map((service) => pick(service.title, locale))}
              labels={dict.serviceAreas.booking}
              canSendDirect={canSendDirect}
              defaultArea={name}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="around-heading" className="border-t border-border bg-stone/60 py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SplitHeading id="around-heading" top={copy.aroundTop} accent={name} />
            <ul className="mt-8 flex flex-wrap gap-2">
              {pick(page.landmarks, locale).map((landmark) => (
                <li key={landmark} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-charcoal/15 bg-white px-4 text-sm text-charcoal">
                  <MapPin aria-hidden="true" className="size-3.5 text-gold-deep" />
                  {landmark}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[2.25rem] leading-[1.05] text-charcoal md:text-5xl">{copy.nearbyTitle}</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {page.nearby.map((enName) => {
                const slug = areaPageSlug(enName);
                const label = areaName(enName, locale);
                return (
                  <li key={enName} className="flex items-center gap-3 rounded-sm border border-border bg-white p-4">
                    <MapPin aria-hidden="true" className="size-5 shrink-0 text-gold-deep" />
                    {slug ? (
                      <Link href={localizePath(locale, `/service-areas/${slug}`)} className="font-semibold text-charcoal underline decoration-gold underline-offset-4 hover:decoration-2">
                        {label}
                      </Link>
                    ) : (
                      <span className="font-semibold text-charcoal">{label}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            <Link href={localizePath(locale, "/service-areas")} className="mt-6 inline-flex min-h-10 items-center text-sm font-semibold text-charcoal underline decoration-gold underline-offset-4 hover:decoration-2">
              {copy.allAreasLink}
            </Link>
          </div>
        </div>
      </section>

      <ServiceGrid locale={locale} top={copy.servicesTop} accent={fill(copy.servicesAccent)} text={dict.serviceAreas.services.text} linkLabel={dict.serviceAreas.services.viewService} />
      <ProcessSteps locale={locale} eyebrow={dict.home.process.eyebrow} title={dict.home.process.title} />
      <WhyCards locale={locale} dict={dict} />
      <FaqSection locale={locale} dict={dict} page="serviceAreas" items={faqs} />

      <section aria-labelledby="area-cta-heading" className="border-t border-border py-16 md:py-24">
        <div className="container-page mx-auto max-w-2xl text-center">
          <SplitHeading id="area-cta-heading" top={copy.ctaTop} accent={fill(copy.ctaAccent)} />
          <p className="mt-4 leading-relaxed text-muted-foreground">{fill(copy.ctaText)}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <ButtonLink href={whatsapp} variant="gold">
              <MessageCircle aria-hidden="true" />
              {dict.common.chatOnWhatsapp}
            </ButtonLink>
            <ButtonLink href={telHref} variant="outline">
              <Phone aria-hidden="true" />
              {dict.common.callUs}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
