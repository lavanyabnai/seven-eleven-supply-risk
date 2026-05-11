import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateNetScenario } from "@/features/net_scenario/api/use-create-net_scenario";
import { Loader2 } from "lucide-react";

interface CreateScenarioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateScenarioDialog({ 
  open, 
  onOpenChange,
  onSuccess 
}: CreateScenarioDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<string>("");

  const createScenario = useCreateNetScenario();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !type) {
      return;
    }

    try {
      await createScenario.mutateAsync({
        netId: name,
        description,
        scenarioType: type,
      });
      
      // Reset form
      setName("");
      setDescription("");
      setType("");
      
      // Call success callback
      onSuccess?.();
      
      // Close dialog
      onOpenChange(false);
    } catch (error) {
      // Error is handled in the mutation hook
      console.error("Failed to create scenario:", error);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when closing
      setName("");
      setDescription("");
      setType("");
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Scenario</DialogTitle>
          <DialogDescription>
            Create a new supply chain optimization scenario. Choose the type and provide basic details.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Scenario Name</Label>
              <Input
                id="name"
                placeholder="e.g., Q4 2024 Inventory Optimization"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={createScenario.isPending}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="type">Scenario Type</Label>
              <Select 
                value={type} 
                onValueChange={setType}
                disabled={createScenario.isPending}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select a scenario type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simulation">
                    🔬 Simulation Experiment
                  </SelectItem>
                  <SelectItem value="variation">
                    📊 Variation Analysis
                  </SelectItem>
                  <SelectItem value="comparison">
                    ⚖️ Comparison Study
                  </SelectItem>
                  <SelectItem value="risk">
                    ⚠️ Risk Analysis
                  </SelectItem>
                  <SelectItem value="safety-stock">
                    📦 Safety Stock Optimization
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Provide a brief description of the scenario objectives..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                disabled={createScenario.isPending}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleOpenChange(false)}
              disabled={createScenario.isPending}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!name || !type || createScenario.isPending}
            >
              {createScenario.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Scenario"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}