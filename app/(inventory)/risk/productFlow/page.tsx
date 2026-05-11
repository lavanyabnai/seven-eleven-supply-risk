"use client"

import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { loadProductFlowData, type ProductFlow } from "@/components/productFlow/product-flow-data"

const ProductFlowChart = dynamic(() => import("@/components/productFlow/product-flow-chart"), {
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center font-sans">Loading chart...</div>,
})

export default function ProductFlowDashboard() {
  const [flows, setFlows] = useState<ProductFlow[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProductFlowData().then((data) => {
      setFlows(data)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen bg-white items-center justify-center">
        <Loader2 className="size-6 text-slate-300 animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-100px)] bg-white flex flex-col">
      <div className="flex-1 overflow-hidden">
        <ProductFlowChart flows={flows} />
      </div>
    </div>
  )
}
