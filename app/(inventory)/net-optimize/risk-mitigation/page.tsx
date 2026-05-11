"use client"
import RiskMitigationDashboard from "@/components/net-optimize/risk-mitigation/risk-mitigation-dashboard"

export default function RiskMitigationPage() {
  return (
    <div className="h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">


        {/* Main Content */}
        <RiskMitigationDashboard />
      </div>
    </div>
  )
}
