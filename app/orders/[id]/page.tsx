import { use } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  Package,
  FileText,
  Truck,
  CalendarClock,
  Building2,
  ReceiptText,
  MapPin,
  ArrowRight,
  CircleCheck,
} from "lucide-react"

import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { orders } from "@/lib/data"
import { cn } from "@/lib/utils"

const fulfillmentSteps = [
  { label: "PO Received", done: true },
  { label: "Order Created", done: true },
  { label: "Supplier Order Placed", done: true },
  { label: "In Production / Picking", done: true },
  { label: "Shipped", done: false },
  { label: "Customs Clearance", done: false },
  { label: "Delivered", done: false },
  { label: "Invoiced", done: false },
]

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const order = orders.find((o) => o.id === id)
  if (!order) return notFound()

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
      <PageHeader
        title={order.description}
        breadcrumb={[{ label: "Orders", href: "/orders" }, { label: order.id }]}
        description={`${order.buyer} · PO ${order.poNumber}`}
        actions={<StatusBadge status={order.status} className="text-sm" />}
      />

      {/* Summary strip */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Summary icon={ReceiptText} label="Buyer PO" value={order.poNumber} />
        <Summary icon={FileText} label="Linked Quote" value={order.quoteRef} href={`/quotes`} />
        <Summary icon={CalendarClock} label="Expected Delivery" value={order.expectedDelivery} />
        <Summary icon={Building2} label="Order Value" value={order.value} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Order timeline */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground">Order Timeline</h3>
            <ol className="mt-4 space-y-0">
              {fulfillmentSteps.map((step, i) => {
                const isCurrent = !step.done && (i === 0 || fulfillmentSteps[i - 1].done)
                const isLast = i === fulfillmentSteps.length - 1
                return (
                  <li key={step.label} className="relative flex gap-4 pb-5 last:pb-0">
                    {!isLast && (
                      <span
                        className={cn(
                          "absolute left-[11px] top-6 h-[calc(100%-0.5rem)] w-px",
                          step.done ? "bg-success/40" : "bg-border",
                        )}
                        aria-hidden
                      />
                    )}
                    <div
                      className={cn(
                        "relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2",
                        step.done
                          ? "border-success/30 bg-success/10 text-success"
                          : isCurrent
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-border bg-card text-muted-foreground",
                      )}
                    >
                      {step.done && <CircleCheck className="size-3.5" />}
                    </div>
                    <p
                      className={cn(
                        "pt-0.5 text-sm",
                        step.done
                          ? "font-medium text-foreground"
                          : isCurrent
                            ? "font-medium text-accent"
                            : "text-muted-foreground",
                      )}
                    >
                      {step.label}
                      {isCurrent && <span className="ml-2 text-xs text-accent">In progress</span>}
                    </p>
                  </li>
                )
              })}
            </ol>
          </div>

          {/* Shipment tracking */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <Truck className="size-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">Shipment Tracking</h3>
            </div>
            <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              <Field label="Carrier" value={order.shipment.carrier} />
              <Field label="Tracking Number" value={order.shipment.tracking} mono />
              <Field label="Current Status" value={order.shipment.status} />
              <Field label="ETA" value={order.shipment.eta} />
            </dl>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
              <MapPin className="size-3.5" />
              Last update {order.orderedAt} · Supplier: {order.supplierStatus}
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground">Invoice</h3>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-border bg-background p-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-md bg-info/10 text-info">
                  <ReceiptText className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Invoice status</p>
                  <p className="text-xs text-muted-foreground">{order.id}</p>
                </div>
              </div>
              <StatusBadge status={order.invoiceStatus} />
            </div>
            <Link
              href="/invoices"
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Generate Invoice & Documents
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground">Linked Records</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Quote</span>
                <span className="font-mono text-xs text-foreground">{order.quoteRef}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Buyer PO</span>
                <span className="font-mono text-xs text-foreground">{order.poNumber}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Ordered</span>
                <span className="text-xs text-foreground">{order.orderedAt}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function Summary({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType
  label: string
  value: string
  href?: string
}) {
  const inner = (
    <>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </div>
      <p className="mt-1.5 truncate text-sm font-semibold text-foreground">{value}</p>
    </>
  )
  if (href) {
    return (
      <Link href={href} className="rounded-xl border border-border bg-card p-4 hover:border-primary/30">
        {inner}
      </Link>
    )
  }
  return <div className="rounded-xl border border-border bg-card p-4">{inner}</div>
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={cn("mt-0.5 text-foreground", mono && "font-mono text-xs")}>{value}</dd>
    </div>
  )
}
