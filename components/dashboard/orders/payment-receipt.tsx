"use client"

import { useRef } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { PrinterIcon } from "lucide-react"
import type { OrderItem } from "./order-system"
import type { MembershipInfo } from "@/types"

interface PaymentReceiptProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  orderItems: OrderItem[]
  subtotal: number
  discount: number
  total: number
  customerName: string
  customerPhone: string
  paymentMethod: string
  receiptId: string
  membershipInfo?: MembershipInfo | null
  storeName: string
}

export function PaymentReceipt({
  open,
  onOpenChange,
  orderItems,
  subtotal,
  discount,
  total,
  customerName,
  customerPhone,
  paymentMethod,
  receiptId,
  membershipInfo,
  storeName,
}: PaymentReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null)

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })

  const paymentMethodMap: Record<string, string> = {
    cash: "Tiền mặt",
    card: "Thẻ ngân hàng",
    momo: "Ví MoMo",
  }

  const currentDate = new Date()
  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(currentDate)

  // Hàm in hóa đơn đơn giản
  const handlePrint = () => {
    const printContent = receiptRef.current?.innerHTML || ""
    const originalContents = document.body.innerHTML

    // Tạo style cho trang in
    const printStyles = `
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          max-width: 300px;
          margin: 0 auto;
          color: black;
          background-color: white;
        }
        .print-only {
          display: block !important;
        }
        @media print {
          body {
            width: 80mm;
            margin: 0;
            padding: 5mm;
            color: black;
            background-color: white;
          }
          * {
            color: black !important;
            background-color: white !important;
          }
        }
      </style>
    `

    // Thay đổi nội dung body để in
    document.body.innerHTML = printStyles + printContent

    // In
    window.print()

    // Khôi phục nội dung ban đầu
    document.body.innerHTML = originalContents

    // Đóng dialog
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Hóa đơn thanh toán</DialogTitle>
        </DialogHeader>

        <div ref={receiptRef} className="bg-background border rounded-md p-4 text-foreground">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="relative h-16 w-32">
              <Image
                src="/placeholder.svg?height=64&width=128"
                alt="Highlands Coffee Logo"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-lg font-bold">HIGHLANDS COFFEE</h2>
            <p className="text-sm font-medium">{storeName}</p>
            <p className="text-xs">Số 123 Đường ABC, Quận XYZ, TP.HCM</p>
            <p className="text-xs">Hotline: 1900 1234</p>
          </div>

          <Separator className="my-3" />

          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Mã hóa đơn:</span>
              <span>{receiptId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Ngày:</span>
              <span>{formattedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Khách hàng:</span>
              <span>{customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Số điện thoại:</span>
              <span>{customerPhone}</span>
            </div>
            {membershipInfo && (
              <div className="flex justify-between">
                <span className="font-medium">Thành viên:</span>
                <Badge variant="outline" className="font-normal">
                  {membershipInfo.rank}
                </Badge>
              </div>
            )}
          </div>

          <Separator className="my-3" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Sản phẩm</span>
              <span>Thành tiền</span>
            </div>
            {orderItems.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <div>
                  <div>{item.product.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatter.format(Number(item.product.price))} x {item.quantity}
                  </div>
                </div>
                <span>{formatter.format(Number(item.product.price) * item.quantity)}</span>
              </div>
            ))}
          </div>

          <Separator className="my-3" />

          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span>{formatter.format(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Giảm giá</span>
              <span>-{formatter.format(discount)}</span>
            </div>
            {membershipInfo && membershipInfo.pointsUsed > 0 && (
              <div className="flex justify-between">
                <span>Điểm thành viên sử dụng</span>
                <span>-{formatter.format(membershipInfo.pointsUsed * 1000)}</span>
              </div>
            )}
            <div className="flex justify-between font-medium">
              <span>Tổng cộng</span>
              <span>{formatter.format(total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Phương thức thanh toán</span>
              <span>{paymentMethodMap[paymentMethod] || paymentMethod}</span>
            </div>
            {membershipInfo && (
              <div className="flex justify-between">
                <span>Điểm tích lũy</span>
                <span>+{Math.floor(total / 10000)}</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-col items-center justify-center space-y-2">
            <div className="p-2 text-center">
              {/* Thay thế QR code bằng text đơn giản */}
              <div className="border border-border p-4 text-center bg-muted">
                <p className="text-sm font-medium">Mã QR đánh giá</p>
                <p className="text-xs text-muted-foreground">highlands.com/feedback</p>
              </div>
            </div>
            <p className="text-center text-xs">Quét mã QR để đánh giá dịch vụ</p>
          </div>

          <div className="mt-4 text-center text-xs">
            <p>Cảm ơn quý khách đã sử dụng dịch vụ!</p>
            <p>Hẹn gặp lại quý khách lần sau.</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
          <Button onClick={handlePrint}>
            <PrinterIcon className="mr-2 h-4 w-4" />
            In hóa đơn
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
