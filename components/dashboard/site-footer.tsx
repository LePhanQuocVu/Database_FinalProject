import { cn } from "@/lib/utils"

interface SiteFooterProps {
  className?: string
}

export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-4 md:h-16 md:flex-row md:py-0">
        <div className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Bài tập lớn Hệ CSDL - Quản lý chuỗi nhà hàng Highlands Coffee
        </div>
      </div>
    </footer>
  )
}
