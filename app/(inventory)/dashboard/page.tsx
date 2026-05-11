'use client';

import { kpiService_m } from '@/app/data/dashboard/inventoryData';
import CardLayout from '@/components/CardLayout';


export default function Flowchart() {
  return (
    <>
      <div className="m-4">
        <div className="w-100 my-2 flex  justify-between p-4 rounded-lg border bg-white">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display">
            Availability Analytics
          </h2>

          <div className="flex items-center justify-end"></div>
        </div>

        <div className="flex items-center justify-center  rounded-t-lg bg-gradient-to-t from-indigo-400 via-cyan-400 to-sky-500 shadow-lg p-0.5">
          <div className=" flex items-center w-full justify-between bg-sky-50  border rounded-t-lg text-2xl text-blue-900 font-bold">
            <div className="p-2">Inventory Dashboard</div>
         
          </div>
        </div>

        <div>
          {' '}
          <main>
            <CardLayout kpiData={kpiService_m} />
          </main>
        </div>
      </div>
    </>
  );
}
