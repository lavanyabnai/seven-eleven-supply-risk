'use client';

import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { customers as customerSchema } from '@/db/schema';
import { useBulkCreateCustomers } from '@/features/customers/api/use-bulk-create-customers';
import { useBulkDeleteCustomers } from '@/features/customers/api/use-bulk-delete-customers';
import { useGetCustomers } from '@/features/customers/api/use-get-customers';
import { useNewCustomer } from '@/features/customers/hooks/use-new-customer';

// import { useSelectAccount } from '@/features/accounts/hooks/use-select-account';


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
  const createCustomers = useBulkCreateCustomers();
  const deleteCustomers = useBulkDeleteCustomers();
  const customersQuery = useGetCustomers();
  const customers = customersQuery.data || [];

  const isDisabled = customersQuery.isLoading || deleteCustomers.isPending;

  const onSubmitImport = async (
    values: (typeof customerSchema.$inferInsert)[]
  ) => {
    const data = values.map(({ locationId, id, ...rest }) => ({
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
    <div className="max-w-screen-6xl mx-auto w-full">
      <div className="flex flex-col  px-4 py-2 m-0.5 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-xl line-clamp-1">Customer Table</CardTitle>
        <div className="flex flex-col lg:flex-row gap-2 items-center">
          <Button
            onClick={newCustomer.onOpen}
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
      <div className="p-2">
        <DataTable
          filterKey="name"
          columns={columns}
          data={customers.map(customer => ({
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
    </div>
  );
}
