"use client"

import { memo } from "react"
import { Handle, Position } from "@xyflow/react"

interface DiagnosticNodeData {
  name: string
  description?: string
  level: number
  hasChildren: boolean
  isExpanded: boolean
  parentId?: string
  nodeType: string
  value?: string
}

const colorSchemes: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  root: { bg: "bg-blue-50", border: "border-blue-400", text: "text-blue-900", badge: "bg-blue-600" },
  loss: { bg: "bg-amber-50", border: "border-amber-400", text: "text-amber-900", badge: "bg-amber-500" },
  kpi: { bg: "bg-emerald-50", border: "border-emerald-400", text: "text-emerald-900", badge: "bg-emerald-500" },
  module: { bg: "bg-purple-50", border: "border-purple-400", text: "text-purple-900", badge: "bg-purple-500" },
  benefit: { bg: "bg-rose-50", border: "border-rose-400", text: "text-rose-900", badge: "bg-rose-500" },
  category: { bg: "bg-amber-50", border: "border-amber-400", text: "text-amber-900", badge: "bg-orange-500" },
  subcategory: { bg: "bg-rose-50", border: "border-rose-400", text: "text-rose-900", badge: "bg-rose-500" },
  cause: { bg: "bg-emerald-50", border: "border-emerald-400", text: "text-emerald-900", badge: "bg-emerald-500" },
  detail: { bg: "bg-purple-50", border: "border-purple-400", text: "text-purple-900", badge: "bg-purple-500" },
}

function DiagnosticCustomNode({ data }: { data: DiagnosticNodeData }) {
  const scheme = colorSchemes[data.nodeType] || colorSchemes.root

  return (
    <div
      className={`px-3 py-2 shadow-md rounded-lg ${scheme.bg} border-2 ${scheme.border} min-w-[160px] max-w-[220px] cursor-pointer transition-shadow hover:shadow-lg`}
    >
      {data.value && (
        <div className={`${scheme.badge} text-white text-xs font-bold rounded-md px-3 py-1 text-center mb-1.5`}>
          {data.value}
        </div>
      )}
      <div className="text-sm font-semibold text-center leading-tight font-sans" style={{ color: "inherit" }}>
        <span className={scheme.text}>{data.name}</span>
      </div>
      {data.description && (
        <div className="text-[10px] text-gray-500 text-center mt-0.5 leading-tight font-sans">
          {data.description}
        </div>
      )}
      {data.hasChildren && (
        <div className="text-[10px] text-center mt-1 text-gray-400 font-sans">
          {data.isExpanded ? "click to collapse" : "click to expand"}
        </div>
      )}
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-gray-400 !border-white" />
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-gray-400 !border-white" />
    </div>
  )
}

export default memo(DiagnosticCustomNode)
