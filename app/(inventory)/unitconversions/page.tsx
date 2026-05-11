'use client';

import { Loader2, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { unitConversions as unitconversionSchema } from '@/db/schema';
import { useBulkCreateUnitconversions } from '@/features/unitconversions/api/use-bulk-create-unitconversions';
import { useBulkDeleteUnitconversions } from '@/features/unitconversions/api/use-bulk-delete-unitconversions';
import { useGetUnitconversions } from '@/features/unitconversions/api/use-get-unitconversions';
import { useNewUnitconversion } from '@/features/unitconversions/hooks/use-new-unitconversion';

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

export default function UnitconversionsPage() {
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

  const newunitconversion = useNewUnitconversion();
  const tableActions = useTableActions()
  const importDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    tableActions?.registerAddHandler(newunitconversion.onOpen)
    return () => tableActions?.registerAddHandler(null)
  }, [tableActions, newunitconversion.onOpen])

  useEffect(() => {
    const btn = importDivRef.current?.querySelector('button') as HTMLButtonElement | null
    tableActions?.registerImportRef(btn)
    return () => tableActions?.registerImportRef(null)
  }, [tableActions])

  const createunitconversions = useBulkCreateUnitconversions();
  const deleteunitconversions = useBulkDeleteUnitconversions();
  const unitconversionsQuery = useGetUnitconversions();
  const unitconversions = unitconversionsQuery.data || [];

  const isDisabled = unitconversionsQuery.isLoading || deleteunitconversions.isPending;

  const onSubmitImport = async (
    values: (typeof unitconversionSchema.$inferInsert)[]
  ) => {
    // const accountId = await confirm();

    // if (!accountId) {
    //   return toast.error('Please select an account to continue.');
    // }

    const data = values.map((value) => ({
      ...value
      // accountId: accountId as string
    }));

    createunitconversions.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if (unitconversionsQuery.isLoading) {
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
          filterKey="productId"
          columns={columns}
          data={unitconversions.map(unitconversion => ({
            ...unitconversion,
            createdAt: unitconversion.createdAt ? new Date(unitconversion.createdAt) : null,
            updatedAt: unitconversion.updatedAt ? new Date(unitconversion.updatedAt) : null
          }))}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteunitconversions.mutate({ ids });
          }}
          disabled={isDisabled}
        />
   
    </div>
  );
}
