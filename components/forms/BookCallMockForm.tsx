"use client";

import { useState } from "react";
import { mockBookingAvailability, submitMockBooking } from "@/lib/mocks/mock-booking";
import type {
  BookingSubmissionInput,
  MockBookingSlot,
  MockSubmissionResult,
} from "@/types/site";

type BookingErrors = Partial<Record<keyof BookingSubmissionInput, string>>;

const initialValues: BookingSubmissionInput = {
  slotId: "",
  name: "",
  email: "",
  business: "",
};

function validate(values: BookingSubmissionInput) {
  const errors: BookingErrors = {};

  if (!values.slotId) {
    errors.slotId = "Please choose a time first.";
  }
  if (!values.name.trim()) {
    errors.name = "Please share your name.";
  }
  if (!values.email.trim()) {
    errors.email = "Please share your email.";
  }
  if (!values.business.trim()) {
    errors.business = "Please share your business.";
  }

  return errors;
}

export function BookCallMockForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] =
    useState<MockSubmissionResult<{ slotId: string; slotLabel: string; dayLabel: string; dateLabel: string } | null> | null>(
      null,
    );

  const selectedSlot = mockBookingAvailability
    .flatMap((day) => day.slots)
    .find((slot) => slot.id === values.slotId);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState("idle");
      return;
    }

    setSubmitState("submitting");
    const result = await submitMockBooking(values);
    setFeedback(result);
    setSubmitState(result.state);
  }

  function updateField<K extends keyof BookingSubmissionInput>(
    key: K,
    value: BookingSubmissionInput[K],
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

  function selectSlot(slot: MockBookingSlot) {
    updateField("slotId", slot.id);
  }

  if (submitState === "success" && feedback?.payload) {
    return (
      <div className="card-surface min-w-0 px-6 py-7 sm:px-7">
        <p className="text-sm font-semibold text-text-strong">Call booked</p>
        <div className="mt-5 space-y-4 rounded-[var(--radius-card)] border border-[#D8C08F] bg-surface-soft px-5 py-5">
          <p className="text-base font-semibold text-text-strong">
            {feedback.payload.dayLabel}, {feedback.payload.dateLabel} at {feedback.payload.slotLabel}
          </p>
          <p className="text-sm leading-7 text-text-muted">{feedback.message}</p>
          <button
            type="button"
            className="inline-flex min-h-10 w-full items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent/35 hover:text-accent sm:w-auto"
            onClick={() => {
              setValues(initialValues);
              setErrors({});
              setFeedback(null);
              setSubmitState("idle");
            }}
          >
            Book another mock slot
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-surface min-w-0 px-6 py-7 sm:px-7">
      <p className="text-sm font-semibold text-text-strong">Mock availability</p>

      <div className="mt-5 grid gap-4">
        {mockBookingAvailability.map((day) => (
          <div
            key={day.id}
            className="rounded-[var(--radius-card)] border border-border/80 bg-surface-soft px-4 py-4"
          >
            <div className="mb-4 flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <p className="text-base font-semibold text-text-strong">{day.label}</p>
              <p className="text-sm text-text-muted">{day.dateLabel}</p>
            </div>

            <div className="flex min-w-0 flex-wrap gap-3">
              {day.slots.map((slot) => {
                const isActive = values.slotId === slot.id;

                return (
                  <button
                    key={slot.id}
                    type="button"
                    className={`min-h-10 w-full rounded-full border px-4 py-2 text-sm font-semibold transition sm:w-auto ${
                      isActive
                        ? "border-accent bg-accent text-white"
                        : "border-border bg-surface text-text-muted hover:border-accent/35 hover:text-accent"
                    }`}
                    onClick={() => selectSlot(slot)}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selectedSlot ? (
        <form className="mt-6 min-w-0 space-y-4 border-t border-border/70 pt-6" onSubmit={handleSubmit} noValidate>
          <p className="text-sm font-semibold text-text-strong">
            Selected: {selectedSlot.label}
          </p>

          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            <label className="block min-w-0 space-y-2 text-sm font-medium text-text-strong">
              <span>Name</span>
              <input
                value={values.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="min-h-10 w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              />
              {errors.name ? (
                <span className="block text-xs font-medium text-accent">{errors.name}</span>
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
                <span className="block text-xs font-medium text-accent">{errors.email}</span>
              ) : null}
            </label>
          </div>

          <label className="block min-w-0 space-y-2 text-sm font-medium text-text-strong">
            <span>Business</span>
            <input
              value={values.business}
              onChange={(event) => updateField("business", event.target.value)}
              className="min-h-10 w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            />
            {errors.business ? (
              <span className="block text-xs font-medium text-accent">{errors.business}</span>
            ) : null}
          </label>

          {submitState === "error" ? (
            <div className="rounded-[var(--radius-card)] border border-[#D8C08F] bg-surface-soft px-4 py-3 text-sm leading-7 text-accent">
              {feedback?.message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitState === "submitting"}
            className="inline-flex min-h-10 w-full items-center justify-center rounded-[var(--radius-card)] bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {submitState === "submitting" ? "Booking..." : "Confirm mock booking"}
          </button>
        </form>
      ) : (
        <p className="mt-6 text-sm leading-7 text-text-muted">
          Select a mock slot to continue into the booking form.
        </p>
      )}

      {errors.slotId ? (
        <p className="mt-4 text-xs font-medium text-accent">{errors.slotId}</p>
      ) : null}
    </div>
  );
}
