import { DataTable } from "@/components/data-table"
import { productColumns } from "@/components/dashboard/products/columns"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AddProductForm } from "@/components/dashboard/products/add-product-form"
import { products } from "@/data/products"

export default function ProductsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Sản phẩm" text="Quản lý danh sách sản phẩm của chuỗi nhà hàng.">
        <AddProductForm />
      </DashboardHeader>
      <div>
        <DataTable columns={productColumns} data={products} />
      </div>
    </DashboardShell>
  )
}
