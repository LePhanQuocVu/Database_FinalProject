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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Bill } from "@/types"

interface BillDetailProps {
    bill: Bill
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave?: (bill: Bill) => void
}

export function BillDetail({ bill: initialBill, open, onOpenChange, onSave }: BillDetailProps) {
    const [editedBill, setEditedBill] = useState<Bill>({ ...initialBill });
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        if (onSave) {
            onSave(editedBill);
        }
        setIsEditing(false);
        onOpenChange(false);
    };

    const handleChange = (field: keyof Bill, value: string) => {
        setEditedBill((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Chỉnh sửa hóa đơn" : `Chi tiết hóa đơn #${initialBill.Bill_ID}`}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? "Chỉnh sửa thông tin hóa đơn." : "Xem thông tin chi tiết của hóa đơn."}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="Bill_ID">Mã hóa đơn</Label>
                            <Input
                                id="Bill_ID"
                                value={editedBill.Bill_ID?.toString() || ''}
                                onChange={(e) => handleChange("Bill_ID", e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="Paid_date">Ngày thanh toán</Label>
                            <Input
                                id="Paid_date"
                                type="date"
                                value={editedBill.Paid_date}
                                onChange={(e) => handleChange("Paid_date", e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="Card_ID">Mã thẻ</Label>
                            <Input
                                id="Card_ID"
                                value={editedBill.Card_ID || ''}
                                onChange={(e) => handleChange("Card_ID", e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="Sale_SSN">Mã nhân viên BH</Label>
                            <Input
                                id="Sale_SSN"
                                value={editedBill.Sale_SSN || ''}
                                onChange={(e) => handleChange("Sale_SSN", e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="Balance_at_this_time">Số dư tại thời điểm</Label>
                            <Input
                                id="Balance_at_this_time"
                                value={editedBill.Balance_at_this_time?.toString() || ''}
                                onChange={(e) => handleChange("Balance_at_this_time", e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="Total_price">Tổng giá</Label>
                            <Input
                                id="Total_price"
                                value={editedBill.Total_price !== undefined ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(editedBill.Total_price) : ''}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="Rating">Đánh giá</Label>
                            <Input
                                id="Rating"
                                type="number"
                                value={editedBill.Rating?.toString() || ''}
                                onChange={(e) => handleChange("Rating", e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="Store_ID">Mã cửa hàng</Label>
                            <Input
                                id="Store_ID"
                                value={editedBill.Store_ID?.toString() || ''}
                                onChange={(e) => handleChange("Store_ID", e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="Comment">Ghi chú</Label>
                        <Input
                            id="Comment"
                            value={editedBill.Comment || ''}
                            onChange={(e) => handleChange("Comment", e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                </div>
                <DialogFooter className="flex justify-between sm:justify-end">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Đóng
                    </Button>
                    {isEditing ? (
                        <Button onClick={handleSave}>Lưu thay đổi</Button>
                    ) : (
                        <Button onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}