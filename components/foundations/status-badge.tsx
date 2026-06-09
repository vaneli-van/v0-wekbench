import { cn } from "@/lib/utils"

export type StatusVariant = "neutral" | "info" | "success" | "warning" | "error"

// Neutral grayscale system — variants are differentiated by weight/fill, not hue.
const variantClasses: Record<StatusVariant, string> = {
  neutral: "border-border bg-muted text-muted-foreground",
  info: "border-border bg-secondary text-secondary-foreground",
  success: "border-transparent bg-foreground text-background",
  warning: "border-foreground/40 bg-background text-foreground",
  error: "border-dashed border-foreground/50 bg-background text-foreground",
}

const dotClasses: Record<StatusVariant, string> = {
  neutral: "bg-muted-foreground/50",
  info: "bg-foreground/60",
  success: "bg-background",
  warning: "bg-foreground/70",
  error: "bg-foreground",
}

export function StatusBadge({
  children,
  variant = "neutral",
  dot = true,
  className,
}: {
  children: React.ReactNode
  variant?: StatusVariant
  dot?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        variantClasses[variant],
        className,
      )}
    >
      {dot ? <span className={cn("size-1.5 rounded-full", dotClasses[variant])} aria-hidden /> : null}
      {children}
    </span>
  )
}
