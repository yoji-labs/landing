"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { HeaderNavItem, LinkDefinition } from "@/types/site";

interface MobileNavProps {
  items: readonly HeaderNavItem[];
  primaryCta: LinkDefinition;
}

export function MobileNav({ items, primaryCta }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-control)] border border-border bg-surface text-foreground transition hover:border-accent/50 hover:text-accent"
        onClick={() => setIsOpen((value) => !value)}
      >
        <span className="sr-only">{isOpen ? "Close navigation" : "Open navigation"}</span>
        <span className="flex w-5 flex-col gap-1.5">
          <span
            className={`h-0.5 w-full rounded-full bg-current transition ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-full rounded-full bg-current transition ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-full rounded-full bg-current transition ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {isOpen
        ? createPortal(
            <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-[#271D16]/18 p-4 backdrop-blur-sm lg:hidden">
              <div
                id="mobile-nav-panel"
                className="mx-auto max-h-[calc(100dvh-2rem)] max-w-[40rem] overflow-y-auto rounded-[var(--radius-panel)] border border-border bg-surface px-5 py-5 shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-center justify-between border-b border-border/70 pb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-muted">
                    Navigation
                  </p>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] border border-border text-foreground transition hover:border-accent/50 hover:text-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close navigation</span>
                    <span aria-hidden="true" className="text-xl leading-none">
                      ×
                    </span>
                  </button>
                </div>

                <nav className="mt-5 flex flex-col gap-2">
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="rounded-[var(--radius-card)] px-4 py-3 text-base font-medium text-foreground transition hover:bg-surface-soft hover:text-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-5 border-t border-border/70 pt-5">
                  <Link
                    href={primaryCta.href}
                    className="inline-flex w-full items-center justify-center rounded-[var(--radius-card)] bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
                    onClick={() => setIsOpen(false)}
                  >
                    {primaryCta.label}
                  </Link>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
