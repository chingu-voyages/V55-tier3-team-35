import AddBudgetButton from './addBudgetButton';
import BudgetTitle from './budgetTitle';

const BudgetHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <BudgetTitle />
      <AddBudgetButton />
    </div>
  );
};

export default BudgetHeader;
