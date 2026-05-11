"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
  ConnectionLineType,
  Panel,
  ReactFlowInstance,
} from "reactflow"
import "reactflow/dist/style.css"
import { SimulationNodeSidebar } from "./simulation-node-sidebar"
import { SimulationNode } from "./simulation-node"
import { SimulationToolbar } from "./simulation-toolbar"
import { NodePropertiesPanel } from "./node-properties-panel"

interface NodeProperties {
  arrivalRate?: number
  interArrivalTime?: number
  batchSize?: number
  priority?: number
  capacity?: number
  processingTime?: number
  resourceName?: string
  cost?: number
  transportTime?: number
  distance?: number
  speed?: number
  condition?: string
  trueProbability?: number
  falseProbability?: number
  delayTime?: number
  variability?: number
  delayType?: string
  collectStatistics?: boolean
  throughputTarget?: number
}

interface NodeMethods {
  onArrival?: string
  validation?: string
  onSeize?: string
  onRelease?: string
  onStart?: string
  onComplete?: string
  onEnter?: string
  onExit?: string
}

// Define custom node types
const nodeTypes: NodeTypes = {
  simulationNode: SimulationNode,
}

// Initial nodes for the unloading process
const initialNodes: Node[] = [
  {
    id: "1",
    type: "simulationNode",
    position: { x: 50, y: 80 },
    data: {
      label: "inboundTruckArrival",
      type: "source",
      icon: "Truck",
      properties: {
        arrivalRate: 85,
        interArrivalTime: 12,
        batchSize: 1,
        priority: 1,
      },
      methods: {
        onArrival: "// FTL from Kohler WI, Moen NC, A.O. Smith TN",
        validation: "return entity.type === 'inbound_shipment';",
      },
    },
  },
  {
    id: "2",
    type: "simulationNode",
    position: { x: 250, y: 80 },
    data: {
      label: "seizeReceivingDock",
      type: "resource",
      icon: "Square",
      properties: {
        capacity: 24,
        processingTime: 45,
        resourceName: "ReceivingDock",
        cost: 85,
      },
      methods: {
        onSeize: "// Dock door assigned, PO verification",
        onRelease: "// Dock released for next truck",
      },
    },
  },
  {
    id: "3",
    type: "simulationNode",
    position: { x: 450, y: 80 },
    data: {
      label: "unloadAndInspect",
      type: "process",
      icon: "Cog",
      properties: {
        processingTime: 30,
        capacity: 12,
        cost: 42,
      },
      methods: {
        onStart: "// Scan pallets, match ASN, quality check",
        onComplete: "// Move to putaway staging",
      },
    },
  },
  {
    id: "4",
    type: "simulationNode",
    position: { x: 650, y: 30 },
    data: {
      label: "qualityDecision",
      type: "decision",
      icon: "Diamond",
      properties: {
        condition: "entity.qualityPass === true",
        trueProbability: 0.97,
        falseProbability: 0.03,
      },
      methods: {
        onEnter: "// QC inspection: faucets, water heaters, HVAC",
        onExit: "// Route to putaway or returns",
      },
    },
  },
  {
    id: "5",
    type: "simulationNode",
    position: { x: 850, y: 30 },
    data: {
      label: "putawayToStorage",
      type: "transport",
      icon: "ArrowRight",
      properties: {
        transportTime: 8,
        distance: 200,
        speed: 5,
      },
      methods: {
        onStart: "// Forklift moves pallet to assigned bin",
        onComplete: "// WMS location updated, inventory +1",
      },
    },
  },
  {
    id: "6",
    type: "simulationNode",
    position: { x: 1050, y: 30 },
    data: {
      label: "dcWarehouseStorage",
      type: "storage",
      icon: "Database",
      properties: {
        capacity: 850000,
        processingTime: 0,
        resourceName: "NewportNewsDC",
        cost: 1.25,
      },
      methods: {
        onEnter: "// Stock added: faucets, pipe, water heaters, HVAC",
        onExit: "// Pick triggered by branch order",
      },
    },
  },
  {
    id: "7",
    type: "simulationNode",
    position: { x: 1050, y: 200 },
    data: {
      label: "pickPackShip",
      type: "process",
      icon: "Cog",
      properties: {
        processingTime: 15,
        capacity: 48,
        cost: 28,
      },
      methods: {
        onStart: "// Pick from bin, pack for branch order",
        onComplete: "// Loaded to outbound truck/LTL",
      },
    },
  },
  {
    id: "8",
    type: "simulationNode",
    position: { x: 1250, y: 200 },
    data: {
      label: "outboundToBranch",
      type: "sink",
      icon: "Target",
      properties: {
        collectStatistics: true,
        throughputTarget: 42000,
      },
      methods: {
        onEnter: "// Ship to 1,700+ Ferguson branches",
        onExit: "// Track OTD, fill rate, OTIF",
      },
    },
  },
  {
    id: "9",
    type: "simulationNode",
    position: { x: 850, y: 150 },
    data: {
      label: "returnsProcessing",
      type: "delay",
      icon: "Clock",
      properties: {
        delayTime: 120,
        variability: 0.3,
        delayType: "fixed",
      },
      methods: {
        onEnter: "// QC failed: damage, wrong SKU, defect",
        onExit: "// Return to supplier or dispose",
      },
    },
  },
  {
    id: "10",
    type: "simulationNode",
    position: { x: 650, y: 250 },
    data: {
      label: "kpiMonitor",
      type: "monitor",
      icon: "BarChart3",
      properties: {
        collectStatistics: true,
        throughputTarget: 42000,
      },
      methods: {
        onEnter: "// Track: dock-to-stock time, putaway rate, fill rate",
        onExit: "// Report to Ferguson DC dashboard",
      },
    },
  },
]

// Initial edges - Ferguson DC flow
const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e3-4", source: "3", target: "4", animated: true },
  { id: "e4-5", source: "4", target: "5", animated: true },
  { id: "e4-9", source: "4", target: "9", animated: true },
  { id: "e5-6", source: "5", target: "6", animated: true },
  { id: "e6-7", source: "6", target: "7", animated: true },
  { id: "e7-8", source: "7", target: "8", animated: true },
  { id: "e7-10", source: "7", target: "10", animated: true },
]

export default function SimulationWorkflowBuilder() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(false)

  // Handle connections between nodes
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, type: "smoothstep" }, eds)),
    [setEdges],
  )

  // Handle node selection
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
    setShowPropertiesPanel(true)
  }, [])

  // Handle dropping a new node onto the canvas
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      if (!reactFlowWrapper.current || !reactFlowInstance) return

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const type = event.dataTransfer.getData("application/reactflow/type")
      const label = event.dataTransfer.getData("application/reactflow/label")
      const icon = event.dataTransfer.getData("application/reactflow/icon")

      if (typeof type === "undefined" || !type) {
        return
      }

      const position = (reactFlowInstance as any).project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      // Default properties based on node type
      const defaultProperties = getDefaultProperties(type)
      const defaultMethods = getDefaultMethods(type)

      const newNode = {
        id: `node-${Date.now()}`,
        type: "simulationNode",
        position,
        data: {
          label: label || `New ${type}`,
          type,
          icon,
          properties: defaultProperties,
          methods: defaultMethods,
        },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes],
  )

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  // Update node properties
  const updateNodeProperties = useCallback(
    (nodeId: string, properties: NodeProperties, methods: NodeMethods) => {
      setNodes((nds) =>
        nds.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, properties, methods } } : node)),
      )
    },
    [setNodes],
  )

  return (
    <div className="h-screen w-full flex flex-col">
      <SimulationToolbar />
      <div className="flex flex-1 overflow-hidden">
        <SimulationNodeSidebar />
        <ReactFlowProvider>
          <div className="flex-1 h-full" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onInit={(instance: ReactFlowInstance) => setReactFlowInstance(instance as any)}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              connectionLineType={ConnectionLineType.SmoothStep}
              fitView
              snapToGrid
              snapGrid={[15, 15]}
            >
              <Controls />
              <Background />
              <Panel position="top-right">
                <div className="flex gap-2">
                  <button className="bg-white border rounded px-2 py-1 text-sm">Run Simulation</button>
                  <button className="bg-white border rounded px-2 py-1 text-sm">Statistics</button>
                  <button className="bg-white border rounded px-2 py-1 text-sm">Export Model</button>
                </div>
              </Panel>
            </ReactFlow>
          </div>
        </ReactFlowProvider>
        {showPropertiesPanel && selectedNode && (
          <NodePropertiesPanel
            node={selectedNode}
            onClose={() => setShowPropertiesPanel(false)}
            onUpdate={updateNodeProperties}
          />
        )}
      </div>
    </div>
  )
}

// Helper functions for default properties
function getDefaultProperties(type: string) {
  switch (type) {
    case "source":
      return {
        arrivalRate: 100,
        interArrivalTime: 5,
        batchSize: 1,
        priority: 1,
      }
    case "process":
      return {
        processingTime: 10,
        capacity: 1,
        cost: 10,
        efficiency: 1.0,
      }
    case "resource":
      return {
        capacity: 5,
        processingTime: 15,
        resourceName: "Resource",
        cost: 25,
      }
    case "decision":
      return {
        condition: "entity.priority > 5",
        trueProbability: 0.7,
        falseProbability: 0.3,
      }
    case "delay":
      return {
        delayTime: 5,
        variability: 0.1,
        delayType: "fixed",
      }
    case "sink":
      return {
        collectStatistics: true,
        throughputTarget: 1000,
      }
    default:
      return {}
  }
}

function getDefaultMethods(type: string) {
  switch (type) {
    case "source":
      return {
        onArrival: "console.log('Entity arrived');",
        validation: "return true;",
      }
    case "process":
      return {
        onStart: "entity.startTime = simulation.currentTime;",
        onComplete: "entity.processTime = simulation.currentTime - entity.startTime;",
      }
    case "resource":
      return {
        onSeize: "resource.utilization++;",
        onRelease: "resource.utilization--;",
      }
    default:
      return {
        onEnter: "// Custom logic here",
        onExit: "// Custom logic here",
      }
  }
}
