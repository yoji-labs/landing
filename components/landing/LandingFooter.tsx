import Link from "next/link";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { siteContent } from "@/content/site-content";

export function LandingFooter() {
  const { footer } = siteContent;

  return (
    <footer className="border-t border-border/65 bg-[rgba(255,251,245,0.92)]">
      <div className="container-shell py-12 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)_minmax(0,0.7fr)_minmax(0,0.7fr)]">
          <div className="space-y-5">
            <BrandLockup size="md" />
            <p className="max-w-xs text-sm leading-7 text-text-muted">
              {footer.brandSummary}
            </p>
          </div>

          {footer.linkGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <h2 className="text-base font-semibold text-text-strong">
                {group.title}
              </h2>
              <div className="flex flex-col">
                {group.links.map((link) => (
                  <Link
                    key={`${group.title}-${link.label}`}
                    href={link.href}
                    className="inline-flex min-h-10 items-center text-sm text-text-muted transition hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="space-y-4">
            <h2 className="text-base font-semibold text-text-strong">
              {footer.contactLabel}
            </h2>
            <a
              href={`mailto:${footer.email}`}
              className="inline-flex min-h-10 items-center text-sm text-text-muted transition hover:text-accent"
            >
              {footer.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/70 pt-6 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 YojiLabs. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            {footer.legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="inline-flex min-h-10 items-center transition hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
