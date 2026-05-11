import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  WrenchScrewdriverIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline';

import { Treemap, ResponsiveContainer } from "recharts";


const data = [
  {
    name: "axis",
    children: [
      { name: "Plumbing", size: 3400 },
      { name: "HVAC", size: 2100 },
      { name: "Waterworks", size: 1200 },
      { name: "PVF", size: 950 },
      { name: "Appliances", size: 850 },
    ],
  },

];

const kpi = {

  status: '',

}
export default function HeatMapOrder() {
  // const emptyStyles = { background: '#ef4444' };
  // const progressStyles = { background: '#22c55e' };

  return (
    <Card >
      <div className="relative rounded-lg">
        <span
          className={`absolute inset-x-0 top-0 h-1 rounded-lg ${kpi.status === 'Above Target'
            ? `bg-green-500`
            : kpi.status === 'Below Target'
              ? `bg-red-500`
              : 'bg-yellow-500'
            }`}
        ></span>
      </div>

      <CardHeader className="px-4 py-2">

        <div className="my-2 flex items-baseline gap-2 ">

          <div>
            <h2 className="text-base font-medium text-gray-900">
              Daily Lines Processed per FTE
            </h2>
            <h1 className="text-4xl font-bold text-black">
              185
            </h1>
          </div>
        </div>
      </CardHeader >
      <CardContent className="px-4 py-2">
        <ResponsiveContainer width="100%" height={240}>
          <Treemap
            data={data}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
          />
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center font-medium ">
            Top performers averaging 220+ lines/day
          </div>
          <div className="flex items-center gap-x-2 leading-none text-muted-foreground">
            January - June 2024
          </div>
        </div>
      </CardFooter>
      <CardFooter className="flex divide-x divide-gray-200 bg-gray-50 border-t p-0 ">

        <div className="flex w-0 flex-1">
          <Link
            href='' // Fixed here
            className="relative -mr-px inline-flex flex-1 items-center justify-center gap-x-2 border border-transparent text-sm font-semibold  hover:bg-rose-500 hover:text-white rounded-bl-lg"
          >
            <span className="py-4 inline-flex flex-1 items-center justify-center gap-x-3 text-sm font-semibold hover:text-white">
              <WrenchScrewdriverIcon
                className="h-5 w-5"
                aria-hidden="true"
              />
              Analyze
            </span>
          </Link>
        </div>

        <div className="-ml-px flex flex-1">
          <Link
            href='' // Fixed here
            className="relative -mr-px inline-flex flex-1 items-center justify-center gap-x-2 border border-transparent text-sm font-semibold hover:bg-rose-500 hover:text-white rounded-br-lg"
          >
            <span className="py-4 inline-flex flex-1 items-center justify-center gap-x-3 text-sm font-semibold hover:text-white">
              <CircleStackIcon
                className="h-5 w-5"
                aria-hidden="true"
              />
              Explore Data
            </span>
          </Link>
        </div>

        {/* <div className="-ml-px flex flex-1">
          <Link
            href='' // Fixed here
            className="relative -mr-px inline-flex flex-1 items-center justify-center gap-x-2 border border-transparent text-sm font-semibold hover:bg-rose-500 hover:text-white rounded-br-lg"
          >
            <span className="py-4 inline-flex flex-1 items-center justify-center gap-x-3 text-sm font-semibold hover:text-white">
              <LightBulbIcon className="h-5 w-5" aria-hidden="true" />
              Insights
            </span>
          </Link>
        </div> */}

      </CardFooter>
    </Card>
  );
}
