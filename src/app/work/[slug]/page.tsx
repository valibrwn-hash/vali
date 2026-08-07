import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectLinks } from "@/components/content/ProjectLinks";
import { DecisionTable } from "@/components/content/DecisionTable";
import { ImpactMetrics } from "@/components/content/ImpactMetrics";
import { SystemDiagram } from "@/components/content/SystemDiagram";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Tag } from "@/components/ui/Tag";
import {
  caseStudies,
  getCaseStudy,
  getOtherCaseStudy,
} from "@/content/case-studies";
import { getSiteUrl } from "@/lib/site-url";
import { site } from "@/content/site";
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Not Found" };

  return {
    title: `${study.title} — ${study.subtitle}`,
    description: study.thesis,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${study.title} — ${study.subtitle}`,
      description: study.thesis,
      url: `/work/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — ${study.subtitle}`,
      description: study.thesis,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const other = getOtherCaseStudy(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    headline: study.subtitle,
    description: study.thesis,
    url: `${getSiteUrl()}/work/${study.slug}`,
    author: { "@type": "Person", name: site.name },
    datePublished: study.year,
    keywords: study.tags.join(", "),
  };

  return (
    <article className="pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Chapter header */}
        <header className="max-w-3xl">
          <ScrollReveal>
            <Link
              href="/work"
              className="font-mono text-xs text-text-tertiary transition-colors hover:text-accent"
            >
              ← Back to work
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="font-mono text-sm text-text-tertiary">
                Chapter {study.number}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
                {study.domain}
              </span>
              <span className="font-mono text-xs text-text-tertiary">{study.year}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <h1 className="mt-6 font-serif text-4xl tracking-tight text-text-primary md:text-6xl">
              {study.title}
            </h1>
            <p className="mt-4 text-xl text-text-secondary md:text-2xl">{study.subtitle}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-lg leading-relaxed text-text-secondary">{study.thesis}</p>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-text-tertiary">
              Technologies
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <Tag key={tag} variant="mono">
                  {tag}
                </Tag>
              ))}
            </div>
            <p className="mt-6 font-mono text-sm text-text-tertiary">{study.role}</p>
            <ProjectLinks links={study.links} />
          </ScrollReveal>
        </header>

        {/* Context */}
        <section className="mt-24 max-w-3xl">
          <ScrollReveal>
            <h2 className="font-serif text-2xl text-text-primary md:text-3xl">
              {study.context.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="prose-editorial mt-6 text-text-secondary">
              {study.context.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Problem */}
        <section className="mt-24 max-w-3xl">
          <ScrollReveal>
            <h2 className="font-serif text-2xl text-text-primary md:text-3xl">
              {study.problem.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="prose-editorial mt-6 text-text-secondary">
              {study.problem.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Architecture */}
        <section className="mt-24">
          <ScrollReveal>
            <h2 className="font-serif text-2xl text-text-primary md:text-3xl">
              {study.architecture.title}
            </h2>
            <p className="mt-4 max-w-2xl text-text-secondary">
              {study.architecture.description}
            </p>
          </ScrollReveal>
          <div className="mt-12">
            <SystemDiagram components={study.architecture.components} />
          </div>
        </section>

        {/* Decisions */}
        <section className="mt-24">
          <ScrollReveal>
            <h2 className="font-serif text-2xl text-text-primary md:text-3xl">
              {study.decisions.title}
            </h2>
          </ScrollReveal>
          <div className="mt-10">
            <DecisionTable rows={study.decisions.rows} />
          </div>
        </section>

        {/* Build */}
        <section className="mt-24 max-w-3xl">
          <ScrollReveal>
            <h2 className="font-serif text-2xl text-text-primary md:text-3xl">
              {study.build.title}
            </h2>
          </ScrollReveal>
          <div className="mt-10 space-y-10">
            {study.build.highlights.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="border-l-2 border-accent pl-6">
                  <h3 className="font-medium text-text-primary">{item.title}</h3>
                  <p className="mt-2 text-text-secondary">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section className="mt-24">
          <ScrollReveal>
            <h2 className="font-serif text-2xl text-text-primary md:text-3xl">
              {study.impact.title}
            </h2>
          </ScrollReveal>
          <div className="mt-10">
            <ImpactMetrics metrics={study.impact.metrics} />
          </div>
          <ScrollReveal delay={0.2}>
            <p className="mt-12 max-w-2xl text-lg italic text-text-secondary">
              {study.impact.closing}
            </p>
          </ScrollReveal>
        </section>

        {/* Next chapter + CTA */}
        <footer className="mt-24 border-t border-border-subtle pt-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            {other && (
              <ScrollReveal>
                <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
                  Next chapter
                </p>
                <Link
                  href={`/work/${other.slug}`}
                  className="mt-4 block font-serif text-2xl text-text-primary transition-colors hover:text-accent"
                >
                  {other.title} →
                </Link>
                <p className="mt-2 text-text-secondary">{other.subtitle}</p>
              </ScrollReveal>
            )}

            <ScrollReveal delay={0.1}>
              <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
                Discuss a similar challenge
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link
                  href="/contact#form"
                  className="rounded-sm bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                >
                  Send a message
                </Link>
                <Link
                  href="/contact#calendar"
                  className="rounded-sm border border-border-strong px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-bg-secondary"
                >
                  Schedule a call
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </footer>
      </div>
    </article>
  );
}
