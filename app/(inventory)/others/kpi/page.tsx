"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, BarChart3, Settings, FileText, TrendingUp, Users } from "lucide-react"
import InputParameters from "@/components/others/input-parameters"
import ProcessCalculations from "@/components/others/process-calculations"
import CostAnalysis from "@/components/others/cost-analysis"
import PerformanceMetrics from "@/components/others/performance-metrics"
import Reports from "@/components/others/reports"
import LaborSpaceAnalysis from "@/components/others/labor-space-analysis"
import WarehouseDataTable from "@/components/others/warehouse-data-table"

export default function WarehouseCostingApp() {
  const [activeTab, setActiveTab] = useState("inputs")
  const [inputData, setInputData] = useState({
    volumeDrivers: {
      skus: 36000,
      orders: 8500,
      orderLines: 22000,
      casesPicked: 95000,
      palletsReceived: 3200,
      palletsShipped: 3100,
    },
    locationFactors: {
      country: "USA",
      city: "Front Royal, VA",
      laborCostPerHour: 21.5,
      energyCostPerKwh: 0.11,
      rentPerSqFt: 7.8,
      equipmentCostFactor: 1.15,
    },
    processAssumptions: {
      palletScanRequired: true,
      caseScanRequired: true,
      palletLabelingRequired: true,
      pickingMethod: "zone",
      automationLevel: "semi-automated",
    },
  })

  type CalculationResults = ReturnType<typeof performWarehouseCalculations>
  const [calculationResults, setCalculationResults] = useState<CalculationResults | null>(null)

  const handleCalculate = () => {
    // Perform calculations based on input data
    const results = performWarehouseCalculations(inputData)
    setCalculationResults(results)
    setActiveTab("calculations")
  }

  return (
    <div className="w-full p-6 space-y-6">

        <div className="border border-gray-200 rounded-lg p-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display">Ferguson DC Costing & Analytics Platform</h1>
          <p className="text-sm text-gray-500 mt-1">
            Distribution center cost modeling for Ferguson&apos;s 9 regional DCs and 5 MDCs — plumbing, HVAC, waterworks & PVF operations
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full lg:w-fit">
            <TabsTrigger value="inputs" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Inputs
            </TabsTrigger>
            <TabsTrigger value="calculations" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Calculations
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Cost Analysis
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              KPIs
            </TabsTrigger>
            <TabsTrigger value="labor-space" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Labor & Space
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="data-table" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Data Table
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inputs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Parameters</CardTitle>
                <CardDescription>Configure volume drivers, location factors, and process assumptions</CardDescription>
              </CardHeader>
              <CardContent>
                <InputParameters data={inputData} onChange={setInputData} onCalculate={handleCalculate} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calculations" className="space-y-6">
            <ProcessCalculations results={calculationResults} />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <CostAnalysis results={calculationResults} />
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <PerformanceMetrics results={calculationResults} />
          </TabsContent>

          <TabsContent value="labor-space" className="space-y-6">
            <LaborSpaceAnalysis results={calculationResults} />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Reports results={calculationResults} />
          </TabsContent>

          <TabsContent value="data-table" className="">
            <div className="p-4">
              <h1 className="text-2xl font-bold mb-6">Warehouse Operations Data</h1>
              <WarehouseDataTable />
            </div>
          </TabsContent>
        </Tabs>
     
    </div>
  )
}

// Calculation engine
function performWarehouseCalculations(inputData: any) {
  const { volumeDrivers, locationFactors, processAssumptions } = inputData

  // Process-specific calculations
  const processes = {
    receiving: calculateReceiving(volumeDrivers, locationFactors, processAssumptions),
    storage: calculateStorage(volumeDrivers, locationFactors, processAssumptions),
    picking: calculatePicking(volumeDrivers, locationFactors, processAssumptions),
    packing: calculatePacking(volumeDrivers, locationFactors, processAssumptions),
    shipping: calculateShipping(volumeDrivers, locationFactors, processAssumptions),
  }

  // Aggregate calculations
  const totalCosts = Object.values(processes).reduce(
    (acc, process) => ({
      labor: acc.labor + process.laborCost,
      space: acc.space + process.spaceCost,
      equipment: acc.equipment + process.equipmentCost,
      total: acc.total + process.totalCost,
    }),
    { labor: 0, space: 0, equipment: 0, total: 0 },
  )

  const totalFTEs = Object.values(processes).reduce((acc, process) => acc + process.ftes, 0)
  const totalSpace = Object.values(processes).reduce((acc, process) => acc + process.spaceRequired, 0)

  return {
    processes,
    totals: {
      costs: totalCosts,
      ftes: totalFTEs,
      space: totalSpace,
    },
    kpis: calculateKPIs(processes, volumeDrivers),
    benchmarks: getBenchmarkData(),
  }
}

function calculateReceiving(volumeDrivers: { palletsReceived: number }, locationFactors: { laborCostPerHour: number; rentPerSqFt: number; equipmentCostFactor: number }, processAssumptions: { automationLevel: string }) {
  const palletsPerHour = processAssumptions.automationLevel === "automated" ? 12 : 8
  const laborHours = volumeDrivers.palletsReceived / palletsPerHour
  const laborCost = laborHours * locationFactors.laborCostPerHour
  const spaceRequired = volumeDrivers.palletsReceived * 0.5 // sq ft per pallet
  const spaceCost = (spaceRequired * locationFactors.rentPerSqFt) / 12
  const equipmentCost = 2400 * locationFactors.equipmentCostFactor // forklift, scanners

  return {
    laborCost,
    spaceCost,
    equipmentCost,
    totalCost: laborCost + spaceCost + equipmentCost,
    ftes: laborHours / 2080, // annual hours
    spaceRequired,
    productivity: palletsPerHour,
    unitCost: (laborCost + spaceCost + equipmentCost) / volumeDrivers.palletsReceived,
  }
}

function calculateStorage(volumeDrivers: { skus: number }, locationFactors: { rentPerSqFt: number; laborCostPerHour: number; equipmentCostFactor: number }, _processAssumptions: any) {
  const storageUtilization = 0.85
  const spaceRequired = (volumeDrivers.skus * 2.5) / storageUtilization // sq ft
  const spaceCost = (spaceRequired * locationFactors.rentPerSqFt) / 12
  const laborHours = volumeDrivers.skus * 0.02 // minimal labor for storage management
  const laborCost = laborHours * locationFactors.laborCostPerHour
  const equipmentCost = 1800 * locationFactors.equipmentCostFactor // racking, WMS

  return {
    laborCost,
    spaceCost,
    equipmentCost,
    totalCost: laborCost + spaceCost + equipmentCost,
    ftes: laborHours / 2080,
    spaceRequired,
    productivity: storageUtilization,
    unitCost: (laborCost + spaceCost + equipmentCost) / volumeDrivers.skus,
  }
}

function calculatePicking(volumeDrivers: { orderLines: number }, locationFactors: { laborCostPerHour: number; rentPerSqFt: number; equipmentCostFactor: number }, processAssumptions: { pickingMethod: string }) {
  const pickingRates = {
    zone: 105,
    batch: 85,
    wave: 120,
  }
  const linesPerHour = pickingRates[processAssumptions.pickingMethod as keyof typeof pickingRates] || 105
  const laborHours = volumeDrivers.orderLines / linesPerHour
  const laborCost = laborHours * locationFactors.laborCostPerHour
  const spaceRequired = volumeDrivers.orderLines * 0.1 // picking aisles
  const spaceCost = (spaceRequired * locationFactors.rentPerSqFt) / 12
  const equipmentCost = 3200 * locationFactors.equipmentCostFactor // pick carts, scanners

  return {
    laborCost,
    spaceCost,
    equipmentCost,
    totalCost: laborCost + spaceCost + equipmentCost,
    ftes: laborHours / 2080,
    spaceRequired,
    productivity: linesPerHour,
    unitCost: (laborCost + spaceCost + equipmentCost) / volumeDrivers.orderLines,
  }
}

function calculatePacking(volumeDrivers: { orders: number }, locationFactors: { laborCostPerHour: number; rentPerSqFt: number; equipmentCostFactor: number }, _processAssumptions: any) {
  const packingRate = 25 // orders per hour
  const laborHours = volumeDrivers.orders / packingRate
  const laborCost = laborHours * locationFactors.laborCostPerHour
  const spaceRequired = volumeDrivers.orders * 0.05 // packing stations
  const spaceCost = (spaceRequired * locationFactors.rentPerSqFt) / 12
  const equipmentCost = 1500 * locationFactors.equipmentCostFactor // packing stations

  return {
    laborCost,
    spaceCost,
    equipmentCost,
    totalCost: laborCost + spaceCost + equipmentCost,
    ftes: laborHours / 2080,
    spaceRequired,
    productivity: packingRate,
    unitCost: (laborCost + spaceCost + equipmentCost) / volumeDrivers.orders,
  }
}

function calculateShipping(volumeDrivers: { orders: number }, locationFactors: { laborCostPerHour: number; rentPerSqFt: number; equipmentCostFactor: number }, _processAssumptions: any) {
  const shippingRate = 3 // orders per hour for loading
  const laborHours = volumeDrivers.orders / shippingRate
  const laborCost = laborHours * locationFactors.laborCostPerHour
  const spaceRequired = volumeDrivers.orders * 0.08 // shipping dock
  const spaceCost = (spaceRequired * locationFactors.rentPerSqFt) / 12
  const equipmentCost = 2800 * locationFactors.equipmentCostFactor // dock equipment

  return {
    laborCost,
    spaceCost,
    equipmentCost,
    totalCost: laborCost + spaceCost + equipmentCost,
    ftes: laborHours / 2080,
    spaceRequired,
    productivity: shippingRate,
    unitCost: (laborCost + spaceCost + equipmentCost) / volumeDrivers.orders,
  }
}

function calculateKPIs(processes: any, volumeDrivers: { orders: number; orderLines: number; casesPicked: number; palletsReceived: number }) {
  return {
    costPerOrder: processes.picking.totalCost / volumeDrivers.orders,
    costPerOrderLine: processes.picking.totalCost / volumeDrivers.orderLines,
    costPerCase: processes.picking.totalCost / volumeDrivers.casesPicked,
    costPerPallet: processes.receiving.totalCost / volumeDrivers.palletsReceived,
    laborProductivity: {
      receiving: processes.receiving.productivity,
      picking: processes.picking.productivity,
      packing: processes.packing.productivity,
      shipping: processes.shipping.productivity,
    },
    spaceUtilization: processes.storage.productivity,
    totalFTEsPerMOrders:
      (Object.values(processes).reduce((acc: number, p: any) => acc + p.ftes, 0) / volumeDrivers.orders) * 1000000,
  }
}

function getBenchmarkData() {
  return {
    industryAverages: {
      costPerOrder: 3.2,
      costPerOrderLine: 1.4,
      pickingProductivity: 95,
      spaceUtilization: 0.82,
    },
    bestInClass: {
      costPerOrder: 2.1,
      costPerOrderLine: 0.9,
      pickingProductivity: 130,
      spaceUtilization: 0.92,
    },
  }
}
