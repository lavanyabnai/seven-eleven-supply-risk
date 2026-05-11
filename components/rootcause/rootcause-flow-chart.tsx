"use client"

import React, { useCallback } from "react"
import {
  ReactFlow,
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  Controls,
  Background,
  MarkerType,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import RootCauseCustomNode from "@/components/rootcause/rootcause-custom-node"

const nodeTypes = {
  rootCauseNode: RootCauseCustomNode,
}

// ─── Layout positions ────────────────────────────────────────
const X = {
  OBJ: -100,
  L0: 180,
  L1: 450,
  L2: 720,
  L3: 960,
  L4: 1200,
  BAR: 1450,
}

const rootCauseNodes: Node[] = [
  // ════════ TITLE ════════
  {
    id: "title",
    type: "rootCauseNode",
    position: { x: X.L1 - 100, y: -80 },
    data: {
      nodeVariant: "title",
      label: "Root cause analysis helps identify main reasons for lost sales",
      subtitle: "Key reasons for stock out at the Re-distributors",
    },
    draggable: true,
    selectable: false,
  },

  // ════════ LEGEND ════════
  {
    id: "legend",
    type: "rootCauseNode",
    position: { x: X.BAR - 50, y: -70 },
    data: { nodeVariant: "legend" },
    draggable: true,
    selectable: false,
  },

  // ════════ OBJECTIVE BOX ════════
  {
    id: "objective",
    type: "rootCauseNode",
    position: { x: X.OBJ, y: 120 },
    data: {
      nodeVariant: "objective",
      objectives: [
        "To link back stock outs in last mile of supply chain to issues in SCM performance upstream",
        "To quantify contribution to stock outs",
      ],
    },
    draggable: true,
    selectable: false,
  },

  // ════════ LEVEL 0: ROOT ════════
  {
    id: "root",
    type: "rootCauseNode",
    position: { x: X.L0, y: 340 },
    data: {
      nodeVariant: "tree",
      percentage: "100%",
      circleColor: "blue",
      label: "31% Stock outs/lost sales at relevant last mile point of the supply chain – the Re-distributor",
    },
    draggable: true,
  },

  // ════════ LEVEL 1 ════════
  {
    id: "branch-55",
    type: "rootCauseNode",
    position: { x: X.L1, y: 60 },
    data: {
      nodeVariant: "tree",
      percentage: "55%",
      circleColor: "red",
      branchNumber: 1,
      label: "Stocks available at Distribution Centre, but stocked out at the Re-Distributor",
      description: "Poor replenishment (regional distribution)",
    },
    draggable: true,
  },
  {
    id: "branch-45",
    type: "rootCauseNode",
    position: { x: X.L1, y: 460 },
    data: {
      nodeVariant: "tree",
      percentage: "45%",
      circleColor: "blue",
      branchNumber: 2,
      label: "No stock available at the Distribution Centre",
    },
    draggable: true,
  },

  // ════════ LEVEL 2 ════════
  {
    id: "branch-35",
    type: "rootCauseNode",
    position: { x: X.L2, y: 250 },
    data: {
      nodeVariant: "tree",
      percentage: "35%",
      circleColor: "red",
      label: "Sold less than forecast",
    },
    draggable: true,
  },
  {
    id: "branch-10",
    type: "rootCauseNode",
    position: { x: X.L2, y: 580 },
    data: {
      nodeVariant: "tree",
      percentage: "10%",
      circleColor: "blue",
      label: "SKU not planned for sale/sold more than forecast –",
      description: "Poor demand planning",
    },
    draggable: true,
  },

  // ════════ FORECAST BAR (next to branch-10) ════════
  {
    id: "forecast-bar",
    type: "rootCauseNode",
    position: { x: X.L3 - 20, y: 560 },
    data: {
      nodeVariant: "forecast",
      currentValue: "10-15%",
      benchmarkValue: "5-7%",
      currentHeight: 55,
      benchmarkHeight: 35,
      kpiLabel: "Forecast Accuracy",
    },
    draggable: true,
  },

  // ════════ LEVEL 3 ════════
  {
    id: "branch-12",
    type: "rootCauseNode",
    position: { x: X.L3, y: 160 },
    data: {
      nodeVariant: "tree",
      percentage: "12%",
      circleColor: "blue",
      label: "Adequate or over Produced",
    },
    draggable: true,
  },
  {
    id: "branch-23",
    type: "rootCauseNode",
    position: { x: X.L3, y: 370 },
    data: {
      nodeVariant: "tree",
      percentage: "23%",
      circleColor: "blue",
      label: "Under Produced",
    },
    draggable: true,
  },

  // ════════ LEVEL 4: LEAF CAUSES ════════
  {
    id: "leaf-replenish",
    type: "rootCauseNode",
    position: { x: X.L4, y: 20 },
    data: {
      nodeVariant: "tree",
      percentage: "1%",
      circleColor: "blue",
      label: "Poor replenishment (regional distribution)",
    },
    draggable: true,
  },
  {
    id: "leaf-scheduling",
    type: "rootCauseNode",
    position: { x: X.L4, y: 120 },
    data: {
      nodeVariant: "tree",
      percentage: "4%",
      circleColor: "blue",
      label: "Poor production scheduling at plants",
    },
    draggable: true,
  },
  {
    id: "leaf-dispatch-plan",
    type: "rootCauseNode",
    position: { x: X.L4, y: 240 },
    data: {
      nodeVariant: "tree",
      percentage: "9%",
      circleColor: "red",
      label: "Poor dispatch planning from plants to DC",
    },
    draggable: true,
  },
  {
    id: "leaf-dispatch-comp",
    type: "rootCauseNode",
    position: { x: X.L4, y: 360 },
    data: {
      nodeVariant: "tree",
      percentage: "8%",
      circleColor: "blue",
      label: "Poor dispatch plan compliance at plants",
    },
    draggable: true,
  },
  {
    id: "leaf-prod-exec",
    type: "rootCauseNode",
    position: { x: X.L4, y: 475 },
    data: {
      nodeVariant: "tree",
      percentage: "7%",
      circleColor: "red",
      label: "Low production execution at plants",
    },
    draggable: true,
  },
  {
    id: "leaf-prod-cap",
    type: "rootCauseNode",
    position: { x: X.L4, y: 590 },
    data: {
      nodeVariant: "tree",
      percentage: "6%",
      circleColor: "red",
      label: "Low production plan/capacity at plants",
    },
    draggable: true,
  },

  // ════════ BAR CHART KPI NODES ════════
  {
    id: "bar-dispatch-coverage",
    type: "rootCauseNode",
    position: { x: X.BAR, y: 220 },
    data: {
      nodeVariant: "barChart",
      currentValue: "85%",
      benchmarkValue: "100%",
      currentHeight: 55,
      benchmarkHeight: 65,
      kpiLabel: "Dispatch Coverage Plan",
    },
    draggable: true,
  },
  {
    id: "bar-dispatch-compliance",
    type: "rootCauseNode",
    position: { x: X.BAR, y: 345 },
    data: {
      nodeVariant: "barChart",
      currentValue: "70%",
      benchmarkValue: "95%",
      currentHeight: 45,
      benchmarkHeight: 62,
      kpiLabel: "Dispatch Compliance",
    },
    draggable: true,
  },
  {
    id: "bar-prod-clip",
    type: "rootCauseNode",
    position: { x: X.BAR, y: 465 },
    data: {
      nodeVariant: "barChart",
      currentValue: "65%",
      benchmarkValue: "95%",
      currentHeight: 42,
      benchmarkHeight: 62,
      kpiLabel: "Production CLIP",
    },
    draggable: true,
  },
  {
    id: "bar-prod-coverage",
    type: "rootCauseNode",
    position: { x: X.BAR, y: 580 },
    data: {
      nodeVariant: "barChart",
      currentValue: "85%",
      benchmarkValue: "99%",
      currentHeight: 55,
      benchmarkHeight: 65,
      kpiLabel: "Production Coverage Plan",
    },
    draggable: true,
  },
]

// ─── Edges ───────────────────────────────────────────────────
const edgeBase = {
  style: { stroke: "#94a3b8", strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed as const, color: "#94a3b8" },
}

const dashedEdge = {
  style: { stroke: "#94a3b8", strokeWidth: 1.5, strokeDasharray: "4,4" },
}

const rootCauseEdges: Edge[] = [
  // Root → Level 1
  { id: "e-root-55", source: "root", target: "branch-55", type: "smoothstep", ...edgeBase },
  { id: "e-root-45", source: "root", target: "branch-45", type: "smoothstep", ...edgeBase },

  // Level 1 → Level 2
  { id: "e-45-35", source: "branch-45", target: "branch-35", type: "smoothstep", ...edgeBase },
  { id: "e-45-10", source: "branch-45", target: "branch-10", type: "smoothstep", ...edgeBase },

  // branch-10 → forecast bar
  { id: "e-10-forecast", source: "branch-10", target: "forecast-bar", type: "smoothstep", ...dashedEdge },

  // Level 2 → Level 3
  { id: "e-35-12", source: "branch-35", target: "branch-12", type: "smoothstep", ...edgeBase },
  { id: "e-35-23", source: "branch-35", target: "branch-23", type: "smoothstep", ...edgeBase },

  // Level 3 → Level 4 (from 12% Adequate)
  { id: "e-12-replenish", source: "branch-12", target: "leaf-replenish", type: "smoothstep", ...edgeBase },
  { id: "e-12-scheduling", source: "branch-12", target: "leaf-scheduling", type: "smoothstep", ...edgeBase },

  // Level 3 → Level 4 (from 23% Under Produced)
  { id: "e-23-disp-plan", source: "branch-23", target: "leaf-dispatch-plan", type: "smoothstep", ...edgeBase },
  { id: "e-23-disp-comp", source: "branch-23", target: "leaf-dispatch-comp", type: "smoothstep", ...edgeBase },
  { id: "e-23-prod-exec", source: "branch-23", target: "leaf-prod-exec", type: "smoothstep", ...edgeBase },
  { id: "e-23-prod-cap", source: "branch-23", target: "leaf-prod-cap", type: "smoothstep", ...edgeBase },

  // Leaf causes → Bar charts
  { id: "e-disp-plan-bar", source: "leaf-dispatch-plan", target: "bar-dispatch-coverage", type: "smoothstep", ...dashedEdge },
  { id: "e-disp-comp-bar", source: "leaf-dispatch-comp", target: "bar-dispatch-compliance", type: "smoothstep", ...dashedEdge },
  { id: "e-prod-exec-bar", source: "leaf-prod-exec", target: "bar-prod-clip", type: "smoothstep", ...dashedEdge },
  { id: "e-prod-cap-bar", source: "leaf-prod-cap", target: "bar-prod-coverage", type: "smoothstep", ...dashedEdge },
]

export default function RootCauseFlowChart() {
  const [nodes, , onNodesChange] = useNodesState(rootCauseNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(rootCauseEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  return (
    <div className="w-full h-full bg-white font-sans">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        minZoom={0.3}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
      >
        <Controls />
        <Background color="#f1f5f9" gap={30} />
      </ReactFlow>
    </div>
  )
}
