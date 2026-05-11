'use client';

import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { UploadButton } from '@/components/upload-button';
import { periodGroups as periodgroupsSchema } from '@/db/schema';
import { useBulkCreatePeriodgroups } from '@/features/periodgroups/api/use-bulk-create-periodgroups';
import { useBulkDeletePeriodgroups } from '@/features/periodgroups/api/use-bulk-delete-periodgroups';
import { useGetPeriodgroups } from '@/features/periodgroups/api/use-get-periodgroups';
import { useNewPeriodsgroup } from '@/features/periodgroups/hooks/use-new-periodgroup';

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



export default function PeriodgroupssPage() {
  // const [AccountDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);


  const onUpload = (results: { data: unknown[]; }) => {
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

  const newPeriodgroup = useNewPeriodsgroup();
  const createPeriodgroups = useBulkCreatePeriodgroups();
  const deletePeriodgroups = useBulkDeletePeriodgroups();
  const periodgroupsQuery = useGetPeriodgroups();
    const periodgroups = periodgroupsQuery.data || [];
  

  const isDisabled = periodgroupsQuery.isLoading || deletePeriodgroups.isPending;

  const onSubmitImport = async (
    values: (typeof periodgroupsSchema.$inferInsert)[]
  ) => {
    // const accountId = await confirm();

    // if (!accountId) {
    //   return toast.error('Please select an account to continue.');
    // }

    const data = values.map((value) => ({
      ...value
      // accountId: accountId as string
    }));
    

    createPeriodgroups.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if (periodgroupsQuery.isLoading) {
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
        <CardTitle className="text-xl line-clamp-1">Periodgroups List</CardTitle>
        <div className="flex flex-col lg:flex-row gap-2 items-center">
          <Button
            onClick={newPeriodgroup.onOpen}
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
          placeHolder="Search by name"
          filterKey="name"
          columns={columns}
          data={periodgroups}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deletePeriodgroups.mutate({ ids });
          }}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
}
