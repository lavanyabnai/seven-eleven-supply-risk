"use client"

import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

const RootCauseFlowChart = dynamic(
  () => import("@/components/rootcause/rootcause-flow-chart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 flex items-center justify-center font-sans">
        <Loader2 className="size-6 text-slate-300 animate-spin" />
      </div>
    ),
  },
)

export default function RootCausePage() {
  return (
    <div className="h-[calc(100vh-100px)] bg-white flex flex-col">
      <div className="flex-1 overflow-hidden">
        <RootCauseFlowChart />
      </div>
    </div>
  )
}
