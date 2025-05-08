"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import type { Discount } from "@/types"

interface DiscountDetailProps {
  discount: Discount
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (discount: Discount) => void
}

export function DiscountDetail({
  discount,
  open,
  onOpenChange,
  onSave,
}: DiscountDetailProps) {
  const [editedDiscount, setEditedDiscount] = useState<Discount>({ ...discount })
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    if (onSave) {
      onSave(editedDiscount)
    }
    setIsEditing(false)
    onOpenChange(false)
  }

  const handleChange = (field: keyof Discount, value: string | number) => {
    setEditedDiscount((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Chỉnh sửa mã giảm giá" : "Chi tiết mã giảm giá"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Chỉnh sửa thông tin mã giảm giá."
              : "Xem thông tin chi tiết mã giảm giá."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dis-id">Mã giảm giá</Label>
            <Input
              id="dis-id"
              type="number"
              value={editedDiscount.Dis_ID}
              onChange={(e) => handleChange("Dis_ID", Number(e.target.value))}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-id">Mã sản phẩm</Label>
            <Input
              id="product-id"
              value={editedDiscount.Product_ID}
              onChange={(e) => handleChange("Product_ID", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Tên mã giảm</Label>
            <Input
              id="name"
              value={editedDiscount.Name || ""}
              onChange={(e) => handleChange("Name", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount-price">Giá sau giảm</Label>
            <Input
              id="discount-price"
              type="number"
              step="0.001"
              value={editedDiscount.Discount_price ?? ""}
              onChange={(e) => handleChange("Discount_price", parseFloat(e.target.value))}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="start-date">Ngày bắt đầu</Label>
            <Input
              id="start-date"
              type="date"
              value={editedDiscount.Start_date || ""}
              onChange={(e) => handleChange("Start_date", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-date">Ngày kết thúc</Label>
            <Input
              id="end-date"
              type="date"
              value={editedDiscount.End_date || ""}
              onChange={(e) => handleChange("End_date", e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Hủy
              </Button>
              <Button onClick={handleSave}>Lưu thay đổi</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Đóng
              </Button>
              <Button onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
