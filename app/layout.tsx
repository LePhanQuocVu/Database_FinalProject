import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/ui/toast" // Import ToastProvider
import { Toaster } from "@/components/ui/toaster"     // Import Toaster

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Highlands Coffee - Quản lý chuỗi nhà hàng",
  description: "Hệ thống quản lý chuỗi nhà hàng Highlands Coffee",
  generator: 'Quocvu'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ToastProvider> {/* Bọc toàn bộ app trong ToastProvider */}
            {children}
            <Toaster />   {/*  Hiển thị giao diện toast */}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
