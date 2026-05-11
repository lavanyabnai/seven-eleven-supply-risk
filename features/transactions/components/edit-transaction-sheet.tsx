import { Loader2 } from "lucide-react";
import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertTransactionSchema } from "@/db/schema";
import { useEditTransaction } from "@/features/transactions/api/use-edit-transaction";
import { useGetTransaction } from "@/features/transactions/api/use-get-transaction";
import { TransactionForm } from "@/features/transactions/components/transaction-form";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";

import { useConfirm } from "@/hooks/use-confirm";


const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction."
  );

  const transactionQuery = useGetTransaction(id);

  // const onCreateAccount = (name: string) => accountMutation.mutate({
  //   name
  // });
  // const accountOptions = (accountQuery.data ?? []).map((account: any) => ({
  //   label: account.name,
  //   value: account.id,
  // }));

  const isPending =
    transactionQuery.isLoading;

  const isLoading = 
    transactionQuery.isLoading;

  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        }
      });
    }
  };

  const defaultValues = transactionQuery.data ? {
    accountId: transactionQuery.data.accountId,
    categoryId: transactionQuery.data.categoryId,
    amount: transactionQuery.data.amount.toString(),
    date: transactionQuery.data.date 
      ? new Date(transactionQuery.data.date)
      : new Date(),
    payee: transactionQuery.data.payee,
    notes: transactionQuery.data.notes,
  } : {
    accountId: "",
    categoryId: "",
    amount: "",
    date: new Date(),
    payee: "",
    notes: "",
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4 bg-white">
          <SheetHeader>
            <SheetTitle>
              Edit Transaction
            </SheetTitle>
            <SheetDescription>
              Edit an existing transaction
            </SheetDescription>
          </SheetHeader>
          {isLoading
            ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
              </div>
            ) : (
              <TransactionForm
                id={id}
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                onDelete={onDelete}
                disabled={isPending}
              />
            )
          }
        </SheetContent>
      </Sheet>
    </>
  );
};
