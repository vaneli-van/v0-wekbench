"use client"

import { use, useState } from "react"
import { notFound } from "next/navigation"
import {
  CalendarClock,
  Building2,
  User,
  FileText,
  Download,
  ArrowRight,
  Boxes,
  Sparkles,
} from "lucide-react"

import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { Timeline } from "@/components/timeline"
import { LandedCostCalculator } from "@/components/landed-cost-calculator"
import { ProductMatching } from "@/components/product-matching"
import { QuoteBuilder } from "@/components/quote-builder"
import { CommunicationUpdates } from "@/components/communication-updates"
import { rfqs, timeline } from "@/lib/data"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "line-items", label: "Line Items" },
  { id: "matches", label: "Product Matches" },
  { id: "pricing", label: "Pricing" },
  { id: "quote", label: "Quote" },
  { id: "communication", label: "Communication & Updates" },
  { id: "documents", label: "Documents" },
  { id: "timeline", label: "Activity Timeline" },
]

export default function RFQDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ tab?: string }>
}) {
  const { id } = use(params)
  const { tab } = use(searchParams)
  const rfq = rfqs.find((r) => r.id === id)
  const [active, setActive] = useState(tab && tabs.some((t) => t.id === tab) ? tab : "overview")

  if (!rfq) return notFound()

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
      <PageHeader
        title={rfq.subject}
        breadcrumb={[
          { label: "RFQ Inbox", href: "/inbox" },
          { label: rfq.ref },
        ]}
        description={`${rfq.buyer} · ${rfq.ref}`}
        actions={<StatusBadge status={rfq.status} className="text-sm" />}
      />

      {/* Summary strip */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryCard icon={Building2} label="Buyer" value={rfq.buyer} sub={rfq.buyerContact} />
        <SummaryCard icon={CalendarClock} label="Deadline" value={rfq.deadline} sub={rfq.deadlineRelative} tone="warning" />
        <SummaryCard icon={Boxes} label="Line Items" value={`${rfq.lineItems.length}`} sub="extracted" />
        <SummaryCard icon={User} label="Est. Value" value={rfq.value} sub="indicative" />
      </div>

      {/* Next action banner */}
      <div className="mt-4 flex flex-col gap-3 rounded-xl border border-accent/20 bg-accent/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2.5">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" />
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-accent">Next Action</p>
            <p className="text-sm text-foreground">{rfq.nextAction}</p>
          </div>
        </div>
        <button
          onClick={() => setActive("matches")}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Continue workflow
          <ArrowRight className="size-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-6 border-b border-border">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "relative whitespace-nowrap px-3 py-2.5 text-sm font-medium transition-colors",
                active === t.id ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
              {active === t.id && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" aria-hidden />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {active === "overview" && <OverviewTab rfq={rfq} />}
        {active === "line-items" && <LineItemsTab rfq={rfq} />}
        {active === "matches" && <ProductMatching />}
        {active === "pricing" && <LandedCostCalculator />}
        {active === "quote" && <QuoteBuilder />}
        {active === "communication" && <CommunicationUpdates />}
        {active === "documents" && <DocumentsTab rfq={rfq} />}
        {active === "timeline" && (
          <div className="rounded-xl border border-border bg-card p-5 md:p-6">
            <Timeline events={timeline} />
          </div>
        )}
      </div>
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: React.ElementType
  label: string
  value: string
  sub: string
  tone?: "warning"
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </div>
      <p className="mt-1.5 truncate text-sm font-semibold text-foreground">{value}</p>
      <p className={cn("text-xs", tone === "warning" ? "text-warning" : "text-muted-foreground")}>{sub}</p>
    </div>
  )
}

function OverviewTab({ rfq }: { rfq: (typeof rfqs)[number] }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground">Request Summary</h3>
          <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 text-sm">
            <Field label="Buyer Company" value={rfq.buyer} />
            <Field label="Buyer Contact" value={rfq.buyerContact} />
            <Field label="Buyer Email" value={rfq.buyerEmail} />
            <Field label="RFQ Reference" value={rfq.ref} mono />
            <Field label="Received" value={rfq.receivedAt} />
            <Field label="Deadline" value={`${rfq.deadline} (${rfq.deadlineRelative})`} />
          </dl>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
          <div className="mt-4">
            <Timeline events={timeline.slice(0, 6)} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <DocumentCard rfq={rfq} />
      </div>
    </div>
  )
}

function LineItemsTab({ rfq }: { rfq: (typeof rfqs)[number] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-5 py-3">
        <Sparkles className="size-4 text-accent" />
        <h3 className="text-sm font-semibold text-foreground">Extracted Line Items</h3>
        <span className="text-xs text-muted-foreground">Auto-extracted from {rfq.document.name}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs text-muted-foreground">
            <tr>
              <th className="px-5 py-2.5 text-left font-medium">#</th>
              <th className="px-5 py-2.5 text-left font-medium">Description</th>
              <th className="px-5 py-2.5 text-left font-medium">Brand</th>
              <th className="px-5 py-2.5 text-left font-medium">Specification</th>
              <th className="px-5 py-2.5 text-right font-medium">Qty</th>
              <th className="px-5 py-2.5 text-right font-medium">Target Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rfq.lineItems.map((li, i) => (
              <tr key={li.id} className="hover:bg-muted/30">
                <td className="px-5 py-3 text-muted-foreground">{i + 1}</td>
                <td className="px-5 py-3 font-medium text-foreground">{li.description}</td>
                <td className="px-5 py-3 text-foreground">{li.brand}</td>
                <td className="px-5 py-3 text-muted-foreground">{li.spec}</td>
                <td className="px-5 py-3 text-right tabular-nums text-foreground">
                  {li.quantity} {li.unit}
                </td>
                <td className="px-5 py-3 text-right tabular-nums text-foreground">{li.targetPrice ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function DocumentsTab({ rfq }: { rfq: (typeof rfqs)[number] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DocumentCard rfq={rfq} />
    </div>
  )
}

function DocumentCard({ rfq }: { rfq: (typeof rfqs)[number] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground">Uploaded RFQ Document</h3>
      <div className="mt-3 flex items-center gap-3 rounded-lg border border-border bg-background p-3">
        <div className="flex size-10 items-center justify-center rounded-md bg-destructive/10 text-destructive">
          <FileText className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{rfq.document.name}</p>
          <p className="text-xs text-muted-foreground">{rfq.document.size}</p>
        </div>
        <button className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
          <Download className="size-4" />
          <span className="sr-only">Download</span>
        </button>
      </div>
    </div>
  )
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={cn("mt-0.5 text-foreground", mono && "font-mono text-xs")}>{value}</dd>
    </div>
  )
}
