"use client"

import { X } from "lucide-react"

interface SupplierDetailModalProps {
  supplier: {
    name: string
    economicResiliency: number
    naturalDisaster: number
    political: number
    epidemic: number
    labor: number
    geographicRisk: number
  } | null
  onClose: () => void
}

export default function SupplierDetailModal({ supplier, onClose }: SupplierDetailModalProps) {
  if (!supplier) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Supplier Geographic Risk Metrics</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">{supplier.name}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#4DD0E1] mr-2"></div>
                <span className="text-sm text-gray-600">Economic Resiliency</span>
                <span className="ml-auto font-medium">{supplier.economicResiliency}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#66BB6A] mr-2"></div>
                <span className="text-sm text-gray-600">Natural Disaster</span>
                <span className="ml-auto font-medium">{supplier.naturalDisaster}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#FFD54F] mr-2"></div>
                <span className="text-sm text-gray-600">Political</span>
                <span className="ml-auto font-medium">{supplier.political}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#FF7043] mr-2"></div>
                <span className="text-sm text-gray-600">Epidemic</span>
                <span className="ml-auto font-medium">{supplier.epidemic}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#8D6E63] mr-2"></div>
                <span className="text-sm text-gray-600">Labor</span>
                <span className="ml-auto font-medium">{supplier.labor}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-[#7E57C2] mr-2"></div>
                <span className="text-sm text-gray-600">Geographic Risk</span>
                <span className="ml-auto font-medium">{supplier.geographicRisk}</span>
              </div>
            </div>
          </div>

          <div className="h-96">
            <div className="relative h-full">
              <div className="absolute inset-0 flex">
                {/* Economic Resiliency */}
                <div className="flex flex-col items-center" style={{ width: "16.66%" }}>
                  <div className="flex-1 w-full flex flex-col-reverse pb-2">
                    <div
                      className="w-full bg-[#4DD0E1]"
                      style={{ height: `${(supplier.economicResiliency / 10) * 100}%` }}
                    >
                      <div className="flex justify-center items-center h-8 text-white font-medium">
                        {supplier.economicResiliency}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Economic Resiliency</div>
                </div>

                {/* Natural Disaster */}
                <div className="flex flex-col items-center" style={{ width: "16.66%" }}>
                  <div className="flex-1 w-full flex flex-col-reverse pb-2">
                    <div
                      className="w-full bg-[#66BB6A]"
                      style={{ height: `${(supplier.naturalDisaster / 10) * 100}%` }}
                    >
                      <div className="flex justify-center items-center h-8 text-white font-medium">
                        {supplier.naturalDisaster}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Natural Disaster</div>
                </div>

                {/* Political */}
                <div className="flex flex-col items-center" style={{ width: "16.66%" }}>
                  <div className="flex-1 w-full flex flex-col-reverse pb-2">
                    <div className="w-full bg-[#FFD54F]" style={{ height: `${(supplier.political / 10) * 100}%` }}>
                      <div className="flex justify-center items-center h-8 text-white font-medium">
                        {supplier.political}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Political</div>
                </div>

                {/* Epidemic */}
                <div className="flex flex-col items-center" style={{ width: "16.66%" }}>
                  <div className="flex-1 w-full flex flex-col-reverse pb-2">
                    <div className="w-full bg-[#FF7043]" style={{ height: `${(supplier.epidemic / 10) * 100}%` }}>
                      <div className="flex justify-center items-center h-8 text-white font-medium">
                        {supplier.epidemic}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Epidemic</div>
                </div>

                {/* Labor */}
                <div className="flex flex-col items-center" style={{ width: "16.66%" }}>
                  <div className="flex-1 w-full flex flex-col-reverse pb-2">
                    <div className="w-full bg-[#8D6E63]" style={{ height: `${(supplier.labor / 10) * 100}%` }}>
                      <div className="flex justify-center items-center h-8 text-white font-medium">
                        {supplier.labor}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Labor</div>
                </div>

                {/* Geographic Risk */}
                <div className="flex flex-col items-center" style={{ width: "16.66%" }}>
                  <div className="flex-1 w-full flex flex-col-reverse pb-2 relative">
                    {/* Line indicator */}
                    <div
                      className="absolute w-full border-t-2 border-[#7E57C2] z-10"
                      style={{ bottom: `${(supplier.geographicRisk / 10) * 100}%` }}
                    >
                      <div className="absolute -right-1 -top-1">
                        <div className="w-3 h-3 rounded-full bg-[#7E57C2] border-2 border-white"></div>
                      </div>
                    </div>
                    {/* Value label */}
                    <div
                      className="absolute -right-8 text-xs font-medium text-[#7E57C2] z-10"
                      style={{ bottom: `calc(${(supplier.geographicRisk / 10) * 100}% - 6px)` }}
                    >
                      {supplier.geographicRisk}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Geographic Risk</div>
                </div>
              </div>

              {/* Geographic Risk Line across all columns */}
              <div
                className="absolute left-12 right-4 border-t-2 border-dashed border-[#7E57C2] z-20"
                style={{ bottom: `calc(${(supplier.geographicRisk / 10) * 100}% + 32px)` }}
              >
                <div className="absolute -right-1 -top-1">
                  <div className="w-3 h-3 rounded-full bg-[#7E57C2] border-2 border-white"></div>
                </div>
                <div className="absolute -right-12 -top-3 text-xs font-medium text-[#7E57C2]">
                  {supplier.geographicRisk}
                </div>
              </div>

              {/* Y-axis labels */}
              <div className="absolute left-0 inset-y-0 w-10 flex flex-col justify-between pb-8 pt-2">
                <div className="text-xs text-gray-500">10.0</div>
                <div className="text-xs text-gray-500">8.0</div>
                <div className="text-xs text-gray-500">6.0</div>
                <div className="text-xs text-gray-500">4.0</div>
                <div className="text-xs text-gray-500">2.0</div>
                <div className="text-xs text-gray-500">0.0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
