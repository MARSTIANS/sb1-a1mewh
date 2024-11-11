import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Client, Material, Labor, Transaction } from '@/types';
import { useState } from 'react';
import { MaterialPurchase } from './material-purchase';
import { LaborSection } from './labor-section';
import { TransactionTable } from './transaction-table';
import { AnalyticsSection } from './analytics-section';

interface ClientLedgerProps {
  client: Client;
}

export function ClientLedger({ client }: ClientLedgerProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const totalSpent = transactions.reduce(
    (sum, t) => sum + ('cost' in t ? t.cost : t.charge),
    0
  );
  const remainingBudget = (client.budget || 0) - totalSpent;

  const handleAddMaterial = (material: Material) => {
    setTransactions((prev) => [...prev, material]);
  };

  const handleAddLabor = (labor: Labor) => {
    setTransactions((prev) => [...prev, labor]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{client.name}</h2>
          <p className="text-muted-foreground">{client.email}</p>
        </div>
        {client.budget && (
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Remaining Budget</p>
            <p
              className={`text-2xl font-bold ${
                remainingBudget < 0 ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(remainingBudget)}
            </p>
          </Card>
        )}
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="space-y-4">
          <div className="flex gap-4">
            <MaterialPurchase
              onAddMaterial={handleAddMaterial}
              remainingBudget={remainingBudget}
            />
            <LaborSection
              onAddLabor={handleAddLabor}
              remainingBudget={remainingBudget}
            />
          </div>
          <TransactionTable transactions={transactions} />
        </TabsContent>
        <TabsContent value="analytics">
          {client.budget ? (
            <AnalyticsSection
              transactions={transactions}
              budget={client.budget}
            />
          ) : (
            <p>No budget allocated for analytics.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}