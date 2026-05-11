"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Cell, XAxis, PieChart, Pie, LabelList } from "recharts"

interface CostAnalysisProps {
  results: any
}

export default function CostAnalysis({ results }: CostAnalysisProps) {
  if (!results) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Run calculations to see cost analysis</p>
        </CardContent>
      </Card>
    )
  }

  // Prepare data for charts
  const processData = Object.entries(results.processes).map(([key, process]: [string, any]) => ({
    process: key.charAt(0).toUpperCase() + key.slice(1),
    labor: process.laborCost,
    space: process.spaceCost,
    equipment: process.equipmentCost,
    total: process.totalCost,
  }))

  const costBreakdownData = [
    { name: "Labor", value: results.totals.costs.labor, color: "#3b82f6" },
    { name: "Space", value: results.totals.costs.space, color: "#10b981" },
    { name: "Equipment", value: results.totals.costs.equipment, color: "#f59e0b" },
  ]

  const waterfallData = [
    { name: "Current Cost", value: 61400, type: "current" },
    { name: "Receiving", value: -5200, type: "improvement" },
    { name: "Storage", value: -3100, type: "improvement" },
    { name: "Picking", value: -8900, type: "improvement" },
    { name: "Shipping", value: -1900, type: "improvement" },
    { name: "Overhead", value: -2000, type: "improvement" },
    { name: "Optimized Cost", value: results.totals.costs.total, type: "target" },
  ]

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`

  return (
    <div className="space-y-6">
      {/* Cost Comparison Waterfall */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Optimization Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="h-80 w-full"
            config={{
              current: { label: "Current", color: "#3b82f6" },
              improvement: { label: "Improvement", color: "#10b981" },
              target: { label: "Target", color: "#6366f1" },
            }}
          >
            <BarChart data={waterfallData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                <LabelList dataKey="value" position="inside" fill="#fff" fontSize={13} fontWeight={600} formatter={(v: number) => formatCurrency(Math.abs(v))} />
                {waterfallData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.type === "current"
                        ? "#3b82f6"
                        : entry.type === "improvement"
                          ? "#10b981"
                          : "#6366f1"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-green-600">
              Potential Savings: {formatCurrency(61400 - results.totals.costs.total)} (-31%)
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Process Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Cost by Process</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-80 w-full"
              config={{
                labor: { label: "Labor", color: "#3b82f6" },
                space: { label: "Space", color: "#10b981" },
                equipment: { label: "Equipment", color: "#f59e0b" },
              }}
            >
              <BarChart data={processData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                <XAxis dataKey="process" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="labor" stackId="a" fill="var(--color-labor)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="space" stackId="a" fill="var(--color-space)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="equipment" stackId="a" fill="var(--color-equipment)" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="total" position="top" fill="#374151" fontSize={12} fontWeight={600} formatter={(v: number) => formatCurrency(v)} />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Cost Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Total Cost Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-80 w-full"
              config={{
                labor: { label: "Labor", color: "#3b82f6" },
                space: { label: "Space", color: "#10b981" },
                equipment: { label: "Equipment", color: "#f59e0b" },
              }}
            >
              <PieChart>
                <Pie
                  data={costBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resource Utilization */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Utilization by Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-4 text-blue-600">Labor (FTEs)</h4>
              <div className="space-y-2">
                {Object.entries(results.processes).map(([key, process]: [string, any]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key}</span>
                    <span className="font-medium">{process.ftes.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-green-600">Space (sq ft)</h4>
              <div className="space-y-2">
                {Object.entries(results.processes).map(([key, process]: [string, any]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key}</span>
                    <span className="font-medium">{process.spaceRequired.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-orange-600">Equipment ($)</h4>
              <div className="space-y-2">
                {Object.entries(results.processes).map(([key, process]: [string, any]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key}</span>
                    <span className="font-medium">{formatCurrency(process.equipmentCost)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
