"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import Image from "next/image";
import { Download, Expand, Hand, ImagePlus, LoaderCircle, MessageCircle, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { whatsappHref } from "@/data/site";
import { cn } from "@/lib/utils";

const PATTERNS = ["straight", "diagonal", "checker"];
const FINISHES = ["polished", "honed"];
// Nominal sizes in inches; the scene works in units of 24 in.
const TILE_SIZES = [
  { id: "12x12", w: 12, d: 12 },
  { id: "12x24", w: 12, d: 24 },
  { id: "24x24", w: 24, d: 24 },
  { id: "32x32", w: 32, d: 32 },
  { id: "24x48", w: 24, d: 48 },
];
const GROUT_WIDTHS = { thin: 0.025, standard: 0.05, wide: 0.09 };
const GROUT_COLOURS = { light: "#e6e0d4", grey: "#a59c8e", dark: "#3d3b38" };
const UPLOAD_MAX_BYTES = 15 * 1024 * 1024;
const UPLOAD_SIZE = 1024;

const sceneTile = (size) => ({ w: size.w / 24, d: size.d / 24 });

/** Centre-crops a photo to a square and scales it down, entirely in the browser. */
async function squarePhoto(file) {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const side = Math.min(bitmap.width, bitmap.height);
  const size = Math.min(UPLOAD_SIZE, side);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  canvas.getContext("2d").drawImage(bitmap, (bitmap.width - side) / 2, (bitmap.height - side) / 2, side, side, 0, 0, size, size);
  bitmap.close();
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.9));
  return URL.createObjectURL(blob);
}

function OptionButton({ pressed, onClick, children, className }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "min-h-10 rounded-full border px-4 text-sm font-semibold transition-colors",
        pressed ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/20 text-charcoal hover:border-charcoal",
        className,
      )}
    >
      {children}
    </button>
  );
}

function ToolButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="inline-flex size-11 items-center justify-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory/20 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
    >
      {children}
    </button>
  );
}

function OptionGroup({ legend, children }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-charcoal">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

/**
 * Interactive 3D preview of a tiled floor. three.js and the scene module are
 * loaded only when the section approaches the viewport, rendering pauses while
 * it is off-screen, and browsers without WebGL see a still image instead.
 * Visitors can preview their own tile photo (processed locally, never uploaded)
 * and open the preview full screen to turn, tilt and zoom it.
 *
 * materials: [{ id, label, finish, src, textureUrl }]; the first material
 * whose id matches `contrastId` is used for the alternate checkerboard tiles.
 */
export function TileVisualizer({ materials, contrastIds, labels }) {
  const host = useRef(null);
  const sceneRef = useRef(null);
  const fileInput = useRef(null);
  const pointerStart = useRef(null);
  const [materialId, setMaterialId] = useState(materials[1]?.id ?? materials[0].id);
  const [custom, setCustom] = useState(null); // { url } of the visitor's own photo
  const [pattern, setPattern] = useState("straight");
  const [finish, setFinish] = useState("polished");
  const [sizeId, setSizeId] = useState("24x24");
  const [groutWidth, setGroutWidth] = useState("standard");
  const [groutColour, setGroutColour] = useState("grey");
  const [status, setStatus] = useState("idle"); // idle | loading | ready | unsupported
  const [uploadError, setUploadError] = useState(false);
  const [open, setOpen] = useState(false);

  const usingCustom = materialId === "custom" && custom;
  const material = materials.find((item) => item.id === materialId) ?? materials[0];
  const size = TILE_SIZES.find((item) => item.id === sizeId);
  const grout = { gap: GROUT_WIDTHS[groutWidth], color: GROUT_COLOURS[groutColour] };
  const materialName = usingCustom ? labels.customLabel : material.label;
  const sizeName = `${size.w}×${size.d} ${labels.inches}`;

  const textureFor = (id) =>
    id === "custom" && custom ? { url: custom.url, natural: true } : { url: materials.find((item) => item.id === id).textureUrl, natural: false };
  const contrastFor = (id) => ({ url: materials.find((item) => item.id === (id === contrastIds.dark ? contrastIds.light : contrastIds.dark)).textureUrl, natural: false });

  // Builds the scene with whatever is selected at the moment it loads.
  const createScene = useEffectEvent(async (element, isDisposed) => {
    setStatus("loading");
    const sceneModule = await import("./tileScene");
    if (isDisposed()) return;
    if (!sceneModule.isWebGLAvailable()) {
      setStatus("unsupported");
      return;
    }
    try {
      const controls = await sceneModule.createTileScene(element, {
        texture: textureFor(materialId),
        contrastTexture: contrastFor(materialId),
        pattern,
        finish,
        tile: sceneTile(size),
        grout,
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      });
      if (isDisposed()) {
        controls.dispose();
        return;
      }
      sceneRef.current = controls;
      controls.setActive(true);
      setStatus("ready");
    } catch {
      setStatus("unsupported");
    }
  });

  // Load the scene once the section is within 400px of the viewport, then
  // pause/resume rendering as it scrolls in and out of view.
  useEffect(() => {
    const element = host.current;
    let disposed = false;
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        sceneRef.current?.setActive(entry.isIntersecting);
        if (!entry.isIntersecting || started) return;
        started = true;
        createScene(element, () => disposed);
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(element);

    return () => {
      disposed = true;
      observer.disconnect();
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => () => custom && URL.revokeObjectURL(custom.url), [custom]);

  function chooseMaterial(id) {
    setMaterialId(id);
    sceneRef.current?.setMaterial(textureFor(id), contrastFor(id));
  }

  async function handleUpload(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > UPLOAD_MAX_BYTES) {
      setUploadError(true);
      return;
    }
    try {
      const url = await squarePhoto(file);
      if (custom) sceneRef.current?.release(custom.url);
      setUploadError(false);
      setCustom({ url });
      setMaterialId("custom");
      sceneRef.current?.setMaterial({ url, natural: true }, contrastFor(materialId));
    } catch {
      setUploadError(true);
    }
  }

  function choosePattern(value) {
    setPattern(value);
    sceneRef.current?.setPattern(value);
  }
  function chooseFinish(value) {
    setFinish(value);
    sceneRef.current?.setFinish(value);
  }
  function chooseSize(id) {
    setSizeId(id);
    sceneRef.current?.setTile(sceneTile(TILE_SIZES.find((item) => item.id === id)));
  }
  function chooseGrout(width, colour) {
    setGroutWidth(width);
    setGroutColour(colour);
    sceneRef.current?.setGrout({ gap: GROUT_WIDTHS[width], color: GROUT_COLOURS[colour] });
  }

  // The same canvas moves into the popup and back, so only one WebGL scene exists.
  const popupHost = (node) => {
    if (!node || !sceneRef.current) return;
    sceneRef.current.mount(node);
    sceneRef.current.setInteractive(true);
  };
  function changeOpen(next) {
    setOpen(next);
    if (next || !sceneRef.current) return;
    sceneRef.current.mount(host.current);
    sceneRef.current.setInteractive(false);
    sceneRef.current.resetView();
  }
  // A click (not a drag) on the inline preview opens it full screen.
  function handleHostClick(event) {
    const start = pointerStart.current;
    if (status !== "ready" || (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 6)) return;
    changeOpen(true);
  }

  const summary = labels.shareText
    .replace("{material}", materialName)
    .replace("{size}", sizeName)
    .replace("{pattern}", labels.patterns[pattern])
    .replace("{finish}", labels.finishes[finish])
    .replace("{grout}", `${labels.groutWidths[groutWidth]}, ${labels.groutColours[groutColour]}`);

  async function download() {
    const blob = await sceneRef.current?.capture();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement("a"), { href: url, download: "nadeem-marbles-floor.jpg" });
    link.click();
    URL.revokeObjectURL(url);
  }

  // Phones can share the picture itself; elsewhere WhatsApp opens with the details as text.
  async function shareOnWhatsapp() {
    const blob = await sceneRef.current?.capture();
    const file = blob && new File([blob], "nadeem-marbles-floor.jpg", { type: "image/jpeg" });
    if (file && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], text: summary });
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }
    window.open(whatsappHref(summary), "_blank", "noopener,noreferrer");
  }

  const description = labels.canvasLabel
    .replace("{material}", materialName)
    .replace("{pattern}", labels.patterns[pattern])
    .replace("{finish}", labels.finishes[finish]);

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-8">
        <div
          ref={host}
          role="img"
          aria-label={description}
          onPointerDown={(event) => (pointerStart.current = { x: event.clientX, y: event.clientY })}
          onClick={handleHostClick}
          className="relative aspect-4/3 overflow-hidden rounded-sm bg-[#e7e1d6] sm:aspect-16/10"
        >
          {status !== "ready" && status !== "unsupported" ? (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
              <LoaderCircle aria-hidden="true" className="me-2 size-4 animate-spin" />
              {labels.loading}
            </div>
          ) : null}
          {status === "unsupported" ? (
            <Image src={usingCustom ? custom.url : material.src} alt="" fill unoptimized={Boolean(usingCustom)} sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
          ) : null}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>{labels.note}</span>
          {status === "ready" ? (
            <span className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <Hand aria-hidden="true" className="size-3.5" />
                {labels.dragHint}
              </span>
              <button
                type="button"
                onClick={() => changeOpen(true)}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-charcoal/20 px-4 text-sm font-semibold text-charcoal hover:border-charcoal"
              >
                <Expand aria-hidden="true" className="size-4" />
                {labels.expand}
              </button>
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-7 lg:col-span-4">
        <fieldset>
          <legend className="text-sm font-semibold text-charcoal">{labels.materialLabel}</legend>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {materials.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={item.id === materialId}
                onClick={() => chooseMaterial(item.id)}
                className="group text-start"
              >
                <span
                  className={cn(
                    "relative block aspect-square overflow-hidden rounded-sm ring-offset-2 ring-offset-ivory transition",
                    item.id === materialId ? "ring-2 ring-gold-deep" : "ring-1 ring-charcoal/10 group-hover:ring-charcoal/40",
                  )}
                >
                  <Image src={item.src} alt="" fill sizes="96px" className="object-cover" />
                </span>
                <span className="mt-2 block text-xs leading-snug font-medium text-charcoal">{item.label}</span>
              </button>
            ))}
            <button
              type="button"
              aria-pressed={Boolean(usingCustom)}
              aria-describedby="visualizer-upload-hint"
              onClick={() => (custom && !usingCustom ? chooseMaterial("custom") : fileInput.current?.click())}
              className="group text-start"
            >
              <span
                className={cn(
                  "relative flex aspect-square items-center justify-center overflow-hidden rounded-sm border border-dashed border-charcoal/30 ring-offset-2 ring-offset-ivory transition",
                  usingCustom ? "ring-2 ring-gold-deep" : "group-hover:border-charcoal",
                )}
              >
                {custom ? (
                  // eslint-disable-next-line @next/next/no-img-element -- local blob URL from the visitor's own photo
                  <img src={custom.url} alt="" className="absolute inset-0 size-full object-cover" />
                ) : (
                  <ImagePlus aria-hidden="true" className="size-6 text-gold-deep" />
                )}
              </span>
              <span className="mt-2 block text-xs leading-snug font-medium text-charcoal">{custom ? labels.customLabel : labels.upload}</span>
            </button>
          </div>
          <input ref={fileInput} type="file" accept="image/*" onChange={handleUpload} className="sr-only" tabIndex={-1} aria-hidden="true" />
          <p id="visualizer-upload-hint" className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {labels.uploadHint}
            {custom ? (
              <button type="button" onClick={() => fileInput.current?.click()} className="ms-1 font-semibold text-charcoal underline underline-offset-2">
                {labels.uploadAnother}
              </button>
            ) : null}
          </p>
          {uploadError ? (
            <p role="alert" className="mt-2 text-xs text-destructive">
              {labels.uploadError}
            </p>
          ) : null}
        </fieldset>

        <OptionGroup legend={labels.sizeLabel}>
          {TILE_SIZES.map((item) => (
            <OptionButton key={item.id} pressed={sizeId === item.id} onClick={() => chooseSize(item.id)} className="px-3">
              <span dir="ltr">{`${item.w}×${item.d}`}</span>
            </OptionButton>
          ))}
        </OptionGroup>

        <OptionGroup legend={labels.patternLabel}>
          {PATTERNS.map((value) => (
            <OptionButton key={value} pressed={pattern === value} onClick={() => choosePattern(value)}>
              {labels.patterns[value]}
            </OptionButton>
          ))}
        </OptionGroup>

        <OptionGroup legend={labels.finishLabel}>
          {FINISHES.map((value) => (
            <OptionButton key={value} pressed={finish === value} onClick={() => chooseFinish(value)}>
              {labels.finishes[value]}
            </OptionButton>
          ))}
        </OptionGroup>

        <OptionGroup legend={labels.groutLabel}>
          {Object.keys(GROUT_WIDTHS).map((value) => (
            <OptionButton key={value} pressed={groutWidth === value} onClick={() => chooseGrout(value, groutColour)}>
              {labels.groutWidths[value]}
            </OptionButton>
          ))}
          <span className="flex basis-full gap-2">
            {Object.entries(GROUT_COLOURS).map(([value, colour]) => (
              <button
                key={value}
                type="button"
                aria-pressed={groutColour === value}
                aria-label={labels.groutColours[value]}
                title={labels.groutColours[value]}
                onClick={() => chooseGrout(groutWidth, value)}
                className={cn(
                  "size-10 rounded-full border border-charcoal/20 ring-offset-2 ring-offset-ivory transition",
                  groutColour === value && "ring-2 ring-gold-deep",
                )}
                style={{ backgroundColor: colour }}
              />
            ))}
          </span>
        </OptionGroup>

        {status === "ready" ? (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={shareOnWhatsapp}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-5 text-sm font-semibold text-charcoal hover:bg-[#d4b46c]"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              {labels.whatsapp}
            </button>
            <button
              type="button"
              onClick={download}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-charcoal/20 px-5 text-sm font-semibold text-charcoal hover:border-charcoal"
            >
              <Download aria-hidden="true" className="size-4" />
              {labels.download}
            </button>
          </div>
        ) : null}
      </div>

      <Dialog open={open} onOpenChange={changeOpen}>
        <DialogContent className="flex h-[100dvh] max-h-none w-screen flex-col max-w-none gap-0 rounded-none border-0 bg-charcoal p-0 text-ivory ring-0 sm:h-[min(92dvh,56rem)] sm:w-[min(94vw,90rem)] sm:max-w-none sm:rounded-sm [&_[data-slot=dialog-close]]:z-10 [&_[data-slot=dialog-close]]:size-11 [&_[data-slot=dialog-close]]:bg-charcoal/80 [&_[data-slot=dialog-close]]:text-ivory">
          <DialogTitle className="sr-only">{labels.popupTitle}</DialogTitle>
          <div ref={popupHost} role="img" aria-label={description} className="relative min-h-0 flex-1 bg-[#e7e1d6]" />
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 md:px-5">
            <DialogDescription className="text-xs text-mist sm:text-sm">{labels.popupHint}</DialogDescription>
            <div className="flex items-center gap-2">
              <ToolButton label={labels.zoomOut} onClick={() => sceneRef.current?.zoomBy(1.2)}>
                <ZoomOut aria-hidden="true" className="size-5" />
              </ToolButton>
              <ToolButton label={labels.zoomIn} onClick={() => sceneRef.current?.zoomBy(1 / 1.2)}>
                <ZoomIn aria-hidden="true" className="size-5" />
              </ToolButton>
              <ToolButton label={labels.reset} onClick={() => sceneRef.current?.resetView()}>
                <RotateCcw aria-hidden="true" className="size-5" />
              </ToolButton>
              <ToolButton label={labels.download} onClick={download}>
                <Download aria-hidden="true" className="size-5" />
              </ToolButton>
              <ToolButton label={labels.whatsapp} onClick={shareOnWhatsapp}>
                <MessageCircle aria-hidden="true" className="size-5" />
              </ToolButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
