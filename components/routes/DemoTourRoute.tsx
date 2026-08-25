import Link from "next/link";
import { DemoTierBadge } from "@/components/landing/DemoTierBadge";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { siteContent } from "@/content/site-content";
import { siteConfig } from "@/lib/site-config";
import type { DemoExperience } from "@/types/site";

interface DemoTourRouteProps {
  demo: DemoExperience;
  tourUrl: string | null;
}

const ctaClassName =
  "inline-flex items-center justify-center rounded-[var(--radius-card)] bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90";

export function DemoTourRoute({ demo, tourUrl }: DemoTourRouteProps) {
  return (
    <section className="container-shell py-14 lg:py-18">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <SectionEyebrow>{demo.category}</SectionEyebrow>
            <DemoTierBadge
              tier={demo.destination.tier}
              label={`${demo.destination.availabilityLabel} · sample data`}
            />
          </div>
          <h1 className="max-w-full text-[2.5rem] sm:max-w-[14ch] sm:text-6xl">
            {demo.title}, as the kitchen sees it.
          </h1>
          <p className="prose-measure text-lg leading-8 text-text-muted">
            {demo.routeCard.summary}
          </p>
        </div>

        {tourUrl ? (
          <div
            data-testid="demo-tour-embed"
            className="min-w-0 max-w-full overflow-hidden rounded-[var(--radius-panel)] border border-border bg-surface shadow-[0_18px_48px_rgba(43,37,32,0.08)]"
          >
            <iframe
              src={tourUrl}
              title={`${demo.title} guided walkthrough`}
              loading="lazy"
              allowFullScreen
              allow="clipboard-write; fullscreen"
              className="block aspect-[16/10] w-full max-w-full border-0"
            />
          </div>
        ) : (
          <div className="space-y-4" data-testid="demo-tour-fallback">
            <ProductPreview demo={demo} />
            <div className="rounded-[var(--radius-card)] border border-[#D8C08F] bg-surface-soft px-5 py-4">
              <p className="text-sm font-semibold text-text-strong">Guided walkthrough coming</p>
              <p className="mt-1 text-sm leading-7 text-text-muted">
                Until then, the preview above mirrors the live dashboard. Book a call to see the
                real thing on your own numbers.
              </p>
            </div>
          </div>
        )}

        <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="card-surface min-w-0 px-6 py-7 sm:px-7">
            <p className="text-sm font-semibold text-text-strong">What you&apos;ll see</p>
            <div className="mt-4 space-y-3">
              {demo.routeCard.highlights.map((highlight) => (
                <p
                  key={highlight}
                  className="break-words rounded-[var(--radius-control)] border border-border/70 bg-surface-soft px-4 py-3 text-sm leading-7 text-text-muted"
                >
                  {highlight}
                </p>
              ))}
            </div>
          </div>

          <div className="card-surface flex min-w-0 flex-col justify-between gap-6 px-6 py-7 sm:px-7">
            <div>
              <p className="text-sm font-semibold text-text-strong">See it on your numbers</p>
              <p className="mt-2 text-sm leading-7 text-text-muted">
                A 30-minute walkthrough with your menu, suppliers, and par levels.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link href={siteContent.routeMap.startProjectBook} className={ctaClassName}>
                Book a walkthrough
              </Link>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="inline-flex min-h-10 max-w-full items-center break-words text-sm font-semibold text-text-muted transition hover:text-accent"
              >
                or {siteConfig.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
