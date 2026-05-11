"use client"

import { useMemo } from "react"
import { USA_TRANSPORT_PARAMS } from "@/lib/transport-params"

interface USACalculationParams {
  selectedRoute: string
  selectedTruck: string
  selectedContainer: string
  cargoQuantity: number
  annualTrips: number
  utilization: number
  backhaul: number
  driverSalaryTier: "low" | "average" | "high"
  cargoType: string
}

export function useUSATransportCalculations(params: USACalculationParams) {
  return useMemo(() => {
    const route = USA_TRANSPORT_PARAMS.routes[params.selectedRoute as keyof typeof USA_TRANSPORT_PARAMS.routes]
    const truck = USA_TRANSPORT_PARAMS.trucks[params.selectedTruck as keyof typeof USA_TRANSPORT_PARAMS.trucks]
    const container = USA_TRANSPORT_PARAMS.containers[params.selectedContainer as keyof typeof USA_TRANSPORT_PARAMS.containers]
    const costs = USA_TRANSPORT_PARAMS.costs
    const cargo = USA_TRANSPORT_PARAMS.cargo[params.cargoType as keyof typeof USA_TRANSPORT_PARAMS.cargo] || USA_TRANSPORT_PARAMS.cargo.consumer_goods

    // Basic metrics
    const totalDistance = route.distance * 2 // Round trip
    const fuelConsumption = totalDistance / truck.fuelEconomy // gallons
    const fuelCost = fuelConsumption * costs.fuelPricePerGallon
    const tollCost = totalDistance * costs.tollRate * 0.23 // 23% of routes have tolls
    const totalCargoValue = params.cargoQuantity * cargo.unitPrice
    const insuranceCost = totalCargoValue * cargo.insuranceRate

    // Driver salary based on tier
    let driverSalary: number
    switch (params.driverSalaryTier) {
      case "low":
        driverSalary = costs.driverSalaryLow
        break
      case "high":
        driverSalary = costs.driverSalaryHigh
        break
      default:
        driverSalary = costs.driverSalaryAverage
    }

    // Time calculations
    const drivingTime = route.time * 2
    const totalTripTime = drivingTime + costs.loadingTimeStandard + costs.unloadingTimeStandard

    // Per trip costs
    const perTripOperationalCost = fuelCost + tollCost + insuranceCost
    const driverCostPerTrip = driverSalary / params.annualTrips
    const maintenanceCostPerTrip = costs.maintenancePerMile * totalDistance
    const overheadCostPerTrip = costs.overheadPerMile * totalDistance
    const fixedCostPerTrip = (costs.insurance + truck.price * costs.financing) / params.annualTrips
    const totalCostPerTrip =
      perTripOperationalCost + driverCostPerTrip + maintenanceCostPerTrip + overheadCostPerTrip + fixedCostPerTrip

    // Annual calculations
    const annualMileage = totalDistance * params.annualTrips
    const annualOperationalCost = perTripOperationalCost * params.annualTrips
    const annualFixedCost =
      driverSalary +
      costs.insurance +
      costs.maintenanceAnnual +
      truck.price * costs.financing +
      costs.dailyOverhead * 365
    const totalAnnualCost = annualOperationalCost + annualFixedCost

    // Efficiency metrics
    const effectiveUtilization = params.utilization / 100
    const backhaulRate = params.backhaul / 100
    const emptyMiles = annualMileage * (costs.emptyMilesPercentage / 100)
    const emptyMileCost = emptyMiles * costs.emptyMileCost
    const costPerUnit = totalCostPerTrip / params.cargoQuantity
    const costPerMile = totalCostPerTrip / totalDistance

    // Industry benchmarks comparison
    const industryBenchmarkCostPerMile = costs.totalOperatingCostPerMile
    const costEfficiencyRatio = costPerMile / industryBenchmarkCostPerMile
    const fuelEfficiencyRating = truck.fuelEconomy >= 7.0 ? "Excellent" : truck.fuelEconomy >= 6.5 ? "Good" : "Average"

    return {
      route,
      truck,
      container,
      cargo,
      fuelConsumption,
      fuelCost,
      tollCost,
      insuranceCost,
      driverSalary,
      perTripOperationalCost,
      driverCostPerTrip,
      maintenanceCostPerTrip,
      overheadCostPerTrip,
      fixedCostPerTrip,
      totalCostPerTrip,
      totalAnnualCost,
      annualOperationalCost,
      annualFixedCost,
      totalTripTime,
      emptyMiles,
      emptyMileCost,
      costPerUnit,
      costPerMile,
      totalDistance,
      annualMileage,
      effectiveUtilization,
      backhaulRate,
      industryBenchmarkCostPerMile,
      costEfficiencyRatio,
      fuelEfficiencyRating,
      drivingTime,
    }
  }, [params])
}
