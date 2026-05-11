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
  { month: "23", desktop: 295 },
  { month: "24", desktop: 266 },
  { month: "25", desktop: 334 },
  { month: "26", desktop: 320},
  { month: "27", desktop: 287 },
  { month: "28", desktop: 316 },
  { month: "29", desktop: 315 },
  { month: "30", desktop: 432 },
  { month: "31", desktop: 455 },
  { month: "32", desktop: 320 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
 
} satisfies ChartConfig

export default function PrimeTenderLine() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prime Tender Acceptance Rate</CardTitle>
        
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
