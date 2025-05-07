import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentOrders() {
  return (
    <div className="space-y-8">
      {[
        {
          id: "HD-1234",
          name: "Nguyễn Văn A",
          email: "nguyenvana@example.com",
          amount: "150.000đ",
          status: "success",
          date: "2023-05-20",
        },
        {
          id: "HD-1235",
          name: "Trần Thị B",
          email: "tranthib@example.com",
          amount: "85.000đ",
          status: "success",
          date: "2023-05-20",
        },
        {
          id: "HD-1236",
          name: "Lê Văn C",
          email: "levanc@example.com",
          amount: "220.000đ",
          status: "success",
          date: "2023-05-19",
        },
        {
          id: "HD-1237",
          name: "Phạm Thị D",
          email: "phamthid@example.com",
          amount: "175.000đ",
          status: "success",
          date: "2023-05-19",
        },
        {
          id: "HD-1238",
          name: "Hoàng Văn E",
          email: "hoangvane@example.com",
          amount: "95.000đ",
          status: "success",
          date: "2023-05-18",
        },
      ].map((order) => (
        <div className="flex items-center" key={order.id}>
          <Avatar className="h-9 w-9">
            <AvatarFallback>{order.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{order.name}</p>
            <p className="text-sm text-muted-foreground">{order.email}</p>
          </div>
          <div className="ml-auto font-medium">{order.amount}</div>
        </div>
      ))}
    </div>
  )
}
