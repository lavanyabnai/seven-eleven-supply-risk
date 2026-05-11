"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Map, Truck, Box, TrendingUp, DollarSign, Users } from "lucide-react"
import { USA_TRANSPORT_PARAMS } from "@/lib/transport-params"

interface USAParametersTabProps {
  parameters: any
  calculations: any
}

export default function USAParametersTab({ parameters, calculations }: USAParametersTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Route Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              USA Route Configuration
            </CardTitle>
            <CardDescription>Select origin city and destination port</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Route Selection</Label>
              <Select value={parameters.selectedRoute} onValueChange={parameters.setSelectedRoute}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(USA_TRANSPORT_PARAMS.routes).map(([key, route]) => (
                    <SelectItem key={key} value={key}>
                      {route.city} → {route.port} ({route.distance} miles)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-600">Distance</Label>
                <p className="text-2xl font-semibold">{calculations.route.distance} miles</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Transit Time</Label>
                <p className="text-2xl font-semibold">{calculations.route.time} hrs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Vehicle Configuration
            </CardTitle>
            <CardDescription>Choose truck type and specifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Truck Type</Label>
              <Select value={parameters.selectedTruck} onValueChange={parameters.setSelectedTruck}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(USA_TRANSPORT_PARAMS.trucks).map(([key, truck]) => (
                    <SelectItem key={key} value={key}>
                      {truck.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-600">Capacity</Label>
                <p className="text-xl font-semibold">{calculations.truck.capacity} tons</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Fuel Economy</Label>
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
          </CardContent>
        </Card>

        {/* Driver Compensation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Driver Compensation Tier
            </CardTitle>
            <CardDescription>Select driver salary tier (includes benefits & taxes)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Salary Tier</Label>
              <Select value={parameters.driverSalaryTier} onValueChange={parameters.setDriverSalaryTier}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Range - $65,470/year</SelectItem>
                  <SelectItem value="average">Average - $85,326/year</SelectItem>
                  <SelectItem value="high">High Range - $111,577/year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Annual Total Cost</p>
              <p className="text-2xl font-semibold text-blue-600">${calculations.driverSalary.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Includes base salary + benefits (46-53% overhead)</p>
            </div>
          </CardContent>
        </Card>

        {/* Cargo Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Box className="h-5 w-5" />
              Cargo Configuration
            </CardTitle>
            <CardDescription>Configure cargo type and quantity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Cargo Type</Label>
              <Select value={parameters.cargoType} onValueChange={parameters.setCargoType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="automotive">Automotive Parts</SelectItem>
                  <SelectItem value="consumer_goods">Consumer Goods</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Cargo Quantity (units)</Label>
              <Input
                type="number"
                value={parameters.cargoQuantity}
                onChange={(e) => parameters.setCargoQuantity(Number(e.target.value))}
              />
              <p className="text-sm text-gray-600 mt-1">
                Value: ${(parameters.cargoQuantity * calculations.cargo.unitPrice).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operational Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Operational Parameters
          </CardTitle>
          <CardDescription>Set annual operations and efficiency metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label>Annual Trips</Label>
              <Input
                type="number"
                value={parameters.annualTrips}
                onChange={(e) => parameters.setAnnualTrips(Number(e.target.value))}
              />
              <p className="text-xs text-gray-500 mt-1">
                Annual mileage: {calculations.annualMileage.toLocaleString()} miles
              </p>
            </div>

            <div>
              <Label>Fleet Utilization: {parameters.utilization}%</Label>
              <Slider
                value={[parameters.utilization]}
                onValueChange={(value) => parameters.setUtilization(value[0])}
                max={100}
                step={5}
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">Industry average: 75-85%</p>
            </div>

            <div>
              <Label>Backhaul Rate: {parameters.backhaul}%</Label>
              <Slider
                value={[parameters.backhaul]}
                onValueChange={(value) => parameters.setBackhaul(value[0])}
                max={100}
                step={5}
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">Industry average: 79.3%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* USA Industry Benchmarks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            USA Industry Benchmarks (2024-2025)
          </CardTitle>
          <CardDescription>Current market rates and industry standards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <Label className="text-sm text-gray-600">Fuel Price (National)</Label>
              <p className="text-lg font-semibold">${USA_TRANSPORT_PARAMS.costs.fuelPricePerGallon}/gal</p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm text-gray-600">Maintenance</Label>
              <p className="text-lg font-semibold">${USA_TRANSPORT_PARAMS.costs.maintenancePerMile}/mile</p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm text-gray-600">Industry Cost/Mile</Label>
              <p className="text-lg font-semibold">${USA_TRANSPORT_PARAMS.costs.totalOperatingCostPerMile}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm text-gray-600">Empty Mile Cost</Label>
              <p className="text-lg font-semibold">${USA_TRANSPORT_PARAMS.costs.emptyMileCost}</p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm">
              <strong>Your Cost Efficiency:</strong> {(calculations.costEfficiencyRatio * 100).toFixed(0)}% of industry
              benchmark
              {calculations.costEfficiencyRatio < 1 ? " (Better than average)" : " (Above average cost)"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
