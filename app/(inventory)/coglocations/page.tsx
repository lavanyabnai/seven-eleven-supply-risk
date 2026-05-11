'use client';

import { Row } from '@tanstack/react-table';
import { Loader2 } from 'lucide-react';


// import { useSelectAccount } from '@/features/accounts/hooks/use-select-account';

// import { cogNewLocations   } from '@/db/schema';

import { DataTable } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetcoglocations } from '@/features/coglocations/api/use-get-coglocations';

import { columns } from './columns';


// enum VARIANTS {
// //   LIST = 'LIST',
// //   IMPORT = 'IMPORT'
// // }

// const INITIAL_IMPORT_RESULTS = {
//   data: [],
//   errors: [],
//   meta: {}
// };

export default function CogLocationsPage() {
  // const [AccountDialog, confirm] = useSelectAccount();


  // const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    
  //   setImportResults(results);
  //   setVariant(VARIANTS.IMPORT);
  // };

  // const onCancelImport = () => {
  //   setImportResults(INITIAL_IMPORT_RESULTS);
  //   setVariant(VARIANTS.LIST);
  // };

  const coglocationQuery = useGetcoglocations();

  const isDisabled = coglocationQuery.isLoading;

  // const onSubmitImport = async (
  //   values: (typeof cogNewLocations.$inferInsert)[]
  // ) => {
  //   // const accountId = await confirm();

  //   // if (!accountId) {
  //   //   return toast.error('Please select an account to continue.');
  //   // }

    // const data = values.map((value) => ({
    //   ...value
    //   // accountId: accountId as string
    // }));
    

    //   createcoglocation.mutate(data, {
    //     onSuccess: () => {
    //       onCancelImport();
    //     }
    //   });
    // };

    if (coglocationQuery.isLoading) {
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

    // if (variant === VARIANTS.IMPORT) {
    //   return (
    //     <>
    //       {/* <AccountDialog /> */}
          {/* <ImportCard
            data={importResults.data}
            onCancel={onCancelImport}
            onSubmit={onSubmitImport}
          /> */}
    //     </>
    //   );
    // }

    return (
      <div className="max-w-screen-6xl mx-auto w-full">
        <div className="flex flex-col px-4 py-2 m-0.5 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            cog Location List
          </CardTitle>
          {/* <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
          <Button
              onClick={newLocation.onOpen}
            size="sm"
            className="w-full lg:w-auto"
          >
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
          <UploadButton onUpload={onUpload} />
        </div> */}
        </div>
        <Separator />
        <div className="px-4">
          <DataTable
            filterKey="name"
            columns={columns}
            data={(coglocationQuery.data ?? []).map(location => ({
              ...location,
              country: location.country ?? '',
              autofillCoordinates: false,
              createdAt: location.createdAt ? new Date(location.createdAt) : null,
              updatedAt: location.updatedAt ? new Date(location.updatedAt) : null
            }))}
            disabled={isDisabled}
            onDelete={function (_: Row<{
              name: string;
              code: string | null;
              id: number;
              city: string | null;
              region: string | null;
              country: string;
              address: string | null;
              latitude: number | null;
              longitude: number | null;
              autofillCoordinates: boolean | null;
              createdAt: Date | null;
              updatedAt: Date | null;
            }>[]): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      </div>
    );
  }