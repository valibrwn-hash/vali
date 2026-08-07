export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center pt-32">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-px w-24 animate-pulse bg-accent"
          role="status"
          aria-label="Loading"
        />
        <span className="font-mono text-xs text-text-tertiary">Loading</span>
      </div>
    </div>
  );
}
