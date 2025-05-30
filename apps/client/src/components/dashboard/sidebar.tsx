import {
  Home,
  PiggyBank,
  CircleDollarSign,
  ArrowLeftRight,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Overview', icon: Home },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'budgets', label: 'Budgets', icon: CircleDollarSign },
  { id: 'savings', label: 'Pots', icon: PiggyBank },
];

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isCollapsed,
  onToggle,
}) => {
  return (
    <div
      className={cn(
        'hidden md:flex bg-Gray-900 transition-all duration-200 ease-in-out flex-col rounded-r-lg',
        isCollapsed ? 'w-20' : 'w-64',
      )}
    >
      <div className="p-6  tracking-tight">
        {isCollapsed ? (
          <span className="text-xl font-bold text-white">FT</span>
        ) : (
          <h2 className="text-xl font-bold text-white">FinTrack</h2>
        )}
      </div>
      <div className="flex-1 ">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              ' rounded-r-lg flex items-center px-6 py-4 transition-colors text-left cursor-pointer',
              activeTab === item.id
                ? 'bg-Beige-100 text-Gray-900 border-l-2 border-l-Green'
                : 'text-Gray-300 hover:bg-[#333333] hover:text-white',
              isCollapsed ? 'w-[90%]' : 'w-[90%]',
            )}
          >
            <item.icon
              className={cn(
                'w-5 h-5',
                activeTab === item.id ? 'text-Green' : 'text-Gray-300',
                isCollapsed ? 'mx-0' : 'mr-4',
              )}
            />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </div>
      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-center text-Gray-300 hover:text-white hover:bg-[#333333]"
          onClick={onToggle}
        >
          {isCollapsed ? (
            <ArrowRight className="w-5 h-5" />
          ) : (
            <>
              <ArrowLeft className="w-5 h-5 mr-3" />
              <span>Minimize Menu</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
