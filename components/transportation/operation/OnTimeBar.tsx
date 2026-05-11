"use client";

import React from "react";

import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ReferenceLine,
  XAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { month: "23", percentage: 98, status: "within" },
  { month: "24", percentage: 97, status: "within" },
  { month: "25", percentage: 98, status: "within" },
  { month: "26", percentage: 98, status: "within" },
  { month: "27", percentage: 97, status: "below" },
  { month: "28", percentage: 98, status: "above" },
  { month: "29", percentage: 99, status: "above" },
  { month: "30", percentage: 97, status: "below" },
  { month: "31", percentage: 96, status: "below" },
  { month: "32", percentage: 99, status: "above" },


];
const chartConfig = {
  percentage: {
    label: "Above Threshold",
    color: "hsl(var(--chart-1))",
  },
};
export default function OnTimeBar() {
  const [selectedMonth, setSelectedMonth] = useState("all");

  const filteredData =
    selectedMonth === "all"
      ? data
      : data.filter((item) => item.month.toLowerCase() === selectedMonth);

  return (
    <div className="w-full border rounded-lg bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold text-black">
            OnTime Delivery
          </h2>
          <p className="text-md text-black-500 italic">
            Based on Customer Expected Time
          </p>
        </div>
      </div>
      <ChartContainer
        config={{
          above: {
            label: "Above Threshold",
            color: "hsl(142.1 76.2% 36.3%)",
          },
          below: {
            label: "Below Threshold",
            color: "hsl(346.8 77.2% 49.8%)",
          },
          within: {
            label: "Within Threshold",
            color: "#F0E68C",
          },
        }}
        className="aspect-[2/1] min-h-[350px]"
      >
        <BarChart
          data={filteredData}
          margin={{ top: 30, right: 10, left: 10, bottom: 20 }}
        >
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
          <ReferenceLine
            y={98}
            strokeDasharray="3 3"
            stroke="hsl(var(--muted-foreground))"
          />
          <Bar dataKey="percentage" radius={[6, 6, 0, 0]} barSize={40}>
          <LabelList
                position="inside"
                fill="#fff"
                fontSize={13}
                fontWeight={600}
              />
            {filteredData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.status === "above"
                    ? "var(--color-above)"
                    : entry.status === "within"
                    ? "var(--color-within)"
                    : "var(--color-below)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
