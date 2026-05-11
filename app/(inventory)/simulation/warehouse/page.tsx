"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, BarChart, Bar, Area, AreaChart } from "recharts"
import { useState } from "react"

// Sample data for warehouse charts
const staffUtilizationData = [
  {
    time: "07:00",
    unloaders: 0.8,
    retailTrucks: 0.6,
    acceptors: 0.7,
    transfers: 0.9,
    forklifts: 0.5,
    handloaders: 0.4,
    sorters: 0.6,
  },
  {
    time: "08:00",
    unloaders: 0.9,
    retailTrucks: 0.7,
    acceptors: 0.8,
    transfers: 0.8,
    forklifts: 0.6,
    handloaders: 0.5,
    sorters: 0.7,
  },
  {
    time: "09:00",
    unloaders: 0.7,
    retailTrucks: 0.8,
    acceptors: 0.9,
    transfers: 0.7,
    forklifts: 0.7,
    handloaders: 0.6,
    sorters: 0.8,
  },
  {
    time: "10:00",
    unloaders: 0.6,
    retailTrucks: 0.9,
    acceptors: 0.6,
    transfers: 0.6,
    forklifts: 0.8,
    handloaders: 0.7,
    sorters: 0.9,
  },
  {
    time: "11:00",
    unloaders: 0.8,
    retailTrucks: 0.5,
    acceptors: 0.7,
    transfers: 0.8,
    forklifts: 0.9,
    handloaders: 0.8,
    sorters: 0.5,
  },
  {
    time: "12:00",
    unloaders: 0.9,
    retailTrucks: 0.6,
    acceptors: 0.8,
    transfers: 0.9,
    forklifts: 0.6,
    handloaders: 0.9,
    sorters: 0.6,
  },
]

const spaceUtilizationData = [
  {
    time: "07:00",
    unloadingZone: 0.3,
    receptionZone: 0.2,
    placementZone: 0.4,
    storage: 0.6,
    controlZone: 0.1,
    dispatchZone: 0.2,
  },
  {
    time: "08:00",
    unloadingZone: 0.4,
    receptionZone: 0.3,
    placementZone: 0.5,
    storage: 0.7,
    controlZone: 0.2,
    dispatchZone: 0.3,
  },
  {
    time: "09:00",
    unloadingZone: 0.5,
    receptionZone: 0.4,
    placementZone: 0.6,
    storage: 0.8,
    controlZone: 0.3,
    dispatchZone: 0.4,
  },
  {
    time: "10:00",
    unloadingZone: 0.6,
    receptionZone: 0.5,
    placementZone: 0.7,
    storage: 0.9,
    controlZone: 0.4,
    dispatchZone: 0.5,
  },
  {
    time: "11:00",
    unloadingZone: 0.4,
    receptionZone: 0.6,
    placementZone: 0.5,
    storage: 0.7,
    controlZone: 0.5,
    dispatchZone: 0.6,
  },
  {
    time: "12:00",
    unloadingZone: 0.3,
    receptionZone: 0.7,
    placementZone: 0.4,
    storage: 0.6,
    controlZone: 0.6,
    dispatchZone: 0.7,
  },
]

const orderProcessingData = [
  { hour: "07:00", received: 45, processed: 38, dispatched: 35 },
  { hour: "08:00", received: 52, processed: 45, dispatched: 42 },
  { hour: "09:00", received: 48, processed: 50, dispatched: 45 },
  { hour: "10:00", received: 55, processed: 52, dispatched: 48 },
  { hour: "11:00", received: 60, processed: 58, dispatched: 55 },
  { hour: "12:00", received: 58, processed: 55, dispatched: 52 },
]

const warehouseEfficiencyData = [
  { metric: "Throughput", current: 85, target: 90 },
  { metric: "Accuracy", current: 98, target: 99 },
  { metric: "On-time", current: 92, target: 95 },
  { metric: "Space Util", current: 78, target: 85 },
]

export default function WarehouseRoute() {
  const [unloaders, setUnloaders] = useState([3])
  const [loaders, setLoaders] = useState([3])
  const [transfers, setTransfers] = useState([7])
  const [controllers, setControllers] = useState([3])
  const [acceptors, setAcceptors] = useState([3])
  const [forklifts, setForklifts] = useState([8])
  const [retailTrucks, setRetailTrucks] = useState([5])
  const [orderInterarrivalMin, setOrderInterarrivalMin] = useState([3.0])
  const [orderInterarrivalMax, setOrderInterarrivalMax] = useState([5.0])
  const [ordersQueueCapacity, setOrdersQueueCapacity] = useState([20])
  const [deliveryTimeMin, setDeliveryTimeMin] = useState([3.0])
  const [deliveryTimeMax, setDeliveryTimeMax] = useState([8.0])
  const [loadingTimeMin, setLoadingTimeMin] = useState([3.0])
  const [loadingTimeMax, setLoadingTimeMax] = useState([8.0])
  const [supplyInterarrivalMin, setSupplyInterarrivalMin] = useState([10.0])
  const [supplyInterarrivalMax, setSupplyInterarrivalMax] = useState([20.0])
  const [unloadingTimeMin, setUnloadingTimeMin] = useState([2.0])
  const [unloadingTimeMax, setUnloadingTimeMax] = useState([5.0])
  const [showZones, setShowZones] = useState(true)

  return (
    <div className="pt-4 pl-4">
      <div className="">
        {/* Header */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-blue-600">Warehouse Simulation</h1>
          
          </div>
       
        </div>

        {/* Input Data Controls - Top Layer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          {/* Staff Configuration */}
          <div className="lg:col-span-3">
            <Card className="h-[380px]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-center">Staff Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 h-full overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Unloaders</span>
                    <span className="text-lg font-bold">{unloaders[0]}</span>
                  </div>
                  <Slider value={unloaders} onValueChange={setUnloaders} min={1} max={10} step={1} className="w-full" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Loaders</span>
                    <span className="text-lg font-bold">{loaders[0]}</span>
                  </div>
                  <Slider value={loaders} onValueChange={setLoaders} min={1} max={10} step={1} className="w-full" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Transfers</span>
                    <span className="text-lg font-bold">{transfers[0]}</span>
                  </div>
                  <Slider value={transfers} onValueChange={setTransfers} min={1} max={15} step={1} className="w-full" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Controllers</span>
                    <span className="text-lg font-bold">{controllers[0]}</span>
                  </div>
                  <Slider
                    value={controllers}
                    onValueChange={setControllers}
                    min={1}
                    max={8}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Acceptors</span>
                    <span className="text-lg font-bold">{acceptors[0]}</span>
                  </div>
                  <Slider value={acceptors} onValueChange={setAcceptors} min={1} max={8} step={1} className="w-full" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Equipment Configuration */}
          <div className="lg:col-span-3">
            <Card className="h-[380px]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-center">Equipment Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 h-full overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Forklifts</span>
                    <span className="text-lg font-bold">{forklifts[0]}</span>
                  </div>
                  <Slider value={forklifts} onValueChange={setForklifts} min={1} max={15} step={1} className="w-full" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Retail Trucks</span>
                    <span className="text-lg font-bold">{retailTrucks[0]}</span>
                  </div>
                  <Slider
                    value={retailTrucks}
                    onValueChange={setRetailTrucks}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Delivery Time (min)</span>
                    <span className="text-sm font-bold">
                      {deliveryTimeMin[0]} - {deliveryTimeMax[0]}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Slider
                      value={deliveryTimeMin}
                      onValueChange={setDeliveryTimeMin}
                      min={1.0}
                      max={10.0}
                      step={0.5}
                      className="w-full"
                    />
                    <Slider
                      value={deliveryTimeMax}
                      onValueChange={setDeliveryTimeMax}
                      min={5.0}
                      max={15.0}
                      step={0.5}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Loading Time (min)</span>
                    <span className="text-sm font-bold">
                      {loadingTimeMin[0]} - {loadingTimeMax[0]}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Slider
                      value={loadingTimeMin}
                      onValueChange={setLoadingTimeMin}
                      min={1.0}
                      max={10.0}
                      step={0.5}
                      className="w-full"
                    />
                    <Slider
                      value={loadingTimeMax}
                      onValueChange={setLoadingTimeMax}
                      min={5.0}
                      max={15.0}
                      step={0.5}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders Configuration */}
          <div className="lg:col-span-3">
            <Card className="h-[380px]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-center">Orders Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 h-full overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Interarrival Time (min)</span>
                    <span className="text-sm font-bold">
                      {orderInterarrivalMin[0]} - {orderInterarrivalMax[0]}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Slider
                      value={orderInterarrivalMin}
                      onValueChange={setOrderInterarrivalMin}
                      min={1.0}
                      max={8.0}
                      step={0.5}
                      className="w-full"
                    />
                    <Slider
                      value={orderInterarrivalMax}
                      onValueChange={setOrderInterarrivalMax}
                      min={3.0}
                      max={10.0}
                      step={0.5}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Queue Capacity</span>
                    <span className="text-lg font-bold">{ordersQueueCapacity[0]}</span>
                  </div>
                  <Slider
                    value={ordersQueueCapacity}
                    onValueChange={setOrdersQueueCapacity}
                    min={10}
                    max={50}
                    step={5}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Supply Trucks Configuration */}
          <div className="lg:col-span-3">
            <Card className="h-[380px]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-center">Supply Trucks Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 h-full overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Interarrival Time (min)</span>
                    <span className="text-sm font-bold">
                      {supplyInterarrivalMin[0]} - {supplyInterarrivalMax[0]}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Slider
                      value={supplyInterarrivalMin}
                      onValueChange={setSupplyInterarrivalMin}
                      min={5.0}
                      max={20.0}
                      step={1.0}
                      className="w-full"
                    />
                    <Slider
                      value={supplyInterarrivalMax}
                      onValueChange={setSupplyInterarrivalMax}
                      min={15.0}
                      max={30.0}
                      step={1.0}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">Unloading Time (min)</span>
                    <span className="text-sm font-bold">
                      {unloadingTimeMin[0]} - {unloadingTimeMax[0]}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Slider
                      value={unloadingTimeMin}
                      onValueChange={setUnloadingTimeMin}
                      min={1.0}
                      max={8.0}
                      step={0.5}
                      className="w-full"
                    />
                    <Slider
                      value={unloadingTimeMax}
                      onValueChange={setUnloadingTimeMax}
                      min={3.0}
                      max={10.0}
                      step={0.5}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="showZones" checked={showZones} onCheckedChange={(checked) => setShowZones(checked === true)} />
                  <label
                    htmlFor="showZones"
                    className="text-sm font-medium text-blue-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Show zones
                  </label>
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
              <CardTitle className="text-lg">Warehouse Simulation</CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="h-full w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                <iframe
                  width="100%"
                  height="600"
                  allow="fullscreen"
                  src="https://cloud.anylogic.com/assets/embed?modelId=4a46ff78-9479-45c5-9742-f47ef4affd11"
                  className="border-0"
                  title="Warehouse Simulation"
                />
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Charts */}
          <Card >
            <CardHeader>
              <CardTitle className="text-lg">Warehouse Analytics</CardTitle>
            </CardHeader>
            <CardContent className="px-4 grid grid-cols-2 gap-4">
            
                {/* Staff and Equipment Utilization Chart - Full Width */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3 text-gray-700">Staff and Equipment Utilization</h3>
                  <ChartContainer
                    config={{
                      unloaders: { label: "Unloaders", color: "hsl(var(--chart-1))" },
                      retailTrucks: { label: "Retail Trucks", color: "hsl(var(--chart-2))" },
                      acceptors: { label: "Acceptors", color: "hsl(var(--chart-3))" },
                      transfers: { label: "Transfers", color: "hsl(var(--chart-4))" },
                      forklifts: { label: "Forklifts", color: "hsl(var(--chart-5))" },
                      handloaders: { label: "Handloaders", color: "hsl(var(--chart-1))" },
                      sorters: { label: "Sorters", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-48 w-full"
                  >
                    <BarChart
                      accessibilityLayer
                      data={staffUtilizationData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                      <Bar dataKey="unloaders" fill="var(--color-unloaders)" radius={2} />
                      <Bar dataKey="retailTrucks" fill="var(--color-retailTrucks)" radius={2} />
                      <Bar dataKey="acceptors" fill="var(--color-acceptors)" radius={2} />
                      <Bar dataKey="transfers" fill="var(--color-transfers)" radius={2} />
                      <Bar dataKey="forklifts" fill="var(--color-forklifts)" radius={2} />
                      <Bar dataKey="handloaders" fill="var(--color-handloaders)" radius={2} />
                      <Bar dataKey="sorters" fill="var(--color-sorters)" radius={2} />
                    </BarChart>
                  </ChartContainer>
                  <div className="mt-2 grid grid-cols-4 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Unloaders</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span>Retail Trucks</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span>Acceptors</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Transfers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span>Forklifts</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Handloaders</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span>Sorters</span>
                    </div>
                  </div>
                </div>

                {/* Space Utilization Zone Chart - Full Width */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3 text-gray-700">Space Utilization Zone</h3>
                  <ChartContainer
                    config={{
                      unloadingZone: { label: "Unloading Zone", color: "hsl(var(--chart-1))" },
                      receptionZone: { label: "Reception Zone", color: "hsl(var(--chart-2))" },
                      placementZone: { label: "Placement Zone", color: "hsl(var(--chart-3))" },
                      storage: { label: "Storage", color: "hsl(var(--chart-4))" },
                      controlZone: { label: "Control Zone", color: "hsl(var(--chart-5))" },
                      dispatchZone: { label: "Dispatch Zone", color: "hsl(var(--chart-1))" },
                    }}
                    className="h-48 w-full"
                  >
                    <AreaChart
                      accessibilityLayer
                      data={spaceUtilizationData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                      <defs>
                        <linearGradient id="fillUnloading" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-unloadingZone)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="var(--color-unloadingZone)" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="fillReception" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-receptionZone)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="var(--color-receptionZone)" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="fillPlacement" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-placementZone)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="var(--color-placementZone)" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="fillStorage" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-storage)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="var(--color-storage)" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="fillControl" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-controlZone)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="var(--color-controlZone)" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="fillDispatch" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-dispatchZone)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="var(--color-dispatchZone)" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <Area
                        dataKey="unloadingZone"
                        type="monotone"
                        fill="url(#fillUnloading)"
                        stroke="var(--color-unloadingZone)"
                        stackId="a"
                      />
                      <Area
                        dataKey="receptionZone"
                        type="monotone"
                        fill="url(#fillReception)"
                        stroke="var(--color-receptionZone)"
                        stackId="a"
                      />
                      <Area
                        dataKey="placementZone"
                        type="monotone"
                        fill="url(#fillPlacement)"
                        stroke="var(--color-placementZone)"
                        stackId="a"
                      />
                      <Area
                        dataKey="storage"
                        type="monotone"
                        fill="url(#fillStorage)"
                        stroke="var(--color-storage)"
                        stackId="a"
                      />
                      <Area
                        dataKey="controlZone"
                        type="monotone"
                        fill="url(#fillControl)"
                        stroke="var(--color-controlZone)"
                        stackId="a"
                      />
                      <Area
                        dataKey="dispatchZone"
                        type="monotone"
                        fill="url(#fillDispatch)"
                        stroke="var(--color-dispatchZone)"
                        stackId="a"
                      />
                    </AreaChart>
                  </ChartContainer>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Unloading Zone</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span>Reception Zone</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span>Placement Zone</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Storage</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span>Control Zone</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Dispatch Zone</span>
                    </div>
                  </div>
                </div>

                {/* Order Processing Chart - Full Width */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3 text-gray-700">Order Processing Flow</h3>
                  <ChartContainer
                    config={{
                      received: { label: "Received", color: "hsl(var(--chart-1))" },
                      processed: { label: "Processed", color: "hsl(var(--chart-2))" },
                      dispatched: { label: "Dispatched", color: "hsl(var(--chart-3))" },
                    }}
                    className="h-48 w-full"
                  >
                    <LineChart
                      accessibilityLayer
                      data={orderProcessingData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                      <Line
                        dataKey="received"
                        type="monotone"
                        stroke="var(--color-received)"
                        strokeWidth={3}
                        dot={false}
                      />
                      <Line
                        dataKey="processed"
                        type="monotone"
                        stroke="var(--color-processed)"
                        strokeWidth={3}
                        dot={false}
                      />
                      <Line
                        dataKey="dispatched"
                        type="monotone"
                        stroke="var(--color-dispatched)"
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>

                {/* Warehouse Efficiency Metrics - Full Width */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3 text-gray-700">Warehouse Efficiency Metrics</h3>
                  <ChartContainer
                    config={{
                      current: { label: "Current", color: "hsl(var(--chart-1))" },
                      target: { label: "Target", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-48 w-full"
                  >
                    <BarChart
                      accessibilityLayer
                      data={warehouseEfficiencyData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="metric" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                      <Bar dataKey="current" fill="var(--color-current)" radius={4} />
                      <Bar dataKey="target" fill="var(--color-target)" radius={4} />
                    </BarChart>
                  </ChartContainer>
                </div>
            
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
