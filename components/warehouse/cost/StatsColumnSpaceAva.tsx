
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,

} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { Bar, BarChart, CartesianGrid, LabelList, ReferenceLine, XAxis } from "recharts"



// Ferguson total DC warehousing space available (M sq ft) — growing with new DC builds
const chartData = [
  { month: "2022", desktop: 8.5, },
  { month: "2023", desktop: 9.2, },
  { month: "2024", desktop: 10.8, },
  { month: "2025", desktop: 11.5, },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

const kpi = {
  title: "Yearly",
  value: 1000,
  status: "Above Target",
}

export default function StatsColumn() {
  // const emptyStyles = { background: '#ef4444' };
  // const progressStyles = { background: '#22c55e' };

  return (
    <>

      <Card  >
        <div className="relative rounded-lg">
          <span
            className={`absolute inset-x-0 top-0 h-1 rounded-lg ${kpi.status === 'Above Target'
              ? `bg-green-500`
              : kpi.status === 'Below Target'
                ? `bg-red-500`
                : ''}`}
          ></span>
        </div><CardHeader className="px-4 py-2">

          <div className="my-2 flex items-baseline gap-2 ">

            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Total DC Space Available <span className="text-sm text-gray-500">(M sq ft)</span>
              </h2>

            
            </div>

            <div className="ml-auto  overflow-x-hidden px-2 text-center text-sm font-medium text-gray-700">

              {/* <Progress value={kpi.TargetAch}  indicatorColor={`${ kpi.TargetAch > 50? "bg-green-400" : "bg-red-400"}`}  className="ml-auto h-2 w-[50%]" /> */}
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4">
          <ChartContainer config={chartConfig} className='h-30 w-full'>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
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
              <ReferenceLine isFront={true} y={97} label="Target" stroke="red" strokeDasharray="3 3" />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
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

{/* 
        <CardFooter >

          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Average processing time per line <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                14 Jan - 22 Jan
              </div>
            </div>
          </div>

        </CardFooter> */}

      </Card >
    </>
  );
}
