import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { MembershipRegisterForm } from "@/components/dashboard/membership/membership-register-form"

export default function MembershipRegisterPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Đăng ký thẻ thành viên" text="Đăng ký thẻ thành viên mới cho khách hàng." />
      <div className="mx-auto max-w-2xl">
        <MembershipRegisterForm />
      </div>
    </DashboardShell>
  )
}
