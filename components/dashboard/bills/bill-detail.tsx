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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Bill } from "@/types"

interface BillDetailProps {
  bill: Bill
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (bill: Bill) => void
}

export function BillDetail({ bill, open, onOpenChange, onSave }: BillDetailProps) {
  const [editedBill, setEditedBill] = useState<Bill>({ ...bill })
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    if (onSave) {
      onSave(editedBill)
    }
    setIsEditing(false)
    onOpenChange(false)
  }

  const handleChange = (field: keyof Bill, value: string) => {
    setEditedBill((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Tính tổng tiền từ các mặt hàng
  const calculateTotal = () => {
    return bill.items.reduce((total, item) => {
      return total + Number(item.price) * item.quantity
    }, 0)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Chỉnh sửa hóa đơn" : "Chi tiết hóa đơn"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Chỉnh sửa thông tin hóa đơn." : "Xem thông tin chi tiết của hóa đơn."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">Mã hóa đơn</Label>
              <Input
                id="id"
                value={editedBill.id}
                onChange={(e) => handleChange("id", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Ngày</Label>
              <Input
                id="date"
                type="date"
                value={editedBill.date}
                onChange={(e) => handleChange("date", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Khách hàng</Label>
              <Input
                id="customer"
                value={editedBill.customer}
                onChange={(e) => handleChange("customer", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              {isEditing ? (
                <Select value={editedBill.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Đã thanh toán">Đã thanh toán</SelectItem>
                    <SelectItem value="Chờ thanh toán">Chờ thanh toán</SelectItem>
                    <SelectItem value="Đã hủy">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input id="status" value={editedBill.status} disabled />
              )}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Chi tiết đơn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã SP</TableHead>
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead className="text-right">Số lượng</TableHead>
                    <TableHead className="text-right">Đơn giá</TableHead>
                    <TableHead className="text-right">Thành tiền</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bill.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(Number(item.price))}
                      </TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(Number(item.price) * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <div></div>
            <div className="space-y-2 text-right">
              <div className="flex items-center justify-between gap-8">
                <Label>Tổng tiền:</Label>
                <span className="text-lg font-bold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(calculateTotal())}
                </span>
              </div>
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
              <div className="flex gap-2">
                <Button variant="outline">In hóa đơn</Button>
                <Button onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
              </div>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
