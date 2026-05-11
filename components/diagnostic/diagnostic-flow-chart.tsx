"use client"

import React, { useState, useCallback, useMemo, useEffect } from "react"
import {
  ReactFlow,
  type Node,
  type Edge,
  addEdge,
  type Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MarkerType,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { Button } from "@/components/ui/button"
import DiagnosticCustomNode from "@/components/diagnostic/diagnostic-custom-node"

// ─── Tree structure ──────────────────────────────────────────
interface TreeEntry {
  name: string
  description?: string
  nodeType: string
  value?: string
  children: string[]
}

type TreeStructure = Record<string, TreeEntry>

const diagnosticTree: TreeStructure = {
  root: {
    name: "2-Week Diagnostic",
    description: "Client performance vs best in class",
    nodeType: "root",
    value: "5 Loss Types",
    children: ["loss-1", "loss-2", "loss-3", "loss-4", "loss-5"],
  },
  "loss-1": {
    name: "Customer-related loss",
    description: "Best: 1% | Client: 5%",
    nodeType: "loss",
    value: "Loss Type 1",
    children: ["kpi-k1"],
  },
  "loss-2": {
    name: "Demand-related loss",
    description: "Best: 5% | Client: 15%",
    nodeType: "loss",
    value: "Loss Type 2",
    children: ["kpi-k2", "kpi-k3"],
  },
  "loss-3": {
    name: "Warehouse-related loss",
    description: "Best: 0% | Client: 5%",
    nodeType: "loss",
    value: "Loss Type 3",
    children: ["kpi-k4"],
  },
  "loss-4": {
    name: "Distribution-related loss",
    description: "Best: 1% | Client: 10%",
    nodeType: "loss",
    value: "Loss Type 4",
    children: ["kpi-k5", "kpi-k6"],
  },
  "loss-5": {
    name: "Supply-related loss",
    description: "Best: 3% | Client: 10%",
    nodeType: "loss",
    value: "Loss Type 5",
    children: ["kpi-k7", "kpi-k8", "kpi-k9"],
  },
  "kpi-k1": {
    name: "K1: Sales skew",
    description: "Best: <50% | Client: >100%",
    nodeType: "kpi",
    value: "<50%",
    children: ["mod-m1"],
  },
  "kpi-k2": {
    name: "K2: Forecast accuracy",
    description: "Best: >70% | Client: 45%",
    nodeType: "kpi",
    value: ">70%",
    children: ["mod-m2"],
  },
  "kpi-k3": {
    name: "K3: Forecast bias",
    description: "Best: <5% | Client: 10%",
    nodeType: "kpi",
    value: "<5%",
    children: [],
  },
  "kpi-k4": {
    name: "K4: Warehouse TAT",
    description: "Best: <4 hrs | Client: 10 hrs",
    nodeType: "kpi",
    value: "<4 hrs",
    children: ["mod-m3"],
  },
  "kpi-k5": {
    name: "K5: FG inventory",
    description: "Best: <4 wks | Client: 8 wks",
    nodeType: "kpi",
    value: "<4 wks",
    children: ["mod-m4"],
  },
  "kpi-k6": {
    name: "K6: Dispatch compliance",
    description: "Best: >95% | Client: 70%",
    nodeType: "kpi",
    value: ">95%",
    children: ["mod-m5"],
  },
  "kpi-k7": {
    name: "K7: Supplier OTIF",
    description: "Best: >95% | Client: 80%",
    nodeType: "kpi",
    value: ">95%",
    children: ["mod-m6"],
  },
  "kpi-k8": {
    name: "K8: Raw material inventory",
    description: "Best: <2 wks | Client: 5 wks",
    nodeType: "kpi",
    value: "<2 wks",
    children: [],
  },
  "kpi-k9": {
    name: "K9: Production plan adherence",
    description: "Best: >90% | Client: 65%",
    nodeType: "kpi",
    value: ">90%",
    children: ["mod-m7"],
  },
  "mod-m1": {
    name: "M1: Demand sensing",
    description: "AI-based demand sensing module",
    nodeType: "module",
    value: "Quick Win",
    children: [],
  },
  "mod-m2": {
    name: "M2: Statistical forecasting",
    description: "Advanced forecasting engine",
    nodeType: "module",
    value: "High Impact",
    children: [],
  },
  "mod-m3": {
    name: "M3: Warehouse optimization",
    description: "Slotting & pick-path optimization",
    nodeType: "module",
    value: "Medium",
    children: [],
  },
  "mod-m4": {
    name: "M4: Inventory optimization",
    description: "Multi-echelon inventory planning",
    nodeType: "module",
    value: "High Impact",
    children: [],
  },
  "mod-m5": {
    name: "M5: Transport optimization",
    description: "Route & load optimization",
    nodeType: "module",
    value: "Quick Win",
    children: [],
  },
  "mod-m6": {
    name: "M6: Supplier collaboration",
    description: "Supplier portal & scorecard",
    nodeType: "module",
    value: "Medium",
    children: [],
  },
  "mod-m7": {
    name: "M7: Production scheduling",
    description: "Constraint-based scheduling",
    nodeType: "module",
    value: "High Impact",
    children: [],
  },
}

// ─── Layout constants ────────────────────────────────────────
const LEVEL_X: Record<number, number> = { 0: 0, 1: 300, 2: 600, 3: 900 }
const NODE_HEIGHT = 100
const NODE_GAP = 20

const nodeTypes = {
  diagnosticNode: DiagnosticCustomNode,
}

// ─── Build nodes & edges from tree ───────────────────────────
function getLevel(id: string): number {
  if (id === "root") return 0
  if (id.startsWith("loss")) return 1
  if (id.startsWith("kpi")) return 2
  if (id.startsWith("mod")) return 3
  return 0
}

function buildNodesAndEdges(
  tree: TreeStructure,
  expandedNodes: Set<string>,
) {
  const nodes: Node[] = []
  const edges: Edge[] = []
  const yCounters: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 }

  function traverse(id: string, parentId?: string) {
    const entry = tree[id]
    if (!entry) return

    const level = getLevel(id)
    const y = yCounters[level] * (NODE_HEIGHT + NODE_GAP)
    yCounters[level]++

    nodes.push({
      id,
      type: "diagnosticNode",
      position: { x: LEVEL_X[level], y },
      data: {
        name: entry.name,
        description: entry.description,
        level,
        hasChildren: entry.children.length > 0,
        isExpanded: expandedNodes.has(id),
        parentId,
        nodeType: entry.nodeType,
        value: entry.value,
      },
    })

    if (parentId) {
      edges.push({
        id: `e-${parentId}-${id}`,
        source: parentId,
        target: id,
        type: "smoothstep",
        style: { stroke: "#94a3b8", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#94a3b8" },
      })
    }

    if (expandedNodes.has(id)) {
      entry.children.forEach((childId) => traverse(childId, id))
    }
  }

  traverse("root")
  return { nodes, edges }
}

// ─── Component ───────────────────────────────────────────────
export default function DiagnosticFlowChart() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(["root"]),
  )

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => buildNodesAndEdges(diagnosticTree, expandedNodes),
    [expandedNodes],
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = buildNodesAndEdges(
      diagnosticTree,
      expandedNodes,
    )
    setNodes(newNodes)
    setEdges(newEdges)
  }, [expandedNodes, setNodes, setEdges])

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const entry = diagnosticTree[node.id]
      if (!entry || entry.children.length === 0) return

      setExpandedNodes((prev) => {
        const next = new Set(prev)
        if (next.has(node.id)) {
          next.delete(node.id)
          // collapse children recursively
          const removeChildren = (id: string) => {
            const e = diagnosticTree[id]
            if (!e) return
            e.children.forEach((childId) => {
              next.delete(childId)
              removeChildren(childId)
            })
          }
          removeChildren(node.id)
        } else {
          next.add(node.id)
        }
        return next
      })
    },
    [],
  )

  const expandAll = useCallback(() => {
    const all = new Set(Object.keys(diagnosticTree))
    setExpandedNodes(all)
  }, [])

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set(["root"]))
  }, [])

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="flex gap-2 p-2 border-b">
        <Button variant="outline" size="sm" onClick={expandAll}>
          Expand All
        </Button>
        <Button variant="outline" size="sm" onClick={collapseAll}>
          Collapse All
        </Button>
      </div>
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
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
    </div>
  )
}