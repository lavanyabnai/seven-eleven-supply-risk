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

import { Area, AreaChart, CartesianGrid, LabelList, ReferenceLine, XAxis } from "recharts"
import { TrendingUp } from 'lucide-react';
import { useParams } from 'next/navigation';

// Ferguson DC truck arrivals — inbound supplier deliveries vs outbound fleet dispatches
const chartData = [
  { month: "6AM", desktop: 8, mobile: 2 },
  { month: "8AM", desktop: 14, mobile: 4 },
  { month: "10AM", desktop: 11, mobile: 8 },
  { month: "12PM", desktop: 6, mobile: 10 },
  { month: "2PM", desktop: 4, mobile: 14 },
  { month: "4PM", desktop: 3, mobile: 12 },
]

const chartConfig = {
  desktop: {
    label: "Inbound (Supplier TL/LTL)",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Outbound (Ferguson Fleet)",
    color: "hsl(var(--chart-2))",
  },
};

const kpi = {
 
  status: '',
  
}
export default function AreaChartTruck() {
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
                    Truck Arrivals <span className="text-xs text-gray-500">(per hour)</span>
                    </h2>
                    <h1 className="text-4xl font-bold text-black">
                    12 trucks/hour
                    </h1>
                  </div>
                 
                  {/* <div className="ml-auto  overflow-x-hidden px-2 text-center text-sm font-medium text-gray-700"> 
                  
                    <Progress value={kpi.TargetAch}  indicatorColor={`${ kpi.TargetAch > 50? "bg-green-400" : "bg-red-400"}`}  className="ml-auto h-2 w-[50%]" />
                   </div> */}
                </div>
              </CardHeader >
      <CardContent className="px-4 py-2">
        <ChartContainer config={chartConfig} className="mx-auto  max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground" >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ReferenceLine y={300} label="Target" stroke="red" strokeDasharray="3 3" />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
              dot={{fill: "var(--color-mobile)"}}
            >
              <LabelList
                position="top"
                offset={8}
                className="fill-foreground"
                fontSize={8}
              />
            </Area>
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
              dot={{fill: "var(--color-desktop)"}}
              activeDot={{r: 6}}
            >
              <LabelList
                position="top"
                offset={8}
                className="fill-foreground"
                fontSize={8}
              />
            </Area>
          </AreaChart>
        </ChartContainer>
  
      </CardContent>

      <CardFooter>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Inbound supplier peaks 6-10 AM, Ferguson fleet dispatches peak 12-4 PM <TrendingUp className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2 leading-none text-muted-foreground">
            Jan 08 - Jan 13
          </div>
        </div>
      </CardFooter>
              <CardFooter className="flex divide-x divide-gray-200 bg-gray-50 border-t p-0 ">
      

                  <div className="flex w-0 flex-1">
                    <Link
                      href={`/workspaces/${workspaceId}/warehouse/receivingAnalysis`} // Fixed here
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

                  {/* <div className="-ml-px flex flex-1">
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
