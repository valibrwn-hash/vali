"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/cn";
import { useIsClient } from "@/lib/use-is-client";
import { cycleTheme, isSolarMode, themeToggleLabel } from "@/components/layout/SolarThemeSync";
import { site, navigation } from "@/content/site";

type SiteHeaderProps = {
  onOpenCommandPalette: () => void;
};

export function SiteHeader({ onOpenCommandPalette }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useIsClient();
  const solarActive = isSolarMode(theme);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  const toggleTheme = () => {
    setTheme(cycleTheme(theme));
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-40 transition-all duration-200",
        scrolled
          ? "border-b border-border-subtle bg-bg-primary/90 py-3 backdrop-blur-md"
          : "bg-transparent py-5 sm:py-6",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-base tracking-tight text-text-primary transition-opacity hover:opacity-70 sm:text-lg"
        >
          {site.name.split(" ")[0]}
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 sm:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {item.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 rounded-sm border border-border-subtle px-2.5 py-1.5 text-xs text-text-tertiary transition-colors hover:border-text-tertiary hover:text-text-secondary"
            aria-label="Open command palette"
          >
            <span>Search</span>
            <kbd className="font-mono text-[10px]">⌘K</kbd>
          </button>

          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-sm p-2 text-text-secondary transition-colors hover:text-text-primary"
              aria-label={themeToggleLabel(theme)}
              title={solarActive ? "Auto: sunrise/sunset" : resolvedTheme === "dark" ? "Dark" : "Light"}
            >
              {solarActive ? (
                <SunHorizonIcon className="h-4 w-4" />
              ) : resolvedTheme === "dark" ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
            </button>
          )}

          <Link
            href="/contact"
            className="rounded-sm bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-sm p-2 text-text-secondary"
              aria-label={themeToggleLabel(theme)}
            >
              {solarActive ? (
                <SunHorizonIcon className="h-4 w-4" />
              ) : resolvedTheme === "dark" ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
            </button>
          )}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded-sm p-2 text-text-primary"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="border-t border-border-subtle bg-bg-primary px-6 py-6 sm:hidden"
        >
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block text-lg text-text-primary"
              >
                Home
              </Link>
            </li>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-lg text-text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenCommandPalette();
                }}
                className="text-lg text-text-primary"
              >
                Search ⌘K
              </button>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="inline-block rounded-sm bg-accent px-4 py-2 text-sm font-medium text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function SunHorizonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 18v2.25M4.5 12H3M21 12h-1.5M6.4 6.4 5.3 5.3M18.7 18.7l-1.1-1.1M6.4 17.6l-1.1 1.1M18.7 5.3l-1.1 1.1M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
