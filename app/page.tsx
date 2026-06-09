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
  Plus,
} from "lucide-react"

import { StatusBadge } from "@/components/status-badge"
import { FxRatesCard } from "@/components/fx-rates-card"
import { ShippingRatesCard } from "@/components/shipping-rates-card"
import { dashboardStats, todaysPriorities, rfqs } from "@/lib/data"
import { cn } from "@/lib/utils"

const kpis = [
  { label: "Open RFQs", value: dashboardStats.openRfqs, icon: Inbox, href: "/inbox" },
  { label: "Due today", value: dashboardStats.rfqsDueToday, icon: CalendarClock, href: "/inbox", alert: true },
  {
    label: "Quotes awaiting approval",
    value: dashboardStats.quotesAwaitingApproval,
    icon: FileCheck2,
    href: "/quotes",
  },
  { label: "Orders in progress", value: dashboardStats.ordersInProgress, icon: Package, href: "/orders" },
  {
    label: "Invoices pending",
    value: dashboardStats.invoicesPending,
    icon: ReceiptText,
    href: "/invoices",
  },
  {
    label: "Buyer updates",
    value: dashboardStats.buyerUpdatesDetected,
    icon: MailWarning,
    href: "/rfq/RFQ-2026-0418?tab=communication",
  },
  {
    label: "Missing documents",
    value: dashboardStats.missingDocuments,
    icon: FileX2,
    href: "/documents",
    alert: true,
  },
]

const priorityDot: Record<string, string> = {
  warning: "bg-warning",
  info: "bg-info",
  accent: "bg-accent",
  danger: "bg-destructive",
}

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-12 pt-2 md:px-8">
      {/* Page intro + primary action */}
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
        <div>
          <p className="text-sm text-muted-foreground">Tuesday, 9 June 2026</p>
          <p className="mt-0.5 text-sm text-foreground">
            <span className="font-medium">{dashboardStats.openRfqs} open RFQs</span> ·{" "}
            {dashboardStats.rfqsDueToday} due today · {dashboardStats.quotesAwaitingApproval} quote awaiting approval ·{" "}
            {dashboardStats.ordersInProgress} orders in production
          </p>
        </div>
        <Link
          href="/inbox"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="size-4" />
          New RFQ
        </Link>
      </div>

      {/* Compact KPI strip */}
      <section
        aria-label="Key metrics"
        className="mt-5 grid grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-lg border border-border bg-card sm:grid-cols-4 lg:grid-cols-7 lg:divide-y-0"
      >
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Link
              key={kpi.label}
              href={kpi.href}
              className="group flex flex-col gap-2 p-4 transition-colors hover:bg-secondary/60"
            >
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Icon className="size-4" />
                <span className="text-[11px] font-medium uppercase tracking-wide">{kpi.label}</span>
              </div>
              <span
                className={cn(
                  "text-2xl font-semibold tabular-nums tracking-tight",
                  kpi.alert && kpi.value > 0 ? "text-destructive" : "text-foreground",
                )}
              >
                {kpi.value}
              </span>
            </Link>
          )
        })}
      </section>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Action queue */}
        <section className="overflow-hidden rounded-lg border border-border bg-card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold text-foreground">Action queue</h2>
            <span className="text-xs text-muted-foreground">Suggested next steps · you approve each action</span>
          </div>
          <ul className="divide-y divide-border">
            {todaysPriorities.map((p) => (
              <li key={p.id}>
                <Link
                  href={p.href}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary/50"
                >
                  <span className={cn("size-2 shrink-0 rounded-full", priorityDot[p.tone])} aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{p.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{p.detail}</p>
                  </div>
                  <span className="hidden shrink-0 items-center gap-1 text-xs font-medium text-primary sm:flex">
                    {p.action}
                    <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Open RFQs */}
        <section className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold text-foreground">Open RFQs</h2>
            <Link href="/inbox" className="text-xs font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {rfqs.map((rfq) => (
              <li key={rfq.id}>
                <Link href={`/rfq/${rfq.id}`} className="block px-4 py-3 transition-colors hover:bg-secondary/50">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{rfq.ref}</span>
                    <StatusBadge status={rfq.status} />
                  </div>
                  <p className="mt-1 truncate text-sm font-medium text-foreground">{rfq.buyer}</p>
                  <div className="mt-0.5 flex items-center justify-between text-xs">
                    <span className="font-medium tabular-nums text-foreground">{rfq.value}</span>
                    <span className="text-warning">{rfq.deadlineRelative}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Market data: FX + shipping */}
      <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <FxRatesCard />
        <ShippingRatesCard />
      </section>
    </div>
  )
}
