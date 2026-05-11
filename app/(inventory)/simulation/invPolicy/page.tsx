"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Line, LineChart, Bar, BarChart } from "recharts"

// Sample data for inventory charts
const inventoryDynamicsData = [
  { time: 0, inventory: 800, reorder: 400 },
  { time: 5, inventory: 600, reorder: 400 },
  { time: 10, inventory: 450, reorder: 400 },
  { time: 15, inventory: 300, reorder: 400 },
  { time: 20, inventory: 750, reorder: 400 },
  { time: 25, inventory: 550, reorder: 400 },
  { time: 30, inventory: 400, reorder: 400 },
]

const costData = [
  { category: "Total Costs s_q", value: 900, color: "#ef4444" },
  { category: "Total Costs s_S", value: 850, color: "#f97316" },
  { category: "Total Costs L_q", value: 750, color: "#eab308" },
  { category: "Total Costs L_S", value: 800, color: "#22c55e" },
]

const detailedCostData = [
  { category: "Holding Costs", value: 600, color: "#22c55e" },
  { category: "Ordering Costs", value: 200, color: "#f97316" },
  { category: "Stockout Costs", value: 100, color: "#ef4444" },
]

const serviceData = [
  { time: 0, level: 95 },
  { time: 5, level: 92 },
  { time: 10, level: 88 },
  { time: 15, level: 85 },
  { time: 20, level: 90 },
  { time: 25, level: 94 },
  { time: 30, level: 96 },
]

const comparisonData = [
  { policy: "S_q", value: 850 },
  { policy: "L_q", value: 750 },
  { policy: "L_S", value: 800 },
  { policy: "S_S", value: 900 },
]

export default function InventoryPolicyRoute() {
  return (
    <div className="pt-4 pl-4">
   
        {/* Header - Supply Chain Simulation Style */}
        <div className="bg-blue-50  rounded-lg p-6 mb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-blue-600">Supply Chain Simulation</h1>
          </div>
          <p className="text-blue-500 mt-2 text-lg">Inventory Policy Analysis & Optimization</p>
        </div>

        {/* Top Layer - Input Data Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {/* Period Control */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-center">Period</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <span className="text-2xl font-bold text-blue-600">7</span>
              </div>
              <Slider defaultValue={[7]} min={1} max={30} step={1} className="w-full" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1</span>
                <span>30</span>
              </div>
            </CardContent>
          </Card>

          {/* Re-Order Point */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-center">Re-Order Point (s)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <span className="text-2xl font-bold text-blue-600">400</span>
              </div>
              <Slider defaultValue={[400]} min={0} max={800} step={10} className="w-full" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>800</span>
              </div>
            </CardContent>
          </Card>

          {/* Mean Demand */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-center">Mean Demand</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <span className="text-2xl font-bold text-blue-600">50</span>
              </div>
              <Slider defaultValue={[50]} min={10} max={100} step={5} className="w-full" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>10</span>
                <span>100</span>
              </div>
            </CardContent>
          </Card>

          {/* Lead Time */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-center">Lead Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <span className="text-2xl font-bold text-blue-600">5</span>
              </div>
              <Slider defaultValue={[5]} min={1} max={20} step={1} className="w-full" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1</span>
                <span>20</span>
              </div>
            </CardContent>
          </Card>

          {/* Target Inventory */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-center">Target Inventory (S)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <span className="text-2xl font-bold text-blue-600">800</span>
              </div>
              <Slider defaultValue={[800]} min={200} max={1200} step={50} className="w-full" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>200</span>
                <span>1200</span>
              </div>
            </CardContent>
          </Card>

          {/* Order Quantity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-center">Order Quantity (q)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <span className="text-2xl font-bold text-blue-600">300</span>
              </div>
              <Slider defaultValue={[300]} min={50} max={500} step={25} className="w-full" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>50</span>
                <span>500</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Left: Simulation, Right: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - AnyLogic Simulation */}
          <Card className="">
            <CardHeader>
              <CardTitle className="text-lg">Inventory Policy Simulation</CardTitle>
            </CardHeader>
            <CardContent className="h-full p-4">
              <div className="h-full w-full rounded-lg overflow-hidden border border-gray-200">
                <iframe
                  width="100%"
                  height="100%"
                  allow="fullscreen"
                  src="https://cloud.anylogic.com/assets/embed?modelId=9217f226-b2ee-4492-8f9f-06c9acb780cc"
                  className="border-0"
                  title="Inventory Policy Simulation"
                />
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Charts Grid */}
          <Card className="">
            <CardHeader>
              <CardTitle className="text-lg">Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="h-full overflow-y-auto">
              <div className="grid grid-cols-1 gap-4">
                {/* Row 1 - Inventory Dynamics S_q and S_S */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-3 h-48">
                    <h3 className="text-sm font-medium mb-2">S_q - Inventory Dynamics</h3>
                    <ChartContainer
                      config={{
                        inventory: {
                          label: "Inventory Dynamics s_q",
                          color: "#06b6d4",
                        },
                        reorder: {
                          label: "Re-Order Point",
                          color: "#f97316",
                        },
                      }}
                      className="h-32 w-full"
                    >
                      <LineChart data={inventoryDynamicsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" fontSize={10} />
                        <YAxis fontSize={10} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="inventory" stroke="var(--color-inventory)" strokeWidth={2} />
                        <Line
                          type="monotone"
                          dataKey="reorder"
                          stroke="var(--color-reorder)"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ChartContainer>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3 h-48">
                    <h3 className="text-sm font-medium mb-2">S_S - Inventory Dynamics</h3>
                    <ChartContainer
                      config={{
                        inventory: {
                          label: "Inventory Dynamics s_S",
                          color: "#8b5cf6",
                        },
                        reorder: {
                          label: "Re-Order Point",
                          color: "#f97316",
                        },
                      }}
                      className="h-32 w-full"
                    >
                      <LineChart data={inventoryDynamicsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" fontSize={10} />
                        <YAxis fontSize={10} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="inventory" stroke="var(--color-inventory)" strokeWidth={2} />
                        <Line
                          type="monotone"
                          dataKey="reorder"
                          stroke="var(--color-reorder)"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ChartContainer>
                  </div>
                </div>

                {/* Row 2 - Total Costs */}
             

                {/* Row 3 - L_q and L_S Inventory */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-3 h-48">
                    <h3 className="text-sm font-medium mb-2">L_q - Inventory Dynamics</h3>
                    <ChartContainer
                      config={{
                        inventory: {
                          label: "Inventory Dynamics L_q",
                          color: "#eab308",
                        },
                      }}
                      className="h-32 w-full"
                    >
                      <AreaChart data={inventoryDynamicsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" fontSize={10} />
                        <YAxis fontSize={10} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <defs>
                          <linearGradient id="fillInventoryLq" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-inventory)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="var(--color-inventory)" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <Area
                          dataKey="inventory"
                          type="monotone"
                          fill="url(#fillInventoryLq)"
                          stroke="var(--color-inventory)"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3 h-48">
                    <h3 className="text-sm font-medium mb-2">L_S - Inventory Dynamics</h3>
                    <ChartContainer
                      config={{
                        inventory: {
                          label: "Inventory Dynamics L_S",
                          color: "#06b6d4",
                        },
                      }}
                      className="h-32 w-full"
                    >
                      <AreaChart data={inventoryDynamicsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" fontSize={10} />
                        <YAxis fontSize={10} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <defs>
                          <linearGradient id="fillInventoryLs" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-inventory)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="var(--color-inventory)" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <Area
                          dataKey="inventory"
                          type="monotone"
                          fill="url(#fillInventoryLs)"
                          stroke="var(--color-inventory)"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </div>

                {/* Row 4 - Cost Breakdown and Service Level */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-3 h-48">
                    <h3 className="text-sm font-medium mb-2">Cost Breakdown</h3>
                    <ChartContainer
                      config={{
                        value: {
                          label: "Costs",
                          color: "#22c55e",
                        },
                      }}
                      className="h-32 w-full"
                    >
                      <BarChart data={detailedCostData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" angle={-45} textAnchor="end" height={60} fontSize={8} />
                        <YAxis fontSize={10} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" fill="#22c55e" />
                      </BarChart>
                    </ChartContainer>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3 h-48">
                    <h3 className="text-sm font-medium mb-2">Service Level Performance</h3>
                    <ChartContainer
                      config={{
                        level: {
                          label: "Service Level %",
                          color: "#22c55e",
                        },
                      }}
                      className="h-32 w-full"
                    >
                      <LineChart data={serviceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" fontSize={10} />
                        <YAxis domain={[80, 100]} fontSize={10} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="level" stroke="var(--color-level)" strokeWidth={3} />
                      </LineChart>
                    </ChartContainer>
                  </div>
                </div>

                {/* Row 5 - Policy Comparison */}
                <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-3 h-48">
                  <h3 className="text-sm font-medium mb-2">Policy Performance Comparison</h3>
                  <ChartContainer
                    config={{
                      value: {
                        label: "Performance Score",
                        color: "#22c55e",
                      },
                    }}
                    className="h-32 w-full"
                  >
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="policy" fontSize={10} />
                      <YAxis fontSize={10} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="#22c55e" />
                    </BarChart>
                  </ChartContainer>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-3 h-48">
                  <h3 className="text-sm font-medium mb-2">Total Costs Comparison</h3>
                  <ChartContainer
                    config={{
                      value: {
                        label: "Total Costs",
                        color: "#22c55e",
                      },
                    }}
                    className="h-32 w-full"
                  >
                    <BarChart data={costData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" angle={-45} textAnchor="end" height={60} fontSize={8} />
                      <YAxis fontSize={10} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="#22c55e" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

  )
}
