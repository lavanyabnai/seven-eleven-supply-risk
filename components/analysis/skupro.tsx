
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const stats = [
  { name: "Backorders", stat: "+66K" },
  { name: "OTIF (commit)", stat: "-1.0%" },
  { name: "OTIF (ship)", stat: "-2.0%" },
  { name: "Total Change to last", stat: "+1.5M" },
];

export const pro1Data = [
  { ProGrp: "ProGrp02", data: 6000, fill: "#2196F3" },
  { ProGrp: "ProGrp09", data: 5000, fill: "#bc83ee" },
  { ProGrp: "ProGrp08", data: 2500, fill: "#ff7668" },
  { ProGrp: "ProGrp01", data: 2400, fill: "#ffa600" },
  { ProGrp: "ProGrp05", data: 2300, fill: "#aa46be" },
  { ProGrp: "ProGrp04", data: 2000, fill: "#59b0f6" },
  { ProGrp: "ProGrp06", data: 1500, fill: "#59b0f6" },
  { ProGrp: "ProGrp10", data: 1000, fill: "#ffbc40" },
  { ProGrp: "ProGrp03", data: 1000, fill: "#ff988e" },
  { ProGrp: "ProGrp07", data: 1000, fill: "#cda2f2" },
];

export const pro2Data = [
  { ProGrp: "pro1", data: 78, fill: "#2196F3" },
  { ProGrp: "pro2", data: 23, fill: "#bc83ee" },
  { ProGrp: "pro3", data: 37, fill: "#ff7668" },
  { ProGrp: "pro4", data: 36, fill: "#ffa600" },
  { ProGrp: "pro5", data: 231, fill: "#aa46be" },
  { ProGrp: "pro6", data: 25, fill: "#59b0f6" },
  { ProGrp: "pro7", data: 87, fill: "#cda2f2" },
  { ProGrp: "pro8", data: 28, fill: "#ff8fc9" },
  { ProGrp: "pro9", data: 20, fill: "#ff988e" },
  { ProGrp: "pro10", data: 28, fill: "#ffbc40" },
];
export const pro3Data = [
  { ProGrp: "pro1", data: 46, fill: "#2196F3" },
  { ProGrp: "pro2", data: 15, fill: "#bc83ee" },
  { ProGrp: "pro3", data: 20, fill: "#ff7668" },
  { ProGrp: "pro4", data: 22, fill: "#ffa600" },
  { ProGrp: "pro5", data: 50, fill: "#aa46be" },
  { ProGrp: "pro6", data: 16, fill: "#59b0f6" },
  { ProGrp: "pro7", data: 47, fill: "#cda2f2" },
  { ProGrp: "pro8", data: 17, fill: "#ff8fc9" },
  { ProGrp: "pro9", data: 7, fill: "#ff988e" },
  { ProGrp: "pro10", data: 9, fill: "#ffbc40" },
];
const pro4Data = [
  { categories: "pro1", data: 46, fill: "#2196F3" },
  { categories: "pro2", data: 15, fill: "#bc83ee" },
  { categories: "pro3", data: 20, fill: "#ff7668" },
  { categories: "pro4", data: 22, fill: "#ffa600" },
  { categories: "pro5", data: 50, fill: "#aa46be" },
  { categories: "pro6", data: 16, fill: "#59b0f6" },
  { categories: "pro7", data: 47, fill: "#cda2f2" },
  { categories: "pro8", data: 17, fill: "#ff8fc9" },
  { categories: "pro9", data: 7, fill: "#ff988e" },
  { categories: "pro10", data: 9, fill: "#ffbc40" },
  { categories: "pro11", data: 46, fill: "#2196F3" },
  { categories: "pro12", data: 15, fill: "#bc83ee" },
  { categories: "pro13", data: 20, fill: "#ff7668" },
  { categories: "pro14", data: 22, fill: "#ffa600" },
  { categories: "pro15", data: 50, fill: "#aa46be" },
  { categories: "pro16", data: 16, fill: "#59b0f6" },
  { categories: "pro17", data: 47, fill: "#cda2f2" },
  { categories: "pro18", data: 17, fill: "#ff8fc9" },
  { categories: "pro19", data: 7, fill: "#ff988e" },
  { categories: "pro20", data: 9, fill: "#ffbc40" },
];

export const pro5Data = [
  {
    categories: "pro1",
    data: 140,
    fill: "#2196F3",
  },
  {
    categories: "pro2",
    data: 40,
    fill: "#bc83ee",
  },
  {
    categories: "pro3",
    data: 0,
    fill: "#ff7668",
  },
  {
    categories: "pro4",
    data: 0,
    fill: "#ffa600",
  },
  {
    categories: "pro5",
    data: 0,
    fill: "#aa46be",
  },
  {
    categories: "pro6",
    data: 2,
    fill: "#59b0f6",
  },
  {
    categories: "pro7",
    data: 5,
    fill: "#cda2f2",
  },
  {
    categories: "pro8",
    data: 0,
    fill: "#ff8fc9",
  },
  {
    categories: "pro9",
    data: 0,
    fill: "#ff988e",
  },
  {
    categories: "pro10",
    data: 5,
    fill: "#ffbc40",
  },
  {
    categories: "pro11",
    data: 0,
    fill: "#2196F3",
  },
  {
    categories: "pro12",
    data: 0,
    fill: "#bc83ee",
  },
  {
    categories: "pro13",
    data: 0,
    fill: "#ff7668",
  },
  {
    categories: "pro14",
    data: 5,
    fill: "#ffa600",
  },
  {
    categories: "pro15",
    data: 5,
    fill: "#aa46be",
  },
  {
    categories: "pro16",
    data: 0,
    fill: "#59b0f6",
  },
  {
    categories: "pro17",
    data: 4,
    fill: "#cda2f2",
  },
  {
    categories: "pro18",
    data: 4,
    fill: "#ff8fc9",
  },
  {
    categories: "pro19",
    data: 4,
    fill: "#ff988e",
  },
  {
    categories: "pro20",
    data: 4,
    fill: "#ffbc40",
  },
];

export const pro6Data = [
  {
    categories: "pro1",
    data: 16,
    fill: "#2196F3",
  },
  {
    categories: "pro2",
    data: 15,
    fill: "#bc83ee",
  },
  {
    categories: "pro3",
    data: 0,
    fill: "#ff7668",
  },
  {
    categories: "pro4",
    data: 0,
    fill: "#ffa600",
  },
  {
    categories: "pro5",
    data: 0,
    fill: "#aa46be",
  },
  {
    categories: "pro6",
    data: 5,
    fill: "#59b0f6",
  },
  {
    categories: "pro7",
    data: 6,
    fill: "#cda2f2",
  },
  {
    categories: "pro8",
    data: 0,
    fill: "#ff8fc9",
  },
  {
    categories: "pro9",
    data: 0,
    fill: "#ff988e",
  },
  {
    categories: "pro10",
    data: 5,
    fill: "#ffbc40",
  },
  {
    categories: "pro11",
    data: 0,
    fill: "#2196F3",
  },
  {
    categories: "pro12",
    data: 0,
    fill: "#bc83ee",
  },
  {
    categories: "pro13",
    data: 0,
    fill: "#ff7668",
  },
  {
    categories: "pro14",
    data: 5,
    fill: "#ffa600",
  },
  {
    categories: "pro15",
    data: 0,
    fill: "#aa46be",
  },
  {
    categories: "pro16",
    data: 0,
    fill: "#59b0f6",
  },
  {
    categories: "pro17",
    data: 0,
    fill: "#cda2f2",
  },
  {
    categories: "pro18",
    data: 4,
    fill: "#ff8fc9",
  },
  {
    categories: "pro19",
    data: 4,
    fill: "#ff988e",
  },
  {
    categories: "pro20",
    data: 4,
    fill: "#ffbc40",
  },
];

const chartConfig = {
  ProGrp02: { label: "ProGrp02" },
  ProGrp09: { label: "ProGrp09" },
  ProGrp08: { label: "ProGrp08" },
  ProGrp01: { label: "ProGrp01" },
  ProGrp05: { label: "ProGrp05" },
  ProGrp04: { label: "ProGrp04" },
  ProGrp06: { label: "ProGrp06" },
  ProGrp10: { label: "ProGrp10" },
  ProGrp03: { label: "ProGrp03" },
  ProGrp07: { label: "ProGrp07" },
} satisfies ChartConfig;

const chartConfig2 = {
  pro1: {
    label: "pro1",
  },
  pro2: {
    label: "pro2",
  },
  pro3: {
    label: "pro3",
  },
  pro4: {
    label: "pro4",
  },
  pro5: {
    label: "pro5",
  },
  pro6: {
    label: "pro6",
  },
  pro7: {
    label: "pro7",
  },
  pro8: {
    label: "pro8",
  },
  pro9: {
    label: "pro9",
  },
  pro10: {
    label: "pro10",
  },
} satisfies ChartConfig;

const chartConfig3 = {
  pro1: {
    label: "pro1",
  },
  pro2: {
    label: "pro2",
  },
  pro3: {
    label: "pro3",
  },
  pro4: {
    label: "pro4",
  },
  pro5: {
    label: "pro5",
  },
  pro6: {
    label: "pro6",
  },
  pro7: {
    label: "pro7",
  },
  pro8: {
    label: "pro8",
  },
  pro9: {
    label: "pro9",
  },
  pro10: {
    label: "pro10",
  },
};

const chartConfig4 = {
  pro1: {
    label: "pro1",
  },
  pro2: {
    label: "pro2",
  },
  pro3: {
    label: "pro3",
  },
  pro4: {
    label: "pro4",
  },
  pro5: {
    label: "pro5",
  },
  pro6: {
    label: "pro6",
  },
  pro7: {
    label: "pro7",
  },
  pro8: {
    label: "pro8",
  },
  pro9: {
    label: "pro9",
  },
  pro10: {
    label: "pro10",
  },
  pro11: {
    label: "pro11",
  },
  pro12: {
    label: "pro12",
  },
  pro13: {
    label: "pro13",
  },
  pro14: {
    label: "pro14",
  },
  pro15: {
    label: "pro15",
  },
  pro16: {
    label: "pro16",
  },
  pro17: {
    label: "pro17",
  },
  pro18: {
    label: "pro18",
  },
  pro19: {
    label: "pro19",
  },
  pro20: {
    label: "pro20",
  },
};

export default function SkuProTab() {
  return (
    <>
      <div className="w-full h-screen">
        <div className="mt-2 w-100 flex justify-between p-4 rounded-lg border bg-white">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display">
            2 SKU Prioritization Overview
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
        <ul className="p-1 grid grid-cols-3 gap-2">
          <Card>
            <CardHeader>
              <CardTitle>OTIF at commit, order lines missed</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="w-full h-full">
                <BarChart
                  accessibilityLayer
                  data={pro1Data}
                  layout="vertical"
                  margin={{
                    left: 0,
                  }}
                >
                  <YAxis
                    dataKey="ProGrp"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value: string) =>
                      chartConfig[value as keyof typeof chartConfig]?.label
                    }
                  />
                  <XAxis dataKey="data" type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="data" layout="vertical" radius={5} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle># End-Customer backorder</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig2} className="w-full h-full">
                <BarChart
                  accessibilityLayer
                  data={pro2Data}
                  layout="vertical"
                  margin={{
                    left: 0,
                  }}
                >
                  <YAxis
                    dataKey="ProGrp"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value: string) =>
                      chartConfig2[value as keyof typeof chartConfig2]?.label
                    }
                  />
                  <XAxis dataKey="data" type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="data" layout="vertical" radius={5} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>$ End-Customer backorder</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig3} className="w-full h-full">
                <BarChart
                  accessibilityLayer
                  data={pro3Data}
                  layout="vertical"
                  margin={{
                    left: 0,
                  }}
                >
                  <YAxis
                    dataKey="ProGrp"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value: string) =>
                      chartConfig3[value as keyof typeof chartConfig3]?.label
                    }
                  />
                  <XAxis dataKey="data" type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="data" layout="vertical" radius={5} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </ul>
        <ul className=" p-1 grid grid-cols-3 gap-2 ">
          <Card>
            <CardHeader>
              <CardTitle>Shortage in 8 weeks</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig4} className="w-full h-full">
                <BarChart
                  accessibilityLayer
                  data={pro4Data}
                  layout="vertical"
                  margin={{
                    left: 0,
                  }}
                >
                  <YAxis
                    dataKey="categories"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) =>
                      chartConfig4[value as keyof typeof chartConfig4]?.label
                    }
                  />
                  <XAxis dataKey="data" type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="data" layout="vertical" radius={5} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle># End-Customer backorders</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig4} className="w-full h-full">
                <BarChart
                  accessibilityLayer
                  data={pro5Data}
                  layout="vertical"
                  margin={{
                    left: 0,
                  }}
                >
                  <YAxis
                    dataKey="categories"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) =>
                      chartConfig4[value as keyof typeof chartConfig4]?.label
                    }
                  />
                  <XAxis dataKey="data" type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="data" layout="vertical" radius={5} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>$ End-Customer backorders</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig4} className="w-full h-full">
                <BarChart
                  accessibilityLayer
                  data={pro6Data}
                  layout="vertical"
                  margin={{
                    left: 0,
                  }}
                >
                  <YAxis
                    dataKey="categories"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) =>
                      chartConfig4[value as keyof typeof chartConfig4]?.label
                    }
                  />
                  <XAxis dataKey="data" type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="data" layout="vertical" radius={5} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </ul>
      </div>
    </>
  );
}
