import { NextResponse } from "next/server";
import { site } from "@/content/site";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { getSiteUrl } from "@/lib/site-url";

const MAX_LENGTH = {
  name: 100,
  email: 254,
  message: 5000,
  context: 100,
};

function sanitize(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const allowed = [
    getSiteUrl(),
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ].filter(Boolean) as string[];

  return allowed.some((base) => origin === base || origin.startsWith(base));
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const contentType = request.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    return NextResponse.json({ error: "Invalid content type." }, { status: 415 });
  }

  try {
    const body = await request.json();

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const name = sanitize(body.name, MAX_LENGTH.name);
    const email = sanitize(body.email, MAX_LENGTH.email);
    const context = sanitize(body.context, MAX_LENGTH.context);
    const message = sanitize(body.message, MAX_LENGTH.message);

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }
    if (!message || message.length < 20) {
      return NextResponse.json(
        { error: "Message must be at least 20 characters." },
        { status: 400 },
      );
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (accessKey) {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          subject: `Portfolio inquiry: ${context || "General"}`,
          message,
          from_name: site.name,
          to: site.email,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        return NextResponse.json(
          { error: "Unable to send message. Please email directly." },
          { status: 502 },
        );
      }

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      {
        error: "Form delivery is not configured.",
        fallback: true,
        mailto: `mailto:${site.email}?subject=${encodeURIComponent(`Portfolio inquiry: ${context}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`,
      },
      { status: 503 },
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
