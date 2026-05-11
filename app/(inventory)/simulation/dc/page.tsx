"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, PieChart, Pie, BarChart, Bar } from "recharts"
import { useState } from "react"

// Sample data for distribution center charts
const processingTimeData = [
  {
    time: "00:00",
    truckUnloading: 95,
    orderAssembling: 280,
    palletPickup: 110,
    truckLoading: 75,
    orderWaiting: 290,
    assemblingWaiting: 85,
  },
  {
    time: "02:00",
    truckUnloading: 100,
    orderAssembling: 275,
    palletPickup: 115,
    truckLoading: 80,
    orderWaiting: 285,
    assemblingWaiting: 90,
  },
  {
    time: "04:00",
    truckUnloading: 105,
    orderAssembling: 270,
    palletPickup: 120,
    truckLoading: 85,
    orderWaiting: 280,
    assemblingWaiting: 95,
  },
  {
    time: "06:00",
    truckUnloading: 110,
    orderAssembling: 265,
    palletPickup: 125,
    truckLoading: 90,
    orderWaiting: 275,
    assemblingWaiting: 100,
  },
  {
    time: "08:00",
    truckUnloading: 115,
    orderAssembling: 260,
    palletPickup: 130,
    truckLoading: 95,
    orderWaiting: 270,
    assemblingWaiting: 105,
  },
  {
    time: "10:00",
    truckUnloading: 120,
    orderAssembling: 255,
    palletPickup: 135,
    truckLoading: 100,
    orderWaiting: 265,
    assemblingWaiting: 110,
  },
]

const utilizationData = [
  { time: "00:00", forklifts: 0.2, unloadingDocks: 0.6, loadingDocks: 0.4, storage: 0.3 },
  { time: "02:00", forklifts: 0.25, unloadingDocks: 0.62, loadingDocks: 0.42, storage: 0.32 },
  { time: "04:00", forklifts: 0.3, unloadingDocks: 0.64, loadingDocks: 0.44, storage: 0.34 },
  { time: "06:00", forklifts: 0.35, unloadingDocks: 0.66, loadingDocks: 0.46, storage: 0.36 },
  { time: "08:00", forklifts: 0.4, unloadingDocks: 0.68, loadingDocks: 0.48, storage: 0.38 },
  { time: "10:00", forklifts: 0.45, unloadingDocks: 0.65, loadingDocks: 0.45, storage: 0.45 },
]

const throughputData = [
  { hour: "06:00", inbound: 45, outbound: 38, processed: 42 },
  { hour: "08:00", inbound: 52, outbound: 45, processed: 48 },
  { hour: "10:00", inbound: 48, outbound: 42, processed: 45 },
  { hour: "12:00", inbound: 55, outbound: 50, processed: 52 },
  { hour: "14:00", inbound: 60, outbound: 55, processed: 58 },
  { hour: "16:00", inbound: 58, outbound: 52, processed: 55 },
]

const orderMixColors = [
  "#2196f3",
  "#f44336",
  "#ffeb3b",
  "#ff9800",
  "#4caf50",
  "#00bcd4",
  "#9e9e9e",
  "#ff5722",
  "#ffc107",
  "#9c27b0",
]

export default function DistributionCenterRoute() {
  const [forklifts, setForklifts] = useState([30])
  const [orderAssembling, setOrderAssembling] = useState([4])
  const [unloadDock, setUnloadDock] = useState([2])
  const [unloadingTrucks, setUnloadingTrucks] = useState([7])
  const [loadingTrucks, setLoadingTrucks] = useState([3])
  const [ordersPerHour, setOrdersPerHour] = useState([3])
  const [truckCapacity, setTruckCapacity] = useState([15])
  const [minOrderSize, setMinOrderSize] = useState([10])
  const [maxOrderSize, setMaxOrderSize] = useState([14])
  const [numberOfOrders] = useState(0)

  return (
    <div className="pt-4 pl-4">
      <div className="">
        {/* Header */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-blue-600">Supply Chain Simulation</h1>
          
          </div>
          <p className="text-blue-500 mt-2 text-lg">Distribution Center Operations & Analytics</p>
        </div>

        {/* Input Data Controls - Top Layer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          {/* Left Column - Equipment Controls */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-center">Equipment Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Forklifts</span>
                    <span className="text-lg font-bold">{forklifts[0]}</span>
                  </div>
                  <Slider
                    value={forklifts}
                    onValueChange={setForklifts}
                    min={10}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>10</span>
                    <span>50</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Per Order Assembling</span>
                    <span className="text-lg font-bold">{orderAssembling[0]}</span>
                  </div>
                  <Slider
                    value={orderAssembling}
                    onValueChange={setOrderAssembling}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Per Unload Dock</span>
                    <span className="text-lg font-bold">{unloadDock[0]}</span>
                  </div>
                  <Slider
                    value={unloadDock}
                    onValueChange={setUnloadDock}
                    min={0}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>10</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Operations Controls */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-center">Operations Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Unloading Trucks/Hour</span>
                    <span className="text-lg font-bold">{unloadingTrucks[0]}</span>
                  </div>
                  <Slider
                    value={unloadingTrucks}
                    onValueChange={setUnloadingTrucks}
                    min={0}
                    max={15}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>15</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Loading Trucks/Hour</span>
                    <span className="text-lg font-bold">{loadingTrucks[0]}</span>
                  </div>
                  <Slider
                    value={loadingTrucks}
                    onValueChange={setLoadingTrucks}
                    min={0}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>10</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Orders/Hour</span>
                    <span className="text-lg font-bold">{ordersPerHour[0]}</span>
                  </div>
                  <Slider
                    value={ordersPerHour}
                    onValueChange={setOrdersPerHour}
                    min={0}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>10</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Capacity Controls */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-center">Capacity Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Truck Capacity</span>
                    <span className="text-lg font-bold">{truckCapacity[0]}</span>
                  </div>
                  <Slider
                    value={truckCapacity}
                    onValueChange={setTruckCapacity}
                    min={10}
                    max={30}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>10</span>
                    <span>30</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Min Order Size</span>
                    <span className="text-lg font-bold">{minOrderSize[0]}</span>
                  </div>
                  <Slider
                    value={minOrderSize}
                    onValueChange={setMinOrderSize}
                    min={1}
                    max={20}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1</span>
                    <span>20</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Max Order Size</span>
                    <span className="text-lg font-bold">{maxOrderSize[0]}</span>
                  </div>
                  <Slider
                    value={maxOrderSize}
                    onValueChange={setMaxOrderSize}
                    min={10}
                    max={25}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>10</span>
                    <span>25</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Create Orders Section */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-center">Order Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-600">Create Orders</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {[0, 0, 0, 14, 0, 0, 0, 0, 0, 0].map((value, index) => (
                      <Button
                        key={index}
                        variant={value > 0 ? "default" : "outline"}
                        size="sm"
                        className="h-8 w-8 p-0 text-xs font-bold"
                        style={{
                          backgroundColor: value > 0 ? orderMixColors[index] : undefined,
                          color: value > 0 ? "white" : undefined,
                        }}
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Number of Orders:</span>
                    <span className="text-lg font-bold text-blue-600">{numberOfOrders}</span>
                  </div>
                  <div className="text-sm text-gray-600">Order Mix Distribution</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content - Left: Simulation, Right: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - AnyLogic Simulation */}
          <Card >
            <CardHeader>
              <CardTitle className="text-lg">Distribution Center Simulation</CardTitle>
            </CardHeader>
            <CardContent className="h-[900px]">
            
                <iframe
                  width="100%"
                  height="100%"
                  allow="fullscreen"
                  src="https://cloud.anylogic.com/assets/embed?modelId=578a4f21-b431-4942-afa0-e0a75060f8b5"
                  className="border-0"
                  title="Distribution Center Simulation"
                />
             
            </CardContent>
          </Card>

          {/* Right Panel - Charts */}
          <Card className="">
            <CardHeader>
              <CardTitle className="text-lg">Operations Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="h-full p-4 overflow-y-auto">
              <div className="space-y-4">
                {/* Processing Time Chart - Full Width */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3 text-gray-700">Processing Time Analysis</h3>
                  <ChartContainer
                    config={{
                      truckUnloading: { label: "Truck Unloading", color: "hsl(var(--chart-1))" },
                      orderAssembling: { label: "Order Assembling", color: "hsl(var(--chart-2))" },
                      palletPickup: { label: "Pallet Pickup", color: "hsl(var(--chart-3))" },
                      truckLoading: { label: "Truck Loading", color: "hsl(var(--chart-4))" },
                      orderWaiting: { label: "Order Waiting", color: "hsl(var(--chart-5))" },
                      assemblingWaiting: { label: "Assembling Waiting", color: "hsl(var(--chart-1))" },
                    }}
                    className="h-48 w-full"
                  >
                    <LineChart
                      accessibilityLayer
                      data={processingTimeData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="time"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value}
                      />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                      <Line
                        dataKey="truckUnloading"
                        type="monotone"
                        stroke="var(--color-truckUnloading)"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        dataKey="orderAssembling"
                        type="monotone"
                        stroke="var(--color-orderAssembling)"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        dataKey="palletPickup"
                        type="monotone"
                        stroke="var(--color-palletPickup)"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        dataKey="truckLoading"
                        type="monotone"
                        stroke="var(--color-truckLoading)"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        dataKey="orderWaiting"
                        type="monotone"
                        stroke="var(--color-orderWaiting)"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        dataKey="assemblingWaiting"
                        type="monotone"
                        stroke="var(--color-assemblingWaiting)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>

                {/* Two Column Grid for Pie Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Orders Status Pie Chart */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3 text-gray-700">Order Status</h3>
                    <ChartContainer
                      config={{
                        queue: { label: "Queue", color: "hsl(var(--chart-1))" },
                        waitAssembling: { label: "Wait Assembling", color: "hsl(var(--chart-2))" },
                        assembling: { label: "Assembling", color: "hsl(var(--chart-3))" },
                        waitLoading: { label: "Wait Loading", color: "hsl(var(--chart-4))" },
                      }}
                      className="h-48 w-full"
                    >
                      <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie
                          data={[
                            { browser: "queue", visitors: 35, fill: "var(--color-queue)" },
                            { browser: "waitAssembling", visitors: 0, fill: "var(--color-waitAssembling)" },
                            { browser: "assembling", visitors: 4, fill: "var(--color-assembling)" },
                            { browser: "waitLoading", visitors: 8, fill: "var(--color-waitLoading)" },
                          ]}
                          dataKey="visitors"
                          nameKey="browser"
                          innerRadius={0}
                          strokeWidth={5}
                        />
                      </PieChart>
                    </ChartContainer>
                    <div className="mt-2 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span>Queue</span>
                        </div>
                        <span>35 (74%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          <span>Wait Assembling</span>
                        </div>
                        <span>0 (0%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <span>Assembling</span>
                        </div>
                        <span>4 (9%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>Wait Loading</span>
                        </div>
                        <span>8 (17%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Storage Space Pie Chart */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3 text-gray-700">Storage Space</h3>
                    <ChartContainer
                      config={{
                        freeSpace: { label: "Free Space", color: "hsl(var(--chart-1))" },
                        zoneA: { label: "Zone A", color: "hsl(var(--chart-2))" },
                        zoneB: { label: "Zone B", color: "hsl(var(--chart-3))" },
                        zoneC: { label: "Zone C", color: "hsl(var(--chart-4))" },
                        zoneD: { label: "Zone D", color: "hsl(var(--chart-5))" },
                      }}
                      className="h-48 w-full"
                    >
                      <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie
                          data={[
                            { browser: "freeSpace", visitors: 2796, fill: "var(--color-freeSpace)" },
                            { browser: "zoneA", visitors: 249, fill: "var(--color-zoneA)" },
                            { browser: "zoneB", visitors: 332, fill: "var(--color-zoneB)" },
                            { browser: "zoneC", visitors: 462, fill: "var(--color-zoneC)" },
                            { browser: "zoneD", visitors: 377, fill: "var(--color-zoneD)" },
                          ]}
                          dataKey="visitors"
                          nameKey="browser"
                          innerRadius={0}
                          strokeWidth={5}
                        />
                      </PieChart>
                    </ChartContainer>
                    <div className="mt-2 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span>Free Space</span>
                        </div>
                        <span>2,796 (49%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          <span>Zone A</span>
                        </div>
                        <span>249 (4%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <span>Zone B</span>
                        </div>
                        <span>332 (6%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>Zone C</span>
                        </div>
                        <span>462 (8%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span>Zone D</span>
                        </div>
                        <span>377 (7%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resource Utilization Chart - Full Width */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3 text-gray-700">Resource Utilization</h3>
                  <ChartContainer
                    config={{
                      forklifts: { label: "Forklifts", color: "hsl(var(--chart-1))" },
                      unloadingDocks: { label: "Unloading Docks", color: "hsl(var(--chart-2))" },
                      loadingDocks: { label: "Loading Docks", color: "hsl(var(--chart-3))" },
                      storage: { label: "Storage", color: "hsl(var(--chart-4))" },
                    }}
                    className="h-48 w-full"
                  >
                    <LineChart
                      accessibilityLayer
                      data={utilizationData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="time"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value}
                      />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                      <Line
                        dataKey="forklifts"
                        type="monotone"
                        stroke="var(--color-forklifts)"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        dataKey="unloadingDocks"
                        type="monotone"
                        stroke="var(--color-unloadingDocks)"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        dataKey="loadingDocks"
                        type="monotone"
                        stroke="var(--color-loadingDocks)"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        dataKey="storage"
                        type="monotone"
                        stroke="var(--color-storage)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>

                {/* Throughput Chart - Full Width */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3 text-gray-700">Hourly Throughput</h3>
                  <ChartContainer
                    config={{
                      inbound: { label: "Inbound", color: "hsl(var(--chart-1))" },
                      outbound: { label: "Outbound", color: "hsl(var(--chart-2))" },
                      processed: { label: "Processed", color: "hsl(var(--chart-3))" },
                    }}
                    className="h-48 w-full"
                  >
                    <BarChart
                      accessibilityLayer
                      data={throughputData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="hour"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value}
                      />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                      <Bar dataKey="inbound" fill="var(--color-inbound)" radius={8} />
                      <Bar dataKey="outbound" fill="var(--color-outbound)" radius={8} />
                      <Bar dataKey="processed" fill="var(--color-processed)" radius={8} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
