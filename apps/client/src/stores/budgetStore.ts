import { create } from 'zustand';

import { get as apiGet, post, patch, del } from '../api/api';
import type { Budget, BudgetFormData } from '../types/budget.types';

// Mock data for fallback
const mockBudgets: Budget[] = [
  {
    id: '1',

    category: 'Entertainment',
    maximum: 50,
    spent: 15,
    remaining: 35,
    period: 'monthly',
    theme: 'Blue',
  },
  {
    id: '2',

    category: 'Bills',
    maximum: 750,
    spent: 150,
    remaining: 600,
    period: 'monthly',
    theme: 'Red',
  },
  {
    id: '3',

    category: 'Food',
    maximum: 75,
    spent: 133,
    remaining: -58,
    period: 'monthly',
    theme: 'Green',
  },
  {
    id: '4',
    category: 'Personal',
    maximum: 100,
    spent: 40,
    remaining: 60,
    period: 'monthly',
    theme: 'Purple',
  },
];

interface BudgetStore {
  budgets: Budget[];
  isLoading: boolean;
  error: string | null;
  addBudget: (budget: BudgetFormData) => Promise<void>;
  fetchBudgets: () => Promise<void>;
  updateBudget: (id: string, updates: Partial<Budget>) => Promise<void>;
  deleteBudget: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useBudgetStore = create<BudgetStore>((set) => {
  const handleAsync = async (operation: () => Promise<void>) => {
    set({ isLoading: true, error: null });
    try {
      await operation();
      set({ isLoading: false });
    } catch (error) {
      console.error('Budget Store Error:', error);
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  };

  return {
    budgets: [],
    isLoading: false,
    error: null,

    clearError: () => set({ error: null }),

    fetchBudgets: () =>
      handleAsync(async () => {
        try {
          const budgets = await apiGet('/budgets');
          set({ budgets });
        } catch {
          set({ budgets: mockBudgets });
        }
      }),

    addBudget: (budgetData: BudgetFormData) =>
      handleAsync(async () => {
        const newBudget = await post('/budgets', {
          ...budgetData,
          maximum: parseFloat(budgetData.maximum),
        });
        set((state) => ({ budgets: [...state.budgets, newBudget] }));
      }),

    updateBudget: (id: string, updates: Partial<Budget>) =>
      handleAsync(async () => {
        const updatedBudget = await patch(`/budgets/${id}`, updates);
        set((state) => ({
          budgets: state.budgets.map((b) => (b.id === id ? updatedBudget : b)),
        }));
      }),

    deleteBudget: (id: string) =>
      handleAsync(async () => {
        await del(`/budgets/${id}`);
        set((state) => ({
          budgets: state.budgets.filter((b) => b.id !== id),
        }));
      }),
  };
});
