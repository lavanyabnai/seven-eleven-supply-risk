"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, LabelList } from "recharts"
import { TrendingUp, TrendingDown, Target, Award } from "lucide-react"

interface PerformanceMetricsProps {
  results: any
}

export default function PerformanceMetrics({ results }: PerformanceMetricsProps) {
  if (!results) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Run calculations to see performance metrics</p>
        </CardContent>
      </Card>
    )
  }

  const kpis = results.kpis
  const benchmarks = results.benchmarks

  // KPI comparison data
  const kpiData = [
    {
      name: "Cost per Order",
      current: kpis.costPerOrder,
      industry: benchmarks.industryAverages.costPerOrder,
      bestInClass: benchmarks.bestInClass.costPerOrder,
      unit: "$",
    },
    {
      name: "Cost per Order Line",
      current: kpis.costPerOrderLine,
      industry: benchmarks.industryAverages.costPerOrderLine,
      bestInClass: benchmarks.bestInClass.costPerOrderLine,
      unit: "$",
    },
    {
      name: "Picking Productivity",
      current: kpis.laborProductivity.picking,
      industry: benchmarks.industryAverages.pickingProductivity,
      bestInClass: benchmarks.bestInClass.pickingProductivity,
      unit: " lines/hr",
    },
    {
      name: "Space Utilization",
      current: kpis.spaceUtilization * 100,
      industry: benchmarks.industryAverages.spaceUtilization * 100,
      bestInClass: benchmarks.bestInClass.spaceUtilization * 100,
      unit: "%",
    },
  ]

  const productivityData = [
    { process: "Receiving", productivity: kpis.laborProductivity.receiving, unit: "pallets/hr" },
    { process: "Picking", productivity: kpis.laborProductivity.picking, unit: "lines/hr" },
    { process: "Packing", productivity: kpis.laborProductivity.packing, unit: "orders/hr" },
    { process: "Shipping", productivity: kpis.laborProductivity.shipping, unit: "orders/hr" },
  ]

  const getPerformanceStatus = (current: number, industry: number, bestInClass: number, isHigherBetter = false) => {
    if (isHigherBetter) {
      if (current >= bestInClass) return { status: "excellent", color: "text-green-600", icon: Award }
      if (current >= industry) return { status: "good", color: "text-blue-600", icon: TrendingUp }
      return { status: "needs-improvement", color: "text-orange-600", icon: TrendingDown }
    } else {
      if (current <= bestInClass) return { status: "excellent", color: "text-green-600", icon: Award }
      if (current <= industry) return { status: "good", color: "text-blue-600", icon: TrendingUp }
      return { status: "needs-improvement", color: "text-orange-600", icon: TrendingDown }
    }
  }

  const formatValue = (value: number, unit: string) => {
    if (unit === "$") return `$${value.toFixed(2)}`
    if (unit === "%") return `${value.toFixed(1)}%`
    return `${value.toFixed(1)}${unit}`
  }

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => {
          const isHigherBetter = kpi.name.includes("Productivity") || kpi.name.includes("Utilization")
          const performance = getPerformanceStatus(kpi.current, kpi.industry, kpi.bestInClass, isHigherBetter)
          const Icon = performance.icon

          return (
            <Card key={kpi.name}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{kpi.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold">{formatValue(kpi.current, kpi.unit)}</span>
                  <Icon className={`h-5 w-5 ${performance.color}`} />
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Industry Avg:</span>
                    <span>{formatValue(kpi.industry, kpi.unit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best in Class:</span>
                    <span>{formatValue(kpi.bestInClass, kpi.unit)}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <Badge
                    variant={
                      performance.status === "excellent"
                        ? "default"
                        : performance.status === "good"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {performance.status === "excellent"
                      ? "Excellent"
                      : performance.status === "good"
                        ? "Good"
                        : "Needs Improvement"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Productivity Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Labor Productivity by Process</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="h-80 w-full"
            config={{
              productivity: { label: "Productivity", color: "#3b82f6" },
            }}
          >
            <BarChart data={productivityData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
              <XAxis dataKey="process" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value, name, props) => [`${value} ${props.payload.unit}`, "Productivity"]}
              />
              <Bar dataKey="productivity" fill="var(--color-productivity)" radius={[6, 6, 0, 0]}>
                <LabelList dataKey="productivity" position="inside" fill="#fff" fontSize={13} fontWeight={600} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Detailed KPI Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Performance vs Benchmarks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {kpiData.map((kpi) => {
              const isHigherBetter = kpi.name.includes("Productivity") || kpi.name.includes("Utilization")
              const maxValue = Math.max(kpi.current, kpi.industry, kpi.bestInClass)

              return (
                <div key={kpi.name} className="space-y-2">
                  <h4 className="font-medium">{kpi.name}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Current</span>
                      <span className="font-medium">{formatValue(kpi.current, kpi.unit)}</span>
                    </div>
                    <Progress value={(kpi.current / maxValue) * 100} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Industry Average</span>
                      <span className="text-sm">{formatValue(kpi.industry, kpi.unit)}</span>
                    </div>
                    <Progress value={(kpi.industry / maxValue) * 100} className="h-1 opacity-50" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Best in Class</span>
                      <span className="text-sm">{formatValue(kpi.bestInClass, kpi.unit)}</span>
                    </div>
                    <Progress value={(kpi.bestInClass / maxValue) * 100} className="h-1 opacity-30" />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cost Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Cost per Case</p>
                <p className="text-2xl font-bold">${kpis.costPerCase.toFixed(3)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cost per Pallet</p>
                <p className="text-2xl font-bold">${kpis.costPerPallet.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resource Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">FTEs per M Orders</p>
                <p className="text-2xl font-bold">{kpis.totalFTEsPerMOrders.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Space Utilization</p>
                <p className="text-2xl font-bold">{(kpis.spaceUtilization * 100).toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Operational Targets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Cost Reduction Target: 25%</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-600" />
                <span className="text-sm">Productivity Target: +15%</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-orange-600" />
                <span className="text-sm">Space Optimization: 90%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
