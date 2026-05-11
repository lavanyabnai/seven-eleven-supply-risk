"use client"

interface RowDetailPanelProps {
  product: {
    productname: string
    profit: number
    perunitrevenu: number
    perunitcost: number
    perunitresearch: number
    perunitprocess: number
    perunitworks: number
    perunittranspo: number
  }
}

export default function RowDetailPanel({ product }: RowDetailPanelProps) {
  return (
    <div className="p-4 bg-gray-50">
      <h4 className="text-sm font-medium text-gray-800 mb-3">{product.productname} Details</h4>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h5 className="text-xs font-medium text-gray-600 mb-2">Cost Breakdown</h5>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Material Cost:</span>
              <span className="text-xs font-medium">
                {new Intl.NumberFormat("en-US").format(product.perunitcost * 0.6)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Labor Cost:</span>
              <span className="text-xs font-medium">
                {new Intl.NumberFormat("en-US").format(product.perunitcost * 0.3)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Overhead:</span>
              <span className="text-xs font-medium">
                {new Intl.NumberFormat("en-US").format(product.perunitcost * 0.1)}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h5 className="text-xs font-medium text-gray-600 mb-2">Profit Metrics</h5>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Gross Margin:</span>
              <span className="text-xs font-medium">
                {(((product.perunitrevenu - product.perunitcost) / product.perunitrevenu) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Net Margin:</span>
              <span className="text-xs font-medium">
                {((product.profit / (product.perunitrevenu * 1000)) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
