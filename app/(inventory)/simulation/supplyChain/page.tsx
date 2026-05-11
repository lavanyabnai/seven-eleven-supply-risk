"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend,
  ChartLegendContent, } from "@/components/ui/chart"
import { Line, LineChart,Area, AreaChart, XAxis, CartesianGrid,YAxis, Bar, BarChart } from "recharts"

// Generate data that matches the reference chart pattern for single chart
const generateRawMaterialData = () => {
  const data: { x: number; value: number }[] = []
  for (let x = 0; x <= 100; x += 2) {
    let value
    if (x <= 10) {
      // Sharp exponential decay from 5000 to near 0
      value = 5000 * Math.exp(-x * 0.8)
    } else {
      // Stays near zero with minimal fluctuation
      value = Math.random() * 50
    }
    data.push({
      x,
      value: Math.max(0, Math.round(value)),
    })
  }
  return data
}

// Generate data for different chart types in dashboard
const generateChartData = (type: string) => {
  const data: { x: number; value: number }[] = []
  for (let x = 140; x <= 220; x += 2) {
    let value
    const timePhase = (x - 140) / 80

    switch (type) {
      case "inProduction":
        // Spiky pattern with periodic peaks
        value = Math.sin(x * 0.3) > 0.7 ? 400 + Math.random() * 100 : 50 + Math.random() * 50
        break
      case "distributorsStorage":
        // Fluctuating area pattern
        value = 1000 + Math.sin(x * 0.1) * 400 + Math.cos(x * 0.05) * 200 + Math.random() * 100
        break
      case "shippingToRetailers":
        // Green bar spikes
        value = Math.sin(x * 0.2) > 0.5 ? 80 + Math.random() * 40 : 10 + Math.random() * 10
        break
      case "backlogRetailers":
        // Flat line near zero
        value = Math.random() * 5
        break
      case "retailersStorage":
        // Multiple peaks and valleys
        value = 600 + Math.sin(x * 0.08) * 200 + Math.cos(x * 0.15) * 150 + Math.random() * 50
        break
      case "producersStorage":
        // Step-like pattern
        value = 800 + Math.floor(timePhase * 6) * 200 + Math.sin(x * 0.1) * 100 + Math.random() * 100
        break
      case "shippingToDistributors":
        // Orange bar spikes
        value = Math.sin(x * 0.25) > 0.6 ? 300 + Math.random() * 100 : 20 + Math.random() * 20
        break
      case "producersStorageRaw":
        // Gray area with periodic peaks
        value = 400 + Math.sin(x * 0.12) * 200 + Math.random() * 50
        break
      default:
        value = 0
    }

    data.push({
      x,
      value: Math.max(0, Math.round(value)),
    })
  }
  return data
}

// Single Raw Material Chart Component
const SingleRawMaterialChart = () => {
  const rawMaterialData = generateRawMaterialData()

  return (
    <Card className="w-full mx-4">
      <CardContent className="p-4">
        <ChartContainer
          config={{
            value: {
              label: "Raw material shipping (PVC resin, copper, steel)",
              color: "hsl(200, 100%, 60%)",
            },
          }}
          className="h-[200px] w-full"
        >
          <AreaChart
            data={rawMaterialData}
            margin={{
              left: 20,
              right: 20,
              top: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 70%)" opacity={0.5} />
            <XAxis
              dataKey="x"
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(0, 0%, 40%)", fontSize: 12 }}
            />
            <YAxis
              domain={[0, 5000]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(0, 0%, 40%)", fontSize: 12 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="value"
              type="monotone"
              fill="var(--color-value)"
              fillOpacity={0.8}
              stroke="var(--color-value)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
          <span className="text-blue-600 text-sm">Raw material shipping (PVC resin, copper, steel)</span>
        </div>
      </CardContent>
    </Card>
  )
}

// Chart Card Component for Dashboard
const ChartCard = ({
  title,
  data,
  color,
  type = "area",
  maxValue = 2000,
}: {
  title: string
  data: any[]
  color: string
  type?: "area" | "bar" | "line"
  maxValue?: number
}) => {
  const ChartComponent = type === "bar" ? BarChart : type === "line" ? LineChart : AreaChart

  return (
    <Card>
      <CardContent className="p-4">
        <ChartContainer
          config={{
            value: {
              label: title,
              color,
            },
          }}
          className="h-[100px] w-full"
        >
          <ChartComponent
            data={data}
           
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 70%)" opacity={0.3} />
            <XAxis
              dataKey="x"
              domain={[140, 220]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(0, 0%, 40%)", fontSize: 10 }}
            />
            <YAxis
              domain={[0, maxValue]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(0, 0%, 40%)", fontSize: 10 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            {type === "area" && (
              <Area dataKey="value" type="monotone" fill={color} fillOpacity={0.8} stroke={color} strokeWidth={2} />
            )}
            {type === "bar" && <Bar dataKey="value" fill={color} radius={[2, 2, 0, 0]} />}
            {type === "line" && <Line dataKey="value" type="monotone" stroke={color} strokeWidth={2} dot={false} />}
          </ChartComponent>
        </ChartContainer>
        <div className="flex items-center gap-2 ">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
          <span className="text-sm" style={{ color }}>
            {title}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}


// Supply Chain Dashboard Component
const SupplyChainDashboard = () => {
  return (
    <div className="m-4 grid grid-cols-2 gap-4">
      <ChartCard
        title="Manufacturer production (Kohler/Moen/Delta)"
        data={generateChartData("inProduction")}
        color="hsl(0, 80%, 60%)"
        type="bar"
        maxValue={500}
      />
      <ChartCard
        title="Ferguson DC storage (12 regional DCs)"
        data={generateChartData("distributorsStorage")}
        color="hsl(25, 70%, 50%)"
        type="area"
        maxValue={2000}
      />
      <ChartCard
        title="Shipping DC to branches (1,700+ locations)"
        data={generateChartData("shippingToRetailers")}
        color="hsl(120, 70%, 50%)"
        type="bar"
        maxValue={150}
      />
      <ChartCard
        title="Branch backlog (contractor orders)"
        data={generateChartData("backlogRetailers")}
        color="hsl(0, 80%, 60%)"
        type="line"
        maxValue={1}
      />
      <ChartCard
        title="Branch inventory (plumbing/HVAC/pipe)"
        data={generateChartData("retailersStorage")}
        color="hsl(120, 70%, 50%)"
        type="area"
        maxValue={800}
      />
      <ChartCard
        title="Manufacturer finished goods storage"
        data={generateChartData("producersStorage")}
        color="hsl(0, 80%, 60%)"
        type="area"
        maxValue={2000}
      />
      <ChartCard
        title="Shipping manufacturers to Ferguson DCs"
        data={generateChartData("shippingToDistributors")}
        color="hsl(45, 90%, 60%)"
        type="bar"
        maxValue={500}
      />
      <ChartCard
        title="Raw material storage (PVC resin/copper/steel)"
        data={generateChartData("producersStorageRaw")}
        color="hsl(200, 50%, 60%)"
        type="area"
        maxValue={1000}
      />
    </div>
  )
}







// Generate sample data that mimics the pattern from the reference image
const generateData = () => {
  const data: { x: number; rawMaterialShipping: number; producersStorage: number; inProduction: number; producersStorageFinal: number; shippingToDistributors: number }[] = []
  for (let x = 0; x <= 350; x += 10) {
    // Create varying values that create overlapping areas
  
    const variation = Math.sin(x * 0.05) * 300

    data.push({
      x,
      rawMaterialShipping: Math.max(0, 800 + variation + Math.random() * 200),
      producersStorage: Math.max(0, 1200 + variation * 1.2 + Math.random() * 300),
      inProduction: Math.max(0, 1800 + variation * 0.8 + Math.random() * 400),
      producersStorageFinal: Math.max(0, 2400 + variation * 1.5 + Math.random() * 500),
      shippingToDistributors: Math.max(0, 3200 + variation * 1.1 + Math.random() * 600),
    })
  }
  return data
}

const chartData = generateData()

export default function SupplyChain() {


  return (
    <div className="pt-4 pl-4">
   
        {/* Header */}
     
        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-blue-700">Ferguson Supply Chain Simulation</h2>
          </div>

          {/* Search */}

          <div className="flex gap-2">
          
       
          </div>
        </div>
        {/* Top Row - 4 Control Panels */}
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Manufacturer Control Panel */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                Kohler Plant [Kohler, WI] Production
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Production capacity (units/day)</span>
                  <span>15,000</span>
                </div>
                <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Cost per unit (faucets)</span>
                  <span>$142</span>
                </div>
                <Slider defaultValue={[60]} max={100} step={1} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Quality level</span>
                  <span>96%</span>
                </div>
                <Slider defaultValue={[96]} max={100} step={1} className="w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Branch Control Panel */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Ferguson Branch [New York] Demand
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Weekly demand (faucets)</span>
                  <span>8,400</span>
                </div>
                <Slider defaultValue={[70]} max={100} step={1} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Branch inventory (units)</span>
                  <span>3,200</span>
                </div>
                <Slider defaultValue={[45]} max={100} step={1} className="w-full" />
              </div>
            </CardContent>
          </Card>

          {/* DC Control Panel */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                Ferguson DC [Newport News, VA] Hub
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>DC capacity (sqft)</span>
                  <span>850,000</span>
                </div>
                <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Throughput (units/day)</span>
                  <span>42,000</span>
                </div>
                <Slider defaultValue={[65]} max={100} step={1} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>On-time delivery</span>
                  <span>97%</span>
                </div>
                <Slider defaultValue={[97]} max={100} step={1} className="w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Supplier Control Panel */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Kohler Foshan [China] Import
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Unit cost (with 25% tariff)</span>
                  <span>$178</span>
                </div>
                <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Ocean transit (days)</span>
                  <span>35</span>
                </div>
                <Slider defaultValue={[58]} max={100} step={1} className="w-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row - 2 Large Panels */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Network Map */}
          <Card >
            <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Simulation Model</CardTitle>
             
            </CardHeader>
            <CardContent>
            <iframe
        width="100%"
        height="650"
        allow="fullscreen"
        src="https://cloud.anylogic.com/assets/embed?modelId=6c822278-59ca-4829-aa1b-1810b7f1a698"
      ></iframe>

<Card className="my-4 h-[400px]">
          <CardContent>
        <ChartContainer
          config={{
            rawMaterialShipping: {
              label: "Raw Materials to Manufacturers (PVC/Copper/Steel)",
              color: "hsl(210, 100%, 50%)",
            },
            producersStorage: {
              label: "Manufacturer Raw Material Storage",
              color: "hsl(0, 70%, 45%)",
            },
            inProduction: {
              label: "In Production (Kohler/Moen/Rheem/Charlotte Pipe)",
              color: "hsl(25, 85%, 55%)",
            },
            producersStorageFinal: {
              label: "Manufacturer Finished Goods",
              color: "hsl(120, 60%, 45%)",
            },
            shippingToDistributors: {
              label: "Shipping to Ferguson DCs",
              color: "hsl(45, 90%, 60%)",
            },
          }}
          className="h-[400px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 20,
              right: 20,
              top: 20,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
            <XAxis
              dataKey="x"
              type="number"
              scale="linear"
              domain={[0, 350]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis domain={[0, 5000]} tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend
              content={<ChartLegendContent />}
              verticalAlign="bottom"
              height={50}
              wrapperStyle={{ paddingTop: "20px" }}
            />

            {/* Areas stacked to create overlapping effect */}
            <Line
              dataKey="rawMaterialShipping"
              type="monotone"
              stroke="var(--color-rawMaterialShipping)"
              strokeWidth={3}
              dot={{ fill: "var(--color-rawMaterialShipping)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="producersStorage"
              type="monotone"
              stroke="var(--color-producersStorage)"
              strokeWidth={3}
              dot={{ fill: "var(--color-producersStorage)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="inProduction"
              type="monotone"
              stroke="var(--color-inProduction)"
              strokeWidth={3}
              dot={{ fill: "var(--color-inProduction)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="producersStorageFinal"
              type="monotone"
              stroke="var(--color-producersStorageFinal)"
              strokeWidth={3}
              dot={{ fill: "var(--color-producersStorageFinal)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="shippingToDistributors"
              type="monotone"
              stroke="var(--color-shippingToDistributors)"
              strokeWidth={3}
              dot={{ fill: "var(--color-shippingToDistributors)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <ChartLegend content={<ChartLegendContent />} verticalAlign="bottom" height={36} />
          </LineChart>
        </ChartContainer>
        </CardContent>
        </Card>
            </CardContent>
          </Card>

          {/* Right Panel - Charts Grid */}

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">Activity Chart</h1>
  
      </div>
    
      
     
        <SupplyChainDashboard />
        <SingleRawMaterialChart />
    </div>

  

    {/* ///////////////// */}
       
        </div>
      </div>

  )
}
