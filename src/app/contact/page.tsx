import type { Metadata } from "next";
import { ContactForm } from "@/components/content/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { isValidExternalUrl } from "@/lib/social-links";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} for consulting, full-time, or freelance opportunities.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact · ${site.name}`,
    description: `Get in touch with ${site.name} for consulting, full-time, or freelance opportunities.`,
    url: "/contact",
  },
};

export default function ContactPage() {
  const hasCalendar = isValidExternalUrl(site.calendarUrl);

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Contact
          </p>
          <h1 className="mt-4 font-serif text-4xl tracking-tight text-text-primary md:text-5xl">
            Start a conversation
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-text-secondary">
            Open to consulting engagements, full-time opportunities, and selective freelance
            projects. Choose how you&apos;d like to connect.
          </p>
          <p className="mt-4 font-mono text-sm text-accent">{site.availability}</p>
        </ScrollReveal>

        <div className="mt-20 grid gap-16 lg:grid-cols-2">
          {/* Form */}
          <ScrollReveal delay={0.1}>
            <div id="form">
              <h2 className="font-serif text-2xl text-text-primary">Send a message</h2>
              <p className="mt-2 text-sm text-text-secondary">
                For project inquiries, opportunities, or general questions.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </ScrollReveal>

          {/* Calendar */}
          <ScrollReveal delay={0.2}>
            <div id="calendar">
              <h2 className="font-serif text-2xl text-text-primary">Schedule a call</h2>
              <p className="mt-2 text-sm text-text-secondary">
                Pick a 30-minute slot to discuss your project or opportunity directly.
              </p>

              <div className="mt-8 rounded-sm border border-border-subtle bg-bg-elevated p-8">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-subtle">
                    <svg
                      className="h-7 w-7 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                      />
                    </svg>
                  </div>
                  <p className="mt-6 font-medium text-text-primary">Book a 30-minute call</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    {site.timezone} · Video or phone
                  </p>
                  {hasCalendar ? (
                    <a
                      href={site.calendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex rounded-sm bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                    >
                      Open calendar →
                    </a>
                  ) : (
                    <a
                      href={`mailto:${site.email}?subject=${encodeURIComponent("Schedule a call")}`}
                      className="mt-8 inline-flex rounded-sm bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                    >
                      Email to schedule →
                    </a>
                  )}
                </div>
              </div>

              <div className="mt-8 border-t border-border-subtle pt-8">
                <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
                  Direct contact
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 block text-lg text-accent transition-colors hover:text-accent-hover"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
