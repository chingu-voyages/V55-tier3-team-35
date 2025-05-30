import { useState } from 'react';

import MobileNav from '@/components/dashboard/mobileNav';
import Sidebar from '@/components/dashboard/sidebar';
import BudgetsTab from '@/components/dashboard/tabs/budgetsTab';
import DashboardTab from '@/components/dashboard/tabs/dashboardTab';
import SavingsTab from '@/components/dashboard/tabs/savingsTab';
import TransactionsTab from '@/components/dashboard/tabs/transactionsTab';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('budgets');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'transactions':
        return <TransactionsTab />;
      case 'budgets':
        return <BudgetsTab />;
      case 'savings':
        return <SavingsTab />;
      default:
        return <div className="p-6">Content for {activeTab} tab</div>;
    }
  };

  return (
    <div className={` flex flex-col md:flex-row h-screen bg-[#F2F3F7]`}>
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isCollapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />
      <div className="flex-1 overflow-y-auto">{renderActiveTabContent()}</div>
      <MobileNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default HomePage;
