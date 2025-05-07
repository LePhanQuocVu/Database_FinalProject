import type { Notification } from "@/types"

export const notifications: Notification[] = [
  {
    id: "1",
    title: "Hết nguyên liệu",
    description: "Sữa tươi Vinamilk ít đường sắp hết. Vui lòng đặt thêm.",
    date: "2023-05-20T08:30:00",
    read: false,
  },
  {
    id: "2",
    title: "Đơn hàng mới",
    description: "Có 5 đơn hàng mới cần xử lý.",
    date: "2023-05-20T09:15:00",
    read: false,
  },
  {
    id: "3",
    title: "Nhân viên mới",
    description: "Nhân viên Nguyễn Văn A đã được thêm vào hệ thống.",
    date: "2023-05-19T14:20:00",
    read: true,
  },
  {
    id: "4",
    title: "Cập nhật hệ thống",
    description: "Hệ thống sẽ bảo trì vào ngày 25/05/2023.",
    date: "2023-05-18T16:45:00",
    read: true,
  },
]
