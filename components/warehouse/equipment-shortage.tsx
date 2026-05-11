"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, AlertTriangle, Wrench } from "lucide-react"
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts"

const equipmentData = [
  { name: "Operational", value: 60, color: "#22c55e" },
  { name: "Maintenance", value: 25, color: "#f59e0b" },
  { name: "Broken", value: 15, color: "#ef4444" },
]

// Ferguson Front Royal VA DC material handling equipment
const equipmentList = [
  { type: "Reach Forklifts", total: 16, available: 10, status: "critical" },
  { type: "Electric Pallet Jacks", total: 30, available: 18, status: "warning" },
  { type: "Order Pickers (Crown)", total: 22, available: 12, status: "critical" },
  { type: "Conveyor Sortation", total: 1, available: 1, status: "operational" },
]

export default function EquipmentShortage() {
  return (
    <Card className="text-blue-900">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Truck className="mr-2 h-5 w-5" />
          Equipment Shortage Analysis
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-sm text-red-500 font-medium">40% equipment unavailable</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={equipmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {equipmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Equipment Status</h3>
            <div className="space-y-2">
              {equipmentList.map((item) => (
                <div key={item.type} className="flex items-center justify-between border-b pb-2">
                  <span className="text-sm">{item.type}</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">
                      {item.available}/{item.total}
                    </span>
                    <Badge
                      className={
                        item.status === "operational"
                          ? "bg-green-500"
                          : item.status === "warning"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }
                    >
                      {item.status === "operational" ? "OK" : item.status === "warning" ? "Warning" : "Critical"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border rounded-md p-3 mt-4">
          <div className="text-sm font-medium flex items-center">
            <Wrench className="h-4 w-4 mr-2" />
            Maintenance Schedule
          </div>
          <p className="text-sm text-gray-600 mt-1">
            6 reach forklifts and 10 Crown order pickers scheduled for maintenance completion within 48 hours.
            4 electric pallet jacks require replacement batteries on backorder from supplier (ETA: 5 days).
            Rental fleet quote obtained: 8 units available from United Rentals at $185/day each.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
