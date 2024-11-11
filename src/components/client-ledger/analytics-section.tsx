import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/types';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface AnalyticsSectionProps {
  transactions: Transaction[];
  budget: number;
}

export function AnalyticsSection({
  transactions,
  budget,
}: AnalyticsSectionProps) {
  const materialTotal = transactions
    .filter((t): t is Extract<Transaction, { distributor: string }> =>
      'distributor' in t
    )
    .reduce((sum, t) => sum + t.cost, 0);

  const laborTotal = transactions
    .filter((t): t is Extract<Transaction, { role: string }> => 'role' in t)
    .reduce((sum, t) => sum + t.charge, 0);

  const remaining = budget - materialTotal - laborTotal;
  const data = [
    { name: 'Materials', value: materialTotal, color: '#0ea5e9' },
    { name: 'Labor', value: laborTotal, color: '#8b5cf6' },
    { name: 'Remaining', value: Math.max(remaining, 0), color: '#22c55e' },
  ].filter((item) => item.value > 0);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={(entry) => `${entry.name}: $${entry.value}`}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) =>
                    new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(value)
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt>Total Budget:</dt>
              <dd className="font-medium">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(budget)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt>Material Expenses:</dt>
              <dd className="font-medium text-blue-500">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(materialTotal)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt>Labor Expenses:</dt>
              <dd className="font-medium text-purple-500">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(laborTotal)}
              </dd>
            </div>
            <div className="flex justify-between border-t pt-2">
              <dt>Remaining Budget:</dt>
              <dd
                className={`font-medium ${
                  remaining < 0 ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(remaining)}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}