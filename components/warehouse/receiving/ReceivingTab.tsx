'use client';

import Statscard from '@/components/warehouse/receiving/Statscard';
import ColumnInter from '@/components/warehouse/receiving/ColumnInter';
import StatsLine from '@/components/warehouse/receiving/StatsLine';
import StatsColumn from '@/components/warehouse/receiving/StatsColumn';
import StatsStackCol from '@/components/warehouse/receiving/StatsStackCol';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReceivingTab() {
    return (
            <div>
                <Tabs defaultValue="daily">
                    <div className="mt-2 w-100 flex justify-between p-4 rounded-lg border bg-white">
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display">
                            Receiving Process
                        </h2>

                        <div className="flex items-center justify-end">
                            <TabsList className="w-full">
                                <TabsTrigger value="daily">Daily</TabsTrigger>
                                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                                <TabsTrigger value="monthly">Monthly</TabsTrigger>

                            </TabsList>
                        </div>
                    </div>
                    <TabsContent value="daily">
                        <div className="py-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                            <StatsColumn />
                            <StatsLine />
                            <StatsStackCol />
                            <Statscard />
                        </div>
                        <ColumnInter />
                    </TabsContent>
                    <TabsContent value="weekly">
                    <div className="py-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                            <StatsColumn />
                            <StatsLine />
                            <StatsStackCol />
                            <Statscard />
                        </div>
                        <ColumnInter />
                    </TabsContent>
                    <TabsContent value="monthly">
                    <div className="py-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                            <StatsColumn />
                            <StatsLine />
                            <StatsStackCol />
                            <Statscard />
                        </div>
                        <ColumnInter />
                    </TabsContent>

                </Tabs>
            </div>
    );
}