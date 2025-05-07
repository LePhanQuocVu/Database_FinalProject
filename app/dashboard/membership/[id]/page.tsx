"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { MembershipDetail } from "@/components/dashboard/membership/membership-detail"
import { membershipCards } from "@/data/membership-cards"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import type { MembershipCard } from "@/types"

export default function MembershipDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [membership, setMembership] = useState<MembershipCard | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Trong thực tế, bạn sẽ gọi API để lấy dữ liệu
    const card = membershipCards.find((card) => card.id === params.id)
    setMembership(card || null)
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Chi tiết thẻ thành viên" text="Đang tải..." />
        <div className="flex items-center justify-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </DashboardShell>
    )
  }

  if (!membership) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Chi tiết thẻ thành viên" text="Không tìm thấy thẻ thành viên." />
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>Không tìm thấy thẻ thành viên với mã {params.id}.</AlertDescription>
        </Alert>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Thẻ thành viên - ${membership.customerName}`}
        text="Xem và quản lý thông tin thẻ thành viên."
      />
      <MembershipDetail membership={membership} />
    </DashboardShell>
  )
}
