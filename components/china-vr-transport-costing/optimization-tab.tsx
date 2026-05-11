import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"
import { TRANSPORT_PARAMS } from "@/lib/transport-params"

interface OptimizationTabProps {
  calculations: any
  annualTrips: number
  backhaul: number
}

export default function OptimizationTab({ calculations, annualTrips, backhaul }: OptimizationTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cost Optimization Scenarios</CardTitle>
          <CardDescription>Analyze potential cost savings through operational improvements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scenario Analysis */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">What-If Analysis</h3>

            {/* Backhaul Improvement */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Increase Backhaul Rate to 50%</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Annual Savings</p>
                  <p className="text-xl font-semibold text-green-600">
                    ¥{(((50 - backhaul) / 100) * calculations.totalAnnualCost * 0.15).toFixed(0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">ROI Period</p>
                  <p className="text-xl font-semibold">3-4 months</p>
                </div>
              </div>
            </div>

            {/* Fuel Efficiency */}
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2">Improve Fuel Efficiency by 10%</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Annual Fuel Savings</p>
                  <p className="text-xl font-semibold text-green-600">
                    ¥{(calculations.fuelCost * annualTrips * 0.1).toFixed(0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Implementation</p>
                  <p className="text-xl font-semibold">Driver training</p>
                </div>
              </div>
            </div>

            {/* Route Optimization */}
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium mb-2">Reduce Loading/Unloading Time by 30%</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Time Saved per Trip</p>
                  <p className="text-xl font-semibold text-green-600">
                    {((TRANSPORT_PARAMS.costs.loadingTime + TRANSPORT_PARAMS.costs.unloadingTime) * 0.3).toFixed(1)}{" "}
                    hours
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Additional Trips/Year</p>
                  <p className="text-xl font-semibold">+{Math.floor(annualTrips * 0.15)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Strategic Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Implement Digital Load Matching</h4>
                  <p className="text-sm text-gray-600">
                    Use platforms to find backhaul cargo, targeting 50% utilization to save ¥
                    {(((50 - backhaul) / 100) * calculations.totalAnnualCost * 0.15).toFixed(0)} annually
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Upgrade to Electric Vehicles</h4>
                  <p className="text-sm text-gray-600">
                    For short routes like {calculations.route.city} ({calculations.route.distance}km), EVs can reduce
                    fuel costs by 60-70%
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Optimize Container Loading</h4>
                  <p className="text-sm text-gray-600">
                    Current {((1000 / calculations.container.vrCapacity) * 100).toFixed(0)}% utilization - aim for 95%+
                    to reduce cost per unit by {((1 - 1000 / calculations.container.vrCapacity) * 15).toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <Button className="flex-1">
              <Calculator className="h-4 w-4 mr-2" />
              Generate Full Report
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Export to Excel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
