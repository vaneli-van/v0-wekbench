import { cn } from "@/lib/utils"

/**
 * The wekbench wordmark: "wek" in brand blue, "bench" in foreground.
 * Use `size` to scale the text. Defaults to small for navs/sidebars.
 */
export function Wordmark({
  className,
  size = "sm",
}: {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}) {
  const sizeClass = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl sm:text-4xl",
  }[size]

  return (
    <span
      className={cn(
        "font-semibold lowercase tracking-tight leading-none select-none",
        sizeClass,
        className,
      )}
    >
      <span className="text-primary">wek</span>
      <span className="text-foreground">bench</span>
    </span>
  )
}
