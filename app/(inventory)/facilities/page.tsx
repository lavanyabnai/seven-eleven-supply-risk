'use client';

import { Loader2, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { facilities as facilitySchema } from '@/db/schema';
import { useBulkCreateFacilities } from '@/features/facilities/api/use-bulk-create-facilities';
import { useBulkDeleteFacilities } from '@/features/facilities/api/use-bulk-delete-facilities';
import { useGetFacilities } from '@/features/facilities/api/use-get-facilities';
import { useNewFacility } from '@/features/facilities/hooks/use-new-facility';

import { columns } from './columns';
import { ImportCard } from './import-card';
import { UploadButton } from './upload-button';
import { useTableActions } from '@/components/risk/table-actions-context';


enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT'
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {}
};

export default function FacilitiesPage() {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const newFacility = useNewFacility();
  const tableActions = useTableActions()
  const importDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    tableActions?.registerAddHandler(newFacility.onOpen)
    return () => tableActions?.registerAddHandler(null)
  }, [tableActions, newFacility.onOpen])

  useEffect(() => {
    const btn = importDivRef.current?.querySelector('button') as HTMLButtonElement | null
    tableActions?.registerImportRef(btn)
    return () => tableActions?.registerImportRef(null)
  }, [tableActions])

  const createFacilities = useBulkCreateFacilities();
  const deleteFacilities = useBulkDeleteFacilities();
  const facilitiesQuery = useGetFacilities();
  const facilities = facilitiesQuery.data || [];

  const isDisabled = facilitiesQuery.isLoading || deleteFacilities.isPending;

  const onSubmitImport = async (
    values: (typeof facilitySchema.$inferInsert)[]
  ) => {
    // const accountId = await confirm();

    // if (!accountId) {
    //   return toast.error('Please select an account to continue.');
    // }

    const data = values.map((value) => ({
      ...value,
      location_name: value.locationId ? String(value.locationId) : "Unknown",
    }));

    createFacilities.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if (facilitiesQuery.isLoading) {
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

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        {/* <AccountDialog /> */}
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    );
  }

  return (
    <div className="font-sans">
      <div ref={importDivRef} className="sr-only">
        <UploadButton onUpload={onUpload} />
      </div>

      <DataTable
          filterKey="name"
          columns={columns}
          data={facilities.map(facility => ({
            ...facility,
            locationName: facility.locationName ?? null,
            type: facility.type ?? null,
            icon: facility.icon ?? null,
            initiallyOpen: facility.initiallyOpen ?? null,
            createdAt: facility.createdAt ? new Date(facility.createdAt) : new Date(),
            updatedAt: facility.updatedAt ? new Date(facility.updatedAt) : new Date()
          }))}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteFacilities.mutate({ ids });
          }}
          disabled={isDisabled}
        />
  </div>
  
  );
}
