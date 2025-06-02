import { useEffect } from 'react';

import CategoryCard from '@/components/dashboard/budget/categories/categoryCard';
import BudgetHeader from '@/components/dashboard/budget/header/budgetHeader';
import { useBudgetStore } from '@/stores/budgetStore';

const BudgetsTab: React.FC = () => {
  const { budgets, fetchBudgets } = useBudgetStore();
  console.log(budgets);

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div className="px-[16px] py-[24px] lg:py-[32px] lg:px-[40px] mb-[66px] md:mb-0">
      <BudgetHeader />
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
  );
};

export default BudgetsTab;
