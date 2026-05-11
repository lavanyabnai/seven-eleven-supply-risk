import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

import {
  ChartContainer,
  ChartLegendContent,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { LabelList, Line, LineChart, ReferenceLine, XAxis } from "recharts"
import { Badge } from "@/components/ui/badge"

const chartData = [
  { month: "23", salesRatio: 76},
  { month: "24", salesRatio: 75},
  { month: "25", salesRatio: 74},
  { month: "26", salesRatio: 70},
  { month: "27", salesRatio: 71},
  { month: "28", salesRatio: 67},
  { month: "29", salesRatio: 74},
  { month: "30", salesRatio: 70},
  { month: "31", salesRatio: 69},
  
]

const chartConfig = {
  salesRatio: {
    label: "Sales Ratio",
    color: "hsl(var(--chart-1))",
  },

};

const kpi = {
  title: "Sales Ratio",
  value: 70,
  status: "Above Target",
}

export default function CarrierLine() {

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
        </div>
        <CardHeader className="px-4 py-2">

          <div className="my-2 flex items-baseline gap-2">


            <div>
              
              <h1 className="text-3xl font-bold text-black">Carrier Pickup Time</h1>
              {/* <p className="text-md text-black-500 italic">Average pickup time</p> */}
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 py-2">
          <ChartContainer config={chartConfig} className='h-30 w-full'>

            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />

              <ReferenceLine isFront={true} y={5.5} label="Target" stroke="red" strokeDasharray="3 3" />
              <Line
                dataKey="salesRatio"
                type="linear"
                stroke="var(--color-salesRatio)"
                strokeWidth={2}
                dot={{ fill: "var(--color-salesRatio)" }}
                activeDot={{ r: 6 }}
              >
                <LabelList
                  position="top"
                  offset={8}
                  className="fill-foreground"
                  fontSize={8}
                />
              </Line>

            </LineChart>
          </ChartContainer>

        </CardContent>

      </Card >
    </>
  );
}
