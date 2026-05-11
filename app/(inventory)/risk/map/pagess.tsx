"use client"

import { useState } from "react"
import InteractiveSupplyChainMap from "@/components/intermap/interactive-supply-chain-map"
import type { MapEntity, EntityType } from "@/components/intermap/map-entities"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

function getEntityTypeBadgeColor(type: EntityType) {
  switch (type) {
    case "customer":
      return "bg-blue-100 text-blue-700 border-blue-300"
    case "distribution":
      return "bg-pink-100 text-pink-700 border-pink-300"
    case "factory":
      return "bg-orange-100 text-orange-700 border-orange-300"
    case "supplier":
      return "bg-green-100 text-green-700 border-green-300"
    default:
      return "bg-gray-100 text-gray-700 border-gray-300"
  }
}

function getEntityTypeLabel(type: EntityType) {
  switch (type) {
    case "customer":
      return "Customer"
    case "distribution":
      return "Distribution"
    case "factory":
      return "Factory"
    case "supplier":
      return "Supplier"
    default:
      return "Location"
  }
}

function getStatusColor(type: EntityType) {
  switch (type) {
    case "factory":
      return "bg-yellow-100 text-yellow-700 border-yellow-300"
    default:
      return "bg-green-100 text-green-700 border-green-300"
  }
}

function getStatusLabel(type: EntityType) {
  switch (type) {
    case "factory":
      return "Production"
    default:
      return "Active"
  }
}

function SidebarDetail({
  entity,
  onClose,
}: {
  entity: MapEntity
  onClose: () => void
}) {
  const connectionsCount =
    entity.connectedTo && Array.isArray(entity.connectedTo)
      ? entity.connectedTo.length
      : 0
  const totalUnits = entity.capacity || 0
  const products =
    (entity.additionalParams?.products as number | undefined) || 0
  const threshold = 50

  return (
    <div className="w-80 h-full bg-white border-l border-gray-200 shadow-lg flex flex-col overflow-y-auto">
      {/* Header with type badge and close */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <Badge
          className={`${getEntityTypeBadgeColor(entity.type)} text-xs font-medium border px-2 py-0.5 rounded-md`}
        >
          {getEntityTypeLabel(entity.type)}
        </Badge>
        <button
          onClick={onClose}
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>

      {/* Name */}
      <div className="px-4 pt-1 pb-0">
        <h3 className="text-lg font-semibold text-gray-900">{entity.name}</h3>
      </div>

      {/* Address */}
      <div className="px-4 pt-1 pb-4">
        <p className="text-sm text-orange-600">
          {entity.address && entity.address !== "Unknown"
            ? entity.address
            : `${entity.city}, ${entity.country}`}
        </p>
      </div>

      <Separator />

      {/* Coordinates & Connections */}
      <div className="px-4 py-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Latitude</span>
          <span className="font-semibold text-gray-900">
            {entity.lat.toFixed(4)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Longitude</span>
          <span className="font-semibold text-gray-900">
            {entity.lng.toFixed(4)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Connections</span>
          <span className="font-semibold text-gray-900">
            {connectionsCount}
          </span>
        </div>
      </div>

      <Separator />

      {/* Location Info */}
      <div className="px-4 py-4">
        <h4 className="text-sm font-bold text-gray-900 mb-3">Location Info</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Status</span>
            <Badge
              className={`${getStatusColor(entity.type)} text-xs font-medium border px-2.5 py-0.5 rounded-full`}
            >
              {getStatusLabel(entity.type)}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Fulfills Online</span>
            <span className="font-semibold text-gray-900">
              {entity.inclusionType === "Exclude" ? "No" : "Yes"}
            </span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Inventory */}
      <div className="px-4 py-4">
        <h4 className="text-sm font-bold text-gray-900 mb-3">Inventory</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Total Units</span>
            <span
              className={`font-semibold ${totalUnits === 0 ? "text-red-600" : "text-gray-900"}`}
            >
              {totalUnits}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Products</span>
            <span
              className={`font-semibold ${products === 0 ? "text-red-600" : "text-gray-900"}`}
            >
              {products}
            </span>
          </div>
          {/* Threshold bar */}
          <div className="mt-2">
            <div
              className={`text-xs px-3 py-1.5 rounded-full text-center font-medium ${
                totalUnits < threshold
                  ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                  : "bg-green-100 text-green-700 border border-green-300"
              }`}
            >
              {totalUnits < threshold
                ? `Below threshold (${threshold})`
                : `Above threshold (${threshold})`}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Actions */}
      <div className="px-4 py-4">
        <h4 className="text-sm font-bold text-gray-900 mb-3">Actions</h4>
        <div className="space-y-2">
          {entity.website && (
            <a
              href={entity.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-sm border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              View in Shopify
            </a>
          )}
          {(entity.phone || entity.email) && (
            <div className="flex gap-2">
              {entity.phone && (
                <a
                  href={`tel:${entity.phone}`}
                  className="flex-1 text-center text-sm border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Call
                </a>
              )}
              {entity.email && (
                <a
                  href={`mailto:${entity.email}`}
                  className="flex-1 text-center text-sm border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Email
                </a>
              )}
            </div>
          )}
          {!entity.website && !entity.phone && !entity.email && (
            <div className="text-xs text-gray-400 text-center py-1">
              No actions available
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MapPage() {
  const [selectedEntity, setSelectedEntity] = useState<MapEntity | null>(null)

  const handleSelectEntity = (entity: MapEntity) => {
    setSelectedEntity(entity)
  }

  return (
    <div className="h-full">
      <InteractiveSupplyChainMap
        onSelectEntity={handleSelectEntity}
        selectedEntityId={selectedEntity?.id}
        sidebarContent={
          selectedEntity ? (
            <SidebarDetail
              entity={selectedEntity}
              onClose={() => setSelectedEntity(null)}
            />
          ) : undefined
        }
      />
    </div>
  )
}
