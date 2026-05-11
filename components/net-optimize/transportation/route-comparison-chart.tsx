"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const comparisonData = [
  {
    name: "05_TO_Baseline",
    distance: 124567,
    cost: 2345678,
    co2: 1234,
  },
  {
    name: "06_TO_NewDC",
    distance: 118234,
    cost: 2156789,
    co2: 1156,
  },
  {
    name: "07_TO_DirectShip",
    distance: 132456,
    cost: 2567890,
    co2: 1345,
  },
]

// Normalize data for better visualization
const normalizedData = comparisonData.map((item) => ({
  name: item.name,
  distance: item.distance / 1000, // Convert to thousands of miles
  cost: item.cost / 1000000, // Convert to millions of dollars
  co2: item.co2, // Keep as is (tons)
}))

const chartConfig = {
  distance: {
    label: "Distance (1000 miles)",
    color: "hsl(var(--chart-1))",
  },
  cost: {
    label: "Cost ($ millions)",
    color: "hsl(var(--chart-2))",
  },
  co2: {
    label: "CO2 (tons)",
    color: "hsl(var(--chart-3))",
  },
}

export default function RouteComparisonChart() {
  return (
    <div className="h-64">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={normalizedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 10 }} />
            <YAxis />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    // Ensure value is a number before calling toFixed
                    const numValue = typeof value === "number" ? value : Number(value)
                    if (name === "distance") {
                      return [`${numValue.toFixed(1)}k miles`, "Distance"]
                    }
                    if (name === "cost") {
                      return [`$${numValue.toFixed(2)}M`, "Cost"]
                    }
                    if (name === "co2") {
                      return [`${value} tons`, "CO2"]
                    }
                    return [value, name]
                  }}
                />
              }
            />
            <Legend />
            <Bar dataKey="distance" fill="var(--color-distance)" />
            <Bar dataKey="cost" fill="var(--color-cost)" />
            <Bar dataKey="co2" fill="var(--color-co2)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
