import { cn } from "@/lib/utils"
import { statusLabels, statusTone, type BadgeTone } from "@/lib/data"

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-muted text-muted-foreground border-border",
  info: "bg-info/10 text-info border-info/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  danger: "bg-destructive/10 text-destructive border-destructive/20",
  accent: "bg-accent/10 text-accent border-accent/20",
}

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: string
  label?: string
  className?: string
}) {
  const tone = statusTone[status] ?? "neutral"
  const text = label ?? statusLabels[status] ?? status

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        toneClasses[tone],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {text}
    </span>
  )
}
