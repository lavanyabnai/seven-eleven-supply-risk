'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ProductTable,
  CustomerTable,
  InventoryTable,
  ExcessTable,
} from './ProductTable'
import ServiceTab from "@/components/analysis/service"
import ActionTab from "@/components/analysis/action"
import UnderAnalysisTab from "@/components/analysis/under"
import SkuProTab from "@/components/analysis/skupro"
import SkuTab from "@/components/analysis/sku"

export default function OrderTrackingTab() {
  return (
    <>
      <div className="bg-white rounded-lg border">
        <div className="flex items-center w-full justify-between border rounded-t-lg text-2xl text-blue-900 font-bold">
          <div className="p-2">Ferguson Order Tracking & Analysis</div>
        </div>

        <div className="flex justify-center">
          <ul className="timeline">
            <li>
              <div className="timeline-middle text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">Supplier PO Placed</div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">
                Supplier Dispatched
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">DC Received & Sorted</div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">Branch / Jobsite Delivered</div>
            </li>
          </ul>
        </div>

        <div className="m-2">
          <Tabs defaultValue="Product" className="tracking-normal">
            <TabsList className="">
              <TabsTrigger value="Product" className="relative">
                Product
              </TabsTrigger>
              <TabsTrigger value="Customer">
                Customer
              </TabsTrigger>
              <TabsTrigger value="Inventory">
                Inventory
              </TabsTrigger>
              <TabsTrigger value="Service">
                Service Levels
              </TabsTrigger>
              <TabsTrigger value="SKU">
                SKU
              </TabsTrigger>
              <TabsTrigger value="SkuPro">
                SKU Pro
              </TabsTrigger>
              <TabsTrigger value="Under">
                Under/Shape Demand
              </TabsTrigger>
              <TabsTrigger value="Redeploy">
                Redeploy Stock
              </TabsTrigger>
            </TabsList>

            <TabsContent value="Product">
              <div className="py-2">
                <ProductTable />
              </div>
            </TabsContent>

            <TabsContent value="Customer">
              <div className="py-2">
                <CustomerTable />
              </div>
            </TabsContent>

            <TabsContent value="Inventory">
              <div className="py-2">
                <div className="mb-2">
                  <InventoryTable />
                </div>
                <ExcessTable />
              </div>
            </TabsContent>

            <TabsContent value="Service">
              <ServiceTab />
            </TabsContent>

            <TabsContent value="SKU">
              <SkuTab />
            </TabsContent>

            <TabsContent value="SkuPro">
              <SkuProTab />
            </TabsContent>

            <TabsContent value="Under">
              <UnderAnalysisTab />
            </TabsContent>

            <TabsContent value="Redeploy">
              <ActionTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
