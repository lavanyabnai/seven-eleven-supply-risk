'use client';

import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { UploadButton } from '@/components/upload-button';
import { siteStateChanges as sitestatechangeSchema } from '@/db/schema';
import { useBulkCreateSitestatechanges } from '@/features/sitestatechanges/api/use-bulk-create-sitestatechanges';
import { useBulkDeleteSitestatechanges } from '@/features/sitestatechanges/api/use-bulk-delete-sitestatechanges';
import { useGetSitestatechanges } from '@/features/sitestatechanges/api/use-get-sitestatechanges';
import { useNewSitestatechange } from '@/features/sitestatechanges/hooks/use-new-sitestatechange';

// import { useSelectAccount } from '@/features/accounts/hooks/use-select-account';


import { columns } from './columns';
import { ImportCard } from './import-card';

enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT'
}

const INITIAL_IMPORT_RESULTS = {
  data: [] as unknown[],
  errors: [],
  meta: {}
};

export default function SitestatechangesPage() {
  // const [AccountDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);


  const onUpload = (results: { data: unknown[] }) => {
    setImportResults({
      data: results.data,
      errors: [],
      meta: {}
    });
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const newSitestatechange = useNewSitestatechange();
  const createSitestatechanges = useBulkCreateSitestatechanges();
  const deleteSitestatechanges = useBulkDeleteSitestatechanges();
  const sitestatechangesQuery = useGetSitestatechanges();
  const sitestatechanges = sitestatechangesQuery.data || [];
  

  const isDisabled = sitestatechangesQuery.isLoading || deleteSitestatechanges.isPending;

  const onSubmitImport = async (
    values: (typeof sitestatechangeSchema.$inferInsert)[]
  ) => {
    const data = values.map((value) => ({
      site_name: value.siteId.toString(),
      time_period_name: value.timePeriodId.toString(),
      newSiteState: value.newSiteState
    }));

    createSitestatechanges.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if (sitestatechangesQuery.isLoading) {
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
        <CardTitle className="text-xl line-clamp-1">Sitestatechange List</CardTitle>
        <div className="flex flex-col lg:flex-row gap-2 items-center">
          <Button
            onClick={newSitestatechange.onOpen}
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
          filterKey="siteId"
          columns={columns}
          data={sitestatechanges}
          placeHolder="Search sitestatechanges..."
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteSitestatechanges.mutate({ ids });
          }}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
}
