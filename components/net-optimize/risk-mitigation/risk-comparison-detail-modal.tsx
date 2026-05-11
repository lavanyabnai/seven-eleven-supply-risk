"use client"

import { X } from "lucide-react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface RiskComparisonDetailModalProps {
  isOpen: boolean
  onClose: () => void
}

const supplierData = [
  {
    name: "SUP_Barley_UK",
    economicResiliency: 5.9,
    naturalDisaster: 3.9,
    political: 3.1,
    epidemic: 6.1,
    labor: 4.2,
    geographicRisk: 4.5,
  },
  {
    name: "SUP_Barley_US",
    economicResiliency: 1.2,
    naturalDisaster: 1.2,
    political: 4.3,
    epidemic: 5.8,
    labor: 2.8,
    geographicRisk: 3.1,
  },
  {
    name: "SUP_Hops_CZ",
    economicResiliency: 7.0,
    naturalDisaster: 2.4,
    political: 3.8,
    epidemic: 6.7,
    labor: 3.5,
    geographicRisk: 4.7,
  },
  {
    name: "SUP_Hops_NZ",
    economicResiliency: 1.6,
    naturalDisaster: 1.2,
    political: 3.1,
    epidemic: 2.5,
    labor: 1.8,
    geographicRisk: 2.0,
  },
  {
    name: "SUP_Hops_UK",
    economicResiliency: 5.9,
    naturalDisaster: 2.5,
    political: 4.1,
    epidemic: 6.1,
    labor: 3.9,
    geographicRisk: 4.5,
  },
  {
    name: "SUP_Hops_US",
    economicResiliency: 1.2,
    naturalDisaster: 1.2,
    political: 4.3,
    epidemic: 5.8,
    labor: 2.7,
    geographicRisk: 3.0,
  },
]

export default function RiskComparisonDetailModal({ isOpen, onClose }: RiskComparisonDetailModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Supplier Geographic Risk Metrics</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Legend */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#4DD0E1] mr-2"></div>
                <span>Economic Resiliency</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#66BB6A] mr-2"></div>
                <span>Natural Disaster</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#FFD54F] mr-2"></div>
                <span>Political</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#FF7043] mr-2"></div>
                <span>Epidemic</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#8D6E63] mr-2"></div>
                <span>Labor</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-[#7E57C2] mr-2"></div>
                <span>Geographic Risk</span>
              </div>
            </div>
          </div>

          <div className="h-96">
            <RiskComparisonChart />
          </div>
        </div>
      </div>
    </div>
  )
}

function RiskComparisonChart() {
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 flex">
        {supplierData.map((supplier) => (
          <div key={supplier.name} className="flex flex-col" style={{ width: `${100 / supplierData.length}%` }}>
            <div className="flex-1 relative">
              {/* Economic Resiliency */}
              <div
                className="absolute bottom-0 bg-[#4DD0E1] mx-1"
                style={{
                  height: `${(supplier.economicResiliency / 10) * 100}%`,
                  left: "5%",
                  width: "15%",
                }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#4DD0E1] text-white text-xs px-1 py-0.5 rounded text-center">
                    {supplier.economicResiliency}
                  </div>
                </div>
              </div>

              {/* Natural Disaster */}
              <div
                className="absolute bottom-0 bg-[#66BB6A] mx-1"
                style={{
                  height: `${(supplier.naturalDisaster / 10) * 100}%`,
                  left: "22%",
                  width: "15%",
                }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#66BB6A] text-white text-xs px-1 py-0.5 rounded text-center">
                    {supplier.naturalDisaster}
                  </div>
                </div>
              </div>

              {/* Political */}
              <div
                className="absolute bottom-0 bg-[#FFD54F] mx-1"
                style={{
                  height: `${(supplier.political / 10) * 100}%`,
                  left: "39%",
                  width: "15%",
                }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#FFD54F] text-white text-xs px-1 py-0.5 rounded text-center">
                    {supplier.political}
                  </div>
                </div>
              </div>

              {/* Epidemic */}
              <div
                className="absolute bottom-0 bg-[#FF7043] mx-1"
                style={{
                  height: `${(supplier.epidemic / 10) * 100}%`,
                  left: "56%",
                  width: "15%",
                }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#FF7043] text-white text-xs px-1 py-0.5 rounded text-center">
                    {supplier.epidemic}
                  </div>
                </div>
              </div>

              {/* Labor */}
              <div
                className="absolute bottom-0 bg-[#8D6E63] mx-1"
                style={{
                  height: `${(supplier.labor / 10) * 100}%`,
                  left: "73%",
                  width: "15%",
                }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#8D6E63] text-white text-xs px-1 py-0.5 rounded text-center">
                    {supplier.labor}
                  </div>
                </div>
              </div>

              {/* Geographic Risk Line */}
              <div
                className="absolute left-0 right-0 border-t-2 border-dashed border-[#7E57C2] z-10"
                style={{ bottom: `${(supplier.geographicRisk / 10) * 100}%` }}
              >
                <div className="absolute -top-3 right-2">
                  <div className="w-2 h-2 rounded-full bg-[#7E57C2] border border-white"></div>
                </div>
                <div className="absolute -top-6 right-6">
                  <div className="bg-[#7E57C2] text-white text-xs px-1 py-0.5 rounded">{supplier.geographicRisk}</div>
                </div>
              </div>
            </div>
            <div className="h-12 flex items-center justify-center">
              <div className="text-xs text-gray-600 font-medium text-center transform -rotate-45 origin-center">
                {supplier.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Y-axis labels */}
      <div className="absolute left-0 inset-y-0 w-10 flex flex-col justify-between pb-12 pt-2">
        <div className="text-xs text-gray-500">10.0</div>
        <div className="text-xs text-gray-500">8.0</div>
        <div className="text-xs text-gray-500">6.0</div>
        <div className="text-xs text-gray-500">4.0</div>
        <div className="text-xs text-gray-500">2.0</div>
        <div className="text-xs text-gray-500">0.0</div>
      </div>
    </div>
  )
}
