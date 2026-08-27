import { SystemBackdrop } from "@/components/brand/SystemBackdrop";
import { ProcessSteps } from "@/components/landing/ProcessSteps";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { ViewportReveal } from "@/components/landing/ViewportReveal";
import { siteContent } from "@/content/site-content";

export function AboutContactSection() {
  const { aboutContact } = siteContent.home;

  return (
    <section
      id="about"
      className="page-section section-band section-band--warm relative scroll-mt-28 border-t border-border/60"
    >
      <div className="pointer-events-none absolute left-[-2.5rem] top-10 hidden h-[22rem] w-[14rem] lg:block">
        <div className="motif-field motif-field--soft motif-field--blur-md absolute left-0 top-4 h-40 w-36 opacity-[0.84]" />
        <SystemBackdrop className="absolute left-0 top-0 w-[11rem] text-accent/24" />
      </div>
      <SystemBackdrop className="motif-tech absolute right-[-4rem] top-20 hidden w-[16rem] xl:block" mirrored />
      <div className="motif-field motif-field--warm motif-field--blur-sm absolute right-[-4rem] bottom-[-3rem] hidden h-32 w-44 opacity-[0.28] xl:block" />
      <div className="container-shell py-12 lg:py-[4.5rem]">
        <ViewportReveal
          className="grid gap-10 lg:gap-12 xl:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] xl:items-start"
          variant="rise"
        >
          <div className="min-w-0 space-y-4 lg:max-w-[33rem] lg:pl-16 xl:pl-20">
            <SectionEyebrow>{aboutContact.eyebrow}</SectionEyebrow>
            <h2 className="editorial-headline max-w-[13ch] text-[3rem] sm:text-[3.65rem]">{aboutContact.title}</h2>
            {aboutContact.description ? (
              <p className="prose-measure max-w-[24rem] text-[0.98rem] leading-7 text-text-muted sm:text-[1rem]">
                {aboutContact.description}
              </p>
            ) : null}
          </div>

          <div className="pt-4 md:pt-6 lg:pt-8 xl:pt-20">
            <ProcessSteps steps={aboutContact.process} />
          </div>
        </ViewportReveal>
      </div>
    </section>
  );
}
