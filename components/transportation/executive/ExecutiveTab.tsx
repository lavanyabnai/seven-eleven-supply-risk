'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SalesRatioLine from "./SalesRatioLine";
import  OnTimeBar from "./OnTimeBar";
import DamageBar from "./DamageBar";
import { ModeMixBar } from "./ModeMixBar";
import { FaHome } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
export default function ExecutiveTab() {


    return (
        <div>
            <Tabs defaultValue="daily">
                <div className="my-2 p-4 rounded-lg border bg-white">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display ">
                        Executive Overview
                    </h2>
                    {/* <div className="flex gap-10 text-blue-500 text-5xl">
                        <FaHome />
                       <div className="flex items-center gap-2">
                       <FaQuestionCircle />
                       </div>
                    </div> */}
                </div>
                <TabsContent value="daily">
                    <div className=" grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                        <SalesRatioLine />
                        <OnTimeBar />
                            <DamageBar />
                        <ModeMixBar />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}