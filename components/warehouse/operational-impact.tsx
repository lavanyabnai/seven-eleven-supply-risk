"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingDown, Clock } from "lucide-react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Ferguson Front Royal VA DC — picking rate and branch order fulfillment decline
const impactData = [
  { day: "Apr 7", pickingRate: 96, orderFulfillment: 94 },
  { day: "Apr 8", pickingRate: 93, orderFulfillment: 91 },
  { day: "Apr 9", pickingRate: 87, orderFulfillment: 84 },
  { day: "Apr 10", pickingRate: 74, orderFulfillment: 68 },
  { day: "Apr 11", pickingRate: 58, orderFulfillment: 52 },
  { day: "Apr 12", pickingRate: 47, orderFulfillment: 43 },
  { day: "Apr 13", pickingRate: 42, orderFulfillment: 38 },
]

const metrics = [
  {
    name: "Picking Efficiency",
    value: "42%",
    change: "-53%",
    normal: "95%",
    status: "critical",
  },
  {
    name: "Order Cycle Time",
    value: "18 hours",
    change: "+12h",
    normal: "6 hours",
    status: "critical",
  },
  {
    name: "Order Accuracy",
    value: "96%",
    change: "-2%",
    normal: "98%",
    status: "warning",
  },
  {
    name: "Dock to Stock Time",
    value: "36 hours",
    change: "+24h",
    normal: "12 hours",
    status: "critical",
  },
]

export default function OperationalImpact() {
  return (
    <Card className="text-blue-900">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <BarChart3 className="mr-2 h-5 w-5" />
          Operational Impact Analysis
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="mb-6">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={impactData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pickingRate"
                name="Picking Rate (%)"
                stroke="#3b82f6"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="orderFulfillment"
                name="Order Fulfillment (%)"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div key={metric.name} className="border rounded-md p-3">
              <div className="text-sm text-gray-500">{metric.name}</div>
              <div className="flex items-center mt-1">
                <div className="text-xl font-semibold">{metric.value}</div>
                <Badge
                  variant={metric.status === "critical" ? "destructive" : "outline"}
                  className={metric.status === "warning" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : ""}
                >
                  <TrendingDown className="h-3 w-3 mr-1" />
                  {metric.change}
                </Badge>
              </div>
              <div className="text-xs text-gray-500 mt-1">Normal: {metric.normal}</div>
            </div>
          ))}
        </div>

        <div className="border rounded-md p-4 mt-6 bg-gray-50">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-medium">Impact Timeline</h3>
          </div>

          <div className="mt-3 space-y-3">
            <div className="flex">
              <div className="w-24 flex-shrink-0 text-sm font-medium">3 days ago</div>
              <div className="text-sm">Flu outbreak: 6 DC associates called out in plumbing picking zone</div>
            </div>
            <div className="flex">
              <div className="w-24 flex-shrink-0 text-sm font-medium">2 days ago</div>
              <div className="text-sm">3 forklifts and 4 order pickers went down for unscheduled maintenance</div>
            </div>
            <div className="flex">
              <div className="w-24 flex-shrink-0 text-sm font-medium">Yesterday</div>
              <div className="text-sm">Labor gap hit 25% — branch replenishment backlog began accumulating across Mid-Atlantic</div>
            </div>
            <div className="flex">
              <div className="w-24 flex-shrink-0 text-sm font-medium">Today</div>
              <div className="text-sm">Critical: 35% labor shortage + 40% equipment down — 237 branch orders delayed, 84 branches impacted</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
