import { LeafAccent } from "@/components/brand/LeafAccent";
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
      <div className="pointer-events-none absolute left-[-1.75rem] top-8 hidden h-[23rem] w-[11rem] lg:block">
        <div className="motif-field motif-field--soft motif-field--blur-md absolute inset-x-0 bottom-10 h-48 w-36 opacity-[0.88]" />
        <LeafAccent className="absolute left-0 top-0 w-[9rem] text-accent/42" />
        <LeafAccent className="absolute left-8 top-[7.5rem] w-[6rem] text-accent/26" mirrored />
      </div>
      <SystemBackdrop className="motif-tech absolute right-[-4rem] top-20 hidden w-[16rem] xl:block" mirrored />
      <div className="motif-field motif-field--warm motif-field--blur-sm absolute right-[-4rem] bottom-[-3rem] hidden h-32 w-44 opacity-[0.28] xl:block" />
      <div className="container-shell py-12 lg:py-[4.25rem]">
        <ViewportReveal
          className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start"
          variant="rise"
        >
          <div className="min-w-0 space-y-5 lg:pl-10">
            <SectionEyebrow>{aboutContact.eyebrow}</SectionEyebrow>
            <h2 className="editorial-headline max-w-[13ch] text-[2.9rem] sm:text-[3.65rem] lg:text-[3rem] xl:text-[3.35rem] 2xl:text-[3.65rem]">
              {aboutContact.title}
            </h2>
            <p className="prose-measure text-base leading-7 text-text-muted sm:text-[1.05rem]">
              {aboutContact.description}
            </p>
          </div>

          <ProcessSteps steps={aboutContact.process} />
        </ViewportReveal>
      </div>
    </section>
  );
}
