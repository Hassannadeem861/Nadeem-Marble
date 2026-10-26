"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { MapPin, MessageCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { whatsappHref } from "@/data/site";
import { format, searchKey } from "@/lib/format";
import { cn } from "@/lib/utils";

const firstLetter = (name) => name.charAt(0).toLocaleUpperCase();

/**
 * Area cards with a letter filter and search. `areas` arrive sorted for the
 * page language; every card is in the HTML, filtering only hides cards.
 */
export function AreaDirectory({ areas, labels }) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState(null);
  const term = searchKey(query);
  const letters = [...new Set(areas.map((area) => firstLetter(area.name)))];
  const matches = areas.filter((area) => (!letter || firstLetter(area.name) === letter) && (!term || area.search.includes(term)));

  const tabClass = (active) =>
    cn(
      "inline-flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
      active ? "bg-charcoal text-ivory" : "text-charcoal hover:bg-charcoal/10",
    );

  return (
    <div>
      <div className="mx-auto max-w-3xl">
        <label htmlFor={`${id}-search`} className="sr-only">
          {labels.searchLabel}
        </label>
        <div className="relative">
          <Search aria-hidden="true" className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id={`${id}-search`}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
            aria-describedby={`${id}-status`}
            autoComplete="off"
            className="h-12 rounded-full bg-white ps-11"
          />
        </div>
      </div>

      <div role="group" aria-label={labels.lettersLabel} className="mt-6 flex gap-1 overflow-x-auto pb-2 lg:flex-wrap lg:justify-center">
        <button type="button" aria-pressed={!letter} onClick={() => setLetter(null)} className={cn(tabClass(!letter), "w-auto px-4")}>
          {labels.all}
        </button>
        {letters.map((value) => (
          <button key={value} type="button" aria-pressed={letter === value} onClick={() => setLetter(value)} className={tabClass(letter === value)}>
            {value}
          </button>
        ))}
      </div>

      <p id={`${id}-status`} aria-live="polite" className="mt-3 text-center text-xs text-muted-foreground">
        {format(labels.resultCount, { n: matches.length })}
      </p>

      {matches.length ? (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {matches.map((area) => (
            <li
              key={area.name}
              className={cn(
                "flex items-center gap-3 rounded-sm border bg-white p-4 transition-shadow hover:shadow-md",
                area.base ? "border-gold-deep ring-1 ring-gold-deep" : "border-border",
              )}
            >
              <MapPin aria-hidden="true" className="size-5 shrink-0 text-gold-deep" />
              <span className="min-w-0 flex-1">
                {area.href ? (
                  <Link href={area.href} className="block truncate font-semibold text-charcoal underline decoration-gold underline-offset-4 hover:decoration-2">
                    {area.name}
                  </Link>
                ) : (
                  <span className="block truncate font-semibold text-charcoal">{area.name}</span>
                )}
                <span className="block text-xs text-muted-foreground">{area.base ? labels.baseLabel : labels.cardSub}</span>
              </span>
              <a
                href={whatsappHref(format(labels.askMessage, { area: area.name }))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={format(labels.askArea, { area: area.name })}
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#25d366]/12 text-[#128c4a] transition-colors hover:bg-[#25d366]/25"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div role="status" className="mx-auto mt-8 max-w-xl rounded-sm border border-border bg-white p-6 text-center">
          <p className="font-semibold text-charcoal">{labels.noMatchTitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{labels.noMatchText}</p>
          <a
            href={whatsappHref(format(labels.askMessage, { area: query.trim() || labels.myArea }))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-5 text-sm font-semibold text-charcoal hover:bg-[#d4b46c]"
          >
            <MessageCircle aria-hidden="true" className="size-4" />
            {labels.askButton}
          </a>
        </div>
      )}
    </div>
  );
}
