'use client';

import { Loader2, } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from '@/components/data-table';

import { Card, CardContent, CardHeader} from '@/components/ui/card';

import { customers as customerSchema } from '@/db/schema';
import { useBulkCreateCustomers } from '@/features/customers/api/use-bulk-create-customers';
import { useBulkDeleteCustomers } from '@/features/customers/api/use-bulk-delete-customers';
import { useGetCustomers } from '@/features/customers/api/use-get-customers';
import { useNewCustomer } from '@/features/customers/hooks/use-new-customer';

// import { useSelectAccount } from '@/features/accounts/hooks/use-select-account';


import { columns } from './columns';
import { ImportCard } from './import-card';
import { UploadButton } from './upload-button';
import { Skeleton } from '@/components/ui/skeleton';
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

export default function CustomersPage() {
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

  const newCustomer = useNewCustomer();
  const tableActions = useTableActions()
  const importDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    tableActions?.registerAddHandler(newCustomer.onOpen)
    return () => tableActions?.registerAddHandler(null)
  }, [tableActions, newCustomer.onOpen])

  useEffect(() => {
    const btn = importDivRef.current?.querySelector('button') as HTMLButtonElement | null
    tableActions?.registerImportRef(btn)
    return () => tableActions?.registerImportRef(null)
  }, [tableActions])

  const createCustomers = useBulkCreateCustomers();
  const deleteCustomers = useBulkDeleteCustomers();
  const customersQuery = useGetCustomers();
  const customers = customersQuery.data || [];

  const isDisabled = customersQuery.isLoading || deleteCustomers.isPending;

  const onSubmitImport = async (
    values: (typeof customerSchema.$inferInsert)[]
  ) => {
    // const accountId = await confirm();

    // if (!accountId) {
    //   return toast.error('Please select an account to continue.');
    // }

    const data = values.map(({ locationId, ...rest }) => ({
      ...rest,
      location_name: locationId.toString()
    }));

    createCustomers.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if (customersQuery.isLoading) {
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
          data={customers.map((customer: any) => ({
            ...customer,
            createdAt: customer.createdAt ? new Date(customer.createdAt) : null,
            updatedAt: customer.updatedAt ? new Date(customer.updatedAt) : null
          }))}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteCustomers.mutate({ ids });
          }}
          disabled={isDisabled}
        />
     
    </div>
  );
}
