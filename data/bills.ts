import type { Bill } from "@/types"

export const bills: Bill[] = [
  {
    id: "HD-1234",
    date: "2023-05-20",
    customer: "Nguyễn Văn A",
    total: "150000",
    status: "Đã thanh toán",
    items: [
      { id: "DR_001", name: "Phin Sữa Đá (S)", quantity: 2, price: "29000" },
      { id: "DR_0010", name: "Latte Đá", quantity: 1, price: "65000" },
    ],
  },
  {
    id: "HD-1235",
    date: "2023-05-20",
    customer: "Trần Thị B",
    total: "85000",
    status: "Đã thanh toán",
    items: [
      { id: "DR_0012", name: "Cappuccino", quantity: 1, price: "65000" },
      { id: "DR_004", name: "Phin Đen Đá (S)", quantity: 1, price: "29000" },
    ],
  },
  {
    id: "HD-1236",
    date: "2023-05-19",
    customer: "Lê Văn C",
    total: "220000",
    status: "Đã thanh toán",
    items: [
      { id: "DR_0011", name: "Caramel Macchiato", quantity: 2, price: "69000" },
      { id: "DR_003", name: "Phin Sữa Đá (L)", quantity: 1, price: "45000" },
      { id: "DR_007", name: "Bạc Xỉu Đá (S)", quantity: 1, price: "29000" },
    ],
  },
  {
    id: "HD-1237",
    date: "2023-05-19",
    customer: "Phạm Thị D",
    total: "175000",
    status: "Đã thanh toán",
    items: [
      { id: "DR_0010", name: "Latte Đá", quantity: 2, price: "65000" },
      { id: "DR_005", name: "Phin Đen Đá (M)", quantity: 1, price: "35000" },
    ],
  },
  {
    id: "HD-1238",
    date: "2023-05-18",
    customer: "Hoàng Văn E",
    total: "95000",
    status: "Chờ thanh toán",
    items: [
      { id: "DR_008", name: "Bạc Xỉu Đá (M)", quantity: 1, price: "39000" },
      { id: "DR_004", name: "Phin Đen Đá (S)", quantity: 2, price: "29000" },
    ],
  },
]
