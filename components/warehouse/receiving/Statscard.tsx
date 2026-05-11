
import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

import { TrendingUp } from 'lucide-react';
import { MetricCard } from "@/components/warehouse/metric-card"


const kpi = {
  title: "Yearly",
  value: 1000,
  status: "Above Target",
}

export default function Statscard() {
  return (
    <>
      <Card  >
        <div className="relative rounded-lg">
          <span
            className={`absolute inset-x-0 top-0 h-1 rounded-lg ${kpi.status === 'Above Target'
              ? `bg-green-500`
              : kpi.status === 'Below Target'
                ? `bg-red-500`
                : ''}`}
          ></span>
        </div><CardHeader className="px-4 py-2">

          <div className="my-2 flex items-baseline gap-2 ">

            <div>
              <h2 className="text-base font-medium text-gray-900">
                Quality Metrics
              </h2>
              <h1 className="text-3xl font-bold text-black">
              
              </h1>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4">

          <div className="mt-2 grid grid-cols-2 gap-2">
            <MetricCard title="Total damages (value)" value="$10,000" change="" icon="" />
            <MetricCard title="Total damages (#)" value="3" change="" icon="" />
            <MetricCard title="Receipt accuracy rate" value="99%" change="" icon="" />
            <MetricCard title="Returned Lines" value="7%" change="" icon="" />
          </div>
        </CardContent>


        <CardFooter >

          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Damages from supplier X 9 times - highest this year
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                January - June 2024
              </div>
            </div>
          </div>

        </CardFooter>

      </Card >
    </>
  );
}
