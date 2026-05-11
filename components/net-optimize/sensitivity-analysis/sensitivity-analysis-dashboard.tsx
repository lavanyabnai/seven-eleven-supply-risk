"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import TotalSupplyChainCostChart from "./total-supply-chain-cost-chart"
import SupplyChainCostDetailChart from "./supply-chain-cost-detail-chart"
import ConcentrationRiskChart from "./concentration-risk-chart"

export default function SensitivityAnalysisDashboard() {
  const [scenarioName, setScenarioName] = useState("50 selected")

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display">
          Sensitivity At Scale - Comparison
        </h1>
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1">scenarioname</label>
          <div className="relative">
            <select
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="50 selected">50 selected</option>
              <option value="25 selected">25 selected</option>
              <option value="75 selected">75 selected</option>
              <option value="100 selected">100 selected</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-4">
            <p className="text-sm font-bold text-gray-900 mb-4">Total Supply Chain Cost</p>
            <TotalSupplyChainCostChart />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-4">
            <p className="text-sm font-bold text-gray-900 mb-4">Supply Chain Cost Detail</p>
            <SupplyChainCostDetailChart />
          </div>
        </div>
      </div>

      {/* Bottom Chart */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4">
          <p className="text-sm font-bold text-gray-900 mb-4">Average Concentration Risk</p>
          <ConcentrationRiskChart />
        </div>
      </div>
    </div>
  )
}
