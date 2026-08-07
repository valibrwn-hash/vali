"use client";

import { useTheme } from "next-themes";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { CommandPalette, useCommandPalette } from "./CommandPalette";
import { cycleTheme } from "./SolarThemeSync";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { open, session, openPalette, closePalette } = useCommandPalette();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(cycleTheme(theme));
  };

  const setSolarTheme = () => {
    setTheme("solar");
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="grain" aria-hidden />
      <SiteHeader onOpenCommandPalette={openPalette} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter onOpenCommandPalette={openPalette} />
      <CommandPalette
        open={open}
        session={session}
        onClose={closePalette}
        onToggleTheme={toggleTheme}
        onSetSolarTheme={setSolarTheme}
      />
    </>
  );
}
