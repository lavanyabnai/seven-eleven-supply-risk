import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DamageTab from "@/components/transportation/load/DamageTab"
import UtilizationTab from "@/components/transportation/load/UtilizationTab"


export default function CostTab() {
  return (
    
    <Tabs defaultValue="utilization">
      <TabsList>
        <TabsTrigger value="utilization">Utilization</TabsTrigger>
        <TabsTrigger value="damage">Damage Rate</TabsTrigger>
       
      </TabsList>
      <TabsContent value="utilization">
        <UtilizationTab/>
      </TabsContent>
      <TabsContent value="damage">
       <DamageTab/>
      </TabsContent>
     
    
    </Tabs>
  )
}
