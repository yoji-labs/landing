"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface CalEmbedProps {
  calLink: string;
}

const NAMESPACE = "yojilabs-intro";

export function CalEmbed({ calLink }: CalEmbedProps) {
  useEffect(() => {
    let cancelled = false;

    getCalApi({ namespace: NAMESPACE }).then((cal) => {
      if (cancelled) {
        return;
      }

      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#d35f39" },
          dark: { "cal-brand": "#e9a342" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      data-testid="cal-embed"
      className="w-full min-w-0 max-w-full overflow-x-auto overflow-y-hidden rounded-[var(--radius-panel)] border border-border bg-surface"
    >
      <Cal
        namespace={NAMESPACE}
        calLink={calLink}
        style={{
          boxSizing: "border-box",
          width: "100%",
          minWidth: 0,
          maxWidth: "100%",
          height: "100%",
          minHeight: "640px",
          overflow: "auto",
        }}
        config={{ layout: "month_view", theme: "light" }}
      />
    </div>
  );
}
