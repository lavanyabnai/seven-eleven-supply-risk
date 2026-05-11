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
import TransportationCost from "./TransportationCost";

const chartData = [
  { month: "23", SpeedPerMile: 2.15 },
  { month: "24", SpeedPerMile: 2.12 },
  { month: "25", SpeedPerMile: 2.08 },
  { month: "26", SpeedPerMile: 2.20},
  { month: "27", SpeedPerMile: 2.23 },
  { month: "28", SpeedPerMile: 2.09 },
  { month: "29", SpeedPerMile: 2.04 },
  { month: "30", SpeedPerMile: 2.00 },
  { month: "31", SpeedPerMile: 2.10 },
  { month: "32", SpeedPerMile: 2.02 },
]

const chartConfig = {
  SpeedPerMile: {
    label: "Speed Per Mile $",
    color: "oklch(0.685 0.169 237.323)",
  },
} satisfies ChartConfig

export function TransportationBar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-black">Transportation Cost</CardTitle>
        <CardDescription className="text-md text-black-500">Per Mile</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={2.10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ReferenceLine
            y={2.10}
            strokeDasharray="3 3"
            stroke="hsl(var(--muted-foreground))"
          />
            <Bar dataKey="SpeedPerMile" fill="var(--color-SpeedPerMile)" radius={8} >
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
      <div>
        <TransportationCost />
      </div>

    </Card>
  )
}
