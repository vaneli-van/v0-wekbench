import Image from "next/image"
import { cn } from "@/lib/utils"

const RATIO = 2998 / 446

const heights = {
  sm: 20,
  md: 24,
  lg: 30,
  xl: 40,
} as const

/**
 * The official wekbench wordmark logo image.
 * Use `size` to scale it. Defaults to small for navs/sidebars.
 */
export function Wordmark({
  className,
  size = "sm",
}: {
  className?: string
  size?: keyof typeof heights
}) {
  const height = heights[size]
  const width = Math.round(height * RATIO)

  return (
    <Image
      src="/wekbench-logo.png"
      alt="wekbench"
      width={width}
      height={height}
      priority
      className={cn("h-auto w-auto select-none", className)}
      style={{ height, width }}
    />
  )
}
