"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import { caseStudies } from "@/content/case-studies";
import { getSocialProfiles } from "@/lib/social-links";

type CommandPaletteProps = {
  open: boolean;
  session: number;
  onClose: () => void;
  onToggleTheme: () => void;
  onSetSolarTheme: () => void;
};

type CommandItem = {
  id: string;
  label: string;
  group: string;
  action: () => void;
  keywords?: string;
};

export function CommandPalette({
  open,
  session,
  onClose,
  onToggleTheme,
  onSetSolarTheme,
}: CommandPaletteProps) {
  const router = useRouter();
  const [queries, setQueries] = useState<Record<number, string>>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const query = queries[session] ?? "";

  const navigate = useCallback(
    (path: string) => {
      router.push(path);
      onClose();
      setQueries((prev) => ({ ...prev, [session]: "" }));
    },
    [router, onClose, session],
  );

  const items: CommandItem[] = [
    { id: "home", label: "Home", group: "Navigate", action: () => navigate("/") },
    { id: "work", label: "Work", group: "Navigate", action: () => navigate("/work") },
    ...caseStudies.map((cs) => ({
      id: cs.slug,
      label: cs.title,
      group: "Case Studies",
      keywords: cs.subtitle,
      action: () => navigate(`/work/${cs.slug}`),
    })),
    { id: "contact", label: "Contact", group: "Navigate", action: () => navigate("/contact") },
    {
      id: "message",
      label: "Send a message",
      group: "Actions",
      action: () => navigate("/contact#form"),
    },
    {
      id: "schedule",
      label: "Schedule a call",
      group: "Actions",
      action: () => navigate("/contact#calendar"),
    },
    {
      id: "theme",
      label: "Cycle theme (auto / light / dark)",
      group: "Actions",
      action: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: "theme-solar",
      label: "Use sunrise/sunset theme",
      group: "Actions",
      action: () => {
        onSetSolarTheme();
        onClose();
      },
    },
    {
      id: "email",
      label: `Copy email (${site.email})`,
      group: "Meta",
      action: async () => {
        try {
          await navigator.clipboard.writeText(site.email);
        } catch {
          const anchor = document.createElement("a");
          anchor.href = `mailto:${site.email}`;
          anchor.click();
        }
        onClose();
      },
    },
    ...getSocialProfiles(site).map((profile) => ({
      id: profile.label.toLowerCase(),
      label: profile.label,
      group: "Meta" as const,
      action: () => {
        window.open(profile.href, "_blank", "noopener,noreferrer");
        onClose();
      },
    })),
  ];

  const filtered = query
    ? items.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.keywords?.toLowerCase().includes(query.toLowerCase()),
      )
    : items;

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  const handleQueryChange = (value: string) => {
    setQueries((prev) => ({ ...prev, [session]: value }));
    setActiveIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault();
      filtered[activeIndex].action();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-text-primary/20 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-[20%] left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-lg border border-border-subtle bg-bg-elevated shadow-2xl"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search pages and actions..."
              className="w-full border-b border-border-subtle bg-transparent px-4 py-4 text-text-primary placeholder:text-text-tertiary focus:outline-none"
              autoFocus
              aria-label="Search commands"
            />
            <div className="max-h-80 overflow-y-auto p-2" role="listbox" aria-label="Command results">
              {filtered.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-text-tertiary">
                  No results found.
                </p>
              ) : (
                Object.entries(grouped).map(([group, groupItems]) => (
                  <div key={group} className="mb-2">
                    <p className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
                      {group}
                    </p>
                    {groupItems.map((item) => {
                      flatIndex++;
                      const idx = flatIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="option"
                          aria-selected={idx === activeIndex}
                          onClick={item.action}
                          className={cn(
                            "flex w-full items-center rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                            idx === activeIndex
                              ? "bg-accent-subtle text-text-primary"
                              : "text-text-secondary hover:bg-bg-secondary",
                          )}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) setSession((s) => s + 1);
          return !prev;
        });
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return {
    open,
    session,
    openPalette: () => {
      setSession((s) => s + 1);
      setOpen(true);
    },
    closePalette: () => setOpen(false),
    togglePalette: () => {
      setOpen((prev) => {
        if (!prev) setSession((s) => s + 1);
        return !prev;
      });
    },
  };
}
