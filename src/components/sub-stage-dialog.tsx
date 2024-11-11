import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Client, SubStage } from '@/types';
import { CheckCircle2, Circle } from 'lucide-react';

interface SubStageDialogProps {
  client: Client;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateSubStages: (clientId: string, subStages: SubStage[]) => void;
}

export function SubStageDialog({
  client,
  open,
  onOpenChange,
  onUpdateSubStages,
}: SubStageDialogProps) {
  const toggleSubStage = (subStageId: string) => {
    const updatedSubStages = client.subStages.map((subStage) =>
      subStage.id === subStageId
        ? { ...subStage, completed: !subStage.completed }
        : subStage
    );
    onUpdateSubStages(client.id, updatedSubStages);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sub-stages for {client.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {client.subStages.map((subStage) => (
            <Button
              key={subStage.id}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => toggleSubStage(subStage.id)}
            >
              {subStage.completed ? (
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              ) : (
                <Circle className="mr-2 h-4 w-4" />
              )}
              {subStage.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}