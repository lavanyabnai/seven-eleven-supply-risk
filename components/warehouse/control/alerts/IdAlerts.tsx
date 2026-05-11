"use client"
import { Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AlertHeader from "@/components/warehouse/alert-header"
import OperationalImpact from "@/components/warehouse/operational-impact"
import LaborShortage from "@/components/warehouse/labor-shortage"
import EquipmentShortage from "@/components/warehouse/equipment-shortage"
import OrderBacklog from "@/components/warehouse/order-backlog"
import ResolutionOptions from "@/components/warehouse/resolution-options"

export default function WarehouseAlertDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-blue-900">Ferguson DC Alert: Picking Operations Impact — Front Royal VA</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input className="pl-10 w-64" placeholder="Search..." />
            </div>
            <Button variant="outline" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>May 11, 2025</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="grid grid-cols-1 gap-6">
          <AlertHeader />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LaborShortage />
            <EquipmentShortage />
          </div>

          <OperationalImpact />

          <OrderBacklog />

          <ResolutionOptions />
        </div>
      </main>
    </div>
  )
}
