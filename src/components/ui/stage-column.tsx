import { cn } from '@/lib/utils';
import { Client, Stage } from '@/types';
import { Card } from './card';

interface StageColumnProps {
  stage: Stage;
  clients: Client[];
  onDrop: (e: React.DragEvent<HTMLDivElement>, stage: Stage) => void;
  onClientClick: (client: Client) => void;
}

export function StageColumn({
  stage,
  clients,
  onDrop,
  onClientClick,
}: StageColumnProps) {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const stageClients = clients.filter((client) => client.stage === stage);

  return (
    <div
      className="flex-1 min-w-[300px] bg-muted/30 rounded-lg p-4"
      onDragOver={handleDragOver}
      onDrop={(e) => onDrop(e, stage)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{stage}</h3>
        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
          {stageClients.length}
        </span>
      </div>
      <div className="space-y-3">
        {stageClients.map((client) => (
          <Card
            key={client.id}
            className={cn(
              'cursor-pointer hover:border-primary/50 transition-colors',
              client.subStages.some((s) => !s.completed) &&
                'border-destructive/50 hover:border-destructive'
            )}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('clientId', client.id);
            }}
            onClick={() => onClientClick(client)}
          >
            <div className="p-4">
              <h4 className="font-medium">{client.name}</h4>
              <p className="text-sm text-muted-foreground">{client.email}</p>
              {client.subStages.length > 0 && (
                <div className="mt-2">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{
                        width: `${
                          (client.subStages.filter((s) => s.completed).length /
                            client.subStages.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {client.subStages.filter((s) => s.completed).length} of{' '}
                    {client.subStages.length} tasks completed
                  </p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}