"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Trash2, Minus, Plus } from "lucide-react"
import type { OrderItem } from "./order-page"

interface OrderSummaryProps {
  orderItems: OrderItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  subtotal: number
  discount: number
  total: number
  customerName: string
  customerPhone: string
  onCustomerNameChange: (name: string) => void
  onCustomerPhoneChange: (phone: string) => void
  onCheckout: () => void
}

export function OrderSummary({
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  subtotal,
  discount,
  total,
  customerName,
  customerPhone,
  onCustomerNameChange,
  onCustomerPhoneChange,
  onCheckout,
}: OrderSummaryProps) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Đơn hàng</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {orderItems.length === 0 ? (
          <div className="py-4 text-center text-muted-foreground">Chưa có sản phẩm nào trong đơn hàng</div>
        ) : (
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium">{item.product.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatter.format(Number(item.product.price))} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => onRemoveItem(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Separator />

        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span>Tạm tính</span>
            <span>{formatter.format(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Giảm giá</span>
            <span>-{formatter.format(discount)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Tổng cộng</span>
            <span>{formatter.format(total)}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="customer-name">Tên khách hàng</Label>
            <Input
              id="customer-name"
              value={customerName}
              onChange={(e) => onCustomerNameChange(e.target.value)}
              placeholder="Nhập tên khách hàng"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="customer-phone">Số điện thoại</Label>
            <Input
              id="customer-phone"
              value={customerPhone}
              onChange={(e) => onCustomerPhoneChange(e.target.value)}
              placeholder="Nhập số điện thoại"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" disabled={orderItems.length === 0} onClick={onCheckout}>
          Thanh toán
        </Button>
      </CardFooter>
    </Card>
  )
}
