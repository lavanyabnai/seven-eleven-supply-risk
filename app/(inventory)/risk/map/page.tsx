"use client"

import { useState } from "react"
import SupplyChainMap from "@/components/map/supply-chain-map"
import { facilityData } from "@/components/map/facility-data"
import type { Facility } from "@/components/map/facility"
import {
  X,
  MapPin,
  TrendingUp,
  TrendingDown,
  Package,
  Clock,
  Truck,
  Mail,
  Phone,
  ExternalLink,
  AlertTriangle,
  BarChart3,
} from "lucide-react"

function getRiskColor(score: number) {
  if (score <= 25) return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", label: "Low" }
  if (score <= 50) return { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", label: "Medium" }
  if (score <= 75) return { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", label: "High" }
  return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", label: "Critical" }
}

function getStatusStyle(status: string) {
  switch (status.toLowerCase()) {
    case "operational":
      return "bg-green-100 text-green-700 border-green-300"
    case "warning":
      return "bg-yellow-100 text-yellow-700 border-yellow-300"
    case "critical":
      return "bg-red-100 text-red-700 border-red-300"
    default:
      return "bg-gray-100 text-gray-700 border-gray-300"
  }
}

function getTypeStyle(type: string) {
  switch (type.toLowerCase()) {
    case "plant":
      return "bg-blue-100 text-blue-700 border-blue-300"
    case "distribution":
      return "bg-purple-100 text-purple-700 border-purple-300"
    case "supplier":
      return "bg-orange-100 text-orange-700 border-orange-300"
    default:
      return "bg-gray-100 text-gray-700 border-gray-300"
  }
}

function EfficiencyBar({ value }: { value: number }) {
  const color = value >= 90 ? "bg-green-500" : value >= 75 ? "bg-yellow-500" : "bg-red-500"
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-semibold text-gray-700 w-8 text-right">{value}%</span>
    </div>
  )
}

function RiskGauge({ score }: { score: number }) {
  const risk = getRiskColor(score)
  const angle = (score / 100) * 180
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-12 overflow-hidden">
        <div className="absolute inset-0 w-24 h-24 rounded-full border-[6px] border-gray-100" />
        <div
          className="absolute inset-0 w-24 h-24 rounded-full border-[6px] border-transparent"
          style={{
            borderTopColor: score <= 25 ? "#22c55e" : score <= 50 ? "#eab308" : score <= 75 ? "#f97316" : "#ef4444",
            borderRightColor: score > 50 ? (score <= 75 ? "#f97316" : "#ef4444") : "transparent",
            transform: `rotate(${angle - 90}deg)`,
          }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <span className={`text-lg font-bold ${risk.text}`}>{score}</span>
        </div>
      </div>
      <span className={`text-xs font-medium ${risk.text} mt-1 px-2 py-0.5 rounded-full ${risk.bg} border ${risk.border}`}>
        {risk.label} Risk
      </span>
    </div>
  )
}

function MetricCard({ icon: Icon, label, value, trend }: { icon: any; label: string; value: string; trend?: "up" | "down" }) {
  return (
    <div className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-gray-200">
        <Icon className="h-4 w-4 text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-gray-500 truncate">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{value}</p>
      </div>
      {trend && (
        <div className={`flex items-center ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
          {trend === "up" ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
        </div>
      )}
    </div>
  )
}

function SidebarDetail({ facility, onClose }: { facility: Facility; onClose: () => void }) {
  const riskScore = facility.riskScore ?? 0

  return (
    <div className="w-[320px] h-full bg-white border-l border-gray-200 shadow-lg flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-medium border px-2 py-0.5 rounded-md ${getTypeStyle(facility.type)}`}>
              {facility.type}
            </span>
            <span className={`text-[11px] font-medium border px-2 py-0.5 rounded-full ${getStatusStyle(facility.status)}`}>
              {facility.status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <h3 className="text-base font-semibold text-gray-900 leading-tight">{facility.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <MapPin className="h-3 w-3 text-orange-500" />
          <p className="text-xs text-orange-600">{facility.address}</p>
        </div>
      </div>

      {/* Risk Score */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-1">Risk Assessment</h4>
            <p className="text-[11px] text-gray-500">Based on performance & reliability</p>
          </div>
          <RiskGauge score={riskScore} />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="px-4 py-3 border-b border-gray-100">
        <h4 className="text-xs font-semibold text-gray-900 mb-2">Key Metrics</h4>
        <div className="grid grid-cols-2 gap-2">
          <MetricCard icon={BarChart3} label="Revenue" value={facility.revenue ?? "N/A"} trend="up" />
          <MetricCard icon={Clock} label="Lead Time" value={facility.leadTime ?? "N/A"} />
          <MetricCard icon={Package} label="Inventory" value={facility.inventory ? facility.inventory.toLocaleString() : "0"} />
          <MetricCard icon={Truck} label="Connections" value={String(facility.connections ?? 0)} />
        </div>
      </div>

      {/* Efficiency */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold text-gray-900">Efficiency</h4>
          <span className="text-xs text-gray-500">{facility.capacity}</span>
        </div>
        <EfficiencyBar value={facility.efficiency} />
        {facility.onTimeDelivery !== undefined && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-gray-500">On-Time Delivery</span>
            </div>
            <EfficiencyBar value={facility.onTimeDelivery} />
          </div>
        )}
      </div>

      {/* Coordinates */}
      <div className="px-4 py-3 border-b border-gray-100">
        <h4 className="text-xs font-semibold text-gray-900 mb-2">Location</h4>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Country</span>
            <span className="font-medium text-gray-900">{facility.country}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Latitude</span>
            <span className="font-medium text-gray-900">{facility.lat.toFixed(4)}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Longitude</span>
            <span className="font-medium text-gray-900">{facility.lng.toFixed(4)}</span>
          </div>
        </div>
      </div>

      {/* Incidents */}
      {facility.lastIncident && (
        <div className="px-4 py-3 border-b border-gray-100">
          <h4 className="text-xs font-semibold text-gray-900 mb-2">Recent Incident</h4>
          <div className="flex items-start gap-2 p-2 bg-red-50 rounded-lg border border-red-100">
            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
            <p className="text-xs text-red-700">{facility.lastIncident}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 mt-auto">
        <h4 className="text-xs font-semibold text-gray-900 mb-2">Actions</h4>
        <div className="space-y-1.5">
          {facility.contactEmail && (
            <a
              href={`mailto:${facility.contactEmail}`}
              className="flex items-center gap-2 w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              {facility.contactEmail}
            </a>
          )}
          {facility.contactPhone && (
            <a
              href={`tel:${facility.contactPhone}`}
              className="flex items-center gap-2 w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              {facility.contactPhone}
            </a>
          )}
          <button className="flex items-center justify-center gap-2 w-full text-xs border border-blue-200 bg-blue-50 rounded-lg px-3 py-2 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer">
            <ExternalLink className="h-3.5 w-3.5" />
            View Full Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null)
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState({
    types: {
      plants: true,
      distribution: true,
      suppliers: true,
    },
    statuses: {
      operational: true,
      warning: true,
      critical: true,
    },
  })

  const handleSelectFacility = (facility: Facility) => {
    setSelectedFacility(facility)
    setSelectedFacilityId(facility.id)
  }

  const handleCloseDetail = () => {
    setSelectedFacility(null)
    setSelectedFacilityId(null)
  }

  const toggleFilter = (filterType: "types" | "statuses", key: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: {
        ...prev[filterType],
        [key]: !prev[filterType][key as keyof (typeof prev)[typeof filterType]],
      },
    }))
  }

  return (
    <div className="flex h-full bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Map + Sidebar */}
        <div className="flex-1 overflow-hidden">
          <SupplyChainMap
            facilities={facilityData}
            onSelectFacility={handleSelectFacility}
            selectedFacilityId={selectedFacilityId ?? undefined}
            selectedFacility={selectedFacility}
            onClose={handleCloseDetail}
            activeFilters={activeFilters}
            toggleFilter={toggleFilter}
            sidebarContent={
              selectedFacility ? (
                <SidebarDetail facility={selectedFacility} onClose={handleCloseDetail} />
              ) : undefined
            }
          />
        </div>
      </div>
    </div>
  )
}
