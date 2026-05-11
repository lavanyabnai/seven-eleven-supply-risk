'use client';

import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { paymentTerms as paymenttermSchema } from '@/db/schema';
import { useBulkCreatePaymentterms } from '@/features/paymentterms/api/use-bulk-create-paymentterms';
import { useBulkDeletePaymentterms } from '@/features/paymentterms/api/use-bulk-delete-paymentterms';
import { useGetPaymentterms } from '@/features/paymentterms/api/use-get-paymentterms';
import { useNewPaymentterm } from '@/features/paymentterms/hooks/use-new-paymentterm';

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

export default function PeriodsPage() {
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

  const newPaymentterm = useNewPaymentterm();
  const createPaymentterms = useBulkCreatePaymentterms();
  const deletePaymentterms = useBulkDeletePaymentterms();
  const paymenttermsQuery = useGetPaymentterms();
  const paymentterms = paymenttermsQuery.data || [];

  const isDisabled = paymenttermsQuery.isLoading || deletePaymentterms.isPending;

  const onSubmitImport = async (
    values: (typeof paymenttermSchema.$inferInsert)[]
  ) => {
    const data = values.map((value) => ({
      ...value
    }));

    createPaymentterms.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if (paymenttermsQuery.isLoading) {
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
        <CardTitle className="text-xl line-clamp-1">Payment Terms List</CardTitle>
        <div className="flex flex-col lg:flex-row gap-2 items-center">
          <Button
            onClick={newPaymentterm.onOpen}
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
          filterKey="productId"
          columns={columns}
          data={paymentterms}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deletePaymentterms.mutate({ ids });
          }}
          disabled={isDisabled}
          placeHolder={''}
        />
      </div>
    </div>
  );
}