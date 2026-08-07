import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CaseStudyCard } from "@/components/content/CaseStudyCard";
import { caseStudies } from "@/content/case-studies";

export function SelectedWorkSection() {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
                Selected Work
              </p>
              <h2 className="mt-4 font-serif text-3xl tracking-tight text-text-primary md:text-4xl">
                Flagship projects
              </h2>
              <p className="mt-4 max-w-xl text-text-secondary">
                Detailed case studies documenting architecture, decisions, and impact — not project
                cards.
              </p>
            </div>
            <Link
              href="/work"
              className="shrink-0 text-sm text-accent transition-colors hover:text-accent-hover"
            >
              View all work →
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-16">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} featured />
          ))}
        </div>
      </div>
    </section>
  );
}
