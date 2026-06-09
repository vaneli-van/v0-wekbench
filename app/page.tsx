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
  Plus,
  Download,
} from "lucide-react"

import { StatusBadge } from "@/components/status-badge"
import { FxRatesCard } from "@/components/fx-rates-card"
import { ShippingRatesCard } from "@/components/shipping-rates-card"
import { dashboardStats, todaysPriorities, rfqs } from "@/lib/data"
import { cn } from "@/lib/utils"

const kpis = [
  { label: "Open RFQs", value: dashboardStats.openRfqs, icon: Inbox, href: "/inbox", tone: "info" },
  { label: "Due Today", value: dashboardStats.rfqsDueToday, icon: CalendarClock, href: "/inbox", tone: "warning" },
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
    label: "Buyer Updates",
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
  {
    label: "RFQ Inbox Queue",
    value: 3,
    icon: Inbox,
    href: "/inbox",
    tone: "info",
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

const tabs = ["Overview", "Pipeline", "Documents", "Market"]

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-10 md:px-8">
      {/* Tabs + actions row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                i === 0 ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
            <Download className="size-4" />
            Export
          </button>
          <Link
            href="/inbox"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <Plus className="size-4" />
            New RFQ
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative mt-5 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-emerald-700 p-7 md:p-9">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            <Sparkles className="size-3.5" />
            Vendor Workspace
          </span>
          <h2 className="mt-4 text-pretty text-3xl font-bold leading-tight text-white md:text-4xl">
            Good morning, Samuel — your pipeline is moving.
          </h2>
          <p className="mt-2 max-w-xl text-pretty text-teal-50/90">
            Tuesday, 9 June 2026. You have 3 RFQs in the inbox, 1 quote awaiting approval, and 2 orders in
            production. Here&apos;s what needs your attention today.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/inbox"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-teal-700 transition-transform hover:scale-[1.02]"
            >
              <Inbox className="size-4" />
              Process RFQ Inbox
            </Link>
            <Link
              href="/reports"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Reports
            </Link>
          </div>
        </div>
        {/* concentric circles artwork */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 md:block"
        >
          <div className="relative size-80">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute inset-0 m-auto rounded-full bg-white"
                style={{
                  width: `${100 - i * 22}%`,
                  height: `${100 - i * 22}%`,
                  opacity: 0.08 + i * 0.06,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* KPI grid */}
      <section aria-label="Key metrics" className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Link
              key={kpi.label}
              href={kpi.href}
              className="group rounded-3xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className={cn("flex size-10 items-center justify-center rounded-2xl", toneRing[kpi.tone])}>
                  <Icon className="size-5" />
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground/30 transition-colors group-hover:text-primary" />
              </div>
              <p className="mt-4 text-3xl font-bold tabular-nums tracking-tight text-foreground">{kpi.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{kpi.label}</p>
            </Link>
          )
        })}
      </section>

      {/* Market data: FX + shipping */}
      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FxRatesCard />
        <ShippingRatesCard />
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Today's priorities */}
        <section className="lg:col-span-2 rounded-3xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-accent" />
              <h2 className="text-sm font-semibold text-foreground">Today&apos;s Priorities</h2>
            </div>
            <span className="text-xs text-muted-foreground">AI-suggested, you approve each action</span>
          </div>
          <ul className="divide-y divide-border">
            {todaysPriorities.map((p) => (
              <li key={p.id}>
                <Link href={p.href} className="flex items-stretch gap-4 px-6 py-4 transition-colors hover:bg-secondary/50">
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
        <section className="rounded-3xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-sm font-semibold text-foreground">Open RFQs</h2>
            <Link href="/inbox" className="text-xs font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {rfqs.map((rfq) => (
              <li key={rfq.id}>
                <Link href={`/rfq/${rfq.id}`} className="block px-6 py-4 transition-colors hover:bg-secondary/50">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{rfq.ref}</span>
                    <StatusBadge status={rfq.status} />
                  </div>
                  <p className="mt-1 truncate text-sm font-medium text-foreground">{rfq.buyer}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{rfq.subject}</p>
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
