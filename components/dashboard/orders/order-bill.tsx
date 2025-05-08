"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Trash2, Minus, Plus, Receipt, CreditCard } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import type { OrderItem } from "./order-system"
import type { MembershipInfo, Store } from "@/types"
import { Checkbox } from "@/components/ui/checkbox"

interface OrderBillProps {
  orderItems: OrderItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  subtotal: number
  discount: number
  pointsDiscount: number
  total: number
  customerName: string
  customerPhone: string
  employeeSSN: string
  SSNEnabled: boolean
  onCustomerNameChange: (name: string) => void
  onCustomerPhoneChange: (phone: string) => void
  onEmployeeSSNChange: (SSN: string) => void
  onSSNEnableChange: (Enable: boolean) => void
  paymentMethod: string
  onPaymentMethodChange: (method: string) => void
  onCheckout: () => void
  membershipInfo: MembershipInfo | null
  pointsToUse: number
  onUsePoints: (points: number) => void
  stores: Store[]
  selectedStore: Store
  onSelectStore: (store: Store) => void
}

export function OrderBill({
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  subtotal,
  discount,
  pointsDiscount,
  total,
  customerName,
  customerPhone,
  employeeSSN,
  SSNEnabled,
  onCustomerNameChange,
  onCustomerPhoneChange,
  onEmployeeSSNChange,
  onSSNEnableChange,
  paymentMethod,
  onPaymentMethodChange,
  onCheckout,
  membershipInfo,
  pointsToUse,
  onUsePoints,
  stores,
  selectedStore,
  onSelectStore,
}: OrderBillProps) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Receipt className="mr-2 h-5 w-5" />
          Hóa đơn
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <div className="mb-4">
          <Label htmlFor="store">Chi nhánh</Label>
          <Select
            value={selectedStore.id?.toString()}
            onValueChange={(value) => {
              const store = stores.find((s) => s.id === Number(value))
              if (store) onSelectStore(store)
            }}
          >
            <SelectTrigger id="store">
              <SelectValue placeholder="Chọn chi nhánh" />
            </SelectTrigger>
            <SelectContent>
              {stores.map((store) => (
                <SelectItem key={store.id} value={store.id?.toString()}>
                  {store.address}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="h-[250px] pr-4">
          {orderItems.length === 0 ? (
            <div className="flex h-20 items-center justify-center text-muted-foreground">
              Chưa có sản phẩm nào trong đơn hàng
            </div>
          ) : (
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between">
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium leading-none">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatter.format(Number(item.product.price))} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive"
                      onClick={() => onRemoveItem(item.product.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <Separator className="my-4" />

        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tạm tính</span>
            <span>{formatter.format(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Giảm giá</span>
            <span>-{formatter.format(discount)}</span>
          </div>
          {membershipInfo && pointsDiscount > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Điểm thành viên</span>
              <span>-{formatter.format(pointsDiscount)}</span>
            </div>
          )}
          <Separator className="my-2" />
          <div className="flex justify-between text-base font-medium">
            <span>Tổng cộng</span>
            <span>{formatter.format(total)}</span>
          </div>
        </div>

        <Separator className="my-4" />

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
          <div className="grid gap-2">
            {/* <Label htmlFor="employee-SSN">Mã nhân viên</Label> */}
            <div className="flex items-center justify-between">
              <Label htmlFor="employee-SSN">Mã nhân viên</Label>
              <div className="flex items-center gap-1">
                <Checkbox
                  id="enable-ssn"
                  checked={SSNEnabled}
                  onCheckedChange={(val) => onSSNEnableChange(Boolean(val))}
                />
                <Label htmlFor="enable-ssn" className="text-sm font-normal">
                  Bật nhập
                </Label>
              </div>
            </div>
            <Input
              id="employee-SSN"
              value={employeeSSN}
              onChange={(e) => onEmployeeSSNChange(e.target.value)}
              disabled={!SSNEnabled}
              placeholder="Nhập mã nhân viên"
            />
          </div>

          {membershipInfo && (
            <div className="rounded-md border p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="font-medium">Thẻ thành viên</span>
                </div>
                <Badge variant="outline">{membershipInfo.rank}</Badge>
              </div>
              <div className="mb-2 text-sm">
                <div className="flex justify-between">
                  <span>Điểm hiện có:</span>
                  <span>{membershipInfo.points}</span>
                </div>
                <div className="flex justify-between">
                  <span>Điểm sử dụng:</span>
                  <span>{pointsToUse}</span>
                </div>
                <div className="flex justify-between">
                  <span>Điểm tích lũy:</span>
                  <span>+{Math.floor(total / 10000)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="points-slider" className="text-xs">
                    Sử dụng điểm: {pointsToUse}
                  </Label>
                  <span className="text-xs text-muted-foreground">{formatter.format(pointsToUse * 1000)}</span>
                </div>
                <Slider
                  id="points-slider"
                  min={0}
                  max={membershipInfo.points}
                  step={1}
                  value={[pointsToUse]}
                  onValueChange={(value) => onUsePoints(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>{membershipInfo.points}</span>
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <Label>Phương thức thanh toán</Label>
            <RadioGroup value={paymentMethod} onValueChange={onPaymentMethodChange} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="cursor-pointer">
                  Tiền mặt
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="cursor-pointer">
                  Thẻ ngân hàng
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="momo" id="momo" />
                <Label htmlFor="momo" className="cursor-pointer">
                  Ví MoMo
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pb-6">
        <Button className="w-full" size="lg" onClick={onCheckout}>
          Thanh toán
        </Button>
      </CardFooter>
    </Card>
  )
}
