"use client"

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Generate radar chart data points
const generateRadarData = () => {
  const categories = [
    "Supplier A",
    "Supplier B",
    "Supplier C",
    "Supplier D",
    "Supplier E",
    "Supplier F",
    "Supplier G",
    "Supplier H",
  ]

  return categories.map((category) => ({
    category,
    risk: Math.max(
      0,
      2.5 + Math.sin(Math.random() * 6) * 0.3 + Math.cos(Math.random() * 10) * 0.2 + (Math.random() - 0.5) * 0.1,
    ),
  }))
}

const concentrationRiskData = generateRadarData()

const chartConfig = {
  risk: {
    label: "Concentration Risk",
    color: "hsl(var(--chart-1))",
  },
}

export default function ConcentrationRiskChart() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full ">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <RadarChart data={concentrationRiskData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" fontSize={10} />
              <PolarRadiusAxis angle={90} domain={[0, 3]} tick={{ fontSize: 10 }} tickCount={4} />
              <Radar
                name="Concentration Risk"
                dataKey="risk"
                stroke="var(--color-risk)"
                fill="var(--color-risk)"
                fillOpacity={0.1}
                strokeWidth={2}
                dot={{ fill: "var(--color-risk)", strokeWidth: 2, r: 3 }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent formatter={(value) => [`${(value as number).toFixed(2)}`, "Risk Level"]} />
                }
              />
            </RadarChart>
        </ChartContainer>
      </div>
    </div>
  )
}
