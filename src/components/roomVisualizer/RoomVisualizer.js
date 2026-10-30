"use client";

import { useEffect, useEffectEvent, useId, useRef, useState } from "react";
import { Download, Eye, ImagePlus, LoaderCircle, MessageCircle, Move, RotateCcw } from "lucide-react";
import { whatsappHref } from "@/data/site";
import { cn } from "@/lib/utils";

const SURFACES = ["floor", "back", "left", "right", "ceiling"];
// Nominal sizes in inches (width × height as laid on the surface).
const TILE_SIZES = [
  { id: "12x12", w: 12, h: 12 },
  { id: "12x24", w: 12, h: 24 },
  { id: "24x24", w: 24, h: 24 },
  { id: "32x32", w: 32, h: 32 },
  { id: "24x48", w: 24, h: 48 },
];
const GROUT_WIDTHS = { thin: 0.12, standard: 0.2, wide: 0.35 }; // inches
const GROUT_COLOURS = { light: "#e6e0d4", grey: "#a59c8e", dark: "#3d3b38" };
const MAX_PHOTO = 1600;
const UPLOAD_MAX_BYTES = 15 * 1024 * 1024;
const LIGHT_SAMPLE_WIDTH = 160;

const hexToRgb = (hex) => [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255);

/** Room box -> one quad per surface (TL, TR, BR, BL in surface space). */
function surfaceQuads({ inner: [iTL, iTR, iBR, iBL], outer: [oTL, oTR, oBR, oBL] }) {
  return {
    back: [iTL, iTR, iBR, iBL],
    left: [oTL, iTL, iBL, oBL],
    right: [iTR, oTR, oBR, iBR],
    floor: [iBL, iBR, oBR, oBL],
    ceiling: [oTL, oTR, iTR, iTL],
  };
}

/** Real size in feet (u, v) of each surface. */
function surfaceFeet({ width, height, depth }) {
  return { back: [width, height], left: [depth, height], right: [depth, height], floor: [width, depth], ceiling: [width, depth] };
}

/** Starting room box for an uploaded photo: far wall in the middle, near frame at the photo edges. */
function defaultBox(w, h) {
  return {
    inner: [
      [w * 0.32, h * 0.22],
      [w * 0.68, h * 0.22],
      [w * 0.68, h * 0.68],
      [w * 0.32, h * 0.68],
    ],
    outer: [
      [0, 0],
      [w, 0],
      [w, h],
      [0, h],
    ],
  };
}

/** Loads an image file or URL, scaled down to MAX_PHOTO (square-cropped when `square`). */
async function loadPicture(source, { square = false, max = MAX_PHOTO } = {}) {
  const bitmap =
    typeof source === "string"
      ? await new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = reject;
          image.src = source;
        })
      : await createImageBitmap(source, { imageOrientation: "from-image" });
  const side = Math.min(bitmap.width, bitmap.height);
  const [sw, sh] = square ? [side, side] : [bitmap.width, bitmap.height];
  const scale = Math.min(1, max / Math.max(sw, sh));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(sw * scale);
  canvas.height = Math.round(sh * scale);
  canvas.getContext("2d").drawImage(bitmap, (bitmap.width - sw) / 2, (bitmap.height - sh) / 2, sw, sh, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  return canvas;
}

/** Small greyscale copy of the photo plus the keep mask, for per-surface brightness. */
function lightMap(picture, keep) {
  const scale = LIGHT_SAMPLE_WIDTH / picture.width;
  const canvas = document.createElement("canvas");
  canvas.width = LIGHT_SAMPLE_WIDTH;
  canvas.height = Math.max(1, Math.round(picture.height * scale));
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.drawImage(picture, 0, 0, canvas.width, canvas.height);
  const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#fff";
  for (const polygon of keep) {
    context.beginPath();
    polygon.forEach(([x, y], index) => (index ? context.lineTo(x * scale, y * scale) : context.moveTo(x * scale, y * scale)));
    context.fill();
  }
  const mask = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const lum = new Float32Array(canvas.width * canvas.height);
  for (let index = 0; index < lum.length; index += 1) {
    lum[index] = mask[index * 4 + 3] > 127 ? -1 : (0.299 * data[index * 4] + 0.587 * data[index * 4 + 1] + 0.114 * data[index * 4 + 2]) / 255;
  }
  return { lum, width: canvas.width, height: canvas.height, scale };
}

/** Average brightness of the photo inside a quad (fixtures excluded); the tile keeps this as its base light. */
function referenceLight(map, inverse) {
  let sum = 0;
  let count = 0;
  for (let y = 0; y < map.height; y += 1) {
    for (let x = 0; x < map.width; x += 1) {
      const value = map.lum[y * map.width + x];
      if (value < 0) continue;
      const px = (x + 0.5) / map.scale;
      const py = (y + 0.5) / map.scale;
      const z = inverse[6] * px + inverse[7] * py + inverse[8];
      if (z <= 0) continue;
      const u = (inverse[0] * px + inverse[1] * py + inverse[2]) / z;
      const v = (inverse[3] * px + inverse[4] * py + inverse[5]) / z;
      if (u < 0 || v < 0 || u > 1 || v > 1) continue;
      sum += value;
      count += 1;
    }
  }
  return count ? Math.max(0.15, sum / count) : 0.7;
}

function Chip({ pressed, onClick, children, className }) {
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

function Group({ legend, children, className }) {
  return (
    <fieldset className={className}>
      <legend className="text-sm font-semibold text-charcoal">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

/**
 * Try tiles and marble on a room photo: a ready-made washroom or the visitor's
 * own photo (processed in the browser, never uploaded). Each surface (floor,
 * walls, ceiling) gets its own material and tile size. The renderer module is
 * loaded on demand; browsers without WebGL2 see a message instead.
 *
 * materials: [{ id, label, src, textureUrl }]; samples: roomSamples with `src`.
 */
export function RoomVisualizer({ materials, samples, labels }) {
  const id = useId();
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const rendererRef = useRef(null);
  const moduleRef = useRef(null);
  const lightRef = useRef(null);
  const roomInput = useRef(null);
  const tileInput = useRef(null);
  const dragRef = useRef(null);

  const sample = samples[0];
  const [status, setStatus] = useState("loading"); // loading | ready | unsupported
  const [photo, setPhoto] = useState(null); // { width, height, version, sample }
  const [box, setBox] = useState({ inner: sample.inner, outer: sample.outer });
  const [room, setRoom] = useState(sample.room);
  const [surfaces, setSurfaces] = useState(sample.surfaces);
  const [active, setActive] = useState("floor");
  const [groutWidth, setGroutWidth] = useState("standard");
  const [groutColour, setGroutColour] = useState("light");
  const [editing, setEditing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [customTile, setCustomTile] = useState(null); // { url }
  const [uploadError, setUploadError] = useState(false);

  const materialById = (materialId) =>
    materialId === "custom" && customTile
      ? { id: "custom", label: labels.customTile, textureUrl: customTile.url, natural: true }
      : (materials.find((item) => item.id === materialId) ?? materials[0]);

  function applyPicture(picture, keep, nextBox, nextRoom, isSample) {
    const renderer = rendererRef.current;
    renderer.setPhoto(picture);
    renderer.setKeep(keep);
    lightRef.current = lightMap(picture, keep);
    setBox(nextBox);
    setRoom(nextRoom);
    setEditing(!isSample);
    setPhoto((previous) => ({ width: picture.width, height: picture.height, version: (previous?.version ?? 0) + 1, sample: isSample }));
  }

  const start = useEffectEvent(async (rendererModule, isDisposed) => {
    if (isDisposed()) return;
    moduleRef.current = rendererModule;
    if (!rendererModule.isWebGL2Available()) {
      setStatus("unsupported");
      return;
    }
    try {
      rendererRef.current = rendererModule.createRoomRenderer(canvasRef.current);
      const picture = await loadPicture(sample.src);
      if (isDisposed()) return;
      applyPicture(picture, sample.keep, { inner: sample.inner, outer: sample.outer }, sample.room, true);
      setStatus("ready");
    } catch {
      setStatus("unsupported");
    }
  });

  useEffect(() => {
    let disposed = false;
    import("./roomRenderer").then((rendererModule) => start(rendererModule, () => disposed));
    return () => {
      disposed = true;
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, []);

  useEffect(() => () => customTile && URL.revokeObjectURL(customTile.url), [customTile]);

  const draw = useEffectEvent(() => {
    const renderer = rendererRef.current;
    if (!renderer || !photo) return;
    if (showOriginal) {
      renderer.render([]);
      return;
    }
    const quads = surfaceQuads(box);
    const feet = surfaceFeet(room);
    const grout = hexToRgb(GROUT_COLOURS[groutColour]);
    const list = SURFACES.filter((surface) => surfaces[surface].on).flatMap((surface) => {
      const inverse = moduleRef.current.quadInverse(quads[surface]);
      if (!inverse) return [];
      const size = TILE_SIZES.find((item) => item.id === surfaces[surface].size);
      const material = materialById(surfaces[surface].material);
      const [fu, fv] = feet[surface];
      return [
        {
          quad: quads[surface],
          count: [Math.max(0.5, (fu * 12) / size.w), Math.max(0.5, (fv * 12) / size.h)],
          gap: [GROUT_WIDTHS[groutWidth] / size.w, GROUT_WIDTHS[groutWidth] / size.h],
          grout,
          textureUrl: material.textureUrl,
          natural: Boolean(material.natural),
          reference: referenceLight(lightRef.current, inverse),
        },
      ];
    });
    renderer.render(list);
  });

  // Redraw whenever anything visible changes.
  useEffect(() => {
    draw();
  }, [photo, box, room, surfaces, groutWidth, groutColour, showOriginal, customTile]);

  function updateSurface(surface, change) {
    setSurfaces((current) => ({ ...current, [surface]: { ...current[surface], ...change } }));
  }
  function applyToWalls() {
    const { material, size } = surfaces[active];
    setSurfaces((current) => ({
      ...current,
      ...Object.fromEntries(["back", "left", "right"].map((wall) => [wall, { on: true, material, size }])),
    }));
  }

  async function handleRoomUpload(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > UPLOAD_MAX_BYTES) {
      setUploadError(true);
      return;
    }
    try {
      const picture = await loadPicture(file);
      setUploadError(false);
      applyPicture(picture, [], defaultBox(picture.width, picture.height), { width: 10, height: 9, depth: 12 }, false);
    } catch {
      setUploadError(true);
    }
  }

  async function showSample() {
    const picture = await loadPicture(sample.src);
    applyPicture(picture, sample.keep, { inner: sample.inner, outer: sample.outer }, sample.room, true);
    setSurfaces(sample.surfaces);
  }

  async function handleTileUpload(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > UPLOAD_MAX_BYTES) {
      setUploadError(true);
      return;
    }
    try {
      const picture = await loadPicture(file, { square: true, max: 1024 });
      const blob = await new Promise((resolve) => picture.toBlob(resolve, "image/jpeg", 0.9));
      if (customTile) rendererRef.current?.release(customTile.url);
      setUploadError(false);
      setCustomTile({ url: URL.createObjectURL(blob) });
      updateSurface(active, { on: true, material: "custom" });
    } catch {
      setUploadError(true);
    }
  }

  // ---------- corner handles ----------
  const handles = photo
    ? [
        ...box.inner.map((point, index) => ({ key: `inner-${index}`, ring: "inner", index, point })),
        ...box.outer.map((point, index) => ({ key: `outer-${index}`, ring: "outer", index, point })),
      ].filter(({ point: [x, y] }) => x >= 0 && y >= 0 && x <= photo.width && y <= photo.height)
    : [];

  function pointFromEvent(event) {
    const rect = frameRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(((event.clientX - rect.left) / rect.width) * photo.width, 0), photo.width);
    const y = Math.min(Math.max(((event.clientY - rect.top) / rect.height) * photo.height, 0), photo.height);
    return [x, y];
  }
  function startDrag(event, handle) {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = handle;
  }
  function moveDrag(event) {
    const handle = dragRef.current;
    if (!handle) return;
    const point = pointFromEvent(event);
    setBox((current) => ({ ...current, [handle.ring]: current[handle.ring].map((old, index) => (index === handle.index ? point : old)) }));
  }
  function nudge(event, handle) {
    const step = event.shiftKey ? 20 : 4;
    const delta = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[event.key];
    if (!delta) return;
    event.preventDefault();
    setBox((current) => ({
      ...current,
      [handle.ring]: current[handle.ring].map((old, index) =>
        index === handle.index
          ? [Math.min(Math.max(old[0] + delta[0], 0), photo.width), Math.min(Math.max(old[1] + delta[1], 0), photo.height)]
          : old,
      ),
    }));
  }

  // ---------- output ----------
  const summary =
    labels.shareText +
    SURFACES.filter((surface) => surfaces[surface].on)
      .map((surface) => `\n• ${labels.surfaces[surface]}: ${materialById(surfaces[surface].material).label}, ${surfaces[surface].size.replace("x", "×")} ${labels.inches}`)
      .join("") +
    `\n${labels.groutLabel}: ${labels.groutWidths[groutWidth]}, ${labels.groutColours[groutColour]}`;

  function capture() {
    return new Promise((resolve) => canvasRef.current.toBlob(resolve, "image/jpeg", 0.9));
  }
  async function download() {
    const blob = await capture();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    Object.assign(document.createElement("a"), { href: url, download: "nadeem-marbles-room.jpg" }).click();
    URL.revokeObjectURL(url);
  }
  async function shareOnWhatsapp() {
    const blob = await capture();
    const file = blob && new File([blob], "nadeem-marbles-room.jpg", { type: "image/jpeg" });
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

  const current = surfaces[active];
  const aspect = photo ? `${photo.width} / ${photo.height}` : "3 / 2";

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-8">
        <div ref={frameRef} className="relative overflow-hidden rounded-sm bg-[#e7e1d6]" style={{ aspectRatio: aspect }}>
          <canvas ref={canvasRef} role="img" aria-label={labels.canvasLabel} className="block size-full" />
          {status === "loading" ? (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
              <LoaderCircle aria-hidden="true" className="me-2 size-4 animate-spin" />
              {labels.loading}
            </div>
          ) : null}
          {status === "unsupported" ? (
            <p className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-charcoal">{labels.unsupported}</p>
          ) : null}
          {editing && photo ? (
            <>
              <svg viewBox={`0 0 ${photo.width} ${photo.height}`} preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full" aria-hidden="true">
                {Object.values(surfaceQuads(box)).map((quad, index) => (
                  <polygon key={index} points={quad.map((point) => point.join(",")).join(" ")} fill="none" stroke="#c5a052" strokeWidth={photo.width / 400} />
                ))}
              </svg>
              {handles.map((handle) => (
                <button
                  key={handle.key}
                  type="button"
                  aria-label={`${labels.handle} ${labels.handleNames[handle.ring][handle.index]}`}
                  onPointerDown={(event) => startDrag(event, handle)}
                  onPointerMove={moveDrag}
                  onPointerUp={() => (dragRef.current = null)}
                  onPointerCancel={() => (dragRef.current = null)}
                  onKeyDown={(event) => nudge(event, handle)}
                  className={cn(
                    "absolute size-7 -translate-x-1/2 -translate-y-1/2 touch-none rounded-full border-2 border-white shadow-md focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:outline-none",
                    handle.ring === "inner" ? "bg-gold" : "bg-charcoal",
                  )}
                  style={{ left: `${(handle.point[0] / photo.width) * 100}%`, top: `${(handle.point[1] / photo.height) * 100}%` }}
                />
              ))}
            </>
          ) : null}
        </div>

        {status === "ready" ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={showOriginal}
              onClick={() => setShowOriginal((value) => !value)}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-charcoal/20 px-4 text-sm font-semibold text-charcoal hover:border-charcoal"
            >
              <Eye aria-hidden="true" className="size-4" />
              {showOriginal ? labels.showTiles : labels.showOriginal}
            </button>
            <button
              type="button"
              aria-pressed={editing}
              onClick={() => setEditing((value) => !value)}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-charcoal/20 px-4 text-sm font-semibold text-charcoal hover:border-charcoal"
            >
              <Move aria-hidden="true" className="size-4" />
              {editing ? labels.doneCorners : labels.adjustCorners}
            </button>
            <button
              type="button"
              onClick={() => roomInput.current?.click()}
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-charcoal px-4 text-sm font-semibold text-ivory hover:bg-charcoal/90"
            >
              <ImagePlus aria-hidden="true" className="size-4" />
              {labels.uploadRoom}
            </button>
            {photo && !photo.sample ? (
              <button
                type="button"
                onClick={showSample}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-charcoal/20 px-4 text-sm font-semibold text-charcoal hover:border-charcoal"
              >
                <RotateCcw aria-hidden="true" className="size-4" />
                {labels.useSample}
              </button>
            ) : null}
          </div>
        ) : null}
        <input ref={roomInput} type="file" accept="image/*" onChange={handleRoomUpload} className="sr-only" tabIndex={-1} aria-hidden="true" />
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{editing ? labels.cornersHint : labels.photoHint}</p>
        {uploadError ? (
          <p role="alert" className="mt-2 text-xs text-destructive">
            {labels.uploadError}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-7 lg:col-span-4">
        <Group legend={labels.surfaceLabel}>
          {SURFACES.map((surface) => (
            <Chip key={surface} pressed={active === surface} onClick={() => setActive(surface)}>
              <span className={cn("me-2 inline-block size-2 rounded-full", surfaces[surface].on ? "bg-gold" : "bg-charcoal/20")} aria-hidden="true" />
              {labels.surfaces[surface]}
            </Chip>
          ))}
        </Group>

        <div className="rounded-sm border border-charcoal/10 p-4">
          <label className="flex items-center justify-between gap-3 text-sm font-semibold text-charcoal">
            {labels.tilesOn.replace("{surface}", labels.surfaces[active])}
            <input type="checkbox" checked={current.on} onChange={(event) => updateSurface(active, { on: event.target.checked })} className="size-5 accent-[#1c252d]" />
          </label>

          <fieldset className="mt-5">
            <legend className="text-sm font-semibold text-charcoal">{labels.materialLabel}</legend>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {materials.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={current.material === item.id}
                  aria-label={item.label}
                  title={item.label}
                  onClick={() => updateSurface(active, { on: true, material: item.id })}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-sm bg-cover bg-center ring-offset-2 ring-offset-ivory transition",
                    current.material === item.id ? "ring-2 ring-gold-deep" : "ring-1 ring-charcoal/10 hover:ring-charcoal/40",
                  )}
                  style={{ backgroundImage: `url(${item.textureUrl})` }}
                />
              ))}
              <button
                type="button"
                aria-pressed={current.material === "custom"}
                aria-label={customTile ? labels.customTile : labels.uploadTile}
                title={customTile ? labels.customTile : labels.uploadTile}
                onClick={() => (customTile ? updateSurface(active, { on: true, material: "custom" }) : tileInput.current?.click())}
                className={cn(
                  "relative flex aspect-square items-center justify-center overflow-hidden rounded-sm border border-dashed border-charcoal/30 bg-cover bg-center ring-offset-2 ring-offset-ivory",
                  current.material === "custom" && "ring-2 ring-gold-deep",
                )}
                style={customTile ? { backgroundImage: `url(${customTile.url})` } : undefined}
              >
                {customTile ? null : <ImagePlus aria-hidden="true" className="size-5 text-gold-deep" />}
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {materialById(current.material).label}
              {customTile ? (
                <button type="button" onClick={() => tileInput.current?.click()} className="ms-2 font-semibold text-charcoal underline underline-offset-2">
                  {labels.uploadAnotherTile}
                </button>
              ) : null}
            </p>
            <input ref={tileInput} type="file" accept="image/*" onChange={handleTileUpload} className="sr-only" tabIndex={-1} aria-hidden="true" />
          </fieldset>

          <Group legend={labels.sizeLabel} className="mt-5">
            {TILE_SIZES.map((item) => (
              <Chip key={item.id} pressed={current.size === item.id} onClick={() => updateSurface(active, { on: true, size: item.id })} className="px-3">
                <span dir="ltr">{`${item.w}×${item.h}`}</span>
              </Chip>
            ))}
          </Group>

          {["back", "left", "right"].includes(active) ? (
            <button type="button" onClick={applyToWalls} className="mt-5 text-sm font-semibold text-charcoal underline decoration-gold underline-offset-4">
              {labels.applyWalls}
            </button>
          ) : null}
        </div>

        <Group legend={labels.groutLabel}>
          {Object.keys(GROUT_WIDTHS).map((value) => (
            <Chip key={value} pressed={groutWidth === value} onClick={() => setGroutWidth(value)}>
              {labels.groutWidths[value]}
            </Chip>
          ))}
          <span className="flex basis-full gap-2">
            {Object.entries(GROUT_COLOURS).map(([value, colour]) => (
              <button
                key={value}
                type="button"
                aria-pressed={groutColour === value}
                aria-label={labels.groutColours[value]}
                title={labels.groutColours[value]}
                onClick={() => setGroutColour(value)}
                className={cn("size-10 rounded-full border border-charcoal/20 ring-offset-2 ring-offset-ivory", groutColour === value && "ring-2 ring-gold-deep")}
                style={{ backgroundColor: colour }}
              />
            ))}
          </span>
        </Group>

        <fieldset>
          <legend className="text-sm font-semibold text-charcoal">{labels.roomLabel}</legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["width", "height", "depth"].map((key) => (
              <label key={key} htmlFor={`${id}-${key}`} className="text-xs font-medium text-muted-foreground">
                {labels.roomDims[key]}
                <input
                  id={`${id}-${key}`}
                  type="number"
                  inputMode="decimal"
                  min="2"
                  max="100"
                  step="0.5"
                  dir="ltr"
                  value={room[key]}
                  onChange={(event) => {
                    const value = Number.parseFloat(event.target.value);
                    if (value >= 2 && value <= 100) setRoom((currentRoom) => ({ ...currentRoom, [key]: value }));
                  }}
                  className="mt-1 block h-10 w-full rounded-sm border border-charcoal/20 bg-white px-3 text-sm text-charcoal focus-visible:border-charcoal focus-visible:outline-none"
                />
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{labels.roomNote}</p>
        </fieldset>

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
    </div>
  );
}
