"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Line, LineChart, XAxis, ReferenceLine } from "recharts"

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
  { month: "23", desktop: 142 },
  { month: "24", desktop: 41 },
  { month: "25", desktop: 39 },
  { month: "26", desktop: 108},
  { month: "27", desktop: 74 },
  { month: "28", desktop: 36 },
  { month: "29", desktop: 92 },
  { month: "30", desktop: 63 },
  { month: "31", desktop: 94 },
  { month: "32", desktop: 77 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
 
} satisfies ChartConfig

export default function TotalSpendLine() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Damage Rate (DPPM) Trend</CardTitle>
        
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <ReferenceLine y={300} stroke="red" />
            
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="desktop"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    
    </Card>
  )
}
