import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Tag } from "@/components/ui/Tag";
import { trustSignals, expertise } from "@/content/site";

export function ExpertiseSection() {
  return (
    <section id="expertise" className="border-t border-border-subtle bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            {expertise.title}
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-text-primary md:text-4xl">
            Technical depth
          </h2>
          <p className="mt-4 max-w-xl text-text-secondary">{expertise.subtitle}</p>
        </ScrollReveal>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {expertise.categories.map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 0.08}>
              <div>
                <h3 className="border-b border-border-subtle pb-3 font-medium text-text-primary">
                  {cat.name}
                </h3>
                <ul className="mt-4 space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section id="trust" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              Sectors
            </p>
            <h2 className="mt-4 font-serif text-3xl tracking-tight text-text-primary">
              Trusted across industries
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {trustSignals.sectors.map((sector) => (
                <Tag key={sector}>{sector}</Tag>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              Track record
            </p>
            <div className="mt-8 space-y-8">
              {trustSignals.metrics.map((metric) => (
                <div key={metric.label} className="border-l-2 border-accent pl-6">
                  <p className="font-serif text-2xl text-text-primary">{metric.value}</p>
                  <p className="mt-1 text-sm font-medium text-text-primary">{metric.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
