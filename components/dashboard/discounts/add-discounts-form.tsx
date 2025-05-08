"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CalendarIcon, PlusCircle } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import { useToast } from "@/hooks/use-toast"
import { Discount } from "@/types"

interface AddDiscountFormProps {
  onAddDiscount: (newDiscount: any) => void; // bạn có thể thay `any` bằng `Discount` nếu có type cụ thể
}

export function AddDiscountForm({ onAddDiscount }: { onAddDiscount: (newDiscount: Discount) => void }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast(); 

  const form = useForm({
    defaultValues: {
      Dis_ID: "",
      Product_ID: "",
      Name: "",
      Discount_price: 1000,
      StartDate: new Date(),
      EndDate: new Date(),
    },
  })

  async function onSubmit(values:any) {
    // console.log("Submitted discount:", values)
    // console.log("DateE: ", format(values.EndDate, "yyyy-MM-dd"));
    // console.log("DateS: ", format(values.StartDate, "yyyy-MM-dd"));

    try {
      const response = await fetch("http://localhost:3000/api/products/addDis", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              Dis_ID: values.Dis_ID,
              Product_ID: values.Product_ID,
              Name: values.Name,
              Discount_price: values.Discount_price,
              Start_date: format(values.StartDate, "yyyy-MM-dd"), 
              End_date: format(values.EndDate, "yyyy-MM-dd"),     
          }),
      });
          if (response.ok) {
              console.log("Thêm discount thành công");
              const newDiscount: Discount = {
                Dis_ID: values.Dis_ID,
                Product_ID: values.Product_ID,
                Name: values.Name,
                Discount_price: values.Discount_price,
                Start_date: format(values.StartDate, "yyyy-MM-dd"),
                End_date: values.EndDate,
              };
              // Gọi callback để thêm discount vào bảng
              onAddDiscount(newDiscount);

              setOpen(false);
              form.reset();
              toast({
                title: "Thành công",
                description: "Đã thêm mã giảm giá thành công.",
            });
          } else {
              const errorData = await response.json();
              const errorMessage = errorData?.msg || "Lỗi không xác định từ server.";
              toast({
                variant: "destructive",
                title: "Lỗi",
                description: errorMessage,
            });
          }
      } catch (error) {
          console.error("There was an error adding the discount:", error);
          // display eror
      }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm mã giảm giá
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm mã giảm giá</DialogTitle>
          <DialogDescription>Điền thông tin để thêm mã giảm giá mới.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/** Dis_ID */}
            <FormField
              control={form.control}
              name="Dis_ID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Mã giảm giá" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/** Product_ID */}
            <FormField
              control={form.control}
              name="Product_ID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID sản phẩm</FormLabel>
                  <FormControl>
                    <Input placeholder="Mã sản phẩm áp dụng" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/** Name */}
            <FormField
              control={form.control}
              name="Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên mã giảm</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên mã giảm giá" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/** Discount_price */}
            <FormField
              control={form.control}
              name="Discount_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá giảm (VND)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Giá giảm"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/** StartDate */}
            <FormField
              control={form.control}
              name="StartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày bắt đầu</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "dd/MM/yyyy") : "Chọn ngày"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/** EndDate */}
            <FormField
              control={form.control}
              name="EndDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày kết thúc</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "dd/MM/yyyy") : "Chọn ngày"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Lưu mã giảm giá</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
