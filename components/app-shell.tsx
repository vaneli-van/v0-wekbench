"use client"

import { usePathname } from "next/navigation"

import { AppSidebar } from "@/components/app-sidebar"
import { Topbar } from "@/components/topbar"

// Routes that render WITHOUT the app sidebar/topbar chrome (public marketing,
// auth, onboarding, and the public tracking page).
const chromelessRoutes = ["/", "/signin", "/signup", "/forgot-password", "/onboarding", "/demo"]
const chromelessPrefixes = ["/track"]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isChromeless =
    chromelessRoutes.includes(pathname) || chromelessPrefixes.some((p) => pathname.startsWith(p))

  if (isChromeless) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-background">{children}</main>
      </div>
    </div>
  )
}
