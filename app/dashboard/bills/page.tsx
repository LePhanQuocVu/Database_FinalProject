import { DataTable } from "@/components/data-table"
import { billColumns } from "@/components/dashboard/bills/columns"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AddBillForm } from "@/components/dashboard/bills/add-bill-form"
import { bills } from "@/data/bills"

export default function BillsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Hóa đơn" text="Quản lý danh sách hóa đơn của chuỗi nhà hàng.">
        <AddBillForm />
      </DashboardHeader>
      <div>
        <DataTable columns={billColumns} data={bills} />
      </div>
    </DashboardShell>
  )
}
