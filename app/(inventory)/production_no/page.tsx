'use client';

import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { production_no as production_noSchema } from '@/db/schema';
import { useBulkCreateproduction_nos } from '@/features/production_no/api/use-bulk-create-production_nos';
import { useBulkDeleteproduction_nos } from '@/features/production_no/api/use-bulk-delete-production_nos';
import { useGetProduction_no } from '@/features/production_no/api/use-get-production_no';
import { useNewProduction_no } from '@/features/production_no/hooks/use-new-production_no';
import { columns } from './columns';
// import { useSelectAccount } from '@/features/accounts/hooks/use-select-account';

import { ImportCard } from './import-card';
import { UploadButton } from './upload-button';

enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT'
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {}
};

export default function Production_nosPage() {

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

  const newProduction_no = useNewProduction_no();
  const createProduction_no = useBulkCreateproduction_nos();
  const deleteProduction_no = useBulkDeleteproduction_nos();
  const production_noQuery = useGetProduction_no();
  const production_no = production_noQuery.data || [];

  const isDisabled = production_noQuery.isLoading || deleteProduction_no.isPending;
  // const isDisabled = production_nosQuery.isLoading || deleteProduction_nos.isPending;

  const onSubmitImport = async (values: typeof production_noSchema.$inferInsert[]) => {
    // const accountId = await confirm();

    // if (!accountId) {
    //   return toast.error('Please select an account to continue.');
    // }

    const data = values.map((value) => ({
      ...value
      // ...value
      // accountId: accountId as string
    }));

    createProduction_no.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if (production_noQuery.isLoading) {
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
        <CardTitle className="text-xl line-clamp-1">Production_no List</CardTitle>
        <div className="flex flex-col lg:flex-row gap-2 items-center">
          <Button
           onClick={newProduction_no.onOpen}
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
          placeHolder="Filter By Label..."
          filterKey="label"
          columns={columns}
          data={production_no as typeof production_noSchema.$inferSelect[]}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteProduction_no.mutate({ ids });
          }}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
}
