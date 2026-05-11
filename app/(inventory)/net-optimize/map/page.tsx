"use client"

import dynamic from "next/dynamic"

// Dynamically import the NetworkMap to avoid SSR issues with Leaflet
const NetworkMap = dynamic(() => import("@/components/net-optimize/map/network-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="text-lg text-gray-600">Loading network map...</div>
    </div>
  ),
})

export default function Page() {
  return <NetworkMap />
}
