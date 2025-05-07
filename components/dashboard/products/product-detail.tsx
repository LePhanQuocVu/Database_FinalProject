"use client"

import { useState } from "react"
import Image from "next/image"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product } from "@/types"

interface ProductDetailProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (product: Product) => void
}

export function ProductDetail({ product, open, onOpenChange, onSave }: ProductDetailProps) {
  const [editedProduct, setEditedProduct] = useState<Product>({ ...product })
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    if (onSave) {
      onSave(editedProduct)
    }
    setIsEditing(false)
    onOpenChange(false)
  }

  const handleChange = (field: keyof Product, value: string) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Chỉnh sửa sản phẩm" : "Chi tiết sản phẩm"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Chỉnh sửa thông tin sản phẩm." : "Xem thông tin chi tiết của sản phẩm."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-[200px_1fr] gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-[200px] w-[200px] overflow-hidden rounded-md border">
              <Image
                src={product.image || "/placeholder.svg?height=200&width=200"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            {isEditing && (
              <Button variant="outline" size="sm" className="w-full">
                Thay đổi ảnh
              </Button>
            )}
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="id">Mã sản phẩm</Label>
                <Input
                  id="id"
                  value={editedProduct.id}
                  onChange={(e) => handleChange("id", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Loại sản phẩm</Label>
                {isEditing ? (
                  <Select value={editedProduct.type} onValueChange={(value) => handleChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại sản phẩm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Đồ uống">Đồ uống</SelectItem>
                      <SelectItem value="Hàng đóng gói">Hàng đóng gói</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input id="type" value={editedProduct.type} disabled />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Tên sản phẩm</Label>
              <Input
                id="name"
                value={editedProduct.name}
                onChange={(e) => handleChange("name", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Giá (VNĐ)</Label>
              <Input
                id="price"
                value={editedProduct.price}
                onChange={(e) => handleChange("price", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={editedProduct.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                disabled={!isEditing}
                rows={3}
              />
            </div>
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
