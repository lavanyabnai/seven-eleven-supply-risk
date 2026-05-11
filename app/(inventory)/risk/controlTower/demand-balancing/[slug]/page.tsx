"use client"

import DemandBalancingDashboard from "@/components/controlKpi/demand/demand-balancing-dashboard"
import { useParams } from "next/navigation"

// Mock function to get demand balancing data based on slug
function getDemandBalancingData(slug: string) {
  const demandBalancingData = [
    {
      sourceLocation: "FRG-DC-VA01",
      materialCode: "FRG-WH-4050",
      revenueImpact: 4291328,
      unitImpact: 6580,
      impactCoverage: 100.0,
      confidenceLevel: 81.21,
      predictedAction: "Transfer",
      actionPriority: "High",
      dueDate: "04/22/2026",
      description: "Transfer 5,500 units of Tank Water Heaters to FRG-DC-TX01 to fill projected backorders",
      alertType: "Stock Shortage",
      transferLeadTime: "3-5 days",
      currentStock: 4800,
      projectedDemand: 8200,
    },
    {
      sourceLocation: "FRG-DC-CA01",
      materialCode: "FRG-FK-2100",
      revenueImpact: 3306994,
      unitImpact: 14200,
      impactCoverage: 100.0,
      confidenceLevel: 88.6,
      predictedAction: "Expedite",
      actionPriority: "High",
      dueDate: "04/25/2026",
      description: "Expedite import shipment of Residential Faucets from Kohler Foshan to FRG-DC-SB01 — port congestion delay",
      alertType: "Critical Shortage",
      transferLeadTime: "7-10 days",
      currentStock: 8920,
      projectedDemand: 18500,
    },
    {
      sourceLocation: "FRG-DC-IL01",
      materialCode: "FRG-HV-5200",
      revenueImpact: 2850000,
      unitImpact: 1600,
      impactCoverage: 95.0,
      confidenceLevel: 76.5,
      predictedAction: "Transfer",
      actionPriority: "Medium",
      dueDate: "04/28/2026",
      description: "Transfer Residential HVAC Systems from Chicago DC to Denver DC for seasonal demand surge",
      alertType: "Demand Surge",
      transferLeadTime: "2-3 days",
      currentStock: 2100,
      projectedDemand: 3800,
    },
    {
      sourceLocation: "FRG-DC-GA01",
      materialCode: "FRG-PP-1040",
      revenueImpact: 1920000,
      unitImpact: 85000,
      impactCoverage: 100.0,
      confidenceLevel: 92.3,
      predictedAction: "Expedite",
      actionPriority: "Critical",
      dueDate: "04/20/2026",
      description: "PVC resin shortage at Charlotte Pipe — expedite alternate supply from JM Eagle Houston",
      alertType: "Supply Disruption",
      transferLeadTime: "5-7 days",
      currentStock: 42000,
      projectedDemand: 95000,
    },
  ]

  return (
    demandBalancingData.find((item) => slug.includes(item.materialCode)) || demandBalancingData[0]
  )
}

export default function DemandBalancingDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const demandData = getDemandBalancingData(slug)

  return <DemandBalancingDashboard demandData={demandData} />
}
