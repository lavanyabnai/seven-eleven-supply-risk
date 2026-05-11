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
    { month: "Aug", LTL: 36, IM: 19,TL:45 },
    { month: "Sep", LTL: 25, IM: 48,TL:27 },
    { month: "Oct", LTL: 27, IM: 35,TL:38 },
    { month: "Nov", LTL: 46, IM: 24,TL:30 },
    { month: "Dec", LTL: 26, IM: 41,TL:33 },
  { month: "Jan", LTL: 31, IM: 38,TL:31 },
  { month: "Feb", LTL: 24, IM: 48,TL:28 },
  { month: "Mar", LTL: 34, IM: 36,TL:30 },
  { month: "Apr", LTL: 46, IM: 29,TL:24 },
  { month: "May", LTL: 28, IM: 27,TL:45 },
  { month: "Jun", LTL: 31, IM: 36,TL:33 },
  { month: "Jul", LTL: 37, IM: 39,TL:24 },

]

const chartConfig = {
  TL: {
    label: "TL",
    color: "#50C878",
  },
  IM: {
    label: "IM",
    color: "#F0E68C",
  },
  LTL: {
    label: "LTL",
    color: "#fd5c63" ,
  },
} satisfies ChartConfig

export function ModeMixBar() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4 p-5">
        <div>
          <h2 className="text-3xl font-bold text-black">
        Mode Mix
          </h2>
          <p className="text-md text-black-500 italic">
            Percentage Spend by Mode
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-2 p-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500"></div>
          <span className="text-sm">LTL</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500"></div>
          <span className="text-sm">IM</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500"></div>
          <span className="text-sm">TL</span>
        </div>
      </div>
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
              dataKey="LTL"
              stackId="a"
              fill="var(--color-LTL)"
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
              dataKey="IM"
              stackId="a"
              fill="var(--color-IM)"
              radius={[4, 4, 0, 0]}
            >
            <LabelList
              position="insideBottom"
              offset={12}
              className="fill-white"
              fontSize={12}
            />
            </Bar>
            <Bar
              dataKey="TL"
              stackId="a"
              fill="var(--color-TL)"
              radius={[6, 6, 0, 0]}
            >
            <LabelList
              position="insideBottom"
              offset={12}
              className="fill-white"
              fontSize={12}
            />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
