"use client"

import { useState } from "react"
import { ChevronDown, Filter, MapIcon, Globe, Menu } from "lucide-react"
import TransportationRouteMap from "./transportation-route-map"
import RouteMetricsPanel from "./route-metrics-panel"
import ScenarioSelector from "./scenario-selector"
import RouteComparisonChart from "./route-comparison-chart"
import RouteEfficiencyChart from "./route-efficiency-chart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TransportationRouteDashboard() {
  const [scenario, setScenario] = useState("05_TO_Baseline")
  const [product] = useState("Product_A")
  const [period] = useState("Model Horizon")
  const [viewMode] = useState("map")
  const [selectedLayers, setSelectedLayers] = useState({
    customers: true,
    direct: true,
    routes: true,
    dcs: true,
  })

  const toggleLayer = (layer: keyof typeof selectedLayers) => {
    setSelectedLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }))
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex items-center border-b border-gray-200 p-2">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-1 bg-gray-100 rounded-md">
              <Button variant="ghost" size="sm" className={viewMode === "map" ? "bg-blue-600 text-white" : ""}>
                <MapIcon className="h-4 w-4 mr-1" />
                Map
              </Button>
              <Button variant="ghost" size="sm" className={viewMode === "globe" ? "bg-blue-600 text-white" : ""}>
                <Globe className="h-4 w-4 mr-1" />
                Globe
              </Button>
            </div>
            <div className="relative">
              <select
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md py-1 pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All</option>
                <option value="05_TO_Baseline">05_TO_Baseline</option>
                <option value="06_TO_NewDC">06_TO_NewDC</option>
                <option value="07_TO_DirectShip">07_TO_DirectShip</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <Input type="text" placeholder="Search..." className="h-8 w-48 text-sm" />
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200">
              S@S
            </Button>
            <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200">
              Run
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-8rem)]">
          {/* Left Panel - Layers */}
          <div className="w-64 border-r border-gray-200 bg-white p-4 overflow-y-auto">
            <h3 className="font-medium text-gray-700 mb-3">Maps</h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="customers"
                  checked={selectedLayers.customers}
                  onChange={() => toggleLayer("customers")}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="customers" className="ml-2 text-sm text-gray-700">
                  Customers
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="direct"
                  checked={selectedLayers.direct}
                  onChange={() => toggleLayer("direct")}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="direct" className="ml-2 text-sm text-gray-700">
                  Direct
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="routes"
                  checked={selectedLayers.routes}
                  onChange={() => toggleLayer("routes")}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="routes" className="ml-2 text-sm text-gray-700">
                  Routes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="dcs"
                  checked={selectedLayers.dcs}
                  onChange={() => toggleLayer("dcs")}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="dcs" className="ml-2 text-sm text-gray-700">
                  DCs
                </label>
              </div>
            </div>

            <h3 className="font-medium text-gray-700 mb-3">Scenarios</h3>
            <div className="space-y-1 mb-6">
              <ScenarioSelector
                scenarios={[
                  { id: "05_TO_Baseline", name: "05_TO_Baseline" },
                  { id: "06_TO_NewDC", name: "06_TO_NewDC" },
                  { id: "07_TO_DirectShip", name: "07_TO_DirectShip" },
                ]}
                selectedScenario={scenario}
                onSelectScenario={setScenario}
              />
            </div>
          </div>

          {/* Main Map Area */}
          <div className="flex-1 relative">
            <TransportationRouteMap scenario={scenario} layers={selectedLayers} />
          </div>

          {/* Right Panel - Metrics */}
          <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto">
            <Tabs defaultValue="metrics">
              <TabsList className="w-full">
                <TabsTrigger value="metrics" className="flex-1">
                  Metrics
                </TabsTrigger>
                <TabsTrigger value="legend" className="flex-1">
                  Legend
                </TabsTrigger>
              </TabsList>
              <TabsContent value="metrics" className="p-4">
                <RouteMetricsPanel scenario={scenario} />
              </TabsContent>
              <TabsContent value="legend" className="p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Scenario</h4>
                    <p className="text-sm text-gray-600">{scenario}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Product</h4>
                    <p className="text-sm text-gray-600">{product}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Period</h4>
                    <p className="text-sm text-gray-600">{period}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm text-gray-700">Customers</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-600 mr-2"></div>
                      <span className="text-sm text-gray-700">Direct</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-1 bg-blue-600 mr-2"></div>
                      <span className="text-sm text-gray-700">Routes</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-orange-500 mr-2"></div>
                      <span className="text-sm text-gray-700">DCs</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Bottom Panel - Charts */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Route Comparison</h3>
              <RouteComparisonChart />
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Route Efficiency</h3>
              <RouteEfficiencyChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
