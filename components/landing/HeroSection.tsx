import Link from "next/link";
import { SystemBackdrop } from "@/components/brand/SystemBackdrop";
import { HeroDemoTabs } from "@/components/landing/HeroDemoTabs";
import { HeroScrollCue } from "@/components/landing/HeroScrollCue";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { demoContent } from "@/content/demo-content";
import { siteContent } from "@/content/site-content";

export function HeroSection() {
  const { hero } = siteContent.home;
  const demos = hero.demoOrder
    .map((demoId) => demoContent.find((demo) => demo.id === demoId))
    .filter((demo) => demo !== undefined);

  if (demos.length === 0) {
    return null;
  }

  return (
    <section
      id="home"
      className="page-section hero-shell relative grid scroll-mt-28 gap-10 pb-16 pt-8 md:gap-12 md:pb-20 lg:gap-14 lg:pt-10 xl:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] xl:items-start xl:gap-20 xl:pb-24"
    >
      <div
        data-testid="hero-background-composition"
        className="pointer-events-none absolute inset-y-0 z-0 overflow-hidden"
        style={{ left: "calc(50% - 50vw)", right: "calc(50% - 50vw)" }}
      >
        <SystemBackdrop className="absolute -left-[4.5rem] top-0 hidden w-[14rem] text-accent/[0.08] lg:block" />
        <div
          data-testid="hero-bottom-left-crop"
          className="absolute -left-[13rem] bottom-[-10.5rem] hidden h-[20rem] w-[38rem] lg:block"
        >
          <div className="absolute inset-0 rounded-[60%_40%_68%_32%/46%_54%_46%_54%] bg-[linear-gradient(180deg,rgba(248,211,178,0.38),rgba(238,153,105,0.2))] blur-[4px]" />
          <div className="absolute right-[4rem] top-[1.5rem] h-[11rem] w-[18rem] rounded-[54%_46%_44%_56%/52%_48%_52%_48%] bg-[rgba(255,243,226,0.28)] blur-[8px]" />
        </div>
        <div
          data-testid="hero-ambient-field"
          className="absolute left-[18%] top-[1.25rem] hidden h-[40rem] w-[82rem] lg:block"
        >
          <div className="absolute left-[3%] top-[1.5rem] h-[16rem] w-[34rem] rounded-[52%_48%_44%_56%/54%_46%_54%_46%] bg-[linear-gradient(180deg,rgba(253,244,230,0.7),rgba(248,231,203,0.18))] blur-[5px]" />
          <div className="absolute inset-x-[8%] top-[4rem] h-[28rem] rounded-[58%_42%_52%_48%/44%_56%_46%_56%] bg-[linear-gradient(180deg,rgba(255,249,239,0.84),rgba(247,230,202,0.22))] blur-[3px]" />
          <div className="absolute left-[14%] top-[9rem] h-[18rem] w-[30rem] rounded-[44%_56%_40%_60%/60%_40%_60%_40%] bg-[linear-gradient(180deg,rgba(249,226,194,0.28),rgba(255,247,235,0.08))] blur-[8px]" />
          <div className="absolute right-[10%] top-[5rem] h-[21rem] w-[30rem] rounded-[54%_46%_48%_52%/46%_54%_44%_56%] bg-[linear-gradient(180deg,rgba(248,222,192,0.34),rgba(255,248,237,0.08))] blur-[6px]" />
          <div className="absolute right-[2%] top-[4.5rem] h-[20rem] w-[26rem] rounded-[66%_34%_52%_48%/42%_58%_40%_60%] bg-[linear-gradient(180deg,rgba(250,232,206,0.38),rgba(255,247,235,0.08))] blur-[4px]" />
          <div className="soft-dot-grid absolute right-[18%] top-[7rem] h-28 w-20 opacity-[0.1]" />
          <div className="soft-dot-grid absolute left-[42%] top-[2.75rem] h-20 w-16 opacity-[0.06]" />
        </div>
        <div
          data-testid="hero-terra-edge"
          className="absolute right-[-6.25rem] top-[6rem] hidden h-[22rem] w-[9rem] lg:block"
        >
          <div className="absolute inset-0 rounded-[76%_24%_40%_60%/42%_58%_34%_66%] bg-[linear-gradient(180deg,rgba(241,171,121,0.3),rgba(216,108,67,0.42))] blur-[2px]" />
          <div className="absolute left-[-5rem] top-[4rem] h-[11rem] w-[6.5rem] rounded-[62%_38%_48%_52%/54%_46%_54%_46%] bg-[rgba(255,244,228,0.2)] blur-[7px]" />
        </div>
        <div className="absolute left-[36%] top-[9.5rem] hidden h-[18rem] w-[18rem] rounded-[58%_42%_47%_53%/51%_44%_56%_49%] bg-[rgba(252,233,205,0.12)] blur-[6px] lg:block" />
        <div className="soft-dot-grid absolute right-[34%] top-[13.5rem] hidden h-16 w-14 opacity-[0.07] xl:block" />
      </div>

      <div className="relative z-10 space-y-8 pt-4 md:max-w-[40rem] lg:max-w-[43rem] lg:pt-8 xl:sticky xl:top-24 xl:max-w-[41rem] xl:pr-12 xl:pt-12 2xl:-ml-4 2xl:pr-14">
        <div className="hero-reveal [--hero-delay:40ms] space-y-5 sm:space-y-6">
          <SectionEyebrow>{hero.eyebrow}</SectionEyebrow>
          <h1 className="editorial-headline max-w-[13.5ch] text-[3.28rem] tracking-[-0.018em] sm:max-w-[13ch] sm:text-[4.02rem] md:max-w-[12.8ch] md:text-[4.45rem] lg:max-w-[13ch] lg:text-[4.85rem] xl:max-w-[13.4ch] xl:text-[5.35rem]">
            <span className="block whitespace-nowrap leading-[0.98]">Software</span>
            <span className="block whitespace-nowrap leading-[0.98]">built around</span>
            <span className="block whitespace-nowrap text-[0.977em] leading-[1.02]">your business.</span>
          </h1>
          <p className="prose-measure max-w-[30rem] pt-1 text-lg leading-8 text-text-muted sm:text-[1.14rem]">
            {hero.body}
          </p>
        </div>

        <div className="hero-reveal [--hero-delay:180ms] flex flex-wrap items-center gap-4">
          <Link
            href={hero.primaryCta.href}
            className="inline-flex items-center justify-center rounded-[var(--radius-card)] bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(211,95,57,0.24)] transition hover:bg-accent/90"
          >
            {hero.primaryCta.label}
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="inline-flex items-center justify-center rounded-[var(--radius-card)] border border-border/90 bg-surface px-6 py-3.5 text-sm font-semibold text-foreground shadow-[0_10px_24px_rgba(39,29,22,0.06)] transition hover:border-accent/35 hover:text-accent"
          >
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>

      <div className="hero-reveal relative z-10 min-w-0 max-w-[72rem] xl:justify-self-end xl:pl-6 [--hero-delay:240ms]">
        <HeroDemoTabs demos={demos} defaultDemoId={hero.demoOrder[0]} />
      </div>

      <HeroScrollCue />
    </section>
  );
}
