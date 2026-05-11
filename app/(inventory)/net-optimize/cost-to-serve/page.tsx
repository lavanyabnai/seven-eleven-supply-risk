"use client"
import CostToServeDashboard from "@/components/net-optimize/cost-to-serve/cost-to-serve-dashboard"

export default function CostToServePage() {
  return (
    <div className="h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">


        {/* Main Content */}
        <CostToServeDashboard />
      </div>
    </div>
  )
}
