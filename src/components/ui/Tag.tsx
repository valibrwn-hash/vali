import { cn } from "@/lib/cn";

type TagProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "mono";
};

export function Tag({ children, className, variant = "default" }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2.5 py-1 text-xs tracking-wide",
        variant === "mono" && "font-mono uppercase",
        variant === "default" &&
          "bg-accent-subtle text-accent font-medium",
        className,
      )}
    >
      {children}
    </span>
  );
}
