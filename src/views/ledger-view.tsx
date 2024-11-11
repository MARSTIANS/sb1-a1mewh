import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClientTable } from '@/components/client-ledger/client-table';
import { ClientLedger } from '@/components/client-ledger/client-ledger';
import { MOCK_CLIENTS } from '@/lib/data';
import { Client } from '@/types';

export function LedgerView() {
  const { clientId } = useParams();
  const [selectedClient, setSelectedClient] = useState<Client | null>(
    clientId ? MOCK_CLIENTS.find((c) => c.id === clientId) || null : null
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Client Ledger</h1>
        <p className="text-muted-foreground">
          Manage client budgets and track expenses
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <ClientTable
            clients={MOCK_CLIENTS}
            onSelectClient={setSelectedClient}
            selectedClientId={selectedClient?.id}
          />
        </div>
        <div className="md:col-span-2">
          {selectedClient ? (
            <ClientLedger client={selectedClient} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">
                Select a client to view their ledger
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}