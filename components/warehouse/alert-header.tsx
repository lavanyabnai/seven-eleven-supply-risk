import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AlertHeader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2 text-blue-900">
        <div className="flex rounded-t-lg bg-red-500 items-center text-white p-4">
          <AlertTriangle className="h-8 w-8 mr-2" />
          <span className="font-medium text-base">
            CRITICAL ALERT: Plumbing Fixtures Picking Severely Impacted — Labor & Forklift Shortage at Front Royal VA DC
          </span>
        </div>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-500">Current Fulfillment Rate</div>
              <div className="flex items-center mt-1">
                <div className="text-2xl font-semibold text-red-500">42%</div>
                <Badge variant="destructive" className="ml-2">
                  -48%
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: "42%" }}></div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Estimated Recovery</div>
              <div className="flex items-center mt-1">
                <Clock className="h-5 w-5 mr-2 text-yellow-500" />
                <div className="text-xl font-semibold">72 hours</div>
              </div>
              <div className="text-sm text-gray-500 mt-1">Without intervention</div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Impacted Branch Orders</div>
              <div className="text-2xl font-semibold mt-1">237</div>
              <div className="text-sm text-gray-500 mt-1">Delayed shipments to 84 branches</div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">Alert Details</p>
                <p className="text-sm text-amber-700 mt-1">
                  Picking operations at Ferguson&apos;s Front Royal VA Regional Distribution Center are severely impacted
                  due to a 35% labor shortage (seasonal flu outbreak + 8 unfilled positions) and 40% forklift/order picker
                  downtime. This is causing significant delays in plumbing fixture and HVAC equipment branch replenishment
                  across the Mid-Atlantic and Southeast regions.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="text-blue-900">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Facility Information</h2>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">Location</div>
              <div className="font-medium mt-1">Front Royal VA — Regional DC</div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Facility Size</div>
              <div className="font-medium mt-1">425,000 sq ft</div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Normal Daily Capacity</div>
              <div className="font-medium mt-1">4,800 orders / 22,400 lines</div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Current Daily Output</div>
              <div className="font-medium text-red-500 mt-1">2,016 orders (42%)</div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Branches Served</div>
              <div className="font-medium mt-1">612 (Mid-Atlantic, Southeast)</div>
            </div>

            <div className="pt-2">
              <Badge variant="destructive" className="flex items-center w-fit">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Critical Impact
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
