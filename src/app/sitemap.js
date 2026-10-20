import { blogPosts } from "@/data/blogPosts";
import { staticRoutes } from "@/data/navigation";
import { isProjectIndexable, projects } from "@/data/projects";
import { isServiceIndexable, services } from "@/data/services";
import { locales } from "@/lib/i18n";
import { localeAlternates } from "@/lib/seo";

// One entry per locale and indexable page, each listing its hreflang
// alternates. Pages marked noindex (unconfirmed services) are left out.
// lastModified is only given where a real date exists.
export default function sitemap() {
  const paths = [
    ...staticRoutes.map((path) => ({ path })),
    ...services.filter(isServiceIndexable).map((service) => ({ path: `/services/${service.slug}` })),
    ...projects.filter(isProjectIndexable).map((project) => ({ path: `/portfolio/${project.slug}` })),
    ...blogPosts.map((post) => ({ path: `/blog/${post.slug}`, lastModified: post.updated ?? post.published })),
  ];

  return paths.flatMap(({ path, lastModified }) =>
    locales.map((locale) => {
      const { canonical, languages } = localeAlternates(locale, path);
      return {
        url: canonical,
        ...(lastModified ? { lastModified } : {}),
        alternates: { languages },
      };
    }),
  );
}
