'use client';

import { DataTable } from '@/components/data-table';

import { DataFilters } from "@/components/warehouse/control/alerts/data-filters";
import { columns } from '@/components/warehouse/control/alerts/columns';

import tasks from '@/components/warehouse/control/alerts/tasks.json';


// import { useGetAlerts } from "@/features/alerts/api/use-get-alerts";
// import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";




export default function AlertsTab() {
    // const workspaceId = useWorkspaceId();
    // const { data: alerts } = useGetAlerts({ workspaceId });




    return (
        <div className="max-w-screen-6xl mx-auto w-full">
          
            <div className="px-4">
                <DataFilters />
                <DataTable
                    filterKey="id"
                    columns={columns}
                    // data={alerts?.documents || []}
                    data={tasks.map(task => ({
                        ...task,
                        details: '',
                        type: task.risk,
                        process: '',
                        action: task.resolution,
                        owner: ''
                    }))}
                    onDelete={() => { }}
                />
            </div>

        </div>
    );
}
