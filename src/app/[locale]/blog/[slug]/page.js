import Link from "next/link";
import { FaqSection } from "@/components/proof/FaqSection";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { QuantityCalculator } from "@/components/blog/QuantityCalculator";
import { getService } from "@/data/services";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CtaBand } from "@/components/shared/CtaBand";
import { RegistryImage } from "@/components/shared/RegistryImage";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { blogCategories, blogPosts, getPost } from "@/data/blogPosts";
import { getImage } from "@/data/images";
import { site } from "@/data/site";
import { getDictionary } from "@/lib/dictionaries";
import { format, formatDate } from "@/lib/format";
import { localizePath, pick } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const cover = getImage(post.cover);
  const title = pick(post.seoTitle ?? post.title, locale);
  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    title,
    // Long titles drop the brand suffix so search results do not cut them off.
    absoluteTitle: `${title} | ${site.name}`.length > 65,
    description: pick(post.excerpt, locale),
    type: "article",
    publishedTime: post.published,
    image: { src: cover.src, width: cover.width, height: cover.height, alt: pick(cover.alt, locale) },
  });
}

// Article text may contain internal links written as [label](/path); paths get the page's locale prefix.
function renderInline(text, locale) {
  return text.split(/(\[[^\]]+\]\(\/[^)\s]*\))/g).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\((\/[^)\s]*)\)$/);
    if (!link) return part;
    return (
      <Link key={index} href={localizePath(locale, link[2])} className="font-semibold text-charcoal underline decoration-gold underline-offset-4 hover:decoration-2">
        {link[1]}
      </Link>
    );
  });
}

function ArticleBlock({ block, calculatorLabels, locale }) {
  if (block.h2) return <h2>{block.h2}</h2>;
  if (block.calculator) return <QuantityCalculator labels={calculatorLabels} />;
  if (block.table)
    return (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-start text-[0.95rem]">
          <thead>
            <tr className="border-b-2 border-gold">
              {block.table.head.map((cell) => (
                <th key={cell} scope="col" className="px-3 py-2 text-start font-semibold text-charcoal">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map((row) => (
              <tr key={row.join("|")} className="border-b border-border">
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th key={cell} scope="row" className="px-3 py-2 text-start font-semibold whitespace-nowrap text-charcoal">
                      {cell}
                    </th>
                  ) : (
                    <td key={cell} className="px-3 py-2">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  if (block.ul)
    return (
      <ul>
        {block.ul.map((item) => (
          <li key={item}>{renderInline(item, locale)}</li>
        ))}
      </ul>
    );
  return <p>{renderInline(block.p, locale)}</p>;
}

export default async function ArticlePage({ params }) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const dict = getDictionary(locale);
  const title = pick(post.title, locale);
  const category = blogCategories.find((item) => item.id === post.category);
  // Planning guides list each other; every other guide lists the remaining guides. Current post first.
  const isPlanning = post.category === "planning";
  const groupPosts = blogPosts.filter((item) => (item.category === "planning") === isPlanning);
  const guideList = [post, ...groupPosts.filter((item) => item.slug !== post.slug)];
  const relatedServices = (post.relatedServices ?? []).map(getService).filter((service) => service?.verified);

  return (
    <>
      <JsonLd data={articleSchema(locale, post, getImage(post.cover))} />

      <article>
        <header className="container-page pt-8 md:pt-10">
          <Breadcrumbs
            locale={locale}
            label={dict.common.breadcrumb}
            items={[
              { name: dict.nav.home, path: "/" },
              { name: dict.nav.blog, path: "/blog" },
              { name: title, path: `/blog/${post.slug}` },
            ]}
          />
          <div className="mx-auto mt-12 max-w-3xl animate-rise text-center md:mt-16">
            {category ? <p className="text-sm font-semibold text-gold-deep">{pick(category.label, locale)}</p> : null}
            <h1 className="mt-4 text-[2.25rem] leading-[1.1] text-charcoal sm:text-5xl lg:text-[3.25rem]">{title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{pick(post.excerpt, locale)}</p>
            <p className="mt-6 flex flex-wrap justify-center gap-x-4 text-sm text-muted-foreground">
              <span>
                {dict.common.publishedOn}: <time dateTime={post.published}>{formatDate(post.published, locale)}</time>
              </span>
              <span aria-hidden="true">·</span>
              <span>{format(dict.common.minutesRead, { n: post.readingMinutes })}</span>
            </p>
          </div>
          <div className="relative mx-auto mt-12 aspect-16/9 max-w-5xl overflow-hidden rounded-sm bg-stone">
            <RegistryImage imageKey={post.cover} locale={locale} fill hero sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
          </div>
        </header>

        <div className="container-page py-14 md:py-20">
          <div className="prose-article mx-auto text-charcoal/90">
            {pick(post.content, locale).map((block, index) => (
              <ArticleBlock key={index} block={block} calculatorLabels={dict.blog.calculator} locale={locale} />
            ))}
            {relatedServices.length ? (
              <nav aria-labelledby="related-services-heading" className="mt-12 rounded-sm border border-border bg-white p-6">
                <h2 id="related-services-heading" className="mt-0! text-xl!">
                  {dict.blog.relatedServices}
                </h2>
                <ul className="mt-3! list-none! ps-0!">
                  {relatedServices.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={localizePath(locale, `/services/${service.slug}`)}
                        className="inline-flex min-h-10 items-center gap-2 font-semibold text-charcoal underline decoration-gold underline-offset-4 hover:decoration-2"
                      >
                        {pick(service.title, locale)}
                        <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
            <p className="mt-12 border-t border-border pt-8">
              <Link
                href={localizePath(locale, "/blog")}
                className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-charcoal underline-offset-4 hover:underline"
              >
                <ArrowLeft aria-hidden="true" className="size-4 rtl:rotate-180" />
                {dict.blog.backToBlog}
              </Link>
            </p>
          </div>
        </div>
      </article>

      <FaqSection locale={locale} dict={dict} page="blog" items={post.faqs} />
      <CtaBand locale={locale} dict={dict} />

      <nav aria-labelledby="category-guides-heading" className="bg-stone/60 py-16 md:py-24">
        <div className="container-page">
          <SectionHeading id="category-guides-heading" title={isPlanning ? dict.blog.planningGuidesTitle : dict.blog.choosingCareGuidesTitle} />
          <ul className="mt-10 grid border-t border-charcoal/15 md:grid-cols-2">
            {guideList.map((item) => {
              const current = item.slug === post.slug;
              return (
                <li key={item.slug} className="border-b border-charcoal/15 md:odd:border-e md:odd:pe-8 md:even:ps-8">
                  <Link
                    href={localizePath(locale, `/blog/${item.slug}`)}
                    aria-current={current ? "page" : undefined}
                    className="group flex min-h-16 items-center justify-between gap-4 py-5"
                  >
                    <span className="min-w-0">
                      <span className="block font-display text-xl text-charcoal">{pick(item.title, locale)}</span>
                      <span className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {current ? <span className="font-semibold text-gold-deep">{dict.services.currentPage} · </span> : null}
                        {pick(item.excerpt, locale)}
                      </span>
                    </span>
                    <ArrowRight aria-hidden="true" className="size-5 shrink-0 text-gold-deep transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
