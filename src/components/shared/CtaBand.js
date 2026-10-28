import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { LogoMark } from "@/components/shared/LogoMark";
import { RegistryImage } from "@/components/shared/RegistryImage";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { site, telHref, whatsappHref } from "@/data/site";
import { localizePath } from "@/lib/i18n";

/** Prominent quotation/contact section used at the end of most pages. */
export function CtaBand({ locale, dict, title, text }) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="on-dark relative overflow-hidden bg-charcoal"
    >
      <LogoMark
        onDark
        className="pointer-events-none absolute -end-24 -bottom-24 size-[26rem] opacity-[0.07] md:-end-10 md:size-[34rem]"
      />
      <div className="container-page relative grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <SectionHeading
            onDark
            eyebrow={dict.cta.eyebrow}
            id="cta-heading"
            title={title ?? dict.cta.title}
            text={text ?? dict.cta.text}
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={localizePath(locale, "/contact")} variant="gold">
              {dict.common.requestQuote}
              <ArrowRight aria-hidden="true" className="rtl:rotate-180" />
            </ButtonLink>
            <ButtonLink href={whatsappHref()} variant="outline-light">
              <MessageCircle aria-hidden="true" />
              {dict.common.whatsapp}
            </ButtonLink>
            <ButtonLink href={telHref} variant="outline-light">
              <Phone aria-hidden="true" />
              <span lang="en" dir="ltr">
                {site.phoneDisplay}
              </span>
            </ButtonLink>
          </div>
        </div>
        <div className="relative aspect-16/9 overflow-hidden rounded-sm lg:col-span-5">
          <RegistryImage
            imageKey="phoneMockup"
            locale={locale}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
