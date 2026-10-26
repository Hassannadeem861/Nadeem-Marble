"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Camera, CircleCheck, MessageCircle, Phone, PhoneCall } from "lucide-react";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { telHref, whatsappHref } from "@/data/site";
import { cn } from "@/lib/utils";

const WHEN = ["asap", "today", "tomorrow", "thisWeek"];
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/;
const msSince = (start) => Math.round(performance.now() - start);

function Field({ id, label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-semibold tracking-wide text-charcoal uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}

/**
 * Quick enquiry for the Service Areas page. The message is built live and can
 * be sent on WhatsApp, or as a call-back request through /api/contact when
 * email delivery is configured (canSendDirect).
 */
export function AreaBooking({ areas, services, labels, canSendDirect, defaultArea = "" }) {
  const id = useId();
  const [area, setArea] = useState(defaultArea);
  const [service, setService] = useState("");
  const [when, setWhen] = useState("today");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("editing"); // editing | sending | sent | failed | invalid
  const honeypot = useRef(null);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  const message = [
    labels.greeting,
    `${labels.service}: ${service || labels.chooseService}`,
    `${labels.area}: ${area || labels.chooseArea}`,
    `${labels.when}: ${labels.whenOptions[when]}`,
    name.trim() && `${labels.name}: ${name.trim()}`,
    phone.trim() && `${labels.phone}: ${phone.trim()}`,
    details.trim() && `${labels.details}: ${details.trim()}`,
    labels.closing,
  ]
    .filter(Boolean)
    .join("\n");

  async function requestCallBack() {
    if (!name.trim() || !PHONE_PATTERN.test(phone.trim())) {
      setStatus("invalid");
      return;
    }
    if (status === "sending") return;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          enquiry: service || labels.callBackSubject,
          location: area,
          message: `${labels.when}: ${labels.whenOptions[when]}\n${details.trim()}`.trim(),
          pageUrl: window.location.href,
          browserTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          website: honeypot.current?.value ?? "",
          elapsedMs: msSince(mountedAt.current),
        }),
      });
      const result = await response.json().catch(() => ({}));
      setStatus(response.ok && result.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  const buttonBase = "inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-sm px-4 text-sm font-semibold transition-colors";

  return (
    <div className="grid gap-8 rounded-sm border border-border bg-white p-5 shadow-sm sm:p-8 lg:grid-cols-2 lg:gap-10">
      <div className="flex flex-col gap-5">
        <Field id={`${id}-area`} label={labels.area}>
          <NativeSelect id={`${id}-area`} value={area} onChange={(event) => setArea(event.target.value)} className="w-full [&_select]:h-12">
            <NativeSelectOption value="">{labels.chooseArea}</NativeSelectOption>
            {areas.map((item) => (
              <NativeSelectOption key={item} value={item}>
                {item}
              </NativeSelectOption>
            ))}
            <NativeSelectOption value={labels.otherArea}>{labels.otherArea}</NativeSelectOption>
          </NativeSelect>
        </Field>
        <Field id={`${id}-service`} label={labels.service}>
          <NativeSelect id={`${id}-service`} value={service} onChange={(event) => setService(event.target.value)} className="w-full [&_select]:h-12">
            <NativeSelectOption value="">{labels.chooseService}</NativeSelectOption>
            {services.map((item) => (
              <NativeSelectOption key={item} value={item}>
                {item}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
        <fieldset>
          <legend className="text-xs font-semibold tracking-wide text-charcoal uppercase">{labels.when}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {WHEN.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={when === value}
                onClick={() => setWhen(value)}
                className={cn(
                  "min-h-10 rounded-full border px-4 text-sm font-semibold transition-colors",
                  when === value ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/20 text-charcoal hover:border-charcoal",
                )}
              >
                {labels.whenOptions[value]}
              </button>
            ))}
          </div>
        </fieldset>
        <Field id={`${id}-name`} label={labels.name}>
          <Input id={`${id}-name`} autoComplete="name" maxLength={100} value={name} onChange={(event) => setName(event.target.value)} placeholder={labels.namePlaceholder} className="h-12" />
        </Field>
        <Field id={`${id}-phone`} label={labels.phone}>
          <Input
            id={`${id}-phone`}
            type="tel"
            dir="ltr"
            inputMode="tel"
            autoComplete="tel"
            maxLength={30}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="03xx xxxxxxx"
            className="h-12 text-start rtl:text-end"
          />
        </Field>
        <Field id={`${id}-details`} label={labels.detailsOptional}>
          <Textarea id={`${id}-details`} rows={3} maxLength={1000} value={details} onChange={(event) => setDetails(event.target.value)} placeholder={labels.detailsPlaceholder} />
        </Field>
        <div aria-hidden="true" className="absolute -start-[10000px] h-px w-px overflow-hidden">
          <input ref={honeypot} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold tracking-wide text-charcoal uppercase">{labels.preview}</p>
        <output aria-live="polite" className="block rounded-sm border border-dashed border-charcoal/20 bg-stone/50 p-4 text-sm leading-relaxed whitespace-pre-wrap text-charcoal">
          {message}
        </output>
        <div className="flex flex-col gap-3 sm:flex-row">
          {canSendDirect ? (
            <button type="button" onClick={requestCallBack} disabled={status === "sending"} className={cn(buttonBase, "bg-gold text-charcoal hover:bg-[#d4b46c] disabled:opacity-60")}>
              <PhoneCall aria-hidden="true" className="size-4" />
              {status === "sending" ? labels.sending : labels.callBack}
            </button>
          ) : null}
          <a href={whatsappHref(message)} target="_blank" rel="noopener noreferrer" className={cn(buttonBase, "bg-charcoal text-ivory hover:bg-charcoal-soft")}>
            <MessageCircle aria-hidden="true" className="size-4" />
            {labels.whatsapp}
          </a>
          <a href={telHref} className={cn(buttonBase, "border border-charcoal/25 text-charcoal hover:border-charcoal")}>
            <Phone aria-hidden="true" className="size-4" />
            {labels.call}
          </a>
        </div>
        <div aria-live="polite">
          {status === "sent" ? (
            <p className="flex items-center gap-2 text-sm font-semibold text-charcoal">
              <CircleCheck aria-hidden="true" className="size-4 text-gold-deep" />
              {labels.sent}
            </p>
          ) : null}
          {status === "invalid" ? <p className="text-sm text-destructive">{labels.invalid}</p> : null}
          {status === "failed" ? <p className="text-sm text-destructive">{labels.failed}</p> : null}
        </div>
        <p className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
          <Camera aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
          {labels.tip}
        </p>
      </div>
    </div>
  );
}
