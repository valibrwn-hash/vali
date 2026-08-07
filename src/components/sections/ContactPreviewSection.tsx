import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { site } from "@/content/site";

export function ContactPreviewSection() {
  return (
    <section id="contact-preview" className="border-t border-border-subtle bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              Contact
            </p>
            <h2 className="mt-4 font-serif text-3xl tracking-tight text-text-primary md:text-4xl">
              Let&apos;s build something exceptional
            </h2>
            <p className="mt-6 text-lg text-text-secondary">
              Open to consulting engagements, full-time opportunities, and selective freelance
              projects. I respond to every inquiry within 48 hours.
            </p>
            <p className="mt-4 font-mono text-sm text-accent">{site.availability}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/contact#form"
              className="rounded-sm bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Send a message
            </Link>
            <Link
              href="/contact#calendar"
              className="rounded-sm border border-border-strong px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-bg-primary"
            >
              Schedule a call
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
