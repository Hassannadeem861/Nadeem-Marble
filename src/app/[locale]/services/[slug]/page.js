import Link from "next/link";
import { FaqSection } from "@/components/proof/FaqSection";
import { notFound } from "next/navigation";
import { ArrowRight, Info } from "lucide-react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaBand } from "@/components/shared/CtaBand";
import { EnquiryPanel } from "@/components/shared/EnquiryPanel";
import { Icon } from "@/components/shared/Icon";
import { RegistryImage } from "@/components/shared/RegistryImage";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow, SectionHeading } from "@/components/shared/SectionHeading";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { getPost } from "@/data/blogPosts";
import { projects } from "@/data/projects";
import { getServiceLanding } from "@/data/serviceLandings";
import { getService, isServiceIndexable, services } from "@/data/services";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath, pick } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const seo = getServiceLanding(slug)?.seo ?? service.seo;
  return buildMetadata({
    locale,
    path: `/services/${slug}`,
    title: pick(seo?.title ?? service.title, locale),
    description: pick(seo?.description ?? service.summary, locale),
    noIndex: !isServiceIndexable(service),
  });
}

function BulletList({ items }) {
  return (
    <ul className="mt-6 divide-y divide-border border-y border-border">
      {items.map((item) => (
        <li key={item} className="flex gap-4 py-4 text-charcoal">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-gold" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function ServicePage({ params }) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const dict = getDictionary(locale);
  const title = pick(service.title, locale);
  const landing = getServiceLanding(service.slug);
  const guides = (landing?.relatedPosts ?? []).map(getPost).filter(Boolean);
  const related = projects.filter((project) => project.services.includes(service.slug)).slice(0, 3);
  const others = services.filter((item) => item.slug !== service.slug && item.verified).slice(0, 4);

  return (
    <>
      {service.verified ? <JsonLd data={serviceSchema(locale, service)} /> : null}

      <header className="border-b border-border">
        <div className="container-page grid gap-10 pt-8 pb-14 md:pt-10 md:pb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Breadcrumbs
              locale={locale}
              label={dict.common.breadcrumb}
              items={[
                { name: dict.nav.home, path: "/" },
                { name: dict.nav.services, path: "/services" },
                { name: title, path: `/services/${service.slug}` },
              ]}
            />
            <div className="mt-10 animate-rise md:mt-14">
              <Eyebrow>
                <Icon name={service.icon} className="size-4" />
                {dict.nav.services}
              </Eyebrow>
              <h1 className="mt-5 text-[2.35rem] leading-[1.06] text-charcoal sm:text-5xl lg:text-[3.4rem]">{title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{pick(service.summary, locale)}</p>
              {!service.verified ? (
                <p className="mt-6 flex max-w-2xl gap-3 rounded-sm border border-gold/50 bg-gold/10 p-4 text-sm text-charcoal">
                  <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-deep" />
                  {dict.common.unverifiedServiceNote}
                </p>
              ) : null}
            </div>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-sm bg-stone lg:col-span-5">
            <RegistryImage imageKey={service.image} locale={locale} fill hero sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
          </div>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="prose-article text-muted-foreground">
              {pick(service.body, locale).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {landing ? (
              <>
                <h2 className="mt-12 text-3xl text-charcoal">{dict.services.problemsTitle}</h2>
                <BulletList items={pick(landing.problems, locale)} />
              </>
            ) : null}
            <h2 className="mt-12 text-3xl text-charcoal">{dict.services.includesTitle}</h2>
            <BulletList items={pick(service.includes, locale)} />
            {landing ? (
              <>
                <h2 className="mt-12 text-3xl text-charcoal">{dict.services.optionsTitle}</h2>
                <div className="mt-6 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
                  {landing.options.map((option) => (
                    <div key={option.title.en} className="bg-ivory p-6">
                      <h3 className="text-xl text-charcoal">{pick(option.title, locale)}</h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{pick(option.text, locale)}</p>
                    </div>
                  ))}
                </div>
                <h2 className="mt-12 text-3xl text-charcoal">{dict.services.considerationsTitle}</h2>
                <BulletList items={pick(landing.considerations, locale)} />
              </>
            ) : null}
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
              <EnquiryPanel
                locale={locale}
                dict={dict}
                title={dict.services.enquireTitle}
                text={dict.services.enquireText}
                topic={title}
                serviceSlug={service.slug}
              />
            </div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section aria-labelledby="related-heading" className="border-t border-border py-16 md:py-24">
          <div className="container-page">
            <SectionHeading id="related-heading" title={dict.services.relatedProjects} />
            <Reveal stagger className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((project) => (
                <ProjectCard key={project.slug} project={project} locale={locale} dict={dict} />
              ))}
            </Reveal>
          </div>
        </section>
      ) : null}

      {landing ? <ProcessSteps locale={locale} eyebrow={dict.home.process.eyebrow} title={dict.home.process.title} /> : null}

      {guides.length ? (
        <section aria-labelledby="guides-heading" className="py-16 md:py-24">
          <div className="container-page">
            <SectionHeading id="guides-heading" title={dict.services.relatedGuides} />
            <Reveal stagger className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((post) => (
                <ArticleCard key={post.slug} post={post} locale={locale} dict={dict} />
              ))}
            </Reveal>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="other-services-heading" className="bg-stone/60 py-16 md:py-24">
        <div className="container-page">
          <SectionHeading id="other-services-heading" title={dict.services.otherServices} />
          <ul className="mt-10 grid border-t border-charcoal/15 md:grid-cols-2">
            {others.map((item) => (
              <li key={item.slug} className="border-b border-charcoal/15 md:odd:border-e md:odd:pe-8 md:even:ps-8">
                <Link
                  href={localizePath(locale, `/services/${item.slug}`)}
                  className="group flex min-h-16 items-center justify-between gap-4 py-5 text-xl text-charcoal font-display"
                >
                  {pick(item.title, locale)}
                  <ArrowRight aria-hidden="true" className="size-5 shrink-0 text-gold-deep transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection locale={locale} dict={dict} page="services" items={landing?.faqs} />
      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
