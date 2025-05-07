"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Tag } from "lucide-react"
import type { Discount } from "./order-system"

interface DiscountSectionProps {
  discounts: Discount[]
  onApplyDiscount: (code: string) => void
  onRemoveDiscount: () => void
}

export function DiscountSection({ discounts, onApplyDiscount, onRemoveDiscount }: DiscountSectionProps) {
  const activeDiscount = discounts.find((discount) => discount.applied)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="h-4 w-4" />
          <CardTitle className="text-base">Mã giảm giá</CardTitle>
        </div>

        {activeDiscount ? (
          <div className="flex items-center justify-between rounded-md border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950">
            <div>
              <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                {activeDiscount.code}
              </Badge>
              <p className="mt-1 text-sm">Giảm {activeDiscount.percentage}% tổng đơn hàng</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onRemoveDiscount}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Chọn một mã giảm giá để áp dụng cho đơn hàng:</p>
            <div className="flex flex-wrap gap-2">
              {discounts.map((discount) => (
                <Button key={discount.code} variant="outline" size="sm" onClick={() => onApplyDiscount(discount.code)}>
                  {discount.code} ({discount.percentage}%)
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
