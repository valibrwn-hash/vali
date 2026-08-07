"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

type SystemDiagramProps = {
  components: { id: string; label: string; description: string }[];
  className?: string;
};

export function SystemDiagram({ components, className }: SystemDiagramProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();

  const cols = 3;
  const rows = Math.ceil(components.length / cols);
  const nodeW = 160;
  const nodeH = 56;
  const gapX = 48;
  const gapY = 64;
  const padX = 40;
  const padY = 40;
  const width = padX * 2 + cols * nodeW + (cols - 1) * gapX;
  const height = padY * 2 + rows * nodeH + (rows - 1) * gapY;

  const positions = components.map((_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return {
      x: padX + col * (nodeW + gapX),
      y: padY + row * (nodeH + gapY),
    };
  });

  const connections: [number, number][] = [];
  for (let i = 0; i < components.length - 1; i++) {
    if (Math.floor(i / cols) === Math.floor((i + 1) / cols)) {
      connections.push([i, i + 1]);
    }
  }
  for (let i = 0; i < components.length - cols; i++) {
    connections.push([i, i + cols]);
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto w-full max-w-3xl"
        role="img"
        aria-label="System architecture diagram"
      >
        {connections.map(([from, to], i) => {
          const f = positions[from];
          const t = positions[to];
          const x1 = f.x + nodeW / 2;
          const y1 = f.y + nodeH / 2;
          const x2 = t.x + nodeW / 2;
          const y2 = t.y + nodeH / 2;
          const pathD = `M ${x1} ${y1} L ${x2} ${y2}`;

          return (
            <motion.path
              key={`conn-${i}`}
              d={pathD}
              fill="none"
              stroke="var(--ledger-line)"
              strokeWidth={1}
              initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
              animate={{ pathLength: isInView || prefersReducedMotion ? 1 : 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.8,
                delay: prefersReducedMotion ? 0 : i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
          );
        })}

        {components.map((comp, i) => {
          const pos = positions[i];
          return (
            <g key={comp.id}>
              <motion.rect
                x={pos.x}
                y={pos.y}
                width={nodeW}
                height={nodeH}
                rx={4}
                fill="var(--bg-elevated)"
                stroke="var(--border-subtle)"
                strokeWidth={1}
                initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
                animate={{ opacity: isInView || prefersReducedMotion ? 1 : 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  delay: prefersReducedMotion ? 0 : 0.3 + i * 0.08,
                }}
              />
              <motion.text
                x={pos.x + nodeW / 2}
                y={pos.y + nodeH / 2 - 4}
                textAnchor="middle"
                fill="var(--text-primary)"
                fontSize={11}
                fontWeight={500}
                fontFamily="var(--font-geist-sans)"
                initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
                animate={{ opacity: isInView || prefersReducedMotion ? 1 : 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  delay: prefersReducedMotion ? 0 : 0.4 + i * 0.08,
                }}
              >
                {comp.label}
              </motion.text>
              <motion.text
                x={pos.x + nodeW / 2}
                y={pos.y + nodeH / 2 + 12}
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize={9}
                fontFamily="var(--font-geist-mono)"
                initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
                animate={{ opacity: isInView || prefersReducedMotion ? 1 : 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  delay: prefersReducedMotion ? 0 : 0.45 + i * 0.08,
                }}
              >
                {comp.id.toUpperCase()}
              </motion.text>
            </g>
          );
        })}
      </svg>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {components.map((comp) => (
          <div key={comp.id} className="border-l-2 border-accent pl-4">
            <p className="font-mono text-xs uppercase tracking-wider text-text-tertiary">
              {comp.id}
            </p>
            <p className="mt-1 text-sm font-medium text-text-primary">{comp.label}</p>
            <p className="mt-1 text-sm text-text-secondary">{comp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
