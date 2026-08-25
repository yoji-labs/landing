import type { DemoTier } from "@/types/site";

const tierClassName: Record<DemoTier, string> = {
  "interactive-preview": "border-[#BFE0C9] bg-[#E9F6ED] text-[#226B3F]",
  concept: "border-[#E5D6B8] bg-[#F7EFDD] text-[#7A5B1F]",
  live: "border-accent/40 bg-[#FDEDE6] text-accent",
};

interface DemoTierBadgeProps {
  tier: DemoTier;
  label: string;
}

export function DemoTierBadge({ tier, label }: DemoTierBadgeProps) {
  return (
    <span
      data-tier={tier}
      className={`max-w-full rounded-full border px-3 py-1 text-center text-xs font-medium leading-tight ${tierClassName[tier]}`}
    >
      {label}
    </span>
  );
}
