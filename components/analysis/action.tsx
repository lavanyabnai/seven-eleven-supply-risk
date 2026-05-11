"use client"

import { ChartConfig, ChartTooltipContent, ChartTooltip } from "../ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart, Bar, XAxis, CartesianGrid, LabelList } from "recharts";
import { ChartContainer } from "../ui/chart";
import React from "react";

const stats = [
  { name: "Understand/decrease demand", stat: "+66K" },
  { name: "Redeploy stock", stat: "-1.0%" },
  { name: "Increase Supply", stat: "-2.0%" },
  { name: "Total Change to last", stat: "+1.5M" },
];
const chartData = [
  { month: "Jan", data: 100 },
  { month: "Feb", data: 98  },
  { month: "Mar", data: 100 },
  { month: "Apr", data: 110 },
  { month: "May", data: 120 },
  { month: "Jun", data: 130 },
]
const chartConfig = {
  data: {
    label: "data",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const discat = [
  { value: "40", discount: 0.1 },
  { value: "41", discount: 0.2  },
  { value: "42", discount: 0.3 },
  { value: "43", discount: 0.2 },
  { value: "44", discount: 0.2 },
  { value: "45", discount: 0.3 },
  { value: "46", discount: 0.3 },
  { value: "47", discount: 0.2 },
  { value: "48", discount: 0.3 },
  { value: "49", discount: 0.2 },
  { value: "50", discount: 0.3 },
  { value: "51", discount: 0.1 },
  { value: "52", discount: 0.2 },
]
const disser = {
  discount: {
    label: "discount",
    color: "hsl(var(--chart-2))",
  },
  value: {
    label: "value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function ActionTab() {
 
  return (
    <>
      <div className="w-full h-screen">

      <div className="mt-2 w-100 flex justify-between p-4 rounded-lg border bg-white">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display">
          Action:Redeploy Stock
          </h2>

          <div className="flex items-center justify-end">
             
              </div>
          </div>  
     
        {/* stats */}
        <div>
          <dl className="mx-4 my-2 grid grid-cols-1 gap-6  lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.name}
                className="items-center overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
              >
                <dt className="truncate text-center text-lg font-medium text-gray-500">
                  {item.name}
                </dt>
                <dd className="mt-1 text-center text-4xl font-bold tracking-tight  text-gray-900  lg:text-5xl">
                  {item.stat}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        {/* charts */}
        <ul className=" p-1 grid grid-cols-1 ">
        <Card>
      <CardHeader>  
          <CardTitle>Current backorders</CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
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
            <Bar dataKey="data" fill="var(--color-data)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer> 
      </CardContent>
    </Card>
        </ul>
        <ul className="p-1 grid grid-cols-1 " >
        <Card>
        <CardHeader>
          <CardTitle>Global Stock</CardTitle>
        </CardHeader>
      <CardContent>
        <ChartContainer config={disser} className="max-h-[300px] w-full">
          <BarChart accessibilityLayer data={discat}>
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
            <Bar dataKey="discount" fill="var(--color-discount)" radius={8} 
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
        </ul>
    
      </div>
    </>
  );
}
