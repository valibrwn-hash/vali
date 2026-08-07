import { ScrollReveal } from "@/components/ui/ScrollReveal";

type DecisionTableProps = {
  rows: {
    decision: string;
    options: string;
    choice: string;
    rationale: string;
  }[];
};

export function DecisionTable({ rows }: DecisionTableProps) {
  return (
    <ScrollReveal>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <caption className="sr-only">Architecture decision trade-offs</caption>
          <thead>
            <tr className="border-b border-border-strong">
              <th scope="col" className="py-3 pr-4 text-left font-mono text-xs uppercase tracking-wider text-text-tertiary">
                Decision
              </th>
              <th scope="col" className="py-3 pr-4 text-left font-mono text-xs uppercase tracking-wider text-text-tertiary">
                Options
              </th>
              <th scope="col" className="py-3 pr-4 text-left font-mono text-xs uppercase tracking-wider text-text-tertiary">
                Choice
              </th>
              <th scope="col" className="py-3 text-left font-mono text-xs uppercase tracking-wider text-text-tertiary">
                Rationale
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.decision}
                className={i < rows.length - 1 ? "border-b border-border-subtle" : ""}
              >
                <td className="py-4 pr-4 align-top font-medium text-text-primary">
                  {row.decision}
                </td>
                <td className="py-4 pr-4 align-top text-text-secondary">{row.options}</td>
                <td className="py-4 pr-4 align-top">
                  <span className="inline-block rounded-sm bg-accent-subtle px-2 py-0.5 font-mono text-xs text-accent">
                    {row.choice}
                  </span>
                </td>
                <td className="py-4 align-top text-text-secondary">{row.rationale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScrollReveal>
  );
}
