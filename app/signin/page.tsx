"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 6.68 9.14 4.75 12 4.75Z"
      />
    </svg>
  )
}

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="fixed inset-0 z-50 grid grid-cols-1 overflow-y-auto bg-background lg:grid-cols-2">
      {/* Left column: form */}
      <div className="flex flex-col px-6 py-8 sm:px-10 lg:px-16">
        {/* Wordmark */}
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </div>
          <span className="text-base font-semibold tracking-tight text-foreground">ToolBox</span>
        </div>

        {/* Form block, vertically centered */}
        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-sm py-10">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
              Sign in to your workspace
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Continue to your vendor dashboard</p>

            <form
              className="mt-8 flex flex-col gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                <div className="flex justify-end">
                  <Link
                    href="#"
                    className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button type="submit" className="mt-1 w-full">
                Sign in
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">or</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <GoogleIcon className="size-4" />
              Sign in with Google
            </Button>

            {/* Footer link */}
            <p className="mt-8 text-center text-sm text-muted-foreground">
              New to ToolBox?{" "}
              <Link href="#" className="font-medium text-foreground underline-offset-4 hover:underline">
                Request access
              </Link>
            </p>
          </div>
        </div>

        {/* Small footer */}
        <p className="text-center text-xs text-muted-foreground lg:text-left">
          Western Premium · Toolbox.africa · 2026
        </p>
      </div>

      {/* Right column: decorative dashboard preview */}
      <div className="relative hidden overflow-hidden border-l border-border bg-muted/40 lg:block">
        <DashboardPreview />
      </div>
    </div>
  )
}

/* Decorative, non-interactive low-contrast preview of the dashboard. */
function DashboardPreview() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none"
    >
      {/* soft fade so the mock dissolves into the tint at the edges */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-transparent via-transparent to-muted/60" />

      <div className="absolute left-16 top-16 w-[140%] origin-top-left scale-[0.92] opacity-70">
        <div className="flex h-[640px] overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/5">
          {/* mock sidebar */}
          <div className="flex w-52 shrink-0 flex-col gap-1 border-r border-border bg-secondary/40 p-3">
            <div className="mb-3 flex items-center gap-2">
              <div className="size-7 rounded-md bg-primary/80" />
              <div className="h-3 w-20 rounded bg-foreground/20" />
            </div>
            <div className="mb-3 h-8 w-full rounded-md bg-foreground/5" />
            {["28%", "44%", "36%", "52%", "40%", "32%", "48%"].map((w, i) => (
              <div key={i} className="flex items-center gap-2 rounded-md px-2 py-2">
                <div className="size-3.5 rounded bg-foreground/15" />
                <div className="h-2.5 rounded bg-foreground/15" style={{ width: w }} />
              </div>
            ))}
          </div>

          {/* mock main */}
          <div className="flex-1 p-5">
            {/* topbar */}
            <div className="mb-5 flex items-center justify-between">
              <div className="h-4 w-40 rounded bg-foreground/20" />
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-md bg-foreground/10" />
                <div className="size-7 rounded-md bg-foreground/10" />
              </div>
            </div>

            {/* KPI strip */}
            <div className="mb-5 grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border border-border p-3">
                  <div className="mb-2 h-2.5 w-12 rounded bg-foreground/15" />
                  <div className="h-5 w-16 rounded bg-foreground/25" />
                </div>
              ))}
            </div>

            {/* table */}
            <div className="rounded-lg border border-border">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="h-3 w-24 rounded bg-foreground/20" />
                <div className="h-6 w-20 rounded-md bg-foreground/10" />
              </div>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 border-b border-border px-4 py-3 last:border-0">
                  <div className="size-4 rounded bg-foreground/10" />
                  <div className="h-2.5 flex-1 rounded bg-foreground/12" />
                  <div className="h-2.5 w-16 rounded bg-foreground/12" />
                  <div className="h-5 w-14 rounded-full bg-foreground/10" />
                  <div className="h-2.5 w-12 rounded bg-foreground/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
