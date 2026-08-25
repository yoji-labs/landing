import { LeafAccent } from "@/components/brand/LeafAccent";
import { SystemBackdrop } from "@/components/brand/SystemBackdrop";
import { GeneralContactForm } from "@/components/forms/GeneralContactForm";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { ViewportReveal } from "@/components/landing/ViewportReveal";
import { siteContent } from "@/content/site-content";

export function ContactRouteShell() {
  const { aboutContact } = siteContent.home;

  return (
    <section className="section-band section-band--neutral relative overflow-hidden border-t border-border/60">
      <LeafAccent className="pointer-events-none absolute left-6 top-14 hidden w-[7rem] text-accent/34 lg:block" />
      <SystemBackdrop className="pointer-events-none absolute right-10 top-20 hidden w-[18rem] text-accent/8 xl:block" />
      <div className="pointer-events-none absolute left-[8%] top-28 hidden h-60 w-52 rounded-[58%_42%_52%_48%/44%_56%_42%_58%] bg-[rgba(247,223,186,0.3)] lg:block" />
      <div className="pointer-events-none absolute right-[-6rem] top-12 hidden h-72 w-80 rounded-[62%_38%_56%_44%/48%_52%_48%_52%] bg-[linear-gradient(180deg,rgba(244,177,108,0.22),rgba(211,95,57,0.18))] blur-[2px] xl:block" />

      <div className="container-shell py-14 lg:py-18">
        <ViewportReveal variant="rise">
          <div
            data-testid="contact-section"
            className="card-surface grid min-w-0 gap-8 px-6 py-7 sm:px-7 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]"
          >
            <div aria-label="Contact summary" className="min-w-0 space-y-5 lg:border-r lg:border-border/65 lg:pr-8">
              <div className="space-y-4">
                <SectionEyebrow>Contact</SectionEyebrow>
                <h1 className="editorial-headline max-w-full text-[2.25rem] min-[380px]:text-[3rem] sm:max-w-[13ch] sm:text-[3.45rem]">
                  Start the conversation.
                </h1>
                <p className="prose-measure text-base leading-7 text-text-muted sm:text-[1.05rem]">
                  {aboutContact.contact.formDescription}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Email
                </p>
                <a
                  href={`mailto:${aboutContact.contact.email}`}
                  className="mt-2 inline-flex min-h-10 max-w-full items-center whitespace-nowrap text-xl font-semibold text-text-strong transition hover:text-accent"
                >
                  {aboutContact.contact.email}
                </a>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Response time
                </p>
                <p className="text-sm leading-7 text-text-muted">
                  {aboutContact.responseNote}
                </p>
              </div>
            </div>

            <GeneralContactForm
              title={aboutContact.contact.formTitle}
              responseNote={aboutContact.responseNote}
              embedded
            />
          </div>
        </ViewportReveal>
      </div>
    </section>
  );
}
