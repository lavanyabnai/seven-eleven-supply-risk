import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DamageRateHeatmap from "@/components/transportation/load/DamageRateHeatmap"
import DamageRateTrend from "@/components/transportation/load/DamageRateTrend"
import DamageRateDeepDive from "@/components/transportation/load/DamageRateDeepDive"
export default function DamageTab() {
  return (
    <div>
           <div className="my-2 p-4 rounded-lg border bg-white">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display ">
                        Damage Rate Dashboard
                    </h2>
                </div>
    <div className="my-4 grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <DamageRateHeatmap />
       
      </div>
      <div className="col-span-1">
      <DamageRateTrend />
      </div>
    </div>
   
        <DamageRateDeepDive />
    
  
    </div>
  )
}
