"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SolarThemeSync } from "@/components/layout/SolarThemeSync";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="solar"
      enableSystem={false}
      disableTransitionOnChange={false}
      themes={["light", "dark", "solar"]}
      value={{
        light: "light",
        dark: "dark",
        solar: "solar",
      }}
    >
      <SolarThemeSync />
      {children}
    </NextThemesProvider>
  );
}
