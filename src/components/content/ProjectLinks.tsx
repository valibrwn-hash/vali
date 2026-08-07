import { isValidExternalUrl } from "@/lib/social-links";

type ProjectLinksProps = {
  links?: {
    live?: string;
    repo?: string;
  };
};

export function ProjectLinks({ links }: ProjectLinksProps) {
  const live = links?.live && isValidExternalUrl(links.live) ? links.live : null;
  const repo = links?.repo && isValidExternalUrl(links.repo) ? links.repo : null;

  if (!live && !repo) return null;

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-sm border border-border-strong px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-bg-secondary"
        >
          View live project
          <span aria-hidden>↗</span>
        </a>
      )}
      {repo && (
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-sm border border-border-subtle px-4 py-2 text-sm text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
        >
          View repository
          <span aria-hidden>↗</span>
        </a>
      )}
    </div>
  );
}
