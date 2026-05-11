import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegendContent,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LabelList,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";

const chartData = [
  { month: "Aug", salesRatio: 5.7 },
  { month: "Sep", salesRatio: 5.1 },
  { month: "Oct", salesRatio: 5.4 },
  { month: "Nov", salesRatio: 5.3 },
  { month: "Dec", salesRatio: 6.9 },
  { month: "Jan", salesRatio: 6.6 },
  { month: "Feb", salesRatio: 4.5 },
  { month: "Mar", salesRatio: 5.9 },
  { month: "Apr", salesRatio: 7.7 },
  { month: "May", salesRatio: 6.4 },
  { month: "Jun", salesRatio: 6.3 },
  { month: "Jul", salesRatio: 4.3 },
];

const chartConfig = {
  salesRatio: {
    label: "Sales Ratio",
    color: "hsl(var(--chart-1))",
  },
};

const kpi = {
  title: "Sales Ratio",
  value: 5.5,
  status: "Above Target",
};

export default function SalesRatioLine() {
  return (
    <>
      <Card>
        <CardHeader className="px-4 py-2">
          <div className="my-2 flex items-baseline gap-2">
            <div>
              <h1 className="text-3xl font-bold text-black">
                FREIGHT TO SALES RATIO
              </h1>
              <p className="text-md text-black-500 italic">
                Transportation impact on Gross Margin
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 py-2">
          <ChartContainer config={chartConfig} className="h-30 w-full">
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

              <ReferenceLine
                isFront={true}
                y={5.5}
                label="Target"
                stroke="red"
                strokeDasharray="3 3"
              />
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
      </Card>
    </>
  );
}
