import { TileVisualizer } from "@/components/home/visualizer/TileVisualizer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { materialSwatches } from "@/data/company";
import { getImage } from "@/data/images";
import { pick } from "@/lib/i18n";

// Textures for the 3D preview go through the Next.js image optimiser so the
// browser receives a 640px WebP/AVIF instead of the full-size photograph.
const textureUrl = (src) => `/_next/image?url=${encodeURIComponent(src)}&w=640&q=75`;

export function MaterialGallery({ locale, dict }) {
  const copy = dict.home.materials;
  const labels = dict.home.visualizer;

  const materials = materialSwatches.map((swatch) => {
    const image = getImage(swatch.image);
    return {
      id: swatch.image,
      label: pick(swatch.name, locale),
      src: image.src,
      textureUrl: textureUrl(image.src),
    };
  });

  return (
    <section id="visualizer" aria-labelledby="materials-heading" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="materials-heading" eyebrow={copy.eyebrow} title={labels.title} text={labels.text} />
          <p className="max-w-xs text-sm text-muted-foreground">{copy.note}</p>
        </div>
        <div className="mt-12">
          <TileVisualizer locale={locale} materials={materials} contrastIds={{ dark: "marbleBlack", light: "marbleGrey" }} labels={labels} />
        </div>
      </div>
    </section>
  );
}
