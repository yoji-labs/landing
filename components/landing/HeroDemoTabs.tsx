"use client";

import { startTransition, useState } from "react";
import { ProductPreview } from "@/components/landing/ProductPreview";
import type { DemoExperience, DemoId } from "@/types/site";

interface HeroDemoTabsProps {
  demos: readonly DemoExperience[];
  defaultDemoId: DemoId;
}

export function HeroDemoTabs({ demos, defaultDemoId }: HeroDemoTabsProps) {
  const [activeDemoId, setActiveDemoId] = useState(defaultDemoId);
  const activeDemo =
    demos.find((demo) => demo.id === activeDemoId) ?? demos[0];

  return (
    <div className="min-w-0 max-w-full space-y-4 lg:space-y-5">
      <div className="min-w-0 max-w-full overflow-x-auto rounded-[calc(var(--radius-panel)+0.15rem)] border border-border/70 bg-[rgba(252,247,238,0.78)] p-3 shadow-[0_30px_70px_rgba(60,35,12,0.1)] backdrop-blur-sm">
        <div className="flex w-max min-w-full flex-nowrap gap-2.5">
          {demos.map((demo) => {
            const isActive = demo.id === activeDemo.id;

            return (
              <button
                key={demo.id}
                type="button"
                className={`group relative shrink-0 overflow-hidden whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "border-accent bg-accent text-white shadow-[0_12px_28px_rgba(211,95,57,0.22)]"
                    : "border-border/80 bg-surface/95 text-text-muted hover:border-accent/35 hover:text-accent"
                }`}
                onClick={() =>
                  startTransition(() => {
                    setActiveDemoId(demo.id);
                  })
                }
              >
                <span className="relative z-10">{demo.heroTabLabel}</span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-4 bottom-1 h-px origin-left transition-transform duration-[var(--motion-standard)] ease-[var(--ease-enter)] ${
                    isActive
                      ? "scale-x-100 bg-white/80"
                      : "scale-x-0 bg-accent/45 group-hover:scale-x-100"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div
        key={activeDemo.id}
        className="preview-enter card-surface space-y-3.5 px-5 py-5 sm:px-6 sm:py-6"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/18 bg-[#FFF3E6] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent shadow-[0_8px_18px_rgba(211,95,57,0.08)]">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
          Interactive preview
        </span>

        <ProductPreview demo={activeDemo} embedded />

        <p
          data-testid="hero-demo-caption"
          className="max-w-[37rem] text-[0.98rem] leading-6 text-text-muted"
        >
          {activeDemo.heroCaption}
        </p>
      </div>
    </div>
  );
}
