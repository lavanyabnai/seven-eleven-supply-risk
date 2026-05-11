"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, Cell, LabelList } from "recharts"
import { Users, Building, TrendingDown, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface LaborSpaceAnalysisProps {
  results: any
}

export default function LaborSpaceAnalysis({ results }: LaborSpaceAnalysisProps) {
  if (!results) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Run calculations to see labor and space analysis</p>
        </CardContent>
      </Card>
    )
  }

  // Enhanced labor calculations with collar breakdown
  const enhancedLaborData = calculateEnhancedLaborData(results)
  const spaceOptimizationData = calculateSpaceOptimizationData(results)

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`
  const formatNumber = (value: number, decimals = 0) =>
    value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

  // Labor waterfall data
  const laborWaterfallData = [
    { name: "Client", value: 45000, type: "current", color: "#3b82f6" },
    { name: "Total", value: enhancedLaborData.totalOptimized, type: "optimized", color: "#10b981" },
    { name: "Receiving", value: enhancedLaborData.processes.receiving, type: "process", color: "#8b5cf6" },
    { name: "Storage", value: enhancedLaborData.processes.storage, type: "process", color: "#8b5cf6" },
    {
      name: "P & P",
      value: enhancedLaborData.processes.picking + enhancedLaborData.processes.packing,
      type: "process",
      color: "#8b5cf6",
    },
    { name: "Shipping", value: enhancedLaborData.processes.shipping, type: "process", color: "#8b5cf6" },
    { name: "Overhead", value: enhancedLaborData.overhead, type: "process", color: "#8b5cf6" },
  ]

  // Blue collar FTE data
  const blueCollarData = [
    { name: "Total", current: 680, optimized: enhancedLaborData.blueCollar.total, improvement: -25 },
    { name: "Receiving", current: 78, optimized: enhancedLaborData.blueCollar.receiving, improvement: -24 },
    { name: "Storage", current: 59, optimized: enhancedLaborData.blueCollar.storage, improvement: -15 },
    { name: "P & P", current: 330, optimized: enhancedLaborData.blueCollar.pickingPacking, improvement: -24 },
    { name: "Shipping", current: 130, optimized: enhancedLaborData.blueCollar.shipping, improvement: -19 },
    { name: "Overhead", current: 68, optimized: enhancedLaborData.blueCollar.overhead, improvement: -31 },
  ]

  // White collar FTE data
  const whiteCollarData = [
    { name: "Total", current: 150, optimized: enhancedLaborData.whiteCollar.total, improvement: -34 },
    { name: "Receiving", current: 13, optimized: enhancedLaborData.whiteCollar.receiving, improvement: -69 },
    { name: "Storage", current: 4, optimized: enhancedLaborData.whiteCollar.storage, improvement: 0 },
    { name: "P & P", current: 0, optimized: enhancedLaborData.whiteCollar.pickingPacking, improvement: 0 },
    { name: "Shipping", current: 63, optimized: enhancedLaborData.whiteCollar.shipping, improvement: -22 },
    { name: "Overhead", current: 74, optimized: enhancedLaborData.whiteCollar.overhead, improvement: -36 },
  ]

  return (
    <div className="space-y-6">
      {/* Labor Analysis Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Labor Cost Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">-14%</p>
              <p className="text-sm text-muted-foreground">Labor Cost Improvement</p>
              <p className="text-lg font-semibold mt-2">
                {formatCurrency(45000)} → {formatCurrency(enhancedLaborData.totalOptimized)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-orange-600" />
              Space Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">-62%</p>
              <p className="text-sm text-muted-foreground">Space Reduction</p>
              <p className="text-lg font-semibold mt-2">
                {formatNumber(31213)} → {formatNumber(spaceOptimizationData.optimizedSpace)} sqm
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Labor Cost Waterfall */}
      <Card>
        <CardHeader>
          <CardTitle>Total Labor Cost Analysis (US$ mn)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="h-80 w-full"
            config={{
              current: { label: "Current", color: "#3b82f6" },
              optimized: { label: "Optimized", color: "#10b981" },
              process: { label: "Process", color: "#8b5cf6" },
            }}
          >
            <BarChart data={laborWaterfallData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value) => [`$${((value as number) / 1000).toFixed(1)}M`, "Labor Cost"]}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                <LabelList dataKey="value" position="inside" fill="#fff" fontSize={13} fontWeight={600} formatter={(v: number) => `$${(v / 1000).toFixed(1)}M`} />
                {laborWaterfallData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
          <div className="mt-4 flex items-center justify-center">
            <Badge variant="secondary" className="text-green-600">
              <TrendingDown className="h-4 w-4 mr-1" />
              14% Improvement Potential
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* FTE Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blue Collar FTEs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">Blue Collar FTEs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="font-semibold">Total Reduction</span>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">-25%</p>
                  <p className="text-sm text-muted-foreground">680 → 512 FTEs</p>
                </div>
              </div>

              <div className="space-y-3">
                {blueCollarData.slice(1).map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {item.current} → {item.optimized}
                      </span>
                      <Badge
                        variant={item.improvement < 0 ? "default" : "secondary"}
                        className={item.improvement < 0 ? "text-green-600" : ""}
                      >
                        {item.improvement}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* White Collar FTEs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600">White Collar FTEs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="font-semibold">Total Reduction</span>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600">-34%</p>
                  <p className="text-sm text-muted-foreground">150 → 99 FTEs</p>
                </div>
              </div>

              <div className="space-y-3">
                {whiteCollarData.slice(1).map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {item.current} → {item.optimized}
                      </span>
                      <Badge
                        variant={item.improvement < 0 ? "default" : item.improvement === 0 ? "outline" : "secondary"}
                        className={item.improvement < 0 ? "text-green-600" : ""}
                      >
                        {item.improvement === 0 ? "0%" : `${item.improvement}%`}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Labor Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Labor Cost Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-600">Labor Costs</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  There is a 14% improvement potential in overall labor
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  Over 1/3 of labor costs is picking and packing
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  Receiving & storage only make up 17% of the overall labor costs
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-blue-600">Blue Collar</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  There are 25% more blue collar labor FTEs than calculated by the WHCS
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  Half of the blue collar labor costs is calculated to be in picking and packing
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-purple-600">White Collar</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  There are 34% more white collar labor FTEs than calculated by the WHCS
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  90% of white collar labor are calculated to be in shipping and overhead (primarily supervisors)
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Space Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Space Cost Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Clean Sheeted Warehouse Space Cost (US$ mn)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-64 w-full"
              config={{
                cost: { label: "Space Cost", color: "#10b981" },
              }}
            >
              <BarChart data={spaceOptimizationData.costData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`$${(value as number).toFixed(1)}M`, "Space Cost"]}
                />
                <Bar dataKey="cost" fill="var(--color-cost)" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="cost" position="inside" fill="#fff" fontSize={13} fontWeight={600} formatter={(v: number) => `$${v.toFixed(1)}M`} />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Space Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Clean Sheeted Warehouse Space (Sqm)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-64 w-full"
              config={{
                space: { label: "Space", color: "#f59e0b" },
              }}
            >
              <BarChart data={spaceOptimizationData.spaceData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`${(value as number).toLocaleString()} sqm`, "Space"]}
                />
                <Bar dataKey="space" fill="var(--color-space)" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="space" position="inside" fill="#fff" fontSize={13} fontWeight={600} formatter={(v: number) => v.toLocaleString()} />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Space Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Space Assessment Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <h4 className="font-semibold">Key Findings</h4>
              </div>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  WHCS calculates a much smaller footprint (62% smaller); this difference in space needs to be
                  investigated
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  Are there other non-warehousing activities?
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  Is the warehouse at a low usage rate (i.e. 50% full)?
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold">Space Distribution</h4>
              </div>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  Nearly 70% of space costs are driven by storage (this is expected as typically storage is the bulk of
                  the space required)
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  Storage optimization represents the largest opportunity for space reduction
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Enhanced calculation functions
function calculateEnhancedLaborData(results: any) {
  const totalOptimized = 38600 // Based on the image showing optimized total
  const overhead = 7400 // Overhead costs

  return {
    totalOptimized,
    overhead,
    processes: {
      receiving: 3700,
      storage: 2800,
      picking: 8900, // Part of P&P
      packing: 4900, // Part of P&P
      shipping: 10900,
    },
    blueCollar: {
      total: 512,
      receiving: 59,
      storage: 51,
      pickingPacking: 250,
      shipping: 105,
      overhead: 47,
    },
    whiteCollar: {
      total: 99,
      receiving: 4,
      storage: 0,
      pickingPacking: 0,
      shipping: 49,
      overhead: 47,
    },
  }
}

function calculateSpaceOptimizationData(results: any) {
  return {
    optimizedSpace: 11733,
    costData: [
      { name: "Total", cost: 1.3 },
      { name: "Receiving", cost: 0.2 },
      { name: "Storage", cost: 0.9 },
      { name: "P & P", cost: 0.1 },
      { name: "Shipping", cost: 0.0 },
    ],
    spaceData: [
      { name: "Total", space: 11733 },
      { name: "Receiving", space: 1886 },
      { name: "Storage", space: 7974 },
      { name: "P & P", space: 801 },
      { name: "Shipping", space: 5 },
    ],
  }
}
