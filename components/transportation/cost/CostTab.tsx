import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Heatmap from "./heatmap"
import PrimeTab from "@/components/transportation/cost/PrimeTab"
import CarrierScoreTab from "@/components/transportation/cost/CarrierScoreTab"
import Top20CarriersTab from "@/components/transportation/cost/Top20CarriersTab"
export default function CostTab() {
  return (
    <Tabs defaultValue="top20">
      <TabsList>
        <TabsTrigger value="top20">Top 20 Carriers</TabsTrigger>
        <TabsTrigger value="scorecard">Carrier Scorecard</TabsTrigger>
        <TabsTrigger value="prime">Prime Tender Acceptance Rate</TabsTrigger>
       
      </TabsList>
      <TabsContent value="top20">
<Top20CarriersTab />
      </TabsContent>
      <TabsContent value="scorecard">
        
          <CarrierScoreTab />
  
      </TabsContent>
      
      <TabsContent value="prime">
        <PrimeTab />
      </TabsContent>
    
    </Tabs>
  )
}
