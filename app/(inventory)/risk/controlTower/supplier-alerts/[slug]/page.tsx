"use client"

import SupplierOOSDashboard from "@/components/controlKpi/supplier-oos-dashboard"
import { useParams } from "next/navigation"

function getSupplierData(slug: string) {
  const supplierAlertsData = [
    {
      supplierName: "Core-Mark International",
      supplierCode: "CMK-001",
      componentType: "Energy Drinks - Monster / Red Bull",
      materialCode: "ED-001",
      alertType: "Critical OOS",
      affectedSKUs: 8,
      estimatedImpact: 4850000,
      currentStock: 2340,
      requiredStock: 18500,
      shortagePercentage: 87.4,
      supplierStatus: "Port Congestion Delay",
      estimatedRecovery: "14-21 days",
      priority: "Critical",
      dueDate: "04/25/2026",
      location: "Guangzhou, China",
      contractValue: 85000000,
      qualityRating: 4.8,
      onTimeDelivery: 82.5,
    },
    {
      supplierName: "Coca-Cola / PepsiCo",
      supplierCode: "CCP-002",
      componentType: "Packaged Beverages",
      materialCode: "CC-001",
      alertType: "Severe OOS",
      affectedSKUs: 4,
      estimatedImpact: 2950000,
      currentStock: 1580,
      requiredStock: 4200,
      shortagePercentage: 62.4,
      supplierStatus: "Capacity Constraints",
      estimatedRecovery: "7-10 days",
      priority: "High",
      dueDate: "04/28/2026",
      location: "Atlanta, GA",
      contractValue: 62000000,
      qualityRating: 4.5,
      onTimeDelivery: 84.2,
    },
    {
      supplierName: "Altria / Reynolds American",
      supplierCode: "ALT-003",
      componentType: "Tobacco Products",
      materialCode: "TC-001",
      alertType: "Moderate OOS",
      affectedSKUs: 6,
      estimatedImpact: 1920000,
      currentStock: 42000,
      requiredStock: 95000,
      shortagePercentage: 55.8,
      supplierStatus: "Tobacco Leaf Shortage",
      estimatedRecovery: "10-14 days",
      priority: "High",
      dueDate: "04/22/2026",
      location: "Richmond, VA",
      contractValue: 38000000,
      qualityRating: 4.6,
      onTimeDelivery: 91.0,
    },
    {
      supplierName: "Hershey Company",
      supplierCode: "HER-004",
      componentType: "Packaged Snacks & Candy",
      materialCode: "HS-001",
      alertType: "Moderate OOS",
      affectedSKUs: 3,
      estimatedImpact: 1450000,
      currentStock: 1800,
      requiredStock: 3200,
      shortagePercentage: 43.8,
      supplierStatus: "Shipping Delay",
      estimatedRecovery: "21-28 days",
      priority: "Medium",
      dueDate: "05/05/2026",
      location: "Hershey, PA",
      contractValue: 24000000,
      qualityRating: 4.7,
      onTimeDelivery: 88.5,
    },
  ]

  return (
    supplierAlertsData.find((item) => slug.includes(encodeURIComponent(item.supplierCode))) || supplierAlertsData[0]
  )
}

export default function SupplierOOSDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const supplierData = getSupplierData(slug)

  return <SupplierOOSDashboard supplierData={supplierData} />
}
