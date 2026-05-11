'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaHome } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { TransportationBar } from "./TransportationBar";
import DamageRateBar from "./DamageRateBar";
import OnTimeBar from "./OnTimeBar";
import { ModeMixBar } from "./ModeMixBar";
import { RoutingGuideBar } from "./RoutingGuideBar";
import { Utilization } from "./Utilization";
import CarrierLine from "./FreightLine";

export default function OperationalTab() {


    return (
        <div>
            <Tabs defaultValue="daily">
                <div className="mt-2 w-100 grid grid-cols-4 p-4 rounded-lg border bg-white">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display ">
                        Operational Dashboard
                    </h2>
                    <div className="flex gap-10 text-blue-500 text-5xl">
                        <FaHome />
                       <div className="flex items-center gap-2">
                       <FaQuestionCircle />
                       </div>
                    </div>
                </div>
                <TabsContent value="daily">
                    <div className="grid grid-cols-2 gap-3">
                        <TransportationBar />
                        <DamageRateBar />
                        <OnTimeBar />

                        <ModeMixBar />
                        <RoutingGuideBar />
                        <Utilization />
                        <CarrierLine />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}