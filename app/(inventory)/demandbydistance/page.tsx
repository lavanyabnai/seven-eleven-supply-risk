'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Loader2 } from 'lucide-react';


import { DataTable } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';







import { useGetdemandbydistances } from '@/features/demandbydistance/api/use-get-demandbydistances';




import { columns } from './columns';



export default function DemandByDistancePage() {
  // const [AccountDialog, confirm] = useSelectAccount();

  const demandbydistanceQuery = useGetdemandbydistances();

  const isDisabled = demandbydistanceQuery.isLoading;

  if (demandbydistanceQuery.isLoading) {
    return (
      <div className="max-w-screen-6xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-6xl mx-auto w-full">
      <div className="flex flex-col px-4 py-2 m-0.5 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-xl line-clamp-1">
          Demand Coverage by Distance
        </CardTitle>
        {/* <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
        <Button
            onClick={newLocation.onOpen}
          size="sm"
          className="w-full lg:w-auto"
        >
          <Plus className="size-4 mr-2" />
          Add new
        </Button>
        <UploadButton onUpload={onUpload} />
      </div> */}
      </div>
      <Separator />
      <div className="px-4">
        <DataTable
          filterKey="name"
          columns={columns as ColumnDef<{ id: number; updatedAt: Date | null; siteId: number; siteName: string | null; distanceToSiteKm: string | null; demandPercentage: string | null; demandM3: string | null; }>[] }
          data={(demandbydistanceQuery.data ?? []).map(item => ({
            ...item,
            updatedAt: item.updatedAt ? new Date(item.updatedAt) : null
          }))}
          // onDelete={(row) => {
          //     const ids = row.map((r) => r.original.id);
          //     deletecoglocation.mutate({ ids });
          //   }}
          disabled={isDisabled}
          onDelete={function (
          ): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
    </div>
  );
}