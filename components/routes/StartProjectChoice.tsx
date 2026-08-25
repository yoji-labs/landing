import Link from "next/link";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { siteContent } from "@/content/site-content";

export function StartProjectChoice() {
  const { startProject, sharedLabels } = siteContent;

  return (
    <section className="container-shell py-14 lg:py-18">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-5">
          <SectionEyebrow>Start a Project</SectionEyebrow>
          <h1 className="max-w-full text-[2.5rem] sm:max-w-[12ch] sm:text-6xl">
            {startProject.title}
          </h1>
          <p className="prose-measure text-lg leading-8 text-text-muted">
            {startProject.description}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <article className="card-surface min-w-0 px-6 py-7 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Highest-intent path
            </p>
            <h2 className="mt-5 text-3xl">{sharedLabels.bookCall}</h2>
            <p className="mt-4 text-base leading-8 text-text-muted">
              Book a short call first if you want to talk through the scope live
              and leave the session with a clearer next step.
            </p>
            <Link
              href={startProject.primaryAction.href}
              className="mt-8 inline-flex min-h-10 w-full items-center justify-center rounded-[var(--radius-card)] bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 sm:w-auto"
            >
              {startProject.primaryAction.label}
            </Link>
          </article>

          <article className="card-surface min-w-0 px-6 py-7 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Prep-first path
            </p>
            <h2 className="mt-5 text-3xl">{sharedLabels.sendProjectDetails}</h2>
            <p className="mt-4 text-base leading-8 text-text-muted">
              Send the essentials first if you want the follow-up conversation to
              start with context, requirements, and rough constraints already in hand.
            </p>
            <Link
              href={startProject.secondaryAction.href}
              className="mt-8 inline-flex min-h-10 w-full items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent/35 hover:text-accent sm:w-auto"
            >
              {startProject.secondaryAction.label}
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
