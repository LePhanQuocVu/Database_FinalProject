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
import type { Ingredient } from "@/types"

interface IngredientDetailProps {
  ingredient: Ingredient
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (ingredient: Ingredient) => void
}

export function IngredientDetail({ ingredient, open, onOpenChange, onSave }: IngredientDetailProps) {
  const [editedIngredient, setEditedIngredient] = useState<Ingredient>({ ...ingredient })
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    if (onSave) {
      onSave(editedIngredient)
    }
    setIsEditing(false)
    onOpenChange(false)
  }

  const handleChange = (field: keyof Ingredient, value: string | number) => {
    setEditedIngredient((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Chỉnh sửa nguyên liệu" : "Chi tiết nguyên liệu"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Chỉnh sửa thông tin nguyên liệu." : "Xem thông tin chi tiết của nguyên liệu."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">Mã nguyên liệu</Label>
              <Input
                id="id"
                type="number"
                value={editedIngredient.id}
                onChange={(e) => handleChange("id", Number.parseInt(e.target.value))}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Tồn kho</Label>
              <Input
                id="stock"
                type="number"
                value={editedIngredient.stock}
                onChange={(e) => handleChange("stock", Number.parseInt(e.target.value))}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Tên nguyên liệu</Label>
            <Input
              id="name"
              value={editedIngredient.name}
              onChange={(e) => handleChange("name", e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supplier">Nhà cung cấp</Label>
            <Input
              id="supplier"
              value={editedIngredient.supplier}
              onChange={(e) => handleChange("supplier", e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              value={editedIngredient.description}
              onChange={(e) => handleChange("description", e.target.value)}
              disabled={!isEditing}
              rows={3}
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
