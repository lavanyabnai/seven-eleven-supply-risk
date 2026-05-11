"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import { divIcon } from "leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

interface CustomerData {
  id: string
  name: string
  coordinates: [number, number]
  profit: number
}

// Ferguson branch locations with realistic coordinates and profitability
const fergusonBranchData: { city: string; lat: number; lng: number; baseProfit: number }[] = [
  { city: "New York", lat: 40.71, lng: -74.01, baseProfit: 820000 },
  { city: "Los Angeles", lat: 34.05, lng: -118.24, baseProfit: 680000 },
  { city: "Houston", lat: 29.76, lng: -95.37, baseProfit: 540000 },
  { city: "Chicago", lat: 41.88, lng: -87.63, baseProfit: 620000 },
  { city: "Phoenix", lat: 33.45, lng: -112.07, baseProfit: -85000 },
  { city: "Philadelphia", lat: 39.95, lng: -75.17, baseProfit: 410000 },
  { city: "Dallas", lat: 32.78, lng: -96.80, baseProfit: 580000 },
  { city: "Atlanta", lat: 33.75, lng: -84.39, baseProfit: 490000 },
  { city: "Miami", lat: 25.76, lng: -80.19, baseProfit: -120000 },
  { city: "Denver", lat: 39.74, lng: -104.99, baseProfit: 350000 },
  { city: "Seattle", lat: 47.61, lng: -122.33, baseProfit: 280000 },
  { city: "Charlotte", lat: 35.23, lng: -80.84, baseProfit: 320000 },
  { city: "San Francisco", lat: 37.77, lng: -122.42, baseProfit: 450000 },
  { city: "Minneapolis", lat: 44.98, lng: -93.27, baseProfit: 190000 },
  { city: "Tampa", lat: 27.95, lng: -82.46, baseProfit: -65000 },
  { city: "Boston", lat: 42.36, lng: -71.06, baseProfit: 380000 },
  { city: "Indianapolis", lat: 39.77, lng: -86.16, baseProfit: 260000 },
  { city: "Portland", lat: 45.52, lng: -122.68, baseProfit: 175000 },
  { city: "Las Vegas", lat: 36.17, lng: -115.14, baseProfit: -42000 },
  { city: "Nashville", lat: 36.16, lng: -86.78, baseProfit: 310000 },
  { city: "Orlando", lat: 28.54, lng: -81.38, baseProfit: 420000 },
  { city: "Sacramento", lat: 38.58, lng: -121.49, baseProfit: 210000 },
]

const generateCustomerData = (): CustomerData[] => {
  const customers: CustomerData[] = []

  // Add main Ferguson branch locations
  fergusonBranchData.forEach((branch, i) => {
    customers.push({
      id: `branch_${i}`,
      name: `FRG_Branch_${branch.city.replace(/\s/g, "")}`,
      coordinates: [branch.lat, branch.lng],
      profit: branch.baseProfit,
    })
    // Add 5-8 satellite branches around each major metro
    const satelliteCount = 5 + Math.floor(Math.random() * 4)
    for (let j = 0; j < satelliteCount; j++) {
      const latOffset = (Math.random() - 0.5) * 2.5
      const lngOffset = (Math.random() - 0.5) * 2.5
      const profitVariance = branch.baseProfit * (0.3 + Math.random() * 0.7) * (Math.random() > 0.12 ? 1 : -0.3)
      customers.push({
        id: `branch_${i}_sat_${j}`,
        name: `FRG_${branch.city.replace(/\s/g, "")}_${j + 1}`,
        coordinates: [branch.lat + latOffset, branch.lng + lngOffset],
        profit: profitVariance,
      })
    }
  })

  return customers
}

function getRandomCity(): string {
  const cities = [
    "Atlanta",
    "Boston",
    "Chicago",
    "Dallas",
    "Denver",
    "Houston",
    "LosAngeles",
    "Miami",
    "Minneapolis",
    "NewYork",
    "Phoenix",
    "Portland",
    "SanFrancisco",
    "Seattle",
    "Cincinnati",
    "Orlando",
    "Detroit",
    "SanDiego",
    "Philadelphia",
    "Austin",
  ]
  return cities[Math.floor(Math.random() * cities.length)]
}

const customerData = generateCustomerData()

// Create custom icons for different profit levels
const createCustomIcon = (profit: number, isSelected = false) => {
  let color = "#22c55e" // Default green for >10K

  if (profit < 0) {
    color = "#ef4444" // Red for loss
  } else if (profit < 10000) {
    color = "#eab308" // Yellow for 0-10K
  }

  const size = Math.max(8, Math.min(16, 8 + Math.abs(profit) / 2000))
  const borderWidth = isSelected ? 3 : 2
  const borderColor = isSelected ? "#2563eb" : "#ffffff"

  return divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: ${size}px; 
        height: ${size}px; 
        background-color: ${color}; 
        border: ${borderWidth}px solid ${borderColor}; 
        border-radius: 50%; 
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

function MapClickHandler({ onMapClick }: { onMapClick: () => void }) {
  useMapEvents({
    click: () => {
      onMapClick()
    },
  })
  return null
}

export default function ProfitableCustomersMap() {
  const [isClient, setIsClient] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleCustomerClick = (customer: CustomerData) => {
    setSelectedCustomer(customer)
  }

  const handleMapClick = () => {
    setSelectedCustomer(null)
  }

  if (!isClient) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-sm text-gray-600">Loading map...</div>
      </div>
    )
  }

  return (
    <div className="h-64 relative">
      <MapContainer
        center={[39.8283, -98.5795]} // Center of USA
        zoom={4}
        minZoom={3}
        maxZoom={8}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onMapClick={handleMapClick} />

        {/* Render customer markers */}
        {customerData.map((customer) => (
          <Marker
            key={customer.id}
            position={customer.coordinates}
            icon={createCustomIcon(customer.profit, selectedCustomer?.id === customer.id)}
            eventHandlers={{
              click: (e) => {
                e.originalEvent.stopPropagation()
                handleCustomerClick(customer)
              },
            }}
          />
        ))}
      </MapContainer>

      {/* Selected customer info panel */}
      {selectedCustomer && (
        <div className="absolute top-2 left-2 bg-white/95 backdrop-blur rounded-lg p-3 shadow-lg z-[1000] max-w-xs">
          <h4 className="font-medium text-gray-800 mb-1">{selectedCustomer.name}</h4>
          <div className="text-sm text-gray-600">
            Profit:
            <span className={`ml-1 font-medium ${selectedCustomer.profit < 0 ? "text-red-600" : "text-green-600"}`}>
              {selectedCustomer.profit.toLocaleString("en-US", {
                style: "decimal",
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg z-[1000]">
        <h4 className="text-xs font-medium text-gray-700 mb-2">Profit</h4>
        <div className="space-y-1">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-xs text-gray-700">&lt;0</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-xs text-gray-700">0-10K</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-xs text-gray-700">&gt;10K</span>
          </div>
        </div>
      </div>
    </div>
  )
}
