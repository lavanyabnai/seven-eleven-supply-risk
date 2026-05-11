'use client';

import { Loader2, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { Skeleton } from '@/components/ui/skeleton';
import { UploadButton } from './upload-button';
import { useTableActions } from '@/components/risk/table-actions-context';
import { groups as groupSchema } from '@/db/schema';
import { useBulkCreateGroups } from '@/features/groups/api/use-bulk-create-groups';
import { useBulkDeleteGroups } from '@/features/groups/api/use-bulk-delete-groups';
import { useGetGroups } from '@/features/groups/api/use-get-groups';
import { useNewGroup } from '@/features/groups/hooks/use-new-group';

// import { useSelectAccount } from '@/features/accounts/hooks/use-select-account';


import { columns } from './columns';
import { ImportCard } from './import-card';


enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT'
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {}
};

export default function GroupsPage() {
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

  const newGroup = useNewGroup();
  const tableActions = useTableActions()
  const importDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    tableActions?.registerAddHandler(newGroup.onOpen)
    return () => tableActions?.registerAddHandler(null)
  }, [tableActions, newGroup.onOpen])

  useEffect(() => {
    const btn = importDivRef.current?.querySelector('button') as HTMLButtonElement | null
    tableActions?.registerImportRef(btn)
    return () => tableActions?.registerImportRef(null)
  }, [tableActions])

  const createGroups = useBulkCreateGroups();
  const deleteGroups = useBulkDeleteGroups();
  const groupsQuery = useGetGroups();
  const groups = groupsQuery.data?.map(group => ({
    ...group,
    createdAt: group.createdAt ? new Date(group.createdAt) : null
  })) || [];

  const isDisabled = groupsQuery.isLoading || deleteGroups.isPending;

  const onSubmitImport = async (
    values: (typeof groupSchema.$inferInsert)[]
  ) => {
    // const accountId = await confirm();

    // if (!accountId) {
    //   return toast.error('Please select an account to continue.');
    // }

    const data = values.map((value) => ({
      ...value
      // accountId: accountId as string
    }));

    createGroups.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if (groupsQuery.isLoading) {
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
          data={groups}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteGroups.mutate({ ids });
          }}
          disabled={isDisabled}
        />
 
    </div>
  );
}
