"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useIsClient } from "@/lib/use-is-client";
import {
  cycleTheme,
  isSolarMode,
  themeModeLabel,
} from "@/components/layout/SolarThemeSync";
import { getSocialProfiles } from "@/lib/social-links";
import { site } from "@/content/site";

type SiteFooterProps = {
  onOpenCommandPalette: () => void;
};

export function SiteFooter({ onOpenCommandPalette }: SiteFooterProps) {
  const { theme, setTheme } = useTheme();
  const mounted = useIsClient();
  const year = new Date().getFullYear();
  const socialProfiles = getSocialProfiles(site);
  const hasResume = Boolean(site.resumeUrl?.trim());

  return (
    <footer className="border-t border-border-subtle bg-bg-secondary">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-serif text-xl text-text-primary">{site.name}</p>
            <p className="mt-2 text-sm text-text-secondary">{site.role}</p>
            <p className="mt-1 text-sm text-text-tertiary">{site.location}</p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
              Navigate
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-text-secondary hover:text-text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-sm text-text-secondary hover:text-text-primary">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-text-secondary hover:text-text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  className="text-sm text-text-secondary hover:text-text-primary"
                >
                  Command palette <span className="font-mono text-xs">⌘K</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
              Colophon
            </p>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-text-primary">
                  {site.email}
                </a>
              </li>
              <li>{site.timezone}</li>
              {socialProfiles.map((profile) => (
                <li key={profile.label}>
                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-text-primary"
                  >
                    {profile.label}
                  </a>
                </li>
              ))}
              {hasResume && (
                <li>
                  <a href={site.resumeUrl} className="hover:text-text-primary">
                    Download resume
                  </a>
                </li>
              )}
              <li>
                {mounted && (
                  <button
                    type="button"
                    onClick={() => setTheme(cycleTheme(theme))}
                    className="hover:text-text-primary"
                  >
                    Theme: {themeModeLabel(theme)}
                    {isSolarMode(theme) ? " · sunrise/sunset" : ""}
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border-subtle pt-8">
          <p className="font-mono text-xs text-text-tertiary">
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
