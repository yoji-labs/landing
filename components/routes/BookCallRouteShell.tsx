import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { BookCallFallback } from "@/components/forms/BookCallFallback";
import { BookCallMockForm } from "@/components/forms/BookCallMockForm";
import { CalEmbed } from "@/components/forms/CalEmbed";
import { siteConfig } from "@/lib/site-config";

export function BookCallRouteShell() {
  const calLink = siteConfig.urls.integrations.calLink;
  const showMock = !calLink && siteConfig.deploymentStage === "local";

  return (
    <section className="container-shell py-14 lg:py-18">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-5">
          <SectionEyebrow>Book a Call</SectionEyebrow>
          <h1 className="max-w-full text-[2.5rem] sm:max-w-[12ch] sm:text-6xl">
            Pick a time and keep the next conversation focused.
          </h1>
          <p className="prose-measure text-lg leading-8 text-text-muted">
            Pick a 30-minute slot. You&apos;ll get a calendar invite and a short prep
            note so we can spend the call on your workflow, not on introductions.
          </p>
        </div>

        <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div className="card-surface min-w-0 px-6 py-7 sm:px-7">
            <p className="text-sm font-semibold text-text-strong">What to expect</p>
            <div className="mt-5 space-y-3 text-sm leading-7 text-text-muted">
              <p>We will use the call to clarify the workflow, urgency, and success criteria.</p>
              <p>Times are shown in your timezone. Reschedule any time from the invite.</p>
              <p>If you already have details written out, the intake route may prep the call even better.</p>
            </div>
          </div>

          {calLink ? (
            <CalEmbed calLink={calLink} />
          ) : showMock ? (
            <BookCallMockForm />
          ) : (
            <BookCallFallback />
          )}
        </div>
      </div>
    </section>
  );
}
