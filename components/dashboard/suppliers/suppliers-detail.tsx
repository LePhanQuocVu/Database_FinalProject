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
import { Textarea } from "@/components/ui/textarea"
import type { Supplier } from "@/types"
interface SupplierDetailProps {
  supplier: Supplier
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (supplier: Supplier) => void
}

export function SupplierDetail({ supplier, open, onOpenChange, onSave }: SupplierDetailProps) {
  const [editedSupplier, setEditedSupplier] = useState<Supplier>({ ...supplier })
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    if (onSave) {
      onSave(editedSupplier)
    }
    setIsEditing(false)
    onOpenChange(false)
  }

  const handleChange = (field: keyof Supplier, value: string | number) => {
    setEditedSupplier((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>{isEditing ? "Chỉnh sửa nhà cung cấp" : "Chi tiết nhà cung cấp"}</DialogTitle>
        <DialogDescription>
          {isEditing
            ? "Chỉnh sửa thông tin nhà cung cấp."
            : "Xem thông tin chi tiết của nhà cung cấp."}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="id">Mã nhà cung cấp</Label>
            <Input
            id="id"
            type="number"
            value={editedSupplier.Supplier_ID}
            onChange={(e) => handleChange("Supplier_ID", Number(e.target.value))}
            disabled={!isEditing}
            />
        </div>

        <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
            id="phone"
            value={editedSupplier.Phone_number}
            onChange={(e) => handleChange("Phone_number", e.target.value)}
            disabled={!isEditing}
            />
        </div>

        <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
            id="email"
            type="email"
            value={editedSupplier.Email}
            onChange={(e) => handleChange("Email", e.target.value)}
            disabled={!isEditing}
            />
            </div>

            <div className="space-y-2">
                <Label htmlFor="name">Tên nhà cung cấp</Label>
                <Input
                id="name"
                value={editedSupplier.Name}
                onChange={(e) => handleChange("Name", e.target.value)}
                disabled={!isEditing}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                id="address"
                value={editedSupplier.Address}
                onChange={(e) => handleChange("Address", e.target.value)}
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
