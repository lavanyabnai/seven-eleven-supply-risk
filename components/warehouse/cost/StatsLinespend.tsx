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
import { Area, AreaChart, CartesianGrid, LabelList, ReferenceLine, XAxis } from "recharts"


// Ferguson warehousing spend as % of COGS — plumbing/HVAC distribution margin pressure
const chartData = [
  { month: "Q1'23", desktop: 3.8, mobile: 0.6 },
  { month: "Q2'23", desktop: 3.9, mobile: 0.7 },
  { month: "Q3'23", desktop: 4.0, mobile: 0.7 },
  { month: "Q4'23", desktop: 4.1, mobile: 0.8 },
  { month: "Q1'24", desktop: 4.2, mobile: 0.8 },
  { month: "Q2'24", desktop: 4.0, mobile: 0.9 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

const kpi = {
  title: "Yearly",
  value: 1000,
  status: "Above Target",
}

export default function StatsLine() {

  return (
    <>
        <Card>
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
                Warehousing Spend to COGS
                </h2>
              
              </div>

              {/* <div className="ml-auto  overflow-x-hidden px-2 text-center text-sm font-medium text-gray-700">
    
      <Progress value={kpi.TargetAch}  indicatorColor={`${ kpi.TargetAch > 50? "bg-green-400" : "bg-red-400"}`}  className="ml-auto h-2 w-[50%]" />
     </div> */}
            </div>
          </CardHeader>
          <CardContent className="px-4 py-2">
            <ChartContainer config={chartConfig} className='h-30 w-full'>
              
       <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
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
              content={<ChartTooltipContent indicator="line" />}
            />
            <ReferenceLine isFront={true} y={97} label="Target" stroke="red" strokeDasharray="3 3" />
           <Area
                dataKey="desktop"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                stackId="a"
                dot={{ fill: "var(--color-desktop)" }}
            >
              <LabelList
                position="top"
                offset={8}
                className="fill-foreground"
                fontSize={8}
              />
            </Area>
            <Area
                dataKey="mobile"
                type="natural"
                fill="var(--color-mobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                stackId="a"
                dot={{ fill: "var(--color-mobile)" }}
            >
              <LabelList
                position="top"
                offset={8}
                className="fill-foreground"
                fontSize={8}
              />
            </Area>
            <Area
              dataKey="tv"
              type="monotone"
              stroke="var(--color-tv)"
              strokeWidth={2}
              dot={{fill: "var(--color-tv)"}}
              activeDot={{r: 6}}>

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
          
          
          {/* <CardFooter >

           <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Average queue time for appointments is 10 min <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Jan 12 - Jan 20
            </div>
          </div>
        </div>

          </CardFooter> */}
      
            </Card >
      </>
  );
}
