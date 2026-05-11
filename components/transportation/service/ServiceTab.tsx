import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OnTimeDeliveryHeatmap from "@/components/transportation/service/OnTimeDeliveryHeatmap"
import OnTimeDeliveryTrend from "@/components/transportation/service/OnTimeDeliveryTrend"
import OnTimeDeepDive from "@/components/transportation/service/OnTimeDeepDive"


export default function ServiceTab() {
  return (
    <div>
           <div className="my-2 p-4 rounded-lg border bg-white">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display ">
                        On-Time Delivery
                    </h2>
                </div>
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <OnTimeDeliveryHeatmap />
      </div>
        <div className="col-span-1">
        <OnTimeDeliveryTrend />
       
        </div>
    </div>
    <div className="mt-4">
        <OnTimeDeepDive />
    
    </div>
    </div>
  )
}
