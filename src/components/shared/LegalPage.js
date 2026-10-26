import { PageHeader } from "@/components/shared/PageHeader";
import { formatDate } from "@/lib/format";
import { pick } from "@/lib/i18n";

/** Shared layout for the Privacy Policy and Terms pages: a header, the date and plain sections. */
export function LegalPage({ locale, dict, path, title, document }) {
  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        breadcrumbs={[
          { name: dict.nav.home, path: "/" },
          { name: title, path },
        ]}
        title={title}
        text={pick(document.intro, locale)}
      />
      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="prose-article mx-auto text-charcoal/90">
            <p className="text-sm text-muted-foreground">
              {dict.legal.updated}: <time dateTime={document.updated}>{formatDate(document.updated, locale)}</time>
            </p>
            {document.sections.map((section) => (
              <section key={section.title.en}>
                <h2>{pick(section.title, locale)}</h2>
                {pick(section.body, locale).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
