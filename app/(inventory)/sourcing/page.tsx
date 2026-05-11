'use client';

import { Loader2, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader} from '@/components/ui/card';

import { Skeleton } from '@/components/ui/skeleton';
import { sourcing as sourcingSchema } from '@/db/schema';
import { useBulkCreatesourcings } from '@/features/sourcing/api/use-bulk-create-sourcings';
import { useBulkDeletesourcings } from '@/features/sourcing/api/use-bulk-delete-sourcings';
import { useGetSourcings } from '@/features/sourcing/api/use-get-sourcings';
import { useNewSourcing } from '@/features/sourcing/hooks/use-new-sourcing';

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



export default function Sourcing() {


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

  const newSourcing = useNewSourcing();
  const createSourcings = useBulkCreatesourcings();
  const deleteSourcings = useBulkDeletesourcings();
  const sourcingsQuery = useGetSourcings();
  const sourcings = sourcingsQuery.data || [];

  const tableActions = useTableActions();
  const importDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tableActions?.registerAddHandler(newSourcing.onOpen);
    return () => tableActions?.registerAddHandler(null);
  }, [tableActions, newSourcing.onOpen]);

  useEffect(() => {
    const btn = importDivRef.current?.querySelector('button') as HTMLButtonElement | null;
    tableActions?.registerImportRef(btn);
    return () => tableActions?.registerImportRef(null);
  }, [tableActions]);

  const isDisabled = sourcingsQuery.isLoading || deleteSourcings.isPending;
  const onSubmitImport = async (values: typeof sourcingSchema.$inferInsert[]) => {
    // }

    const data = values.map((value) => ({
      ...value
      // ...value
      // accountId: accountId as string
    }));

    createSourcings.mutate(data as any, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if (sourcingsQuery.isLoading) {
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
          placeHolder="Search by delivery destination"
          filterKey="deliveryDestination"
          columns={columns}
          data={sourcings.map(item => ({
            ...item,
            createdAt: item.createdAt ? new Date(item.createdAt) : null,
            updatedAt: item.updatedAt ? new Date(item.updatedAt) : null,
          }))}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteSourcings.mutate({ ids });
          }}
          disabled={isDisabled}
        />
    </div>
  );
}
