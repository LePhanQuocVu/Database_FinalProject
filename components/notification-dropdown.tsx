"use client"
import { Bell } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { notifications } from "@/data/notifications"

export function NotificationDropdown() {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Thông báo</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">Không có thông báo nào</div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="cursor-pointer">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${notification.read ? "" : "font-bold"}`}>
                      {notification.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.date), {
                        addSuffix: true,
                        locale: vi,
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{notification.description}</p>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer justify-center text-center">Xem tất cả thông báo</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
