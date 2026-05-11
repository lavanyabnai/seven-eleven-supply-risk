"use client"

import { Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const pieData = [
  { segment: "segmentA", name: "Plumbing Fixtures", value: 34.2, fill: "var(--color-segmentA)" },
  { segment: "segmentB", name: "HVAC Systems", value: 24.8, fill: "var(--color-segmentB)" },
  { segment: "segmentC", name: "Pipe & Fittings", value: 18.5, fill: "var(--color-segmentC)" },
  { segment: "segmentD", name: "Water Heaters", value: 12.1, fill: "var(--color-segmentD)" },
  { segment: "segmentE", name: "Waterworks", value: 6.8, fill: "var(--color-segmentE)" },
  { segment: "segmentF", name: "Other (Generators, Controls)", value: 3.6, fill: "var(--color-segmentF)" },
]

const chartConfig = {
  value: {
    label: "Percentage",
  },
  segmentA: {
    label: "Plumbing Fixtures",
    color: "hsl(var(--chart-1))",
  },
  segmentB: {
    label: "HVAC Systems",
    color: "hsl(var(--chart-2))",
  },
  segmentC: {
    label: "Pipe & Fittings",
    color: "hsl(var(--chart-3))",
  },
  segmentD: {
    label: "Water Heaters",
    color: "hsl(var(--chart-4))",
  },
  segmentE: {
    label: "Waterworks",
    color: "hsl(var(--chart-5))",
  },
  segmentF: {
    label: "Other (Generators, Controls)",
    color: "#8D6E63",
  },
}

export default function ProfitBreakdownChart() {
  return (
    <div className="flex items-center w-full h-96">
      {/* Left side - Pie Chart */}
      <div className="flex-1 h-full">
        <ChartContainer config={chartConfig} className="w-full h-full">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel formatter={(value) => [`${value}%`, "Percentage"]} />}
              />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={0}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                  const RADIAN = Math.PI / 180
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)

                  // Only show label if segment is large enough
                  if (percent < 0.05) return null

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="white"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                      fontSize={12}
                      fontWeight="bold"
                    >
                      {`${(percent * 100).toFixed(1)}%`}
                    </text>
                  )
                }}
                labelLine={false}
                stroke="#fff"
                strokeWidth={2}
              />
            </PieChart>
        </ChartContainer>
      </div>

      {/* Right side - Legend */}
      <div className="flex flex-col gap-3 min-w-[200px] pl-8">
        <h3 className="text-sm font-medium text-foreground mb-2">Legend</h3>
        {pieData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{
                backgroundColor: `hsl(var(--chart-${index + 1}))`,
              }}
            />
            <span className="text-sm text-muted-foreground">
              {entry.name}: {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
