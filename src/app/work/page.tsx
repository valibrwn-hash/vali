import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/content/CaseStudyCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { caseStudies } from "@/content/case-studies";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description: `Selected projects and case studies by ${site.name} — ${site.role}.`,
  alternates: { canonical: "/work" },
  openGraph: {
    title: `Work · ${site.name}`,
    description: `Selected projects and case studies by ${site.name}.`,
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Index
          </p>
          <h1 className="mt-4 font-serif text-4xl tracking-tight text-text-primary md:text-5xl">
            Selected Work
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-text-secondary">
            Two flagship platforms — documented as architecture chapters with decisions,
            trade-offs, and measurable impact.
          </p>
        </ScrollReveal>

        <div className="mt-20">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} featured />
          ))}
        </div>
      </div>
    </div>
  );
}
