import Link from "next/link";
import { RoomVisualizer } from "@/components/roomVisualizer/RoomVisualizer";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHeader } from "@/components/shared/PageHeader";
import { materialSwatches } from "@/data/company";
import { getImage } from "@/data/images";
import { roomSamples } from "@/data/roomSamples";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath, pick } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

// Textures go through the image optimiser so the browser gets a small WebP/AVIF.
const optimised = (src, width) => `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/room-visualizer", title: dict.meta.roomVisualizer.title, description: dict.meta.roomVisualizer.description });
}

export default async function RoomVisualizerPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const copy = dict.roomVisualizer;

  const materials = materialSwatches.map((swatch) => ({
    id: swatch.image,
    label: pick(swatch.name, locale),
    textureUrl: optimised(getImage(swatch.image).src, 640),
  }));
  const samples = roomSamples.map((sample) => ({ ...sample, src: optimised(getImage(sample.image).src, 1920) }));

  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        breadcrumbs={[
          { name: dict.nav.home, path: "/" },
          { name: copy.eyebrow, path: "/room-visualizer" },
        ]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        text={copy.text}
      />
      <section className="py-12 md:py-16">
        <div className="container-page">
          <RoomVisualizer materials={materials} samples={samples} labels={copy.tool} />
        </div>
      </section>
      <section aria-labelledby="room-steps" className="pb-16 md:pb-24">
        <div className="container-page max-w-3xl">
          <h2 id="room-steps" className="text-3xl text-charcoal">
            {copy.stepsTitle}
          </h2>
          <ol className="mt-6 space-y-4">
            {copy.steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-semibold text-charcoal">{index + 1}</span>
                <p className="text-charcoal/90">{step}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted-foreground">{copy.privacy}</p>
          <Link
            href={localizePath(locale, "/blog/how-to-use-room-visualizer")}
            className="mt-4 inline-flex min-h-10 items-center text-sm font-semibold text-charcoal underline decoration-gold underline-offset-4 hover:decoration-2"
          >
            {copy.guideLink}
          </Link>
        </div>
      </section>
      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
