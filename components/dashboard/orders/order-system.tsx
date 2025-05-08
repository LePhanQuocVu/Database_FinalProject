"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MenuList } from "./menu-list"
import { OrderBill } from "./order-bill"
import { DiscountSection } from "./discount-section"
import { PaymentReceipt } from "./payment-receipt"
import { products } from "@/data/products"
import { bills } from "@/data/bills"
import { stores } from "@/data/stores"
// import { Store } from "@/types"
import { getMembershipByPhone, getDiscountByRank, updateMembershipPoints } from "@/data/membership-cards"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import type { Product, BillItem, Bill, MembershipInfo } from "@/types"
import { da } from "date-fns/locale"

export interface OrderItem {
  product: Product
  quantity: number
}

export interface Discount {
  code: string
  percentage: number
  applied: boolean
}

export function OrderSystem() {
  const router = useRouter()
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [discounts, setDiscounts] = useState<Discount[]>([
    { code: "WELCOME10", percentage: 10, applied: false },
    { code: "SUMMER20", percentage: 20, applied: false },
    { code: "MEMBER15", percentage: 15, applied: false },
  ])
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [notification, setNotification] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })
  const [membershipInfo, setMembershipInfo] = useState<MembershipInfo | null>(null)
  const [pointsToUse, setPointsToUse] = useState(0)
  const [showReceipt, setShowReceipt] = useState(false)
  const [receiptId, setReceiptId] = useState("")

  const [selectedStore, setSelectedStore] = useState(stores[0]);
 
  const [employeeSSN, setEmployeeSSN] = useState(() => {
    return localStorage.getItem("employeeSSN") || ""
  })

  const [SSNEnabled, setSSNEnabled] = useState(() => {
    const value = localStorage.getItem("SSNEnabled")
    return value === null ? true : value === "true"
  })

  // Lưu mỗi khi employeeSSN hoặc enabled thay đổi
  useEffect(() => {
    localStorage.setItem("employeeSSN", employeeSSN)
    localStorage.setItem("SSNEnabled", SSNEnabled.toString())
  }, [employeeSSN, SSNEnabled])

  // Kiểm tra thẻ thành viên khi số điện thoại thay đổi
  useEffect(() => {
    if (customerPhone.length >= 10) {
      const membership = getMembershipByPhone(customerPhone)
      if (membership) {
        setCustomerName(membership.customerName)
        setMembershipInfo({
          id: membership.id,
          customerName: membership.customerName,
          customerPhone: membership.customerPhone,
          points: membership.points,
          balance: membership.balance,
          rank: membership.rank,
          pointsUsed: 0,
        })

        // Thêm ưu đãi thành viên vào danh sách giảm giá
        const memberDiscount = getDiscountByRank(membership.rank)
        setDiscounts((prevDiscounts) => {
          // Kiểm tra xem đã có ưu đãi thành viên chưa
          const existingMemberDiscount = prevDiscounts.find((d) => d.code === `MEMBER${memberDiscount}`)
          if (existingMemberDiscount) {
            return prevDiscounts
          }
          // Thêm ưu đãi thành viên mới
          return [
            ...prevDiscounts,
            {
              code: `MEMBER${memberDiscount}`,
              percentage: memberDiscount,
              applied: false,
            },
          ]
        })
      } else {
        setMembershipInfo(null)
      }
    } else {
      setMembershipInfo(null)
    }
  }, [customerPhone])

  const addToOrder = (product: Product) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        return [...prevItems, { product, quantity: 1 }]
      }
    })
  }

  const removeFromOrder = (productId: string) => {
    setOrderItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromOrder(productId)
      return
    }

    setOrderItems((prevItems) =>
      prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
    )
  }

  const applyDiscount = (code: string) => {
    setDiscounts((prevDiscounts) =>
      prevDiscounts.map((discount) =>
        discount.code === code ? { ...discount, applied: true } : { ...discount, applied: false },
      ),
    )
  }

  const removeDiscount = () => {
    setDiscounts((prevDiscounts) => prevDiscounts.map((discount) => ({ ...discount, applied: false })))
  }

  const calculateSubtotal = () => {
    return orderItems.reduce((total, item) => {
      return total + Number(item.product.price) * item.quantity
    }, 0)
  }

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal()
    const activeDiscount = discounts.find((discount) => discount.applied)
    if (activeDiscount) {
      return (subtotal * activeDiscount.percentage) / 100
    }
    return 0
  }

  const calculatePointsDiscount = () => {
    return pointsToUse * 1000 // Giả sử 1 điểm = 1,000 VND
  }

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() - calculatePointsDiscount()
  }

  const generateBillId = () => {
    // Tạo mã hóa đơn mới dựa trên thời gian hiện tại
    const prefix = "HD-"
    const timestamp = new Date().getTime().toString().slice(-6)
    return `${prefix}${timestamp}`
  }

  const handleUsePoints = (points: number) => {
    if (!membershipInfo) return

    // Kiểm tra số điểm hợp lệ
    if (points > membershipInfo.points) {
      setNotification({
        type: "error",
        message: `Bạn chỉ có ${membershipInfo.points} điểm để sử dụng`,
      })
      return
    }

    setPointsToUse(points)
    setMembershipInfo({
      ...membershipInfo,
      pointsUsed: points,
    })
  }

  const handleCheckout = async () => {
    if (orderItems.length === 0) {
      setNotification({
        type: "error",
        message: "Vui lòng thêm ít nhất một sản phẩm vào đơn hàng",
      })
      return
    }

    if (!customerName) {
      setNotification({
        type: "error",
        message: "Vui lòng nhập tên khách hàng",
      })
      return
    }

    // Tạo mã hóa đơn
    const newBillId = generateBillId()
    setReceiptId(newBillId)

    // Tạo các item cho hóa đơn
    const billItems: BillItem[] = orderItems.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }))

    // Tính tổng tiền cuối cùng
    const finalTotal = calculateTotal()

    // Tạo hóa đơn mới
    const newBill: Bill = {
      id: newBillId,
      date: new Date().toISOString().split("T")[0],
      customer: customerName,
      customerPhone: customerPhone,
      total: finalTotal.toString(),
      status: "Đã thanh toán",
      items: billItems,
    }

    // Nếu có thông tin thành viên, cập nhật điểm và thêm vào hóa đơn
    if (membershipInfo) {
      newBill.membershipId = membershipInfo.id
      newBill.pointsEarned = Math.floor(finalTotal / 10000)
      newBill.pointsUsed = pointsToUse

      // Cập nhật điểm thành viên
      updateMembershipPoints(membershipInfo.id, newBillId, finalTotal, pointsToUse)
    }

    // Bạn sẽ gửi dữ liệu này đến server ở đây 
    // tao chuoi list_Of_Product
    var list_Of_Product = orderItems
      .map((item) => `${item.product.id}:${item.quantity}`)
      .join(" ");
    
    list_Of_Product = list_Of_Product.trimEnd();
    
    const res = await fetch('http://localhost:3000/api/bills/insertBill', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "paidDate": new Date().toISOString().split("T")[0],
        "customerPhone": customerPhone.toString(),
        "saleSSN": employeeSSN,
        "totalPrice": finalTotal.toString(),
        "storeID": selectedStore.id,
        "listOfProduct": list_Of_Product,
      }),
    })

    if (res.ok) {
      setShowReceipt(true);
    }
    else {
      const error = await res.json(); 
      
    }
  }

  const handleCloseReceipt = () => {
    setShowReceipt(false)

    // Reset form
    setOrderItems([])
    setDiscounts((prevDiscounts) => prevDiscounts.map((discount) => ({ ...discount, applied: false })))
    setCustomerName("")
    setCustomerPhone("")
    setPaymentMethod("cash")
    setMembershipInfo(null)
    setPointsToUse(0)

    // Chuyển hướng đến trang hóa đơn sau khi đóng hóa đơn
    router.push("/dashboard/bills")
  }

  return (
    <div className="space-y-4">
      {notification.type && (
        <Alert variant={notification.type === "error" ? "destructive" : "default"}>
          {notification.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
          <AlertTitle>{notification.type === "error" ? "Lỗi" : "Thành công"}</AlertTitle>
          <AlertDescription>{notification.message}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <MenuList products={products} onAddToOrder={addToOrder} />
            <div className="p-4">
              <DiscountSection
                discounts={discounts}
                onApplyDiscount={applyDiscount}
                onRemoveDiscount={removeDiscount}
              />
            </div>
          </Card>
        </div>
        <div>
          <OrderBill
            orderItems={orderItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromOrder}
            subtotal={calculateSubtotal()}
            discount={calculateDiscount()}
            pointsDiscount={calculatePointsDiscount()}
            total={calculateTotal()}
            customerName={customerName}
            customerPhone={customerPhone}
            employeeSSN={employeeSSN}
            SSNEnabled={SSNEnabled}
            onCustomerNameChange={setCustomerName}
            onCustomerPhoneChange={setCustomerPhone}
            onEmployeeSSNChange={setEmployeeSSN}
            onSSNEnableChange={setSSNEnabled}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            onCheckout={handleCheckout}
            membershipInfo={membershipInfo}
            pointsToUse={pointsToUse}
            onUsePoints={handleUsePoints}
            stores={stores}
            selectedStore={selectedStore}
            onSelectStore={setSelectedStore}
          />
        </div>
      </div>

      {/* Hiển thị hóa đơn thanh toán */}
      <PaymentReceipt
        open={showReceipt}
        onOpenChange={handleCloseReceipt}
        orderItems={orderItems}
        subtotal={calculateSubtotal()}
        discount={calculateDiscount()}
        total={calculateTotal()}
        customerName={customerName}
        customerPhone={customerPhone}
        paymentMethod={paymentMethod}
        receiptId={receiptId}
        membershipInfo={membershipInfo}
        // storeName={selectedStore.name}
      />
    </div>
  )
}
