import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Tag } from "@/components/ui/Tag";
import type { CaseStudy } from "@/content/case-studies";

type CaseStudyCardProps = {
  study: CaseStudy;
  featured?: boolean;
};

export function CaseStudyCard({ study, featured = false }: CaseStudyCardProps) {
  return (
    <ScrollReveal>
      <article
        className={
          featured
            ? "group border-t border-border-strong py-12 transition-colors hover:bg-bg-secondary/50"
            : "group border-t border-border-subtle py-10 transition-colors hover:bg-bg-secondary/50"
        }
      >
        <Link href={`/work/${study.slug}`} className="block">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-text-tertiary">{study.number}</span>
                <span className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
                  {study.domain}
                </span>
              </div>

              <h3
                className={
                  featured
                    ? "mt-4 font-serif text-3xl tracking-tight text-text-primary transition-colors group-hover:text-accent md:text-4xl"
                    : "mt-4 font-serif text-2xl tracking-tight text-text-primary transition-colors group-hover:text-accent md:text-3xl"
                }
              >
                {study.title}
              </h3>

              <p className="mt-2 text-lg text-text-secondary">{study.subtitle}</p>
              <p className="mt-4 max-w-2xl text-text-secondary">{study.thesis}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <Tag key={tag} variant="mono">
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-2 lg:items-end lg:pt-8">
              <span className="font-mono text-xs text-text-tertiary">{study.year}</span>
              <span className="text-sm text-accent transition-transform group-hover:translate-x-1">
                Read chapter →
              </span>
            </div>
          </div>
        </Link>
      </article>
    </ScrollReveal>
  );
}
