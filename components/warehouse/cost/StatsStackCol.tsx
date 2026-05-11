
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,

} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegendContent,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"

import { Bar, BarChart, CartesianGrid, LabelList, ReferenceLine, XAxis } from "recharts"


// Ferguson DC warehousing spend breakout — Labor, Rent/Lease, Equipment/Technology
const chartData = [
  { month: "2022", national: 42, regional: 20, city: 38 },
  { month: "2023", national: 41, regional: 21, city: 38 },
  { month: "2024", national: 40, regional: 22, city: 38 },
  { month: "2025", national: 39, regional: 23, city: 38 },
]
const chartConfig = {
  national: {
    label: "Labor",
    color: "hsl(var(--chart-1))",
  },
  regional: {
    label: "Rent/Lease",
    color: "hsl(var(--chart-2))",
  },
  city: {
    label: "Equipment & Tech",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig
const kpi = {
  title: "Yearly",
  value: 1000,
  status: "Above Target",
}

export default function StatsStackCol() {
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
              <h2 className="text-base font-medium text-gray-900">
                Warehousing Spend breakout<span className="text-xs text-gray-500">(%)</span>
              </h2>

            </div>

            {/* <div className="ml-auto  overflow-x-hidden px-2 text-center text-sm font-medium text-gray-700">
    
      <Progress value={kpi.TargetAch}  indicatorColor={`${ kpi.TargetAch > 50? "bg-green-400" : "bg-red-400"}`}  className="ml-auto h-2 w-[50%]" />
     </div> */}
          </div>
        </CardHeader>
        <CardContent className="px-4">
          <ChartContainer config={chartConfig} className='h-30 w-full'>

            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="year"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />
              <ReferenceLine isFront={true} y={97} label="Target" stroke="red" strokeDasharray="3 3" />
              <Bar
                dataKey="national"
                stackId="a"
                fill="var(--color-national)"
                radius={[0, 0, 4, 4]}
              >
                <LabelList dataKey="national" position="insideTop" className='fill-white' />
              </Bar>
              <Bar
                dataKey="regional"
                stackId="a"
                fill="var(--color-regional)"
                radius={[4, 4, 0, 0]}
              >
                <LabelList dataKey="regional" position="insideTop" className='fill-white' />
              </Bar>
              <Bar
                dataKey="city"
                stackId="a"
                fill="var(--color-city)"
                radius={[4, 4, 0, 0]}
              >
                <LabelList dataKey="city" position="insideTop" className='fill-white' />
              </Bar>
            </BarChart>
          </ChartContainer>

        </CardContent>

        {/*           
          <CardFooter >

           <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Utilization lowest in past week <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              12 Jan - 20 Jan
            </div>
          </div>
        </div>

          </CardFooter>
       */}
      </Card >
    </>
  );
}
