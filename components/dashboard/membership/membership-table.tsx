"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { membershipCards } from "@/data/membership-cards"

export function MembershipTable() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCards = membershipCards.filter(
    (card) =>
      card.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.customerPhone.includes(searchTerm) ||
      card.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/membership/${id}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Tìm kiếm theo tên, số điện thoại hoặc mã thẻ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã thẻ</TableHead>
              <TableHead>Tên khách hàng</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Hạng</TableHead>
              <TableHead>Điểm</TableHead>
              <TableHead>Ngày tham gia</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCards.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Không tìm thấy thẻ thành viên nào
                </TableCell>
              </TableRow>
            ) : (
              filteredCards.map((card) => (
                <TableRow key={card.id}>
                  <TableCell className="font-medium">{card.id}</TableCell>
                  <TableCell>{card.customerName}</TableCell>
                  <TableCell>{card.customerPhone}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        card.rank === "Platinum"
                          ? "default"
                          : card.rank === "Gold"
                            ? "secondary"
                            : card.rank === "Silver"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {card.rank}
                    </Badge>
                  </TableCell>
                  <TableCell>{card.points}</TableCell>
                  <TableCell>{card.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleViewDetails(card.id)}>
                      Xem chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
