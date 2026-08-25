import type { DemoChartPoint } from "@/types/site";

interface MiniLineChartProps {
  ariaLabel: string;
  chartId: string;
  points: readonly DemoChartPoint[];
  valuePrefix?: string;
  valueSuffix?: string;
}

interface MiniBarChartProps {
  ariaLabel: string;
  points: readonly DemoChartPoint[];
  valueSuffix?: string;
}

interface StatusMeterItem {
  readonly label: string;
  readonly value: number;
  readonly valueLabel: string;
}

interface StatusMeterProps {
  ariaLabel: string;
  items: readonly StatusMeterItem[];
}

function formatValue(
  value: number,
  {
    valuePrefix = "",
    valueSuffix = "",
  }: {
    valuePrefix?: string;
    valueSuffix?: string;
  },
) {
  return `${valuePrefix}${value}${valueSuffix}`;
}

export function MiniLineChart({
  ariaLabel,
  chartId,
  points,
  valuePrefix,
  valueSuffix,
}: MiniLineChartProps) {
  const width = 340;
  const height = 176;
  const padding = { top: 16, right: 16, bottom: 28, left: 12 };
  const values = points.map((point) => point.value);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = Math.max(1, maxValue - minValue);
  const usableWidth = width - padding.left - padding.right;
  const usableHeight = height - padding.top - padding.bottom;

  const coordinates = points.map((point, index) => {
    const x =
      padding.left +
      (points.length === 1 ? usableWidth / 2 : (usableWidth / (points.length - 1)) * index);
    const y =
      padding.top + usableHeight - ((point.value - minValue) / range) * usableHeight;

    return { ...point, x, y };
  });

  const linePath = coordinates
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${coordinates[coordinates.length - 1]?.x ?? width} ${
    height - padding.bottom
  } L ${coordinates[0]?.x ?? 0} ${height - padding.bottom} Z`;

  return (
    <div className="space-y-3">
      <div className="max-w-full overflow-x-auto">
        <svg
          role="img"
          aria-label={ariaLabel}
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto min-w-[20rem] w-full"
        >
          <defs>
            <linearGradient id={`${chartId}-fill`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#D35F39" stopOpacity="0.26" />
              <stop offset="100%" stopColor="#D35F39" stopOpacity="0.02" />
            </linearGradient>
          </defs>

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

          <path d={areaPath} fill={`url(#${chartId}-fill)`} />
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
                r="4.5"
                fill="#FCF7EE"
                stroke="#D35F39"
                strokeWidth="2"
              />
              <text
                x={point.x}
                y={height - 6}
                textAnchor="middle"
                fontSize="11"
                fill="#6C5C4D"
                fontFamily="var(--font-body-family)"
              >
                {point.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="flex flex-wrap gap-2 text-[11px] font-medium text-text-muted">
        {points.map((point) => (
          <div
            key={point.label}
            className="min-w-[4.75rem] flex-1 rounded-[0.9rem] bg-surface-soft/70 px-2 py-2 text-center"
          >
            <p>{point.label}</p>
            <p className="mt-1 text-text-strong">
              {formatValue(point.value, { valuePrefix, valueSuffix })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MiniBarChart({
  ariaLabel,
  points,
  valueSuffix = "",
}: MiniBarChartProps) {
  const maxValue = Math.max(...points.map((point) => point.value));

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className="max-w-full overflow-x-auto rounded-[var(--radius-card)] border border-border/65 bg-[#FFF9EF]"
    >
      <div className="flex min-w-[20rem] items-end gap-3 px-4 py-4">
        {points.map((point) => (
          <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-[11px] font-semibold text-text-muted">
              {point.value}
              {valueSuffix}
            </span>
            <div className="flex h-28 w-full items-end justify-center rounded-[1rem] bg-surface-soft px-2 py-2">
              <div
                className="w-full rounded-[0.8rem] bg-[linear-gradient(180deg,#E9A342_0%,#D35F39_100%)] transition-[height] duration-[var(--motion-slow)] ease-[var(--ease-enter)]"
                style={{ height: `${(point.value / maxValue) * 100}%` }}
              />
            </div>
            <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] text-text-muted">
              {point.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatusMeter({ ariaLabel, items }: StatusMeterProps) {
  return (
    <div role="img" aria-label={ariaLabel} className="space-y-3">
      {items.map((item) => (
        <div key={item.label} className="space-y-2">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-sm">
            <span className="font-medium text-text-strong">{item.label}</span>
            <span className="text-text-muted">{item.valueLabel}</span>
          </div>
          <div className="h-2.5 rounded-full bg-surface-soft">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#E9A342_0%,#D35F39_100%)] transition-[width] duration-[var(--motion-slow)] ease-[var(--ease-enter)]"
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
