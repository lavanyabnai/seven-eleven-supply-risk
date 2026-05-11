"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Generate sample data for route efficiency over distance
const generateEfficiencyData = () => {
  const data: { distance: number; baseline: number; newDC: number; directShip: number }[] = []
  for (let distance = 100; distance <= 1000; distance += 100) {
    data.push({
      distance,
      baseline: 100 - distance / 20 + Math.random() * 10 - 5,
      newDC: 100 - distance / 25 + Math.random() * 10 - 5,
      directShip: 100 - distance / 15 + Math.random() * 10 - 5,
    })
  }
  return data
}

const efficiencyData = generateEfficiencyData()

const chartConfig = {
  baseline: {
    label: "05_TO_Baseline",
    color: "hsl(var(--chart-1))",
  },
  newDC: {
    label: "06_TO_NewDC",
    color: "hsl(var(--chart-2))",
  },
  directShip: {
    label: "07_TO_DirectShip",
    color: "hsl(var(--chart-3))",
  },
}

export default function RouteEfficiencyChart() {
  return (
    <div className="h-64">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={efficiencyData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="distance"
              label={{
                value: "Distance (miles)",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              label={{
                value: "Efficiency (%)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    const numValue = typeof value === "number" ? value : parseFloat(value as string)
                    return [
                      `${isNaN(numValue) ? value : numValue.toFixed(1)}%`,
                      chartConfig[name as keyof typeof chartConfig]?.label || name,
                    ]
                  }}
                />
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="baseline"
              stroke="var(--color-baseline)"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="newDC"
              stroke="var(--color-newDC)"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="directShip"
              stroke="var(--color-directShip)"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
