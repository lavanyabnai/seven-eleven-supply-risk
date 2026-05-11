import { Loader2 } from 'lucide-react';
import { z } from 'zod';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { useDeleteNetScenario } from '@/features/net_scenario/api/use-delete-net_scenario';
import { useEditNetScenario } from '@/features/net_scenario/api/use-edit-net_scenario';
import { useGetNetScenario } from '@/features/net_scenario/api/use-get-net_scenario';
import { useOpenNetScenario } from '@/features/net_scenario/hooks/use-open-net_scenario';
import { NetScenarioForm } from './net_scenario-form';

import { useConfirm } from '@/hooks/use-confirm';

const netScenarioSchema = z.object({
  netId: z.string().min(1),
  description: z.string().optional()
});

type FormValues = z.infer<typeof netScenarioSchema>;

export const EditNetScenarioSheet = () => {
  const { isOpen, onClose, id } = useOpenNetScenario();

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this net scenario.'
  );

  const scenarioQuery = useGetNetScenario(id);
  const editMutation = useEditNetScenario(id);
  const deleteMutation = useDeleteNetScenario(id);

  const isPending =
    editMutation.isPending || deleteMutation.isPending || scenarioQuery.isLoading;

  const isLoading = scenarioQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
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

  const defaultValues = scenarioQuery.data
    ? {
        netId: scenarioQuery.data.netId,
        description: scenarioQuery.data.description ?? undefined
      }
    : {
        netId: '',
        description: ''
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4 bg-white">
          <SheetHeader>
            <SheetTitle>Edit Net Scenario</SheetTitle>
            <SheetDescription>Edit an existing net scenario</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <NetScenarioForm
              id={Number(id) || undefined}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              onDelete={onDelete}
              disabled={isPending}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
