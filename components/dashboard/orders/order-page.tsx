"use client"

import { useState } from "react"
import { ProductList } from "./product-list"
import { OrderSummary } from "./order-summary"
import { DiscountSection } from "./discount-section"
import { products } from "@/data/products"
import type { Product } from "@/types"

export interface OrderItem {
  product: Product
  quantity: number
}

export interface Discount {
  code: string
  percentage: number
  applied: boolean
}

export function OrderPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [discounts, setDiscounts] = useState<Discount[]>([
    { code: "WELCOME10", percentage: 10, applied: false },
    { code: "SUMMER20", percentage: 20, applied: false },
    { code: "MEMBER15", percentage: 15, applied: false },
  ])
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")

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

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount()
  }

  const handleCheckout = () => {
    // Xử lý thanh toán và tạo hóa đơn
    const order = {
      items: orderItems,
      subtotal: calculateSubtotal(),
      discount: calculateDiscount(),
      total: calculateTotal(),
      customer: {
        name: customerName,
        phone: customerPhone,
      },
      date: new Date().toISOString(),
    }
    console.log("Đơn hàng đã được tạo:", order)
    // Ở đây bạn sẽ gửi đơn hàng đến server hoặc lưu vào database

    // Reset form
    setOrderItems([])
    setDiscounts((prevDiscounts) => prevDiscounts.map((discount) => ({ ...discount, applied: false })))
    setCustomerName("")
    setCustomerPhone("")
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <ProductList products={products} onAddToOrder={addToOrder} />
      </div>
      <div className="flex flex-col gap-6">
        <OrderSummary
          orderItems={orderItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromOrder}
          subtotal={calculateSubtotal()}
          discount={calculateDiscount()}
          total={calculateTotal()}
          customerName={customerName}
          customerPhone={customerPhone}
          onCustomerNameChange={setCustomerName}
          onCustomerPhoneChange={setCustomerPhone}
          onCheckout={handleCheckout}
        />
        <DiscountSection discounts={discounts} onApplyDiscount={applyDiscount} onRemoveDiscount={removeDiscount} />
      </div>
    </div>
  )
}
