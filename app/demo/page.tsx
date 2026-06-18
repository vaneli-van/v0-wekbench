'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Inbox, FileText, ShoppingCart, BarChart3, Settings, ArrowRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const TOUR_STEPS = [
  {
    icon: Inbox,
    title: 'Capture RFQs',
    description: 'Emails, PDFs, Excel files — all auto-captured and AI-classified in your inbox. We handle the messy inbound for you.',
  },
  {
    icon: FileText,
    title: 'Build Quotes',
    description: 'Turn RFQs into professional quotes in minutes. Multi-currency, margin-aware, with automatic FX handling.',
  },
  {
    icon: ShoppingCart,
    title: 'Track Orders',
    description: 'From quote acceptance to delivery. Orders timeline, supplier tracking, and customer notifications in one place.',
  },
  {
    icon: BarChart3,
    title: 'Analyze Results',
    description: 'Win rate, response time, revenue by category. Real dashboards for real procurement teams.',
  },
]

const QUICK_LINKS = [
  {
    label: 'View Dashboard',
    icon: BarChart3,
    href: '/dashboard',
    description: 'See the daily operations cockpit',
  },
  {
    label: 'Browse Inbox',
    icon: Inbox,
    href: '/inbox',
    description: 'Captured RFQs & auto-classification',
  },
  {
    label: 'Quote Pipeline',
    icon: FileText,
    href: '/quotes',
    description: 'Active quotes by stage',
  },
  {
    label: 'Orders & Tracking',
    icon: ShoppingCart,
    href: '/orders',
    description: 'Order timeline & delivery status',
  },
]

export default function DemoPage() {
  const [tourOpen, setTourOpen] = useState(false)
  const [tourStep, setTourStep] = useState(0)

  const currentStep = TOUR_STEPS[tourStep]
  const CurrentIcon = currentStep.icon

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border px-4 py-20 sm:px-8 md:py-32">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute right-0 top-0 size-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 size-80 rounded-full bg-primary/[0.03] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">Interactive Product Demo</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance mb-4">
            See wekbench in action
          </h1>
          <p className="text-lg text-muted-foreground text-balance mb-8 leading-relaxed">
            Respond to RFQs in seconds, not days. Watch how wekbench turns inbound procurement chaos into a streamlined, profitable process.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button size="lg" onClick={() => { setTourStep(0); setTourOpen(true) }}>
              Take a guided tour
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/signup">Start for free</Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            No credit card required. Set up in under 2 minutes.
          </p>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="px-4 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground text-balance mb-2">
              Explore the app
            </h2>
            <p className="text-muted-foreground">
              Click any screen to see live data and workflows. No login required.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {QUICK_LINKS.map((link) => {
              const LinkIcon = link.icon
              return (
                <Link key={link.href} href={link.href}>
                  <Card className="group h-full cursor-pointer border border-border/50 p-6 transition-all hover:border-primary/50 hover:shadow-md hover:bg-card/80">
                    <div className="flex items-start justify-between mb-4">
                      <div className="rounded-lg bg-primary/10 p-3 group-hover:bg-primary/15 transition-colors">
                        <LinkIcon className="size-6 text-primary" />
                      </div>
                      <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{link.label}</h3>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tour Modal */}
      <Dialog open={tourOpen} onOpenChange={setTourOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Feature walkthrough</DialogTitle>
            <DialogDescription>
              Step {tourStep + 1} of {TOUR_STEPS.length}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            {/* Progress dots */}
            <div className="flex gap-2 mb-6">
              {TOUR_STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTourStep(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    i === tourStep
                      ? 'bg-primary w-8'
                      : 'bg-border w-2 hover:bg-primary/50 cursor-pointer',
                  )}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            {/* Step content */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-xl bg-primary/10 p-4 mb-4">
                <CurrentIcon className="size-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{currentStep.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{currentStep.description}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setTourStep(Math.max(0, tourStep - 1))}
              disabled={tourStep === 0}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              variant="outline"
              onClick={() => setTourOpen(false)}
              className="flex-1"
            >
              Skip
            </Button>
            <Button
              onClick={() => {
                if (tourStep < TOUR_STEPS.length - 1) {
                  setTourStep(tourStep + 1)
                } else {
                  setTourOpen(false)
                }
              }}
              className="flex-1"
            >
              {tourStep === TOUR_STEPS.length - 1 ? 'Done' : 'Next'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
