export interface Product {
  id: string
  name: string
  price: string
  type: "Đồ uống" | "Hàng đóng gói"
  description?: string
  image?: string
}

export interface BillItem {
  id: string
  name: string
  quantity: number
  price: string
}

export interface Bill {
  id: string
  date: string
  customer: string
  total: string
  status: string
  items: BillItem[]
  customerPhone?: string
  membershipId?: string
  pointsEarned?: number
  pointsUsed?: number
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
  id: string
  name: string
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