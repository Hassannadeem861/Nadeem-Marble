import { Mail, MessageCircle, Phone } from "lucide-react";
import { EventsSection } from "@/components/proof/EventsSection";
import { StatsSection } from "@/components/proof/StatsSection";
import { FaqSection } from "@/components/proof/FaqSection";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Commitments } from "@/components/shared/Commitments";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHeader } from "@/components/shared/PageHeader";
import { PillarsGrid } from "@/components/shared/PillarsGrid";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { RegistryImage } from "@/components/shared/RegistryImage";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow, SectionHeading } from "@/components/shared/SectionHeading";
import { mailHref, site, telHref, whatsappHref } from "@/data/site";
import { getDictionary } from "@/lib/dictionaries";
import { pick } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/about", title: dict.meta.about.title, description: dict.meta.about.description });
}

// Material and detail shots only: photos of people working would read as
// Nadeem Marbles' own team, which they are not.
const craftImages = ["marbleGold", "installTrowel", "tilePattern"];

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const about = dict.about;
  const ownerCaption = [site.owner.name, `${pick(site.owner.role, locale)}, ${site.name}`].filter(Boolean).join(" · ");

  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        breadcrumbs={[
          { name: dict.nav.home, path: "/" },
          { name: dict.nav.about, path: "/about" },
        ]}
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        text={about.hero.text}
        imageKey="floorPolishedMarble"
      />

      <section aria-labelledby="story-heading" className="py-20 md:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="story-heading" eyebrow={about.story.eyebrow} title={about.story.title} />
          </div>
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7">
            {about.story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p lang="en" dir="ltr" className="border-s-2 border-gold ps-5 font-display text-2xl text-charcoal">
              {pick(site.tagline, "en")}
            </p>
          </Reveal>
        </div>
      </section>

      <StatsSection locale={locale} dict={dict} />

      <section aria-labelledby="owner-heading" className="bg-stone/60 py-20 md:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-12">
          <figure className="lg:col-span-5">
            <div className="relative aspect-5/6 overflow-hidden rounded-sm bg-stone">
              <RegistryImage
                imageKey="ownerPortrait"
                locale={locale}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-4 text-sm text-muted-foreground">{ownerCaption}</figcaption>
          </figure>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>{about.owner.eyebrow}</Eyebrow>
            <h2 id="owner-heading" className="mt-4 text-[2rem] leading-[1.1] text-charcoal md:text-[2.75rem]">
              {about.owner.title}
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              {about.owner.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={telHref} variant="default" size="default">
                <Phone aria-hidden="true" />
                <span lang="en" dir="ltr">
                  {site.phoneDisplay}
                </span>
              </ButtonLink>
              <ButtonLink href={whatsappHref()} variant="outline" size="default">
                <MessageCircle aria-hidden="true" />
                {dict.common.whatsapp}
              </ButtonLink>
              <ButtonLink href={mailHref} variant="outline" size="default">
                <Mail aria-hidden="true" />
                {dict.common.emailUs}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="developer-heading" className="bg-charcoal py-20 text-ivory md:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:order-2 lg:col-span-5 lg:col-start-8">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div aria-hidden="true" className="absolute -inset-3 rounded-sm border border-gold/40" />
              <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-black">
                <RegistryImage imageKey="developerPortrait" locale={locale} fill sizes="(min-width: 1024px) 35vw, 90vw" className="object-cover object-top" />
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:order-1 lg:col-span-6">
            <Eyebrow onDark>{about.developer.eyebrow}</Eyebrow>
            <h2 id="developer-heading" className="mt-4 text-[2rem] leading-[1.1] md:text-[2.75rem]">
              {about.developer.name}
            </h2>
            <p className="mt-2 text-sm font-semibold tracking-[0.2em] text-gold uppercase">{about.developer.role}</p>
            <p className="mt-6 text-lg leading-relaxed text-ivory/80">{about.developer.text}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {about.developer.facts.map((fact) => (
                <li key={fact} className="rounded-sm border border-gold/30 bg-ivory/5 px-4 py-3 text-sm text-ivory/90">
                  {fact}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="pillars-heading" className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading id="pillars-heading" eyebrow={about.pillars.eyebrow} title={about.pillars.title} />
          <div className="mt-14">
            <PillarsGrid locale={locale} />
          </div>
        </div>
      </section>

      <ProcessSteps locale={locale} eyebrow={dict.home.process.eyebrow} title={dict.home.process.title} />
      <Commitments locale={locale} eyebrow={about.values.eyebrow} title={about.values.title} text={dict.home.commitments.text} />

      <EventsSection locale={locale} dict={dict} />

      <section aria-labelledby="craft-heading" className="border-t border-border py-20 md:py-28">
        <div className="container-page">
          <SectionHeading id="craft-heading" eyebrow={about.craft.eyebrow} title={about.craft.title} text={about.craft.text} />
          <Reveal stagger className="mt-12 grid gap-4 md:grid-cols-12">
            {craftImages.map((key, index) => (
              <div
                key={key}
                data-reveal-item
                className={
                  index === 0
                    ? "relative aspect-4/3 overflow-hidden rounded-sm bg-stone md:col-span-7 md:row-span-2 md:aspect-auto"
                    : "relative aspect-4/3 overflow-hidden rounded-sm bg-stone md:col-span-5"
                }
              >
                <RegistryImage
                  imageKey={key}
                  locale={locale}
                  fill
                  sizes={index === 0 ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 40vw, 100vw"}
                  className="object-cover"
                />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <FaqSection locale={locale} dict={dict} page="about" />
      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
