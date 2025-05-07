"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import Image from "next/image"
import type { Product } from "@/types"

interface MenuListProps {
  products: Product[]
  onAddToOrder: (product: Product) => void
}

export function MenuList({ products, onAddToOrder }: MenuListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filterProducts = (products: Product[]) => {
    return products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  // Phân loại sản phẩm
  const drinks = products.filter((product) => product.type === "Đồ uống")
  const packagedGoods = products.filter((product) => product.type === "Hàng đóng gói")

  // Lọc sản phẩm theo từ khóa
  const filteredDrinks = filterProducts(drinks)
  const filteredPackagedGoods = filterProducts(packagedGoods)
  const filteredAllProducts = filterProducts(products)

  return (
    <div className="space-y-4 p-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Tìm kiếm món..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="drinks">Đồ uống</TabsTrigger>
          <TabsTrigger value="packaged">Hàng đóng gói</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filteredAllProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToOrder={onAddToOrder} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drinks" className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filteredDrinks.map((product) => (
              <ProductCard key={product.id} product={product} onAddToOrder={onAddToOrder} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="packaged" className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filteredPackagedGoods.map((product) => (
              <ProductCard key={product.id} product={product} onAddToOrder={onAddToOrder} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ProductCardProps {
  product: Product
  onAddToOrder: (product: Product) => void
}

function ProductCard({ product, onAddToOrder }: ProductCardProps) {
  return (
    <div className="flex overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image
          src={product.image || "/placeholder.svg?height=80&width=80"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <h3 className="font-medium leading-tight">{product.name}</h3>
          <p className="text-sm font-medium text-primary">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(Number(product.price))}
          </p>
        </div>
        <Button variant="ghost" size="sm" className="mt-1 h-7 justify-start p-0" onClick={() => onAddToOrder(product)}>
          <Plus className="mr-1 h-4 w-4" />
          <span className="text-xs">Thêm</span>
        </Button>
      </div>
    </div>
  )
}
