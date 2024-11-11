import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Settings,
  LogOut,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'CRM', href: '/crm', icon: Users },
  { name: 'Client Ledger', href: '/ledger', icon: ClipboardList },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-52 flex-col border-r bg-white text-gray-800">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900">WabiSabi</h2>
        <p className="text-sm text-gray-500">Interior Design CRM</p>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.name} to={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start hover:bg-gray-100',
                  location.pathname === item.href && 'bg-gray-200'
                )}
              >
                <Icon className="mr-3 h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-700">{item.name}</span>
              </Button>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-gray-100"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </div>
  );
}
