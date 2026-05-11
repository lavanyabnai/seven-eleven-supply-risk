"use client"

import { Bar, BarChart, LabelList, ReferenceLine, XAxis } from "recharts"

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
import UtilizationTable from "./UtilizationTable"

const chartData = [
  { month: "23", volume: 2620 },
  { month: "24", volume: 2441 },
  { month: "25", volume: 2231 },
  { month: "26", volume: 2343},
  { month: "27", volume: 2322 },
  { month: "28", volume: 2208 },
  { month: "29", volume: 2389 },
  { month: "30", volume: 1968 },
  { month: "31", volume: 2008 },
  { month: "32", volume: 2272 },
]

const chartConfig = {
    volume: {
    label: "Volume",
    color: "oklch(0.685 0.169 237.323)",
  },
} satisfies ChartConfig

export function Utilization() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-black">Utilization</CardTitle>
        <CardDescription className="text-md text-black-500">Average weight/volume per shipment</CardDescription>
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ReferenceLine
            y={3000}
            strokeDasharray="3 3"
            stroke="hsl(var(--muted-foreground))"
          />
                <Bar dataKey="volume" fill="var(--color-volume)" radius={8} >
                <LabelList
                  position="inside"
                  fill="#fff"
                  fontSize={13}
                  fontWeight={600}
                />
                </Bar>
          </BarChart>
          
        </ChartContainer>
        <div className="mt-4">
            <UtilizationTable />
        </div>
      </CardContent>
    </Card>
  )
}
