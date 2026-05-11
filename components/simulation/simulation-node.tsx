"use client"

import type React from "react"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "reactflow"
import { Truck, Square, ArrowRight, Diamond, Clock, Target, Cog, Database, BarChart3, Zap } from "lucide-react"

// Map of node types to colors
const typeColorMap: Record<string, string> = {
  source: "bg-green-500",
  process: "bg-blue-500",
  resource: "bg-orange-500",
  decision: "bg-yellow-500",
  delay: "bg-purple-500",
  sink: "bg-red-500",
  transport: "bg-teal-500",
  storage: "bg-indigo-500",
  monitor: "bg-pink-500",
  trigger: "bg-cyan-500",
}

// Map of icon names to components
const iconMap: Record<string, React.ReactNode> = {
  Truck: <Truck size={16} />,
  Square: <Square size={16} />,
  ArrowRight: <ArrowRight size={16} />,
  Diamond: <Diamond size={16} />,
  Clock: <Clock size={16} />,
  Target: <Target size={16} />,
  Cog: <Cog size={16} />,
  Database: <Database size={16} />,
  BarChart3: <BarChart3 size={16} />,
  Zap: <Zap size={16} />,
}

const SimulationNode = memo(({ data, isConnectable, selected }: NodeProps) => {
  const color = typeColorMap[data.type] || "bg-gray-500"
  const hasProperties = data.properties && Object.keys(data.properties).length > 0

  return (
    <div
      className={`relative bg-white border-2 rounded-lg shadow-sm p-3 min-w-[140px] ${
        selected ? "border-blue-500" : "border-gray-200"
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 ${color} rounded-md flex items-center justify-center text-white`}>
            {iconMap[data.icon]}
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold text-gray-800">{data.label}</div>
            <div className="text-xs text-gray-500 capitalize">{data.type}</div>
          </div>
        </div>

        {hasProperties && (
          <div className="text-xs bg-gray-50 rounded p-1">
            {Object.entries(data.properties)
              .slice(0, 2)
              .map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600">{key}:</span>
                  <span className="font-medium">{String(value)}</span>
                </div>
              ))}
            {Object.keys(data.properties).length > 2 && <div className="text-gray-400 text-center">...</div>}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
    </div>
  )
})

SimulationNode.displayName = "SimulationNode"

export { SimulationNode }
