import { DataTable } from "@/components/data-table"
import { ingredientColumns } from "@/components/dashboard/ingredients/columns"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AddIngredientForm } from "@/components/dashboard/ingredients/add-ingredient-form"
import { ingredients } from "@/data/ingredients"

export default function IngredientsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Nguyên liệu" text="Quản lý danh sách nguyên liệu của chuỗi nhà hàng.">
        <AddIngredientForm />
      </DashboardHeader>
      <div>
        <DataTable columns={ingredientColumns} data={ingredients} />
      </div>
    </DashboardShell>
  )
}
