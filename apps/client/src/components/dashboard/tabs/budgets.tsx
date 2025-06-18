import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import CategoryCard from '@/components/dashboard/budget/categories/categoryCard';
import BudgetHeader from '@/components/dashboard/budget/header/budgetHeader';
import BudgetPieChart from '@/components/dashboard/budget/pieChart/budgetPieChart';
import BudgetsPageSkeleton from '@/components/skeleton/budgetSkeleton';
import { useAuthStore } from '@/stores/authStores';
import { useBudgetStore } from '@/stores/budgetStore';

const BudgetsPage = () => {
  const { budgets, fetchBudgets } = useBudgetStore();
  const { isLoading, isAuthenticated, user } = useAuthStore();
  const [loadingBudgets, setLoadingBudgets] = useState(false);
  useEffect(() => {
    if (!user?.id) return;

    const init = async () => {
      setLoadingBudgets(true);
      try {
        await fetchBudgets();
      } catch (error) {
        console.error('Failed to fetch budgets:', error);
      } finally {
        setLoadingBudgets(false);
      }
    };

    init();
  }, [fetchBudgets, user?.id]);

  if (isLoading || loadingBudgets) {
    return <BudgetsPageSkeleton></BudgetsPageSkeleton>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="px-[16px] py-[24px] lg:py-[32px] lg:px-[40px] mb-[66px] md:mb-0">
      <BudgetHeader />
      {budgets.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BudgetPieChart />
          <div className="space-y-4">
            {budgets.map((budget) => (
              <CategoryCard key={budget.id} budget={budget} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-lg font-medium text-Gray-900 mb-2">
              No budgets found
            </p>
            <p className="text-sm text-Gray-500">
              Add budgets to keep track of your spending and stay on top of your
              financial goals.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetsPage;
