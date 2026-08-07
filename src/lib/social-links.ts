const PLACEHOLDER_PATTERNS = [
  /^https:\/\/linkedin\.com\/?$/,
  /^https:\/\/github\.com\/?$/,
  /^https:\/\/cal\.com\/?$/,
];

export function isPlaceholderUrl(url: string): boolean {
  if (!url?.trim()) return true;
  return PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(url.trim()));
}

export function isValidExternalUrl(url: string): boolean {
  if (!url?.trim() || isPlaceholderUrl(url)) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function getValidSocialLinks(links: readonly string[]): string[] {
  return links.filter(isValidExternalUrl);
}

export type SocialProfile = {
  label: string;
  href: string;
};

export function getSocialProfiles(site: {
  linkedin: string;
  github: string;
}): SocialProfile[] {
  const profiles: SocialProfile[] = [];
  if (isValidExternalUrl(site.linkedin)) {
    profiles.push({ label: "LinkedIn", href: site.linkedin });
  }
  if (isValidExternalUrl(site.github)) {
    profiles.push({ label: "GitHub", href: site.github });
  }
  return profiles;
}
