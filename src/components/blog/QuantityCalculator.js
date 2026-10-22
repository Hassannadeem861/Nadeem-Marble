"use client";

import { useId, useState } from "react";
import { Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { cn } from "@/lib/utils";

// Nominal sizes as sold in Pakistan (inches), with their usual metric size.
const TILE_SIZES = [
  { id: "12x12", label: "12x12 in (30x30 cm)", sqft: 1, sqm: 0.09 },
  { id: "12x24", label: "12x24 in (30x60 cm)", sqft: 2, sqm: 0.18 },
  { id: "24x24", label: "24x24 in (60x60 cm)", sqft: 4, sqm: 0.36 },
  { id: "32x32", label: "32x32 in (80x80 cm)", sqft: 64 / 9, sqm: 0.64 },
  { id: "24x48", label: "24x48 in (60x120 cm)", sqft: 8, sqm: 0.72 },
];
const WASTAGE = [5, 10, 15, 20];
const SQFT_PER_SQM = 10.7639;

const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const money = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/** Estimates tiles or marble pieces for a rectangular floor. All maths runs in the browser. */
export function QuantityCalculator({ labels }) {
  const id = useId();
  const [unit, setUnit] = useState("ft");
  const [length, setLength] = useState("12");
  const [width, setWidth] = useState("15");
  const [sizeId, setSizeId] = useState("24x24");
  const [wastage, setWastage] = useState(10);
  const [price, setPrice] = useState("");

  const size = TILE_SIZES.find((item) => item.id === sizeId);
  const area = Math.max(0, Number(length) || 0) * Math.max(0, Number(width) || 0);
  const tileArea = unit === "ft" ? size.sqft : size.sqm;
  const tiles = area > 0 ? Math.ceil((area / tileArea) * (1 + wastage / 100)) : 0;
  const areaUnit = unit === "ft" ? labels.sqft : labels.sqm;

  // The price is always per square foot, so metric areas are converted first.
  const toSqft = (value) => (unit === "ft" ? value : value * SQFT_PER_SQM);
  const rate = price.trim() === "" ? NaN : Number(price);
  const showCost = Number.isFinite(rate) && rate > 0 && area > 0;
  const areaCost = toSqft(area) * rate;
  const orderCost = toSqft(tiles * tileArea) * rate;

  return (
    <aside aria-labelledby={`${id}-title`} className="my-10 rounded-sm border border-border bg-white p-6 md:p-8">
      <h2 id={`${id}-title`} className="mt-0! flex items-center gap-3 text-2xl text-charcoal">
        <Calculator aria-hidden="true" className="size-6 text-gold-deep" />
        {labels.title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{labels.intro}</p>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-charcoal">{labels.unit}</legend>
        <div className="mt-2 flex gap-2">
          {[
            ["ft", labels.feet],
            ["m", labels.metres],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={unit === value}
              onClick={() => setUnit(value)}
              className={cn(
                "min-h-10 rounded-full border px-4 text-sm font-semibold transition-colors",
                unit === value ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/20 text-charcoal hover:border-charcoal",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {[
          ["length", labels.length, length, setLength],
          ["width", labels.width, width, setWidth],
        ].map(([field, label, value, setValue]) => (
          <div key={field} className="flex flex-col gap-2">
            <label htmlFor={`${id}-${field}`} className="text-sm font-semibold text-charcoal">
              {label} ({unit === "ft" ? labels.feet : labels.metres})
            </label>
            <Input
              id={`${id}-${field}`}
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              dir="ltr"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className="h-11"
            />
          </div>
        ))}
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-size`} className="text-sm font-semibold text-charcoal">
            {labels.tileSize}
          </label>
          <NativeSelect id={`${id}-size`} value={sizeId} onChange={(event) => setSizeId(event.target.value)} className="w-full [&_select]:h-11">
            {TILE_SIZES.map((item) => (
              <NativeSelectOption key={item.id} value={item.id}>
                {item.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-wastage`} className="text-sm font-semibold text-charcoal">
            {labels.wastage}
          </label>
          <NativeSelect
            id={`${id}-wastage`}
            value={wastage}
            onChange={(event) => setWastage(Number(event.target.value))}
            aria-describedby={`${id}-wastage-hint`}
            className="w-full [&_select]:h-11"
          >
            {WASTAGE.map((value) => (
              <NativeSelectOption key={value} value={value}>
                {value}%
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <p id={`${id}-wastage-hint`} className="text-xs text-muted-foreground">
            {labels.wastageHint}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-price`} className="text-sm font-semibold text-charcoal">
            {labels.price}
          </label>
          <Input
            id={`${id}-price`}
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            dir="ltr"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            aria-describedby={`${id}-price-hint`}
            aria-invalid={price.trim() !== "" && !(rate > 0)}
            className="h-11"
          />
          <p id={`${id}-price-hint`} className="text-xs text-muted-foreground">
            {labels.priceHint}
          </p>
        </div>
      </div>

      <dl aria-live="polite" className="mt-6 grid gap-4 rounded-sm bg-stone/70 p-5 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold text-muted-foreground">{labels.area}</dt>
          <dd className="mt-1 font-display text-3xl text-charcoal">
            <span lang="en" dir="ltr">{number.format(area)}</span> <span className="text-base">{areaUnit}</span>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-muted-foreground">{labels.tiles}</dt>
          <dd className="mt-1 font-display text-3xl text-charcoal">
            <span lang="en" dir="ltr">{tiles}</span>
          </dd>
        </div>
        {showCost
          ? [
              [labels.areaCost, areaCost],
              [labels.orderCost, orderCost],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs font-semibold text-muted-foreground">{label}</dt>
                <dd className="mt-1 font-display text-3xl text-charcoal">
                  <span lang="en" dir="ltr">
                    <span className="text-base">Rs.</span> {money.format(value)}
                  </span>
                </dd>
              </div>
            ))
          : null}
      </dl>
      {showCost ? <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{labels.costNote}</p> : null}
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{labels.note}</p>
    </aside>
  );
}
