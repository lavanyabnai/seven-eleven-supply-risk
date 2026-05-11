'use client';

import { Loader2, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { suppliers as supplierSchema } from '@/db/schema';
import { useBulkCreateSuppliers } from '@/features/suppliers/api/use-bulk-create-suppliers';
import { useBulkDeleteSuppliers } from '@/features/suppliers/api/use-bulk-delete-suppliers';
import { useGetSuppliers } from '@/features/suppliers/api/use-get-suppliers';
import { useNewSupplier } from '@/features/suppliers/hooks/use-new-supplier';

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

export default function SuppliersPage() {
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

  const newSupplier = useNewSupplier();
  const tableActions = useTableActions()
  const importDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    tableActions?.registerAddHandler(newSupplier.onOpen)
    return () => tableActions?.registerAddHandler(null)
  }, [tableActions, newSupplier.onOpen])

  useEffect(() => {
    const btn = importDivRef.current?.querySelector('button') as HTMLButtonElement | null
    tableActions?.registerImportRef(btn)
    return () => tableActions?.registerImportRef(null)
  }, [tableActions])

  const createSuppliers = useBulkCreateSuppliers();
  const deleteSuppliers = useBulkDeleteSuppliers();
  const suppliersQuery = useGetSuppliers();
  const suppliers = suppliersQuery.data || [];

  const isDisabled = suppliersQuery.isLoading || deleteSuppliers.isPending;

  const onSubmitImport = async (
    values: (typeof supplierSchema.$inferInsert)[]
  ) => {
    // const accountId = await confirm();

    // if (!accountId) {
    //   return toast.error('Please select an account to continue.');
    // }

    const data = values.map((value) => ({
      ...value,
      location_name: value.locationId?.toString() || '',
      locationId: undefined
    }));

    createSuppliers.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if (suppliersQuery.isLoading) {
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
          data={suppliers.map(supplier => ({
            ...supplier,
            createdAt: supplier.createdAt ? new Date(supplier.createdAt) : null,
            updatedAt: supplier.updatedAt ? new Date(supplier.updatedAt) : null,
            locationId: supplier.locationId ?? null,
          }))}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteSuppliers.mutate({ ids });
          }}
          disabled={isDisabled}
        />

    </div>
  );
}
