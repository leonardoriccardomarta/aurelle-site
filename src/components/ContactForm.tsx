"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { LIMITS, TOPICS, validateContact, type ContactFields, type FieldErrors } from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "error";

const EMPTY: ContactFields = { name: "", email: "", store: "", topic: TOPICS[0], message: "" };

/**
 * Support contact form. Validates in the browser for instant feedback, posts to /api/contact (which validates again),
 * and always tells the visitor what happened. A hidden "website" field and a fill-time check keep simple bots out.
 */
export default function ContactForm({ email }: { email: string }) {
  const [fields, setFields] = useState<ContactFields>(EMPTY);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [problem, setProblem] = useState("");
  const startedAt = useRef(0);
  const form = useRef<HTMLFormElement>(null);
  const result = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "sent" || status === "error") result.current?.focus();
  }, [status]);

  const set = (key: keyof ContactFields) => (event: { target: { value: string } }) => {
    setFields((current) => ({ ...current, [key]: event.target.value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const found = validateContact(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setProblem("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, website, elapsed: Date.now() - startedAt.current }),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; errors?: FieldErrors; message?: string };
      if (response.ok && data.ok) {
        setFields(EMPTY);
        setStatus("sent");
        return;
      }
      if (data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }
      setProblem(data.message ?? "The message could not be sent.");
      setStatus("error");
    } catch {
      setProblem("The message could not be sent. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div ref={result} tabIndex={-1} role="status" className="border-y border-foreground py-10 outline-none">
        <p className="eyebrow">Message sent</p>
        <p className="mt-3 font-heading text-[1.75rem] leading-snug">Thank you. We have your message.</p>
        <p className="mt-4 max-w-md text-muted">We will reply to the email address you gave us. Replies are usually sent within 1 to 2 business days.</p>
        <button type="button" className="link mt-6 inline-flex min-h-11 items-center text-[0.9375rem]" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  const describedBy = (key: keyof ContactFields) => (errors[key] ? `contact-${key}-error` : undefined);
  const error = (key: keyof ContactFields) =>
    errors[key] ? (
      <p id={`contact-${key}-error`} className="field-error">
        {errors[key]}
      </p>
    ) : null;

  return (
    <form ref={form} onSubmit={submit} noValidate className="grid gap-6" aria-describedby={status === "error" ? "contact-problem" : undefined}>
      {/* Spam trap: invisible and out of the tab order; people never fill it in. */}
      <div aria-hidden="true" inert className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="field-label">
            Name
          </label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required maxLength={LIMITS.name} value={fields.name} onChange={set("name")} className="field-input" aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} />
          {error("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className="field-label">
            Email
          </label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={LIMITS.email} value={fields.email} onChange={set("email")} className="field-input" aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} />
          {error("email")}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-topic" className="field-label">
            Topic
          </label>
          <select id="contact-topic" name="topic" value={fields.topic} onChange={set("topic")} className="field-input field-select" aria-invalid={Boolean(errors.topic)} aria-describedby={describedBy("topic")}>
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          {error("topic")}
        </div>
        <div>
          <label htmlFor="contact-store" className="field-label">
            Store address <span className="font-normal normal-case tracking-normal">(optional)</span>
          </label>
          <input id="contact-store" name="store" type="text" inputMode="url" autoComplete="off" maxLength={LIMITS.store} placeholder="your-store.myshopify.com" value={fields.store} onChange={set("store")} className="field-input" aria-invalid={Boolean(errors.store)} aria-describedby={describedBy("store")} />
          {error("store")}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="field-label">
          Message
        </label>
        <textarea id="contact-message" name="message" required rows={7} maxLength={LIMITS.message} value={fields.message} onChange={set("message")} className="field-input" aria-invalid={Boolean(errors.message)} aria-describedby={describedBy("message")} />
        {error("message")}
      </div>

      {status === "error" ? (
        <div ref={result} tabIndex={-1} role="alert" id="contact-problem" className="border-l-2 border-[#8f3a3a] py-1 pl-4 outline-none">
          <p className="text-[#8f3a3a]">{problem}</p>
          <p className="mt-1 text-muted">
            You can also write to us at{" "}
            <a className="link" href={`mailto:${email}`}>
              {email}
            </a>
            .
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <button type="submit" className="btn" disabled={status === "sending"} aria-disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send message"}
        </button>
        <p className="max-w-xs text-[0.8125rem] text-muted">We use your details only to answer your message.</p>
      </div>
    </form>
  );
}
