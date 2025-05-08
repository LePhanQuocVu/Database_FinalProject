'use client'
import { DataTable } from "@/components/data-table"
import { supplierColumns } from "@/components/dashboard/suppliers/columns"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AddIngredientForm } from "@/components/dashboard/ingredients/add-ingredient-form"
import { AddSupplierForm } from "@/components/dashboard/suppliers/add-suppliers-form"
import { useEffect, useState } from "react"
import { Supplier } from "@/types"
// import { suppliers } from "@/data/suppliers"
export default function SupplierPage() {

  const [suppliers, setSuppliers] = useState<Supplier[]>([])


  useEffect(() =>{
    const fetchSuppliers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/suppliers");
        if (!res.ok) throw new Error("Network response was not ok");
  
        const data = await res.json();
        console.log(data);
       setSuppliers(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchSuppliers();
  }, [])
  
  return (
    <DashboardShell>
      <DashboardHeader heading="Nhà cung cấp" text="Quản lý danh sách các nhà cung cấp nguyên liệu cho nhà hàng">
        <AddSupplierForm />
      </DashboardHeader>
      <div>
        <DataTable columns={supplierColumns} data={suppliers} />
      </div>
    </DashboardShell>
  )
}
