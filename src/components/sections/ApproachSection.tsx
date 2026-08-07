import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { approach } from "@/content/site";

export function ApproachSection() {
  return (
    <section id="process" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Approach
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-text-primary md:text-4xl">
            How I work
          </h2>
        </ScrollReveal>

        <div className="relative mt-16">
          <div className="absolute top-0 bottom-0 left-4 hidden w-px bg-ledger-line md:block" aria-hidden />

          <div className="space-y-16">
            {approach.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1}>
                <div className="relative md:pl-16">
                  <div className="absolute left-2.5 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-bg-primary md:block" aria-hidden />
                  <span className="font-mono text-sm text-accent">{step.step}</span>
                  <h3 className="mt-2 font-serif text-2xl text-text-primary">{step.title}</h3>
                  <p className="mt-4 max-w-xl text-text-secondary">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
