'use client';

import { Loader2, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { Skeleton } from '@/components/ui/skeleton';
import { vehicleTypes as vehicleTypeSchema } from '@/db/schema';
import { useBulkCreatevehicleTypes } from '@/features/vehicleTypes/api/use-bulk-create-vehicleTypes';
import { useBulkDeletevehicleTypes } from '@/features/vehicleTypes/api/use-bulk-delete-vehicleTypes';
import { useGetVehicleTypes } from '@/features/vehicleTypes/api/use-get-vehicleTypes';
import { useNewvehicleType } from '@/features/vehicleTypes/hooks/use-new-vehicleType';

// import { useSelectAccount } from '@/features/accounts/hooks/use-select-account';


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

export default function VehicleTypesPage() {
  // const [AccountDialog, confirm] = useSelectAccount();
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

  const newvehicleType = useNewvehicleType();
  const createvehicleTypes = useBulkCreatevehicleTypes();
  const deletevehicleTypes = useBulkDeletevehicleTypes();
  const vehicleTypesQuery = useGetVehicleTypes();
  const vehicleTypes = vehicleTypesQuery.data || [];

  const tableActions = useTableActions();
  const importDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tableActions?.registerAddHandler(newvehicleType.onOpen);
    return () => tableActions?.registerAddHandler(null);
  }, [tableActions, newvehicleType.onOpen]);

  useEffect(() => {
    const btn = importDivRef.current?.querySelector('button') as HTMLButtonElement | null;
    tableActions?.registerImportRef(btn);
    return () => tableActions?.registerImportRef(null);
  }, [tableActions]);

  const isDisabled = vehicleTypesQuery.isLoading || deletevehicleTypes.isPending;

  const onSubmitImport = async (
    values: (typeof vehicleTypeSchema.$inferInsert)[]
  ) => {
    // const accountId = await confirm();

    // if (!accountId) {
    //   return toast.error('Please select an account to continue.');
    // }

    const data = values.map((value) => ({
      ...value
      // accountId: accountId as string
    }));
    

    createvehicleTypes.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if (vehicleTypesQuery.isLoading) {
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
          data={vehicleTypes}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deletevehicleTypes.mutate({ ids });
          }}
          disabled={isDisabled}
        />
    </div>
  );
}
