
import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const stats = [
  { name: "Understand/decrease demand", stat: "+66K" },
  { name: "Redeploy stock", stat: "-1.0%" },
  { name: "Increase Supply", stat: "-2.0%" },
  { name: "Total Change to last", stat: "+1.5M" },
];
const chartData = [
  { month: "Jan", booking: 100, invoice: 210, sales: 580 },
  { month: "Feb", booking: 98, invoice: 190, sales: 480 },
  { month: "Mar", booking: 100, invoice: 200, sales: 510 },
  { month: "Apr", booking: 110, invoice: 200, sales: 480 },
  { month: "May", booking: 120, invoice: 250, sales: 600 },
  { month: "Jun", booking: 130, invoice: 250, sales: 500 },
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
} satisfies ChartConfig


const discount = [
  { month: "40", booking: 0.1, invoice: 0.2, sales: 0.3 ,discount: 0.4 ,total: 0},
  { month: "41", booking: 0.2, invoice: 0.2, sales: 0.3 ,discount: 0.6 ,total: 0},
  { month: "42", booking: 0.3, invoice: 0.3, sales: 0.4 ,discount: 0.6 ,total: 0},
  { month: "43", booking: 0.2, invoice: 0.3, sales: 0.3 ,discount: 0.6 ,total: 0.6},
  { month: "44", booking: 0.2, invoice: 0.4, sales: 0.3 ,discount: 0.6 ,total: 0.2},
  { month: "45", booking: 0.3, invoice: 0.5, sales: 0.4 ,discount: 0.8 ,total: 0.2},
  { month: "46", booking: 0.3, invoice: 0.5, sales: 0.2 ,discount: 0.8},
  { month: "47", booking: 0.2, invoice: 0.4, sales: 0.3 ,discount: 0.8},
  { month: "48", booking: 0.3, invoice: 0.2, sales: 0.2 ,discount: 1.0},
  { month: "49", booking: 0.2, invoice: 0.3, sales: 0.2 ,discount: 1.0},
  { month: "50", booking: 0.3, invoice: 0.2, sales: 0.2 ,discount: 1.0},
  { month: "51", booking: 0.1, invoice: 0.4, sales: 0.1 },
  { month: "52", booking: 0.2, invoice: 0.4, sales: 0.1 },
]
const dispro = {
  booking: {
    label: "",
    color: "hsl(var(--chart-1))",
  },
  invoice: {
    label: "",
    color: "hsl(var(--chart-2))",
  },
  sales: {
    label: "",
    color: "hsl(var(--chart-3))",
  },
  discount: {
    label: "",
    color: "hsl(var(--chart-4))",
  },
  total: {
    label: "",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig



export default function UnderAnalysisTab() {
  return (
    <div>
      <div className="mt-2 w-100 flex justify-between p-4 rounded-lg border bg-white">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display">
          Understand/Shape Demand
        </h2>

        <div className="flex items-center justify-end"></div>
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
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="mx-4 w-full border-t border-gray-200" />
          </div>
        </div>
      </div>
      {/* charts */}
      <ul className="mx-4 my-4 p-1 grid grid-cols-1 rounded-lg bg-white shadow-xl shadow-slate-900/10">
      <Card>
      <CardHeader>  
          <CardTitle>Demand realization vs Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[500px] w-full pb-0">
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
            <ChartLegend content={<ChartLegendContent />} />
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
      </ul>
      <ul className="mx-4 my-4 p-1 grid grid-cols-1 rounded-lg bg-white shadow-xl shadow-slate-900/10">
      <Card>
      <CardHeader>  
          <CardTitle>Demand realization vs Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={dispro} className="max-h-[500px] w-full pb-0">
          <BarChart accessibilityLayer data={discount}>
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
              dataKey="booking"
              stackId="a"
              fill="var(--color-booking)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="invoice"
              stackId="a"
              fill="var(--color-invoice)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="sales"
              stackId="a"
              fill="var(--color-sales)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="discount"
              stackId="a"
              fill="var(--color-discount)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="total"
              stackId="a"
              fill="var(--color-total)"
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
