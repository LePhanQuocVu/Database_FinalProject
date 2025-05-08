export interface Product {
  id: string
  name: string
  price: string
  type: "Đồ uống" | "Hàng đóng gói"
  description?: string
  image?: string
}

export interface Discount {
  Dis_ID: number
  Product_ID: string
  Name?: string
  Discount_price?: number
  Start_date?: string  
  End_date?: string    
}

export interface BillItem {
  id: string
  name: string
  quantity: number
  price: string
}

export interface Bill {
  Bill_ID: number;                      // INT
  Paid_date: string;                   // DATE (dùng ISO string dạng "YYYY-MM-DD")
  Card_ID: string;                     // CHAR(10)
  Balance_at_this_time?: number;      // DECIMAL(10, 3), optional nếu cho phép null
  Sale_SSN: string;                    // CHAR(12)
  Comment?: string;                    // VARCHAR(MAX), optional
  Rating?: number;                     // INT, optional
  Total_price?: number;                // DECIMAL(10, 3), optional
  Store_ID: number;                    // INT
}



export interface Employee {
  ssn: string
  name: string
  email: string
  role: string
  branch: string
  address: string
  startDate: string
}

export interface Ingredient {
  id: number
  name: string
  description: string
  supplier: string
  stock: number
}

export interface Notification {
  id: string
  title: string
  description: string
  date: string
  read: boolean
}

export interface MembershipCard {
  id: string
  customerName: string
  customerPhone: string
  email?: string
  dateOfBirth?: string
  joinDate: string
  points: number
  balance: number
  rank: MembershipRank
  transactions: MembershipTransaction[]
}

export type MembershipRank = "Bronze" | "Silver" | "Gold" | "Platinum"

export interface MembershipTransaction {
  id: string
  date: string
  type: "purchase" | "refund" | "point_redemption" | "point_earning" | "topup"
  amount: number
  points?: number
  description: string
  billId?: string
}

export interface MembershipInfo {
  id: string
  customerName: string
  customerPhone: string
  points: number
  balance: number
  rank: MembershipRank
  pointsUsed: number
}

export interface Store {
  id: number
  address: string
  phone: string
  manager: string
}

export interface Supplier {
  Supplier_ID: number
  Phone_number: string
  Email: string
  Name: string
  Address: string
}