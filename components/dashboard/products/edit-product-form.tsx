"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import type { Product } from "@/types"

const formSchema = z.object({
  id: z.string().min(2, {
    message: "Mã sản phẩm phải có ít nhất 2 ký tự.",
  }),
  name: z.string().min(2, {
    message: "Tên sản phẩm phải có ít nhất 2 ký tự.",
  }),
  price: z.string().min(1, {
    message: "Vui lòng nhập giá sản phẩm.",
  }),
  type: z.enum(["Đồ uống", "Hàng đóng gói"], {
    required_error: "Vui lòng chọn loại sản phẩm.",
  }),
  description: z.string().optional(),
})

interface EditProductFormProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (product: Product) => void
}

export function EditProductForm({ product, open, onOpenChange, onSave }: EditProductFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type,
      description: product.description || "",
    },
  })

  // Cập nhật form khi product thay đổi
  useEffect(() => {
    form.reset({
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type,
      description: product.description || "",
    })
  }, [product, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Xử lý cập nhật sản phẩm ở đây
    if (onSave) {
      onSave({
        ...product,
        ...values,
      })
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
          <DialogDescription>Chỉnh sửa thông tin sản phẩm trong form bên dưới.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-[200px_1fr] gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-[200px] w-[200px] overflow-hidden rounded-md border">
              <Image
                src={product.image || "/placeholder.svg?height=200&width=200"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Thay đổi ảnh
            </Button>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã sản phẩm</FormLabel>
                      <FormControl>
                        <Input placeholder="DR_XXX hoặc PK_XXX" {...field} />
                      </FormControl>
                      <FormDescription>Mã định danh sản phẩm</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại sản phẩm</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại sản phẩm" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Đồ uống">Đồ uống</SelectItem>
                          <SelectItem value="Hàng đóng gói">Hàng đóng gói</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên sản phẩm</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên sản phẩm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá (VNĐ)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Nhập giá sản phẩm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Nhập mô tả sản phẩm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Hủy
                </Button>
                <Button type="submit">Lưu thay đổi</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
