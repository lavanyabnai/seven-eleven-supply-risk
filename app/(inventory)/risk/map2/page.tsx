"use client"
import { AlertTriangle, Network, Package, Clock, Settings } from "lucide-react"
import type { LocationData } from "@/types/location"
import dynamic from "next/dynamic"

// Dynamically import the map component with no SSR to avoid hydration issues
const MapWithNoSSR = dynamic(() => import("@/components/map/leaflet-map"), {
  ssr: false,
})

// Mock data for the dashboard
const metrics = [
  {
    title: "On Time in Full (YTD)",
    value: "92%",
    change: "5 pts vs. last year (87%)",
    isPositive: true,
  },
  {
    title: "Monthly Sales",
    value: "$108,240",
    change: "104% vs. last year",
    isPositive: true,
  },
  {
    title: "Customers",
    value: "24",
    change: "Active 73%",
    isWarning: true,
  },
  {
    title: "Distribution Centers",
    value: "10",
    change: "Across 9 countries",
    isNeutral: true,
  },
  {
    title: "Plants",
    value: "15",
    change: "Across 8 countries",
    isNeutral: true,
  },
  {
    title: "Suppliers",
    value: "32",
    change: "Across 31 countries",
    isNeutral: true,
  },
]

// Enhanced mock location data with detailed facility information
const locations: LocationData[] = [
  {
    id: 1,
    type: "plant",
    name: "New York Manufacturing",
    country: "United States",
    status: "Operational",
    capacity: "85%",
    lastIncident: "None",
    performance: "On Target",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 2,
    type: "distribution",
    name: "London Distribution Hub",
    country: "United Kingdom",
    status: "Operational",
    inventory: "73%",
    outboundOrders: "124 pending",
    performance: "Above Target",
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    id: 3,
    type: "plant",
    name: "Paris Production",
    country: "France",
    status: "Operational",
    capacity: "92%",
    lastIncident: "Minor - 14 days ago",
    performance: "On Target",
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    id: 4,
    type: "supplier",
    name: "Tokyo Components",
    country: "Japan",
    status: "Operational",
    reliability: "98%",
    leadTime: "12 days",
    performance: "Above Target",
    lat: 35.6762,
    lng: 139.6503,
  },
  {
    id: 5,
    type: "plant",
    name: "Hong Kong Assembly",
    country: "China",
    status: "Critical",
    capacity: "45%",
    lastIncident: "Major - 1 day ago",
    performance: "Below Target",
    lat: 22.3193,
    lng: 114.1694,
  },
  {
    id: 6,
    type: "distribution",
    name: "Singapore Logistics",
    country: "Singapore",
    status: "Operational",
    inventory: "88%",
    outboundOrders: "67 pending",
    performance: "On Target",
    lat: 1.3521,
    lng: 103.8198,
  },
  {
    id: 7,
    type: "supplier",
    name: "Mexico City Materials",
    country: "Mexico",
    status: "Warning",
    reliability: "78%",
    leadTime: "18 days",
    performance: "Below Target",
    lat: 19.4326,
    lng: -99.1332,
  },
  {
    id: 8,
    type: "distribution",
    name: "Sydney Distribution",
    country: "Australia",
    status: "Operational",
    inventory: "92%",
    outboundOrders: "43 pending",
    performance: "On Target",
    lat: -33.8688,
    lng: 151.2093,
  },
  {
    id: 9,
    type: "supplier",
    name: "Moscow Raw Materials",
    country: "Russia",
    status: "Operational",
    reliability: "87%",
    leadTime: "21 days",
    performance: "On Target",
    lat: 55.7558,
    lng: 37.6173,
  },
  {
    id: 10,
    type: "plant",
    name: "San Francisco Tech",
    country: "United States",
    status: "Operational",
    capacity: "78%",
    lastIncident: "None",
    performance: "On Target",
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: 11,
    type: "supplier",
    name: "Beijing Electronics",
    country: "China",
    status: "Operational",
    reliability: "91%",
    leadTime: "14 days",
    performance: "On Target",
    lat: 39.9042,
    lng: 116.4074,
  },
  {
    id: 12,
    type: "distribution",
    name: "São Paulo Distribution",
    country: "Brazil",
    status: "Critical",
    inventory: "25%",
    outboundOrders: "156 pending",
    performance: "Below Target",
    lat: -23.5505,
    lng: -46.6333,
  },
  {
    id: 13,
    type: "plant",
    name: "Rome Production",
    country: "Italy",
    status: "Operational",
    capacity: "81%",
    lastIncident: "Minor - 30 days ago",
    performance: "On Target",
    lat: 41.9028,
    lng: 12.4964,
  },
  {
    id: 14,
    type: "supplier",
    name: "Delhi Components",
    country: "India",
    status: "Operational",
    reliability: "85%",
    leadTime: "16 days",
    performance: "On Target",
    lat: 28.6139,
    lng: 77.209,
  },
  {
    id: 15,
    type: "distribution",
    name: "Johannesburg Logistics",
    country: "South Africa",
    status: "Operational",
    inventory: "76%",
    outboundOrders: "38 pending",
    performance: "On Target",
    lat: -26.2041,
    lng: 28.0473,
  },
]

export default function SupplyChainDashboard() {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center px-4 justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <Network className="h-5 w-5" />
          </div>
          <h1 className="text-lg font-semibold">Supply Chain Control Tower</h1>
        </div>

        <div className="flex space-x-6">
          <button className="flex items-center space-x-1 text-blue-400 border-b-2 border-blue-400 pb-1 px-1">
            <Network className="h-4 w-4" />
            <span>Network</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-200">
            <AlertTriangle className="h-4 w-4" />
            <span>Alerts</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-200">
            <Clock className="h-4 w-4" />
            <span>Planning</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-200">
            <Package className="h-4 w-4" />
            <span>Material Orders</span>
          </button>
        </div>

        <button className="px-4 py-1.5 bg-gray-700 rounded text-sm flex items-center space-x-1">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>
      </header>

      {/* Metrics */}
      <div className="grid grid-cols-6 border-b border-gray-700">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 border-r border-gray-700 last:border-r-0">
            <div className="text-sm text-gray-400">{metric.title}</div>
            <div
              className={`text-2xl font-bold mt-1 ${
                index === 0 ? "text-green-400" : index === 1 ? "text-green-400" : ""
              }`}
            >
              {metric.value}
            </div>
            <div className="flex items-center mt-1 text-sm">
              {metric.isPositive && <span className="text-green-400">↑</span>}
              {metric.isWarning && <span className="text-yellow-400">⚠</span>}
              <span
                className={`ml-1 ${
                  metric.isPositive ? "text-green-400" : metric.isWarning ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapWithNoSSR locations={locations} />
      </div>
    </div>
  )
}
