"use client"

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
  { month: "23", Parcel: 96, LTL: 2, TL: 2 },
  { month: "24", Parcel: 93, LTL: 4, TL: 3 },
  { month: "25", Parcel: 95, LTL: 2, TL: 3 },
  { month: "26", Parcel: 93, LTL: 3, TL: 4 },
  { month: "27", Parcel: 95, LTL: 2, TL: 3 },
  { month: "28", Parcel: 92, LTL: 4, TL: 4 },
  { month: "29", Parcel: 92, LTL: 4, TL: 4 },
  { month: "30", Parcel: 93, LTL: 3, TL: 4 },
  { month: "31", Parcel: 95, LTL:2, TL: 3 },
  { month: "32", Parcel: 91, LTL: 5, TL: 4 },
]

const chartConfig = {
  Parcel: {
    label: "Parcel",
    color: "oklch(0.685 0.169 237.323)",
  },
  LTL: {
    label: "LTL",
    color: "oklch(0.705 0.213 47.604)",
  },
  TL: {
    label: "TL",
    color: "oklch(0.577 0.245 27.325)",
  },

} satisfies ChartConfig

export function ModeMixBar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-black">Routing Guide Compliance</CardTitle>
        <CardDescription className="text-md text-black-500">Adherence rate</CardDescription>
        <div className="flex items-center gap-6 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500"></div>
          <span className="text-sm">Parcel</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500"></div>
          <span className="text-sm">LTL</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500"></div>
          <span className="text-sm">TL</span>
        </div>
      </div>
      </CardHeader>
      <CardContent>

        <ChartContainer config={chartConfig}>
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
              dataKey="Parcel"
              stackId="a"
              fill="var(--color-Parcel)"
              radius={[0, 0, 4, 4]}
            >
            <LabelList
              position="insideBottom"
              offset={12}
              className="fill-white"
              fontSize={12}
            />
            </Bar>
            <Bar
              dataKey="LTL"
              stackId="a"
              fill="var(--color-LTL)"
              radius={[4, 4, 0, 0]}
            >
            
            </Bar>
            <Bar
              dataKey="TL"
              stackId="a"
              fill="var(--color-TL)"
              radius={[6, 6, 0, 0]}
            >
            
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
