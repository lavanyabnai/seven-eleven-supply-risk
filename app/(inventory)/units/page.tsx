'use client';

import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { UploadButton } from '@/components/upload-button';
import { units as unitSchema } from '@/db/schema';
import { useBulkCreateUnits } from '@/features/units/api/use-bulk-create-units';
import { useBulkDeleteUnits } from '@/features/units/api/use-bulk-delete-units';
import { useGetUnits } from '@/features/units/api/use-get-units';
import { useNewUnit } from '@/features/units/hooks/use-new-unit';

// import { useSelectAccount } from '@/features/accounts/hooks/use-select-account';


import { columns } from './columns';
import { ImportCard } from './import-card';

enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT'
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {}
};

export default function UnitsPage() {
  // const [AccountDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);


  const onUpload = (results: { data: unknown[] }) => {
    setImportResults({
      data: results.data as never[],
      errors: [],
      meta: {}
    });
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const newUnit = useNewUnit();
  const createUnits = useBulkCreateUnits();
  const deleteUnits = useBulkDeleteUnits();
  const unitsQuery = useGetUnits();
  const units = unitsQuery.data || [];
  

  const isDisabled = unitsQuery.isLoading || deleteUnits.isPending;

  const onSubmitImport = async (
    values: (typeof unitSchema.$inferInsert)[]
  ) => {
    // const accountId = await confirm();

    // if (!accountId) {
    //   return toast.error('Please select an account to continue.');
    // }

    const data = values.map((value) => ({
      ...value
      // accountId: accountId as string
    }));
    

    createUnits.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if (unitsQuery.isLoading) {
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
    <div className="max-w-screen-6xl mx-auto w-full">
      <div className="flex flex-col px-4 py-2 m-0.5 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-xl line-clamp-1">Unit List</CardTitle>
        <div className="flex flex-col lg:flex-row gap-2 items-center">
          <Button
            onClick={newUnit.onOpen}
            size="sm"
            className="w-full lg:w-auto"
          >
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
          <UploadButton onUpload={onUpload} />
        </div>
      </div>
      <Separator />
      <div className="px-4">
        <DataTable
          filterKey="customerId"
          columns={columns}
          data={units.map(unit => ({
            ...unit,
            name: unit.name?.toString() ?? '',
            createdAt: unit.createdAt,
            updatedAt: unit.updatedAt
          }))}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteUnits.mutate({ ids });
          }}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
}
