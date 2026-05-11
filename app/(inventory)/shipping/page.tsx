'use client';

import { Loader2, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { shipping as shippingSchema } from '@/db/schema';
import { useBulkCreateshippings } from '@/features/shipping/api/use-bulk-create-shippings';
import { useBulkDeleteshippings } from '@/features/shipping/api/use-bulk-delete-shippings';
import { useGetShippings } from '@/features/shipping/api/use-get-shippings';
import { useNewShipping } from '@/features/shipping/hooks/use-new-shipping';

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

export default function ShippingsPage() {

  // const [AccountDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);


  const onUpload = (results: unknown) => {
    setImportResults(results as typeof INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const newShipping = useNewShipping();
  const createShippings = useBulkCreateshippings();
  const deleteShippings = useBulkDeleteshippings();
  const shippingsQuery = useGetShippings();
  const shippings = shippingsQuery.data || [];

  const tableActions = useTableActions();
  const importDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tableActions?.registerAddHandler(newShipping.onOpen);
    return () => tableActions?.registerAddHandler(null);
  }, [tableActions, newShipping.onOpen]);

  useEffect(() => {
    const btn = importDivRef.current?.querySelector('button') as HTMLButtonElement | null;
    tableActions?.registerImportRef(btn);
    return () => tableActions?.registerImportRef(null);
  }, [tableActions]);

  const isDisabled = shippingsQuery.isLoading || deleteShippings.isPending;
  // const isDisabled = shippingsQuery.isLoading || deleteShippings.isPending;

  const onSubmitImport = async (data: unknown) => {
    const values = data as typeof shippingSchema.$inferInsert[];
    const formattedData = values.map((value) => ({
      ...value
    }));

    createShippings.mutate(formattedData, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if (shippingsQuery.isLoading) {
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
          onUpload={onSubmitImport }
        />
      </>
    );
  }

  return (
    <div className="font-sans">
      <div ref={importDivRef} className="sr-only">
        <UploadButton onUpload={onUpload as any} />
      </div>
        <DataTable
          placeHolder="Search by source name"
          filterKey="sourceName"
          columns={columns as any}
          data={shippings}
          onDelete={(row) => {
              const ids = row.map((r: any) => r.original.id);
              deleteShippings.mutate({ ids });
          }}
          disabled={isDisabled}
        />
    </div>
  );
}
