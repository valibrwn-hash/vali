import { ScrollReveal } from "@/components/ui/ScrollReveal";

type ImpactMetricProps = {
  metrics: { value: string; label: string; context: string }[];
};

export function ImpactMetrics({ metrics }: ImpactMetricProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {metrics.map((metric, i) => (
        <ScrollReveal key={metric.label} delay={i * 0.1}>
          <div className="border-t-2 border-accent pt-6">
            <p className="font-serif text-3xl text-text-primary">{metric.value}</p>
            <p className="mt-2 font-medium text-text-primary">{metric.label}</p>
            <p className="mt-1 text-sm text-text-secondary">{metric.context}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
