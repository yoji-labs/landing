"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";
import { demoContent } from "@/content/demo-content";
import { siteContent } from "@/content/site-content";
import { validateProjectIntake, type FieldErrors } from "@/lib/forms/schema";
import { submitProjectIntake } from "@/lib/forms/submit";
import type { ProjectIntakeFormInput } from "@/types/site";

const interestOptions = [
  { value: "", label: "Not sure yet" },
  ...demoContent.map((demo) => ({ value: demo.id, label: demo.title })),
  { value: "website", label: "Website" },
  { value: "call", label: "Just want to talk it through" },
  { value: "automation", label: "Automation / integrations" },
  { value: "other", label: "Something else" },
];



type IntakeErrors = FieldErrors<ProjectIntakeFormInput>;

const initialValues: ProjectIntakeFormInput = {
  name: "",
  email: "",
  business: "",
  projectNeeds: "",
};

export function ProjectIntakeForm() {
  // Pre-selected interest, e.g. from a concept demo card's ?interest= link.
  const initialInterest = useSearchParams().get("interest");
  const [interest, setInterest] = useState(
    interestOptions.some((option) => option.value === initialInterest) ? (initialInterest ?? "") : "",
  );
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());
  const handleToken = useCallback((token: string | null) => setTurnstileToken(token), []);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<IntakeErrors>({});
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateProjectIntake(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState("idle");
      return;
    }

    setSubmitState("submitting");
    const result = await submitProjectIntake(
      values,
      { company_website: honeypot, startedAt, turnstileToken },
      interest || null,
    );
    setFeedback(result.message);
    setSubmitState(result.state);

    if (result.state === "error" && result.fieldErrors) {
      setErrors(result.fieldErrors as IntakeErrors);
    }

    if (result.state === "success") {
      setValues(initialValues);
      setErrors({});
    }
  }

  function updateField<K extends keyof ProjectIntakeFormInput>(
    key: K,
    value: ProjectIntakeFormInput[K],
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

  if (submitState === "success") {
    return (
      <div className="card-surface min-w-0 px-6 py-7 sm:px-7">
        <p className="text-base font-semibold text-text-strong">Details received</p>
        <p className="mt-4 text-sm leading-7 text-text-muted">{feedback}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={siteContent.routeMap.startProjectBook}
            className="inline-flex min-h-10 w-full items-center justify-center rounded-[var(--radius-card)] bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 sm:w-auto"
          >
            {siteContent.sharedLabels.bookCall}
          </Link>
          <Link
            href={siteContent.routeMap.demos}
            className="inline-flex min-h-10 w-full items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent/35 hover:text-accent sm:w-auto"
          >
            {siteContent.sharedLabels.exploreDemos}
          </Link>
          <Link
            href={siteContent.routeMap.servicesAnchor}
            className="inline-flex min-h-10 w-full items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent/35 hover:text-accent sm:w-auto"
          >
            {siteContent.sharedLabels.viewServices}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="card-surface relative min-w-0 space-y-4 px-6 py-7 sm:px-7" onSubmit={handleSubmit} noValidate>
      <HoneypotField value={honeypot} onChange={setHoneypot} />
      <label className="block min-w-0 space-y-2 text-sm font-medium text-text-strong">
        <span>Name</span>
        <input
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="min-h-10 w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
        />
        {errors.name ? <span className="block text-xs font-medium text-accent">{errors.name}</span> : null}
      </label>

      <label className="block min-w-0 space-y-2 text-sm font-medium text-text-strong">
        <span>Email</span>
        <input
          type="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          className="min-h-10 w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
        />
        {errors.email ? <span className="block text-xs font-medium text-accent">{errors.email}</span> : null}
      </label>

      <label className="block min-w-0 space-y-2 text-sm font-medium text-text-strong">
        <span>Business</span>
        <input
          value={values.business}
          onChange={(event) => updateField("business", event.target.value)}
          className="min-h-10 w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
        />
        {errors.business ? <span className="block text-xs font-medium text-accent">{errors.business}</span> : null}
      </label>

      <label className="block min-w-0 space-y-2 text-sm font-medium text-text-strong">
        <span>What kind of project is this?</span>
        <select
          value={interest}
          onChange={(event) => setInterest(event.target.value)}
          className="min-h-10 w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
        >
          {interestOptions.map((option) => (
            <option key={option.value || "none"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block min-w-0 space-y-2 text-sm font-medium text-text-strong">
        <span>What do you need built?</span>
        <textarea
          value={values.projectNeeds}
          onChange={(event) => updateField("projectNeeds", event.target.value)}
          rows={6}
          className="min-h-10 w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
        />
        {errors.projectNeeds ? (
          <span className="block text-xs font-medium text-accent">{errors.projectNeeds}</span>
        ) : null}
      </label>

      {submitState === "error" ? (
        <div className="rounded-[var(--radius-card)] border border-[#D8C08F] bg-surface-soft px-4 py-3 text-sm leading-7 text-accent">
          {feedback}
        </div>
      ) : null}

      <TurnstileWidget onToken={handleToken} />

      <button
        type="submit"
        disabled={submitState === "submitting"}
        className="inline-flex min-h-10 w-full items-center justify-center rounded-[var(--radius-card)] bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {submitState === "submitting" ? "Sending..." : "Send project details"}
      </button>
    </form>
  );
}
