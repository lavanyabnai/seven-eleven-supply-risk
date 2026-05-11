"use client"


import { Bar, BarChart, CartesianGrid, XAxis, LabelList,Line, LineChart, } from "recharts"

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


const stats = [
  { name: "Backorders", stat: "+66K" },
  { name: "OTIF (commit)", stat: "-1.0%" },
  { name: "OTIF (ship)", stat: "-2.0%" },
  { name: "Total Change to last", stat: "+1.5M" },
];
const stats2 = [
  { name: "DC 4 Change to last Week", stat: "-0.4M" },
  { name: "DC 3 Change to last Week ", stat: "+0.7M" },
  { name: "DC 2 Change to last Week", stat: "-4.2M" },
  { name: "DC 1 Change to last Week", stat: "+5.5M" },
];
const chartData = [
 
  { month: "40", booking:0.1, invoice:0.2, sales: 0.3, data4: 0.4, data5: 0 },
  { month: "41", booking:0.2, invoice:0.2, sales: 0.3, data4: 0.6, data5: 0 },
  { month: "42", booking: 0.3, invoice: 0.3, sales: 0.4, data4: 0.6, data5: 0 },
  { month: "43", booking: 0.2, invoice: 0.3, sales: 0.3, data4: 0.6, data5: 0.6 },
  { month: "44", booking: 0.2, invoice: 0.4, sales: 0.3, data4: 0.6, data5: 0.2 },

  { month: "45", booking: 0.3, invoice: 0.5, sales: 0.4, data4: 0.8, data5: 0.2 },
  { month: "46", booking: 0.3, invoice: 0.5, sales: 0.2, data4: 0.8, data5: 0 },
  { month: "47", booking: 0.2, invoice: 0.4, sales: 0.3, data4: 0.8, data5: 0 },
  { month: "48", booking: 0.3, invoice: 0.2, sales: 0.2, data4: 1.0, data5: 0 },
  { month: "49", booking: 0.2, invoice: 0.3, sales: 0.2, data4: 1.0, data5: 0 },

  { month: "50", booking: 0.3, invoice: 0.2, sales: 0.2, data4: 1.0, data5: 0 },
  { month: "51", booking: 0.1, invoice: 0.4, sales: 0.1, data4: 0, data5: 0 },
  { month: "52", booking: 0.2, invoice: 0.4, sales: 0.1, data4: 0, data5: 0 },
]
const chartConfig = {
  booking: {
    label: "Booking",
    color: "hsl(var(--chart-1))",
  },
  invoice: {
    label: "Invoice",
    color: "hsl(var(--chart-2))",
  },
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-3))",
  },
  data4: {
    label: "Data 4",
    color: "hsl(var(--chart-4))",
  },
  data5: {
    label: "Data 5",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig



const invData = [
 
  { month: "40", booking:35, invoice:60, sales: 64},
  { month: "41", booking:40, invoice:60, sales: 64},
  { month: "42", booking: 40, invoice: 58, sales: 62},
  { month: "43", booking: 39, invoice: 60, sales: 70},
  { month: "44", booking: 50, invoice: 78, sales: 80},

  { month: "45", booking: 45, invoice: 60, sales: 68},
  { month: "46", booking: 45, invoice: 60, sales: 68},
  { month: "47", booking: 50, invoice: 80, sales: 82},
  { month: "48", booking: 52, invoice: 70, sales: 72},
  { month: "49", booking: 50, invoice: 70, sales: 75},

  { month: "50", booking: 52, invoice: 75, sales: 81},
  { month: "51", booking: 52, invoice: 80, sales: 89},
  { month: "52", booking: 50, invoice: 80, sales: 90},
]
const invConfig = {
  month: {
    label: "Month",
    color: "hsl(var(--chart-1))",
  },
  booking: {
    label: "Booking",
    color: "hsl(var(--chart-2))",
  },
  invoice: {
    label: "Invoice",
    color: "hsl(var(--chart-3))",
  },
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-4))",
  }
} satisfies ChartConfig

const lineData = [
  { month: "Oct 3", desktop: 92, mobile: 93 },
  { month: "Oct 13", desktop: 90, mobile: 90 },
  { month: "Oct 23", desktop: 85, mobile: 90 },
  { month: "Nov 2", desktop: 85, mobile: 90 },
  { month: "Nov 12", desktop: 80, mobile: 92 },
  { month: "Dec 2", desktop: 86, mobile: 85 },
  { month: "Dec 12", desktop: 82, mobile: 82 },
  { month: "Dec 22", desktop: 80, mobile: 80 },
  { month: "Jan 1", desktop: 76, mobile: 78 },
]
const lineConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig




export default function ServiceTab() {

  return (
    <div>
      <div className="mt-2 w-full flex justify-between p-4 rounded-lg border bg-white">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display">
          Service & Inventory Performance
        </h2>

        <div className="flex items-center justify-end">

        </div>
      </div>
      {/* stats */}

      
        <dl className="my-2  grid grid-cols-1 gap-6  lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="border rounded-lg bg-white px-4 py-5"
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
     
     

      {/* charts */}

      <ul className="my-4 grid grid-cols-2  gap-6 ">
        <Card>
          <CardHeader>
            <CardTitle>
              End Customer backorder Performance
            </CardTitle>
            <CardDescription>
            Globalorder performance
            </CardDescription>
          </CardHeader>
          <CardContent >
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            {/* <ChartLegend content={<ChartLegendContent />} /> */}
            <Bar
              dataKey="booking"
              stackId="a"
              fill="var(--color-booking)"
              radius={[0, 0, 4, 4]}
            >
              <LabelList
                dataKey="booking"
                position="insideTop"
                offset={8}
                className="fill-white"
                fontSize={12}
              />
              </Bar>
            <Bar
              dataKey="invoice"
              stackId="a"
              fill="var(--color-invoice)"
              radius={[0, 0, 0, 0]}
            >
              
              <LabelList
                dataKey="invoice"
                position="insideTop"
                offset={8}
                className="fill-white"
                fontSize={12}
              />
              </Bar>
              <Bar
              dataKey="sales"
              stackId="a"
              fill="var(--color-sales)"
              radius={[4, 4, 0, 0]}
            >
              
              <LabelList
                dataKey="sales"
                position="insideTop"
                offset={8}
                className="fill-white"
                fontSize={12}
              />
              </Bar>
              <Bar
              dataKey="data4"
              stackId="a"
              fill="var(--color-data4)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="data4"
                position="insideTop"
                offset={8}
                className="fill-white"
                fontSize={12}
              />
              </Bar>
              <Bar
              dataKey="data5"
              stackId="a"
              fill="var(--color-data5)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="data5"
                position="insideTop"
                offset={8}
                className="fill-white"
                fontSize={12}
              />
              </Bar>
          </BarChart>
        </ChartContainer>



        </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              OTIF Performance
            </CardTitle>
            <CardDescription>
            OTIF (commit) and OTIF (ship),End Customer order lines committed/shipped,% of total order lines
            </CardDescription>
          </CardHeader>
          <CardContent >
          <ChartContainer config={lineConfig} className="h-[300px] w-full">
          <LineChart
            accessibilityLayer
            data={lineData}
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
              tickMargin={4}
              tickFormatter={(value) => value.slice(0, 6)}
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

            <Line
              dataKey="mobile"
              type="linear"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-mobile)",
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
       
      </ul>

      <div>
        <dl className="mb-2 mt-4 grid grid-cols-1 gap-6  lg:grid-cols-4">
          {stats2.map((stat) => (
            <div
              key={stat.name}
              className="border rounded-lg bg-white px-4 py-5"
            >
              <dt className="truncate text-center text-lg font-medium text-gray-500">
                {stat.name}
              </dt>
              <dd className="mt-1 text-center text-4xl font-bold tracking-tight  text-gray-900  lg:text-5xl">
                {stat.stat}
              </dd>
            </div>
          ))}
        </dl>
       
      </div>

      {/* charts */}

      <ul className="my-4 grid grid-cols-1 gap-6  ">

      <Card>
          <CardHeader>
            <CardTitle>
            Inventory Performance
            </CardTitle>
            <CardDescription>
            Inventory values per week,$M
            </CardDescription>
          </CardHeader>
          <CardContent >
          <ChartContainer config={invConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={invData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            {/* <ChartLegend content={<ChartLegendContent />} /> */}
            <Bar
              dataKey="booking"
              stackId="a"
              fill="var(--color-booking)"
              radius={[0, 0, 4, 4]}
            >
              <LabelList
                dataKey="booking"
                position="insideTop"
                offset={8}
                className="fill-white"
                fontSize={12}
              />
              </Bar>
            <Bar
              dataKey="invoice"
              stackId="a"
              fill="var(--color-invoice)"
              radius={[4, 4, 0, 0]}
            >
              
              <LabelList
                dataKey="invoice"
                position="insideTop"
                offset={8}
                className="fill-white"
                fontSize={12}
              />
              </Bar>
              <Bar
              dataKey="sales"
              stackId="a"
              fill="var(--color-sales)"
              radius={[4, 4, 0, 0]}
            >
              
              <LabelList
                dataKey="sales"
                position="insideTop"
                offset={8}
                className="fill-white"
                fontSize={12}
              />
              </Bar>
          </BarChart>
        </ChartContainer>



        </CardContent>
        </Card>
        {/* {kpiInv_m.map((inv) => (
          <li
            key={inv.Name}
            className="col-span-1 flex flex-col divide-y divide-white rounded-lg bg-white shadow-xl shadow-slate-900/10"
          >
            <div className="relative flex flex-1 flex-col py-2 pl-3">
              <div className="flex items-baseline gap-2">
                <div>
                  <h3 className="text-base m-2 font-medium text-gray-900">
                    {inv.Name}
                  </h3>

                </div>
              </div>
              <div>{inv.container}</div>
            </div>
          </li>
        ))} */}
      </ul>

    </div>
  );
}
