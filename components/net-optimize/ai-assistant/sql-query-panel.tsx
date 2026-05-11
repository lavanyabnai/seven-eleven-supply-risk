"use client"

import { ChevronDown, ChevronUp, Database } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SQLQueryPanelProps {
  messageId: string
  isExpanded: boolean
  onToggle: () => void
}

const sampleSQL = `SELECT 
  product_name,
  SUM(demand_quantity) as total_demand,
  AVG(unit_price) as avg_price
FROM products p
JOIN demand_forecast df ON p.product_id = df.product_id
WHERE df.forecast_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY product_name
ORDER BY total_demand DESC
LIMIT 5;`

export default function SQLQueryPanel({ isExpanded, onToggle }: SQLQueryPanelProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Database className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-800">SQL Query</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4">
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">{sampleSQL}</pre>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">Query executed successfully • 5 rows returned</div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Export Results
              </Button>
              <Button variant="outline" size="sm">
                Edit Query
              </Button>
            </div>
          </div>

          {/* Sample Results Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total Demand</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Avg Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-900">Palletized_Ale_A</td>
                  <td className="px-4 py-2 text-sm text-gray-900">125,430</td>
                  <td className="px-4 py-2 text-sm text-gray-900">$24.50</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-900">Palletized_Lager_B</td>
                  <td className="px-4 py-2 text-sm text-gray-900">98,765</td>
                  <td className="px-4 py-2 text-sm text-gray-900">$22.75</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-900">Palletized_IPA_C</td>
                  <td className="px-4 py-2 text-sm text-gray-900">87,234</td>
                  <td className="px-4 py-2 text-sm text-gray-900">$26.80</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
