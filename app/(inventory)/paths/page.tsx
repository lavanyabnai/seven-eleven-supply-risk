'use client';

import { Loader2, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { Skeleton } from '@/components/ui/skeleton';
import { paths as pathSchema } from '@/db/schema';
import { useBulkCreatepaths } from '@/features/paths/api/use-bulk-create-paths';
import { useBulkDeletepaths } from '@/features/paths/api/use-bulk-delete-paths';
import { useGetPaths } from '@/features/paths/api/use-get-paths';
import { useNewPath } from '@/features/paths/hooks/use-new-path';

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

export default function PathsPage() {

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

  const newPath = useNewPath();
  const createPaths = useBulkCreatepaths();
  const deletePaths = useBulkDeletepaths();
  const pathsQuery = useGetPaths();
  const paths = pathsQuery.data || [];

  const tableActions = useTableActions();
  const importDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tableActions?.registerAddHandler(newPath.onOpen);
    return () => tableActions?.registerAddHandler(null);
  }, [tableActions, newPath.onOpen]);

  useEffect(() => {
    const btn = importDivRef.current?.querySelector('button') as HTMLButtonElement | null;
    tableActions?.registerImportRef(btn);
    return () => tableActions?.registerImportRef(null);
  }, [tableActions]);

  const isDisabled = pathsQuery.isLoading || deletePaths.isPending;
  // const isDisabled = pathsQuery.isLoading || deletePaths.isPending;

  const onSubmitImport = async (values: typeof pathSchema.$inferInsert[]) => {
    // const accountId = await confirm();

    // if (!accountId) {
    //   return toast.error('Please select an account to continue.');
    // }

    const data = values.map((value) => ({
      ...value,
      costPuPk: value.costPuPk != null ? String(value.costPuPk) : null,
    })) as { 
      name: string;
      fromLocation: string; 
      toLocation: string; 
      currency?: string | null;
      timeUnit?: string | null;
      costCalculationParams?: number | null;
      costPuPk?: string | null;
    }[];

    createPaths.mutate(
      data.map(path => ({
        ...path,
        costCalculationPolicy: 'FIXED'
      })),
      {
        onSuccess: () => {
          onCancelImport();
        }
      }
    );
  };

  if (pathsQuery.isLoading) {
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
          placeHolder="Search by Name"
          filterKey="name"
          columns={columns}
          data={paths.map(path => ({
            ...path,
            vehicleTypeName: path.vehicleTypeName ?? null,
            vehicleTypeId: path.vehicleTypeId ?? null,
            costCalculationPolicy: path.costCalculationPolicy ?? null,
            costPuPk: null,
            costCalculationParams: null,
            co2CalculationParams: null,
            transportationTime: null,
            inclusionType: null,
            currency: null,
            timeUnit: null,
            distanceUnit: null,
            timePeriod: null,
            distance: null,
            transportationType: null,
            transportationPolicy: null,
            minLoadRatio: null,
            straight: null
          }))}
          onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deletePaths.mutate({ ids });
          }}
          disabled={isDisabled}
        />
    </div>
  );
}
