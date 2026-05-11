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
  { month: "23", Backup: 2, Routing: 2, Spot: 94 },
  { month: "24", Backup: 4, Routing: 3, Spot: 92 },
  { month: "25", Backup: 2, Routing: 3, Spot: 91 },
  { month: "26", Backup: 3, Routing: 4, Spot: 90 },
  { month: "27", Backup: 2, Routing: 3, Spot: 92 },
  { month: "28", Backup: 4, Routing: 4, Spot: 91  },
  { month: "29", Backup: 4, Routing: 4, Spot: 95 },
  { month: "30", Backup: 3, Routing: 4, Spot: 89 },
  { month: "31", Backup:2, Routing: 3, Spot: 93 },
  { month: "32", Backup: 5, Routing: 4, Spot: 94 },
]

const chartConfig = {
    Backup: {
        label: "LTL",
        color:"oklch(0.924 0.12 95.746)",
      },
      Routing: {
        label: "TL",
        color: "oklch(0.627 0.194 149.214)",
      },
  Spot: {
    label: "Routing",
    color: "oklch(0.577 0.245 27.325)",
  },


} satisfies ChartConfig

export function RoutingGuideBar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-black">Routing Guide Compliance</CardTitle>
        <CardDescription className="text-md text-black-500">Adherence Rate</CardDescription>
        <div className="flex items-center gap-6 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500"></div>
          <span className="text-sm">Routing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500"></div>
          <span className="text-sm">Backup</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500"></div>
          <span className="text-sm">Spot Market</span>
        </div>
      </div>
      </CardHeader>
      <CardContent>

        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={0}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="Spot"
              stackId="a"
              fill="var(--color-Spot)"
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
              dataKey="Backup"
              stackId="a"
              fill="var(--color-Backup)"
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
              dataKey="Routing"
              stackId="a"
              fill="var(--color-Routing)"
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
