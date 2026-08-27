import type { ReactNode } from "react";

import type { DemoChartPoint, DemoExperience } from "@/types/site";

interface ProductPreviewProps {
  demo: DemoExperience;
  embedded?: boolean;
}

interface PreviewVariantProps {
  demo: DemoExperience;
  embedded?: boolean;
}

const schedulingPlannerColumns = [
  {
    day: "Mon",
    items: [{ title: "Intake", detail: "3:00 PM", accent: true }],
  },
  {
    day: "Tue",
    items: [
      { title: "Discovery", detail: "9:00 AM", accent: true },
      { title: "Consult", detail: "Hold", accent: false },
    ],
  },
  {
    day: "Wed",
    items: [{ title: "Prep", detail: "Open", accent: false }],
  },
  {
    day: "Thu",
    items: [{ title: "Review", detail: "1:00 PM", accent: true }],
  },
  {
    day: "Fri",
    items: [
      { title: "Website", detail: "11:00 AM", accent: true },
      { title: "Handoff", detail: "2:30 PM", accent: false },
    ],
  },
] as const;

const productSidebarItems = [
  "Overview",
  "Orders",
  "Reservations",
  "Inventory",
  "Purchases",
  "Reports",
  "Team",
  "Settings",
] as const;

function ProductNavIcon({ label, active = false }: { label: string; active?: boolean }) {
  const iconClassName = active ? "text-accent" : "text-text-muted";

  if (label === "Overview") {
    return (
      <svg viewBox="0 0 20 20" className={`h-4 w-4 ${iconClassName}`} fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="10" cy="10" r="5.5" />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (label === "Orders") {
    return (
      <svg viewBox="0 0 20 20" className={`h-4 w-4 ${iconClassName}`} fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M5 6.5h10M6.5 4h7l1 12h-9L6.5 4Z" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label === "Reservations") {
    return (
      <svg viewBox="0 0 20 20" className={`h-4 w-4 ${iconClassName}`} fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="4.5" y="5.5" width="11" height="10" rx="2" />
        <path d="M6.5 3.8v3.1M13.5 3.8v3.1M4.5 9.1h11" strokeLinecap="round" />
      </svg>
    );
  }

  if (label === "Inventory") {
    return (
      <svg viewBox="0 0 20 20" className={`h-4 w-4 ${iconClassName}`} fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M5.5 6.5 10 4l4.5 2.5v7L10 16l-4.5-2.5v-7Z" strokeLinejoin="round" />
        <path d="M5.5 6.5 10 9l4.5-2.5" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label === "Purchases") {
    return (
      <svg viewBox="0 0 20 20" className={`h-4 w-4 ${iconClassName}`} fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M5 5.5h2l1.2 6.2h6.4l1.2-4.8H7.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8.6" cy="14.6" r="1" fill="currentColor" stroke="none" />
        <circle cx="14" cy="14.6" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (label === "Reports") {
    return (
      <svg viewBox="0 0 20 20" className={`h-4 w-4 ${iconClassName}`} fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M5 15V9M10 15V5M15 15v-7" strokeLinecap="round" />
        <path d="M4.5 15.5h11" strokeLinecap="round" />
      </svg>
    );
  }

  if (label === "Team") {
    return (
      <svg viewBox="0 0 20 20" className={`h-4 w-4 ${iconClassName}`} fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="8" cy="8" r="2.5" />
        <circle cx="13.4" cy="9.2" r="1.9" />
        <path d="M4.8 15c.5-2.1 2-3.3 4.2-3.3S12.7 12.9 13.2 15M12.6 14.8c.3-1.3 1.2-2 2.7-2 1.1 0 1.9.4 2.5 1.2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" className={`h-4 w-4 ${iconClassName}`} fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="10" cy="10" r="3" />
      <path d="M10 4.5v1.2M10 14.3v1.2M15.5 10h-1.2M5.7 10H4.5M13.9 6.1l-.8.8M6.9 13.1l-.8.8M13.9 13.9l-.8-.8M6.9 6.9l-.8-.8" strokeLinecap="round" />
    </svg>
  );
}

function DemoFrameShell({
  appName,
  title,
  subtitle,
  status,
  navAriaLabel,
  activeNavItem,
  actions,
  children,
  embedded = false,
}: {
  appName: string;
  title: string;
  subtitle: string;
  status: string;
  navAriaLabel: string;
  activeNavItem: string;
  actions?: ReactNode;
  children: ReactNode;
  embedded?: boolean;
}) {
  return (
    <div
      className={`flex h-full min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-border/80 bg-[linear-gradient(180deg,rgba(255,252,246,0.98),rgba(250,242,230,0.96))] ${
        embedded ? "shadow-none" : "shadow-[0_30px_70px_rgba(48,24,10,0.12)]"
      }`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-border/65 bg-[rgba(255,252,246,0.92)] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent/85" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-warm/85" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#8BA472]" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
              {appName}
            </p>
          </div>
        </div>

        <div className="hidden h-8 w-28 rounded-full border border-border/65 bg-surface-soft/80 md:block" />
      </div>

      <div className="grid min-h-0 min-w-0 flex-1 md:grid-cols-[10.5rem_minmax(0,1fr)]">
        <aside
          role="navigation"
          aria-label={navAriaLabel}
          className="min-w-0 border-b border-border/65 bg-[linear-gradient(180deg,rgba(255,248,239,0.92),rgba(247,239,226,0.95))] p-3 sm:p-4 md:border-b-0 md:border-r"
        >
          <p className="text-lg font-semibold tracking-[-0.03em] text-text-strong">{appName}</p>
          <div className="mt-3 flex min-w-0 gap-1.5 overflow-x-auto pb-1 md:mt-4 md:block md:space-y-1.5 md:overflow-visible md:pb-0">
            {productSidebarItems.map((item) => {
              const isActive = item === activeNavItem;

              return (
                <div
                  key={item}
                  className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-[0.95rem] px-3 py-2.5 text-sm ${
                    isActive
                      ? "bg-[#FFF0E4] text-accent shadow-[inset_0_0_0_1px_rgba(211,95,57,0.08)]"
                      : "text-text-muted"
                  }`}
                >
                  <ProductNavIcon label={item} active={isActive} />
                  <span className={isActive ? "font-semibold" : "font-medium"}>{item}</span>
                </div>
              );
            })}
          </div>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-col bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(252,247,238,0.94))]">
          <div className="flex shrink-0 flex-wrap items-start justify-between gap-4 border-b border-border/60 px-4 py-4 sm:px-5">
            <div>
              <p className="text-[1.05rem] font-semibold tracking-[-0.03em] text-text-strong">{title}</p>
              <p className="mt-1 text-xs text-text-muted">{subtitle}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {actions}
              <span className="rounded-full border border-border/75 bg-surface px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                {status}
              </span>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col p-3.5 sm:p-4 lg:overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}

function CompactMetric({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper?: string;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border/70 bg-[rgba(255,252,246,0.9)] px-3.5 py-3 shadow-[0_10px_22px_rgba(39,29,22,0.035)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
        {label}
      </p>
      <p className="mt-2 text-[1.55rem] font-semibold leading-none text-text-strong">{value}</p>
      {helper ? <p className="mt-1.5 text-xs text-text-muted">{helper}</p> : null}
    </div>
  );
}

function CompactTrendChart({
  title,
  subtitle,
  points,
  valuePrefix = "",
  valueSuffix = "",
}: {
  title: string;
  subtitle: string;
  points: readonly DemoChartPoint[];
  valuePrefix?: string;
  valueSuffix?: string;
}) {
  const width = 356;
  const height = 120;
  const padding = { top: 14, right: 10, bottom: 22, left: 8 };
  const values = points.map((point) => point.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = Math.max(1, maxValue - minValue);
  const usableWidth = width - padding.left - padding.right;
  const usableHeight = height - padding.top - padding.bottom;

  const coordinates = points.map((point, index) => {
    const x =
      padding.left +
      (points.length === 1 ? usableWidth / 2 : (usableWidth / (points.length - 1)) * index);
    const y = padding.top + usableHeight - ((point.value - minValue) / range) * usableHeight;

    return { ...point, x, y };
  });

  const linePath = coordinates
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return (
    <div className="rounded-[var(--radius-card)] border border-border/70 bg-[rgba(255,252,246,0.9)] px-4 py-4 shadow-[0_10px_22px_rgba(39,29,22,0.035)]">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div>
          <p className="text-sm font-semibold text-text-strong">{title}</p>
          <p className="mt-1 text-xs text-text-muted">{subtitle}</p>
        </div>
        <span className="shrink-0 whitespace-nowrap rounded-full bg-surface-soft px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
          Last 7 Days
        </span>
      </div>

      <div className="mt-3 max-w-full overflow-x-auto">
        <svg
          role="img"
          aria-label={title}
          viewBox={`0 0 ${width} ${height}`}
          className="h-[7.25rem] min-w-[22rem] w-full"
        >
          {[0, 1, 2].map((row) => {
            const y = padding.top + (usableHeight / 2) * row;

            return (
              <line
                key={row}
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="rgba(108,92,77,0.12)"
                strokeWidth="1"
              />
            );
          })}

          <path
            d={linePath}
            fill="none"
            stroke="#D35F39"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {coordinates.map((point) => (
            <g key={point.label}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#FCF7EE"
                stroke="#D35F39"
                strokeWidth="2"
              />
              <text
                x={point.x}
                y={height - 4}
                textAnchor="middle"
                fontSize="10.5"
                fill="#6C5C4D"
                fontFamily="var(--font-body-family)"
              >
                {point.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-text-muted">
        {points.slice(0, 4).map((point) => (
          <span
            key={point.label}
            className="rounded-full border border-border/70 bg-surface-soft px-2.5 py-1"
          >
            {point.label} {valuePrefix}
            {point.value}
            {valueSuffix}
          </span>
        ))}
      </div>
    </div>
  );
}

function KitchenInventoryPreview({ demo, embedded = false }: PreviewVariantProps) {
  const { heroPreview } = demo;
  const primaryItems = heroPreview.sideListItems.slice(0, 4);
  const draftOrder = heroPreview.lowerPanels[0]?.items ?? [];

  return (
    <DemoFrameShell
      appName={heroPreview.appName}
      title="Inventory Overview"
      subtitle="Track stock levels, reorder timing, and supplier follow-through in one place."
      status={demo.destination.availabilityLabel}
      navAriaLabel="Kitchen Inventory product navigation"
      activeNavItem="Inventory"
      embedded={embedded}
      actions={
        <button
          type="button"
          className="min-h-10 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-white"
        >
          + Create Order
        </button>
      }
    >
      <div className="flex h-full flex-col gap-3">
        <div className="preview-region [--preview-delay:20ms] flex flex-wrap gap-2.5">
          {heroPreview.metrics.slice(0, 2).map((metric) => (
            <div
              key={metric.label}
              className="rounded-full border border-border/75 bg-[#FFF7EC] px-4 py-2 text-sm font-medium text-text-strong shadow-[0_8px_18px_rgba(39,29,22,0.03)]"
            >
              <span className="font-semibold">{metric.value}</span> {metric.label}
            </div>
          ))}
        </div>

        <div className="preview-region [--preview-delay:70ms] grid flex-1 gap-3 lg:grid-cols-[minmax(0,1.32fr)_minmax(13.75rem,0.68fr)]">
          <div className="rounded-[var(--radius-card)] border border-border/70 bg-[rgba(255,252,246,0.9)] px-4 py-4 shadow-[0_10px_22px_rgba(39,29,22,0.035)]">
            <div className="flex items-center justify-between gap-3 border-b border-border/65 pb-3">
              <p className="text-sm font-semibold text-text-strong">Inventory</p>
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                Live Status
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {primaryItems.map((item, index) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 rounded-[var(--radius-control)] bg-surface-soft/75 px-3 py-2.5 text-sm sm:grid-cols-[minmax(0,1fr)_auto_auto]"
                >
                  <div className="col-span-2 min-w-0 sm:col-span-1">
                    <p className="truncate font-medium text-text-strong">{item.label}</p>
                    {item.detail ? (
                      <p className="mt-0.5 truncate text-xs text-text-muted">{item.detail}</p>
                    ) : null}
                  </div>
                  <span className="whitespace-nowrap text-text-muted">{item.value}</span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                      index < 2 ? "bg-[#FFF1E4] text-accent" : "bg-[#F3F0E7] text-[#5E6F53]"
                    }`}
                  >
                    {index < 2 ? "Low" : "Good"}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-3 rounded-[var(--radius-card)] border border-border bg-background px-4 py-2.5 text-sm font-semibold text-text-strong transition hover:border-accent/40 hover:text-accent"
            >
              Reorder
            </button>
          </div>

          <div className="rounded-[var(--radius-card)] border border-border/70 bg-[rgba(255,248,239,0.92)] px-4 py-4 shadow-[0_10px_22px_rgba(39,29,22,0.035)]">
            <div className="border-b border-border/65 pb-3">
              <p className="text-sm font-semibold text-text-strong">Draft Order</p>
              <p className="mt-1 text-xs text-text-muted">Sysco</p>
            </div>

            <div className="mt-3 space-y-2">
              {draftOrder.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 rounded-[var(--radius-control)] bg-[rgba(255,255,255,0.72)] px-3 py-2.5 text-sm"
                >
                  <span className="text-text-muted">{item.label}</span>
                  <span className="font-medium text-text-strong">{item.value}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-3 w-full rounded-[var(--radius-card)] bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent/90"
            >
              Review Order
            </button>
          </div>
        </div>
      </div>
    </DemoFrameShell>
  );
}

function ClientSchedulingPreview({ demo, embedded = false }: PreviewVariantProps) {
  const { heroPreview } = demo;

  return (
    <DemoFrameShell
      appName={heroPreview.appName}
      title="Client Scheduling"
      subtitle="Keep bookings, confirmations, and client prep organized before every kickoff."
      status={demo.destination.availabilityLabel}
      navAriaLabel="Client Scheduling product navigation"
      activeNavItem="Reservations"
      embedded={embedded}
      actions={
        <button
          type="button"
          className="min-h-10 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-white"
        >
          + New Booking
        </button>
      }
    >
      <div className="flex h-full flex-col gap-3">
        <div className="preview-region [--preview-delay:20ms] grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <CompactMetric label="Today" value={heroPreview.metrics[0]?.value ?? "5"} helper="Bookings" />
          <CompactMetric label="Confirmed" value={heroPreview.metrics[1]?.value ?? "3"} helper="Booked" />
          <CompactMetric label="Open Slots" value={heroPreview.metrics[2]?.value ?? "1"} helper="Available" />
          <CompactMetric label="This Week" value={heroPreview.metrics[3]?.value ?? "12"} helper="Bookings" />
        </div>

        <div className="grid flex-1 gap-3 lg:grid-cols-[minmax(0,1.28fr)_minmax(13.75rem,0.72fr)]">
          <div className="preview-region [--preview-delay:70ms] rounded-[var(--radius-card)] border border-border/70 bg-[rgba(255,252,246,0.9)] px-4 py-4 shadow-[0_10px_22px_rgba(39,29,22,0.035)]">
            <div className="flex items-center justify-between gap-3 pb-3">
              <div>
                <p className="text-sm font-semibold text-text-strong">Weekly Planner</p>
                <p className="mt-1 text-xs text-text-muted">August 2026</p>
              </div>
              <span className="rounded-full bg-surface-soft px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                Week View
              </span>
            </div>

            <div className="max-w-full overflow-x-auto rounded-[var(--radius-card)] border border-border/65 bg-[#FFF9EF]">
              <div className="grid min-w-[30rem] grid-cols-5 gap-2 p-3 sm:min-w-0">
                {schedulingPlannerColumns.map((column) => (
                  <div
                    key={column.day}
                    className="min-w-0 rounded-[var(--radius-card)] border border-border/60 bg-[rgba(255,252,246,0.96)] px-1.5 py-3"
                  >
                    <p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                      {column.day}
                    </p>
                    <div className="mt-3 space-y-2">
                      {column.items.map((item) => (
                        <div
                          key={`${column.day}-${item.title}`}
                          className={`min-w-0 overflow-hidden rounded-[0.95rem] px-1.5 py-2.5 ${
                            item.accent
                              ? "bg-[linear-gradient(135deg,#FCE3B0_0%,#F5B17D_100%)] text-[#6A2A12]"
                              : "bg-surface-soft text-text-muted"
                          }`}
                        >
                          <p className="whitespace-nowrap text-[10px] font-semibold leading-tight tracking-[-0.01em]">
                            {item.title}
                          </p>
                          <p className="mt-1 text-[9px] leading-tight">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="preview-region [--preview-delay:95ms] rounded-[var(--radius-card)] border border-border/70 bg-[rgba(255,248,239,0.92)] px-4 py-4 shadow-[0_10px_22px_rgba(39,29,22,0.035)]">
            <p className="text-sm font-semibold text-text-strong">{heroPreview.sideListTitle}</p>
            <div className="mt-3 space-y-2.5">
              {heroPreview.sideListItems.map((item, index) => (
                <div
                  key={item.label}
                  className={`rounded-[var(--radius-control)] px-3 py-2.5 ${
                    index === 0 ? "bg-[#FFF4E6]" : "border border-border/70 bg-surface-soft/70"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-text-strong">{item.label}</p>
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-text-muted">
                      {index === 0 ? "Soon" : "Queued"}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-text-strong">{item.value}</p>
                  {item.detail ? <p className="mt-0.5 text-xs text-text-muted">{item.detail}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DemoFrameShell>
  );
}

function OperationsDashboardPreview({ demo, embedded = false }: PreviewVariantProps) {
  const { heroPreview } = demo;
  const automationQueue = heroPreview.lowerPanels[1]?.items ?? [];

  return (
    <DemoFrameShell
      appName={heroPreview.appName}
      title="Operations Dashboard"
      subtitle="Surface the metrics, notes, and bottlenecks that keep service moving."
      status={demo.destination.availabilityLabel}
      navAriaLabel="Operations Dashboard product navigation"
      activeNavItem="Reports"
      embedded={embedded}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          {["Week", "Channel", "Team"].map((filter) => (
            <span
              key={filter}
              className="rounded-full border border-border/80 bg-surface-soft px-3 py-1.5 text-xs font-medium text-text-muted"
            >
              {filter}
            </span>
          ))}
        </div>
      }
    >
      <div className="flex h-full flex-col gap-3">
        <div className="preview-region [--preview-delay:20ms] grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {heroPreview.metrics.map((metric) => (
            <CompactMetric
              key={metric.label}
              label={metric.label}
              value={metric.value}
              helper={metric.context}
            />
          ))}
        </div>

        <div className="grid flex-1 gap-3 lg:grid-cols-[minmax(0,1.18fr)_minmax(13.5rem,0.82fr)]">
          <div className="preview-region [--preview-delay:70ms]">
            <CompactTrendChart
              title={heroPreview.chartTitle}
              subtitle="Daily revenue over the past week"
              points={heroPreview.chartSeries}
              valuePrefix="$"
              valueSuffix="k"
            />
          </div>

          <div className="preview-region [--preview-delay:95ms] rounded-[var(--radius-card)] border border-border/70 bg-[rgba(255,248,239,0.92)] px-4 py-4 shadow-[0_10px_22px_rgba(39,29,22,0.035)]">
            <p className="text-sm font-semibold text-text-strong">{heroPreview.sideListTitle}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-text-muted">
              {automationQueue.map((item) => (
                <span
                  key={item.label}
                  className="rounded-full border border-border/70 bg-surface-soft px-2.5 py-1"
                >
                  {item.label}: <span className="font-medium text-text-strong">{item.value}</span>
                </span>
              ))}
            </div>
            <div className="mt-3 space-y-2.5">
              {heroPreview.sideListItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[var(--radius-control)] bg-[rgba(255,255,255,0.72)] px-3 py-2.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-text-strong">{item.label}</p>
                    <p className="text-sm text-text-muted">{item.value}</p>
                  </div>
                  {item.detail ? <p className="mt-1 text-xs text-text-muted">{item.detail}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DemoFrameShell>
  );
}

export function ProductPreview({ demo, embedded = false }: ProductPreviewProps) {
  return (
    <div
      data-testid="product-preview-surface"
      className={`relative w-full min-w-0 max-w-full overflow-hidden lg:min-h-[32.5rem] lg:aspect-[1.42/1] xl:min-h-[34rem] xl:aspect-[1.46/1] ${
        embedded ? "" : "card-surface p-4 sm:p-5 lg:p-6"
      }`}
    >
      {demo.id === "kitchen-inventory" ? <KitchenInventoryPreview demo={demo} embedded={embedded} /> : null}
      {demo.id === "bookings-website" ? <ClientSchedulingPreview demo={demo} embedded={embedded} /> : null}
      {demo.id === "operations-dashboard" ? <OperationsDashboardPreview demo={demo} embedded={embedded} /> : null}
    </div>
  );
}
