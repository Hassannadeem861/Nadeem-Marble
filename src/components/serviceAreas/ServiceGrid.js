import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/shared/Icon";
import { SplitHeading } from "@/components/shared/SplitHeading";
import { verifiedServices } from "@/data/services";
import { localizePath, pick } from "@/lib/i18n";

/** Dark grid of every confirmed service, each card linking to its page. */
export function ServiceGrid({ locale, top, accent, text, linkLabel }) {
  return (
    <section aria-labelledby="area-services-heading" className="bg-charcoal py-16 text-ivory md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <SplitHeading id="area-services-heading" top={top} accent={accent} onDark />
          <p className="mt-4 leading-relaxed text-mist">{text}</p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {verifiedServices.map((service) => (
            <li key={service.slug}>
              <Link
                href={localizePath(locale, `/services/${service.slug}`)}
                className="group flex h-full flex-col rounded-sm border border-ivory/10 bg-ivory/5 p-6 transition-colors hover:border-gold/50 hover:bg-ivory/10"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-sm bg-gold/15 text-gold">
                  <Icon name={service.icon} className="size-5" />
                </span>
                <span className="mt-5 font-display text-xl text-ivory">{pick(service.title, locale)}</span>
                <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-mist">{pick(service.summary, locale)}</span>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-gold">
                  {linkLabel}
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
