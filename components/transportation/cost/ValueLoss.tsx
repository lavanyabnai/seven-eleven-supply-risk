"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, LabelList, XAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "23", Internal: 245.8, External: 49.3 },
  { month: "24", Internal: 229.2, External: 37 },
  { month: "25", Internal: 293.2, External: 40.8 },
  { month: "26", Internal: 285.9, External: 33.8 },
  { month: "27", Internal: 241.5, External: 45.6 },
  { month: "28", Internal: 253.6, External: 61.9 },
  { month: "29", Internal: 250.8, External: 64.5 },
  { month: "30", Internal: 342.1, External: 89.7 },
  { month: "31", Internal: 382.3, External: 72.3 },
  { month: "32", Internal: 256, External: 45.6 }
]

const chartConfig = {
  Internal: {
    label: "Internal",
    color: "oklch(0.609 0.126 221.723)",
  },
  External: {
    label: "External",
    color: "oklch(0.75 0.183 55.934)",
  },
} satisfies ChartConfig

export default function ValueLoss() {
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex">
        <CardTitle className="text-3xl font-bold text-black">Value Loss Impact</CardTitle>
        <CardDescription>
            <div className="flex items-center gap-6 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-sky-500"></div>
          <span className="text-sm">Internal - Routing Guide Comp</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500"></div>
          <span className="text-sm">External - Carrier Acceptance</span>
        </div>
      </div>
      </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="h-full w-full">

          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="Internal"
              stackId="a"
              fill="var(--color-Internal)"
              radius={[0, 0, 4, 4]}
            >
            <LabelList
              position="inside"
              fill="#fff"
              fontSize={13}
              fontWeight={600}
            />
            </Bar>
            <Bar
              dataKey="External"
              stackId="a"
              fill="var(--color-External)"
              radius={[6, 6, 0, 0]}
            >
            <LabelList
              position="inside"
              fill="#fff"
              fontSize={13}
              fontWeight={600}
            />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}
