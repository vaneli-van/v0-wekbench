"use client"

import { Save, Send, FileDown, Mail, Box, Paperclip } from "lucide-react"
import { quote } from "@/lib/data"
import { StatusBadge } from "@/components/status-badge"

export function QuoteBuilder() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
      {/* Live preview */}
      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Box className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Western Premium</p>
              <p className="text-[11px] text-muted-foreground">Authorized Technology Distributor</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Quotation</p>
            <p className="font-mono text-sm font-semibold text-foreground">
              {quote.ref} · {quote.version}
            </p>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 text-sm">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Prepared for</p>
              <p className="mt-1 font-medium text-foreground">{quote.buyer}</p>
              <p className="text-muted-foreground">{quote.contact}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                Date: <span className="text-foreground">{quote.date}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Valid until: <span className="text-foreground">{quote.validUntil}</span>
              </p>
              <div className="mt-1.5 flex justify-end">
                <StatusBadge status={quote.status} />
              </div>
            </div>
          </div>

          {/* Line items */}
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Item</th>
                  <th className="px-3 py-2 text-center font-medium">Qty</th>
                  <th className="px-3 py-2 text-right font-medium">Unit Price</th>
                  <th className="px-3 py-2 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {quote.lines.map((l) => (
                  <tr key={l.id}>
                    <td className="px-3 py-3">
                      <p className="font-medium text-foreground">{l.description}</p>
                      <p className="text-xs text-muted-foreground">{l.spec}</p>
                    </td>
                    <td className="px-3 py-3 text-center tabular-nums text-foreground">{l.quantity}</td>
                    <td className="px-3 py-3 text-right tabular-nums text-foreground">{l.unitPrice}</td>
                    <td className="px-3 py-3 text-right font-medium tabular-nums text-foreground">{l.total}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-muted/30 text-sm">
                <tr>
                  <td colSpan={3} className="px-3 py-2 text-right text-muted-foreground">
                    Subtotal
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-foreground">{quote.subtotal}</td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-3 py-2 text-right text-muted-foreground">
                    VAT (15%)
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-foreground">{quote.vat}</td>
                </tr>
                <tr className="border-t border-border">
                  <td colSpan={3} className="px-3 py-3 text-right font-semibold text-foreground">
                    Grand Total
                  </td>
                  <td className="px-3 py-3 text-right text-base font-semibold tabular-nums text-primary">
                    {quote.grandTotal}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Alternatives */}
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Alternative Options
            </p>
            <ul className="space-y-2">
              {quote.alternatives.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between rounded-lg border border-dashed border-border bg-background px-3 py-2.5 text-sm"
                >
                  <div>
                    <p className="font-medium text-foreground">{a.description}</p>
                    <p className="text-xs text-muted-foreground">{a.spec}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium tabular-nums text-foreground">{a.total}</p>
                    <p className="text-xs text-muted-foreground">{a.unitPrice}/unit</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Terms */}
          <div className="grid grid-cols-1 gap-4 border-t border-border pt-4 text-sm sm:grid-cols-2">
            <Term label="Delivery Terms" value={quote.deliveryTerms} />
            <Term label="Payment Terms" value={quote.paymentTerms} />
            <Term label="Warranty" value={quote.warranty} />
            <Term label="Validity" value={quote.validity} />
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
            <Paperclip className="size-3.5" />
            Attached: Dell-Latitude-5450-Datasheet.pdf, Warranty-Terms.pdf
          </div>
        </div>
      </div>

      {/* Actions */}
      <aside className="space-y-3 lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground">Quote Actions</h3>
          <div className="mt-3 space-y-2">
            <button className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              <Send className="size-4" />
              Send for Approval
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
              <Save className="size-4" />
              Save Draft
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
              <FileDown className="size-4" />
              Export PDF
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
              <Mail className="size-4" />
              Email Quote
            </button>
          </div>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Manager approval required before this quote can be sent to the buyer.
          </p>
        </div>
      </aside>
    </div>
  )
}

function Term({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-foreground text-pretty">{value}</p>
    </div>
  )
}
