import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import CategoryCard from '@/components/dashboard/budget/categories/categoryCard';
import BudgetHeader from '@/components/dashboard/budget/header/budgetHeader';
import BudgetPieChart from '@/components/dashboard/budget/pieChart/budgetPieChart';
import { useAuthStore } from '@/stores/authStores';
import { useBudgetStore } from '@/stores/budgetStore';

const BudgetsPage: React.FC = () => {
  const { budgets, fetchBudgets } = useBudgetStore();
  const { isLoading, isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="px-[16px] py-[24px] lg:py-[32px] lg:px-[40px] mb-[66px] md:mb-0">
      <BudgetHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BudgetPieChart />
        <div className="space-y-4">
          {budgets.length > 0 ? (
            budgets.map((budget) => (
              <CategoryCard key={budget.id} budget={budget} />
            ))
          ) : (
            <div className="text-Gray-500 text-center">Loading budgets...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetsPage;
