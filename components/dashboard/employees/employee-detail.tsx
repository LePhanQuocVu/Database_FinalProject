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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Employee } from "@/types"

interface EmployeeDetailProps {
  employee: Employee
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (employee: Employee) => void
}

export function EmployeeDetail({ employee, open, onOpenChange, onSave }: EmployeeDetailProps) {
  const [editedEmployee, setEditedEmployee] = useState<Employee>({ ...employee })
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    if (onSave) {
      onSave(editedEmployee)
    }
    setIsEditing(false)
    onOpenChange(false)
  }

  const handleChange = (field: keyof Employee, value: string) => {
    setEditedEmployee((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Chỉnh sửa nhân viên" : "Chi tiết nhân viên"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Chỉnh sửa thông tin nhân viên." : "Xem thông tin chi tiết của nhân viên."}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Thông tin cá nhân</TabsTrigger>
            <TabsTrigger value="work">Thông tin công việc</TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl">{employee.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline" size="sm">
                  Thay đổi ảnh
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ssn">CMND/CCCD</Label>
                <Input
                  id="ssn"
                  value={editedEmployee.ssn}
                  onChange={(e) => handleChange("ssn", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Họ tên</Label>
                <Input
                  id="name"
                  value={editedEmployee.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editedEmployee.email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <Input
                id="address"
                value={editedEmployee.address}
                onChange={(e) => handleChange("address", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </TabsContent>
          <TabsContent value="work" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Chức vụ</Label>
                {isEditing ? (
                  <Select value={editedEmployee.role} onValueChange={(value) => handleChange("role", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn chức vụ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Quản lý">Quản lý</SelectItem>
                      <SelectItem value="Nhân viên bán hàng">Nhân viên bán hàng</SelectItem>
                      <SelectItem value="Nhân viên pha chế">Nhân viên pha chế</SelectItem>
                      <SelectItem value="Nhân viên kho">Nhân viên kho</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input id="role" value={editedEmployee.role} disabled />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch">Chi nhánh</Label>
                {isEditing ? (
                  <Select value={editedEmployee.branch} onValueChange={(value) => handleChange("branch", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn chi nhánh" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Chi nhánh Thủ Đức">Chi nhánh Thủ Đức</SelectItem>
                      <SelectItem value="Chi nhánh Quận 10">Chi nhánh Quận 10</SelectItem>
                      <SelectItem value="Chi nhánh Bình Dương">Chi nhánh Bình Dương</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input id="branch" value={editedEmployee.branch} disabled />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Ngày bắt đầu làm việc</Label>
              <Input
                id="startDate"
                type="date"
                value={editedEmployee.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </TabsContent>
        </Tabs>
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
