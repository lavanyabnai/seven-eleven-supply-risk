"use client"

import { useState } from "react"
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from "react-leaflet"
import { divIcon } from "leaflet"
import { X } from "lucide-react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

interface NetworkNode {
  id: string
  name: string
  coordinates: [number, number]
  isHub: boolean
  status: "Operational" | "Warning" | "Critical"
  capacity: string
  performance: number
  type: "Plant" | "Distribution" | "Supplier"
  location: string
}

interface NetworkConnection {
  id: string
  from: string
  to: string
  type: "backbone" | "endpoint"
  transportCost: number
  volume: string
  distance: string
  transitTime: string
  reliability: number
  lastShipment: string
  carrier: string
}

const networkNodes: NetworkNode[] = [
  // Major Distribution Centers (Hubs) - Orange nodes
  {
    id: "west-hub",
    name: "Seattle Distribution Center",
    coordinates: [47.6062, -122.3321],
    isHub: true,
    status: "Operational",
    capacity: "15,000 units/day",
    performance: 87,
    type: "Plant",
    location: "USA • Plant",
  },
  {
    id: "central-hub",
    name: "Chicago Distribution Center",
    coordinates: [41.8781, -87.6298],
    isHub: true,
    status: "Operational",
    capacity: "18,000 units/day",
    performance: 92,
    type: "Distribution",
    location: "USA • Distribution",
  },
  {
    id: "east-hub",
    name: "New York Distribution Center",
    coordinates: [40.7128, -74.006],
    isHub: true,
    status: "Warning",
    capacity: "12,000 units/day",
    performance: 78,
    type: "Plant",
    location: "USA • Plant",
  },

  // Retail Stores/Endpoints - Green nodes
  // West Coast
  {
    id: "portland",
    name: "Portland Store",
    coordinates: [45.5152, -122.6784],
    isHub: false,
    status: "Operational",
    capacity: "500 units/day",
    performance: 95,
    type: "Supplier",
    location: "USA • Supplier",
  },
  {
    id: "las-vegas",
    name: "Las Vegas Store",
    coordinates: [36.1699, -115.1398],
    isHub: false,
    status: "Operational",
    capacity: "600 units/day",
    performance: 82,
    type: "Supplier",
    location: "USA • Supplier",
  },
  {
    id: "phoenix",
    name: "Phoenix Store",
    coordinates: [33.4484, -112.074],
    isHub: false,
    status: "Operational",
    capacity: "700 units/day",
    performance: 89,
    type: "Supplier",
    location: "USA • Supplier",
  },

  // Central Region
  {
    id: "denver",
    name: "Denver Store",
    coordinates: [39.7392, -104.9903],
    isHub: false,
    status: "Operational",
    capacity: "650 units/day",
    performance: 93,
    type: "Supplier",
    location: "USA • Supplier",
  },
  {
    id: "kansas-city",
    name: "Kansas City Store",
    coordinates: [39.0997, -94.5786],
    isHub: false,
    status: "Operational",
    capacity: "550 units/day",
    performance: 86,
    type: "Supplier",
    location: "USA • Supplier",
  },
  {
    id: "saint-paul",
    name: "Saint Paul Store",
    coordinates: [44.9537, -93.09],
    isHub: false,
    status: "Operational",
    capacity: "750 units/day",
    performance: 90,
    type: "Supplier",
    location: "USA • Supplier",
  },
  {
    id: "dallas",
    name: "Dallas Store",
    coordinates: [32.7767, -96.797],
    isHub: false,
    status: "Warning",
    capacity: "900 units/day",
    performance: 85,
    type: "Supplier",
    location: "USA • Supplier",
  },
  {
    id: "houston",
    name: "Houston Store",
    coordinates: [29.7604, -95.3698],
    isHub: false,
    status: "Operational",
    capacity: "850 units/day",
    performance: 87,
    type: "Supplier",
    location: "USA • Supplier",
  },

  // East Coast
  {
    id: "philadelphia",
    name: "Philadelphia Store",
    coordinates: [39.9526, -75.1652],
    isHub: false,
    status: "Operational",
    capacity: "700 units/day",
    performance: 88,
    type: "Supplier",
    location: "USA • Supplier",
  },
  {
    id: "washington-dc",
    name: "Washington Store",
    coordinates: [38.9072, -77.0369],
    isHub: false,
    status: "Operational",
    capacity: "950 units/day",
    performance: 94,
    type: "Supplier",
    location: "USA • Supplier",
  },
  {
    id: "atlanta",
    name: "Atlanta Store",
    coordinates: [33.749, -84.388],
    isHub: false,
    status: "Operational",
    capacity: "800 units/day",
    performance: 89,
    type: "Supplier",
    location: "USA • Supplier",
  },
  {
    id: "charlotte",
    name: "Charlotte Store",
    coordinates: [35.2271, -80.8431],
    isHub: false,
    status: "Operational",
    capacity: "600 units/day",
    performance: 91,
    type: "Supplier",
    location: "USA • Supplier",
  },
  {
    id: "miami",
    name: "Miami Store",
    coordinates: [25.7617, -80.1918],
    isHub: false,
    status: "Critical",
    capacity: "600 units/day",
    performance: 45,
    type: "Supplier",
    location: "USA • Supplier",
  },
]

const networkConnections: NetworkConnection[] = [
  // Backbone connections between major hubs (Red lines)
  {
    id: "backbone-west-central",
    from: "west-hub",
    to: "central-hub",
    type: "backbone",
    transportCost: 2850,
    volume: "4,500 units/week",
    distance: "2,064 miles",
    transitTime: "3 days",
    reliability: 96,
    lastShipment: "2023-05-28",
    carrier: "National Logistics",
  },
  {
    id: "backbone-central-east",
    from: "central-hub",
    to: "east-hub",
    type: "backbone",
    transportCost: 1950,
    volume: "5,200 units/week",
    distance: "789 miles",
    transitTime: "1.5 days",
    reliability: 98,
    lastShipment: "2023-05-30",
    carrier: "Interstate Transport",
  },

  // West Hub to endpoints (Green lines)
  {
    id: "west-portland",
    from: "west-hub",
    to: "portland",
    type: "endpoint",
    transportCost: 450,
    volume: "350 units/week",
    distance: "174 miles",
    transitTime: "3 hours",
    reliability: 99,
    lastShipment: "2023-05-30",
    carrier: "Pacific Northwest Delivery",
  },
  {
    id: "west-vegas",
    from: "west-hub",
    to: "las-vegas",
    type: "endpoint",
    transportCost: 780,
    volume: "420 units/week",
    distance: "1,115 miles",
    transitTime: "16 hours",
    reliability: 93,
    lastShipment: "2023-05-27",
    carrier: "Desert Express",
  },
  {
    id: "west-phoenix",
    from: "west-hub",
    to: "phoenix",
    type: "endpoint",
    transportCost: 920,
    volume: "480 units/week",
    distance: "1,420 miles",
    transitTime: "22 hours",
    reliability: 91,
    lastShipment: "2023-05-26",
    carrier: "Southwest Delivery",
  },

  // Central Hub to endpoints (Green lines)
  {
    id: "central-denver",
    from: "central-hub",
    to: "denver",
    type: "endpoint",
    transportCost: 780,
    volume: "450 units/week",
    distance: "1,003 miles",
    transitTime: "14 hours",
    reliability: 94,
    lastShipment: "2023-05-29",
    carrier: "Mountain Route Express",
  },
  {
    id: "central-kansas",
    from: "central-hub",
    to: "kansas-city",
    type: "endpoint",
    transportCost: 520,
    volume: "380 units/week",
    distance: "533 miles",
    transitTime: "8 hours",
    reliability: 97,
    lastShipment: "2023-05-30",
    carrier: "Midwest Express",
  },
  {
    id: "central-stpaul",
    from: "central-hub",
    to: "saint-paul",
    type: "endpoint",
    transportCost: 480,
    volume: "520 units/week",
    distance: "408 miles",
    transitTime: "6 hours",
    reliability: 98,
    lastShipment: "2023-05-30",
    carrier: "Northern Routes",
  },
  {
    id: "central-dallas",
    from: "central-hub",
    to: "dallas",
    type: "endpoint",
    transportCost: 850,
    volume: "620 units/week",
    distance: "925 miles",
    transitTime: "14 hours",
    reliability: 95,
    lastShipment: "2023-05-28",
    carrier: "Southern Express",
  },
  {
    id: "central-houston",
    from: "central-hub",
    to: "houston",
    type: "endpoint",
    transportCost: 920,
    volume: "580 units/week",
    distance: "1,082 miles",
    transitTime: "16 hours",
    reliability: 93,
    lastShipment: "2023-05-27",
    carrier: "Gulf Coast Delivery",
  },

  // East Hub to endpoints (Green lines)
  {
    id: "east-philadelphia",
    from: "east-hub",
    to: "philadelphia",
    type: "endpoint",
    transportCost: 280,
    volume: "480 units/week",
    distance: "95 miles",
    transitTime: "2 hours",
    reliability: 99,
    lastShipment: "2023-05-30",
    carrier: "Mid-Atlantic Delivery",
  },
  {
    id: "east-washington",
    from: "east-hub",
    to: "washington-dc",
    type: "endpoint",
    transportCost: 420,
    volume: "650 units/week",
    distance: "225 miles",
    transitTime: "4 hours",
    reliability: 98,
    lastShipment: "2023-05-29",
    carrier: "Capital Region Transport",
  },
  {
    id: "east-atlanta",
    from: "east-hub",
    to: "atlanta",
    type: "endpoint",
    transportCost: 780,
    volume: "550 units/week",
    distance: "845 miles",
    transitTime: "13 hours",
    reliability: 94,
    lastShipment: "2023-05-27",
    carrier: "Southeast Carriers",
  },
  {
    id: "east-charlotte",
    from: "east-hub",
    to: "charlotte",
    type: "endpoint",
    transportCost: 650,
    volume: "420 units/week",
    distance: "630 miles",
    transitTime: "10 hours",
    reliability: 96,
    lastShipment: "2023-05-28",
    carrier: "Carolina Express",
  },
  {
    id: "east-miami",
    from: "east-hub",
    to: "miami",
    type: "endpoint",
    transportCost: 1200,
    volume: "380 units/week",
    distance: "1,280 miles",
    transitTime: "20 hours",
    reliability: 89,
    lastShipment: "2023-05-25",
    carrier: "Florida Routes",
  },
]

function createNodeIcon(node: NetworkNode, isSelected: boolean) {
  let color = "#22c55e" // Default green for suppliers/stores

  if (node.isHub) {
    color = "#f97316" // Orange for hubs/distribution centers
  }

  // Override with status colors if needed
  if (node.status === "Warning") {
    color = "#eab308" // Yellow for warning
  } else if (node.status === "Critical") {
    color = "#ef4444" // Red for critical
  }

  const size = node.isHub ? 16 : 12
  const borderWidth = isSelected ? 3 : 2
  const borderColor = "#ffffff"

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
      ">
      </div>
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

function NetworkConnections({
  nodes,
  connections,
  selectedConnection,
  onConnectionClick,
}: {
  nodes: NetworkNode[]
  connections: NetworkConnection[]
  selectedConnection: NetworkConnection | null
  onConnectionClick: (connection: NetworkConnection) => void
}) {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]))

  return (
    <>
      {connections.map((connection) => {
        const fromNode = nodeMap.get(connection.from)
        const toNode = nodeMap.get(connection.to)

        if (!fromNode || !toNode) return null

        const positions: [number, number][] = [fromNode.coordinates, toNode.coordinates]
        const isSelected = selectedConnection?.id === connection.id

        return (
          <Polyline
            key={connection.id}
            positions={positions}
            pathOptions={{
              color: connection.type === "backbone" ? "#ef4444" : "#22c55e",
              weight: isSelected ? 4 : 2,
              opacity: 0.7,
              interactive: true,
            }}
            eventHandlers={{
              click: (e) => {
                L.DomEvent.stopPropagation(e)
                onConnectionClick(connection)
              },
            }}
          />
        )
      })}
    </>
  )
}

function FacilityDetailPanel({
  facility,
  onClose,
}: {
  facility: NetworkNode
  onClose: () => void
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "text-green-600"
      case "Warning":
        return "text-yellow-600"
      case "Critical":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">{facility.name}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close details"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="text-sm text-gray-600 mb-3">{facility.location}</div>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">STATUS</div>
              <div className={`text-sm font-medium ${getStatusColor(facility.status)}`}>{facility.status}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">CAPACITY</div>
              <div className="text-sm font-medium text-gray-900">{facility.capacity}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">PERFORMANCE</div>
              <div className="text-sm font-medium text-gray-900">{facility.performance}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ConnectionDetailPanel({
  connection,
  nodes,
  onClose,
}: {
  connection: NetworkConnection
  nodes: NetworkNode[]
  onClose: () => void
}) {
  const fromNode = nodes.find((node) => node.id === connection.from)
  const toNode = nodes.find((node) => node.id === connection.to)

  if (!fromNode || !toNode) return null

  const routeName = `${fromNode.name} → ${toNode.name}`

  return (
    <div className="absolute top-20 left-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 z-[1000] p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">{routeName}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close details"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="text-sm text-gray-600 mb-3">
            {connection.type === "backbone" ? "Main Distribution Route" : "Supply Route"} • {connection.carrier}
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">TRANSPORT COST</div>
              <div className="text-sm font-medium text-gray-900">${connection.transportCost.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">VOLUME</div>
              <div className="text-sm font-medium text-gray-900">{connection.volume}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">RELIABILITY</div>
              <div className="text-sm font-medium text-gray-900">{connection.reliability}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SupplyChainDashboard() {
  const [selectedFacility, setSelectedFacility] = useState<NetworkNode | null>(null)
  const [selectedConnection, setSelectedConnection] = useState<NetworkConnection | null>(null)

  const handleFacilityClick = (facility: NetworkNode) => {
    setSelectedConnection(null)
    setSelectedFacility(facility)
  }

  const handleConnectionClick = (connection: NetworkConnection) => {
    setSelectedFacility(null)
    setSelectedConnection(connection)
  }

  const handleCloseDetails = () => {
    setSelectedFacility(null)
    setSelectedConnection(null)
  }

  const handleMapClick = () => {
    setSelectedFacility(null)
    setSelectedConnection(null)
  }

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
     
        {/* Content Header */}
        {selectedFacility && <FacilityDetailPanel facility={selectedFacility} onClose={handleCloseDetails} />}

        {/* Map Container */}
        <div className="flex-1 relative">
          {selectedConnection && (
            <ConnectionDetailPanel connection={selectedConnection} nodes={networkNodes} onClose={handleCloseDetails} />
          )}

          <MapContainer
            center={[39.8283, -98.5795]}
            zoom={5}
            minZoom={4}
            maxZoom={10}
            maxBounds={[
              [20, -130],
              [50, -60],
            ]}
            maxBoundsViscosity={1.0}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapClickHandler onMapClick={handleMapClick} />

            <NetworkConnections
              nodes={networkNodes}
              connections={networkConnections}
              selectedConnection={selectedConnection}
              onConnectionClick={handleConnectionClick}
            />

            {networkNodes.map((node) => (
              <Marker
                key={node.id}
                position={node.coordinates}
                icon={createNodeIcon(node, selectedFacility?.id === node.id)}
                eventHandlers={{
                  click: (e) => {
                    e.originalEvent.stopPropagation()
                    handleFacilityClick(node)
                  },
                }}
              />
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}
