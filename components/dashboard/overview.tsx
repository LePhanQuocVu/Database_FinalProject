"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    total: 18000000,
  },
  {
    name: "Feb",
    total: 22000000,
  },
  {
    name: "Mar",
    total: 25000000,
  },
  {
    name: "Apr",
    total: 28000000,
  },
  {
    name: "May",
    total: 32000000,
  },
  {
    name: "Jun",
    total: 38000000,
  },
  {
    name: "Jul",
    total: 42000000,
  },
  {
    name: "Aug",
    total: 45000000,
  },
  {
    name: "Sep",
    total: 48000000,
  },
  {
    name: "Oct",
    total: 52000000,
  },
  {
    name: "Nov",
    total: 58000000,
  },
  {
    name: "Dec",
    total: 65000000,
  },
]

export function Overview() {
  return (
    <ChartContainer
      config={{
        total: {
          label: "Doanh thu",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis
          tickFormatter={(value) => `${(value / 1000000).toFixed(0)}tr`}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
        <Area
          type="monotone"
          dataKey="total"
          stroke="var(--color-total)"
          fill="var(--color-total)"
          strokeWidth={2}
          fillOpacity={0.2}
          className="fill-primary/20 stroke-primary"
        />
      </AreaChart>
    </ChartContainer>
  )
}
