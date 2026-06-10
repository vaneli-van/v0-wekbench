"use client"

import Link from "next/link"
import { useLinkStatus } from "next/link"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Shows a small spinner while the destination route is loading.
 * Relies on Next.js `useLinkStatus`, which reports the pending state
 * of the nearest parent <Link> during client-side navigation.
 */
function PendingSpinner({ className }: { className?: string }) {
  const { pending } = useLinkStatus()
  return pending ? <Loader2 className={cn("size-3.5 shrink-0 animate-spin", className)} /> : null
}

export function NavLink({
  href,
  className,
  children,
  spinnerClassName,
}: {
  href: string
  className?: string
  children: React.ReactNode
  spinnerClassName?: string
}) {
  return (
    <Link href={href} className={className}>
      {children}
      <PendingSpinner className={spinnerClassName} />
    </Link>
  )
}
