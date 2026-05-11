"use client"

import React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  AlertCircle,
  ArrowUpDown,
  Calendar,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Download,
  Filter,
  MoreHorizontal,
  Package,
  Search,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Define interfaces for our data
interface SlowMovingInventoryItem {
  id: string
  sku: string
  description: string
  category: string
  location: string
  quantity: number
  unitCost: number
  totalValue: number
  daysInInventory: number
  agingBucket: string
  turnoverRate: number
  lastMovementDate: string
  launchDate: string
  nextGenReleaseDate?: string
  recommendations: InventoryRecommendation[]
  kpis: InventoryKPI[]
  riskLevel: "low" | "medium" | "high" | "critical"
  techObsolescenceRisk: "low" | "medium" | "high"
}

interface InventoryRecommendation {
  id: string
  type: string
  action: string
  impact: string
  priority: "low" | "medium" | "high"
  potentialSavings?: number
  timeframe: string
}

interface InventoryKPI {
  name: string
  value: string | number
  trend: "up" | "down" | "neutral"
  target?: string | number
  unit?: string
}

// Ferguson Enterprises slow-moving inventory aging data
const fergusonInventoryData: SlowMovingInventoryItem[] = [
  {
    id: "FRG-1001",
    sku: "FRG-WH-4050",
    description: "Bradford White 40-gal Water Heater (Discontinued Model)",
    category: "Slow-Moving Inventory",
    location: "Ferguson DC - Newport News, VA",
    quantity: 245,
    unitCost: 199.99,
    totalValue: 48997.55,
    daysInInventory: 195,
    agingBucket: "180+ days",
    turnoverRate: 0.6,
    lastMovementDate: "2024-11-20",
    launchDate: "2020-10-13",
    nextGenReleaseDate: "2024-10-15",
    recommendations: [
      {
        id: "rec-frg1001-1",
        type: "Contractor Clearance",
        action: "Offer 25% discount to contractor accounts for discontinued water heater clearance",
        impact: "Move 70% of inventory within 45 days before new efficiency model launch",
        priority: "high",
        potentialSavings: 12249.39,
        timeframe: "30-45 days",
      },
      {
        id: "rec-frg1001-2",
        type: "Bundle Strategy",
        action: "Create water heater install kits bundled with expansion tanks and connectors",
        impact: "Increase perceived value while clearing aging water heater inventory",
        priority: "high",
        potentialSavings: 9799.51,
        timeframe: "60 days",
      },
      {
        id: "rec-frg1001-3",
        type: "Property Management Sales",
        action: "Target property management companies and multi-family housing for bulk purchases",
        impact: "Leverage lower price point for volume replacement buyers",
        priority: "medium",
        timeframe: "90 days",
      },
      {
        id: "rec-frg1001-4",
        type: "Trade-Up Program",
        action: "Offer trade-up credit toward high-efficiency models when purchasing remaining stock",
        impact: "Drive new model sales while clearing discontinued inventory",
        priority: "medium",
        potentialSavings: 7349.63,
        timeframe: "120 days",
      },
    ],
    kpis: [
      { name: "Holding Cost", value: "$12,249", trend: "up", unit: "USD" },
      { name: "Days of Supply", value: 195, trend: "up", target: 45, unit: "days" },
      { name: "Turnover Rate", value: 0.6, trend: "down", target: 4.0 },
      { name: "Obsolescence Risk", value: "High", trend: "up" },
      { name: "Margin Erosion", value: "-22%", trend: "down" },
    ],
    riskLevel: "critical",
    techObsolescenceRisk: "high",
  },
  {
    id: "FRG-1002",
    sku: "FRG-WH-4050-LP",
    description: "Bradford White 40-gal Water Heater LP (Discontinued Model)",
    category: "Slow-Moving Inventory",
    location: "Ferguson DC - Mocksville, NC",
    quantity: 156,
    unitCost: 299.99,
    totalValue: 46798.44,
    daysInInventory: 187,
    agingBucket: "180+ days",
    turnoverRate: 0.7,
    lastMovementDate: "2024-12-01",
    launchDate: "2020-10-13",
    nextGenReleaseDate: "2024-10-15",
    recommendations: [
      {
        id: "rec-frg1002-1",
        type: "Rural Market Push",
        action: "Target LP water heater demand in rural and off-grid contractor territories",
        impact: "Position as value option for LP-dependent markets",
        priority: "high",
        potentialSavings: 9359.69,
        timeframe: "45 days",
      },
      {
        id: "rec-frg1002-2",
        type: "Regional Pricing",
        action: "Apply region-specific discounts in slower-moving branch territories",
        impact: "Optimize pricing by region to accelerate movement",
        priority: "medium",
        timeframe: "60 days",
      },
    ],
    kpis: [
      { name: "Holding Cost", value: "$11,699", trend: "up", unit: "USD" },
      { name: "Days of Supply", value: 187, trend: "up", target: 45, unit: "days" },
      { name: "Turnover Rate", value: 0.7, trend: "down", target: 4.0 },
      { name: "Obsolescence Risk", value: "High", trend: "up" },
      { name: "Margin Erosion", value: "-20%", trend: "down" },
    ],
    riskLevel: "critical",
    techObsolescenceRisk: "high",
  },
  {
    id: "FRG-1003",
    sku: "FRG-HV-SEER13",
    description: "13 SEER AC Condensing Unit 3-Ton (Being Replaced by 15 SEER Min)",
    category: "Slow-Moving Inventory",
    location: "Ferguson DC - Newport News, VA",
    quantity: 89,
    unitCost: 399.99,
    totalValue: 35599.11,
    daysInInventory: 125,
    agingBucket: "121-180 days",
    turnoverRate: 1.4,
    lastMovementDate: "2025-01-15",
    launchDate: "2023-10-10",
    recommendations: [
      {
        id: "rec-frg1003-1",
        type: "Regulatory Deadline Push",
        action: "Promote 13 SEER units to contractors before DOE minimum efficiency change takes effect",
        impact: "Leverage remaining installation window to move current inventory",
        priority: "medium",
        timeframe: "30 days",
      },
      {
        id: "rec-frg1003-2",
        type: "Replacement Market Bundle",
        action: "Create HVAC install kits bundled with line sets, thermostats, and pads",
        impact: "Increase value proposition for replacement-market contractors",
        priority: "medium",
        timeframe: "45 days",
      },
    ],
    kpis: [
      { name: "Holding Cost", value: "$4,450", trend: "up", unit: "USD" },
      { name: "Days of Supply", value: 125, trend: "up", target: 60, unit: "days" },
      { name: "Turnover Rate", value: 1.4, trend: "down", target: 3.0 },
      { name: "Obsolescence Risk", value: "Medium", trend: "neutral" },
      { name: "Margin Impact", value: "-8%", trend: "down" },
    ],
    riskLevel: "medium",
    techObsolescenceRisk: "medium",
  },
  {
    id: "FRG-1004",
    sku: "FRG-HV-SEER13-5T",
    description: "13 SEER AC Condensing Unit 5-Ton (Being Replaced by 15 SEER Min)",
    category: "Slow-Moving Inventory",
    location: "Ferguson DC - Dallas, TX",
    quantity: 67,
    unitCost: 499.99,
    totalValue: 33499.33,
    daysInInventory: 98,
    agingBucket: "91-120 days",
    turnoverRate: 1.8,
    lastMovementDate: "2025-02-10",
    launchDate: "2023-10-10",
    recommendations: [
      {
        id: "rec-frg1004-1",
        type: "Commercial HVAC Push",
        action: "Target commercial contractors and light commercial projects needing budget HVAC",
        impact: "Target cost-sensitive commercial customer segments",
        priority: "medium",
        timeframe: "60 days",
      },
      {
        id: "rec-frg1004-2",
        type: "Builder Program",
        action: "Offer volume discounts to home builders for spec-home installations",
        impact: "Move volume through builder channel before regulation change",
        priority: "low",
        timeframe: "90 days",
      },
    ],
    kpis: [
      { name: "Holding Cost", value: "$3,283", trend: "up", unit: "USD" },
      { name: "Days of Supply", value: 98, trend: "up", target: 60, unit: "days" },
      { name: "Turnover Rate", value: 1.8, trend: "neutral", target: 3.0 },
      { name: "Obsolescence Risk", value: "Low", trend: "neutral" },
      { name: "Margin Impact", value: "-3%", trend: "neutral" },
    ],
    riskLevel: "medium",
    techObsolescenceRisk: "low",
  },
  {
    id: "FRG-1005",
    sku: "FRG-PV-2040",
    description: "2in PVC Sch.40 Union - Slow Moving",
    category: "Slow-Moving Inventory",
    location: "Ferguson DC - Newport News, VA",
    quantity: 34,
    unitCost: 999.99,
    totalValue: 33999.66,
    daysInInventory: 220,
    agingBucket: "180+ days",
    turnoverRate: 0.4,
    lastMovementDate: "2024-10-15",
    launchDate: "2022-10-25",
    recommendations: [
      {
        id: "rec-frg1005-1",
        type: "Branch Redistribution",
        action: "Redistribute to branches with higher plumbing repair demand in older housing markets",
        impact: "Target branches serving aging infrastructure areas with higher fitting demand",
        priority: "high",
        potentialSavings: 10199.9,
        timeframe: "90 days",
      },
      {
        id: "rec-frg1005-2",
        type: "Contractor Discount",
        action: "Apply 40% discount for contractor account bulk purchases",
        impact: "Aggressive pricing to clear slow-moving fitting inventory",
        priority: "high",
        potentialSavings: 13599.86,
        timeframe: "60 days",
      },
      {
        id: "rec-frg1005-3",
        type: "Municipal Projects",
        action: "Offer to municipal water/sewer departments for maintenance stock",
        impact: "Move inventory to government accounts with steady demand",
        priority: "medium",
        timeframe: "120 days",
      },
    ],
    kpis: [
      { name: "Holding Cost", value: "$7,480", trend: "up", unit: "USD" },
      { name: "Days of Supply", value: 220, trend: "up", target: 90, unit: "days" },
      { name: "Turnover Rate", value: 0.4, trend: "down", target: 2.0 },
      { name: "Obsolescence Risk", value: "High", trend: "up" },
      { name: "Margin Erosion", value: "-35%", trend: "down" },
    ],
    riskLevel: "critical",
    techObsolescenceRisk: "high",
  },
  {
    id: "FRG-2001",
    sku: "FRG-FIT-CU34",
    description: "3/4in Copper Press Fitting Tee - Overstock",
    category: "Plumbing Fittings",
    location: "Ferguson DC - Newport News, VA",
    quantity: 312,
    unitCost: 49.99,
    totalValue: 15596.88,
    daysInInventory: 165,
    agingBucket: "121-180 days",
    turnoverRate: 1.2,
    lastMovementDate: "2024-12-20",
    launchDate: "2020-10-13",
    recommendations: [
      {
        id: "rec-frg2001-1",
        type: "Bundle Inclusion",
        action: "Include in plumbing rough-in kits for new construction projects",
        impact: "Move fitting inventory while enhancing project kit value proposition",
        priority: "high",
        timeframe: "45 days",
      },
      {
        id: "rec-frg2001-2",
        type: "Counter Sales Push",
        action: "Feature at branch counter displays with promotional pricing for walk-in contractors",
        impact: "Target walk-in contractor traffic for accessory sales",
        priority: "medium",
        timeframe: "60 days",
      },
    ],
    kpis: [
      { name: "Holding Cost", value: "$1,716", trend: "up", unit: "USD" },
      { name: "Days of Supply", value: 165, trend: "up", target: 90, unit: "days" },
      { name: "Turnover Rate", value: 1.2, trend: "down", target: 6.0 },
      { name: "Attach Rate", value: "15%", trend: "down", target: "35%" },
    ],
    riskLevel: "medium",
    techObsolescenceRisk: "low",
  },
  {
    id: "FRG-2002",
    sku: "FRG-VLV-PRV34",
    description: "3/4in Pressure Reducing Valve - Watts LF25AUB",
    category: "Plumbing Valves",
    location: "Ferguson DC - Mocksville, NC",
    quantity: 189,
    unitCost: 79.99,
    totalValue: 15118.11,
    daysInInventory: 145,
    agingBucket: "121-180 days",
    turnoverRate: 1.6,
    lastMovementDate: "2025-01-05",
    launchDate: "2020-10-13",
    recommendations: [
      {
        id: "rec-frg2002-1",
        type: "Code Compliance Kit",
        action: "Bundle PRV with expansion tanks for code-compliant water heater install kits",
        impact: "Target contractors needing code-compliant install packages",
        priority: "medium",
        timeframe: "60 days",
      },
      {
        id: "rec-frg2002-2",
        type: "Municipal/Commercial",
        action: "Market to commercial plumbing contractors for building maintenance",
        impact: "Position for commercial building valve replacement projects",
        priority: "low",
        timeframe: "90 days",
      },
    ],
    kpis: [
      { name: "Holding Cost", value: "$1,663", trend: "up", unit: "USD" },
      { name: "Days of Supply", value: 145, trend: "up", target: 75, unit: "days" },
      { name: "Turnover Rate", value: 1.6, trend: "down", target: 4.0 },
      { name: "Attach Rate", value: "12%", trend: "down", target: "25%" },
    ],
    riskLevel: "medium",
    techObsolescenceRisk: "medium",
  },
  {
    id: "FRG-2003",
    sku: "FRG-FP-SPRNK12",
    description: "1/2in Fire Sprinkler Head - Residential Pendent",
    category: "Fire Protection",
    location: "Ferguson DC - Dallas, TX",
    quantity: 267,
    unitCost: 39.99,
    totalValue: 10677.33,
    daysInInventory: 112,
    agingBucket: "91-120 days",
    turnoverRate: 2.1,
    lastMovementDate: "2025-02-28",
    launchDate: "2020-10-13",
    recommendations: [
      {
        id: "rec-frg2003-1",
        type: "Fire Protection Bundle",
        action: "Create fire sprinkler kits for residential new-construction projects",
        impact: "Target builders and fire protection contractors with bundled solutions",
        priority: "medium",
        timeframe: "45 days",
      },
      {
        id: "rec-frg2003-2",
        type: "Retrofit Market",
        action: "Promote to fire protection contractors serving retrofit and remodel markets",
        impact: "Move inventory through retrofit channel with growing code adoption",
        priority: "low",
        timeframe: "60 days",
      },
    ],
    kpis: [
      { name: "Holding Cost", value: "$1,068", trend: "up", unit: "USD" },
      { name: "Days of Supply", value: 112, trend: "up", target: 60, unit: "days" },
      { name: "Turnover Rate", value: 2.1, trend: "neutral", target: 6.0 },
      { name: "Attach Rate", value: "18%", trend: "neutral", target: "30%" },
    ],
    riskLevel: "low",
    techObsolescenceRisk: "low",
  },
  {
    id: "FRG-3001",
    sku: "FRG-WW-GV6",
    description: "6in Ductile Iron Gate Valve - Waterworks",
    category: "Waterworks",
    location: "Ferguson DC - Newport News, VA",
    quantity: 78,
    unitCost: 129.99,
    totalValue: 10139.22,
    daysInInventory: 89,
    agingBucket: "61-90 days",
    turnoverRate: 2.8,
    lastMovementDate: "2025-03-15",
    launchDate: "2023-10-10",
    recommendations: [
      {
        id: "rec-frg3001-1",
        type: "Municipal Sales",
        action: "Target municipal water departments for infrastructure replacement programs",
        impact: "Serve municipal replacement and upgrade market",
        priority: "medium",
        timeframe: "60 days",
      },
      {
        id: "rec-frg3001-2",
        type: "Utility Contractor Push",
        action: "Promote to utility contractors with active waterworks projects",
        impact: "Move inventory through active project pipeline",
        priority: "low",
        timeframe: "90 days",
      },
    ],
    kpis: [
      { name: "Holding Cost", value: "$901", trend: "up", unit: "USD" },
      { name: "Days of Supply", value: 89, trend: "up", target: 45, unit: "days" },
      { name: "Turnover Rate", value: 2.8, trend: "neutral", target: 4.0 },
      { name: "Replacement Rate", value: "8%", trend: "neutral", target: "12%" },
    ],
    riskLevel: "low",
    techObsolescenceRisk: "low",
  },
  {
    id: "FRG-4001",
    sku: "FRG-HV-FILTER-BULK",
    description: "HVAC Air Filter Multi-Pack (16x25x1) - Bulk Overstock",
    category: "HVAC Supplies",
    location: "Ferguson DC - Dallas, TX",
    quantity: 1500,
    unitCost: 29.99,
    totalValue: 44985.0,
    daysInInventory: 75,
    agingBucket: "61-90 days",
    turnoverRate: 3.2,
    lastMovementDate: "2025-03-20",
    launchDate: "2023-06-15",
    recommendations: [
      {
        id: "rec-frg4001-1",
        type: "Seasonal Push",
        action: "Promote bulk filter packs to HVAC contractors ahead of cooling season",
        impact: "Increase filter sales tied to seasonal HVAC maintenance demand",
        priority: "high",
        timeframe: "30 days",
      },
      {
        id: "rec-frg4001-2",
        type: "Property Management",
        action: "Offer bulk filter discount to property management companies for maintenance cycles",
        impact: "Move overstock through recurring maintenance channel",
        priority: "medium",
        timeframe: "45 days",
      },
    ],
    kpis: [
      { name: "Holding Cost", value: "$3,374", trend: "up", unit: "USD" },
      { name: "Days of Supply", value: 75, trend: "up", target: 30, unit: "days" },
      { name: "Turnover Rate", value: 3.2, trend: "neutral", target: 8.0 },
      { name: "Attach Rate", value: "22%", trend: "down", target: "45%" },
    ],
    riskLevel: "low",
    techObsolescenceRisk: "low",
  },
]

// Helper function to format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

// Helper function to get risk level badge
const getRiskBadge = (riskLevel: string) => {
  switch (riskLevel) {
    case "low":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
          Low Risk
        </Badge>
      )
    case "medium":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
          Medium Risk
        </Badge>
      )
    case "high":
      return (
        <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
          High Risk
        </Badge>
      )
    case "critical":
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
          Critical Risk
        </Badge>
      )
    default:
      return <Badge variant="outline">{riskLevel}</Badge>
  }
}

// Helper function to get tech obsolescence badge
const getTechObsolescenceBadge = (risk: string) => {
  switch (risk) {
    case "low":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
          <Zap className="h-3 w-3 mr-1" />
          Low Tech Risk
        </Badge>
      )
    case "medium":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
          <Zap className="h-3 w-3 mr-1" />
          Medium Tech Risk
        </Badge>
      )
    case "high":
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
          <Zap className="h-3 w-3 mr-1" />
          High Tech Risk
        </Badge>
      )
    default:
      return <Badge variant="outline">{risk}</Badge>
  }
}

// Helper function to get trend icon
const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-red-500" />
    case "down":
      return <TrendingDown className="h-4 w-4 text-green-500" />
    case "neutral":
      return <ArrowUpDown className="h-4 w-4 text-gray-500" />
    default:
      return null
  }
}

// Helper function to get recommendation priority badge
const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "low":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
          Low Priority
        </Badge>
      )
    case "medium":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
          Medium Priority
        </Badge>
      )
    case "high":
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
          High Priority
        </Badge>
      )
    default:
      return <Badge variant="outline">{priority}</Badge>
  }
}

// Helper function to get aging bucket color
const getAgingBucketColor = (bucket: string): string => {
  switch (bucket) {
    case "0-30 days":
      return "bg-green-100"
    case "31-60 days":
      return "bg-green-50"
    case "61-90 days":
      return "bg-yellow-50"
    case "91-120 days":
      return "bg-yellow-100"
    case "121-180 days":
      return "bg-orange-100"
    case "180+ days":
      return "bg-red-100"
    default:
      return ""
  }
}

export default function MetaVRAgingDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedAgingBucket, setSelectedAgingBucket] = useState("all")
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" }>({
    key: "daysInInventory",
    direction: "descending",
  })

  // Toggle expanded state for an item
  const toggleItemExpanded = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  // Handle sorting
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Filter and sort data
  const filteredAndSortedData = [...fergusonInventoryData]
    .filter((item) => {
      const matchesSearch =
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

      const matchesAgingBucket = selectedAgingBucket === "all" || item.agingBucket === selectedAgingBucket

      return matchesSearch && matchesCategory && matchesAgingBucket
    })
    .sort((a, b) => {
      const key = sortConfig.key as keyof SlowMovingInventoryItem
      const aValue = a[key]
      const bValue = b[key]

      // Handle undefined values safely
      if (aValue === undefined && bValue === undefined) return 0
      if (aValue === undefined) return sortConfig.direction === "ascending" ? 1 : -1
      if (bValue === undefined) return sortConfig.direction === "ascending" ? -1 : 1

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
      return 0
    })

  // Calculate summary metrics
  const totalItems = filteredAndSortedData.length
  const totalValue = filteredAndSortedData.reduce((sum, item) => sum + item.totalValue, 0)
  const averageDaysInInventory = Math.round(
    filteredAndSortedData.reduce((sum, item) => sum + item.daysInInventory, 0) / (filteredAndSortedData.length || 1),
  )
  const criticalItems = filteredAndSortedData.filter((item) => item.riskLevel === "critical").length
  const highTechRiskItems = filteredAndSortedData.filter((item) => item.techObsolescenceRisk === "high").length

  // Get unique categories for filter
  const categories = Array.from(new Set(fergusonInventoryData.map((item) => item.category)))

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Ferguson Slow-Moving Inventory Aging Dashboard</CardTitle>
              <CardDescription>
                Wholesale distribution products with aging alerts and obsolescence tracking
              </CardDescription>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search SKUs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[200px]"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedAgingBucket} onValueChange={setSelectedAgingBucket}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Aging Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Periods</SelectItem>
                  <SelectItem value="0-30 days">0-30 days</SelectItem>
                  <SelectItem value="31-60 days">31-60 days</SelectItem>
                  <SelectItem value="61-90 days">61-90 days</SelectItem>
                  <SelectItem value="91-120 days">91-120 days</SelectItem>
                  <SelectItem value="121-180 days">121-180 days</SelectItem>
                  <SelectItem value="180+ days">180+ days</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                More Filters
              </Button>

              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total SKUs</p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Days in Inventory</p>
                <p className="text-2xl font-bold">{averageDaysInInventory}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Items</p>
                <p className="text-2xl font-bold">{criticalItems}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Tech Risk</p>
                <p className="text-2xl font-bold">{highTechRiskItems}</p>
              </div>
              <Zap className="h-8 w-8 text-orange-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Aging Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-muted/50">
                <TableHead className="w-10"></TableHead>
                <TableHead className="w-[140px]">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort("sku")}>
                    SKU
                    {sortConfig.key === "sku" && (
                      <ChevronDown
                        className={`ml-1 h-4 w-4 ${sortConfig.direction === "descending" ? "rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </TableHead>
                <TableHead className="min-w-[200px]">Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end cursor-pointer" onClick={() => requestSort("quantity")}>
                    Quantity
                    {sortConfig.key === "quantity" && (
                      <ChevronDown
                        className={`ml-1 h-4 w-4 ${sortConfig.direction === "descending" ? "rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-right">
                  <div
                    className="flex items-center justify-end cursor-pointer"
                    onClick={() => requestSort("totalValue")}
                  >
                    Total Value
                    {sortConfig.key === "totalValue" && (
                      <ChevronDown
                        className={`ml-1 h-4 w-4 ${sortConfig.direction === "descending" ? "rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-right">
                  <div
                    className="flex items-center justify-end cursor-pointer"
                    onClick={() => requestSort("daysInInventory")}
                  >
                    Days in Inventory
                    {sortConfig.key === "daysInInventory" && (
                      <ChevronDown
                        className={`ml-1 h-4 w-4 ${sortConfig.direction === "descending" ? "rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </TableHead>
                <TableHead>Aging Bucket</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Tech Risk</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.map((item) => (
                <React.Fragment key={item.id}>
                  <TableRow
                    className={`cursor-pointer hover:bg-muted/50 ${expandedItems.includes(item.id) ? "bg-muted/20" : ""}`}
                    onClick={() => toggleItemExpanded(item.id)}
                  >
                    <TableCell>
                      {expandedItems.includes(item.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{item.sku}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">{item.quantity.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.totalValue)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <span className="font-medium">{item.daysInInventory}</span>
                        {item.daysInInventory > 120 && <AlertCircle className="ml-1 h-4 w-4 text-red-500" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getAgingBucketColor(item.agingBucket)}`}>
                        {item.agingBucket}
                      </Badge>
                    </TableCell>
                    <TableCell>{getRiskBadge(item.riskLevel)}</TableCell>
                    <TableCell>{getTechObsolescenceBadge(item.techObsolescenceRisk)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Inventory Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Product Details</DropdownMenuItem>
                          <DropdownMenuItem>View Sales History</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Create Install Kit Bundle</DropdownMenuItem>
                          <DropdownMenuItem>Apply Discount</DropdownMenuItem>
                          <DropdownMenuItem>Transfer to High-Demand Branch</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Target Contractor Accounts</DropdownMenuItem>
                          <DropdownMenuItem>Offer to Municipal/Commercial</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Mark for Liquidation</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>

                  {/* Expanded Content */}
                  {expandedItems.includes(item.id) && (
                    <TableRow className="hover:bg-transparent">
                      <TableCell colSpan={11} className="p-0">
                        <div className="bg-muted/20 p-4 border-t border-b">
                          <Tabs defaultValue="kpis">
                            <TabsList className="mb-4">
                              <TabsTrigger value="kpis">KPIs</TabsTrigger>
                              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                              <TabsTrigger value="details">Product Details</TabsTrigger>
                            </TabsList>

                            {/* KPIs Tab */}
                            <TabsContent value="kpis">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                {item.kpis.map((kpi, index) => (
                                  <Card key={index}>
                                    <CardContent className="p-4">
                                      <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-muted-foreground">{kpi.name}</p>
                                        {getTrendIcon(kpi.trend)}
                                      </div>
                                      <div className="mt-1">
                                        <p className="text-2xl font-bold">{kpi.value}</p>
                                        {kpi.target && (
                                          <div className="mt-2">
                                            <p className="text-xs text-muted-foreground">
                                              Target: {kpi.target} {kpi.unit || ""}
                                            </p>
                                            <Progress
                                              value={
                                                typeof kpi.value === "number"
                                                  ? (kpi.value / (kpi.target as number)) * 100
                                                  : 0
                                              }
                                              indicatorColor="bg-blue-500"
                                              className="h-1 mt-1"
                                            />
                                          </div>
                                        )}
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </TabsContent>

                            {/* Recommendations Tab */}
                            <TabsContent value="recommendations">
                              <div className="space-y-4">
                                {item.recommendations.map((rec) => (
                                  <Card key={rec.id}>
                                    <CardContent className="p-4">
                                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                        <div>
                                          <div className="flex items-center gap-2 mb-1">
                                            <Badge variant="secondary">{rec.type}</Badge>
                                            {getPriorityBadge(rec.priority)}
                                            <Badge variant="outline" className="text-xs">
                                              {rec.timeframe}
                                            </Badge>
                                          </div>
                                          <h4 className="font-semibold text-lg">{rec.action}</h4>
                                          <p className="text-sm text-muted-foreground mt-1">{rec.impact}</p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2 md:mt-0">
                                          {rec.potentialSavings && (
                                            <div className="text-right">
                                              <p className="text-xs text-muted-foreground">Potential Savings</p>
                                              <p className="font-semibold text-green-600">
                                                {formatCurrency(rec.potentialSavings)}
                                              </p>
                                            </div>
                                          )}
                                          <Button size="sm">Implement</Button>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </TabsContent>

                            {/* Details Tab */}
                            <TabsContent value="details">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Product Information</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <dl className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Location:</dt>
                                        <dd className="font-medium">{item.location}</dd>
                                      </div>
                                      <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Unit Cost:</dt>
                                        <dd className="font-medium">{formatCurrency(item.unitCost)}</dd>
                                      </div>
                                      <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Total Value:</dt>
                                        <dd className="font-medium">{formatCurrency(item.totalValue)}</dd>
                                      </div>
                                      <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Turnover Rate:</dt>
                                        <dd className="font-medium">{item.turnoverRate.toFixed(1)}</dd>
                                      </div>
                                    </dl>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Product Lifecycle</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <dl className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Launch Date:</dt>
                                        <dd className="font-medium">{item.launchDate}</dd>
                                      </div>
                                      <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Days in Inventory:</dt>
                                        <dd className="font-medium">{item.daysInInventory}</dd>
                                      </div>
                                      <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Last Movement:</dt>
                                        <dd className="font-medium">{item.lastMovementDate}</dd>
                                      </div>
                                      {item.nextGenReleaseDate && (
                                        <div className="flex justify-between">
                                          <dt className="text-muted-foreground">Next Gen Release:</dt>
                                          <dd className="font-medium text-orange-600">{item.nextGenReleaseDate}</dd>
                                        </div>
                                      )}
                                      <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Tech Risk:</dt>
                                        <dd className="font-medium">
                                          {item.techObsolescenceRisk.charAt(0).toUpperCase() +
                                            item.techObsolescenceRisk.slice(1)}
                                        </dd>
                                      </div>
                                    </dl>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Actions</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-2">
                                      <Button size="sm" className="w-full">
                                        View Inventory Analytics
                                      </Button>
                                      <Button size="sm" variant="outline" className="w-full">
                                        View Competitor Pricing
                                      </Button>
                                      <Button size="sm" variant="outline" className="w-full">
                                        Check Market Trends
                                      </Button>
                                      <Button size="sm" variant="outline" className="w-full">
                                        Generate Inventory Report
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* VR-Specific Legend */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Inventory Management Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Aging Bucket Colors:</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border rounded"></div>
                  <span className="text-xs">0-30 days (Optimal)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-50 border rounded"></div>
                  <span className="text-xs">31-60 days (Good)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-50 border rounded"></div>
                  <span className="text-xs">61-90 days (Monitor)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-100 border rounded"></div>
                  <span className="text-xs">91-120 days (Action Needed)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-100 border rounded"></div>
                  <span className="text-xs">121-180 days (High Risk)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 border rounded"></div>
                  <span className="text-xs">180+ days (Critical)</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Wholesale Distribution Considerations:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Regulatory changes (DOE efficiency standards) drive product obsolescence</li>
                <li>• New model introductions significantly impact older product demand</li>
                <li>• Consider install-kit bundling strategies to increase value proposition</li>
                <li>• Property management and municipal accounts may accept older models</li>
                <li>• Seasonal demand patterns (HVAC cooling/heating) affect product movement</li>
                <li>• Contractor account attach rates are crucial for profitability</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
