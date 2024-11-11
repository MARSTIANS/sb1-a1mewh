import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AddClientDialog } from '@/components/add-client-dialog';
import { StageColumn } from '@/components/ui/stage-column';
import { SubStageDialog } from '@/components/sub-stage-dialog';
import { MOCK_CLIENTS, STAGES, SUB_STAGES } from '@/lib/data';
import { Client, SubStage } from '@/types';

export function CRMView() {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [subStageDialogOpen, setSubStageDialogOpen] = useState(false);
  const [activeClient, setActiveClient] = useState<Client | null>(null);

  const handleAddClient = (
    clientData: Omit<Client, 'id' | 'stage' | 'subStages'>
  ) => {
    const newClient: Client = {
      id: uuidv4(),
      ...clientData,
      stage: 'Lead',
      subStages: [],
    };
    setClients((prev) => [...prev, newClient]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetStage: string) => {
    e.preventDefault();
    const clientId = e.dataTransfer.getData('clientId');
    const client = clients.find((c) => c.id === clientId);

    if (!client) return;

    // Check if client can move to the next stage
    if (
      client.subStages.length > 0 &&
      client.subStages.some((s) => !s.completed)
    ) {
      return;
    }

    // Update client's stage and add new sub-stages if applicable
    setClients((prev) =>
      prev.map((c) => {
        if (c.id === clientId) {
          return {
            ...c,
            stage: targetStage as Client['stage'],
            subStages: SUB_STAGES[targetStage as keyof typeof SUB_STAGES] || [],
          };
        }
        return c;
      })
    );
  };

  const handleUpdateSubStages = (clientId: string, subStages: SubStage[]) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === clientId ? { ...client, subStages } : client
      )
    );
  };

  const handleApproveClient = (clientId: string) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === clientId
          ? {
              ...client,
              budget: 50000, // Default budget
              approvalDate: new Date().toISOString(),
            }
          : client
      )
    );
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Client Pipeline</h1>
          <p className="text-muted-foreground">
            Manage and track client projects through stages
          </p>
        </div>
        <AddClientDialog onAddClient={handleAddClient} />
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => (
          <StageColumn
            key={stage}
            stage={stage}
            clients={clients}
            onDrop={handleDrop}
            onClientClick={(client) => {
              setActiveClient(client);
              setSubStageDialogOpen(true);
            }}
            onApproveClient={handleApproveClient}
          />
        ))}
      </div>

      {activeClient && (
        <SubStageDialog
          client={activeClient}
          open={subStageDialogOpen}
          onOpenChange={setSubStageDialogOpen}
          onUpdateSubStages={handleUpdateSubStages}
        />
      )}
    </div>
  );
}