"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Edit, Save, X } from "lucide-react"
import type { MembershipCard } from "@/types"

interface MembershipDetailProps {
  membership: MembershipCard
}

export function MembershipDetail({ membership }: MembershipDetailProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedMembership, setEditedMembership] = useState(membership)

  const handleChange = (field: keyof MembershipCard, value: string) => {
    setEditedMembership((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    // Trong thực tế, bạn sẽ gửi dữ liệu cập nhật đến server
    // Ở đây chúng ta giả lập bằng cách cập nhật trực tiếp
    Object.assign(membership, editedMembership)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedMembership(membership)
    setIsEditing(false)
  }

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "Platinum":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Gold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Silver":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Thông tin thẻ thành viên</CardTitle>
              <CardDescription>Thông tin chi tiết về thẻ thành viên và khách hàng.</CardDescription>
            </div>
            {isEditing ? (
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  <X className="mr-2 h-4 w-4" />
                  Hủy
                </Button>
                <Button variant="default" size="sm" onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Lưu
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">{membership.id}</p>
                    <p className="text-sm text-muted-foreground">Mã thẻ thành viên</p>
                  </div>
                </div>
                <Badge className={getRankColor(membership.rank)}>{membership.rank}</Badge>
              </div>

              <Separator />

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="customerName">Tên khách hàng</Label>
                  {isEditing ? (
                    <Input
                      id="customerName"
                      value={editedMembership.customerName}
                      onChange={(e) => handleChange("customerName", e.target.value)}
                    />
                  ) : (
                    <div className="rounded-md border border-input px-3 py-2">{membership.customerName}</div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="customerPhone">Số điện thoại</Label>
                  {isEditing ? (
                    <Input
                      id="customerPhone"
                      value={editedMembership.customerPhone}
                      onChange={(e) => handleChange("customerPhone", e.target.value)}
                    />
                  ) : (
                    <div className="rounded-md border border-input px-3 py-2">{membership.customerPhone}</div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      value={editedMembership.email || ""}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  ) : (
                    <div className="rounded-md border border-input px-3 py-2">
                      {membership.email || "Chưa cung cấp"}
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                  {isEditing ? (
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={editedMembership.dateOfBirth || ""}
                      onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                    />
                  ) : (
                    <div className="rounded-md border border-input px-3 py-2">
                      {membership.dateOfBirth ? formatDate(membership.dateOfBirth) : "Chưa cung cấp"}
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label>Ngày tham gia</Label>
                  <div className="rounded-md border border-input px-3 py-2">{formatDate(membership.joinDate)}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin điểm và ưu đãi</CardTitle>
            <CardDescription>Điểm tích lũy và ưu đãi hiện có của thành viên.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 rounded-lg border p-4 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Điểm tích lũy</p>
                  <p className="text-3xl font-bold">{membership.points}</p>
                  <p className="text-xs text-muted-foreground">
                    Tương đương {formatCurrency(membership.points * 1000)}
                  </p>
                </div>
                <div className="space-y-2 rounded-lg border p-4 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Số dư</p>
                  <p className="text-3xl font-bold">{formatCurrency(membership.balance)}</p>
                  <p className="text-xs text-muted-foreground">Có thể sử dụng để thanh toán</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Ưu đãi theo hạng thành viên</h3>
                <div className="space-y-2 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Hạng hiện tại:</span>
                    <Badge className={getRankColor(membership.rank)}>{membership.rank}</Badge>
                  </div>
                  <Separator className="my-2" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Giảm giá mỗi đơn hàng:</span>
                      <span className="font-medium">
                        {membership.rank === "Platinum"
                          ? "15%"
                          : membership.rank === "Gold"
                            ? "10%"
                            : membership.rank === "Silver"
                              ? "5%"
                              : "2%"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tích điểm:</span>
                      <span className="font-medium">1 điểm / 10,000đ</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quy đổi điểm:</span>
                      <span className="font-medium">1 điểm = 1,000đ</span>
                    </div>
                    {membership.rank === "Platinum" && (
                      <div className="flex justify-between">
                        <span>Ưu đãi sinh nhật:</span>
                        <span className="font-medium">Tặng 1 đồ uống miễn phí</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử giao dịch</CardTitle>
          <CardDescription>Lịch sử giao dịch và tích điểm của thành viên.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="purchase">Mua hàng</TabsTrigger>
              <TabsTrigger value="point_earning">Tích điểm</TabsTrigger>
              <TabsTrigger value="point_redemption">Đổi điểm</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <TransactionTable transactions={membership.transactions} />
            </TabsContent>
            <TabsContent value="purchase" className="mt-4">
              <TransactionTable transactions={membership.transactions.filter((t) => t.type === "purchase")} />
            </TabsContent>
            <TabsContent value="point_earning" className="mt-4">
              <TransactionTable transactions={membership.transactions.filter((t) => t.type === "point_earning")} />
            </TabsContent>
            <TabsContent value="point_redemption" className="mt-4">
              <TransactionTable transactions={membership.transactions.filter((t) => t.type === "point_redemption")} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function TransactionTable({ transactions }: { transactions: MembershipCard["transactions"] }) {
  if (transactions.length === 0) {
    return <div className="py-4 text-center text-muted-foreground">Không có giao dịch nào</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ngày</TableHead>
          <TableHead>Mô tả</TableHead>
          <TableHead>Loại</TableHead>
          <TableHead className="text-right">Số tiền</TableHead>
          <TableHead className="text-right">Điểm</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              {new Date(transaction.date).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  transaction.type === "purchase"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : transaction.type === "point_redemption"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                }
              >
                {transaction.type === "purchase"
                  ? "Mua hàng"
                  : transaction.type === "point_redemption"
                    ? "Đổi điểm"
                    : transaction.type === "point_earning"
                      ? "Tích điểm"
                      : transaction.type === "refund"
                        ? "Hoàn tiền"
                        : "Nạp tiền"}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(transaction.amount)}
            </TableCell>
            <TableCell className="text-right">
              {transaction.points !== undefined && transaction.points > 0 && `+${transaction.points}`}
              {transaction.points !== undefined && transaction.points < 0 && transaction.points}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
