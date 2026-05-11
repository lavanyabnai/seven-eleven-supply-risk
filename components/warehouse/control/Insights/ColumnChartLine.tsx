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

} from "@/components/ui/chart"

import { Bar, BarChart, CartesianGrid, LabelList, ReferenceLine, XAxis } from "recharts"
import { useParams } from 'next/navigation';

// Ferguson DC lines processed per FTE by day
const chartData = [
  { month: "Mon", desktop: 235, mobile: 210 },
  { month: "Tue", desktop: 228, mobile: 205 },
  { month: "Wed", desktop: 242, mobile: 218 },
  { month: "Thu", desktop: 220, mobile: 198 },
  { month: "Fri", desktop: 250, mobile: 225 },
  { month: "Sat", desktop: 195, mobile: 180 },
]

const chartConfig = {
  desktop: {
    label: "Plumbing/HVAC Lines",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Waterworks/PVF Lines",
    color: "hsl(var(--chart-2))",
  },
};

const kpi = {
 
  status: '',
  
}
export default function ColumnChartLine() {
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
                        : 'bg-yellow-500'
                  }`}
                ></span>
              </div>
        
              <CardHeader className="px-4 py-2">
                  
                <div className="my-2 flex items-baseline gap-2 ">
                  
                  <div>
                    <h2 className="text-base font-medium text-gray-900">
                  Lines Processed per FTE <span className="text-xs text-gray-500">(#)</span>
                    </h2>
                    <h1 className="text-4xl font-bold text-black">
                    228
                    </h1>
                  </div>
                </div>
              </CardHeader >
              <CardContent className="px-4 py-2">  <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData} >
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
          <ReferenceLine y={185} label="Target" stroke="red" strokeDasharray="3 3" isFront={true}/>
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}  > <LabelList
            position="insideBottom"
            offset={8}
            className="fill-white"
            fontSize={8}
          />
          </Bar>
        </BarChart>
      </ChartContainer>
    
      </CardContent>
      <CardFooter>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center font-medium ">
            Friday peaks at 250 lines/FTE — pre-weekend branch replenishment rush
          </div>
          <div className="flex items-center gap-x-2 leading-none text-muted-foreground">
            Jan 13 - Jan 18
          </div>
        </div>
      </CardFooter>
              <CardFooter className="flex divide-x divide-gray-200 bg-gray-50 border-t p-0 ">
                 
                  <div className="flex w-0 flex-1">
                    <Link
                      href={`/workspaces/${workspaceId}/warehouse/shippingAnalysis`} // Fixed here
                      className="relative -mr-px inline-flex flex-1 items-center justify-center gap-x-2 border border-transparent text-sm font-semibold  hover:bg-rose-500 hover:text-white rounded-bl-lg"
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

                  {/* <div v className="-ml-px flex flex-1">
                    <Link
                      href='' // Fixed here
                      className="relative -mr-px inline-flex flex-1 items-center justify-center gap-x-2 border border-transparent text-sm font-semibold hover:bg-rose-500 hover:text-white rounded-br-lg"
                    >
                      <span className="py-4 inline-flex flex-1 items-center justify-center gap-x-3 text-sm font-semibold hover:text-white">
                        <LightBulbIcon className="h-5 w-5" aria-hidden="true" />
                        Insights
                      </span>
                    </Link>
                  </div> */} 
               
              </CardFooter>
            </Card>
  );
}
