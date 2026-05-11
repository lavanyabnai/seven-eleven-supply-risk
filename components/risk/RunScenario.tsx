"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"
import {
  Loader2,
  PlayIcon,
} from "lucide-react"

import { useGetNetScenarios } from "@/features/net_scenario/api/use-get-net_scenarios"
import { useCreateNetScenario } from "@/features/net_scenario/api/use-create-net_scenario"
import { useBulkDeleteNetScenarios } from "@/features/net_scenario/api/use-bulk-delete-net_scenarios"
import { columns } from "./columns"
import { EditNetScenarioSheet } from "@/features/net_scenario/components/edit-net_scenario-sheet"
import { NewNetScenarioSheet } from "@/features/net_scenario/components/new-net_scenario-sheet"

type ExperimentType = "simulation" | "variation" | "comparison" | "safety-stock" | "risk"

export default function RunScenario() {
  // Resizable sidebar state
  const [sidebarWidth, setSidebarWidth] = useState(380)
  const [isResizing, setIsResizing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Form states
  const [experimentType, setExperimentType] = useState<ExperimentType>("simulation")
  const [status, setStatus] = useState<"stopped" | "running" | "paused" | "completed">("stopped")

  // Scenario name & description
  const [scenarioName, setScenarioName] = useState("")
  const [scenarioDescription, setScenarioDescription] = useState("")

  // Ignore straight routes
  const [ignoreStraightRoutes, setIgnoreStraightRoutes] = useState(false)

  // Demand & search settings
  const [demandVariationType, setDemandVariationType] = useState("exact")
  const [searchType, setSearchType] = useState("find-n-best")
  const [bestSolutions, setBestSolutions] = useState(1)
  const [timeLimitSec, setTimeLimitSec] = useState(600)
  const [mipGap, setMipGap] = useState("0.000001")
  const [problemType, setProblemType] = useState("big-m")

  // Common unit settings
  const [financeUnit, setFinanceUnit] = useState("USD")
  const [productUnit, setProductUnit] = useState("m3")
  const [timeUnit, setTimeUnit] = useState("day")
  const [distanceUnit, setDistanceUnit] = useState("km")

  // Simulation experiment settings
  const [repetitionsPerIteration, setRepetitionsPerIteration] = useState(10)
  const [numberOfThreads, setNumberOfThreads] = useState(5)
  const [targetServiceLevel, setTargetServiceLevel] = useState(95)
  const [serviceLevelByProducts, setServiceLevelByProducts] = useState("all")
  const [failureServiceLevel, setFailureServiceLevel] = useState(95)
  const [recoveryServiceLevel, setRecoveryServiceLevel] = useState(97)

  // Comparison experiment settings
  const [includeBaseline, setIncludeBaseline] = useState(true)
  const [includeOptimized, setIncludeOptimized] = useState(true)
  const [metricServiceLevel, setMetricServiceLevel] = useState(true)
  const [metricTotalCost, setMetricTotalCost] = useState(true)
  const [metricInventoryLevels, setMetricInventoryLevels] = useState(true)
  const [metricLeadTime, setMetricLeadTime] = useState(true)

  // Risk experiment settings
  const [numberOfSimulations, setNumberOfSimulations] = useState(1000)
  const [confidenceLevel, setConfidenceLevel] = useState(95)
  const [demandUncertainty, setDemandUncertainty] = useState(true)
  const [supplyDisruptions, setSupplyDisruptions] = useState(true)
  const [leadTimeVariability, setLeadTimeVariability] = useState(true)
  const [priceFluctuations, setPriceFluctuations] = useState(false)
  const [disruptionSeverity, setDisruptionSeverity] = useState(50)
  const [mitigationStrategy, setMitigationStrategy] = useState("buffer")

  // Safety Stock experiment settings
  const [serviceLevelTarget, setServiceLevelTarget] = useState(95)
  const [leadTimeVariabilityPercent, setLeadTimeVariabilityPercent] = useState(20)
  const [calculationMethod, setCalculationMethod] = useState("normal")
  const [demandVariability, setDemandVariability] = useState(0.3)
  const [reviewPeriod, setReviewPeriod] = useState("weekly")

  // Variation experiment settings
  const [numberOfVariations, setNumberOfVariations] = useState(3)
  const [variationStepSize, setVariationStepSize] = useState(5)
  const [variationParameter, setVariationParameter] = useState("service-level")
  const [parameterRangeMin, setParameterRangeMin] = useState(80)
  const [parameterRangeMax, setParameterRangeMax] = useState(99)

  const minSidebarWidth = 320
  const maxSidebarWidth = 500

  const scenariosQuery = useGetNetScenarios()
  const createScenarioMutation = useCreateNetScenario()
  const deleteScenarios = useBulkDeleteNetScenarios()

  const scenarios = scenariosQuery.data || []
  const isDisabled = scenariosQuery.isLoading || deleteScenarios.isPending

  const experimentLabels: Record<ExperimentType, string> = {
    simulation: "Simulation experiment",
    variation: "Variation experiment",
    comparison: "Comparison experiment",
    "safety-stock": "Safety Stock experiment",
    risk: "Risk experiment",
  }

  // Define which common fields are visible per experiment type
  const fieldVisibility: Record<ExperimentType, {
    ignoreRoutes: boolean
    demandVariation: boolean
    searchType: boolean
    bestSolutions: boolean
    timeLimit: boolean
    mipGap: boolean
    threads: boolean
    problemType: boolean
    unitType: boolean
    distanceUnit: boolean
    currency: boolean
  }> = {
    simulation: {
      ignoreRoutes: true,
      demandVariation: true,
      searchType: false,
      bestSolutions: false,
      timeLimit: true,
      mipGap: false,
      threads: false, // already in simulation settings section
      problemType: false,
      unitType: true,
      distanceUnit: true,
      currency: true,
    },
    variation: {
      ignoreRoutes: false,
      demandVariation: true,
      searchType: true,
      bestSolutions: true,
      timeLimit: true,
      mipGap: true,
      threads: true,
      problemType: true,
      unitType: true,
      distanceUnit: true,
      currency: true,
    },
    comparison: {
      ignoreRoutes: false,
      demandVariation: false,
      searchType: false,
      bestSolutions: false,
      timeLimit: true,
      mipGap: false,
      threads: true,
      problemType: false,
      unitType: true,
      distanceUnit: true,
      currency: true,
    },
    "safety-stock": {
      ignoreRoutes: false,
      demandVariation: true,
      searchType: false,
      bestSolutions: false,
      timeLimit: false,
      mipGap: false,
      threads: false,
      problemType: false,
      unitType: true,
      distanceUnit: false,
      currency: true,
    },
    risk: {
      ignoreRoutes: true,
      demandVariation: true,
      searchType: false,
      bestSolutions: false,
      timeLimit: true,
      mipGap: false,
      threads: true,
      problemType: false,
      unitType: true,
      distanceUnit: true,
      currency: true,
    },
  }

  const visibleFields = fieldVisibility[experimentType]

  const handleCreateScenario = () => {
    const netId = `SIM-${scenarios.length + 1}`

    const metadata: Record<string, any> = {}

    switch (experimentType) {
      case "simulation":
        metadata.repetitionsPerIteration = repetitionsPerIteration
        metadata.targetServiceLevel = targetServiceLevel
        metadata.serviceLevelByProducts = serviceLevelByProducts
        metadata.failureServiceLevel = failureServiceLevel
        metadata.recoveryServiceLevel = recoveryServiceLevel
        break
      case "comparison":
        metadata.includeBaseline = includeBaseline
        metadata.includeOptimized = includeOptimized
        metadata.metricServiceLevel = metricServiceLevel
        metadata.metricTotalCost = metricTotalCost
        metadata.metricInventoryLevels = metricInventoryLevels
        metadata.metricLeadTime = metricLeadTime
        metadata.targetServiceLevel = targetServiceLevel
        break
      case "risk":
        metadata.numberOfSimulations = numberOfSimulations
        metadata.confidenceLevel = confidenceLevel
        metadata.demandUncertainty = demandUncertainty
        metadata.supplyDisruptions = supplyDisruptions
        metadata.leadTimeVariability = leadTimeVariability
        metadata.priceFluctuations = priceFluctuations
        metadata.disruptionSeverity = disruptionSeverity
        metadata.mitigationStrategy = mitigationStrategy
        break
      case "safety-stock":
        metadata.serviceLevelTarget = serviceLevelTarget
        metadata.leadTimeVariabilityPercent = leadTimeVariabilityPercent
        metadata.calculationMethod = calculationMethod
        metadata.demandVariability = demandVariability
        metadata.reviewPeriod = reviewPeriod
        break
      case "variation":
        metadata.numberOfVariations = numberOfVariations
        metadata.variationStepSize = variationStepSize
        metadata.variationParameter = variationParameter
        metadata.parameterRangeMin = parameterRangeMin
        metadata.parameterRangeMax = parameterRangeMax
        break
    }

    metadata.ignoreStraightRoutes = ignoreStraightRoutes
    metadata.demandVariationType = demandVariationType
    metadata.searchType = searchType
    metadata.bestSolutions = bestSolutions
    metadata.timeLimitSec = timeLimitSec
    metadata.mipGap = mipGap
    metadata.problemType = problemType

    const scenarioData = {
      netId: scenarioName || netId,
      description: scenarioDescription || `${experimentLabels[experimentType]}`,
      scenarioType: experimentType,
      status: status === "stopped" ? "Not Started" : status,
      currency: financeUnit,
      unitType: productUnit,
      distanceType: distanceUnit,
      threads: numberOfThreads,
      metadata: JSON.stringify(metadata),
    }

    createScenarioMutation.mutate(scenarioData as any, {
      onSuccess: () => {
        setStatus("stopped")
        toast.success("Scenario created successfully")
      },
      onError: () => {
        toast.error("Failed to create scenario")
      }
    })
  }

  // Resize handlers
  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  useEffect(() => {
    const handleResize = (e: MouseEvent) => {
      if (!isResizing) return
      const containerRect = containerRef.current?.getBoundingClientRect()
      if (!containerRect) return
      let newWidth = e.clientX - containerRect.left
      newWidth = Math.max(minSidebarWidth, Math.min(newWidth, maxSidebarWidth))
      setSidebarWidth(newWidth)
    }
    const stopResizing = () => setIsResizing(false)

    if (isResizing) {
      window.addEventListener("mousemove", handleResize)
      window.addEventListener("mouseup", stopResizing)
    }
    return () => {
      window.removeEventListener("mousemove", handleResize)
      window.removeEventListener("mouseup", stopResizing)
    }
  }, [isResizing])

  const renderExperimentSettings = () => {
    const labelClass = "text-xs font-semibold text-gray-600 font-sans block mb-1"
    const inputClass = "h-8 text-sm font-sans bg-white border-gray-200"
    const selectClass = "h-8 text-sm font-sans bg-white border-gray-200"
    const sectionTitle = (title: string) => (
      <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider font-sans">{title}</h3>
    )

    switch (experimentType) {
      case "simulation":
        return (
          <div className="space-y-3 border-t border-gray-100 pt-3">
            {sectionTitle("Simulation settings")}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Repetitions</label>
                <Input type="number" value={repetitionsPerIteration} onChange={(e) => setRepetitionsPerIteration(parseInt(e.target.value) || 10)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Threads</label>
                <Input type="number" value={numberOfThreads} onChange={(e) => setNumberOfThreads(parseInt(e.target.value) || 5)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Target service level</label>
                <Input type="number" value={targetServiceLevel} onChange={(e) => setTargetServiceLevel(parseInt(e.target.value) || 95)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Service level by</label>
                <Select value={serviceLevelByProducts} onValueChange={setServiceLevelByProducts}>
                  <SelectTrigger className={selectClass}><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="category">By Category</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className={labelClass}>Failure SL, %</label>
                <Input type="number" value={failureServiceLevel} onChange={(e) => setFailureServiceLevel(parseInt(e.target.value) || 95)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Recovery SL, %</label>
                <Input type="number" value={recoveryServiceLevel} onChange={(e) => setRecoveryServiceLevel(parseInt(e.target.value) || 97)} className={inputClass} />
              </div>
            </div>
          </div>
        )
      case "comparison":
        return (
          <div className="space-y-3 border-t border-gray-100 pt-3">
            {sectionTitle("Comparison settings")}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="baseline" checked={includeBaseline} onCheckedChange={(c) => setIncludeBaseline(c as boolean)} />
                <label htmlFor="baseline" className="text-sm text-gray-700 font-sans">Include baseline</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="optimized" checked={includeOptimized} onCheckedChange={(c) => setIncludeOptimized(c as boolean)} />
                <label htmlFor="optimized" className="text-sm text-gray-700 font-sans">Include optimized</label>
              </div>
            </div>
            <div>
              <label className={labelClass}>Metrics</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "sl", label: "Service Level", checked: metricServiceLevel, set: setMetricServiceLevel },
                  { id: "tc", label: "Total Cost", checked: metricTotalCost, set: setMetricTotalCost },
                  { id: "il", label: "Inventory Levels", checked: metricInventoryLevels, set: setMetricInventoryLevels },
                  { id: "lt", label: "Lead Time", checked: metricLeadTime, set: setMetricLeadTime },
                ].map((m) => (
                  <div key={m.id} className="flex items-center space-x-2">
                    <Checkbox id={m.id} checked={m.checked} onCheckedChange={(c) => m.set(c as boolean)} />
                    <label htmlFor={m.id} className="text-sm text-gray-700 font-sans">{m.label}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass}>Target service level</label>
              <Input type="number" value={targetServiceLevel} onChange={(e) => setTargetServiceLevel(parseInt(e.target.value) || 95)} className={inputClass} />
            </div>
          </div>
        )
      case "risk":
        return (
          <div className="space-y-3 border-t border-gray-100 pt-3">
            {sectionTitle("Risk Analysis settings")}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Simulations</label>
                <Input type="number" value={numberOfSimulations} onChange={(e) => setNumberOfSimulations(parseInt(e.target.value) || 1000)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Confidence (%)</label>
                <Input type="number" value={confidenceLevel} onChange={(e) => setConfidenceLevel(parseInt(e.target.value) || 95)} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Risk factors</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "demand", label: "Demand Uncertainty", checked: demandUncertainty, set: setDemandUncertainty },
                  { id: "supply", label: "Supply Disruptions", checked: supplyDisruptions, set: setSupplyDisruptions },
                  { id: "ltv", label: "Lead Time Var.", checked: leadTimeVariability, set: setLeadTimeVariability },
                  { id: "price", label: "Price Fluctuations", checked: priceFluctuations, set: setPriceFluctuations },
                ].map((m) => (
                  <div key={m.id} className="flex items-center space-x-2">
                    <Checkbox id={m.id} checked={m.checked} onCheckedChange={(c) => m.set(c as boolean)} />
                    <label htmlFor={m.id} className="text-sm text-gray-700 font-sans">{m.label}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-semibold text-gray-600 font-sans">Disruption severity</label>
                <span className="text-xs font-medium text-gray-700">{disruptionSeverity}%</span>
              </div>
              <Slider value={[disruptionSeverity]} onValueChange={(v) => setDisruptionSeverity(v[0])} max={100} step={1} />
            </div>
            <div>
              <label className={labelClass}>Mitigation strategy</label>
              <Select value={mitigationStrategy} onValueChange={setMitigationStrategy}>
                <SelectTrigger className={selectClass}><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="buffer">Safety Stock Buffers</SelectItem>
                  <SelectItem value="suppliers">Multiple Suppliers</SelectItem>
                  <SelectItem value="capacity">Flexible Capacity</SelectItem>
                  <SelectItem value="none">No Mitigation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case "safety-stock":
        return (
          <div className="space-y-3 border-t border-gray-100 pt-3">
            {sectionTitle("Safety Stock settings")}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Service level target</label>
                <Input type="number" value={serviceLevelTarget} onChange={(e) => setServiceLevelTarget(parseInt(e.target.value) || 95)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Lead time var. (%)</label>
                <Input type="number" value={leadTimeVariabilityPercent} onChange={(e) => setLeadTimeVariabilityPercent(parseInt(e.target.value) || 20)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Calculation method</label>
                <Select value={calculationMethod} onValueChange={setCalculationMethod}>
                  <SelectTrigger className={selectClass}><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal Distribution</SelectItem>
                    <SelectItem value="poisson">Poisson Distribution</SelectItem>
                    <SelectItem value="empirical">Empirical Method</SelectItem>
                    <SelectItem value="fixed">Fixed Days Supply</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className={labelClass}>Review period</label>
                <Select value={reviewPeriod} onValueChange={setReviewPeriod}>
                  <SelectTrigger className={selectClass}><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-semibold text-gray-600 font-sans">Demand variability</label>
                <span className="text-xs font-medium text-gray-700">{demandVariability}</span>
              </div>
              <Slider value={[demandVariability * 100]} onValueChange={(v) => setDemandVariability(v[0] / 100)} max={100} step={1} />
            </div>
          </div>
        )
      case "variation":
        return (
          <div className="space-y-3 border-t border-gray-100 pt-3">
            {sectionTitle("Variation settings")}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Number of variations</label>
                <Input type="number" value={numberOfVariations} onChange={(e) => setNumberOfVariations(parseInt(e.target.value) || 3)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Step size</label>
                <Input type="number" value={variationStepSize} onChange={(e) => setVariationStepSize(parseInt(e.target.value) || 5)} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Variation parameter</label>
              <Select value={variationParameter} onValueChange={setVariationParameter}>
                <SelectTrigger className={selectClass}><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="service-level">Service Level</SelectItem>
                  <SelectItem value="lead-time">Lead Time</SelectItem>
                  <SelectItem value="demand">Demand</SelectItem>
                  <SelectItem value="cost">Cost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs font-semibold text-gray-600 font-sans">Min value</label>
                  <span className="text-xs font-medium text-gray-700">{parameterRangeMin}%</span>
                </div>
                <Slider value={[parameterRangeMin]} onValueChange={(v) => setParameterRangeMin(v[0])} max={100} step={1} />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs font-semibold text-gray-600 font-sans">Max value</label>
                  <span className="text-xs font-medium text-gray-700">{parameterRangeMax}%</span>
                </div>
                <Slider value={[parameterRangeMax]} onValueChange={(v) => setParameterRangeMax(v[0])} max={100} step={1} />
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (scenariosQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="size-6 text-slate-300 animate-spin" />
      </div>
    )
  }

  return (
    <>
      <NewNetScenarioSheet />
      <EditNetScenarioSheet />
      <div ref={containerRef} className="flex h-screen bg-white relative font-sans">
        {/* Left panel - Experiment Settings form */}
        <div className="border-r border-gray-200 overflow-y-auto bg-white" style={{ width: `${sidebarWidth}px`, flexShrink: 0 }}>
          <div className="p-5 space-y-3">
            <h2 className="text-base font-semibold text-gray-900 font-sans">Experiment settings</h2>

            {/* Scenario Name + Description in 2 cols */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 font-sans block mb-1">Scenario Name</label>
                <Input
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  placeholder="Enter scenario name"
                  className="h-8 text-sm font-sans bg-white border-gray-200"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 font-sans block mb-1">Description</label>
                <Input
                  value={scenarioDescription}
                  onChange={(e) => setScenarioDescription(e.target.value)}
                  placeholder="Optional"
                  className="h-8 text-sm font-sans bg-white border-gray-200"
                />
              </div>
            </div>

            {/* Scenario Type */}
            <div>
              <label className="text-xs font-semibold text-gray-600 font-sans block mb-1">Scenario Type</label>
              <Select value={experimentType} onValueChange={(value) => setExperimentType(value as ExperimentType)}>
                <SelectTrigger className="w-full h-8 text-sm font-sans bg-white border-gray-200">
                  <SelectValue placeholder="Select experiment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simulation">Simulation Experiment</SelectItem>
                  <SelectItem value="variation">Variation Experiment</SelectItem>
                  <SelectItem value="comparison">Comparison Experiment</SelectItem>
                  <SelectItem value="safety-stock">Safety Stock Experiment</SelectItem>
                  <SelectItem value="risk">Risk Experiment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dynamic experiment-specific settings */}
            {renderExperimentSettings()}

            {/* Common fields section - single grid so fields flow and pair naturally */}
            {(visibleFields.ignoreRoutes || visibleFields.demandVariation || visibleFields.searchType || visibleFields.bestSolutions || visibleFields.timeLimit || visibleFields.mipGap || visibleFields.threads || visibleFields.problemType || visibleFields.unitType || visibleFields.distanceUnit || visibleFields.currency) && (
              <div className="border-t border-gray-100 pt-3 space-y-3">
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider font-sans">General settings</h3>

                {visibleFields.ignoreRoutes && (
                  <div className="flex items-center gap-2">
                    <Switch checked={ignoreStraightRoutes} onCheckedChange={setIgnoreStraightRoutes} />
                    <label className="text-sm text-gray-700 font-sans">Ignore straight routes</label>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {visibleFields.demandVariation && (
                    <div>
                      <label className="text-xs font-semibold text-gray-600 font-sans block mb-1">Demand variation</label>
                      <Select value={demandVariationType} onValueChange={setDemandVariationType}>
                        <SelectTrigger className="h-8 text-sm font-sans bg-white border-gray-200"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="exact">Exact demand</SelectItem>
                          <SelectItem value="normal">Normal dist.</SelectItem>
                          <SelectItem value="uniform">Uniform dist.</SelectItem>
                          <SelectItem value="poisson">Poisson dist.</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {visibleFields.searchType && (
                    <div>
                      <label className="text-xs font-semibold text-gray-600 font-sans block mb-1">Search type</label>
                      <Select value={searchType} onValueChange={setSearchType}>
                        <SelectTrigger className="h-8 text-sm font-sans bg-white border-gray-200"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="find-n-best">Find N best</SelectItem>
                          <SelectItem value="first-n">First N feasible</SelectItem>
                          <SelectItem value="random-n">Random N</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {visibleFields.bestSolutions && (
                    <div>
                      <label className="text-xs font-semibold text-gray-600 font-sans block mb-1">Best solutions</label>
                      <Input type="number" value={bestSolutions} onChange={(e) => setBestSolutions(parseInt(e.target.value) || 1)} className="h-8 text-sm font-sans bg-white border-gray-200" />
                    </div>
                  )}
                  {visibleFields.timeLimit && (
                    <div>
                      <label className="text-xs font-semibold text-gray-600 font-sans block mb-1">Time limit, sec</label>
                      <Input type="number" value={timeLimitSec} onChange={(e) => setTimeLimitSec(parseInt(e.target.value) || 600)} className="h-8 text-sm font-sans bg-white border-gray-200" />
                    </div>
                  )}
                  {visibleFields.mipGap && (
                    <div>
                      <label className="text-xs font-semibold text-gray-600 font-sans block mb-1">MIP gap</label>
                      <Input value={mipGap} onChange={(e) => setMipGap(e.target.value)} className="h-8 text-sm font-sans bg-white border-gray-200" />
                    </div>
                  )}
                  {visibleFields.threads && (
                    <div>
                      <label className="text-xs font-semibold text-gray-600 font-sans block mb-1">Threads</label>
                      <Select value={String(numberOfThreads)} onValueChange={(v) => setNumberOfThreads(parseInt(v))}>
                        <SelectTrigger className="h-8 text-sm font-sans bg-white border-gray-200"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {visibleFields.problemType && (
                    <div>
                      <label className="text-xs font-semibold text-gray-600 font-sans block mb-1">Problem type</label>
                      <Select value={problemType} onValueChange={setProblemType}>
                        <SelectTrigger className="h-8 text-sm font-sans bg-white border-gray-200"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="big-m">Use Big M</SelectItem>
                          <SelectItem value="indicator">Use Indicator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {visibleFields.unitType && (
                    <div>
                      <label className="text-xs font-semibold text-gray-600 font-sans block mb-1">Unit type</label>
                      <Select value={productUnit} onValueChange={setProductUnit}>
                        <SelectTrigger className="h-8 text-sm font-sans bg-white border-gray-200"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="m3">m³</SelectItem>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="pcs">pcs</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {visibleFields.distanceUnit && (
                    <div>
                      <label className="text-xs font-semibold text-gray-600 font-sans block mb-1">Distance unit</label>
                      <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                        <SelectTrigger className="h-8 text-sm font-sans bg-white border-gray-200"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="km">km</SelectItem>
                          <SelectItem value="mile">mile</SelectItem>
                          <SelectItem value="m">m</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {visibleFields.currency && (
                    <div>
                      <label className="text-xs font-semibold text-gray-600 font-sans block mb-1">Currency</label>
                      <Select value={financeUnit} onValueChange={setFinanceUnit}>
                        <SelectTrigger className="h-8 text-sm font-sans bg-white border-gray-200"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Create Scenario button */}
            <Button
              onClick={handleCreateScenario}
              disabled={createScenarioMutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 h-8 text-xs font-semibold font-sans"
            >
              {createScenarioMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <PlayIcon className="h-4 w-4 mr-2" />
              )}
              {createScenarioMutation.isPending ? "Creating..." : "Create Scenario"}
            </Button>
          </div>
        </div>

        {/* Resizer handle */}
        <div
          className={`absolute h-full w-1 bg-transparent hover:bg-blue-200 cursor-col-resize z-10 ${isResizing ? "bg-blue-200" : ""}`}
          style={{ left: `${sidebarWidth}px` }}
          onMouseDown={startResizing}
        />

        {/* Main content with DataTable */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-auto">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <PlayIcon className="h-4 w-4 text-gray-500" />
                  <h2 className="text-base font-semibold text-gray-900 font-sans">Simulation Table</h2>
                </div>
              </div>
              <DataTable
                placeHolder="Filter scenarios..."
                filterKey="netId"
                columns={columns}
                data={scenarios}
                onDelete={(row) => {
                  const ids = row.map((r) => r.original.id)
                  deleteScenarios.mutate({ ids })
                }}
                disabled={isDisabled}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
