import type { Discount } from "@/types";

export const discounts:Discount[] = [
    {
        Dis_ID: 1,
        Product_ID: "PROD001",
        Name: "Giảm giá mùa hè",
        Discount_price: 10,
        Start_date: "2025-06-01",
        End_date: "2025-06-30",
      },
      {
        Dis_ID: 2,
        Product_ID: "PROD002",
        Name: "Giảm giá mùa đông",
        Discount_price: 5,
        Start_date: "2025-05-15",
        End_date: "2025-05-25",
      }
]