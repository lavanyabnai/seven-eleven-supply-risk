"use client"
import SensitivityAnalysisDashboard from "@/components/net-optimize/sensitivity-analysis/sensitivity-analysis-dashboard"

export default function SensitivityAnalysisPage() {
  return (
    <div className="h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">

        {/* Main Content */}
        <SensitivityAnalysisDashboard />
      </div>
    </div>
  )
}
