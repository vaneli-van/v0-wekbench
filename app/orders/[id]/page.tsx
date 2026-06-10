import { use } from "react"
import { notFound } from "next/navigation"

import { orders } from "@/lib/data"
import { getOrderDetail } from "@/lib/order-detail"
import { OrderDetailClient } from "@/components/orders/order-detail-client"

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const order = orders.find((o) => o.id === id)
  if (!order) return notFound()

  const detail = getOrderDetail(order)
  return <OrderDetailClient order={order} detail={detail} />
}
