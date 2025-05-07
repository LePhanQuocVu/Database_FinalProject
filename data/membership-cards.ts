import type { MembershipCard, MembershipRank } from "@/types"

export const membershipCards: MembershipCard[] = [
  {
    id: "MEM-001",
    customerName: "Nguyễn Văn A",
    customerPhone: "0901234567",
    email: "nguyenvana@example.com",
    dateOfBirth: "1990-05-15",
    joinDate: "2022-01-10",
    points: 520,
    balance: 0,
    rank: "Gold",
    transactions: [
      {
        id: "TRX-001",
        date: "2023-05-15",
        type: "purchase",
        amount: 150000,
        points: 15,
        description: "Mua hàng tại Chi nhánh Thủ Đức",
        billId: "HD-1234",
      },
      {
        id: "TRX-002",
        date: "2023-05-20",
        type: "purchase",
        amount: 85000,
        points: 8,
        description: "Mua hàng tại Chi nhánh Quận 10",
        billId: "HD-1235",
      },
      {
        id: "TRX-003",
        date: "2023-06-05",
        type: "point_redemption",
        amount: -50000,
        points: -50,
        description: "Đổi điểm lấy ưu đãi",
      },
    ],
  },
  {
    id: "MEM-002",
    customerName: "Trần Thị B",
    customerPhone: "0912345678",
    email: "tranthib@example.com",
    dateOfBirth: "1992-08-20",
    joinDate: "2022-03-15",
    points: 320,
    balance: 0,
    rank: "Silver",
    transactions: [
      {
        id: "TRX-004",
        date: "2023-04-10",
        type: "purchase",
        amount: 120000,
        points: 12,
        description: "Mua hàng tại Chi nhánh Bình Dương",
        billId: "HD-1236",
      },
      {
        id: "TRX-005",
        date: "2023-05-18",
        type: "purchase",
        amount: 95000,
        points: 9,
        description: "Mua hàng tại Chi nhánh Thủ Đức",
        billId: "HD-1238",
      },
    ],
  },
  {
    id: "MEM-003",
    customerName: "Lê Văn C",
    customerPhone: "0923456789",
    email: "levanc@example.com",
    dateOfBirth: "1985-12-10",
    joinDate: "2021-11-20",
    points: 980,
    balance: 0,
    rank: "Platinum",
    transactions: [
      {
        id: "TRX-006",
        date: "2023-03-05",
        type: "purchase",
        amount: 220000,
        points: 22,
        description: "Mua hàng tại Chi nhánh Quận 10",
        billId: "HD-1237",
      },
      {
        id: "TRX-007",
        date: "2023-04-15",
        type: "purchase",
        amount: 175000,
        points: 17,
        description: "Mua hàng tại Chi nhánh Thủ Đức",
        billId: "HD-1239",
      },
      {
        id: "TRX-008",
        date: "2023-05-10",
        type: "point_redemption",
        amount: -100000,
        points: -100,
        description: "Đổi điểm lấy ưu đãi",
      },
    ],
  },
  {
    id: "MEM-004",
    customerName: "Phạm Thị D",
    customerPhone: "0934567890",
    email: "phamthid@example.com",
    joinDate: "2023-01-05",
    points: 150,
    balance: 0,
    rank: "Bronze",
    transactions: [
      {
        id: "TRX-009",
        date: "2023-05-05",
        type: "purchase",
        amount: 75000,
        points: 7,
        description: "Mua hàng tại Chi nhánh Bình Dương",
        billId: "HD-1240",
      },
    ],
  },
]

// Hàm tính rank dựa trên điểm tích lũy
export function calculateRank(points: number): MembershipRank {
  if (points >= 800) return "Platinum"
  if (points >= 500) return "Gold"
  if (points >= 300) return "Silver"
  return "Bronze"
}

// Hàm lấy thông tin thẻ thành viên theo số điện thoại
export function getMembershipByPhone(phone: string): MembershipCard | undefined {
  return membershipCards.find((card) => card.customerPhone === phone)
}

// Hàm lấy ưu đãi dựa trên rank
export function getDiscountByRank(rank: MembershipRank): number {
  switch (rank) {
    case "Platinum":
      return 15
    case "Gold":
      return 10
    case "Silver":
      return 5
    case "Bronze":
      return 2
    default:
      return 0
  }
}

// Hàm cập nhật điểm thành viên sau khi mua hàng
export function updateMembershipPoints(membershipId: string, billId: string, amount: number, pointsUsed = 0): void {
  const memberIndex = membershipCards.findIndex((card) => card.id === membershipId)
  if (memberIndex === -1) return

  const pointsEarned = Math.floor(amount / 10000) // 1 điểm cho mỗi 10,000 VND
  const member = membershipCards[memberIndex]

  // Cập nhật điểm
  member.points = member.points + pointsEarned - pointsUsed

  // Cập nhật rank
  member.rank = calculateRank(member.points)

  // Thêm giao dịch mới
  const newTransaction = {
    id: `TRX-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split("T")[0],
    type: "purchase" as const,
    amount: amount,
    points: pointsEarned,
    description: `Mua hàng và tích ${pointsEarned} điểm`,
    billId: billId,
  }

  member.transactions.unshift(newTransaction)

  // Nếu có sử dụng điểm
  if (pointsUsed > 0) {
    const redemptionTransaction = {
      id: `TRX-${(Date.now() + 1).toString().slice(-6)}`,
      date: new Date().toISOString().split("T")[0],
      type: "point_redemption" as const,
      amount: -pointsUsed * 1000, // Giả sử 1 điểm = 1,000 VND
      points: -pointsUsed,
      description: `Sử dụng ${pointsUsed} điểm để giảm giá`,
      billId: billId,
    }

    member.transactions.unshift(redemptionTransaction)
  }

  // Cập nhật lại mảng
  membershipCards[memberIndex] = member
}
