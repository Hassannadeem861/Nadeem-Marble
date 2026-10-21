import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { FaqSection } from "@/components/proof/FaqSection";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { PageHeader } from "@/components/shared/PageHeader";
import { services } from "@/data/services";
import { mailHref, mapsEmbedHref, mapsHref, site, telHref, whatsappHref } from "@/data/site";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath, pick } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/contact", title: dict.meta.contact.title, description: dict.meta.contact.description });
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const copy = dict.contact;
  const form = copy.form;

  const serviceOptions = [
    ...services.map((service) => ({ value: service.slug, label: pick(service.title, locale) })),
    { value: "other", label: form.enquiryOther },
  ];
  const projectTypeOptions = Object.entries(form.projectTypes).map(([value, label]) => ({ value, label }));
  const hasAddress = Boolean(site.address);

  const channels = [
    { icon: Phone, label: copy.phoneLabel, value: site.phoneDisplay, href: telHref, latin: true },
    { icon: MessageCircle, label: copy.whatsappLabel, value: dict.common.chatOnWhatsapp, href: whatsappHref(form.messageIntro), text: copy.whatsappText },
    { icon: Mail, label: copy.emailLabel, value: site.email, href: mailHref, latin: true },
    ...(hasAddress ? [{ icon: MapPin, label: copy.addressLabel, value: site.address, href: mapsHref, text: copy.getDirections, latin: true }] : []),
  ];

  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        breadcrumbs={[
          { name: dict.nav.home, path: "/" },
          { name: dict.nav.contact, path: "/contact" },
        ]}
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        text={copy.hero.text}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={telHref} variant="default">
            <Phone aria-hidden="true" />
            {dict.common.callUs}
          </ButtonLink>
          <ButtonLink href={whatsappHref(form.messageIntro)} variant="gold">
            <MessageCircle aria-hidden="true" />
            {dict.common.chatOnWhatsapp}
          </ButtonLink>
        </div>
      </PageHeader>

      <section className="py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl text-charcoal">{copy.detailsTitle}</h2>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {channels.map(({ icon: ChannelIcon, label, value, href, latin, text }) => (
                <li key={label} className="py-6">
                  <p className="text-xs font-semibold text-muted-foreground">{label}</p>
                  <a
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-2 inline-flex min-h-10 items-center gap-3 text-lg font-semibold break-all text-charcoal underline-offset-4 hover:underline"
                  >
                    <ChannelIcon aria-hidden="true" className="size-5 shrink-0 text-gold-deep" />
                    {latin ? (
                      <span lang="en" dir="ltr">
                        {value}
                      </span>
                    ) : (
                      value
                    )}
                  </a>
                  {text ? <p className="mt-1 text-sm text-muted-foreground">{text}</p> : null}
                </li>
              ))}
            </ul>
            {site.openingHours ? (
              <p className="mt-6 flex gap-3 text-sm text-muted-foreground">
                <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-deep" />
                {copy.openingHours}
              </p>
            ) : null}
            <Link
              href={localizePath(locale, "/about")}
              className="mt-6 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-charcoal underline decoration-gold underline-offset-4 hover:decoration-2"
            >
              {copy.aboutLink}
              <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
            </Link>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="sr-only">{form.title}</h2>
            <ContactForm
              labels={form}
              serviceOptions={serviceOptions}
              projectTypeOptions={projectTypeOptions}
              contact={{ email: site.email, whatsappNumber: site.whatsappNumber }}
              canSendDirect={Boolean(
                process.env.EMAILJS_SERVICE_ID && process.env.EMAILJS_TEMPLATE_ID && process.env.EMAILJS_PUBLIC_KEY && process.env.EMAILJS_PRIVATE_KEY,
              )}
            />
          </div>
        </div>
      </section>

      {site.address ? (
        <section className="pb-16 md:pb-24">
          <div className="container-page">
            <h2 className="text-3xl text-charcoal">{copy.mapTitle}</h2>
            <div className="mt-8 overflow-hidden rounded-sm border border-border">
              <iframe
                src={mapsEmbedHref}
                title={copy.mapIframeTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-video w-full md:aspect-21/9"
              />
            </div>
          </div>
        </section>
      ) : null}

      <FaqSection locale={locale} dict={dict} page="contact" />
    </>
  );
}
