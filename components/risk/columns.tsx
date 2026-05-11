// columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

// Type definition matching actual net_scenario DB table
export type NetScenario = {
  id: number
  netId: string
  description?: string | null
  scenarioType: string
  created?: string | null
  status: string
  progress: number
  ignoreRoutes: boolean
  demandType: string
  searchType: string
  bestSolutions: number
  timeLimitSec: number
  mipGap?: string | null
  threads: number
  problemType: string
  unitType: string
  distanceType: string
  currency: string
  solutionPool?: string | null
  objectiveValue?: string | null
  solveTimeSec?: string | null
  iterations?: number | null
  gap?: string | null
  updatedAt?: string | null
  metadata?: Record<string, any> | null
}

const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return "-"
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  } catch {
    return dateStr
  }
}

export const columns: ColumnDef<NetScenario>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "netId",
    header: "Scenario ID",
    cell: ({ row }) => <div className="font-medium text-gray-900 font-sans">{row.getValue("netId")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div className="text-gray-700 font-sans">{row.getValue("description") || "-"}</div>,
  },
  {
    accessorKey: "scenarioType",
    header: "Scenario Type",
    cell: ({ row }) => {
      const type = row.getValue("scenarioType") as string
      const label = type ? type.charAt(0).toUpperCase() + type.slice(1) + " Experiment" : "-"
      return <div className="text-gray-700 font-sans">{label}</div>
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm font-sans">{formatDate(row.getValue("created"))}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Finished",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm font-sans">{formatDate(row.getValue("updatedAt"))}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = (row.getValue("status") as string) || "Not Started"

      const statusColorMap: Record<string, string> = {
        "Not Started": "text-orange-600",
        playing: "text-yellow-600",
        running: "text-yellow-600",
        paused: "text-orange-500",
        stopped: "text-red-500",
        completed: "text-green-600",
        failed: "text-red-600",
      }
      const colorClass = statusColorMap[status] || "text-gray-600"

      return (
        <span className={`text-sm font-medium font-sans ${colorClass}`}>
          {status}
        </span>
      )
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const progress = row.getValue("progress") as number | undefined
      const statusVal = row.getValue("status") as string

      const progressColorMap: Record<string, string> = {
        "Not Started": "text-blue-600",
        playing: "text-yellow-600",
        running: "text-yellow-600",
        completed: "text-green-600",
        stopped: "text-red-500",
        failed: "text-red-600",
      }
      const colorClass = progressColorMap[statusVal] || "text-blue-600"
      const label = progress === 0 || !progress ? "Initialized" : `${progress}%`

      return (
        <span className={`text-sm font-medium font-sans ${colorClass}`}>
          {label}
        </span>
      )
    },
  },
]
