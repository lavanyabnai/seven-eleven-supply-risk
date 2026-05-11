"use client"

import { X } from "lucide-react"

interface SupplierRiskOverviewModalProps {
  isOpen: boolean
  onClose: () => void
}

const supplierData = [
  { name: "SUP_Barley_UK", riskScore: 4.5 },
  { name: "SUP_Barley_US", riskScore: 2.4 },
  { name: "SUP_Hops_CZ", riskScore: 4.1 },
  { name: "SUP_Hops_NZ", riskScore: 3.7 },
  { name: "SUP_Hops_UK", riskScore: 3.6 },
  { name: "SUP_Hops_US", riskScore: 2.7 },
]

export default function SupplierRiskOverviewModal({ isOpen, onClose }: SupplierRiskOverviewModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Supplier Risk Score Overview</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="h-96">
            <div className="relative h-full">
              <div className="absolute inset-0 flex items-end justify-around pb-8">
                {supplierData.map((supplier) => (
                  <div key={supplier.name} className="flex flex-col items-center">
                    <div className="relative mb-2">
                      <div
                        className="bg-[#4DD0E1] w-20 rounded-t-sm flex items-end justify-center pb-2"
                        style={{ height: `${(supplier.riskScore / 5) * 300}px` }}
                      >
                        <span className="text-white font-medium text-sm">{supplier.riskScore}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 font-medium text-center max-w-24 leading-tight">
                      {supplier.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Y-axis labels */}
              <div className="absolute left-0 inset-y-0 w-10 flex flex-col justify-between pb-8 pt-2">
                <div className="text-xs text-gray-500">5.0</div>
                <div className="text-xs text-gray-500">4.0</div>
                <div className="text-xs text-gray-500">3.0</div>
                <div className="text-xs text-gray-500">2.0</div>
                <div className="text-xs text-gray-500">1.0</div>
                <div className="text-xs text-gray-500">0.0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
