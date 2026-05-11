"use client"

import TransportationRouteDashboard from "@/components/net-optimize/transportation/transportation-route-dashboard"

export default function TransportationRoutePage() {
  return (
    <div className="flex h-screen bg-gray-50">
    
      <div className="flex-1 flex flex-col">
 

        {/* Main Content */}
        <TransportationRouteDashboard />
      </div>
    </div>
  )
}
