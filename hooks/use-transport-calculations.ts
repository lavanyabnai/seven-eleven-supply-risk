"use client"

import { useMemo } from "react"
import { TRANSPORT_PARAMS } from "@/lib/transport-params"

interface CalculationParams {
  selectedRoute: string
  selectedTruck: string
  selectedContainer: string
  vrQuantity: number
  annualTrips: number
  utilization: number
  backhaul: number
}

export function useTransportCalculations(params: CalculationParams) {
  return useMemo(() => {
    const route = TRANSPORT_PARAMS.routes[params.selectedRoute]
    const truck = TRANSPORT_PARAMS.trucks[params.selectedTruck]
    const container = TRANSPORT_PARAMS.containers[params.selectedContainer]
    const costs = TRANSPORT_PARAMS.costs
    const vr = TRANSPORT_PARAMS.vrHeadset

    // Basic metrics
    const totalDistance = route.distance * 2 // Round trip
    const fuelConsumption = (totalDistance * truck.fuelEconomy) / 100
    const fuelCost = fuelConsumption * costs.fuelPrice
    const tollCost = totalDistance * costs.tollRate
    const totalCargoValue = params.vrQuantity * vr.unitPrice
    const insuranceCost = totalCargoValue * costs.cargoInsuranceRate
    const securityCost = costs.securityTracking

    // Time calculations
    const drivingTime = route.time * 2
    const totalTripTime = drivingTime + costs.loadingTime + costs.unloadingTime

    // Per trip costs
    const perTripOperationalCost = fuelCost + tollCost + insuranceCost + securityCost
    const driverCostPerTrip = costs.driverSalary / params.annualTrips
    const maintenanceCostPerTrip = costs.maintenance / params.annualTrips
    const fixedCostPerTrip = (costs.insurance + costs.financing + costs.administrative) / params.annualTrips
    const totalCostPerTrip = perTripOperationalCost + driverCostPerTrip + maintenanceCostPerTrip + fixedCostPerTrip

    // Annual calculations
    const annualOperationalCost = perTripOperationalCost * params.annualTrips
    const annualFixedCost =
      costs.driverSalary + costs.insurance + costs.maintenance + costs.financing + costs.administrative
    const totalAnnualCost = annualOperationalCost + annualFixedCost

    // Efficiency metrics
    const effectiveUtilization = params.utilization / 100
    const backhaulRate = params.backhaul / 100
    const emptyMiles = totalDistance * params.annualTrips * (1 - backhaulRate) * 0.5
    const costPerUnit = totalCostPerTrip / params.vrQuantity
    const costPerKm = totalCostPerTrip / totalDistance

    return {
      route,
      truck,
      container,
      fuelConsumption,
      fuelCost,
      tollCost,
      insuranceCost,
      securityCost,
      perTripOperationalCost,
      driverCostPerTrip,
      maintenanceCostPerTrip,
      fixedCostPerTrip,
      totalCostPerTrip,
      totalAnnualCost,
      annualOperationalCost,
      annualFixedCost,
      totalTripTime,
      emptyMiles,
      costPerUnit,
      costPerKm,
      totalDistance,
      effectiveUtilization,
      backhaulRate,
    }
  }, [params])
}
