"use client";

import { Loader2, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { demand as demandSchema } from "@/db/schema";
import { useBulkCreateDemands } from "@/features/demands/api/use-bulk-create-demands";
import { useBulkDeleteDemands } from "@/features/demands/api/use-bulk-delete-demands";
import { useGetDemands } from "@/features/demands/api/use-get-demands";
import { useNewDemand } from "@/features/demands/hooks/use-new-demand";

// import { useSelectAccount } from '@/features/accounts/hooks/use-select-account';

import { columns } from "./columns";
import { ImportCard } from "./import-card";
import { UploadButton } from "./upload-button";
import { useTableActions } from "@/components/risk/table-actions-context";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

export default function DemandsPage() {
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

  const newDemand = useNewDemand();
  const tableActions = useTableActions()
  const importDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    tableActions?.registerAddHandler(newDemand.onOpen)
    return () => tableActions?.registerAddHandler(null)
  }, [tableActions, newDemand.onOpen])

  useEffect(() => {
    const btn = importDivRef.current?.querySelector('button') as HTMLButtonElement | null
    tableActions?.registerImportRef(btn)
    return () => tableActions?.registerImportRef(null)
  }, [tableActions])

  const createDemands = useBulkCreateDemands();
  const deleteDemands = useBulkDeleteDemands();
  const demandsQuery = useGetDemands();
  const demands = demandsQuery.data || [];

  const isDisabled = demandsQuery.isLoading || deleteDemands.isPending;
  // const isDisabled = demandsQuery.isLoading || deleteDemands.isPending;

  const onSubmitImport = async (
    values: (typeof demandSchema.$inferInsert)[]
  ) => {
    // const accountId = await confirm();

    // if (!accountId) {
    //   return toast.error('Please select an account to continue.');
    // }

    const data = values.map((value) => ({
      inclusionType: value.inclusionType,
      demandType: value.demandType,
      customer_name: value.customerId.toString(),
      product_name: value.productId.toString(),
      time_period_name: value.timePeriodId.toString(),
      parameters: value.parameters,
      currency: value.currency
    }));

    createDemands.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      },
    });
  };

  if (demandsQuery.isLoading) {
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
        filterKey="customerName"
        columns={columns}
        data={demands.map(item => ({
          ...item,
          createdAt: item.createdAt ? new Date(item.createdAt) : null,
          updatedAt: item.updatedAt ? new Date(item.updatedAt) : null,
        }))}
        onDelete={(row) => {
          const ids = row.map((r) => r.original.id);
          deleteDemands.mutate({ ids });
        }}
        disabled={isDisabled}
      />
    </div>
  );
}
