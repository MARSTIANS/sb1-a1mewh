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
import { Material } from '@/types';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const DISTRIBUTORS = [
  'ABC Supplies',
  'Design Materials Co.',
  'Interior Essentials',
  'Premium Furnishings',
];

interface MaterialPurchaseProps {
  onAddMaterial: (material: Material) => void;
  remainingBudget: number;
}

export function MaterialPurchase({
  onAddMaterial,
  remainingBudget,
}: MaterialPurchaseProps) {
  const [open, setOpen] = useState(false);
  const [material, setMaterial] = useState({
    name: '',
    cost: 0,
    distributor: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (material.cost > remainingBudget) {
      alert('Cost exceeds remaining budget!');
      return;
    }

    onAddMaterial({
      id: uuidv4(),
      ...material,
      date: new Date().toISOString(),
    });
    setMaterial({ name: '', cost: 0, distributor: '' });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Material
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Material Purchase</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Material Name</label>
            <Input
              value={material.name}
              onChange={(e) =>
                setMaterial((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Cost</label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={material.cost}
              onChange={(e) =>
                setMaterial((prev) => ({
                  ...prev,
                  cost: parseFloat(e.target.value),
                }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Distributor</label>
            <Select
              value={material.distributor}
              onValueChange={(value) =>
                setMaterial((prev) => ({ ...prev, distributor: value }))
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select distributor" />
              </SelectTrigger>
              <SelectContent>
                {DISTRIBUTORS.map((distributor) => (
                  <SelectItem key={distributor} value={distributor}>
                    {distributor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Add Material
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}