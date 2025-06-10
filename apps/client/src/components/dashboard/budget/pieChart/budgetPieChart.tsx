import { PieChart, Pie, Cell } from 'recharts';

import { useBudgetStore } from '@/stores/budgetStore';

import SpendingSummary from './spendingSummary';

const BudgetPieChart: React.FC = () => {
  const state = useBudgetStore();

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <PieChart width={240} height={240}>
            <Pie
              data={state.budgets}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              dataKey="spending"
              nameKey="category"
              startAngle={90}
              endAngle={450}
            >
              {state.budgets.map((budget, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`var(--color-${budget.theme})`}
                />
              ))}
            </Pie>
          </PieChart>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-Gray-900">
              ${state.totalSpending.toFixed(2)}
            </div>
            <div className="text-sm text-Gray-500">
              of ${state.totalMaximum.toFixed(2)} limit
            </div>
          </div>
        </div>
      </div>
      <SpendingSummary />
    </div>
  );
};

export default BudgetPieChart;
