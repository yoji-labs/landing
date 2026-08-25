"use client";

import { useEffect, useRef, useState } from "react";

function WorkflowBlock({
  title,
  items,
  accent = false,
}: {
  title: string;
  items: readonly string[];
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-[var(--radius-panel)] border px-4 py-4 ${
        accent
          ? "border-accent/30 bg-[linear-gradient(180deg,#FFF8EE_0%,#FCF4E6_100%)]"
          : "border-border/75 bg-surface"
      }`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
        {title}
      </p>
      <div className="mt-3 space-y-2.5">
        {items.map((item) => (
          <div
            key={item}
            className={`rounded-[var(--radius-control)] px-3 py-2.5 text-sm ${
              accent ? "bg-white/75 text-text-strong" : "bg-surface-soft/70 text-text-muted"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorkflowTransformation() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      const frame = window.requestAnimationFrame(() => setIsActive(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="card-surface overflow-hidden px-5 py-6 sm:px-6">
      <div className="flex flex-col gap-3 border-b border-border/65 pb-5 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Workflow shift
          </p>
          <h3 className="max-w-[14ch] text-3xl sm:text-[2.25rem]">
            From disconnected tools to one connected workflow.
          </h3>
        </div>
        <p className="max-w-[38rem] text-sm leading-7 text-text-muted">
          YojiLabs replaces repetitive handoffs, spreadsheets, and disconnected tools with
          software built around the steps your team already follows.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,0.92fr)_minmax(0,0.98fr)_minmax(0,0.92fr)] md:items-start">
        <div
          className={`transition-all duration-[var(--motion-slow)] ease-[var(--ease-enter)] ${
            isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
          }`}
        >
          <WorkflowBlock title="Before" items={["Sheets", "Email", "Updates", "Follow-ups"]} />
        </div>

        <div
          className={`transition-all duration-[var(--motion-slow)] ease-[var(--ease-enter)] ${
            isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <WorkflowBlock
            title="YojiLabs System"
            accent
            items={["Shared data", "Automations", "Clear handoffs"]}
          />
        </div>

        <div
          className={`transition-all duration-[var(--motion-slow)] ease-[var(--ease-enter)] ${
            isActive ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
          }`}
          style={{ transitionDelay: "120ms" }}
        >
          <WorkflowBlock title="After" items={["Inventory", "Bookings", "Reporting", "Insights"]} />
        </div>
      </div>
    </div>
  );
}
