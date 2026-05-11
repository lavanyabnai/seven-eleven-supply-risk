import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { PieChart, Pie, Cell } from "recharts"
import { DollarSign, Package, TrendingUp, Map, Fuel, Shield, Truck, Wrench, Clock, AlertTriangle } from "lucide-react"
import { USA_TRANSPORT_PARAMS } from "@/lib/transport-params"

interface USAResultsTabProps {
  calculations: any
  annualTrips: number
}

export default function USAResultsTab({ calculations, annualTrips }: USAResultsTabProps) {
  const costBreakdownData = [
    {
      name: "Driver Labor",
      value: calculations.driverSalary,
      percentage: ((calculations.driverSalary / calculations.totalAnnualCost) * 100).toFixed(1),
    },
    {
      name: "Fuel",
      value: calculations.fuelCost * annualTrips,
      percentage: (((calculations.fuelCost * annualTrips) / calculations.totalAnnualCost) * 100).toFixed(1),
    },
    {
      name: "Maintenance",
      value: USA_TRANSPORT_PARAMS.costs.maintenanceAnnual,
      percentage: ((USA_TRANSPORT_PARAMS.costs.maintenanceAnnual / calculations.totalAnnualCost) * 100).toFixed(1),
    },
    {
      name: "Tolls",
      value: calculations.tollCost * annualTrips,
      percentage: (((calculations.tollCost * annualTrips) / calculations.totalAnnualCost) * 100).toFixed(1),
    },
    {
      name: "Insurance",
      value: USA_TRANSPORT_PARAMS.costs.insurance,
      percentage: ((USA_TRANSPORT_PARAMS.costs.insurance / calculations.totalAnnualCost) * 100).toFixed(1),
    },
    {
      name: "Financing",
      value: calculations.truck.price * USA_TRANSPORT_PARAMS.costs.financing,
      percentage: (
        ((calculations.truck.price * USA_TRANSPORT_PARAMS.costs.financing) / calculations.totalAnnualCost) *
        100
      ).toFixed(1),
    },
    {
      name: "Overhead",
      value: USA_TRANSPORT_PARAMS.costs.dailyOverhead * 365,
      percentage: (((USA_TRANSPORT_PARAMS.costs.dailyOverhead * 365) / calculations.totalAnnualCost) * 100).toFixed(1),
    },
    {
      name: "Empty Miles",
      value: calculations.emptyMileCost,
      percentage: ((calculations.emptyMileCost / calculations.totalAnnualCost) * 100).toFixed(1),
    },
  ]

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#84cc16", "#f97316"]

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cost Per Trip</p>
                <p className="text-2xl font-bold">${calculations.totalCostPerTrip.toFixed(0)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cost Per Unit</p>
                <p className="text-2xl font-bold">${calculations.costPerUnit.toFixed(2)}</p>
              </div>
              <Package className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Annual Cost</p>
                <p className="text-2xl font-bold">${(calculations.totalAnnualCost / 1000).toFixed(0)}K</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cost Per Mile</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">${calculations.costPerMile.toFixed(2)}</p>
                  <Badge variant={calculations.costEfficiencyRatio < 1 ? "default" : "destructive"}>
                    {calculations.costEfficiencyRatio < 1 ? "Efficient" : "High Cost"}
                  </Badge>
                </div>
              </div>
              <Map className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Industry Comparison Alert */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800">Industry Benchmark Comparison</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Your cost per mile (${calculations.costPerMile.toFixed(2)}) vs Industry benchmark ($
                {calculations.industryBenchmarkCostPerMile}) =
                <strong> {(calculations.costEfficiencyRatio * 100).toFixed(0)}% of benchmark</strong>
                {calculations.costEfficiencyRatio < 1
                  ? " - You're operating efficiently!"
                  : " - Consider optimization strategies."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Cost Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Per Trip Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="flex items-center gap-2">
                  <Fuel className="h-4 w-4 text-gray-500" />
                  Fuel Cost ({calculations.fuelConsumption.toFixed(1)} gal)
                </span>
                <span className="font-semibold">${calculations.fuelCost.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="flex items-center gap-2">
                  <Map className="h-4 w-4 text-gray-500" />
                  Toll Fees (23% of routes)
                </span>
                <span className="font-semibold">${calculations.tollCost.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  Cargo Insurance
                </span>
                <span className="font-semibold">${calculations.insuranceCost.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-gray-500" />
                  Driver Cost
                </span>
                <span className="font-semibold">${calculations.driverCostPerTrip.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-gray-500" />
                  Maintenance ($0.202/mile)
                </span>
                <span className="font-semibold">${calculations.maintenanceCostPerTrip.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  Overhead & Admin
                </span>
                <span className="font-semibold">${calculations.overheadCostPerTrip.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t-2 border-gray-800">
                <span className="font-semibold">Total Per Trip</span>
                <span className="font-bold text-lg">${calculations.totalCostPerTrip.toFixed(0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Annual Cost Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-80 w-full"
              config={{
                driver: { label: "Driver Labor", color: "#3b82f6" },
                fuel: { label: "Fuel", color: "#10b981" },
                maintenance: { label: "Maintenance", color: "#f59e0b" },
                tolls: { label: "Tolls", color: "#ef4444" },
                insurance: { label: "Insurance", color: "#8b5cf6" },
                financing: { label: "Financing", color: "#06b6d4" },
                overhead: { label: "Overhead", color: "#84cc16" },
                emptyMiles: { label: "Empty Miles", color: "#f97316" },
              }}
            >
              <PieChart>
                <Pie
                  data={costBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costBreakdownData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Operational Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Operational Metrics & Efficiency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <Label className="text-sm text-gray-600">Round Trip Distance</Label>
              <p className="text-xl font-semibold">{calculations.totalDistance} miles</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Total Trip Time</Label>
              <p className="text-xl font-semibold">{calculations.totalTripTime.toFixed(1)} hours</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Annual Empty Miles</Label>
              <p className="text-xl font-semibold">{(calculations.emptyMiles / 1000).toFixed(0)}K miles</p>
              <p className="text-xs text-gray-500">Cost: ${calculations.emptyMileCost.toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Fuel Efficiency</Label>
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold">{calculations.truck.fuelEconomy} MPG</p>
                <Badge
                  variant={
                    calculations.fuelEfficiencyRating === "Excellent"
                      ? "default"
                      : calculations.fuelEfficiencyRating === "Good"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {calculations.fuelEfficiencyRating}
                </Badge>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <Label className="text-sm text-gray-600">Annual Mileage</Label>
              <p className="text-2xl font-semibold text-blue-600">{calculations.annualMileage.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Industry avg: 103,000 miles</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <Label className="text-sm text-gray-600">Backhaul Efficiency</Label>
              <p className="text-2xl font-semibold text-green-600">{(calculations.backhaulRate * 100).toFixed(0)}%</p>
              <p className="text-xs text-gray-500">Industry avg: 79.3%</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <Label className="text-sm text-gray-600">Operating Margin</Label>
              <p className="text-2xl font-semibold text-orange-600">
                {((1 - calculations.costEfficiencyRatio) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500">Industry avg: 6% or lower</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
