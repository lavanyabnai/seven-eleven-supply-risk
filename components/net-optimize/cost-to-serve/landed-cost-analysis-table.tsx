"use client"

import React from "react"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

const tableData = [
  {
    productname: "Import Faucets (China - Kohler/Moen/Delta)",
    profit: -68400000,
    perunitrevenu: 285000000,
    perunitcost: 353400000,
    perunitresearch: 142500000,
    perunitprocess: 48200000,
    perunitworks: 45200000,
    perunittranspo: 117500000,
  },
  {
    productname: "HVAC Systems (Rheem/Trane/Carrier)",
    profit: 124800000,
    perunitrevenu: 892000000,
    perunitcost: 767200000,
    perunitresearch: 445000000,
    perunitprocess: 186400000,
    perunitworks: 42800000,
    perunittranspo: 93000000,
  },
  {
    productname: "Pipe & Fittings (Charlotte Pipe/JM Eagle)",
    profit: 186500000,
    perunitrevenu: 1240000000,
    perunitcost: 1053500000,
    perunitresearch: 620000000,
    perunitprocess: 215000000,
    perunitworks: 68500000,
    perunittranspo: 150000000,
  },
  {
    productname: "Water Heaters (A.O. Smith/Bradford White)",
    profit: 98200000,
    perunitrevenu: 645000000,
    perunitcost: 546800000,
    perunitresearch: 325000000,
    perunitprocess: 124500000,
    perunitworks: 28600000,
    perunittranspo: 68700000,
  },
  {
    productname: "Tankless Water Heaters (Navien/Rinnai Import)",
    profit: -31500000,
    perunitrevenu: 218000000,
    perunitcost: 249500000,
    perunitresearch: 115000000,
    perunitprocess: 38200000,
    perunitworks: 42800000,
    perunittranspo: 53500000,
  },
  {
    productname: "Waterworks (Mueller/Fire Hydrants/Valves)",
    profit: 62400000,
    perunitrevenu: 384000000,
    perunitcost: 321600000,
    perunitresearch: 168000000,
    perunitprocess: 84200000,
    perunitworks: 18900000,
    perunittranspo: 50500000,
  },
]

export default function LandedCostAnalysisTable() {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({})

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-8 px-2 py-3"></th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              productname
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              perunitrevenu
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              perunitcost
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              perunitresearch
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              perunitprocess
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              perunitworks
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              perunittranspo
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((row, index) => (
            <React.Fragment key={index}>
              <tr className="hover:bg-gray-50">
                <td className="px-2 py-4">
                  <button
                    onClick={() => toggleRow(index)}
                    className="text-gray-500 hover:text-gray-700 transition-transform"
                  >
                    {expandedRows[index] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.productname}</td>
                <td
                  className={`px-4 py-4 whitespace-nowrap text-sm font-medium ${
                    row.profit < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {new Intl.NumberFormat("en-US").format(row.profit)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Intl.NumberFormat("en-US").format(row.perunitrevenu)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Intl.NumberFormat("en-US").format(row.perunitcost)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Intl.NumberFormat("en-US").format(row.perunitresearch)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Intl.NumberFormat("en-US").format(row.perunitprocess)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Intl.NumberFormat("en-US").format(row.perunitworks)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Intl.NumberFormat("en-US").format(row.perunittranspo)}
                </td>
              </tr>
              {expandedRows[index] && (
                <tr>
                  <td colSpan={9} className="px-4 py-4 bg-gray-50">
                    <div className="text-sm text-gray-600">
                      <h4 className="font-medium mb-2">Additional Details for {row.productname}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p>
                            <strong>Gross Margin:</strong>{" "}
                            {(((row.perunitrevenu - row.perunitcost) / row.perunitrevenu) * 100).toFixed(1)}%
                          </p>
                          <p>
                            <strong>Cost Ratio:</strong> {((row.perunitcost / row.perunitrevenu) * 100).toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Research %:</strong> {((row.perunitresearch / row.perunitcost) * 100).toFixed(1)}%
                          </p>
                          <p>
                            <strong>Process %:</strong> {((row.perunitprocess / row.perunitcost) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
