import { Home, CircleDollarSign, ArrowLeftRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Overview',
    icon: Home,
    path: '/overview',
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: ArrowLeftRight,
    path: '/transactions',
  },
  {
    id: 'budgets',
    label: 'Budgets',
    icon: CircleDollarSign,
    path: '/budgets',
  },
];

const MobileNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract current tab from URL path
  const currentPath = location.pathname;
  const activeTab =
    navItems.find((item) => currentPath.startsWith(item.path))?.id || 'budgets';

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-Gray-900 border-t border-gray-700">
      <div className="flex justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.path)}
            className={cn(
              'flex flex-col items-center py-2 px-4 transition-colors',
              activeTab === item.id
                ? 'text-Green'
                : 'text-Gray-300 hover:text-white',
            )}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
