"use client"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ExecutiveTab from "@/components/transportation/executive/ExecutiveTab"
import OperationalTab from "@/components/transportation/operation/OperationalTab"
import CostTab from "@/components/transportation/cost/CostTab"
import LoadTab from "@/components/transportation/load/LoadTab"
import ServiceTab from "@/components/transportation/service/ServiceTab"

export default function USATransportCostingPage() {
  return (
    <div className="w-full p-6 space-y-6">
      <div className="border border-gray-200 rounded-lg p-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display">Ferguson Fleet & Transportation Analysis</h1>
      </div>
      <Tabs defaultValue="service">
        <TabsList>
          <TabsTrigger value="executive">Executive</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="service">Service</TabsTrigger>
          <TabsTrigger value="loading">Loading Efficiency</TabsTrigger>
          <TabsTrigger value="cost">Cost</TabsTrigger>
        </TabsList>
        <TabsContent value="executive">
          <ExecutiveTab />
        </TabsContent>
        <TabsContent value="operations">
          <OperationalTab />
        </TabsContent>
        <TabsContent value="cost">
          <CostTab />
        </TabsContent>
        <TabsContent value="loading">
          <LoadTab />
        </TabsContent>
        <TabsContent value="service">
          <ServiceTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

