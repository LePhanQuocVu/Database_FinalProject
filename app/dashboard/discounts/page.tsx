'use client'
import { DataTable } from "@/components/data-table"
import { supplierColumns } from "@/components/dashboard/suppliers/columns"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AddIngredientForm } from "@/components/dashboard/ingredients/add-ingredient-form"
import { AddSupplierForm } from "@/components/dashboard/suppliers/add-suppliers-form"
import { useCallback, useEffect, useState } from "react"
import { Discount } from "@/types"
import { discountColumns } from "@/components/dashboard/discounts/columns"
import { AddDiscountForm } from "@/components/dashboard/discounts/add-discounts-form"
import { useToast } from "@/components/ui/use-toast"
export default function DiscountPage() {

  const [discounts, setDiscounts] = useState<Discount[]>([])
  const { toast } = useToast()
    
  useEffect(() =>{
    const fetchAllDiscounts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products/getAllDiscounts");
        if (!res.ok) throw new Error("Network response was not ok");
  
        const data = await res.json();
        console.log(data);
        setDiscounts(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchAllDiscounts();
  }, [])

    // Hàm này sẽ được gọi sau khi thêm discount thành công
    const handleAddDiscount = (newDiscount: Discount) => {
        setDiscounts((prevDiscounts) => [...prevDiscounts, newDiscount]);
      };
    
    
  return (
    <DashboardShell>
      <DashboardHeader heading="Thông tin giảm giá" text="Quản lý danh sách các mã giảm giá cho sản phẩm">
      <AddDiscountForm onAddDiscount={handleAddDiscount} />
      </DashboardHeader>
      <div>
        <DataTable columns={discountColumns} data={discounts} />
      </div>
      <button
      onClick={() =>
                toast({
                title: "Test",
                description: "Đây là thông báo test.",
                })
            }
            >
      Test Toast
    </button>
    </DashboardShell>
    
  )
}
