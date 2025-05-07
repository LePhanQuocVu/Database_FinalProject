import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { MembershipTable } from "@/components/dashboard/membership/membership-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function MembershipPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Thẻ thành viên" text="Quản lý thẻ thành viên của khách hàng.">
        <Button asChild>
          <Link href="/dashboard/membership/register">
            <PlusCircle className="mr-2 h-4 w-4" />
            Đăng ký thẻ mới
          </Link>
        </Button>
      </DashboardHeader>
      <div>
        <MembershipTable />
      </div>
    </DashboardShell>
  )
}
