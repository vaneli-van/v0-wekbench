import Link from "next/link"
import {
  Inbox,
  CalendarClock,
  FileCheck2,
  Package,
  ReceiptText,
  MailWarning,
  FileX2,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react"

import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { dashboardStats, todaysPriorities, rfqs } from "@/lib/data"
import { cn } from "@/lib/utils"

const kpis = [
  { label: "Open RFQs", value: dashboardStats.openRfqs, icon: Inbox, href: "/inbox", tone: "info" },
  { label: "RFQs Due Today", value: dashboardStats.rfqsDueToday, icon: CalendarClock, href: "/inbox", tone: "warning" },
  {
    label: "Quotes Awaiting Approval",
    value: dashboardStats.quotesAwaitingApproval,
    icon: FileCheck2,
    href: "/quotes",
    tone: "warning",
  },
  { label: "Orders In Progress", value: dashboardStats.ordersInProgress, icon: Package, href: "/orders", tone: "info" },
  {
    label: "Invoices Pending",
    value: dashboardStats.invoicesPending,
    icon: ReceiptText,
    href: "/invoices",
    tone: "neutral",
  },
  {
    label: "Buyer Updates Detected",
    value: dashboardStats.buyerUpdatesDetected,
    icon: MailWarning,
    href: "/rfq/RFQ-2026-0418?tab=communication",
    tone: "accent",
  },
  {
    label: "Missing Documents",
    value: dashboardStats.missingDocuments,
    icon: FileX2,
    href: "/documents",
    tone: "danger",
  },
]

const toneRing: Record<string, string> = {
  info: "text-info bg-info/10",
  warning: "text-warning bg-warning/10",
  danger: "text-destructive bg-destructive/10",
  accent: "text-accent bg-accent/10",
  neutral: "text-muted-foreground bg-muted",
}

const priorityBar: Record<string, string> = {
  warning: "bg-warning",
  info: "bg-info",
  accent: "bg-accent",
  danger: "bg-destructive",
}

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
      <PageHeader
        title="Command Center"
        description="Wednesday, 9 June 2026 — Here is where your RFQ-to-Order pipeline stands right now."
        actions={
          <Link
            href="/inbox"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Inbox className="size-4" />
            Process RFQ Inbox
          </Link>
        }
      />

      {/* KPI grid */}
      <section aria-label="Key metrics" className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Link
              key={kpi.label}
              href={kpi.href}
              className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className={cn("flex size-9 items-center justify-center rounded-lg", toneRing[kpi.tone])}>
                  <Icon className="size-4.5" />
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground/40 transition-colors group-hover:text-primary" />
              </div>
              <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight text-foreground">{kpi.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{kpi.label}</p>
            </Link>
          )
        })}
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Today's priorities */}
        <section className="lg:col-span-2 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-accent" />
              <h2 className="text-sm font-semibold text-foreground">Today&apos;s Priorities</h2>
            </div>
            <span className="text-xs text-muted-foreground">AI-suggested, you approve each action</span>
          </div>
          <ul className="divide-y divide-border">
            {todaysPriorities.map((p) => (
              <li key={p.id}>
                <Link href={p.href} className="flex items-stretch gap-4 px-5 py-4 transition-colors hover:bg-muted/40">
                  <span className={cn("w-1 shrink-0 rounded-full", priorityBar[p.tone])} aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{p.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{p.detail}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 self-center text-sm font-medium text-primary">
                    {p.action}
                    <ArrowRight className="size-4" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Open RFQs snapshot */}
        <section className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">Open RFQs</h2>
            <Link href="/inbox" className="text-xs font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {rfqs.map((rfq) => (
              <li key={rfq.id}>
                <Link href={`/rfq/${rfq.id}`} className="block px-5 py-3.5 transition-colors hover:bg-muted/40">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{rfq.ref}</span>
                    <StatusBadge status={rfq.status} />
                  </div>
                  <p className="mt-1 truncate text-sm font-medium text-foreground">{rfq.buyer}</p>
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground truncate">{rfq.subject}</span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{rfq.value}</span>
                    <span className="text-warning">{rfq.deadlineRelative}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
