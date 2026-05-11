"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calculator } from "lucide-react"

interface InputParametersProps {
  data: any
  onChange: (data: any) => void
  onCalculate: () => void
}

export default function InputParameters({ data, onChange, onCalculate }: InputParametersProps) {
  const updateVolumeDrivers = (field: string, value: number) => {
    onChange({
      ...data,
      volumeDrivers: {
        ...data.volumeDrivers,
        [field]: value,
      },
    })
  }

  const updateLocationFactors = (field: string, value: any) => {
    onChange({
      ...data,
      locationFactors: {
        ...data.locationFactors,
        [field]: value,
      },
    })
  }

  const updateProcessAssumptions = (field: string, value: any) => {
    onChange({
      ...data,
      processAssumptions: {
        ...data.processAssumptions,
        [field]: value,
      },
    })
  }

  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {/* Volume Drivers */}
      <Card>
        <CardHeader>
          <CardTitle>Volume Drivers</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="skus">SKUs</Label>
            <Input
              id="skus"
              type="number"
              value={data.volumeDrivers.skus}
              onChange={(e) => updateVolumeDrivers("skus", Number.parseInt(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="orders">Orders (Monthly)</Label>
            <Input
              id="orders"
              type="number"
              value={data.volumeDrivers.orders}
              onChange={(e) => updateVolumeDrivers("orders", Number.parseInt(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="orderLines">Order Lines (Monthly)</Label>
            <Input
              id="orderLines"
              type="number"
              value={data.volumeDrivers.orderLines}
              onChange={(e) => updateVolumeDrivers("orderLines", Number.parseInt(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="casesPicked">Cases Picked (Monthly)</Label>
            <Input
              id="casesPicked"
              type="number"
              value={data.volumeDrivers.casesPicked}
              onChange={(e) => updateVolumeDrivers("casesPicked", Number.parseInt(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="palletsReceived">Pallets Received (Monthly)</Label>
            <Input
              id="palletsReceived"
              type="number"
              value={data.volumeDrivers.palletsReceived}
              onChange={(e) => updateVolumeDrivers("palletsReceived", Number.parseInt(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="palletsShipped">Pallets Shipped (Monthly)</Label>
            <Input
              id="palletsShipped"
              type="number"
              value={data.volumeDrivers.palletsShipped}
              onChange={(e) => updateVolumeDrivers("palletsShipped", Number.parseInt(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Location Factors */}
      <Card>
        <CardHeader>
          <CardTitle>Location & Cost Factors</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select
              value={data.locationFactors.country}
              onValueChange={(value) => updateLocationFactors("country", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USA">United States</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="Mexico">Mexico</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="UK">United Kingdom</SelectItem>
                <SelectItem value="China">China</SelectItem>
                <SelectItem value="India">India</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={data.locationFactors.city}
              onChange={(e) => updateLocationFactors("city", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="laborCost">Labor Cost ($/hour)</Label>
            <Input
              id="laborCost"
              type="number"
              step="0.1"
              value={data.locationFactors.laborCostPerHour}
              onChange={(e) => updateLocationFactors("laborCostPerHour", Number.parseFloat(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="energyCost">Energy Cost ($/kWh)</Label>
            <Input
              id="energyCost"
              type="number"
              step="0.01"
              value={data.locationFactors.energyCostPerKwh}
              onChange={(e) => updateLocationFactors("energyCostPerKwh", Number.parseFloat(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rentCost">Rent ($/sq ft/month)</Label>
            <Input
              id="rentCost"
              type="number"
              step="0.1"
              value={data.locationFactors.rentPerSqFt}
              onChange={(e) => updateLocationFactors("rentPerSqFt", Number.parseFloat(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="equipmentFactor">Equipment Cost Factor</Label>
            <Input
              id="equipmentFactor"
              type="number"
              step="0.1"
              value={data.locationFactors.equipmentCostFactor}
              onChange={(e) => updateLocationFactors("equipmentCostFactor", Number.parseFloat(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Process Assumptions */}
      <Card>
        <CardHeader>
          <CardTitle>Process Level Assumptions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="palletScan">Pallet Scanning Required</Label>
                <Switch
                  id="palletScan"
                  checked={data.processAssumptions.palletScanRequired}
                  onCheckedChange={(checked) => updateProcessAssumptions("palletScanRequired", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="caseScan">Case Scanning Required</Label>
                <Switch
                  id="caseScan"
                  checked={data.processAssumptions.caseScanRequired}
                  onCheckedChange={(checked) => updateProcessAssumptions("caseScanRequired", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="palletLabeling">Pallet Labeling Required</Label>
                <Switch
                  id="palletLabeling"
                  checked={data.processAssumptions.palletLabelingRequired}
                  onCheckedChange={(checked) => updateProcessAssumptions("palletLabelingRequired", checked)}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pickingMethod">Picking Method</Label>
                <Select
                  value={data.processAssumptions.pickingMethod}
                  onValueChange={(value) => updateProcessAssumptions("pickingMethod", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zone">Zone Picking</SelectItem>
                    <SelectItem value="batch">Batch Picking</SelectItem>
                    <SelectItem value="wave">Wave Picking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="automationLevel">Automation Level</Label>
                <Select
                  value={data.processAssumptions.automationLevel}
                  onValueChange={(value) => updateProcessAssumptions("automationLevel", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="semi-automated">Semi-Automated</SelectItem>
                    <SelectItem value="automated">Fully Automated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

     
    </div>
    <div className="mt-4 flex justify-center">
        <Button onClick={onCalculate} size="lg" className="px-8">
          <Calculator className="mr-2 h-5 w-5" />
          Calculate Warehouse Costs
        </Button>
      </div>
    </div>
  )
}
