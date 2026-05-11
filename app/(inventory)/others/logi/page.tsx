"use client"

import LogisticsDashboard from "@/components/transTruck/logistics-dashboard"

export default function Home() {
  return (
    <main className="w-full p-4">
      <div className="border border-gray-200 rounded-lg p-4 mb-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display">
          Ferguson Global Logistics Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          International freight operations — import center inbound logistics, ocean freight, and last-mile delivery for 36,000+ supplier routes
        </p>
      </div>
      <LogisticsDashboard />
    </main>
  )
}
