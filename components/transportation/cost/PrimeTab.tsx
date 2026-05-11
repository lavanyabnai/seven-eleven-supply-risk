'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PrimeTender from "@/components/transportation/cost/PrimeTender";
import ValueLoss from "@/components/transportation/cost/ValueLoss";
import DeepDrive from "@/components/transportation/cost/DeepDrive";

export default function PrimeTab() {

    return (
        <div>
            <Tabs defaultValue="daily">
                <div className="mt-2 w-100 p-4 rounded-lg border bg-white">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display ">
                        Prime Tender Acceptance Scorecard
                    </h2>
                </div>
                <TabsContent value="daily">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="grid grid-cols-1 gap-3">
                        <PrimeTender />
                        </div>
                        <div className="grid  col-span-2 gap-3">
                        <ValueLoss />
                        </div>
                        <div className="grid  col-span-3">
                        <DeepDrive />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}