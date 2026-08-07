"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

const contextOptions = [
  "Consulting engagement",
  "Full-time opportunity",
  "Contract / freelance",
  "Collaboration",
  "Other",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState("");

  const validate = (data: FormData) => {
    const newErrors: Record<string, string> = {};
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;

    if (!name?.trim()) newErrors.name = "Name is required.";
    if (!email?.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Please enter a valid email.";
    if (!message?.trim()) newErrors.message = "Message is required.";
    else if (message.trim().length < 20)
      newErrors.message = "Message must be at least 20 characters.";

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const validationErrors = validate(data);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          context: data.get("context"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setStatusMessage("Message sent successfully. I'll respond within 48 hours.");
        form.reset();
        return;
      }

      if (response.status === 429) {
        setStatus("error");
        setStatusMessage("Too many attempts. Please wait a minute and try again.");
        return;
      }

      if (result.fallback && result.mailto) {
        window.location.href = result.mailto;
        setStatus("success");
        setStatusMessage("Opening your email client to send the message.");
        return;
      }

      setStatus("error");
      setStatusMessage(result.error || "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setStatusMessage(
        `Unable to send online. Please email directly at ${site.email}.`,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <div className="space-y-6">
        <div className="hidden" aria-hidden>
          <label htmlFor="website">Website</label>
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <Field label="Name" error={errors.name} required>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass(!!errors.name)}
          />
        </Field>

        <Field label="Email" error={errors.email} required>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass(!!errors.email)}
          />
        </Field>

        <Field label="Context" error={errors.context}>
          <select name="context" id="context" className={inputClass(false)}>
            {contextOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Message" error={errors.message} required>
          <textarea
            name="message"
            id="message"
            rows={5}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(inputClass(!!errors.message), "resize-y min-h-[120px]")}
            placeholder="Tell me about your project, team, or opportunity..."
          />
        </Field>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-sm bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Sending..." : "Send message"}
        </button>

        <div aria-live="polite" aria-atomic="true">
          {status === "success" && (
            <p className="text-sm text-accent">{statusMessage}</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {statusMessage}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const id = label.toLowerCase();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text-primary">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-sm border bg-bg-primary px-4 py-3 text-sm text-text-primary transition-colors",
    "placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent",
    hasError ? "border-red-500" : "border-border-subtle",
  );
}
