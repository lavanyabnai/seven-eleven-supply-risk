import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Package, AlertTriangle, Clock } from "lucide-react"

// 7-Eleven Front Royal VA DC — delayed store replenishment and franchise operator orders
const orders = [
  {
    id: "7S-28471",
    customer: "7-Eleven Store Manager (Richmond Area)",
    items: 34,
    priority: "Critical",
    status: "Delayed",
    promisedDate: "Apr 12, 2026",
    delay: "1 day",
  },
  {
    id: "7S-28485",
    customer: "Franchise Operator (DC Metro Area)",
    items: 22,
    priority: "Critical",
    status: "Delayed",
    promisedDate: "Apr 12, 2026",
    delay: "1 day",
  },
  {
    id: "7S-28502",
    customer: "Core-Mark Distribution (Arlington VA Order)",
    items: 48,
    priority: "High",
    status: "Delayed",
    promisedDate: "Apr 13, 2026",
    delay: "Expected",
  },
  {
    id: "7S-28519",
    customer: "Franchise Operator (Norfolk Area)",
    items: 16,
    priority: "High",
    status: "Delayed",
    promisedDate: "Apr 13, 2026",
    delay: "Expected",
  },
  {
    id: "7S-28538",
    customer: "Store Manager Account (Charlotte Area)",
    items: 29,
    priority: "Medium",
    status: "At Risk",
    promisedDate: "Apr 14, 2026",
    delay: "Potential",
  },
]

export default function OrderBacklog() {
  return (
    <div>
      <div className="flex items-center mb-4">
        <Package className="h-5 w-5 text-blue-900 mr-2" />
        <h2 className="text-xl font-semibold text-blue-900">Order Backlog</h2>
      </div>

      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <span className="font-medium">237 branch/contractor orders affected across 84 locations (top 5 by priority)</span>
            </div>
            <Badge variant="outline" className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Avg Delay: 36 hours
            </Badge>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Promised Date</TableHead>
              <TableHead>Delay</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      order.priority === "Critical"
                        ? "bg-red-500"
                        : order.priority === "High"
                          ? "bg-orange-500"
                          : "bg-yellow-500"
                    }
                  >
                    {order.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={order.status === "Delayed" ? "destructive" : "outline"}
                    className={order.status === "At Risk" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : ""}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.promisedDate}</TableCell>
                <TableCell
                  className={
                    order.delay === "Expected"
                      ? "text-orange-500 font-medium"
                      : order.delay === "Potential"
                        ? "text-yellow-500 font-medium"
                        : "text-red-500 font-medium"
                  }
                >
                  {order.delay}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-4 border-t bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Critical Orders</span>
              <span className="text-lg font-medium">42</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">High Priority Orders</span>
              <span className="text-lg font-medium">85</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Standard Orders</span>
              <span className="text-lg font-medium">110</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
