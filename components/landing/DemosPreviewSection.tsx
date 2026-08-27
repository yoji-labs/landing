import Link from "next/link";
import { SystemLineAccent } from "@/components/brand/SystemLineAccent";
import { DemoTierBadge } from "@/components/landing/DemoTierBadge";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { ViewportReveal } from "@/components/landing/ViewportReveal";
import { demoContent } from "@/content/demo-content";
import { siteContent } from "@/content/site-content";
import type { DemoExperience } from "@/types/site";

function resolveDemoLink(demo: DemoExperience) {
  return demo.destination.link?.href ?? null;
}

const previewFrameClassName =
  "mx-auto min-h-44 w-full max-w-[22rem] overflow-hidden rounded-[var(--radius-card)] border border-border/75 bg-[#FFF8EE] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] lg:p-3 xl:p-4";

const previewHeaderClassName =
  "flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3";

const previewEyebrowClassName =
  "text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted";

const previewValueClassName =
  "rounded-full border border-border/70 bg-[rgba(255,252,246,0.96)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent";

function WorkPreviewGraphic({ demo }: { demo: DemoExperience }) {
  if (demo.id === "kitchen-inventory") {
    return (
      <div
        aria-label="Inventory work preview graphic"
        className={previewFrameClassName}
      >
        <div className={previewHeaderClassName}>
          <p className={previewEyebrowClassName}>Low Stock</p>
          <span className={previewValueClassName}>4 items</span>
        </div>

        <div className="mt-2.5 space-y-1.5">
          {[
            { label: "Wagyu Beef", value: "LOW", accent: true },
            { label: "Truffle Oil", value: "LOW", accent: true },
          ].map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-[0.95rem] border border-border/55 bg-[rgba(255,252,246,0.92)] px-2.5 py-2"
            >
              <p className="text-[13px] font-medium text-text-strong">{item.label}</p>
              <span
                className={`rounded-full px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] ${
                  item.accent
                    ? "bg-[#FFF1E4] text-accent"
                    : "bg-surface-soft text-text-strong"
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}

          <div className="flex items-center justify-between border-t border-border/55 px-1 pt-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
              Rice
            </p>
            <span className="rounded-full bg-surface-soft px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-text-strong">
              GOOD
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (demo.id === "bookings-website") {
    return (
      <div
        aria-label="Scheduling work preview graphic"
        className={previewFrameClassName}
      >
        <div className={previewHeaderClassName}>
          <p className={previewEyebrowClassName}>This Week</p>
          <span className={previewValueClassName}>12 booked</span>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2 text-center">
          {["Mon", "Tue", "Wed", "Thu"].map((day, index) => (
            <div key={day} className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                {day}
              </p>
              <div className="grid h-20 grid-rows-3 gap-1 rounded-[0.95rem] border border-border/55 bg-[rgba(255,252,246,0.92)] px-2 py-2">
                {[0, 1, 2].map((slot) => {
                  const active = (index === 0 && slot === 1) || (index === 1 && slot <= 1) || (index === 2 && slot === 2);
                  const hold = index === 3 && slot === 1;

                  return (
                    <span
                      key={`${day}-${slot}`}
                      className={`mx-auto block w-full max-w-12 rounded-full ${
                        active
                          ? "bg-[linear-gradient(135deg,#FCE3B0_0%,#F5B17D_100%)]"
                          : hold
                            ? "border border-dashed border-border/80 bg-transparent"
                            : "bg-surface-soft/85"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      aria-label="Dashboard work preview graphic"
      className={previewFrameClassName}
    >
      <div className={previewHeaderClassName}>
        <p className={previewEyebrowClassName}>Weekly KPIs</p>
        <span className={previewValueClassName}>Live</span>
      </div>

      <div className="mt-3 grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-2">
        <div className="rounded-[0.95rem] border border-border/55 bg-[rgba(255,252,246,0.94)] px-3 py-3">
          <div className="flex h-14 items-end justify-center gap-2">
            {[32, 50, 42, 64, 58].map((height, index) => (
              <span
                key={height}
                className={`block min-w-0 max-w-3 flex-1 rounded-full ${
                  index >= 3 ? "bg-accent" : "bg-surface-soft"
                }`}
                style={{ height: `${Math.max(18, Math.round(height * 0.72))}px` }}
              />
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          {["Revenue", "Workflow", "Service"].map((label, index) => (
            <div
              key={label}
              className={`rounded-[0.9rem] border border-border/55 px-2.5 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.095em] ${
                index === 0
                  ? "bg-[#FFF1E4] text-accent"
                  : "bg-[rgba(255,252,246,0.92)] text-text-muted"
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DemosPreviewSection() {
  const { demosPreview } = siteContent.home;
  const demos = demosPreview.demoOrder
    .map((demoId) => demoContent.find((demo) => demo.id === demoId))
    .filter((demo) => demo !== undefined);

  return (
    <section
      id="demos"
      className="page-section section-band section-band--neutral scroll-mt-28 border-t border-border/60"
    >
      <div className="container-shell relative py-14 lg:py-[4.4rem]">
        <div className="motif-field motif-field--soft absolute right-[-3.5rem] top-10 hidden h-40 w-32 lg:block" />
        <div className="motif-field motif-field--warm motif-field--blur-sm absolute -left-14 bottom-6 hidden h-24 w-36 opacity-[0.42] lg:block" />
        <ViewportReveal
          className="grid gap-8 lg:gap-10 xl:grid-cols-[minmax(0,0.64fr)_minmax(0,1.36fr)] xl:items-start"
          variant="soft"
        >
          <div className="space-y-4">
            <SectionEyebrow>{demosPreview.eyebrow}</SectionEyebrow>
            <h2 className="editorial-headline max-w-[10.5ch] text-[3rem] sm:text-[3.7rem]">{demosPreview.title}</h2>
            <p className="max-w-[28rem] text-base leading-7 text-text-muted sm:text-[1.05rem]">
              {demosPreview.intro}
            </p>
            <SystemLineAccent className="hidden w-[4.8rem] text-accent/45 sm:block" />

            <div>
              <Link
                href={demosPreview.cta.href}
                className="inline-flex items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-accent/35 hover:text-accent"
              >
                {demosPreview.cta.label}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {demos.map((demo) => {
              const demoLink = resolveDemoLink(demo);

              return (
                <article
                  key={demo.id}
                  className="card-surface group flex h-full flex-col px-5 py-6 transition duration-[var(--motion-standard)] ease-[var(--ease-enter)] hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[var(--shadow-soft)] sm:px-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="max-w-full text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                      {demo.category}
                    </p>
                    <DemoTierBadge
                      tier={demo.destination.tier}
                      label={demo.destination.availabilityLabel}
                    />
                  </div>

                  <div className="mt-5">
                    <WorkPreviewGraphic demo={demo} />
                  </div>

                  <div className="mt-5 space-y-3">
                    <h3 className="font-sans text-[1.28rem] font-semibold leading-[1.1] tracking-[-0.025em] text-text-strong">
                      {demo.previewCard.title}
                    </h3>
                    <p className="text-[0.98rem] leading-7 text-text-muted">
                      {demo.previewCard.useCase}
                    </p>
                  </div>

                  <div className="mt-5 rounded-[var(--radius-card)] border border-border/80 bg-surface-soft px-4 py-4">
                    <p className="text-sm font-semibold text-text-strong">Outcome</p>
                    <p className="mt-2 text-sm leading-7 text-text-muted">
                      {demo.previewCard.outcome}
                    </p>
                  </div>

                  <div className="mt-auto pt-5">
                    {demoLink ? (
                      <Link
                        href={demoLink}
                        className="inline-flex w-full items-center justify-between rounded-[var(--radius-card)] border border-border/80 bg-[rgba(255,252,246,0.92)] px-4 py-3 text-sm font-semibold text-text-strong transition hover:border-accent/35 hover:text-accent group-hover:border-accent/30"
                      >
                        <span>Explore this direction</span>
                        <span aria-hidden="true" className="text-base transition group-hover:translate-x-0.5">
                          →
                        </span>
                      </Link>
                    ) : (
                      <div className="flex items-center justify-between rounded-[var(--radius-card)] border border-border/70 bg-surface-soft/65 px-4 py-3">
                        <p className="text-sm font-semibold text-text-muted">
                          Preview system direction
                        </p>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                          Coming next
                        </span>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </ViewportReveal>
      </div>
    </section>
  );
}
