"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Map, Truck, Box, TrendingUp } from "lucide-react"
import { TRANSPORT_PARAMS } from "@/lib/transport-params"

interface ParametersTabProps {
  parameters: any
  calculations: any
}

export default function ParametersTab({ parameters, calculations }: ParametersTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Route Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              Route Configuration
            </CardTitle>
            <CardDescription>Select manufacturing location and destination port</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Route Selection</Label>
              <Select value={parameters.selectedRoute} onValueChange={parameters.setSelectedRoute}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(TRANSPORT_PARAMS.routes).map(([key, route]) => (
                    <SelectItem key={key} value={key}>
                      {route.city} → {route.port} ({route.distance}km)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-600">Distance</Label>
                <p className="text-2xl font-semibold">{calculations.route.distance} km</p>
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
                  {Object.entries(TRANSPORT_PARAMS.trucks).map(([key, truck]) => (
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
                <p className="text-xl font-semibold">{calculations.truck.fuelEconomy} L/100km</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Container Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Box className="h-5 w-5" />
              Container & Cargo
            </CardTitle>
            <CardDescription>Configure container type and VR headset quantity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Container Type</Label>
              <Select value={parameters.selectedContainer} onValueChange={parameters.setSelectedContainer}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(TRANSPORT_PARAMS.containers).map(([key, container]) => (
                    <SelectItem key={key} value={key}>
                      {container.name} ({container.vrCapacity} VR units)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>VR Headset Quantity</Label>
              <Input
                type="number"
                value={parameters.vrQuantity}
                onChange={(e) => parameters.setVrQuantity(Number(e.target.value))}
                max={calculations.container.vrCapacity}
              />
              <p className="text-sm text-gray-600 mt-1">
                {((parameters.vrQuantity / calculations.container.vrCapacity) * 100).toFixed(0)}% container utilization
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Operational Parameters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Operational Parameters
            </CardTitle>
            <CardDescription>Set annual operations and efficiency metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Annual Trips</Label>
              <Input
                type="number"
                value={parameters.annualTrips}
                onChange={(e) => parameters.setAnnualTrips(Number(e.target.value))}
              />
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Parameters Display */}
      <Card>
        <CardHeader>
          <CardTitle>Fixed Cost Parameters (Annual)</CardTitle>
          <CardDescription>Current market rates for China trucking industry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <Label className="text-sm text-gray-600">Driver Salary</Label>
              <p className="text-lg font-semibold">¥{TRANSPORT_PARAMS.costs.driverSalary.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm text-gray-600">Insurance</Label>
              <p className="text-lg font-semibold">¥{TRANSPORT_PARAMS.costs.insurance.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm text-gray-600">Maintenance</Label>
              <p className="text-lg font-semibold">¥{TRANSPORT_PARAMS.costs.maintenance.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm text-gray-600">Fuel Price</Label>
              <p className="text-lg font-semibold">¥{TRANSPORT_PARAMS.costs.fuelPrice}/L</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
