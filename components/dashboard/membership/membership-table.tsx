"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// import { membershipCards } from "@/data/membership-cards"
import { MembershipInfo } from "@/types"

export function MembershipTable() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [customer, setCustomer] = useState < MembershipInfo[] >([]);

  // const filteredCards = membershipCards.filter(
  //   (card) =>
  //     card.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     card.customerPhone.includes(searchTerm) ||
  //     card.id.toLowerCase().includes(searchTerm.toLowerCase()),
  // )
  
  // fetch dữ liệu về
  useEffect(() => {
    const getCus = async () => {
      const res = await fetch('http://localhost:3000/api/customers/listCustomers', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await res.json(); 
      const formatted: MembershipInfo[] = data.map((item: any) => ({
        customerName: `${item.FName} ${item.LName}`,
        customerPhone: item.Card_ID,
        points: item.Point,
        balance: item.Balance,
        rank: "Standard", // Gán mặc định hoặc xử lý theo logic khác nếu có
        regDate: new Date(item.Register_date),
      }));

      setCustomer(formatted);

    }
    getCus();
  }, [])

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
              <TableHead>Tên khách hàng</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Hạng</TableHead>
              <TableHead>Điểm</TableHead>
              <TableHead>Ngày tham gia</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customer.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Không tìm thấy thẻ thành viên nào
                </TableCell>
              </TableRow>
            ) : (
              customer.map((card) => (
                <TableRow key={card.customerPhone}>
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
                  <TableCell>{card.regDate.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    {/* <Button variant="ghost" size="sm" onClick={() => handleViewDetails(card.id)}>
                      Xem chi tiết
                    </Button> */}
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
