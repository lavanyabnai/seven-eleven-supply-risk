'use client';

import { Loader2, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { products as productSchema } from '@/db/schema';
import { useBulkCreateProducts } from '@/features/products/api/use-bulk-create-products';
import { useBulkDeleteProducts } from '@/features/products/api/use-bulk-delete-products';
import { useGetProducts } from '@/features/products/api/use-get-products';
import { useNewProduct } from '@/features/products/hooks/use-new-product';



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

export default function ProductsPage() {
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

  const newProduct = useNewProduct();
  const tableActions = useTableActions()
  const importDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    tableActions?.registerAddHandler(newProduct.onOpen)
    return () => tableActions?.registerAddHandler(null)
  }, [tableActions, newProduct.onOpen])

  useEffect(() => {
    const btn = importDivRef.current?.querySelector('button') as HTMLButtonElement | null
    tableActions?.registerImportRef(btn)
    return () => tableActions?.registerImportRef(null)
  }, [tableActions])

  const createProducts = useBulkCreateProducts();
  const deleteProducts = useBulkDeleteProducts();
  const productsQuery = useGetProducts();
  const products = productsQuery.data || [];
  

  const isDisabled = productsQuery.isLoading || deleteProducts.isPending;

  const onSubmitImport = async (
    values: (typeof productSchema.$inferInsert)[]
  ) => {
    // const accountId = await confirm();

    // if (!accountId) {
    //   return toast.error('Please select an account to continue.');
    // }

    const data = values.map((value) => ({
      ...value
      // accountId: accountId as string
    }));
    

    createProducts.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if (productsQuery.isLoading) {
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
          filterKey="customerId"
          columns={columns}
          data={products.map(product => ({
            ...product,
            
            createdAt: product.createdAt ? new Date(product.createdAt) : null,
            updatedAt: product.updatedAt ? new Date(product.updatedAt) : null
          }))}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteProducts.mutate({ ids });
          }}
          disabled={isDisabled}
        />

    </div>
  );
}
