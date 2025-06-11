import { useState } from 'react';

import MobileNav from '@/components/dashboard/mobileNav';
import Sidebar from '@/components/dashboard/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F2F3F7]">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div className="flex-1 overflow-y-auto">{children}</div>
      <MobileNav />
    </div>
  );
};

export default DashboardLayout;
