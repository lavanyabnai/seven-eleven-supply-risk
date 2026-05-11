'use client';

import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { co2Emissions as co2facilitieSchema } from '@/db/schema';
import { useBulkCreateCo2facilities } from '@/features/co2facilities/api/use-bulk-create-co2facilities';
import { useBulkDeleteCo2facilities } from '@/features/co2facilities/api/use-bulk-delete-co2facilities';
import { useGetCo2facilities } from '@/features/co2facilities/api/use-get-co2facilities';
import { useNewCo2facilitie } from '@/features/co2facilities/hooks/use-new-co2facilitie';

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

export default function Co2facilitiesPage() {
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

  const newCo2facilitie = useNewCo2facilitie();
  const createCo2facilities = useBulkCreateCo2facilities();
  const deleteCo2facilities = useBulkDeleteCo2facilities();
  const co2facilitiesQuery = useGetCo2facilities();
  const co2facilities = co2facilitiesQuery.data || [];

  const isDisabled = co2facilitiesQuery.isLoading || deleteCo2facilities.isPending;

  const onSubmitImport = async (
    values: (typeof co2facilitieSchema.$inferInsert)[]
  ) => {
    // const accountId = await confirm();

    // if (!accountId) {
    //   return toast.error('Please select an account to continue.');
    // }

    const data = values.map((value) => ({
      ...value
      // accountId: accountId as string
    }));

    createCo2facilities.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if (co2facilitiesQuery.isLoading) {
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
        <CardTitle className="text-xl line-clamp-1">
          Co2 Facilities List
        </CardTitle>
        <div className="flex flex-col lg:flex-row gap-2 items-center">
          <Button
            onClick={newCo2facilitie.onOpen}
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
          filterKey="facilityId"
          columns={columns}
          data={co2facilities}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteCo2facilities.mutate({ ids });
          }}
          disabled={isDisabled}
          placeHolder={''}
        />
      </div>
    </div>
  );
}
