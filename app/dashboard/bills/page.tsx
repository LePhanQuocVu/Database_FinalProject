'use client'

import { DataTable } from "@/components/data-table"
import { billColumns } from "@/components/dashboard/bills/columns"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AddBillForm } from "@/components/dashboard/bills/add-bill-form"
// import { bills } from "@/data/bills"
import { useEffect, useState } from "react"
import { Bill } from "@/types"
export default function BillsPage() {

  const [bills, setBills] = useState<Bill[]>([]);
  useEffect(() =>{
      const fetchAllBills = async () => {
        try {
          const res = await fetch("http://localhost:3000/api/orders/getAllbills");
          if (!res.ok) throw new Error("Network response was not ok");
    
          const data = await res.json();
          console.log(data);
          setBills(data);
        } catch (err) {
          console.error("Fetch error:", err);
        }
      };
      fetchAllBills();
    }, [])


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
