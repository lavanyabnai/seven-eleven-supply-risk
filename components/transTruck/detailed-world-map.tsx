"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Port {
  id: string
  name: string
  country: string
  coordinates: [number, number] // [x, y] in percentage of map width/height
}

interface ShippingRoute {
  id: string
  from: string
  to: string
  path: [number, number][] // Array of [x, y] coordinates as percentages
  vessels: Vessel[]
}

interface Vessel {
  id: string
  name: string
  position: [number, number] // Current position as percentage
  type: "container" | "bulk" | "tanker"
  status: "in-transit" | "loading" | "unloading"
}

interface DetailedWorldMapProps {
  selectedOrigin?: string
  selectedDestination?: string
  className?: string
}

export default function DetailedWorldMap({
  selectedOrigin = "usa-west",
  selectedDestination = "asia-east",
  className = "",
}: DetailedWorldMapProps) {
  const [activeRoute, setActiveRoute] = useState<string | null>(null)
  const [vessels, setVessels] = useState<Vessel[]>([])

  // Major shipping ports with their approximate positions on the map (as percentages)
  const ports: Port[] = [
    { id: "la-long-beach", name: "Los Angeles/Long Beach", country: "USA", coordinates: [13, 42] },
    { id: "seattle", name: "Seattle", country: "USA", coordinates: [12, 35] },
    { id: "vancouver", name: "Vancouver", country: "Canada", coordinates: [12, 32] },
    { id: "shanghai", name: "Shanghai", country: "China", coordinates: [87, 40] },
    { id: "singapore", name: "Singapore", country: "Singapore", coordinates: [83, 58] },
    { id: "rotterdam", name: "Rotterdam", country: "Netherlands", coordinates: [52, 28] },
    { id: "hamburg", name: "Hamburg", country: "Germany", coordinates: [53, 27] },
    { id: "dubai", name: "Dubai", country: "UAE", coordinates: [68, 48] },
    { id: "mumbai", name: "Mumbai", country: "India", coordinates: [78, 52] },
    { id: "suez", name: "Suez Canal", country: "Egypt", coordinates: [60, 45] },
  ]

  // Major shipping routes
  const routes: ShippingRoute[] = [
    {
      id: "transpacific",
      from: "usa-west",
      to: "asia-east",
      path: [
        [13, 42], // LA/Long Beach
        [20, 40],
        [35, 38],
        [50, 36],
        [65, 35],
        [80, 37],
        [87, 40], // Shanghai
      ],
      vessels: [
        {
          id: "vessel-1",
          name: "Pacific Trader",
          position: [45, 37],
          type: "container",
          status: "in-transit",
        },
        {
          id: "vessel-2",
          name: "Ocean Express",
          position: [70, 36],
          type: "container",
          status: "in-transit",
        },
      ],
    },
    {
      id: "europe-asia",
      from: "europe",
      to: "asia",
      path: [
        [52, 28], // Rotterdam
        [58, 35],
        [60, 45], // Suez
        [65, 50],
        [75, 52],
        [83, 58], // Singapore
      ],
      vessels: [
        {
          id: "vessel-3",
          name: "Mediterranean Star",
          position: [62, 42],
          type: "container",
          status: "in-transit",
        },
      ],
    },
  ]

  // Animate vessels along their routes
  useEffect(() => {
    const interval = setInterval(() => {
      setVessels((prevVessels) =>
        prevVessels.map((vessel) => {
          // Simple animation - move vessel slightly along route
          const newX = vessel.position[0] + (Math.random() - 0.5) * 0.5
          const newY = vessel.position[1] + (Math.random() - 0.5) * 0.3
          return {
            ...vessel,
            position: [Math.max(0, Math.min(100, newX)), Math.max(0, Math.min(100, newY))],
          }
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Initialize vessels from routes
  useEffect(() => {
    const allVessels = routes.flatMap((route) => route.vessels)
    setVessels(allVessels)
  }, [])

  const getVesselIcon = (type: string) => {
    switch (type) {
      case "container":
        return "🚢"
      case "bulk":
        return "🛳️"
      case "tanker":
        return "⛽"
      default:
        return "🚢"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-transit":
        return "bg-blue-500"
      case "loading":
        return "bg-yellow-500"
      case "unloading":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className=" overflow-hidden relative">

        {/* Overlay for interactive elements */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            {/* Shipping Routes */}
            {routes.map((route) => (
              <g key={route.id}>
                {/* Route Path */}
                <polyline
                  points={route.path.map((point) => `${point[0]},${point[1]}`).join(" ")}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="0.3"
                  strokeDasharray="1,0.5"
                  opacity="0.8"
                  className={`transition-all duration-300 ${
                    activeRoute === route.id ? "stroke-width-0.5 opacity-100" : ""
                  }`}
                  onMouseEnter={() => setActiveRoute(route.id)}
                  onMouseLeave={() => setActiveRoute(null)}
                />

                {/* Route Direction Arrows */}
                {route.path.slice(1).map((point, index) => {
                  const prevPoint = route.path[index]
                  const angle = Math.atan2(point[1] - prevPoint[1], point[0] - prevPoint[0]) * (180 / Math.PI)
                  return (
                    <g key={`arrow-${index}`}>
                      <polygon
                        points={`${point[0]},${point[1]} ${point[0] - 0.5},${point[1] - 0.3} ${point[0] - 0.5},${
                          point[1] + 0.3
                        }`}
                        fill="#3b82f6"
                        opacity="0.6"
                        transform={`rotate(${angle} ${point[0]} ${point[1]})`}
                      />
                    </g>
                  )
                })}
              </g>
            ))}

            {/* Major Ports */}
            {ports.map((port) => (
              <g key={port.id}>
                <circle
                  cx={port.coordinates[0]}
                  cy={port.coordinates[1]}
                  r="0.8"
                  fill="#22c55e"
                  stroke="#ffffff"
                  strokeWidth="0.2"
                  className="drop-shadow-sm hover:r-1 transition-all cursor-pointer"
                />
                <circle
                  cx={port.coordinates[0]}
                  cy={port.coordinates[1]}
                  r="1.2"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="0.1"
                  opacity="0.5"
                  className="animate-ping"
                />
              </g>
            ))}

            {/* Vessels */}
            {vessels.map((vessel) => (
              <g key={vessel.id}>
                <circle
                  cx={vessel.position[0]}
                  cy={vessel.position[1]}
                  r="0.6"
                  fill="#ffffff"
                  stroke="#3b82f6"
                  strokeWidth="0.2"
                  className="drop-shadow-sm"
                />
                <circle
                  cx={vessel.position[0]}
                  cy={vessel.position[1]}
                  r="0.4"
                  fill="#3b82f6"
                  className={`${getStatusColor(vessel.status)} animate-pulse`}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Port Labels (positioned absolutely) */}
        {ports.slice(0, 6).map((port) => (
          <div
            key={`label-${port.id}`}
            className="absolute text-xs bg-white px-2 py-1 rounded shadow-sm border border-gray-200 pointer-events-none"
            style={{
              left: `${port.coordinates[0]}%`,
              top: `${port.coordinates[1] + 2}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="font-medium text-gray-800">{port.name}</div>
            <div className="text-gray-500 text-xs">{port.country}</div>
          </div>
        ))}

        {/* Vessel Info Cards */}
        {vessels.slice(0, 3).map((vessel, index) => (
          <div
            key={`info-${vessel.id}`}
            className="absolute bg-white p-2 rounded-lg shadow-lg border border-gray-200 text-xs"
            style={{
              left: `${vessel.position[0] + 2}%`,
              top: `${vessel.position[1] - 8}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{getVesselIcon(vessel.type)}</span>
              <div>
                <div className="font-medium text-gray-800">{vessel.name}</div>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(vessel.status)}`}></div>
                  <span className="text-gray-600 capitalize">{vessel.status.replace("-", " ")}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Legend */}
      <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 text-sm space-y-3 max-w-xs">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Shipping Routes</h3>

        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-3 border-2 border-white shadow-sm"></div>
            <span className="text-gray-700">Major Ports</span>
          </div>

          <div className="flex items-center">
            <div className="w-6 h-0.5 bg-blue-500 mr-3 opacity-80"></div>
            <span className="text-gray-700">Shipping Routes</span>
          </div>

          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-3 border-2 border-white shadow-sm"></div>
            <span className="text-gray-700">Vessels in Transit</span>
          </div>
        </div>

        <div className="border-t pt-2">
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span>In Transit</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <span>Loading</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Unloading</span>
            </div>
          </div>
        </div>
      </div>

      {/* Route Statistics */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200 text-sm">
        <h4 className="font-semibold text-gray-800 mb-2">Active Routes</h4>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Transpacific:</span>
            <span className="font-medium">2 vessels</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Europe-Asia:</span>
            <span className="font-medium">1 vessel</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Distance:</span>
            <span className="font-medium">~24,000 km</span>
          </div>
        </div>
      </div>
    </div>
  )
}
