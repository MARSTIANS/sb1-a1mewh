import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Labor } from '@/types';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface LaborSectionProps {
  onAddLabor: (labor: Labor) => void;
  remainingBudget: number;
}

export function LaborSection({ onAddLabor, remainingBudget }: LaborSectionProps) {
  const [open, setOpen] = useState(false);
  const [labor, setLabor] = useState({
    name: '',
    role: 'main' as Labor['role'],
    charge: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (labor.charge > remainingBudget) {
      alert('Charge exceeds remaining budget!');
      return;
    }

    onAddLabor({
      id: uuidv4(),
      ...labor,
      date: new Date().toISOString(),
    });
    setLabor({ name: '', role: 'main', charge: 0 });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Labor
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Labor Assignment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Worker Name</label>
            <Input
              value={labor.name}
              onChange={(e) =>
                setLabor((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <Select
              value={labor.role}
              onValueChange={(value: Labor['role']) =>
                setLabor((prev) => ({ ...prev, role: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">Main</SelectItem>
                <SelectItem value="helper">Helper</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Charge</label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={labor.charge}
              onChange={(e) =>
                setLabor((prev) => ({
                  ...prev,
                  charge: parseFloat(e.target.value),
                }))
              }
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Add Labor
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}