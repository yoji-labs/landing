"use client";

import { useCallback, useState } from "react";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";
import { validateGeneralContact, type FieldErrors } from "@/lib/forms/schema";
import { formsUseMocks, submitGeneralContact } from "@/lib/forms/submit";
import type { GeneralContactFormInput } from "@/types/site";

interface GeneralContactFormProps {
  title: string;
  responseNote: string;
  embedded?: boolean;
}

type FormErrors = FieldErrors<GeneralContactFormInput>;

const initialValues: GeneralContactFormInput = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function GeneralContactForm({
  title,
  responseNote,
  embedded = false,
}: GeneralContactFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());
  const handleToken = useCallback((token: string | null) => setTurnstileToken(token), []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateGeneralContact(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState("idle");
      return;
    }

    setSubmitState("submitting");

    const result = await submitGeneralContact(values, {
      company_website: honeypot,
      startedAt,
      turnstileToken,
    });

    if (result.state === "error") {
      setSubmitState("error");
      setFeedback(result.message);
      if (result.fieldErrors) {
        setErrors(result.fieldErrors as FormErrors);
      }
      return;
    }

    setSubmitState("success");
    setFeedback(result.message);
    setValues(initialValues);
    setErrors({});
  }

  function updateField<K extends keyof GeneralContactFormInput>(
    key: K,
    value: GeneralContactFormInput[K],
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));

    if (errors[key]) {
      setErrors((current) => ({
        ...current,
        [key]: undefined,
      }));
    }
  }

  return (
    <div className={embedded ? "min-w-0 px-0 py-0 sm:px-0" : "card-surface min-w-0 px-6 py-7 sm:px-7"}>
      <p className="break-words text-sm font-semibold text-text-strong">{title}</p>

      {submitState === "success" ? (
        <div className="mt-5 space-y-4 rounded-[var(--radius-card)] border border-[#D8C08F] bg-surface-soft px-5 py-5">
          <p className="text-base font-semibold text-text-strong">
            Sent — check your inbox
          </p>
          <p className="text-sm leading-7 text-text-muted">{feedback}</p>
          <p className="text-sm leading-7 text-text-muted">{responseNote}</p>
          <button
            type="button"
            className="inline-flex min-h-10 w-full items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent/35 hover:text-accent sm:w-auto"
            onClick={() => {
              setSubmitState("idle");
              setFeedback("");
            }}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form className="relative mt-5 min-w-0 space-y-4" onSubmit={handleSubmit} noValidate>
          <HoneypotField value={honeypot} onChange={setHoneypot} />
          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            <label className="block min-w-0 space-y-2 text-sm font-medium text-text-strong">
              <span>Name</span>
              <input
                value={values.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="min-h-10 w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              />
              {errors.name ? (
                <span className="block text-xs font-medium text-accent">
                  {errors.name}
                </span>
              ) : null}
            </label>

            <label className="block min-w-0 space-y-2 text-sm font-medium text-text-strong">
              <span>Email</span>
              <input
                type="email"
                value={values.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="min-h-10 w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              />
              {errors.email ? (
                <span className="block text-xs font-medium text-accent">
                  {errors.email}
                </span>
              ) : null}
            </label>
          </div>

          <label className="block min-w-0 space-y-2 text-sm font-medium text-text-strong">
            <span>Subject</span>
            <input
              value={values.subject}
              onChange={(event) => updateField("subject", event.target.value)}
              className="min-h-10 w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            />
            {errors.subject ? (
              <span className="block text-xs font-medium text-accent">
                {errors.subject}
              </span>
            ) : null}
          </label>

          <label className="block min-w-0 space-y-2 text-sm font-medium text-text-strong">
            <span>Message</span>
            <textarea
              value={values.message}
              onChange={(event) => updateField("message", event.target.value)}
              rows={5}
              className="min-h-10 w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            />
            {errors.message ? (
              <span className="block text-xs font-medium text-accent">
                {errors.message}
              </span>
            ) : null}
          </label>

          {submitState === "error" ? (
            <div className="rounded-[var(--radius-card)] border border-[#D8C08F] bg-surface-soft px-4 py-3 text-sm leading-7 text-accent">
              {feedback}
            </div>
          ) : null}

          <TurnstileWidget onToken={handleToken} />

          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <p className="min-w-0 break-words text-xs leading-6 text-text-muted sm:flex-1">
              {formsUseMocks
                ? "Local preview: type “error” in the subject to see the failure state."
                : "We reply from hello@yojilabs.com within two business days."}
            </p>
            <button
              type="submit"
              disabled={submitState === "submitting"}
              className="inline-flex min-h-10 w-full items-center justify-center rounded-[var(--radius-card)] bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {submitState === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
