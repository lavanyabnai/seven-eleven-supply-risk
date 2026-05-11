"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
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
  { date: "2024-04-01", fast: 222, slow: 150 },
  { date: "2024-04-02", fast: 97, slow: 180 },
  { date: "2024-04-03", fast: 167, slow: 120 },
  { date: "2024-04-04", fast: 242, slow: 260 },
  { date: "2024-04-05", fast: 373, slow: 290 },
  { date: "2024-04-06", fast: 301, slow: 340 },
  { date: "2024-04-07", fast: 245, slow: 180 },
  { date: "2024-04-08", fast: 409, slow: 320 },
  { date: "2024-04-09", fast: 59, slow: 110 },
  { date: "2024-04-10", fast: 261, slow: 190 },
  { date: "2024-04-11", fast: 327, slow: 350 },
  { date: "2024-04-12", fast: 292, slow: 210 },
  { date: "2024-04-13", fast: 342, slow: 380 },
  { date: "2024-04-14", fast: 137, slow: 220 },
  { date: "2024-04-15", fast: 120, slow: 170 },
  { date: "2024-04-16", fast: 138, slow: 190 },
  { date: "2024-04-17", fast: 446, slow: 360 },
  { date: "2024-04-18", fast: 364, slow: 410 },
  { date: "2024-04-19", fast: 243, slow: 180 },
  { date: "2024-04-20", fast: 89, slow: 150 },
  { date: "2024-04-21", fast: 137, slow: 200 },
  { date: "2024-04-22", fast: 224, slow: 170 },
  { date: "2024-04-23", fast: 138, slow: 230 },
  { date: "2024-04-24", fast: 387, slow: 290 },
  { date: "2024-04-25", fast: 215, slow: 250 },
  { date: "2024-04-26", fast: 75, slow: 130 },
  { date: "2024-04-27", fast: 383, slow: 420 },
  { date: "2024-04-28", fast: 122, slow: 180 },
  { date: "2024-04-29", fast: 315, slow: 240 },
  { date: "2024-04-30", fast: 454, slow: 380 },
  { date: "2024-05-01", fast: 165, slow: 220 },
  { date: "2024-05-02", fast: 293, slow: 310 },
  { date: "2024-05-03", fast: 247, slow: 190 },
  { date: "2024-05-04", fast: 385, slow: 420 },
  { date: "2024-05-05", fast: 481, slow: 390 },
  { date: "2024-05-06", fast: 498, slow: 520 },
  { date: "2024-05-07", fast: 388, slow: 300 },
  { date: "2024-05-08", fast: 149, slow: 210 },
  { date: "2024-05-09", fast: 227, slow: 180 },
  { date: "2024-05-10", fast: 293, slow: 330 },
  { date: "2024-05-11", fast: 335, slow: 270 },
  { date: "2024-05-12", fast: 197, slow: 240 },
  { date: "2024-05-13", fast: 197, slow: 160 },
  { date: "2024-05-14", fast: 448, slow: 490 },
  { date: "2024-05-15", fast: 473, slow: 380 },
  { date: "2024-05-16", fast: 338, slow: 400 },
  { date: "2024-05-17", fast: 499, slow: 420 },
  { date: "2024-05-18", fast: 315, slow: 350 },
  { date: "2024-05-19", fast: 235, slow: 180 },
  { date: "2024-05-20", fast: 177, slow: 230 },
  { date: "2024-05-21", fast: 82, slow: 140 },
  { date: "2024-05-22", fast: 81, slow: 120 },
  { date: "2024-05-23", fast: 252, slow: 290 },
  { date: "2024-05-24", fast: 294, slow: 220 },
  { date: "2024-05-25", fast: 201, slow: 250 },
  { date: "2024-05-26", fast: 213, slow: 170 },
  { date: "2024-05-27", fast: 420, slow: 460 },
  { date: "2024-05-28", fast: 233, slow: 190 },
  { date: "2024-05-29", fast: 78, slow: 130 },
  { date: "2024-05-30", fast: 340, slow: 280 },
  { date: "2024-05-31", fast: 178, slow: 230 },
  { date: "2024-06-01", fast: 178, slow: 200 },
  { date: "2024-06-02", fast: 470, slow: 410 },
  { date: "2024-06-03", fast: 103, slow: 160 },
  { date: "2024-06-04", fast: 439, slow: 380 },
  { date: "2024-06-05", fast: 88, slow: 140 },
  { date: "2024-06-06", fast: 294, slow: 250 },
  { date: "2024-06-07", fast: 323, slow: 370 },
  { date: "2024-06-08", fast: 385, slow: 320 },
  { date: "2024-06-09", fast: 438, slow: 480 },
  { date: "2024-06-10", fast: 155, slow: 200 },
  { date: "2024-06-11", fast: 92, slow: 150 },
  { date: "2024-06-12", fast: 492, slow: 420 },
  { date: "2024-06-13", fast: 81, slow: 130 },
  { date: "2024-06-14", fast: 426, slow: 380 },
  { date: "2024-06-15", fast: 307, slow: 350 },
  { date: "2024-06-16", fast: 371, slow: 310 },
  { date: "2024-06-17", fast: 475, slow: 520 },
  { date: "2024-06-18", fast: 107, slow: 170 },
  { date: "2024-06-19", fast: 341, slow: 290 },
  { date: "2024-06-20", fast: 408, slow: 450 },
  { date: "2024-06-21", fast: 169, slow: 210 },
  { date: "2024-06-22", fast: 317, slow: 270 },
  { date: "2024-06-23", fast: 480, slow: 530 },
  { date: "2024-06-24", fast: 132, slow: 180 },
  { date: "2024-06-25", fast: 141, slow: 190 },
  { date: "2024-06-26", fast: 434, slow: 380 },
  { date: "2024-06-27", fast: 448, slow: 490 },
  { date: "2024-06-28", fast: 149, slow: 200 },
  { date: "2024-06-29", fast: 103, slow: 160 },
  { date: "2024-06-30", fast: 446, slow: 400 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  fast: {
    label: "Fast Movers",
    color: "hsl(var(--chart-1))",
  },
  slow: {
    label: "Slow Movers",
    color: "hsl(var(--chart-2))",
  },
  } satisfies ChartConfig

export default function ColumnInter() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("fast")

  const total = React.useMemo(
    () => ({
        fast: chartData.reduce((acc, curr) => acc + curr.fast, 0),
      slow: chartData.reduce((acc, curr) => acc + curr.slow, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Monthly Lines Received</CardTitle>
          <CardDescription>
            Showing total lines received for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["fast", "slow"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
