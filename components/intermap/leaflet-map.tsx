"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import all Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

interface MapEntity {
  id: string | number
  name: string
  type: "customer" | "distribution" | "factory" | "supplier"
  lat: number
  lng: number
  city?: string
  country?: string
  locationName?: string
}

interface LeafletMapProps {
  entities?: MapEntity[]
  onSelectEntity?: (entity: MapEntity) => void
  selectedEntityId?: string | number
  center?: [number, number]
  zoom?: number
}

export default function LeafletMap({
  entities = [],
  onSelectEntity,
  selectedEntityId,
  center = [51.505, -0.09],
  zoom = 6,
}: LeafletMapProps) {
  const mapRef = useRef<any>(null)
  const [isClient, setIsClient] = useState(false)
  const [leafletIcons, setLeafletIcons] = useState<Map<string, any>>(new Map())

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Fix Leaflet icons and create custom icons
  useEffect(() => {
    if (!isClient || !entities.length) return

    const setupLeafletIcons = async () => {
      try {
        const L = await import("leaflet")

        // Fix default marker icons
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        })

        // Create custom icons for each entity
        const iconMap = new Map()

        entities.forEach((entity) => {
          const getEntityColor = (type: string) => {
            switch (type) {
              case "customer":
                return "#3b82f6" // blue
              case "distribution":
                return "#ec4899" // pink
              case "factory":
                return "#f59e0b" // orange
              case "supplier":
                return "#22c55e" // green
              default:
                return "#6b7280" // gray
            }
          }

          const isSelected = selectedEntityId === entity.id
          const color = getEntityColor(entity.type)
          const size = isSelected ? 40 : 32

          const iconHtml = `
            <div style="
              background-color: ${color}; 
              border: ${isSelected ? 4 : 2}px solid white; 
              border-radius: 50%; 
              width: ${size}px; 
              height: ${size}px; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              ${isSelected ? "outline: 2px dotted #fbbf24;" : ""}
            ">
              <div style="color: white; font-size: ${isSelected ? 16 : 12}px; font-weight: bold;">
                ${entity.type.charAt(0).toUpperCase()}
              </div>
            </div>
          `

          const customIcon = L.divIcon({
            html: iconHtml,
            className: "",
            iconSize: [size, size],
            iconAnchor: [size / 2, size / 2],
          })

          iconMap.set(`${entity.type}-${entity.id}`, customIcon)
        })

        setLeafletIcons(iconMap)
      } catch (error) {
        console.error("Error setting up Leaflet icons:", error)
      }
    }

    setupLeafletIcons()
  }, [isClient, entities, selectedEntityId])

  // Calculate map center based on entities
  const mapCenter: [number, number] =
    entities.length > 0
      ? [
          entities.reduce((sum, entity) => sum + entity.lat, 0) / entities.length,
          entities.reduce((sum, entity) => sum + entity.lng, 0) / entities.length,
        ]
      : center

  if (!isClient) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    )
  }

  const PopupContent = ({ entity }: { entity: MapEntity }) => (
    <div className="p-2">
      <h3 className="font-semibold text-lg">{entity.name}</h3>
      <p className="text-sm text-gray-600 capitalize">{entity.type}</p>
      {entity.locationName && <p className="text-sm text-gray-500">{entity.locationName}</p>}
      {entity.city && entity.country && (
        <p className="text-xs text-gray-400">
          {entity.city}, {entity.country}
        </p>
      )}
      <p className="text-xs text-gray-400 font-mono mt-1">
        {entity.lat.toFixed(4)}, {entity.lng.toFixed(4)}
      </p>
    </div>
  )

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border">
      <MapContainer center={mapCenter} zoom={zoom} style={{ height: "100%", width: "100%" }} ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {entities.map((entity) => {
          const iconKey = `${entity.type}-${entity.id}`
          const icon = leafletIcons.get(iconKey)

          if (!icon) return null

          return (
            <Marker
              key={iconKey}
              position={[entity.lat, entity.lng]}
              icon={icon}
              eventHandlers={{
                click: () => {
                  if (onSelectEntity) {
                    onSelectEntity(entity)
                  }
                },
              }}
            >
              <Popup maxWidth={300}>
                <PopupContent entity={entity} />
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
