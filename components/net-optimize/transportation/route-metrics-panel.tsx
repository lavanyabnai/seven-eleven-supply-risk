"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface RouteMetricsPanelProps {
  scenario: string
}

const metricsData = {
  "05_TO_Baseline": {
    totalDistance: 124567,
    totalCost: 2345678,
    avgUtilization: 76,
    co2Emissions: 1234,
    serviceLevel: 94,
    routeCount: 60,
  },
  "06_TO_NewDC": {
    totalDistance: 118234,
    totalCost: 2156789,
    avgUtilization: 82,
    co2Emissions: 1156,
    serviceLevel: 96,
    routeCount: 55,
  },
  "07_TO_DirectShip": {
    totalDistance: 132456,
    totalCost: 2567890,
    avgUtilization: 68,
    co2Emissions: 1345,
    serviceLevel: 92,
    routeCount: 65,
  },
}

const utilizationData = [
  { name: "0-25%", value: 5 },
  { name: "26-50%", value: 12 },
  { name: "51-75%", value: 28 },
  { name: "76-90%", value: 35 },
  { name: "91-100%", value: 20 },
]

const chartConfig = {
  utilization: {
    label: "Truck Utilization",
    color: "hsl(var(--chart-1))",
  },
}

export default function RouteMetricsPanel({ scenario }: RouteMetricsPanelProps) {
  const metrics = metricsData[scenario as keyof typeof metricsData] || metricsData["05_TO_Baseline"]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Route Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Total Distance:</span>
            <span className="text-sm font-medium">{metrics.totalDistance.toLocaleString()} miles</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Total Cost:</span>
            <span className="text-sm font-medium">${metrics.totalCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Avg. Utilization:</span>
            <span className="text-sm font-medium">{metrics.avgUtilization}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">CO2 Emissions:</span>
            <span className="text-sm font-medium">{metrics.co2Emissions.toLocaleString()} tons</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Service Level:</span>
            <span className="text-sm font-medium">{metrics.serviceLevel}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Route Count:</span>
            <span className="text-sm font-medium">{metrics.routeCount}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Truck Utilization</h3>
        <div className="h-40">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={utilizationData}
                margin={{
                  top: 5,
                  right: 5,
                  left: 0,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={40} tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => [`${value} routes`, "Count"]} />} />
                <Bar dataKey="value" fill="var(--color-utilization)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Optimization Opportunities</h3>
        <div className="space-y-2">
          <div className="p-2 bg-yellow-50 border border-yellow-200 rounded-md text-xs text-yellow-800">
            5 routes with less than 50% utilization
          </div>
          <div className="p-2 bg-green-50 border border-green-200 rounded-md text-xs text-green-800">
            Potential savings of $124,500 by consolidating routes
          </div>
          <div className="p-2 bg-blue-50 border border-blue-200 rounded-md text-xs text-blue-800">
            3 customers could be served by alternate DCs
          </div>
        </div>
      </div>
    </div>
  )
}
