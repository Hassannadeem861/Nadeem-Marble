"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CircleAlert, CircleCheck, Mail, MessageCircle, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// With canSendDirect the enquiry is emailed through /api/contact. Without it
// the form prepares the enquiry for WhatsApp or email instead, and never
// claims that anything was sent.
const msSince = (start) => Math.round(performance.now() - start);

const EMPTY = { name: "", phone: "", email: "", enquiryType: null, projectType: "", location: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/;

function validate(values, errors) {
  const result = {};
  if (!values.name.trim()) result.name = errors.name;
  if (!values.phone.trim() && !values.email.trim()) result.phone = errors.contact;
  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) result.phone = errors.phone;
  if (values.email.trim() && !EMAIL_PATTERN.test(values.email.trim())) result.email = errors.email;
  if (!values.enquiryType) result.enquiryType = errors.enquiryType;
  return result;
}

function Field({ id, label, required, error, hint, children }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-sm font-semibold text-charcoal">
        {label}
        {required ? <span aria-hidden="true" className="text-gold-deep"> *</span> : null}
      </Label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-destructive">
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

// Reads ?service=slug when arriving from a service page. The URL does not
// change while the form is open, so there is nothing to subscribe to.
const noSubscription = () => () => {};
const readRequestedService = () => new URLSearchParams(window.location.search).get("service");
const noRequestedServiceOnServer = () => null;

export function ContactForm({ labels, serviceOptions, projectTypeOptions, contact, canSendDirect }) {
  const [draft, setDraft] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("editing"); // editing | sending | ready | sent | failed
  const summaryRef = useRef(null);
  const statusRef = useRef(null);
  const honeypotRef = useRef(null);
  const sendingRef = useRef(false);
  const mountedAtRef = useRef(0);

  useEffect(() => {
    mountedAtRef.current = performance.now();
  }, []);

  const requestedService = useSyncExternalStore(noSubscription, readRequestedService, noRequestedServiceOnServer);
  const preselected = serviceOptions.some((option) => option.value === requestedService) ? requestedService : "";
  // enquiryType stays null until the visitor picks one, so the pre-selection applies until then.
  const values = { ...draft, enquiryType: draft.enquiryType ?? preselected };

  useEffect(() => {
    if (status !== "editing" && status !== "sending") statusRef.current?.focus();
  }, [status]);

  const update = (field) => (event) => {
    const value = event.target.value;
    setDraft((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const enquiryLabel = serviceOptions.find((option) => option.value === values.enquiryType)?.label ?? "";
  const projectTypeLabel = projectTypeOptions.find((option) => option.value === values.projectType)?.label ?? "";

  function composeMessage() {
    return [
      labels.messageIntro,
      "",
      `${labels.name}: ${values.name.trim()}`,
      values.phone.trim() && `${labels.phone}: ${values.phone.trim()}`,
      values.email.trim() && `${labels.email}: ${values.email.trim()}`,
      `${labels.enquiryType}: ${enquiryLabel}`,
      projectTypeLabel && `${labels.projectType}: ${projectTypeLabel}`,
      values.location.trim() && `${labels.location}: ${values.location.trim()}`,
      values.message.trim() && `${labels.message}: ${values.message.trim()}`,
    ]
      .filter((line) => line !== false && line !== undefined)
      .join("\n");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const found = validate(values, labels.errors);
    setErrors(found);
    if (Object.keys(found).length) {
      summaryRef.current?.focus();
      return;
    }

    if (!canSendDirect) {
      setStatus("ready");
      return;
    }

    if (sendingRef.current) return;
    sendingRef.current = true;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          enquiry: enquiryLabel,
          propertyType: projectTypeLabel,
          location: values.location.trim(),
          message: values.message.trim(),
          pageUrl: window.location.href,
          browserTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          website: honeypotRef.current?.value ?? "",
          elapsedMs: msSince(mountedAtRef.current),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.ok) {
        setDraft(EMPTY);
        setStatus("sent");
      } else {
        setStatus("failed");
      }
    } catch {
      setStatus("failed");
    } finally {
      sendingRef.current = false;
    }
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const describedBy = (field, hint = false) =>
    [hint && `${field}-hint`, errors[field] && `${field}-error`].filter(Boolean).join(" ") || undefined;

  if (status === "ready") {
    const message = composeMessage();
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-sm border border-border bg-white p-6 md:p-8 focus:outline-none">
        <h3 className="text-2xl text-charcoal">{labels.readyTitle}</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">{labels.readyText}</p>
        <pre className="mt-6 max-h-64 overflow-auto rounded-sm bg-stone/70 p-4 text-sm leading-relaxed whitespace-pre-wrap text-charcoal font-sans">
          {message}
        </pre>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-gold px-6 text-sm font-semibold text-charcoal hover:bg-[#d4b46c]"
          >
            <MessageCircle aria-hidden="true" className="size-4" />
            {labels.sendWhatsapp}
          </a>
          <a
            href={`mailto:${contact.email}?subject=${encodeURIComponent(labels.subject)}&body=${encodeURIComponent(message)}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-charcoal px-6 text-sm font-semibold text-ivory hover:bg-charcoal-soft"
          >
            <Mail aria-hidden="true" className="size-4" />
            {labels.sendEmail}
          </a>
          <Button type="button" variant="ghost" size="xl" onClick={() => setStatus("editing")}>
            <Pencil aria-hidden="true" />
            {labels.edit}
          </Button>
        </div>
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-sm border border-border bg-white p-6 md:p-8 focus:outline-none">
        <CircleCheck aria-hidden="true" className="size-8 text-gold-deep" />
        <h3 className="mt-4 text-2xl text-charcoal">{labels.successTitle}</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">{labels.successText}</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="rounded-sm border border-border bg-white p-6 md:p-8">
      <h3 className="text-2xl text-charcoal">{labels.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{labels.intro}</p>

      <div ref={summaryRef} tabIndex={-1} aria-live="assertive" className="focus:outline-none">
        {errorCount ? (
          <p className="mt-5 flex items-center gap-2 rounded-sm border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
            {labels.errors.summary}
          </p>
        ) : null}
      </div>

      {status === "failed" ? (
        <div ref={statusRef} tabIndex={-1} role="alert" className="mt-5 rounded-sm border border-destructive/30 bg-destructive/5 p-4 focus:outline-none">
          <p className="font-semibold text-destructive">{labels.errorTitle}</p>
          <p className="mt-1 text-sm text-charcoal">{labels.errorText}</p>
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field id="name" label={labels.name} required error={errors.name}>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              maxLength={100}
              value={values.name}
              onChange={update("name")}
              aria-invalid={Boolean(errors.name)}
              aria-required="true"
              aria-describedby={describedBy("name")}
              className="h-11"
            />
          </Field>
        </div>
        <Field id="phone" label={labels.phone} error={errors.phone} hint={labels.contactHint}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            dir="ltr"
            autoComplete="tel"
            inputMode="tel"
            maxLength={30}
            value={values.phone}
            onChange={update("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone", true)}
            className="h-11 text-start rtl:text-end"
          />
        </Field>
        <Field id="email" label={labels.email} error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            maxLength={254}
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className="h-11 text-start rtl:text-end"
          />
        </Field>
        <div className="sm:col-span-2">
          <Field id="enquiryType" label={labels.enquiryType} required error={errors.enquiryType}>
            <NativeSelect
              id="enquiryType"
              name="enquiryType"
              value={values.enquiryType}
              onChange={update("enquiryType")}
              aria-invalid={Boolean(errors.enquiryType)}
              aria-required="true"
              aria-describedby={describedBy("enquiryType")}
              className="w-full [&_select]:h-11"
            >
              <NativeSelectOption value="">{labels.enquiryPlaceholder}</NativeSelectOption>
              {serviceOptions.map((option) => (
                <NativeSelectOption key={option.value} value={option.value}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>
        </div>
        <Field id="projectType" label={labels.projectType}>
          <NativeSelect
            id="projectType"
            name="projectType"
            value={values.projectType}
            onChange={update("projectType")}
            className="w-full [&_select]:h-11"
          >
            <NativeSelectOption value="">—</NativeSelectOption>
            {projectTypeOptions.map((option) => (
              <NativeSelectOption key={option.value} value={option.value}>
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
        <Field id="location" label={labels.location}>
          <Input
            id="location"
            name="location"
            autoComplete="address-level2"
            maxLength={120}
            value={values.location}
            onChange={update("location")}
            className="h-11"
          />
        </Field>
        <div className="sm:col-span-2">
          <Field id="message" label={labels.message} hint={labels.messageHint}>
            <Textarea
              id="message"
              name="message"
              rows={5}
              maxLength={3000}
              value={values.message}
              onChange={update("message")}
              aria-describedby={describedBy("message", true)}
            />
          </Field>
        </div>
      </div>

      {/* Hidden from people; bots that fill every field reveal themselves. */}
      <div aria-hidden="true" className="absolute -start-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input ref={honeypotRef} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <Button
        type="submit"
        variant="gold"
        size="xl"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
        className={cn("mt-8 w-full sm:w-auto")}
      >
        {status === "sending" ? labels.sending : canSendDirect ? labels.submitDirect : labels.submit}
      </Button>
      {canSendDirect ? <p className="mt-4 text-xs text-muted-foreground">{labels.privacyNote}</p> : null}
    </form>
  );
}
