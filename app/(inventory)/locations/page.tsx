'use client';

import { Loader2, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { locations as locationSchema } from '@/db/schema';
import { useBulkCreateLocations } from '@/features/locations/api/use-bulk-create-locations';
import { useBulkDeleteLocations } from '@/features/locations/api/use-bulk-delete-locations';
import { useGetLocations } from '@/features/locations/api/use-get-locations';
import { useNewLocation } from '@/features/locations/hooks/use-new-location';

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

export default function LocationsPage() {
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

  const newLocation = useNewLocation();
  const tableActions = useTableActions()
  const importDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    tableActions?.registerAddHandler(newLocation.onOpen)
    return () => tableActions?.registerAddHandler(null)
  }, [tableActions, newLocation.onOpen])

  useEffect(() => {
    const btn = importDivRef.current?.querySelector('button') as HTMLButtonElement | null
    tableActions?.registerImportRef(btn)
    return () => tableActions?.registerImportRef(null)
  }, [tableActions])

  const createLocations = useBulkCreateLocations();
  const deleteLocations = useBulkDeleteLocations();
  const locationsQuery = useGetLocations();
  const locations = locationsQuery.data || [];
  
  const isDisabled = locationsQuery.isLoading || deleteLocations.isPending;

  const onSubmitImport = async (
    values: (typeof locationSchema.$inferInsert)[]
  ) => {
    const data = values.map((value) => ({
      ...value
    }));
    
    createLocations.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if (locationsQuery.isLoading) {
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
           data={locations.map(location => ({
            ...location,
            createdAt: location.createdAt ? new Date(location.createdAt) : new Date(),
            updatedAt: location.updatedAt ? new Date(location.updatedAt) : new Date()
          }))}
          onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteLocations.mutate({ ids });
            }}
          disabled={isDisabled}
        />

    </div>
  );
}
