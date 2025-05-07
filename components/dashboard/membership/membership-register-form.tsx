"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"
import { membershipCards, calculateRank } from "@/data/membership-cards"
import type { MembershipCard } from "@/types"

const formSchema = z.object({
  customerName: z.string().min(2, {
    message: "Tên khách hàng phải có ít nhất 2 ký tự.",
  }),
  customerPhone: z
    .string()
    .min(10, {
      message: "Số điện thoại phải có ít nhất 10 số.",
    })
    .refine((value) => /^\d+$/.test(value), {
      message: "Số điện thoại chỉ được chứa các chữ số.",
    }),
  email: z
    .string()
    .email({
      message: "Email không hợp lệ.",
    })
    .optional()
    .or(z.literal("")),
  dateOfBirth: z.string().optional().or(z.literal("")),
})

export function MembershipRegisterForm() {
  const router = useRouter()
  const [success, setSuccess] = useState(false)
  const [newMemberId, setNewMemberId] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      email: "",
      dateOfBirth: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Kiểm tra xem số điện thoại đã tồn tại chưa
      const existingMember = membershipCards.find((card) => card.customerPhone === values.customerPhone)
      if (existingMember) {
        form.setError("customerPhone", {
          type: "manual",
          message: "Số điện thoại này đã được đăng ký thẻ thành viên.",
        })
        return
      }

      // Tạo ID mới cho thẻ thành viên
      const newId = `MEM-${(membershipCards.length + 1).toString().padStart(3, "0")}`
      setNewMemberId(newId)

      // Tạo thẻ thành viên mới
      const newMembershipCard: MembershipCard = {
        id: newId,
        customerName: values.customerName,
        customerPhone: values.customerPhone,
        email: values.email || undefined,
        dateOfBirth: values.dateOfBirth || undefined,
        joinDate: new Date().toISOString().split("T")[0],
        points: 0,
        balance: 0,
        rank: calculateRank(0),
        transactions: [],
      }

      // Thêm thẻ mới vào danh sách
      membershipCards.push(newMembershipCard)

      // Hiển thị thông báo thành công
      setSuccess(true)

      // Sau 2 giây, chuyển hướng đến trang chi tiết thẻ
      setTimeout(() => {
        router.push(`/dashboard/membership/${newId}`)
      }, 2000)
    } catch (error) {
      console.error("Lỗi khi đăng ký thẻ thành viên:", error)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Đăng ký thẻ thành viên</CardTitle>
        <CardDescription>Nhập thông tin khách hàng để đăng ký thẻ thành viên mới.</CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Đăng ký thành công!</AlertTitle>
            <AlertDescription>
              Đã đăng ký thẻ thành viên mới với mã {newMemberId}. Đang chuyển hướng đến trang chi tiết...
            </AlertDescription>
          </Alert>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên khách hàng</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên khách hàng" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập số điện thoại" {...field} />
                    </FormControl>
                    <FormDescription>Số điện thoại sẽ được dùng để đăng nhập vào tài khoản thành viên.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (tùy chọn)</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngày sinh (tùy chọn)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <CardFooter className="flex justify-end gap-2 px-0">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Hủy
                </Button>
                <Button type="submit">Đăng ký</Button>
              </CardFooter>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}
