import {
  Home,
  PiggyBank,
  CircleDollarSign,
  ArrowLeftRight,
} from 'lucide-react';

import { cn } from '@/lib/utils';

interface MobileNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const mobileNavItems: MobileNavItem[] = [
  { id: 'dashboard', label: 'Overview', icon: Home },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'budgets', label: 'Budgets', icon: CircleDollarSign },
  { id: 'savings', label: 'Pots', icon: PiggyBank },
];

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-Gray-900 rounded-t-lg border-t border-[#333333] z-50">
      <div className="flex justify-around items-center pt-2">
        {mobileNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              'flex flex-col items-center py-2 px-3 transition-colors rounded-t-sm min-w-[20%]',
              activeTab === item.id
                ? 'bg-Beige-100 text-Gray-900 border-b-2 border-b-Green'
                : 'text-Gray-300 hover:bg-[#333333] hover:text-white',
            )}
          >
            <item.icon
              className={cn(
                activeTab === item.id ? 'text-Green' : 'text-Gray-300',
                'w-5 h-5 mb-1 ',
              )}
            />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
