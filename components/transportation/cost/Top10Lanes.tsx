"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "Location658", desktop: 892 },
  { month: "Location106", desktop: 722 },
  { month: "Location107", desktop: 386 },
  { month: "Location108", desktop: 380 },
  { month: "Location109", desktop: 359 },
  { month: "Location110", desktop: 351 },
  { month: "Location111", desktop: 322 },
  { month: "Location112", desktop: 320 },
  { month: "Location113", desktop: 192 },
  { month: "Location114", desktop: 273 },
//   { month: "Others", desktop: 15801 },
//   { month: "Total", desktop: 19997 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig



export default function Top10Lanes() {
    return (
        <div>
            <Card>
    <CardHeader>
        <CardTitle>Top 10 Lanes by Spend</CardTitle>
    </CardHeader>
    <CardContent>
    <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="desktop" hide />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
         
          </BarChart>
        </ChartContainer>
    </CardContent>
</Card>
      
        </div>
    )
}
