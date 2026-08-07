"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";

export function CoverSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[90vh] items-center pt-32 pb-24">
      <div className="absolute top-32 bottom-24 left-6 hidden w-px bg-ledger-line lg:left-[calc((100%-72rem)/2+2rem)] lg:block" aria-hidden />

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary"
          >
            Product Architect · Full-Stack Engineer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight text-text-primary sm:text-5xl md:text-7xl lg:text-8xl"
          >
            {site.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-6 text-xl text-text-secondary md:text-2xl"
          >
            {site.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-text-secondary"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <Link
              href="#work"
              className="rounded-sm bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              View selected work
            </Link>
            <Link
              href="/contact"
              className="rounded-sm border border-border-strong px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-bg-secondary"
            >
              Get in touch
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-20 flex items-center gap-3"
          >
            <span className="h-px w-12 bg-accent" aria-hidden />
            <span className="font-mono text-xs text-text-tertiary">{site.availability}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
