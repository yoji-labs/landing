"use client";

import { useEffect, useMemo, useState } from "react";

interface RailSection {
  id: string;
  step: string;
  label: string;
}

const sections: readonly RailSection[] = [
  { id: "home", step: "01", label: "Home" },
  { id: "services", step: "02", label: "Systems" },
  { id: "demos", step: "03", label: "Demos" },
  { id: "about", step: "04", label: "About" },
];

export function SectionProgressRail() {
  const [activeId, setActiveId] = useState(sections[0].id);

  const activeIndex = useMemo(
    () => sections.findIndex((section) => section.id === activeId),
    [activeId],
  );

  useEffect(() => {
    const resolveActiveSection = () => {
      const activationLine = window.innerHeight * 0.38;
      let nextActiveId = sections[0].id;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) {
          continue;
        }

        if (element.getBoundingClientRect().top <= activationLine) {
          nextActiveId = section.id;
        } else {
          break;
        }
      }

      setActiveId((currentActiveId) =>
        currentActiveId === nextActiveId ? currentActiveId : nextActiveId,
      );
    };

    let frame = 0;
    const scheduleResolve = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        resolveActiveSection();
      });
    };

    resolveActiveSection();
    window.addEventListener("scroll", scheduleResolve, { passive: true });
    window.addEventListener("resize", scheduleResolve);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", scheduleResolve);
      window.removeEventListener("resize", scheduleResolve);
    };
  }, []);

  const progressHeight =
    activeIndex <= 0 ? "0%" : `${(activeIndex / Math.max(1, sections.length - 1)) * 100}%`;

  return (
    <nav
      aria-label="Homepage sections"
      className="pointer-events-none fixed -left-1 top-1/2 z-30 hidden -translate-y-1/2 xl:block 2xl:left-0"
    >
      <div className="pointer-events-auto relative w-[7.5rem] pl-4">
        <span className="absolute left-[1.05rem] top-6 h-[calc(100%-3rem)] w-px bg-border/60" />
        <span
          className="absolute left-[1.05rem] top-6 w-px rounded-full bg-accent/80 transition-[height] duration-[var(--motion-standard)] ease-[var(--ease-enter)]"
          style={{ height: progressHeight }}
        />

        <div className="flex flex-col gap-2.5">
          {sections.map((section) => {
            const isActive = activeId === section.id;

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`group relative flex min-h-10 items-center gap-2 rounded-full px-2.5 py-2 text-left transition-all duration-[var(--motion-standard)] ease-[var(--ease-enter)] focus-visible:outline-offset-2 ${
                  isActive
                    ? "bg-[rgba(252,247,238,0.96)] text-text-strong shadow-[0_12px_32px_rgba(48,24,10,0.08)]"
                    : "text-text-muted hover:bg-[rgba(252,247,238,0.82)] hover:text-text-strong focus-visible:bg-[rgba(252,247,238,0.82)] focus-visible:text-text-strong"
                }`}
              >
                <span
                  className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-[var(--motion-standard)] ease-[var(--ease-enter)] ${
                    isActive
                      ? "border-accent bg-accent shadow-[0_0_0_4px_rgba(211,95,57,0.12)]"
                      : "border-border bg-background group-hover:border-accent/55 group-focus-visible:border-accent/55"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-[var(--motion-standard)] ${
                      isActive ? "bg-white" : "bg-border group-hover:bg-accent/70 group-focus-visible:bg-accent/70"
                    }`}
                  />
                </span>

                <span className="flex items-center gap-2.5">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-[var(--motion-standard)] ${
                      isActive ? "text-accent" : "text-text-muted group-hover:text-accent group-focus-visible:text-accent"
                    }`}
                  >
                    {section.step}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.12em]">
                    {section.label}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
