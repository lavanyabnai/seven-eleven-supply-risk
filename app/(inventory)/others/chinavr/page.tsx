"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ParametersTab from "@/components/china-vr-transport-costing/parameters-tab"
import ResultsTab from "@/components/china-vr-transport-costing/results-tab"
import AnalyticsTab from "@/components/china-vr-transport-costing/analytics-tab"
import OptimizationTab from "@/components/china-vr-transport-costing/optimization-tab"
import { useTransportCalculations } from "@/hooks/use-transport-calculations"

export default function FergusonImportSourcingPage() {
  // State management
  const [selectedRoute, setSelectedRoute] = useState("Qingdao-QingdaoPort")
  const [selectedTruck, setSelectedTruck] = useState("medium")
  const [selectedContainer, setSelectedContainer] = useState("40ft")
  const [vrQuantity, setVrQuantity] = useState(1000)
  const [annualTrips, setAnnualTrips] = useState(100)
  const [utilization, setUtilization] = useState(70)
  const [backhaul, setBackhaul] = useState(30)
  const [activeTab, setActiveTab] = useState("parameters")

  // Calculations hook
  const calculations = useTransportCalculations({
    selectedRoute,
    selectedTruck,
    selectedContainer,
    vrQuantity,
    annualTrips,
    utilization,
    backhaul,
  })

  const parameters = {
    selectedRoute,
    setSelectedRoute,
    selectedTruck,
    setSelectedTruck,
    selectedContainer,
    setSelectedContainer,
    vrQuantity,
    setVrQuantity,
    annualTrips,
    setAnnualTrips,
    utilization,
    setUtilization,
    backhaul,
    setBackhaul,
  }

  return (
    <div className="w-full p-4">
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Ferguson International Sourcing — China Import Logistics</h1>
          <p className="text-lg text-gray-600">
            Inbound transportation cost analysis for plumbing fixtures, faucets, and PVF products sourced from China to Ferguson import centers
          </p>
          <div className="flex gap-3 mt-3">
            <div className="bg-blue-100 px-3 py-1 rounded-full text-sm text-blue-800">3 Import Centers</div>
            <div className="bg-green-100 px-3 py-1 rounded-full text-sm text-green-800">36,000+ Suppliers</div>
            <div className="bg-orange-100 px-3 py-1 rounded-full text-sm text-orange-800">Factory → Port → US DC</div>
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
            <ParametersTab parameters={parameters} calculations={calculations} />
          </TabsContent>

          <TabsContent value="results">
            <ResultsTab calculations={calculations} annualTrips={annualTrips} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab
              calculations={calculations}
              selectedTruck={selectedTruck}
              annualTrips={annualTrips}
              utilization={utilization}
              backhaul={backhaul}
            />
          </TabsContent>

          <TabsContent value="optimization">
            <OptimizationTab calculations={calculations} annualTrips={annualTrips} backhaul={backhaul} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
