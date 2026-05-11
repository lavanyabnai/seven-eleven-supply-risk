import ReceivingTable from "@/components/warehouse/receiving/ReceivingTab";
import PutawayTab from "@/components/warehouse/putaway/PutawayTab";
import PickingTab from "@/components/warehouse/picking/PickingTab";
import ShippingTab from "@/components/warehouse/shipping/ShippingTab";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="h-full ">
      <Tabs defaultValue="receiving">
          <TabsList >
            <TabsTrigger value="receiving">Receiving</TabsTrigger>
            <TabsTrigger value="putaway">Putaway</TabsTrigger>
          <TabsTrigger value="picking">Picking</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>

        <TabsContent value="receiving">
          <ReceivingTable />
        </TabsContent>
        <TabsContent value="putaway">
          <PutawayTab />
        </TabsContent>
        <TabsContent value="picking">
          <PickingTab />
        </TabsContent>
        <TabsContent value="shipping">
          <ShippingTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};