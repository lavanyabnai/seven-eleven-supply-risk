import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { DollarSign, Package, TrendingUp, Map, Fuel, Shield, Truck, Wrench } from "lucide-react"
import { TRANSPORT_PARAMS } from "@/lib/transport-params"

interface ResultsTabProps {
  calculations: any
  annualTrips: number
}

export default function ResultsTab({ calculations, annualTrips }: ResultsTabProps) {
  const costBreakdownData = [
    {
      name: "Driver Labor",
      value: TRANSPORT_PARAMS.costs.driverSalary,
      percentage: ((TRANSPORT_PARAMS.costs.driverSalary / calculations.totalAnnualCost) * 100).toFixed(1),
    },
    {
      name: "Fuel",
      value: calculations.fuelCost * annualTrips,
      percentage: (((calculations.fuelCost * annualTrips) / calculations.totalAnnualCost) * 100).toFixed(1),
    },
    {
      name: "Maintenance",
      value: TRANSPORT_PARAMS.costs.maintenance,
      percentage: ((TRANSPORT_PARAMS.costs.maintenance / calculations.totalAnnualCost) * 100).toFixed(1),
    },
    {
      name: "Tolls",
      value: calculations.tollCost * annualTrips,
      percentage: (((calculations.tollCost * annualTrips) / calculations.totalAnnualCost) * 100).toFixed(1),
    },
    {
      name: "Insurance",
      value: TRANSPORT_PARAMS.costs.insurance,
      percentage: ((TRANSPORT_PARAMS.costs.insurance / calculations.totalAnnualCost) * 100).toFixed(1),
    },
    {
      name: "Other",
      value: TRANSPORT_PARAMS.costs.financing + TRANSPORT_PARAMS.costs.administrative,
      percentage: (
        ((TRANSPORT_PARAMS.costs.financing + TRANSPORT_PARAMS.costs.administrative) / calculations.totalAnnualCost) *
        100
      ).toFixed(1),
    },
  ]

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cost Per Trip</p>
                <p className="text-2xl font-bold">¥{calculations.totalCostPerTrip.toFixed(0)}</p>
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
                <p className="text-2xl font-bold">¥{calculations.costPerUnit.toFixed(2)}</p>
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
                <p className="text-2xl font-bold">¥{(calculations.totalAnnualCost / 1000).toFixed(0)}K</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cost Per KM</p>
                <p className="text-2xl font-bold">¥{calculations.costPerKm.toFixed(2)}</p>
              </div>
              <Map className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

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
                  Fuel Cost
                </span>
                <span className="font-semibold">¥{calculations.fuelCost.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="flex items-center gap-2">
                  <Map className="h-4 w-4 text-gray-500" />
                  Toll Fees
                </span>
                <span className="font-semibold">¥{calculations.tollCost.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  Cargo Insurance
                </span>
                <span className="font-semibold">¥{calculations.insuranceCost.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  Security & Tracking
                </span>
                <span className="font-semibold">¥{calculations.securityCost.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-gray-500" />
                  Driver Cost
                </span>
                <span className="font-semibold">¥{calculations.driverCostPerTrip.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-gray-500" />
                  Maintenance
                </span>
                <span className="font-semibold">¥{calculations.maintenanceCostPerTrip.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t-2 border-gray-800">
                <span className="font-semibold">Total Per Trip</span>
                <span className="font-bold text-lg">¥{calculations.totalCostPerTrip.toFixed(0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Annual Cost Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
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
                <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Operational Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Operational Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <Label className="text-sm text-gray-600">Round Trip Distance</Label>
              <p className="text-xl font-semibold">{calculations.totalDistance} km</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Total Trip Time</Label>
              <p className="text-xl font-semibold">{calculations.totalTripTime.toFixed(1)} hours</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Annual Empty Miles</Label>
              <p className="text-xl font-semibold">{(calculations.emptyMiles / 1000).toFixed(0)}K km</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Fuel per Trip</Label>
              <p className="text-xl font-semibold">{calculations.fuelConsumption.toFixed(0)} L</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
