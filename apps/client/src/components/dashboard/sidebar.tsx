import {
  Home,
  CircleDollarSign,
  ArrowLeftRight,
  ArrowLeft,
  ArrowRight,
  LogOut,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStores';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const sidebarItems: SidebarItem[] = [
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

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authLogout } = useAuthStore();

  const currentPath = location.pathname;
  const activeTab =
    sidebarItems.find((item) => currentPath.startsWith(item.path))?.id ||
    'budgets';

  const handleLogout = async () => {
    try {
      await authLogout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still navigate even if logout fails
      navigate('/');
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div
      className={cn(
        'hidden md:flex bg-Gray-900 transition-all duration-200 ease-in-out flex-col rounded-r-lg',
        isCollapsed ? 'w-20' : 'w-64',
      )}
    >
      {/* Header */}
      <div className="p-6 tracking-tight">
        {isCollapsed ? (
          <span className="text-xl font-bold text-white">FT</span>
        ) : (
          <h2 className="text-xl font-bold text-white">FinTrack</h2>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.path)}
            className={cn(
              'rounded-r-lg flex items-center px-6 py-4 transition-colors text-left cursor-pointer',
              activeTab === item.id
                ? 'bg-Beige-100 text-Gray-900 border-l-2 border-l-Green'
                : 'text-Gray-300 hover:bg-[#333333] hover:text-white',
              'w-[90%]',
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

      {/* Footer Actions */}
      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-Gray-300 hover:text-Red hover:bg-[#333333] mb-2"
          onClick={handleLogout}
        >
          <LogOut className={cn('w-5 h-5', isCollapsed ? 'mx-auto' : 'mr-3')} />
          {!isCollapsed && <span>Logout</span>}
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start text-Gray-300 hover:text-white hover:bg-[#333333]"
          onClick={onToggle}
        >
          {isCollapsed ? (
            <ArrowRight className="w-5 h-5 mx-auto" />
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
