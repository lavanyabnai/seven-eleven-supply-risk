"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import ProfitBubbleChart from "./profit-bubble-chart"
import ProfitBreakdownChart from "./profit-breakdown-chart"
import LossByProductChart from "./loss-by-product-chart"
import ProfitabilityByCustomerChart from "./profitability-by-customer-chart"
import ProfitableCustomersMap from "./profitable-customers-map"
import LandedCostAnalysisTable from "./landed-cost-analysis-table"

export default function CostToServeDashboard() {
  const [scenario, setScenario] = useState("Sc0_Baseline")
  const [products, setProducts] = useState("All")
  const [period, setPeriod] = useState("All")

  return (
    <div className="w-full p-6 space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display">Cost To Serve</h1>
      </div>
      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex space-x-8">
            <div className="flex flex-col">
              <label className="text-sm text-gray-500 mb-1">Scenario</label>
              <div className="relative">
                <select
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Sc0_Baseline">Sc0_Current Network</option>
                  <option value="Sc1_Alternative">Sc1_Nearshore China Faucets</option>
                  <option value="Sc2_Optimized">Sc2_Optimized DC Consolidation</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500 mb-1">Products</label>
              <div className="relative">
                <select
                  value={products}
                  onChange={(e) => setProducts(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">All Products</option>
                  <option value="Plumbing_Fixtures">Plumbing Fixtures</option>
                  <option value="HVAC_Systems">HVAC Systems</option>
                  <option value="Pipe_Fittings">Pipe & Fittings</option>
                  <option value="Water_Heaters">Water Heaters</option>
                  <option value="Waterworks">Waterworks</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500 mb-1">Period</label>
              <div className="relative">
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">All</option>
                  <option value="Q1">Q1</option>
                  <option value="Q2">Q2</option>
                  <option value="Q3">Q3</option>
                  <option value="Q4">Q4</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Profit Range */}
          <div className="mt-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Profit:</span>
              <span className="text-sm text-gray-600">-$186M</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full relative">
                <div className="absolute left-0 w-1 h-4 bg-gray-400 rounded -top-1"></div>
                <div className="absolute right-0 w-1 h-4 bg-gray-400 rounded -top-1"></div>
              </div>
              <span className="text-sm text-gray-600">$1.48B</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-4">
            <p className="text-sm font-bold text-gray-900 mb-4">Profit Analysis</p>
            <ProfitBubbleChart />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-4">
            <p className="text-sm font-bold text-gray-900 mb-4">Profit Breakdown</p>
            <ProfitBreakdownChart />
          </div>
        </div>
      </div>

      {/* Loss By Product */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4">
          <p className="text-sm font-bold text-gray-900 mb-4">Loss By Product</p>
          <LossByProductChart />
        </div>
      </div>

      {/* Bottom Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-4">
            <p className="text-sm font-bold text-gray-900 mb-4">Profitability by Customer</p>
            <ProfitabilityByCustomerChart />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-4">
            <p className="text-sm font-bold text-gray-900 mb-4">Profitable Customers</p>
            <ProfitableCustomersMap />
          </div>
        </div>
      </div>

      {/* Landed Cost Analysis Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4">
          <p className="text-sm font-bold text-gray-900 mb-2">Landed Cost Analysis</p>
          <p className="text-xs text-gray-400 mb-4">Total Landed Cost Analysis</p>
          <LandedCostAnalysisTable />
        </div>
      </div>
    </div>
  )
}
