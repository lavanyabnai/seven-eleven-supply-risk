"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight, PlayIcon, PauseIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Import experiment settings components
import { SimulationExperimentSettings } from "@/components/risk/runScenrio/experiment-settings/simulation-experiment"
import { VariationExperimentSettings } from "@/components/risk/runScenrio/experiment-settings/variation-experiment"
import { ComparisonExperimentSettings } from "@/components/risk/runScenrio/experiment-settings/comparison-experiment"
import { SafetyStockExperimentSettings } from "@/components/risk/runScenrio/experiment-settings/safety-stock-experiment"
import { RiskExperimentSettings } from "@/components/risk/runScenrio/experiment-settings/risk-experiment"
import SimulationCard from "@/components/risk/runScenrio/simulation-experiment"
// Define experiment types
type ExperimentType = "simulation" | "variation" | "comparison" | "safety-stock" | "risk"

export default function RunScenario() {
  // Resizable sidebar state
  const [sidebarWidth, setSidebarWidth] = useState(420)
  const [isResizing, setIsResizing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Experiment type state
  const [experimentType, setExperimentType] = useState<ExperimentType>("simulation")

  // Min and max widths for the sidebar
  const minSidebarWidth = 290
  const maxSidebarWidth = 500
  const [isOptimizing, setIsOptimizing] = useState(false)

 
  const handleOptimize = () => {
    setIsOptimizing(true)
    // In a real application, this would call an optimization service
    setTimeout(() => {
      // Simulate optimization results - in a real app this would come from a solver
      setIsOptimizing(false)
    }, 2000)
  }


  // Handle mouse down on the resizer
  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  // Handle mouse move to resize
  useEffect(() => {
    const handleResize = (e: MouseEvent) => {
      if (!isResizing) return

      const containerRect = containerRef.current?.getBoundingClientRect()
      if (!containerRect) return

      // Calculate new width based on mouse position
      let newWidth = e.clientX - containerRect.left

      // Enforce min and max constraints
      newWidth = Math.max(minSidebarWidth, Math.min(newWidth, maxSidebarWidth))

      // Update sidebar width
      setSidebarWidth(newWidth)
    }

    const stopResizing = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      window.addEventListener("mousemove", handleResize)
      window.addEventListener("mouseup", stopResizing)
    }

    return () => {
      window.removeEventListener("mousemove", handleResize)
      window.removeEventListener("mouseup", stopResizing)
    }
  }, [isResizing])

  // Sample simulation data
  const simulationData = [
    {
      id: "SIM-1",
      description: "Risk Experiment",
      created: "February 28, 2024 04:30:00 PM",
      finished: "February 28, 2024 05:30:00 PM",
      status: "Not Started",
      progress: "Initialized",
      scenarioType: "Risk Experiment",
      buttonText: "Run",
    },
    {
      id: "SIM-2",
      description: "Simulation Experiment",
      created: "February 28, 2024 03:00:00 PM",
      finished: "February 28, 2024 04:15:00 PM",
      status: "Not Started",
      progress: "Initialized",
      scenarioType: "Simulation Experiment",
      buttonText: "Run",
    },
    {
      id: "SIM-3",
      description: "Safety Stock Experiment",
      created: "February 25, 2024 09:00:00 AM",
      finished: "February 25, 2024 10:30:00 AM",
      status: "Not Started",
      progress: "Initialized",
      scenarioType: "Safety Stock Experiment",
      buttonText: "Run",
    },
    {
      id: "SIM-4",
      description: "Variation Experiment",
      created: "February 27, 2024 02:00:00 PM",
      finished: "February 27, 2024 03:30:00 PM",
      status: "Not Started",
      progress: "Initialized",
      scenarioType: "Variation Experiment",
      buttonText: "Run",
    },
    {
      id: "SIM-5",
      description: "Comparison Experiment",
      created: "February 26, 2024 11:00:00 AM",
      finished: "February 26, 2024 12:30:00 PM",
      status: "Not Started",
      progress: "Initialized",
      scenarioType: "Comparison Experiment",
      buttonText: "Run",
    },
    {
      id: "SIM-6",
      description: "Variation Experiment",
      created: "February 27, 2024 01:00:00 PM",
      finished: "February 27, 2024 02:30:00 PM",
      status: "Not Started",
      progress: "Initialized",
      scenarioType: "Variation Experiment",
      buttonText: "Run",
    },
   
    {
      id: "SIM-7",
      description: "Comparison Experiment",
      created: "February 26, 2024 10:00:00 AM",
      finished: "February 26, 2024 11:30:00 AM",
      status: "Not Started",
      progress: "Initialized",
      scenarioType: "Comparison Experiment",
      buttonText: "Run",
    },
  
    {
        id: "SIM-8",
      description: "Safety Stock Experiment",
      created: "February 25, 2024 08:00:00 AM",
      finished: "February 25, 2024 09:30:00 AM",
      status: "Not Started",
      progress: "Initialized",
      scenarioType: "Safety Stock Experiment",
      buttonText: "Run",
    },
    {
      id: "SIM-9",
      description: "Risk Experiment",
      created: "February 24, 2024 07:00:00 AM",
      finished: "February 24, 2024 08:30:00 AM",
      status: "Not Started",
      progress: "Initialized",
      scenarioType: "Risk Experiment",
      buttonText: "Run",
    },
    {
      id: "SIM-10",
      description: "Risk Experiment",
      created: "February 24, 2024 06:00:00 AM",
      finished: "February 24, 2024 07:30:00 AM",
      status: "Not Started",
      progress: "Initialized",
      scenarioType: "Risk Experiment",
      buttonText: "Run",
    },
  ]

  // Render experiment settings based on selected type
  const renderExperimentSettings = () => {
    switch (experimentType) {
      case "simulation":
        return <SimulationExperimentSettings />
      case "variation":
        return <VariationExperimentSettings />
      case "comparison":
        return <ComparisonExperimentSettings />
      case "safety-stock":
        return <SafetyStockExperimentSettings />
      case "risk":
        return <RiskExperimentSettings />
      default:
        return <SimulationExperimentSettings />
    }
  }

  return (
    <div ref={containerRef} className="flex h-screen bg-background relative">
      {/* Left sidebar with parameters */}
      <div className="border-r overflow-y-auto bg-white" style={{ width: `${sidebarWidth}px`, flexShrink: 0 }}>
        <Card className="border-0 rounded-none h-full">
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-bold">Scenario Parameters</h2>

              {/* Experiment type dropdown */}
              <div>
                <Select value={experimentType} onValueChange={(value) => setExperimentType(value as ExperimentType)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select experiment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Experiment Type</SelectLabel>
                      <SelectItem value="simulation">Simulation Experiment</SelectItem>
                      <SelectItem value="variation">Variation Experiment</SelectItem>
                      <SelectItem value="comparison">Comparison Experiment</SelectItem>
                      <SelectItem value="safety-stock">Safety Stock Experiment</SelectItem>
                      <SelectItem value="risk">Risk Experiment</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dynamic experiment settings */}
            {renderExperimentSettings()}
          <SimulationCard />
            <Button onClick={handleOptimize}  disabled={isOptimizing} className="w-full mt-6 bg-blue-600 hover:bg-blue-700"> 
              {isOptimizing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
              {isOptimizing ? "Creating Scenario..." : "Create Scenario"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Resizer handle */}
      <div
        className={`absolute h-full w-1 bg-transparent hover:bg-primary/20 cursor-col-resize z-10 ${
          isResizing ? "bg-primary/20" : ""
        }`}
        style={{ left: `${sidebarWidth}px` }}
        onMouseDown={startResizing}
      ></div>

      {/* Main content with simulation table */}
      <div className="ml-4 mt-4 flex-1 overflow-hidden flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-xl">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-blue-700">Simulation Table</h2>
          </div>

          {/* Search */}

          <div className="flex gap-2">
           
          
          
          </div>
        </div>

       
         

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left">
                    <Checkbox />
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500">Scenario ID</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500">Description</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500">Scenario Type</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500">Created</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500">Finished</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500">Progress</th>
               
                </tr>
              </thead>
              <tbody>
                {simulationData.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-3">
                      <Checkbox />
                    </td>
                    <td className="p-3 text-sm">{item.id}</td>
                    <td className="p-3 text-sm">{item.description}</td>
                    <td className="p-3 text-sm">{item.scenarioType}</td>
                    <td className="p-3 text-sm">{item.created}</td>
                    <td className="p-3 text-sm">{item.finished}</td>
                    <td className="p-3 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{item.status}</span>
                    </td>
                    <td className="p-3 text-sm">{item.progress}</td>
                 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">Showing 1-10 of {simulationData.length} items</div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Rows per page: 10</span>
              <div className="flex">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-none">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-none">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
      
      </div>
    </div>
  )
}
