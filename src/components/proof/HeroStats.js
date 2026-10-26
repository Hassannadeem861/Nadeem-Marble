import { CountUp } from "@/components/proof/CountUp";
import { stats } from "@/data/socialProof";
import { pick } from "@/lib/i18n";

/** The site's confirmed stats for dark hero sections. */
export function HeroStats({ locale }) {
  return (
    <dl className="mt-14 grid grid-cols-2 gap-y-8 border-t border-ivory/15 pt-10 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label.en} className="flex flex-col-reverse items-center gap-2 px-2 text-center">
          <dt className="text-sm text-mist">{pick(stat.label, locale)}</dt>
          <dd lang="en" dir="ltr" className="font-display text-4xl leading-none text-ivory md:text-5xl">
            {stat.text ?? <CountUp value={stat.value} suffix={stat.suffix} />}
          </dd>
        </div>
      ))}
    </dl>
  );
}
