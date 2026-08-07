import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">404</p>
      <h1 className="mt-4 font-serif text-4xl tracking-tight text-text-primary">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-sm bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
      >
        Return home
      </Link>
    </div>
  );
}
