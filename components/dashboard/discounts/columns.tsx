import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { DiscountDetail } from "./discounts-detail"
import { Discount } from "@/types"

export const discountColumns: ColumnDef<Discount>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Chọn tất cả"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Chọn dòng"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Dis_ID", 
    header: "Mã giảm giá",
    cell: ({ row }) => <div className="font-medium">{row.getValue("Dis_ID")}</div>,
  },
  {
    accessorKey: "Product_ID",
    header: "Mã sản phẩm",
    cell: ({ row }) => <div>{row.getValue("Product_ID")}</div>,
  },
  {
    accessorKey: "Name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Tên sản phẩm
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("Name")}</div>,
  },
  {
    accessorKey: "Discount_price",
    header: "Giá giảm",
    cell: ({ row }) => <div>{row.getValue("Discount_price")}₫</div>,
  },
  {
    accessorKey: "Start_date",
    header: "Bắt đầu",
    cell: ({ row }) => {
      const date = new Date(row.getValue("Start_date"))
      return <div>{date.toLocaleDateString("vi-VN")}</div>
    },
  },
  {
    accessorKey: "End_date",
    header: "Kết thúc",
    cell: ({ row }) => {
      const date = new Date(row.getValue("End_date"))
      return <div>{date.toLocaleDateString("vi-VN")}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const discount = row.original
      const [showDetail, setShowDetail] = useState(false)

      return (
        <>
          <DiscountDetail discount={discount} open={showDetail} onOpenChange={setShowDetail} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Mở menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(discount.Dis_ID.toString())}>
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowDetail(true)}>Xem chi tiết</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDetail(true)}>Chỉnh sửa</DropdownMenuItem>
              <DropdownMenuItem>Xóa</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
]
