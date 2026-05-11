import InsightsTab from "@/components/warehouse/control/Insights/InsightTab";

import MultipleChartTypes from "@/components/warehouse/control/MultipleChartTypes";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import AlertsTab  from "@/components/warehouse/AlertsTab";


export default function ControlTab() {

  
  return (
    <div className="h-full ">
      <Tabs defaultValue="insights">
        <TabsList >
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="insights">
          <InsightsTab />
          <MultipleChartTypes />
        </TabsContent>
        <TabsContent value="alerts">
          {/* <ControlTower /> */}
          <AlertsTab />
        </TabsContent>
      </Tabs>
  
      {/* <MultipleChartTypes /> */}
    </div>
  );  
};