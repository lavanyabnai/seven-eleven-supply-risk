'use client';
import taskData from '@/app/data/riskData/simulation/tasks.json';

import { columns } from '@/components/risk/columns';
import { DataTable } from '@/components/risk/data-table';
import { ColumnDef } from '@tanstack/react-table';

export default function RiskSimulation() {
  return (
    <div className="ml-4 mt-4 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-xl">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-blue-700 font-sans">
            Simulation
          </h2>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-b-lg p-2 border">
        <DataTable data={taskData as any} columns={columns as ColumnDef<any, unknown>[]} />
      </div>
    </div>
  );
}