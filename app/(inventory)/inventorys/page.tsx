'use client';

import { Loader2, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { Skeleton } from '@/components/ui/skeleton';
import { UploadButton } from './upload-button';
import { inventory as inventorySchema } from '@/db/schema';
import { useBulkCreateInventorys } from '@/features/inventorys/api/use-bulk-create-inventorys';
import { useBulkDeleteInventorys } from '@/features/inventorys/api/use-bulk-delete-inventorys';
import { useGetInventorys } from '@/features/inventorys/api/use-get-inventorys';
import { useNewInventory } from '@/features/inventorys/hooks/use-new-inventory';

// import { useSelectAccount } from '@/features/accounts/hooks/use-select-account';


import { columns } from './columns';
import { ImportCard } from './import-card';
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

export default function InventorysPage() {
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

  const newInventory = useNewInventory();
  const createInventorys = useBulkCreateInventorys();
  const deleteInventorys = useBulkDeleteInventorys();
  const inventorysQuery = useGetInventorys();
  const inventorys = inventorysQuery.data || [];

  const tableActions = useTableActions();
  const importDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tableActions?.registerAddHandler(newInventory.onOpen);
    return () => tableActions?.registerAddHandler(null);
  }, [tableActions, newInventory.onOpen]);

  useEffect(() => {
    const btn = importDivRef.current?.querySelector('button') as HTMLButtonElement | null;
    tableActions?.registerImportRef(btn);
    return () => tableActions?.registerImportRef(null);
  }, [tableActions]);

  const isDisabled = inventorysQuery.isLoading || deleteInventorys.isPending;

  const onSubmitImport = async (
    values: (typeof inventorySchema.$inferInsert)[]
  ) => {
    // const accountId = await confirm();

    // if (!accountId) {
    //   return toast.error('Please select an account to continue.');
    // }

    const data = values.map((value) => ({
      ...value
      // accountId: accountId as string
    }));

    createInventorys.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if (inventorysQuery.isLoading) {
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
          data={inventorys}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteInventorys.mutate({ ids });
          }}
          disabled={isDisabled}
        />
    </div>
  );
}
