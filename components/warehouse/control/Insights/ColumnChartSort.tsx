/* eslint-disable react/prop-types */
import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  WrenchScrewdriverIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,

} from "@/components/ui/chart"

import { Bar, BarChart, CartesianGrid, LabelList, Rectangle, ReferenceLine, XAxis } from "recharts"
import { useParams } from 'next/navigation';

// Ferguson DC zone slotting accuracy — plumbing, HVAC, waterworks, PVF, appliances
const chartData = [
  { browser: "ZoneA", visitors: 98, fill: "hsl(var(--chart-1))" },
  { browser: "ZoneB", visitors: 95, fill: "hsl(var(--chart-2))" },
  { browser: "ZoneC", visitors: 97, fill: "hsl(var(--chart-3))" },
  { browser: "ZoneD", visitors: 93, fill: "hsl(var(--chart-4))" },
  { browser: "ZoneE", visitors: 99, fill: "hsl(var(--chart-5))" },
]
const chartConfig = {
  visitors: {
    label: "Accuracy %",
  },
  ZoneA: {
    label: "Plumbing",
    color: "hsl(var(--chart-1))",
  },
  ZoneB: {
    label: "HVAC",
    color: "hsl(var(--chart-2))",
  },
  ZoneC: {
    label: "Waterworks",
    color: "hsl(var(--chart-3))",
  },
  ZoneD: {
    label: "PVF",
    color: "hsl(var(--chart-4))",
  },
  ZoneE: {
    label: "Appliances",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

const kpi = {
 
  status: 'Above Target',
  
}
export default function ColumnChartSort() {
  const workspaceId = useParams().workspaceId;
  // const emptyStyles = { background: '#ef4444' };
  // const progressStyles = { background: '#22c55e' };

  return (
            <Card >
              <div className="relative rounded-lg">
                <span
                  className={`absolute inset-x-0 top-0 h-1 rounded-lg ${
                    kpi.status === 'Above Target'
                      ? `bg-green-500`
                      : kpi.status === 'Below Target'
                        ? `bg-red-500`
                        : ''
                  }`}
                ></span>
              </div>
        
              <CardHeader className="px-4 py-2">
                  
                <div className="my-2 flex items-baseline gap-2 ">
                  
                  <div>
                    <h2 className="text-base font-medium text-gray-900">
                   Slotting Accuracy Rate <span className="text-xs text-gray-500">(%)</span>
                    </h2>
                    <h1 className="text-4xl font-bold text-black">
                      96.4%
                    </h1>
                  </div>
                </div>
              </CardHeader >
              <CardContent className="px-4 py-2">  <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="browser"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) =>
              chartConfig[value as keyof typeof chartConfig]?.label
            }
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <ReferenceLine y={97} label="Target" stroke="red" strokeDasharray="3 3" />
          <Bar
            dataKey="visitors"
            strokeWidth={2}
            radius={8}
            activeIndex={4}
            activeBar={({ ...props }) => {
              return (
                <Rectangle
                  {...props}
                  fillOpacity={0.8}
                  stroke={props.payload.fill}
                  strokeDasharray={4}
                  strokeDashoffset={4}
                />
              )
            }}
          >
            <LabelList dataKey="visitors" position="insideBottom" className="fill-white" />
          </Bar>
        </BarChart>
      </ChartContainer>
    
      </CardContent>
      <CardFooter>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center font-medium ">
            PVF zone slotting accuracy trailing — pipe fittings need reslot
          </div>
          <div className="flex items-center gap-x-2 leading-none text-muted-foreground">
            January - June 2024
          </div>
        </div>
      </CardFooter>
              <CardFooter className="flex divide-x divide-gray-200 bg-gray-50 border-t p-0 ">
                 
                  <div className="flex w-0 flex-1">
                    <Link
                      href={`/workspaces/${workspaceId}/warehouse/putawayAnalysis`}
                      className="relative -mr-px inline-flex flex-1 items-center justify-center gap-x-2 border border-transparent text-sm font-semibold hover:bg-rose-500 hover:text-white rounded-bl-lg"
                    >
                      <span className="py-4 inline-flex flex-1 items-center justify-center gap-x-3 text-sm font-semibold hover:text-white">
                        <WrenchScrewdriverIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                        Analyze
                      </span>
                    </Link>
                  </div>

                  <div className="-ml-px flex flex-1">
                    <Link
                      href='' // Fixed here
                      className="relative -mr-px inline-flex flex-1 items-center justify-center gap-x-2 border border-transparent text-sm font-semibold hover:bg-rose-500 hover:text-white rounded-br-lg"
                    >
                      <span className="py-4 inline-flex flex-1 items-center justify-center gap-x-3 text-sm font-semibold hover:text-white">
                        <CircleStackIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                        Explore Data
                      </span>
                    </Link>
                  </div>

                
              </CardFooter>
            </Card>
  );
}
