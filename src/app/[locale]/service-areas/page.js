import { MessageCircle, Phone } from "lucide-react";
import { FaqSection } from "@/components/proof/FaqSection";
import { HeroStats } from "@/components/proof/HeroStats";
import { WhyCards } from "@/components/proof/WhyCards";
import { AreaBooking } from "@/components/serviceAreas/AreaBooking";
import { AreaDirectory } from "@/components/serviceAreas/AreaDirectory";
import { ServiceGrid } from "@/components/serviceAreas/ServiceGrid";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { SplitHeading } from "@/components/shared/SplitHeading";
import { areaPageSlug } from "@/data/areaPages";
import { serviceAreas } from "@/data/serviceAreas";
import { verifiedServices } from "@/data/services";
import { telHref, whatsappHref } from "@/data/site";
import { getDictionary } from "@/lib/dictionaries";
import { searchKey } from "@/lib/format";
import { localizePath, pick } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/service-areas", title: dict.meta.serviceAreas.title, description: dict.meta.serviceAreas.description });
}

export default async function ServiceAreasPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const copy = dict.serviceAreas;

  const collator = new Intl.Collator(locale);
  const areas = serviceAreas
    .map((area) => ({
      name: pick(area, locale),
      base: Boolean(area.base),
      href: areaPageSlug(area.en) ? localizePath(locale, `/service-areas/${areaPageSlug(area.en)}`) : null,
      search: searchKey([area.en, area.ur, area.aka ?? ""].join(" ")),
    }))
    .sort((a, b) => collator.compare(a.name, b.name));
  const canSendDirect = Boolean(
    process.env.EMAILJS_SERVICE_ID && process.env.EMAILJS_TEMPLATE_ID && process.env.EMAILJS_PUBLIC_KEY && process.env.EMAILJS_PRIVATE_KEY,
  );
  const contactButtons = (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
      <ButtonLink href={whatsappHref(copy.whatsappMessage)} variant="gold">
        <MessageCircle aria-hidden="true" />
        {copy.askCta}
      </ButtonLink>
      <ButtonLink href={telHref} variant="outline">
        <Phone aria-hidden="true" />
        {dict.common.callUs}
      </ButtonLink>
    </div>
  );

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
            ]}
          />
          <div className="mt-10 max-w-3xl animate-rise md:mt-14">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold">
              <span aria-hidden="true" className="size-2 rounded-full bg-gold" />
              {copy.hero.badge}
            </p>
            <SplitHeading as="h1" top={copy.hero.titleTop} accent={copy.hero.titleAccent} onDark className="mt-6 text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem]" />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{copy.hero.text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={whatsappHref(copy.whatsappMessage)} variant="gold">
                <MessageCircle aria-hidden="true" />
                {copy.askCta}
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

      <section aria-labelledby="areas-heading" className="py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <SplitHeading id="areas-heading" top={copy.directory.titleTop} accent={copy.directory.titleAccent} />
            <p className="mt-4 leading-relaxed text-muted-foreground">{copy.directory.text}</p>
          </div>
          <div className="mt-10">
            <AreaDirectory areas={areas} labels={copy.directory} />
          </div>
        </div>
      </section>

      <ServiceGrid locale={locale} top={copy.services.titleTop} accent={copy.services.titleAccent} text={copy.services.text} linkLabel={copy.services.viewService} />

      <section aria-labelledby="booking-heading" className="py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <SplitHeading id="booking-heading" top={copy.booking.titleTop} accent={copy.booking.titleAccent} />
            <p className="mt-4 leading-relaxed text-muted-foreground">{copy.booking.text}</p>
          </div>
          <div className="mx-auto mt-10 max-w-5xl">
            <AreaBooking
              areas={areas.map((area) => area.name)}
              services={verifiedServices.map((service) => pick(service.title, locale))}
              labels={copy.booking}
              canSendDirect={canSendDirect}
            />
          </div>
        </div>
      </section>

      <WhyCards locale={locale} dict={dict} />

      <FaqSection locale={locale} dict={dict} page="serviceAreas" />

      <section aria-labelledby="no-area-heading" className="border-t border-border py-16 md:py-24">
        <div className="container-page mx-auto max-w-2xl text-center">
          <SplitHeading id="no-area-heading" top={copy.noArea.titleTop} accent={copy.noArea.titleAccent} />
          <p className="mt-4 leading-relaxed text-muted-foreground">{copy.noArea.text}</p>
          <div className="mt-8">{contactButtons}</div>
        </div>
      </section>
    </>
  );
}
