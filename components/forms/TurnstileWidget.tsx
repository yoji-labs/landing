"use client";

import { useEffect, useId, useRef } from "react";
import { siteConfig } from "@/lib/site-config";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "flexible" | "compact";
        },
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

interface TurnstileWidgetProps {
  onToken: (token: string | null) => void;
}

/** Renders nothing when no site key is configured, so forms work on preview before keys exist. */
export function TurnstileWidget({ onToken }: TurnstileWidgetProps) {
  const siteKey = siteConfig.urls.integrations.turnstileSiteKey;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const id = useId();

  useEffect(() => {
    if (!siteKey || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    let cancelled = false;

    function render() {
      if (cancelled || !window.turnstile || widgetIdRef.current) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(container, {
        sitekey: siteKey as string,
        theme: "light",
        size: "flexible",
        callback: (token) => onToken(token),
        "expired-callback": () => onToken(null),
        "error-callback": () => onToken(null),
      });
    }

    if (window.turnstile) {
      render();
    } else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);

      if (!script) {
        script = document.createElement("script");
        script.src = SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }

      script.addEventListener("load", render);
    }

    return () => {
      cancelled = true;

      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onToken]);

  if (!siteKey) {
    return null;
  }

  return (
    <div
      id={id}
      ref={containerRef}
      className="min-h-[65px] w-full max-w-full overflow-hidden"
      data-testid="turnstile"
    />
  );
}
