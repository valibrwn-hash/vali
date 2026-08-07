import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { abstract } from "@/content/site";

export function AbstractSection() {
  return (
    <section id="philosophy" className="border-t border-border-subtle bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              {abstract.title}
            </p>
            <h2 className="mt-4 font-serif text-3xl tracking-tight text-text-primary md:text-4xl">
              Engineering mindset
            </h2>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-8" delay={0.15}>
            <div className="prose-editorial max-w-2xl text-text-secondary">
              {abstract.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
