import { DataTable } from "@/components/data-table"
import { employeeColumns } from "@/components/dashboard/employees/columns"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AddEmployeeForm } from "@/components/dashboard/employees/add-employee-form"
import { employees } from "@/data/employees"

export default function EmployeesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Nhân viên" text="Quản lý danh sách nhân viên của chuỗi nhà hàng.">
        <AddEmployeeForm />
      </DashboardHeader>
      <div>
        <DataTable columns={employeeColumns} data={employees} />
      </div>
    </DashboardShell>
  )
}
