"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Wordmark } from "@/components/wordmark"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid grid-cols-1 overflow-y-auto bg-background lg:grid-cols-2">
      {/* Left column: form */}
      <div className="flex flex-col px-6 py-8 sm:px-10 lg:px-16">
        {/* Wordmark */}
        <div className="flex items-center gap-2.5">
          <Wordmark size="md" />
        </div>

        {/* Form block, vertically centered */}
        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-sm py-10">
            {!submitted ? (
              <>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
                  Reset your password
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enter your email and we&apos;ll send you a link to reset your password.
                </p>

                <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="mt-2 gap-2"
                    disabled={!email.trim()}
                  >
                    Send reset link
                    <ArrowRight className="size-4" />
                  </Button>
                </form>

                <div className="mt-6 flex items-center gap-2">
                  <div className="flex-1 border-t border-border" />
                  <span className="text-xs text-muted-foreground">or</span>
                  <div className="flex-1 border-t border-border" />
                </div>

                <p className="mt-6 text-center text-sm">
                  <Link
                    href="/signin"
                    className="font-medium text-foreground transition-colors hover:text-primary"
                  >
                    Back to sign in
                  </Link>
                </p>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center text-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="size-6" />
                  </div>
                  <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground text-balance">
                    Check your email
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We&apos;ve sent a password reset link to <span className="font-medium text-foreground">{email}</span>. Follow the link to set a new password.
                  </p>
                </div>

                <div className="mt-8 rounded-lg border border-border bg-secondary/30 p-4">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Tip:</span> The link expires in 1 hour. If you don&apos;t see the email, check your spam folder or contact support.
                  </p>
                </div>

                <p className="mt-8 text-center text-sm">
                  <button
                    onClick={() => {
                      setEmail("")
                      setSubmitted(false)
                    }}
                    className="font-medium text-foreground transition-colors hover:text-primary"
                  >
                    Try another email
                  </button>
                </p>

                <div className="mt-6 flex items-center gap-2">
                  <div className="flex-1 border-t border-border" />
                  <span className="text-xs text-muted-foreground">or</span>
                  <div className="flex-1 border-t border-border" />
                </div>

                <p className="mt-6 text-center text-sm">
                  <Link
                    href="/signin"
                    className="font-medium text-foreground transition-colors hover:text-primary"
                  >
                    Back to sign in
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center border-t border-border py-4 text-xs text-muted-foreground">
          wekbench · wekbench.com · 2026
        </div>
      </div>

      {/* Right column: decorative panel */}
      <div className="relative hidden overflow-hidden border-l border-border bg-muted/40 lg:block">
        <ForgotPasswordPanel />
      </div>
    </div>
  )
}

const FORGOT_PASSWORD_VALUE_PROPS = [
  "Secure password reset in minutes",
  "24/7 support if you need help recovering your account",
  "Two-factor authentication for added security",
]

function ForgotPasswordPanel() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-secondary/20 via-muted/10 to-muted/30">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute right-0 top-0 size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 size-80 rounded-full bg-primary/[0.03] blur-3xl" />
      </div>
      <div className="relative flex h-full flex-col justify-between px-12 py-16">
        {/* Top spacer */}
        <div />
        
        {/* Center content */}
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              Account security
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground text-balance max-w-md">
              Get back to work securely
            </h2>
          </div>
          
          <ul className="flex flex-col gap-4">
            {FORGOT_PASSWORD_VALUE_PROPS.map((prop) => (
              <li key={prop} className="flex items-start gap-3 max-w-sm">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-3.5 stroke-[3]" />
                </span>
                <span className="text-sm leading-relaxed text-foreground/90">{prop}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Bottom security note */}
        <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/40 backdrop-blur-sm p-4 max-w-sm">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Check className="size-4 stroke-[3]" />
          </div>
          <div>
            <p className="text-xs font-medium text-foreground">Your account is safe</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              We never share your password. Reset links are secure and expire after 1 hour.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
