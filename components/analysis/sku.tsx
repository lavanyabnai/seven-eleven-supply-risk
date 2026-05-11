"use client";
import { BarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  LabelList,
  ReferenceLine,
  Bar,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
  ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from "../ui/chart";

const stats = [
  { name: "Understand/decrease demand", stat: "+66K" },
  { name: "Redeploy stock", stat: "-1.0%" },
  { name: "Increase Supply", stat: "-2.0%" },
  { name: "Total Change to last", stat: "+1.5M" },
];

const chartData = [
  { month: "Oct 10", data: 10, data1: 0 },
  { month: "Oct 25", data: 0, data1: 0 },
  { month: "Nov 9", data: 15, data1: 15 },
  { month: "Nov 24", data: 0, data1: 0 },
  { month: "Dec 9", data: 0, data1: 0 },
  { month: "Dec 24", data: 5, data1: 5 },
  { month: " ", data: 25, data1: 10 },
  { month: " ", data: 0, data1: 0 },
  { month: " ", data: 5, data1: 15 },
  { month: " ", data: 15, data1: 15 },
  { month: "", data: 50, data1: 5 },
];
const chartConfig = {
  data: {
    label: "Data",
    color: "hsl(var(--chart-1))",
  },
  data1: {
    label: "Data1",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const service1 = [
  { month: "Oct 10", data: 5 },
  { month: "Oct 25", data: 10 },
  { month: "Nov 9", data: 5 },
  { month: "Nov 24", data: 0 },
  { month: "Dec 9", data: 5 },
  { month: "Dec 24", data: 15 },
  { month: " ", data: 18 },
];

const chartConfig2 = {
  month: {
    label: "Month",
    color: "hsl(var(--chart-1))",
  },
  data: {
    label: "Data",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const past = [
  { month: "Oct 1", data: 10 },
  { month: "Nov 1", data: 0 },
  { month: "Dec 1", data: 15 },
  { month: "Jan 1", data: 0 },
  { month: "Feb 1", data: 0 },
  { month: "Mar 1", data: 5 },
  { month: " ", data: 25 },
  { month: " ", data: 0 },
  { month: " ", data: 0 },
];

const chartConfig3 = {
  month: {
    label: "Month",
    color: "hsl(var(--chart-1))",
  },
  data: {
    label: "Data",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const past1 = [
  { month: "Oct 1", data: 10, data1: 10 },
  { month: "Nov 1", data: 6, data1: 6 },
  { month: "Dec 1", data: 15, data1: 15 },
  { month: "Jan 1", data: 6, data1: 6 },
  { month: "Feb 1", data: 4, data1: 4 },
  { month: "Mar 1", data: 5, data1: 5 },
];

const chartConfig4 = {
  month: {
    label: "Month",
    color: "hsl(var(--chart-1))",
  },
  data: {
    label: "Data",
    color: "hsl(var(--chart-2))",
  },
  data1: {
    label: "Data1",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function SkuTab() {
  return (
    <div>
      <div className="mt-2 w-100 flex justify-between p-4 rounded-lg border bg-white">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display">
          SKU Views
        </h2>

        <div className="flex items-center justify-end"></div>
      </div>

      {/* stats */}
      <div>
        <dl className="my-2 grid grid-cols-2 gap-6  lg:grid-cols-4">
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
      <ul className="p-1 grid grid-cols-2 gap-2">
        <Card>
        <CardHeader>  
          <CardTitle>Service SKU Trends (s1234)</CardTitle>
      </CardHeader>
          <CardContent className="px-4 py-2">
            <ChartContainer
              config={chartConfig}
              className=" max-h-[450px] pb-0 "
            >
              <LineChart
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
                <ReferenceLine
                  y={300}
                  label="Target"
                  stroke="red"
                  strokeDasharray="3 3"
                />
                <Line
                  dataKey="data"
                  type="linear"
                  stroke="var(--color-data)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-data)" }}
                  activeDot={{ r: 6 }}
                >
                  <LabelList
                    position="top"
                    offset={8}
                    className="fill-foreground"
                    fontSize={8}
                  />
                </Line>
                <Line
                  dataKey="data1"
                  type="linear"
                  stroke="var(--color-data1)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-data1)" }}
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
        </Card>

        <Card>

          <CardContent>
            <ChartContainer config={chartConfig2}>
              <BarChart accessibilityLayer data={service1}>
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
                <Bar dataKey="data" fill="var(--color-data)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </ul>
      <ul className="p-1 grid grid-cols-2 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Past and Project Inventory (s1234)</CardTitle>
            <CardDescription> </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig3}>
              <LineChart
                accessibilityLayer
                data={past}
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
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="data"
                  type="linear"
                  stroke="var(--color-data)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <ChartContainer config={chartConfig4}>
              <BarChart accessibilityLayer data={past1}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="data"
                  stackId="a"
                  fill="var(--color-data)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="data1"
                  stackId="a"
                  fill="var(--color-data1)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </ul>
    </div>
  );
}
