import Link from "next/link";
import { ViewportReveal } from "@/components/landing/ViewportReveal";
import { siteContent } from "@/content/site-content";
import { siteConfig } from "@/lib/site-config";

export function FinalCTA() {
  const { finalCta } = siteContent.home;

  return (
    <section className="section-band section-band--neutral border-t border-border/60">
      <div className="container-shell py-10 lg:py-12">
        <ViewportReveal variant="fade">
          <div className="card-surface relative overflow-hidden bg-[linear-gradient(180deg,rgba(255,252,246,0.99),rgba(246,235,216,0.96))] px-6 py-7 sm:px-8">
            <div className="motif-field motif-field--soft motif-field--blur-lg absolute -left-16 bottom-[-4rem] h-52 w-64 opacity-[0.92]" />
            <div className="motif-field motif-field--warm absolute left-[3rem] bottom-[-3.5rem] h-40 w-32 opacity-[0.6]" />
            <div className="motif-field motif-field--soft motif-field--blur-md absolute right-[-8rem] top-[-4rem] h-56 w-80 opacity-[0.82]" />
            <div className="motif-field motif-field--cta absolute right-[-2rem] top-[2.5rem] h-44 w-44 opacity-[0.52]" />
            <div className="soft-dot-grid absolute bottom-8 right-8 hidden h-20 w-16 opacity-[0.16] lg:block" />
            <div className="soft-dot-grid absolute left-[10rem] top-7 hidden h-10 w-10 opacity-[0.14] lg:block" />

            <div className="relative z-10 flex flex-col gap-8 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)_auto] lg:items-center">
              <div className="relative flex min-h-[8.5rem] w-full max-w-[11rem] items-center overflow-hidden rounded-[1.75rem] border border-border/50 bg-[linear-gradient(180deg,rgba(255,250,242,0.72),rgba(252,244,232,0.48))] px-5 py-4 shadow-[0_14px_30px_rgba(39,29,22,0.04)]">
                <div className="motif-field motif-field--cta absolute -left-8 bottom-[-2rem] h-34 w-24 opacity-[0.92]" />
                <div className="motif-field motif-field--soft absolute left-12 top-[-0.5rem] h-24 w-16 opacity-[0.86]" />
                <div className="motif-field motif-field--soft motif-field--blur-sm absolute right-2 top-6 h-14 w-14 opacity-[0.45]" />
                <div className="soft-dot-grid absolute bottom-3 left-14 h-10 w-10 opacity-[0.12]" />
                <div className="relative z-10 drop-shadow-[0_6px_16px_rgba(211,95,57,0.08)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={siteConfig.brand.symbol}
                    alt=""
                    width={64}
                    height={63}
                  />
                </div>
              </div>

              <div className="relative flex items-start gap-6">
                <div className="hidden h-20 w-px bg-border/70 lg:block" />
                <div className="space-y-2.5">
                  <h2 className="editorial-headline max-w-[13ch] text-[2.8rem] sm:text-[3.65rem]">{finalCta.title}</h2>
                  <p className="max-w-2xl text-base leading-7 text-text-muted">
                    {finalCta.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 lg:items-end">
                <Link
                  href={finalCta.primaryCta.href}
                  className="inline-flex items-center justify-center rounded-[var(--radius-card)] bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(211,95,57,0.22)] transition hover:bg-accent/90"
                >
                  {finalCta.primaryCta.label}
                </Link>
                {finalCta.secondaryCta ? (
                  <Link
                    href={finalCta.secondaryCta.href}
                    className="inline-flex items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent/35 hover:text-accent"
                  >
                    {finalCta.secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </ViewportReveal>
      </div>
    </section>
  );
}
