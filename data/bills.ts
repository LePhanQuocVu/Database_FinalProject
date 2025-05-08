import type { Bill } from "@/types"


export const bills: Bill[] = [
  {
    Bill_ID: 1234, // Sử dụng kiểu số cho Bill_ID
    Paid_date: "2023-05-20", // Định dạng string kiểu "YYYY-MM-DD"
    Card_ID: "CARD001234", // Giả định bạn có Card_ID dạng string
    Balance_at_this_time: 0, // Giả sử số dư là 0 (hoặc có thể null tùy theo logic)
    Sale_SSN: "SSN001", // Giả sử có mã SSN cho nhân viên bán hàng
    Comment: "Thanh toán đầy đủ", // Có thể không có nếu không muốn
    Rating: 5, // Điểm đánh giá có thể có hoặc không
    Total_price: 150000, // Tổng giá trị hoá đơn
    Store_ID: 1, // Giả sử mã cửa hàng là 1
  },
  {
    Bill_ID: 1235,
    Paid_date: "2023-05-20",
    Card_ID: "CARD001235",
    Balance_at_this_time: 0,
    Sale_SSN: "SSN002",
    Comment: "Thanh toán đầy đủ",
    Rating: 4,
    Total_price: 85000,
    Store_ID: 1,
  },
  {
    Bill_ID: 1236,
    Paid_date: "2023-05-19",
    Card_ID: "CARD001236",
    Balance_at_this_time: 0,
    Sale_SSN: "SSN003",
    Comment: "Thanh toán đầy đủ",
    Rating: 5,
    Total_price: 220000,
    Store_ID: 1,
  },
  {
    Bill_ID: 1237,
    Paid_date: "2023-05-19",
    Card_ID: "CARD001237",
    Balance_at_this_time: 0,
    Sale_SSN: "SSN004",
    Comment: "Thanh toán đầy đủ",
    Rating: 4,
    Total_price: 175000,
    Store_ID: 1,
  },
  {
    Bill_ID: 1238,
    Paid_date: "2023-05-18",
    Card_ID: "CARD001238",
    Balance_at_this_time: 0,
    Sale_SSN: "SSN005",
    Comment: "Chưa thanh toán",
    Rating: 0, 
    Total_price: 95000,
    Store_ID: 1,
  },
]
