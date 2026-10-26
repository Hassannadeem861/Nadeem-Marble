import { Icon } from "@/components/shared/Icon";
import { SplitHeading } from "@/components/shared/SplitHeading";
import { reasons } from "@/data/company";
import { pick } from "@/lib/i18n";

/** Dark "Why Nadeem Marbles" section built from the confirmed reasons in company.js. */
export function WhyCards({ locale, dict }) {
  const copy = dict.serviceAreas.why;
  return (
    <section aria-labelledby="why-heading" className="bg-charcoal py-16 text-ivory md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <SplitHeading id="why-heading" top={copy.titleTop} accent={copy.titleAccent} onDark />
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <li key={reason.title.en} className="rounded-sm border border-ivory/10 bg-ivory/5 p-6">
              <span className="inline-flex size-11 items-center justify-center rounded-sm bg-gold/15 text-gold">
                <Icon name={reason.icon} className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-xl text-ivory">{pick(reason.title, locale)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{pick(reason.text, locale)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
