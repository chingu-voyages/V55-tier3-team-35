import { useBudgetStore } from '@/stores/budgetStore';

const SpendingSummary: React.FC = () => {
  const budgets = useBudgetStore((state) => state.budgets);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-Gray-900 mb-4">
        Spending Summary
      </h3>
      {budgets.map((budget) => (
        <div
          key={budget.id}
          className="flex items-center justify-between py-2 border-b border-Gray-100 last:border-b-0"
        >
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full bg-${budget.theme}`} />
            <span className="text-Gray-900 text-sm">{budget.category}</span>
          </div>
          <div className="text-right">
            <div className="text-Gray-900 font-medium">
              ${budget.spending.toFixed(2)}
            </div>
            <div className="text-Gray-500 text-xs">
              of ${budget.maximum.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpendingSummary;
