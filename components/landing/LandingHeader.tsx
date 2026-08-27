"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { siteContent } from "@/content/site-content";
import { MobileNav } from "@/components/landing/MobileNav";

export function LandingHeader() {
  const { header } = siteContent.navigation;
  const { primaryCta } = siteContent.navigation;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 16);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-[background-color,border-color] duration-[var(--motion-standard)] ease-[var(--ease-standard)] ${
        isScrolled
          ? "border-border/70 bg-background/96"
          : "border-transparent bg-background/72"
      }`}
    >
      <div className="hero-shell flex items-center justify-between py-4 xl:py-5">
        <Link
          href="/"
          className="inline-flex min-h-10 items-center rounded-[var(--radius-control)] px-1.5 py-1 transition hover:opacity-90 focus-visible:outline-offset-4"
        >
          <BrandLockup size="lg" priority />
        </Link>

        <nav className="hidden items-center gap-8 xl:flex">
          {header.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="inline-flex min-h-10 items-center text-[0.96rem] font-medium text-foreground transition hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:block">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center rounded-[var(--radius-card)] bg-accent px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(211,95,57,0.18)] transition hover:bg-accent/90"
          >
            {primaryCta.label}
          </Link>
        </div>

        <div className="xl:hidden">
          <MobileNav items={header} primaryCta={primaryCta} />
        </div>
      </div>
    </header>
  );
}
