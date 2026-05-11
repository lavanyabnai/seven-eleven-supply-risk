'use client';
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs"
import ColumnChartSort from '@/components/warehouse/control/Insights/ColumnChartSort';
import LineChartOver from '@/components/warehouse/control/Insights/LineChartOver';
import BarChartOver from '@/components/warehouse/control/Insights/BarChartOver';
import ColumnChartLine from "@/components/warehouse/control/Insights/ColumnChartLine";
import HeatMapLine from "@/components/warehouse/control/Insights/HeatMapLine";
import LineChartOtif from "@/components/warehouse/control/Insights/LineChartOtif";
import ColumnChartDaily from "@/components/warehouse/control/Insights/ColumnChartDaily";
import AreaChartTruck from "@/components/warehouse/control/Insights/AreaChartTruck";
import HeatMap from "@/components/warehouse/control/Insights/HeatMapOrder";

export default function InsightsTab() {
  return (
    <>
      <div>
        <Tabs defaultValue="plan">
        <div className="mt-2 w-100 flex justify-between p-4 rounded-lg border bg-white">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display">
            DC Performance Insights
          </h2>

          <div className="flex items-center justify-end">
              <TabsList className="w-full">
                {/* <TabsTrigger value="plan">Planning</TabsTrigger>
                <TabsTrigger value="execution">Execution</TabsTrigger> */}
              </TabsList>
              </div>
          </div>

          <TabsContent value="plan">
            <div className="py-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
         
              <ColumnChartSort />
              <LineChartOver />
              <BarChartOver />
              <ColumnChartLine />
              <LineChartOtif />
              <ColumnChartDaily />
              <AreaChartTruck />
              <HeatMapLine />
              <HeatMap />
            
            </div>
       
          </TabsContent>
          <TabsContent value="execution">
            <ul className="py-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              <AreaChartTruck />
            </ul>
            <ColumnChartSort />
          </TabsContent>
      
        </Tabs>
      </div>
    </>
  );
}
