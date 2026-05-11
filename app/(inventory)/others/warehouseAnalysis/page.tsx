import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ControlTab from "@/components/warehouse/control/controlTab";
import OperationalTab from "@/components/warehouse/operationalTab";
import CostTab from "@/components/warehouse/cost/CostTab";
import BenchmarkTab from "@/components/warehouse/bench/benchmarkTab";
import OrderTrackingTab from "@/components/warehouse/orderTracking/OrderTrackingTab";

export default function WarehouseAnalysisPage() {
  return (
    <div className="space-y-4">
      <div className="border border-gray-200 rounded-lg p-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display">
          Ferguson DC Operations & Analytics
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Distribution center performance across 9 regional DCs, 5 MDCs, and 106 final-mile hubs — plumbing, HVAC, waterworks & PVF operations
        </p>
      </div>
      <Tabs defaultValue="controlTower">
        <TabsList>
          <TabsTrigger value="controlTower">Control Tower</TabsTrigger>
          <TabsTrigger value="operations">Operations Metrics</TabsTrigger>
          <TabsTrigger value="cost">Cost Metrics</TabsTrigger>
          <TabsTrigger value="benchmark">DC Benchmark</TabsTrigger>
          <TabsTrigger value="orderTracking">Order Tracking</TabsTrigger>
        </TabsList>
        <TabsContent value="controlTower">
          <ControlTab />
        </TabsContent>
        <TabsContent value="operations">
          <OperationalTab />
        </TabsContent>
        <TabsContent value="cost">
          <CostTab />
        </TabsContent>
        <TabsContent value="benchmark">
          <BenchmarkTab />
        </TabsContent>
        <TabsContent value="orderTracking">
          <OrderTrackingTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
