"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import SupplierRiskChart from "./supplier-risk-chart"
import SupplierRiskComparisonChart from "./supplier-risk-comparison-chart"
import RiskCategoryChart from "./risk-category-chart"

export default function RiskMitigationDashboard() {
  const [scenario, setScenario] = useState("Sc0_Baseline")
  const [riskRating, setRiskRating] = useState("OptiRisk")
  const [supplierName, setSupplierName] = useState("All")

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header with Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display">
          Optimization Supplier Risk Summary
        </h1>
        <div className="flex space-x-8">
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Scenario</label>
            <div className="relative">
              <select
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Sc0_Baseline">Sc0_Baseline</option>
                <option value="Sc1_Alternative">Sc1_Alternative</option>
                <option value="Sc2_Optimized">Sc2_Optimized</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Risk Rating</label>
            <div className="relative">
              <select
                value={riskRating}
                onChange={(e) => setRiskRating(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="OptiRisk">OptiRisk</option>
                <option value="HighRisk">HighRisk</option>
                <option value="MediumRisk">MediumRisk</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Supplier Name</label>
            <div className="relative">
              <select
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All</option>
                <option value="SUP_Barley_UK">SUP_Barley_UK</option>
                <option value="SUP_Barley_US">SUP_Barley_US</option>
                <option value="SUP_Hops_CZ">SUP_Hops_CZ</option>
                <option value="SUP_Hops_NZ">SUP_Hops_NZ</option>
                <option value="SUP_Hops_UK">SUP_Hops_UK</option>
                <option value="SUP_Hops_US">SUP_Hops_US</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-4">
            <p className="text-sm font-bold text-gray-900 mb-4">Supplier Risk Scores</p>
            <SupplierRiskChart />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-4">
            <p className="text-sm font-bold text-gray-900 mb-4">Risk Comparison</p>
            <SupplierRiskComparisonChart />
          </div>
        </div>
      </div>

      {/* Bottom Chart */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4">
          <p className="text-sm font-bold text-gray-900 mb-4">Risk: Opti Risk Score by Category</p>
          <RiskCategoryChart />
        </div>
      </div>
    </div>
  )
}
