import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { OrderSystem } from "@/components/dashboard/orders/order-system"

export default function OrdersPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Đặt hàng" text="Tạo đơn hàng mới cho khách hàng." />
      <OrderSystem />
    </DashboardShell>
  )
}
