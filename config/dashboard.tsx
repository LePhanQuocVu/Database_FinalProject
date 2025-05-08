import { BarChart3, Coffee, FileText, Package, Users, ShoppingCart, CreditCard, Building2 } from "lucide-react"

export const dashboardConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      title: "Sản phẩm",
      href: "/dashboard/products",
      icon: <Coffee className="h-4 w-4" />,
    },
    {
      title: "Hóa đơn",
      href: "/dashboard/bills",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Đặt hàng",
      href: "/dashboard/orders",
      icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
      title: "Nhân viên",
      href: "/dashboard/employees",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Nguyên liệu",
      href: "/dashboard/ingredients",
      icon: <Package className="h-4 w-4" />,
    },
    {
      title: "Thẻ thành viên",
      href: "/dashboard/membership",
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      title: "Nhà cung cấp",
      href: "/dashboard/suppliers",
      icon: <Building2 className="h-4 w-4" />, // dùng icon phù hợp, ví dụ Building2 từ lucide-react
    }
  ],
}
