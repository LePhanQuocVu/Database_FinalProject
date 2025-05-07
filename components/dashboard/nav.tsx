"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DashboardNavProps {
  items: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function DashboardNav({ items }: DashboardNavProps) {
  const pathname = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <ScrollArea className="my-4 h-[calc(100vh-8rem)]">
      <div className="flex flex-col gap-2 p-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
              "justify-start gap-2",
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
    </ScrollArea>
  )
}
