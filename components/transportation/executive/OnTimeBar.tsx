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
  { month: "Aug", percentage: 99, status: "above" },
  { month: "Sep", percentage: 94, status: "below" },
  { month: "Oct", percentage: 99, status: "above" },
  { month: "Nov", percentage: 98, status: "above" },
  { month: "Dec", percentage: 98, status: "above" },
  { month: "Jan", percentage: 93, status: "below" },
  { month: "Feb", percentage: 90, status: "below" },
  { month: "Mar", percentage: 97, status: "within" },
  { month: "Apr", percentage: 95, status: "within" },
  { month: "May", percentage: 91, status: "above" },
  { month: "Jun", percentage: 94, status: "above" },

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
            On-Time Delivery
          </h2>
          <p className="text-md text-black-500 italic">
            Customer experience of delivery service
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-500"></div>
          <span className="text-sm">Above Threshold</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500"></div>
          <span className="text-sm">Below Threshold</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500"></div>
          <span className="text-sm">Within Threshold</span>
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
            y={500}
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
