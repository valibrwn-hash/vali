"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import { site } from "@/content/site";
import { msUntilNextTransition, resolveSolarTheme } from "@/lib/solar-theme";

function applyResolvedTheme(resolved: "light" | "dark") {
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

/**
 * Applies light/dark class based on local sunrise and sunset when theme is "solar".
 */
export function SolarThemeSync() {
  const { theme, resolvedTheme } = useTheme();

  const syncSolar = useCallback(() => {
    if (theme !== "solar") return;
    applyResolvedTheme(resolveSolarTheme(site.coordinates));
  }, [theme]);

  useEffect(() => {
    if (theme === "light") {
      applyResolvedTheme("light");
      return;
    }
    if (theme === "dark") {
      applyResolvedTheme("dark");
      return;
    }
    if (theme !== "solar") return;

    syncSolar();

    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      const ms = msUntilNextTransition(site.coordinates);
      timeoutId = setTimeout(() => {
        syncSolar();
        scheduleNext();
      }, ms + 500);
    };

    scheduleNext();

    const onVisibility = () => {
      if (document.visibilityState === "visible") syncSolar();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [theme, syncSolar]);

  // Re-apply solar dark class when next-themes updates the DOM
  useEffect(() => {
    if (theme !== "solar") return;
    applyResolvedTheme(resolveSolarTheme(site.coordinates));
  }, [theme, resolvedTheme]);

  return null;
}

export function cycleTheme(current: string | undefined): "solar" | "light" | "dark" {
  if (current === "solar" || !current) return "light";
  if (current === "light") return "dark";
  return "solar";
}

export function themeToggleLabel(theme: string | undefined): string {
  if (theme === "solar" || !theme) {
    return "Switch to manual light mode (currently following sunrise and sunset)";
  }
  if (theme === "light") return "Switch to dark mode";
  return "Switch to automatic sunrise and sunset theme";
}

export function themeModeLabel(theme: string | undefined): string {
  if (theme === "solar" || !theme) return "Auto (sunrise/sunset)";
  if (theme === "light") return "Light";
  return "Dark";
}

export function isSolarMode(theme: string | undefined): boolean {
  return theme === "solar" || !theme;
}
