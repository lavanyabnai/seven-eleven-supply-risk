import { Loader2 } from 'lucide-react';
import { z } from 'zod';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { useNewNetScenario } from '@/features/net_scenario/hooks/use-new-net_scenario';
import { useCreateNetScenario } from '@/features/net_scenario/api/use-create-net_scenario';
import { NetScenarioForm } from './net_scenario-form';

const netScenarioSchema = z.object({
  netId: z.string().min(1, 'Net ID is required'),
  description: z.string().optional()
});

type FormValues = z.infer<typeof netScenarioSchema>;

export const NewNetScenarioSheet = () => {
  const { isOpen, onClose } = useNewNetScenario();

  const createMutation = useCreateNetScenario();

  const isPending = createMutation.isPending;

  const onSubmit = (values: FormValues) => {
    const mutationPayload = {
      ...values,
      scenarioType: 'simulation',
    };
    createMutation.mutate(mutationPayload, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 bg-white">
        <SheetHeader>
          <SheetTitle>New Net Scenario</SheetTitle>
          <SheetDescription>Add a new net scenario</SheetDescription>
        </SheetHeader>
        <NetScenarioForm
          onSubmit={onSubmit}
          disabled={isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
