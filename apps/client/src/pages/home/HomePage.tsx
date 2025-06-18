import { useEffect, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBudgetStore } from '@/stores/budgetStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { useTransactionStore } from '@/stores/transactionStore';

import DashboardSkeleton from './Loading';

const spendingCategories = [
  { name: 'Entertainment', amount: 50, color: '#8B5CF6' },
  { name: 'Bills', amount: 750, color: '#06B6D4' },
  { name: 'Dining Out', amount: 75, color: '#10B981' },
  { name: 'Personal Care', amount: 100, color: '#F59E0B' },
];

const monthlyData = [
  { month: 'Week 1', budget: 400, actual: 350 },
  { month: 'Week 2', budget: 450, actual: 420 },
  { month: 'Week 3', budget: 500, actual: 480 },
  { month: 'Week 4', budget: 400, actual: 380 },
  { month: 'Week 5', budget: 350, actual: 320 },
  { month: 'Week 6', budget: 450, actual: 440 },
  { month: 'Week 7', budget: 500, actual: 520 },
  { month: 'Week 8', budget: 400, actual: 390 },
  { month: 'Week 9', budget: 450, actual: 460 },
  { month: 'Week 10', budget: 500, actual: 480 },
];

const DonutChart = ({ value, total }: { value: number; total: number }) => {
  const percentage = (value / total) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="8"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">${value.toFixed(2)}</span>
        <span className="text-sm text-muted-foreground">of ${total} limit</span>
      </div>
    </div>
  );
};

const BarChart = ({ data }: { data: typeof monthlyData }) => {
  const maxValue = Math.max(...data.map((d) => Math.max(d.budget, d.actual)));

  return (
    <div className="flex items-end justify-between h-32 gap-1">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-1 flex-1">
          <div className="flex gap-1 items-end h-24">
            <div
              className="bg-gray-300 w-3 rounded-t"
              style={{ height: `${(item.budget / maxValue) * 100}%` }}
            />
            <div
              className="bg-gray-800 w-3 rounded-t"
              style={{ height: `${(item.actual / maxValue) * 100}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{item.month}</span>
        </div>
      ))}
    </div>
  );
};

export default function Dashboard({ isLoading }: { isLoading?: boolean }) {
  const { fetchCategories, isLoadingCategories } = useCategoryStore();
  const { transactions, isLoadingTransactions, fetchTransactions } =
    useTransactionStore();
  const { fetchBudgets, budgets } = useBudgetStore();

  useEffect(() => {
    fetchCategories();
    fetchTransactions();
    fetchBudgets();
  }, [fetchCategories, fetchTransactions, fetchBudgets]);

  const todaySpending = useMemo(() => {
    const today = new Date();
    const todayString =
      today.getFullYear() +
      '-' +
      String(today.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(today.getDate()).padStart(2, '0');

    return transactions
      .filter((transaction) => {
        const transactionDate = transaction.transaction_date.split('T')[0];
        return (
          transactionDate === todayString &&
          transaction.transaction_type_id === 2
        ); // 2 = expense
      })
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
  }, [transactions]);

  const thisMonthSpending = useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return transactions
      .filter((transaction) => {
        // Parse the transaction date more safely
        const transactionDate = new Date(
          transaction.transaction_date.split('T')[0] + 'T00:00:00',
        );
        return (
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear &&
          transaction.transaction_type_id === 2 // 2 = expense
        );
      })
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
  }, [transactions]);

  const totalBudgetRemaining = useMemo(() => {
    return budgets.reduce((acc, budget) => acc + budget.remaining, 0);
  }, [budgets]);

  const dailyTransactionData = useMemo(() => {
    const last7Days = [];

    // Generate last 7 days including today
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const localDateString =
        date.getFullYear() +
        '-' +
        String(date.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(date.getDate()).padStart(2, '0');
      last7Days.push(localDateString);
    }

    return last7Days.map((date) => {
      const dayTransactions = transactions.filter(
        (transaction) => transaction.transaction_date.split('T')[0] === date,
      );

      const income = dayTransactions
        .filter((t) => t.transaction_type_id === 1)
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      const expense = dayTransactions
        .filter((t) => t.transaction_type_id === 2)
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      const dateObj = new Date(date + 'T00:00:00'); // Add time to avoid timezone issues
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');

      return {
        date: `${month}/${day}`, // Numeric format: MM/DD
        income,
        expense,
      };
    });
  }, [transactions]);

  if (isLoading || isLoadingCategories || isLoadingTransactions) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-900">Overview</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Today I spent
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    ${todaySpending.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    This Month I spent
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    ${thisMonthSpending.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Monthly Budget Remaining
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    ${totalBudgetRemaining.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Transactions Chart */}
            <Card>
              <CardHeader className="bg-white border-b rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    Daily Transactions (Last 7 Days)
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyTransactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        `${value}`,
                        name === 'income' ? 'Income' : 'Expense',
                      ]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#10B981"
                      strokeWidth={2}
                      name="Income"
                    />
                    <Line
                      type="monotone"
                      dataKey="expense"
                      stroke="#EF4444"
                      strokeWidth={2}
                      name="Expense"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="bg-white border-b rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    Recent Transactions
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    View All →
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {transactions
                    .sort(
                      (a, b) =>
                        new Date(b.transaction_date).getTime() -
                        new Date(a.transaction_date).getTime(),
                    )
                    .slice(0, 6)
                    .map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border-b last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium">{transaction.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.transaction_date.split('T')[0]}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`font-bold ${transaction.transaction_type_id === 1 ? 'text-green-600' : 'text-red-600'}`}
                        >
                          {transaction.transaction_type_id === 1 ? '+' : '-'}$
                          {transaction.amount}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Spending Chart */}
            <Card>
              <CardHeader className="bg-white border-b rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle>Spending</CardTitle>
                  <Button variant="ghost" size="sm">
                    See Details →
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <DonutChart value={338} total={975} />
                <div className="mt-6 space-y-3">
                  {spendingCategories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <span className="font-medium">${category.amount}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Spending vs Target */}
            <Card>
              <CardHeader className="bg-white border-b rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    Spending vs. Target
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-300 rounded"></div>
                      <span>Budget</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-800 rounded"></div>
                      <span>Actual</span>
                    </div>
                  </div>
                </div>
                <BarChart data={monthlyData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
