'use client';

import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { saleBatches as salesbatcheSchema } from '@/db/schema';
import { useBulkCreateSalesbatches } from '@/features/salesbatches/api/use-bulk-create-salesbatches';
import { useBulkDeleteSalesbatches } from '@/features/salesbatches/api/use-bulk-delete-salesbatches';
import { useGetSalesbatches } from '@/features/salesbatches/api/use-get-salesbatches';
import { useNewSalesbatche } from '@/features/salesbatches/hooks/use-new-salesbatche';


import { columns } from './columns';
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

export default function SalesbatchesPage() {

  // const [AccountDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);


  const onUpload = (data: unknown) => {
    setImportResults(data as typeof INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const newSalesbatche = useNewSalesbatche();
  const createSalesbatches = useBulkCreateSalesbatches();
  const deleteSalesbatches = useBulkDeleteSalesbatches();
  const salesbatchesQuery = useGetSalesbatches();
  const salesbatches = salesbatchesQuery.data || [];

  const isDisabled = salesbatchesQuery.isLoading || deleteSalesbatches.isPending;
  // const isDisabled = salesbatchesQuery.isLoading || deleteSalesbatches.isPending;

  const onSubmitImport = async (values: typeof salesbatcheSchema.$inferInsert[]) => {
    const data = values.map((value) => ({
      ...value
    }));

    createSalesbatches.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if (salesbatchesQuery.isLoading) {
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
       <div className="max-w-screen-6xl mx-auto w-full">
      <div className="flex flex-col px-4 py-2 m-0.5 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-xl line-clamp-1">Sales batches List</CardTitle>
        <div className="flex flex-col lg:flex-row gap-2 items-center">
          <Button
           onClick={newSalesbatche.onOpen}
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
          placeHolder="Search salesbatches"
          filterKey="sourceName"
          columns={columns}
          data={salesbatches}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
              deleteSalesbatches.mutate({ ids });
          }}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
}
