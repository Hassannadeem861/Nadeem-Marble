import Link from "next/link";
import { FaqSection } from "@/components/proof/FaqSection";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaBand } from "@/components/shared/CtaBand";
import { EnquiryPanel } from "@/components/shared/EnquiryPanel";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow, SectionHeading } from "@/components/shared/SectionHeading";
import { getImage } from "@/data/images";
import { getProject, isProjectIndexable, projectCategories, projects } from "@/data/projects";
import { getService } from "@/data/services";
import { getDictionary } from "@/lib/dictionaries";
import { getDirection, localizePath, pick } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const cover = getImage(project.cover);
  return buildMetadata({
    locale,
    path: `/portfolio/${slug}`,
    title: pick(project.title, locale),
    description: pick(project.summary, locale),
    image: { src: cover.src, width: cover.width, height: cover.height, alt: pick(cover.alt, locale) },
    noIndex: !isProjectIndexable(project),
  });
}

export default async function ProjectPage({ params }) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const dict = getDictionary(locale);
  const copy = dict.portfolio;
  const title = pick(project.title, locale);
  const gallery = project.gallery.map((key) => {
    const image = getImage(key);
    return { src: image.src, alt: pick(image.alt, locale) };
  });
  const categories = project.categories
    .map((id) => projectCategories.find((category) => category.id === id))
    .filter(Boolean)
    .map((category) => pick(category.label, locale));
  const relatedServices = project.services.map(getService).filter(Boolean);
  const position = projects.indexOf(project);
  const more = Array.from({ length: Math.min(3, projects.length - 1) }, (_, step) => projects[(position + 1 + step) % projects.length]);

  return (
    <>
      <header className="border-b border-border">
        <div className="container-page pt-8 pb-12 md:pt-10 md:pb-16">
          <Breadcrumbs
            locale={locale}
            label={dict.common.breadcrumb}
            items={[
              { name: dict.nav.home, path: "/" },
              { name: dict.nav.portfolio, path: "/portfolio" },
              { name: title, path: `/portfolio/${project.slug}` },
            ]}
          />
          <div className="mt-10 grid animate-rise gap-6 md:mt-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Eyebrow>{copy.hero.eyebrow}</Eyebrow>
              <h1 className="mt-5 text-[2.35rem] leading-[1.06] text-charcoal sm:text-5xl lg:text-[3.4rem]">{title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{pick(project.summary, locale)}</p>
            </div>
            <p className="text-sm text-muted-foreground lg:col-span-4 lg:text-end">{categories.join(" · ")}</p>
          </div>
        </div>
      </header>

      <section className="py-14 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="sr-only">{copy.galleryTitle}</h2>
            <ProjectGallery
              images={gallery}
              title={title}
              dir={getDirection(locale)}
              labels={{
                open: copy.openGallery,
                count: dict.common.imageCount,
                previous: dict.common.previousImage,
                next: dict.common.nextImage,
              }}
            />
            {project.thinking ? (
              <div className="mt-12">
                <h2 className="text-2xl text-charcoal">{copy.thinkingTitle}</h2>
                <div className="prose-article mt-5 text-muted-foreground">
                  {pick(project.thinking, locale).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-10 lg:col-span-4">
            <div>
              <h2 className="text-2xl text-charcoal">{copy.approachTitle}</h2>
              <ol className="mt-5 space-y-4">
                {pick(project.approach, locale).map((step, index) => (
                  <li key={step} className="flex gap-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                    <span lang="en" className="font-display text-xl leading-none text-gold-deep">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="text-2xl text-charcoal">{copy.servicesTitle}</h2>
              <ul className="mt-4 space-y-2">
                {relatedServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={localizePath(locale, `/services/${service.slug}`)}
                      className="text-[0.95rem] font-semibold text-charcoal underline decoration-gold underline-offset-4 hover:decoration-2"
                    >
                      {pick(service.title, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl text-charcoal">{copy.materialsTitle}</h2>
              <ul className="mt-4 space-y-2 text-[0.95rem] text-muted-foreground">
                {pick(project.materials, locale).map((material) => (
                  <li key={material} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-gold" />
                    {material}
                  </li>
                ))}
              </ul>
            </div>
            <EnquiryPanel locale={locale} dict={dict} title={dict.cta.title} text={dict.cta.text} topic={title} />
          </div>
        </div>
      </section>

      <section aria-labelledby="more-heading" className="border-t border-border py-16 md:py-24">
        <div className="container-page">
          <SectionHeading id="more-heading" title={copy.otherProjects} />
          <Reveal stagger className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((item) => (
              <ProjectCard key={item.slug} project={item} locale={locale} dict={dict} />
            ))}
          </Reveal>
        </div>
      </section>

      <FaqSection locale={locale} dict={dict} page="portfolio" />
      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
