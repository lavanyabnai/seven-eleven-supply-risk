"use client"

import type React from "react"

import { Truck, Square, ArrowRight, Diamond, Clock, Target, Cog, Database, BarChart3, Zap } from "lucide-react"

// Simulation-specific node types
const simulationNodeTypes = [
  { type: "source", label: "Source", icon: "Truck", color: "bg-green-500", description: "Entity generator" },
  { type: "process", label: "Process", icon: "Cog", color: "bg-blue-500", description: "Processing station" },
  {
    type: "resource",
    label: "Resource",
    icon: "Square",
    color: "bg-orange-500",
    description: "Limited capacity resource",
  },
  { type: "decision", label: "Decision", icon: "Diamond", color: "bg-yellow-500", description: "Conditional routing" },
  { type: "delay", label: "Delay", icon: "Clock", color: "bg-purple-500", description: "Time delay" },
  { type: "sink", label: "Sink", icon: "Target", color: "bg-red-500", description: "Entity disposal" },
  {
    type: "transport",
    label: "Transport",
    icon: "ArrowRight",
    color: "bg-teal-500",
    description: "Movement/transport",
  },
  { type: "storage", label: "Storage", icon: "Database", color: "bg-indigo-500", description: "Storage facility" },
  { type: "monitor", label: "Monitor", icon: "BarChart3", color: "bg-pink-500", description: "Data collection" },
  { type: "trigger", label: "Trigger", icon: "Zap", color: "bg-cyan-500", description: "Event trigger" },
]

// Map of icon names to components
const iconMap: Record<string, React.ReactNode> = {
  Truck: <Truck size={20} />,
  Square: <Square size={20} />,
  ArrowRight: <ArrowRight size={20} />,
  Diamond: <Diamond size={20} />,
  Clock: <Clock size={20} />,
  Target: <Target size={20} />,
  Cog: <Cog size={20} />,
  Database: <Database size={20} />,
  BarChart3: <BarChart3 size={20} />,
  Zap: <Zap size={20} />,
}

export function SimulationNodeSidebar() {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string, label: string, icon: string) => {
    event.dataTransfer.setData("application/reactflow/type", nodeType)
    event.dataTransfer.setData("application/reactflow/label", label)
    event.dataTransfer.setData("application/reactflow/icon", icon)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <div className="w-32 bg-white border-r overflow-y-auto flex flex-col py-4 gap-3">
      <div className="px-2 text-xs font-semibold text-gray-600 uppercase tracking-wide">Simulation Nodes</div>
      {simulationNodeTypes.map((nodeType) => (
        <div
          key={nodeType.type}
          className="flex flex-col items-center cursor-grab hover:bg-gray-50 p-2 mx-1 rounded"
          onDragStart={(event) => onDragStart(event, nodeType.type, nodeType.label, nodeType.icon)}
          draggable
          title={nodeType.description}
        >
          <div className={`w-10 h-10 ${nodeType.color} rounded-md flex items-center justify-center text-white mb-1`}>
            {iconMap[nodeType.icon]}
          </div>
          <span className="text-xs text-center font-medium">{nodeType.label}</span>
        </div>
      ))}
    </div>
  )
}
