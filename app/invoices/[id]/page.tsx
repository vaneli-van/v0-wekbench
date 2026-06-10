import { notFound } from "next/navigation"
import { InvoiceGenerator } from "@/components/invoice-generator"
import { getInvoicePrefill } from "@/lib/invoice"
import { orders } from "@/lib/data"

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Accept either an order id (ORD-2026-0231), an invoice number (INV-2026-0231),
  // or "new" (defaults to the first order awaiting invoicing).
  let orderId = id
  if (id.startsWith("INV-")) orderId = `ORD-${id.replace("INV-", "")}`
  if (id === "new") orderId = orders[0].id

  const prefill = getInvoicePrefill(orderId)
  if (!prefill) notFound()

  return <InvoiceGenerator prefill={prefill} />
}
