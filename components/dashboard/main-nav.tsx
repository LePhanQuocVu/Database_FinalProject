import Link from "next/link"
import { Coffee } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationDropdown } from "@/components/notification-dropdown"

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10 items-center justify-between w-full">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center space-x-2">
          <Coffee className="h-6 w-6" />
          <span className="inline-block font-bold">Highlands Coffee</span>
        </Link>
        <nav className="flex gap-6">
          <Link href="/dashboard" className="flex items-center text-sm font-medium text-muted-foreground">
            Dashboard
          </Link>
          <Link href="#" className="flex items-center text-sm font-medium text-muted-foreground">
            Cài đặt
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <NotificationDropdown />
        <ThemeToggle />
      </div>
    </div>
  )
}
