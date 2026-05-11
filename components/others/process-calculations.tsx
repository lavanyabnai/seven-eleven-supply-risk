"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, Search, PackageCheck, Send } from "lucide-react"

interface ProcessCalculationsProps {
  results: any
}

export default function ProcessCalculations({ results }: ProcessCalculationsProps) {
  if (!results) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Run calculations to see process breakdown</p>
        </CardContent>
      </Card>
    )
  }

  const processes = [
    { key: "receiving", name: "Receiving", icon: Truck, color: "bg-blue-500" },
    { key: "storage", name: "Storage", icon: Package, color: "bg-green-500" },
    { key: "picking", name: "Picking", icon: Search, color: "bg-orange-500" },
    { key: "packing", name: "Packing", icon: PackageCheck, color: "bg-purple-500" },
    { key: "shipping", name: "Shipping", icon: Send, color: "bg-red-500" },
  ]

  const formatCurrency = (value: number) =>
    `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const formatNumber = (value: number, decimals = 1) =>
    value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

  return (
    <div className="space-y-6">
      {/* Process Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Process Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {processes.map(({ key, name, icon: Icon, color }) => {
              const process = results.processes[key]
              return (
                <div key={key} className="text-center">
                  <div className={`${color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm">{name}</h3>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(process.totalCost)}</p>
                  <p className="text-sm text-muted-foreground">{formatNumber(process.ftes)} FTEs</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Process Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {processes.map(({ key, name, icon: Icon, color }) => {
          const process = results.processes[key]
          return (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className={`${color} w-8 h-8 rounded-full flex items-center justify-center`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  {name} Process
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Labor Cost</p>
                    <p className="text-lg font-semibold">{formatCurrency(process.laborCost)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Space Cost</p>
                    <p className="text-lg font-semibold">{formatCurrency(process.spaceCost)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Equipment Cost</p>
                    <p className="text-lg font-semibold">{formatCurrency(process.equipmentCost)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Unit Cost</p>
                    <p className="text-lg font-semibold">{formatCurrency(process.unitCost)}</p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">FTEs Required</p>
                    <p className="text-lg font-semibold">{formatNumber(process.ftes)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Space Required</p>
                    <p className="text-lg font-semibold">{formatNumber(process.spaceRequired)} sq ft</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Productivity</p>
                  <div className="flex items-center gap-2">
                    <Progress value={Math.min((process.productivity / 150) * 100, 100)} className="flex-1" />
                    <span className="text-sm font-medium">{formatNumber(process.productivity)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary Totals */}
      <Card>
        <CardHeader>
          <CardTitle>Total Warehouse Costs & Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Total Labor Cost</p>
              <p className="text-3xl font-bold text-blue-600">{formatCurrency(results.totals.costs.labor)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Total Space Cost</p>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(results.totals.costs.space)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Total Equipment Cost</p>
              <p className="text-3xl font-bold text-orange-600">{formatCurrency(results.totals.costs.equipment)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Total Operating Cost</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(results.totals.costs.total)}</p>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Total FTEs</p>
              <p className="text-2xl font-bold">{formatNumber(results.totals.ftes)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Total Space Required</p>
              <p className="text-2xl font-bold">{formatNumber(results.totals.space)} sq ft</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Cost per Sq Ft</p>
              <p className="text-2xl font-bold">{formatCurrency(results.totals.costs.total / results.totals.space)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
