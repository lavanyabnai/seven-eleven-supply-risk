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
import CustomNode from "@/components/productFlow/custom-node"
import type { ProductFlow } from "@/components/productFlow/product-flow-data"

// ─── Tree structure types ────────────────────────────────────────
interface TreeEntry {
  name: string
  description?: string
  nodeType: "root" | "source" | "product" | "destination"
  value?: string
  children: string[]
}

type TreeStructure = Record<string, TreeEntry>

// ─── Build tree structure from flows data ────────────────────────
function buildTreeStructure(flows: ProductFlow[]): TreeStructure {
  const tree: TreeStructure = {}
  const totalFlow = flows.reduce((s, f) => s + f.flow, 0)
  const totalCost = flows.reduce((s, f) => s + f.cost, 0)

  // Group by source
  const sourceMap = new Map<string, ProductFlow[]>()
  flows.forEach((f) => {
    const arr = sourceMap.get(f.from) || []
    arr.push(f)
    sourceMap.set(f.from, arr)
  })

  // Top sources by flow
  const topSources = [...sourceMap.entries()]
    .map(([name, sFlows]) => ({ name, flows: sFlows, total: sFlows.reduce((s, f) => s + f.flow, 0) }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 6)

  const sourceIds = topSources.map((s) => `src-${s.name.replace(/\s+/g, "-")}`)

  tree["root"] = {
    name: "Supply Chain",
    description: `${totalFlow.toLocaleString()} units | £${(totalCost / 1000).toFixed(0)}k total cost`,
    nodeType: "root",
    value: `${topSources.length} Sources`,
    children: sourceIds,
  }

  topSources.forEach(({ name: sourceName, flows: sourceFlows }) => {
    const srcId = `src-${sourceName.replace(/\s+/g, "-")}`
    const srcFlow = sourceFlows.reduce((s, f) => s + f.flow, 0)

    // Group by product
    const productMap = new Map<string, ProductFlow[]>()
    sourceFlows.forEach((f) => {
      const arr = productMap.get(f.product) || []
      arr.push(f)
      productMap.set(f.product, arr)
    })

    const topProducts = [...productMap.entries()]
      .map(([pName, pFlows]) => ({ name: pName, flows: pFlows, total: pFlows.reduce((s, f) => s + f.flow, 0) }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 4)

    const productIds = topProducts.map((p) => `prod-${srcId}-${p.name.replace(/\s+/g, "-")}`)

    tree[srcId] = {
      name: sourceName,
      description: `${srcFlow.toLocaleString()} units across ${productMap.size} products`,
      nodeType: "source",
      value: `${srcFlow.toLocaleString()} units`,
      children: productIds,
    }

    topProducts.forEach(({ name: productName, flows: prodFlows }) => {
      const prodId = `prod-${srcId}-${productName.replace(/\s+/g, "-")}`
      const prodFlow = prodFlows.reduce((s, f) => s + f.flow, 0)
      const prodCost = prodFlows.reduce((s, f) => s + f.cost, 0)

      const topDests = [...prodFlows]
        .sort((a, b) => b.cost - a.cost)
        .slice(0, 4)

      const destIds = topDests.map((f) => `dest-${prodId}-${f.id}`)

      tree[prodId] = {
        name: productName,
        description: `£${(prodCost / 1000).toFixed(1)}k cost | ${prodFlows.length} routes`,
        nodeType: "product",
        value: `${prodFlow.toLocaleString()} units`,
        children: destIds,
      }

      topDests.forEach((f) => {
        const destId = `dest-${prodId}-${f.id}`
        tree[destId] = {
          name: f.to,
          description: `${f.flow} units | ${f.distance.toFixed(1)} km`,
          nodeType: "destination",
          value: `£${f.cost >= 1000 ? (f.cost / 1000).toFixed(1) + "k" : f.cost.toLocaleString()}`,
          children: [],
        }
      })
    })
  })

  return tree
}

// ─── Node types registration ─────────────────────────────────────
const nodeTypes = {
  customNode: CustomNode,
}

// ─── Main Component ──────────────────────────────────────────────
interface ProductFlowChartProps {
  flows: ProductFlow[]
}

export default function ProductFlowChart({ flows }: ProductFlowChartProps) {
  const treeStructure = useMemo(() => buildTreeStructure(flows), [flows])

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["root"]))
  const [activePath, setActivePath] = useState<string[]>(["root"])

  const getParentId = useCallback(
    (nodeId: string): string | undefined => {
      for (const [parentId, parentData] of Object.entries(treeStructure)) {
        if (parentData.children.includes(nodeId)) {
          return parentId
        }
      }
      return undefined
    },
    [treeStructure],
  )

  const getAllDescendants = useCallback(
    (nodeId: string): string[] => {
      const descendants: string[] = []
      const nodeData = treeStructure[nodeId]
      if (nodeData) {
        nodeData.children.forEach((childId) => {
          descendants.push(childId)
          descendants.push(...getAllDescendants(childId))
        })
      }
      return descendants
    },
    [treeStructure],
  )

  const getPathToNode = useCallback(
    (nodeId: string): string[] => {
      const path: string[] = []
      let currentId: string | undefined = nodeId
      while (currentId) {
        path.unshift(currentId)
        currentId = getParentId(currentId)
      }
      return path
    },
    [getParentId],
  )

  const getSiblings = useCallback(
    (nodeId: string): string[] => {
      const parentId = getParentId(nodeId)
      if (!parentId) return []
      const parentData = treeStructure[parentId]
      return parentData ? parentData.children.filter((child) => child !== nodeId) : []
    },
    [getParentId, treeStructure],
  )

  const calculateNodePositions = useCallback(() => {
    const positions = new Map<string, { x: number; y: number; level: number }>()
    const levelXPositions = [200, 600, 1000, 1400]

    positions.set("root", { x: levelXPositions[0], y: 400, level: 0 })

    const shouldShowNode = (nodeId: string): boolean => {
      if (nodeId === "root") return true
      if (activePath.includes(nodeId)) return true
      const parentId = getParentId(nodeId)
      return parentId !== undefined && activePath.includes(parentId) && expandedNodes.has(parentId)
    }

    for (let level = 1; level <= 3; level++) {
      const nodesAtLevel: string[] = []

      Object.keys(treeStructure).forEach((nodeId) => {
        if (shouldShowNode(nodeId)) {
          const parentId = getParentId(nodeId)
          if (parentId && positions.has(parentId)) {
            const parentLevel = positions.get(parentId)!.level
            if (parentLevel === level - 1) {
              nodesAtLevel.push(nodeId)
            }
          }
        }
      })

      const nodesByParent = new Map<string, string[]>()
      nodesAtLevel.forEach((nodeId) => {
        const parentId = getParentId(nodeId)!
        if (!nodesByParent.has(parentId)) {
          nodesByParent.set(parentId, [])
        }
        nodesByParent.get(parentId)!.push(nodeId)
      })

      nodesByParent.forEach((children, parentId) => {
        const parentPos = positions.get(parentId)
        if (!parentPos) return

        const childCount = children.length
        const parentY = parentPos.y
        const startY = parentY - (childCount - 1) * 75

        children.forEach((childId, index) => {
          positions.set(childId, {
            x: levelXPositions[level],
            y: startY + index * 150,
            level,
          })
        })
      })
    }

    return positions
  }, [expandedNodes, activePath, getParentId, treeStructure])

  const initialNodes = useMemo(() => {
    const nodes: Node[] = []
    const positions = calculateNodePositions()

    positions.forEach((position, nodeId) => {
      const nodeData = treeStructure[nodeId]
      if (!nodeData) return

      const isExpanded = expandedNodes.has(nodeId)
      const hasChildren = nodeData.children.length > 0

      nodes.push({
        id: nodeId,
        type: "customNode",
        position: { x: position.x, y: position.y },
        data: {
          name: nodeData.name,
          description: nodeData.description,
          level: position.level,
          hasChildren,
          isExpanded,
          parentId: getParentId(nodeId),
          nodeType: nodeData.nodeType,
          value: nodeData.value,
        },
        draggable: true,
      })
    })

    return nodes
  }, [expandedNodes, activePath, calculateNodePositions, getParentId, treeStructure])

  const initialEdges = useMemo(() => {
    const edges: Edge[] = []

    initialNodes.forEach((node) => {
      const parentId = node.data.parentId as string | undefined
      if (parentId && expandedNodes.has(parentId)) {
        edges.push({
          id: `${parentId}-${node.id}`,
          source: parentId,
          target: node.id,
          style: {
            stroke: "#9ca3af",
            strokeWidth: 2,
            strokeDasharray: "5,5",
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#9ca3af",
          },
          animated: true,
        })
      }
    })

    return edges
  }, [initialNodes, expandedNodes])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  useEffect(() => {
    setNodes(initialNodes)
    setEdges(initialEdges)
  }, [initialNodes, initialEdges, setNodes, setEdges])

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const hasChildren = (node.data as any).hasChildren
      if (!hasChildren) return

      const newExpanded = new Set(expandedNodes)

      if (node.id === "root") {
        if (newExpanded.has("root")) {
          newExpanded.clear()
          setActivePath(["root"])
        } else {
          newExpanded.add("root")
          setActivePath(["root"])
        }
      } else {
        const nodePathToRoot = getPathToNode(node.id)

        if (newExpanded.has(node.id)) {
          newExpanded.delete(node.id)
          getAllDescendants(node.id).forEach((desc) => newExpanded.delete(desc))
          const parentPath = nodePathToRoot.slice(0, -1)
          setActivePath(parentPath)
        } else {
          newExpanded.add(node.id)
          const siblings = getSiblings(node.id)
          siblings.forEach((siblingId) => {
            getAllDescendants(siblingId).forEach((desc) => newExpanded.delete(desc))
          })
          setActivePath(nodePathToRoot)
        }
      }

      setExpandedNodes(newExpanded)
    },
    [expandedNodes, getPathToNode, getAllDescendants, getSiblings],
  )

  const resetView = useCallback(() => {
    setExpandedNodes(new Set(["root"]))
    setActivePath(["root"])
  }, [])

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  // Build readable path label
  const pathLabel = activePath
    .map((id) => treeStructure[id]?.name || id)
    .join(" → ")

  return (
    <div className="w-full h-full bg-gray-50 font-sans">
      <div className="absolute bottom-4 right-4 z-10 flex gap-4">
        <Button
          onClick={resetView}
          variant="default"
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg px-6 py-2 rounded-full text-sm"
        >
          Reset View
        </Button>
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-sm text-gray-700 border font-sans">
          {pathLabel}
        </div>
      </div>

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
        minZoom={0.2}
        maxZoom={1.2}
        defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
      >
        <Controls />
        <Background color="#f8fafc" gap={20} />
      </ReactFlow>
    </div>
  )
}
