"use client"

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
import type { Bill } from "@/types"
 import { BillDetail } from "./bill-detail"

export const billColumns: ColumnDef<Bill>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Bill_ID",
    header: "Mã hóa đơn",
    cell: ({ row }) => <div className="font-medium">{row.getValue("Bill_ID")}</div>,
  },
  {
    accessorKey: "Paid_date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Ngày
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("Paid_date")}</div>,
  },
  {
    accessorKey: "Card_ID",
    header: "Khách hàng",
    cell: ({ row }) => <div>{row.getValue("Card_ID")}</div>,
  },
  {
    accessorKey: "Balance_at_this_time",
    header: "Số dư lúc đó",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("Balance_at_this_time"))
      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount)
      return <div className="text-right">{formatted}</div>
    },
  },
  
  {
    accessorKey: "Sale_SSN",
    header: "Mã nhân viên bán",
    cell: ({ row }) => <div>{row.getValue("Sale_SSN")}</div>,
  },
  
  {
    accessorKey: "Comment",
    header: "Ghi chú",
    cell: ({ row }) => {
      const comment = row.getValue("Comment") as string
      return <div className="line-clamp-1 text-sm text-muted-foreground">{comment || "—"}</div>
    },
  },
  
  {
    accessorKey: "Rating",
    header: "Đánh giá",
    cell: ({ row }) => {
      const rating = row.getValue("Rating")
      return <div>{rating ? String(rating) : "—"}</div>
    },
  },
  
  {
    accessorKey: "Total_price",
    header: "Thành tiền",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("Total_price"))
      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount)
      return <div className="text-right">{formatted}</div>
    },
  },
  
  {
    accessorKey: "Store_ID",
    header: "Chi nhánh",
    cell: ({ row }) => <div>{row.getValue("Store_ID")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const bill = row.original
      const [showDetail, setShowDetail] = useState(false)

      return (
        <>
          <BillDetail bill={bill} open={showDetail} onOpenChange={setShowDetail} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Mở menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(bill.Bill_ID.toString())}>Sao chép mã</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowDetail(true)}>Xem chi tiết</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDetail(true)}>Chỉnh sửa</DropdownMenuItem>
              <DropdownMenuItem>In hóa đơn</DropdownMenuItem>
              <DropdownMenuItem>Xóa</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
]
