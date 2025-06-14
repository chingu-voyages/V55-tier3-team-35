import { TrendingUp } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { useBudgetStore } from '@/stores/budgetStore';

const MonthlySpending = () => {
  const state = useBudgetStore();

  return (
    <Card className="bg-white border-0 rounded-xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-Gray-500">
              Monthly Spending
            </p>
            <h3 className="text-2xl font-bold mt-2 text-Gray-900">
              ${state.totalSpending.toFixed(2)}
            </h3>
          </div>
          <div className="p-2 bg-Beige-100 rounded-full">
            <TrendingUp className="h-6 w-6 text-Green" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlySpending;
