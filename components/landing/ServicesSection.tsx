import { SystemBackdrop } from "@/components/brand/SystemBackdrop";
import { SystemLineAccent } from "@/components/brand/SystemLineAccent";
import { ServiceCard } from "@/components/landing/ServiceCard";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { ViewportReveal } from "@/components/landing/ViewportReveal";
import { siteContent } from "@/content/site-content";

export function ServicesSection() {
  const { services } = siteContent.home;

  return (
    <section
      id="services"
      className="page-section section-band section-band--warm scroll-mt-28 border-y border-border/55"
    >
      <div className="container-shell relative py-16 lg:py-[5.2rem]">
        <SystemBackdrop className="absolute -left-[7.25rem] top-10 hidden w-[20rem] text-[#3b2f27]/[0.78] lg:block" />
        <div className="motif-field motif-field--soft motif-field--blur-md absolute -right-16 bottom-[-4rem] hidden h-56 w-72 lg:block" />
        <div className="soft-dot-grid absolute right-10 top-12 hidden h-28 w-24 opacity-[0.17] lg:block" />
        <SystemBackdrop className="motif-tech absolute -right-[3.25rem] bottom-10 hidden w-[8.5rem] opacity-[0.18] xl:block" mirrored />
        <ViewportReveal className="space-y-10" variant="rise">
          <div className="space-y-4 text-center">
            <SectionEyebrow>{services.eyebrow}</SectionEyebrow>
            <h2 className="editorial-headline mx-auto max-w-[16.5ch] text-[3rem] sm:text-[3.7rem]">
              {services.title}
            </h2>
            <p className="prose-measure mx-auto text-base leading-7 text-text-muted sm:text-[1.05rem]">
              {services.intro}
            </p>
            <SystemLineAccent className="mx-auto mt-1 hidden w-[5.4rem] text-accent/55 sm:block" />
          </div>

          <div className="relative">
            <div className="motif-field motif-field--warm motif-field--blur-lg absolute inset-x-[6%] top-[12%] hidden h-[72%] opacity-[0.3] lg:block" />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {services.cards.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </ViewportReveal>
      </div>
    </section>
  );
}
