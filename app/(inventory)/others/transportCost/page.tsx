"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import USAParametersTab from "@/components/usa-trans/usa-parameters-tab"
import USAResultsTab from "@/components/usa-trans/usa-results-tab"
import USAAnalyticsTab from "@/components/usa-trans/usa-analytics-tab"
import USAOptimizationTab from "@/components/usa-trans/usa-optimization-tab"
import { useUSATransportCalculations } from "@/hooks/use-usa-transport"

export default function USATransportCostingPage() {
  // State management
  const [selectedRoute, setSelectedRoute] = useState("LA-NY")
  const [selectedTruck, setSelectedTruck] = useState("semi")
  const [selectedContainer, setSelectedContainer] = useState("dry")
  const [cargoQuantity, setCargoQuantity] = useState(1000)
  const [cargoType, setCargoType] = useState("consumer_goods")
  const [annualTrips, setAnnualTrips] = useState(120)
  const [utilization, setUtilization] = useState(80)
  const [backhaul, setBackhaul] = useState(75)
  const [driverSalaryTier, setDriverSalaryTier] = useState("average")
  const [activeTab, setActiveTab] = useState("parameters")

  // Calculations hook
  const calculations = useUSATransportCalculations({
    selectedRoute,
    selectedTruck,
    selectedContainer,
    cargoQuantity,
    annualTrips,
    utilization,
    backhaul,
    driverSalaryTier: driverSalaryTier as "average" | "low" | "high",
    cargoType,
  })

  const parameters = {
    selectedRoute,
    setSelectedRoute,
    selectedTruck,
    setSelectedTruck,
    selectedContainer,
    setSelectedContainer,
    cargoQuantity,
    setCargoQuantity,
    cargoType,
    setCargoType,
    annualTrips,
    setAnnualTrips,
    utilization,
    setUtilization,
    backhaul,
    setBackhaul,
    driverSalaryTier,
    setDriverSalaryTier,
  }

  return (
    <div className="w-full p-6 space-y-6">
      <div>
        {/* Header */}
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display">Ferguson Domestic Freight Cost Calculator</h1>
          <p className="text-sm text-gray-600 mt-1">
            Transportation cost analysis for Ferguson&apos;s US distribution network — DC-to-branch and direct-to-jobsite freight operations
          </p>
          <div className="flex gap-4 mt-3">
            <div className="bg-blue-100 px-3 py-1 rounded-full text-sm text-blue-800">ATRI 2024 Benchmarks</div>
            <div className="bg-green-100 px-3 py-1 rounded-full text-sm text-green-800">BLS Labor Data</div>
            <div className="bg-orange-100 px-3 py-1 rounded-full text-sm text-orange-800">Real-time Fuel Prices</div>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="results">Cost Results</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="parameters">
            <USAParametersTab parameters={parameters} calculations={calculations} />
          </TabsContent>

          <TabsContent value="results">
            <USAResultsTab calculations={calculations} annualTrips={annualTrips} />
          </TabsContent>

          <TabsContent value="analytics">
            <USAAnalyticsTab
              calculations={calculations}
              selectedTruck={selectedTruck}
              annualTrips={annualTrips}
              utilization={utilization}
              backhaul={backhaul}
            />
          </TabsContent>

          <TabsContent value="optimization">
            <USAOptimizationTab calculations={calculations} annualTrips={annualTrips} backhaul={backhaul} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
