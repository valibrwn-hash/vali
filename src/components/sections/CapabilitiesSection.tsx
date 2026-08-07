import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { capabilities } from "@/content/site";

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="border-t border-border-subtle bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Capabilities
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-text-primary md:text-4xl">
            What I bring to complex products
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-px bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <ScrollReveal key={cap.id} delay={i * 0.08}>
              <article className="h-full bg-bg-secondary p-8 transition-colors hover:bg-bg-primary">
                <span className="font-mono text-xs text-text-tertiary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-medium text-text-primary">{cap.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {cap.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
