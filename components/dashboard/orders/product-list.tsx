"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import Image from "next/image"
import type { Product } from "@/types"

interface ProductListProps {
  products: Product[]
  onAddToOrder: (product: Product) => void
}

export function ProductList({ products, onAddToOrder }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      activeCategory === "all" ||
      (activeCategory === "drinks" && product.type === "Đồ uống") ||
      (activeCategory === "packaged" && product.type === "Hàng đóng gói")
    return matchesSearch && matchesCategory
  })

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="drinks">Đồ uống</TabsTrigger>
            <TabsTrigger value="packaged">Hàng đóng gói</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-40 w-full">
                <Image
                  src={product.image || "/placeholder.svg?height=160&width=320"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.type}</p>
                  </div>
                  <div className="text-right font-medium">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(Number(product.price))}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => onAddToOrder(product)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm vào đơn
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
