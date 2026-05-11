"use client"

import { useState } from "react"

import ScenarioHeader from "@/components/risk/resultsDashboard/scenario-header"
import TestRunDashboard from "@/components/risk/resultsDashboard/simDashboard/test-run-dashboard"
import VariationDashboard from "@/components/risk/resultsDashboard/simDashboard/variation-dashboard"
import RiskDashboard from "@/components/risk/resultsDashboard/simDashboard/risk-dashboard"
import SimulationExperiment from "@/components/risk/resultsDashboard/simDashboard/simulation-experiment"
import ComparisonDashboard from "@/components/risk/resultsDashboard/simDashboard/comparison-dashboard"
import SafetyStockDashboard from "@/components/risk/resultsDashboard/simDashboard/safety-stock-dashboard"

export default function Home() {
  const [selectedScenario, setSelectedScenario] = useState("SIM-1 - Simulation Experiment")

  const handleScenarioChange = (scenario: string) => {
    setSelectedScenario(scenario)
    console.log("Scenario changed to:", scenario) // Debug log
  }

  // Helper function to determine which dashboard to show
  const getDashboardComponent = () => {
    const scenarioType = selectedScenario.split(" - ")[1]?.toLowerCase()
    const scenarioId = selectedScenario.split(" - ")[0]?.toLowerCase()

    console.log("Scenario type:", scenarioType) // Debug log

    if (scenarioType?.includes("simulation")) {
      return <SimulationExperiment />
    } else if (scenarioType?.includes("variation")) {
      return <VariationDashboard />
    } else if (scenarioType?.includes("risk") || scenarioId === "sim-10") {
      return <RiskDashboard />
    } else if (scenarioType?.includes("test")) {
      return <TestRunDashboard />
    } else if (scenarioType?.includes("comparison") || scenarioId === "sim-10") {
      return <ComparisonDashboard />
    } else if (scenarioType?.includes("safety")) {
      return <SafetyStockDashboard />
    }

    // Default to Test Run Dashboard
    return <TestRunDashboard />
  }

  return (
 

        <main className="flex-1 overflow-auto">
          <ScenarioHeader selectedScenario={selectedScenario} onScenarioChange={handleScenarioChange} />

          <div className="h-full">{getDashboardComponent()}</div>
        </main>
  )
}
