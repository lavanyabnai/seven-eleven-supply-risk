"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from "react-leaflet"
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

interface TransportationRouteMapProps {
  scenario: string
  layers: {
    customers: boolean
    direct: boolean
    routes: boolean
    dcs: boolean
  }
}

interface Location {
  id: string
  name: string
  type: "customer" | "dc" | "direct"
  coordinates: [number, number]
}

interface Route {
  id: string
  from: string
  to: string
  volume: number
  cost: number
  distance: number
  time: number
}

// Sample data for the map
const locations: Location[] = [
  // Distribution Centers
  { id: "dc1", name: "Chicago DC", type: "dc", coordinates: [41.8781, -87.6298] },
  { id: "dc2", name: "Dallas DC", type: "dc", coordinates: [32.7767, -96.797] },

  // Direct Locations
  { id: "direct1", name: "Los Angeles Direct", type: "direct", coordinates: [34.0522, -118.2437] },
  { id: "direct2", name: "Phoenix Direct", type: "direct", coordinates: [33.4484, -112.074] },

  // Customers - Midwest cluster
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `customer_mw_${i}`,
    name: `Customer MW ${i + 1}`,
    type: "customer" as const,
    coordinates: [41.8781 + (Math.random() - 0.5) * 3, -87.6298 + (Math.random() - 0.5) * 3] as [number, number],
  })),

  // Customers - South cluster
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `customer_s_${i}`,
    name: `Customer S ${i + 1}`,
    type: "customer" as const,
    coordinates: [32.7767 + (Math.random() - 0.5) * 3, -96.797 + (Math.random() - 0.5) * 3] as [number, number],
  })),
]

// Generate routes from DCs to customers
const generateRoutes = (): Route[] => {
  const routes: Route[] = []
  const dcs = locations.filter((loc) => loc.type === "dc")
  const customers = locations.filter((loc) => loc.type === "customer")

  customers.forEach((customer) => {
    // Find the closest DC
    const closestDC = dcs.reduce((closest, dc) => {
      const distToCurrent = Math.sqrt(
        Math.pow(customer.coordinates[0] - dc.coordinates[0], 2) +
          Math.pow(customer.coordinates[1] - dc.coordinates[1], 2),
      )
      const distToClosest = Math.sqrt(
        Math.pow(customer.coordinates[0] - closest.coordinates[0], 2) +
          Math.pow(customer.coordinates[1] - closest.coordinates[1], 2),
      )
      return distToCurrent < distToClosest ? dc : closest
    }, dcs[0])

    // Calculate route metrics
    const distance =
      Math.sqrt(
        Math.pow(customer.coordinates[0] - closestDC.coordinates[0], 2) +
          Math.pow(customer.coordinates[1] - closestDC.coordinates[1], 2),
      ) * 69 // Rough miles conversion

    routes.push({
      id: `route_${closestDC.id}_${customer.id}`,
      from: closestDC.id,
      to: customer.id,
      volume: Math.floor(Math.random() * 100) + 50,
      cost: distance * (Math.random() * 2 + 1),
      distance: distance,
      time: distance / 50, // Rough time calculation
    })
  })

  return routes
}

const routes = generateRoutes()

// Create custom icons for different location types
const createCustomIcon = (type: string, selected = false) => {
  let color = "#3b82f6" // Default blue for customers
  let size = 8

  if (type === "dc") {
    color = "#f97316" // Orange for DCs
    size = 14
  } else if (type === "direct") {
    color = "#16a34a" // Green for direct
    size = 12
  }

  const borderWidth = selected ? 3 : 2
  const borderColor = selected ? "#2563eb" : "#ffffff"

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
    iconSize: [size + 2 * borderWidth, size + 2 * borderWidth],
    iconAnchor: [(size + 2 * borderWidth) / 2, (size + 2 * borderWidth) / 2],
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

export default function TransportationRouteMap({ layers }: TransportationRouteMapProps) {
  const [isClient, setIsClient] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLocationClick = (location: Location) => {
    setSelectedRoute(null)
    setSelectedLocation(location)
  }

  const handleRouteClick = (route: Route) => {
    setSelectedLocation(null)
    setSelectedRoute(route)
  }

  const handleMapClick = () => {
    setSelectedLocation(null)
    setSelectedRoute(null)
  }

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-lg text-gray-600">Loading map...</div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[39.8283, -98.5795]} // Center of USA
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onMapClick={handleMapClick} />

        {/* Render routes */}
        {layers.routes &&
          routes.map((route) => {
            const fromLocation = locations.find((loc) => loc.id === route.from)
            const toLocation = locations.find((loc) => loc.id === route.to)

            if (!fromLocation || !toLocation) return null

            return (
              <Polyline
                key={route.id}
                positions={[fromLocation.coordinates, toLocation.coordinates]}
                pathOptions={{
                  color: "#3b82f6",
                  weight: 2,
                  opacity: 0.7,
                }}
                eventHandlers={{
                  click: (e) => {
                    L.DomEvent.stopPropagation(e)
                    handleRouteClick(route)
                  },
                }}
              />
            )
          })}

        {/* Render locations */}
        {locations.map((location) => {
          if (
            (location.type === "customer" && !layers.customers) ||
            (location.type === "dc" && !layers.dcs) ||
            (location.type === "direct" && !layers.direct)
          ) {
            return null
          }

          return (
            <Marker
              key={location.id}
              position={location.coordinates}
              icon={createCustomIcon(location.type, selectedLocation?.id === location.id)}
              eventHandlers={{
                click: (e) => {
                  e.originalEvent.stopPropagation()
                  handleLocationClick(location)
                },
              }}
            />
          )
        })}
      </MapContainer>

      {/* Selected Location Info */}
      {selectedLocation && (
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-lg p-4 shadow-lg z-[1000] max-w-xs">
          <h3 className="font-medium text-gray-800 mb-2">{selectedLocation.name}</h3>
          <div className="text-sm text-gray-600 mb-1">Type: {selectedLocation.type.toUpperCase()}</div>
          <div className="text-sm text-gray-600">
            Location: {selectedLocation.coordinates[0].toFixed(4)}, {selectedLocation.coordinates[1].toFixed(4)}
          </div>
        </div>
      )}

      {/* Selected Route Info */}
      {selectedRoute && (
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-lg p-4 shadow-lg z-[1000] max-w-xs">
          <h3 className="font-medium text-gray-800 mb-2">Route Details</h3>
          <div className="text-sm text-gray-600 mb-1">
            From: {locations.find((loc) => loc.id === selectedRoute.from)?.name}
          </div>
          <div className="text-sm text-gray-600 mb-1">
            To: {locations.find((loc) => loc.id === selectedRoute.to)?.name}
          </div>
          <div className="text-sm text-gray-600 mb-1">Distance: {selectedRoute.distance.toFixed(1)} miles</div>
          <div className="text-sm text-gray-600 mb-1">Cost: ${selectedRoute.cost.toFixed(2)}</div>
          <div className="text-sm text-gray-600">Volume: {selectedRoute.volume} units</div>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-lg p-3 shadow-lg z-[1000]">
        <h4 className="text-xs font-medium text-gray-700 mb-2">Map Legend</h4>
        <div className="space-y-1.5">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-xs text-gray-700">Customers</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
            <span className="text-xs text-gray-700">Direct</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-blue-600 mr-2"></div>
            <span className="text-xs text-gray-700">Routes</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
            <span className="text-xs text-gray-700">DCs</span>
          </div>
        </div>
      </div>
    </div>
  )
}
