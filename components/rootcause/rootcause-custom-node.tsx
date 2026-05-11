"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"

interface RootCauseNodeData {
  nodeVariant: "tree" | "barChart" | "objective" | "legend" | "title" | "forecast"
  label?: string
  description?: string
  percentage?: string
  circleColor?: "red" | "blue"
  branchNumber?: number
  currentValue?: string
  benchmarkValue?: string
  currentHeight?: number
  benchmarkHeight?: number
  kpiLabel?: string
  objectives?: string[]
  subtitle?: string
  [key: string]: unknown
}

function RootCauseCustomNode({ data }: NodeProps) {
  const d = data as unknown as RootCauseNodeData

  switch (d.nodeVariant) {
    case "tree":
      return <TreeNode data={d} />
    case "barChart":
      return <BarChartNode data={d} />
    case "objective":
      return <ObjectiveNode data={d} />
    case "legend":
      return <LegendNode />
    case "title":
      return <TitleNode data={d} />
    case "forecast":
      return <ForecastNode data={d} />
    default:
      return <TreeNode data={d} />
  }
}

function TreeNode({ data }: { data: RootCauseNodeData }) {
  const isRed = data.circleColor === "red"

  return (
    <div className="flex items-start gap-2" style={{ maxWidth: 200 }}>
      {data.branchNumber && (
        <div className="shrink-0 w-5 h-5 rounded-full bg-blue-800 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
          {data.branchNumber}
        </div>
      )}
      <div className="flex flex-col items-start">
        {data.percentage && (
          <div
            className={`shrink-0 rounded-full text-white text-xs font-bold flex items-center justify-center mb-1 ${
              isRed ? "bg-red-500" : "bg-blue-600"
            }`}
            style={{ width: 40, height: 40 }}
          >
            {data.percentage}
          </div>
        )}
        <div className="text-[12px] text-gray-800 leading-snug font-medium" style={{ maxWidth: 170 }}>
          {data.label}
        </div>
        {data.description && (
          <div className="text-[10px] text-blue-600 underline mt-0.5 leading-snug italic">
            {data.description}
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-gray-400 !border-white" />
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-gray-400 !border-white" />
    </div>
  )
}

function BarChartNode({ data }: { data: RootCauseNodeData }) {
  const currentH = data.currentHeight || 60
  const benchmarkH = data.benchmarkHeight || 40

  return (
    <div className="flex flex-col items-center" style={{ width: 120 }}>
      <div className="flex items-end gap-2" style={{ height: 80 }}>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-gray-700 font-semibold mb-0.5">
            {data.currentValue}
          </span>
          <div
            className="bg-blue-700 rounded-sm"
            style={{ width: 28, height: currentH }}
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-gray-500 font-semibold mb-0.5">
            {data.benchmarkValue}
          </span>
          <div
            className="bg-blue-300 rounded-sm"
            style={{ width: 28, height: benchmarkH }}
          />
        </div>
      </div>
      {data.kpiLabel && (
        <div className="text-[11px] font-semibold text-gray-800 text-center mt-1.5 leading-tight" style={{ maxWidth: 110 }}>
          {data.kpiLabel}
        </div>
      )}
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-gray-400 !border-white" />
    </div>
  )
}

function ForecastNode({ data }: { data: RootCauseNodeData }) {
  const currentH = data.currentHeight || 60
  const benchmarkH = data.benchmarkHeight || 40

  return (
    <div className="flex flex-col items-center" style={{ width: 130 }}>
      <div className="flex items-end gap-3" style={{ height: 80 }}>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-gray-700 font-semibold mb-0.5">
            {data.currentValue}
          </span>
          <div
            className="bg-blue-700 rounded-sm"
            style={{ width: 30, height: currentH }}
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-gray-500 font-semibold mb-0.5">
            {data.benchmarkValue}
          </span>
          <div
            className="bg-blue-300 rounded-sm"
            style={{ width: 30, height: benchmarkH }}
          />
        </div>
      </div>
      {data.kpiLabel && (
        <div className="text-[11px] font-semibold text-gray-800 text-center mt-1.5 leading-tight">
          {data.kpiLabel}
        </div>
      )}
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-gray-400 !border-white" />
    </div>
  )
}

function ObjectiveNode({ data }: { data: RootCauseNodeData }) {
  return (
    <div
      className="border-2 border-dashed border-gray-400 rounded-md bg-white px-4 py-3"
      style={{ width: 200 }}
    >
      <div className="text-sm font-bold text-blue-900 mb-2">Objective</div>
      {data.objectives?.map((obj, i) => (
        <div key={i} className="text-[11px] text-gray-700 leading-relaxed flex items-start gap-1.5 mb-1">
          <span className="text-gray-500 mt-0.5 shrink-0">&#9632;</span>
          <span>{obj}</span>
        </div>
      ))}
    </div>
  )
}

function LegendNode() {
  return (
    <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-md px-4 py-2 shadow-sm">
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 bg-blue-700 rounded-sm" />
        <span className="text-[11px] text-gray-700 font-medium">Current</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 bg-blue-300 rounded-sm" />
        <span className="text-[11px] text-gray-700 font-medium">Benchmark</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 bg-red-500 rounded-full" />
        <span className="text-[11px] text-gray-700 font-medium">Issue</span>
      </div>
    </div>
  )
}

function TitleNode({ data }: { data: RootCauseNodeData }) {
  return (
    <div style={{ width: 600 }}>
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-full bg-blue-800 text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
          I
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 leading-tight">
            {data.label}
          </h2>
          {data.subtitle && (
            <p className="text-sm text-gray-500 mt-1">{data.subtitle}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(RootCauseCustomNode)
