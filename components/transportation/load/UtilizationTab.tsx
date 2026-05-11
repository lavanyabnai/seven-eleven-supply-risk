'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaHome } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import UtilizationHeatmap from "./UtilizationHeatmap";
import { UtilizationBar } from "./UtilizationBar";
import { UtilizationDeep } from "./UtilizationDeep";
export default function UtilizationTab() {


    return (
        <div>
            
            <Tabs defaultValue="daily">
                <div className="mt-2 w-100 p-4 rounded-lg border bg-white">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display ">
                        Utilization Dashboard
                    </h2>
                </div>
                <TabsContent value="daily">
                    <div className="my-4 grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                            <UtilizationHeatmap />
                            </div>
                        <div className="">
                            <UtilizationBar />
                        </div>
                      
                    </div>
                    <div className="">
                            <UtilizationDeep />
                        </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}