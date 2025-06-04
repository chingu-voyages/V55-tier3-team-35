import { create } from 'zustand';

import { post, patch, del, get as apiGet } from '../api/api';

import { capitalize } from '@/lib/utils';
import type { Budget, BudgetFormData } from '@/types/budget.types';

const mockBudgets: Budget[] = [
  {
    id: '1',
    category: 'Entertainment',
    maximum: 50,
    spending: 15,
    remaining: 35,
    theme: 'Green',
  },
  {
    id: '2',
    category: 'Bills',
    maximum: 750,
    spending: 150,
    remaining: 600,
    theme: 'Red',
  },
  {
    id: '3',
    category: 'Food',
    maximum: 75,
    spending: 133,
    remaining: -58,
    theme: 'Green',
  },
  {
    id: '4',
    category: 'Personal',
    maximum: 100,
    spending: 40,
    remaining: 60,
    theme: 'Yellow',
  },
];

interface BudgetStore {
  budgets: Budget[];
  error: string | null;
  addBudget: (budgetData: BudgetFormData) => Promise<void>;
  updateBudget: (
    id: string,
    updates: Omit<Partial<Budget>, 'spending'> & { spending?: string },
  ) => Promise<void>;
  deleteBudget: (id: string) => Promise<void>;
  fetchBudgets: () => Promise<void>;
  clearError: () => void;
  hasFetchedBudgets: boolean;
}

export const useBudgetStore = create<BudgetStore>((set, get) => ({
  budgets: [],
  error: null,
  hasFetchedBudgets: false,

  clearError: () => set({ error: null }),

  fetchBudgets: async () => {
    if (get().hasFetchedBudgets) return;
    set({ hasFetchedBudgets: true });
    try {
      const budgets = await apiGet('/budgets');
      set({ budgets: budgets.length ? budgets : mockBudgets });
    } catch (error) {
      console.error('Failed to fetch budgets:', error);
      set({ budgets: mockBudgets });
    }
  },

  addBudget: async (budgetData) => {
    const tempId = `temp-${Date.now()}`;
    const maximum = Number(budgetData.maximum);
    const spending = Number(budgetData.spending) || 0;

    const newBudget: Budget = {
      ...budgetData,
      id: tempId,
      category: capitalize(budgetData.category),
      maximum,
      spending,
      remaining: maximum - spending,
      theme: budgetData.theme,
    };

    set((state) => ({
      budgets: [...state.budgets, newBudget],
    }));

    try {
      const savedBudget = await post('/budgets', budgetData);

      set((state) => ({
        budgets: state.budgets.map((budget) =>
          budget.id === tempId ? { ...budget, id: savedBudget.id } : budget,
        ),
      }));
    } catch (error) {
      console.error('Failed to add budget:', error);
      set({ error: 'Failed to add budget' });
    }
  },

  updateBudget: async (id, updates) => {
    const currentBudgets = get().budgets;
    const budgetToUpdate = currentBudgets.find((b) => b.id === id);

    if (!budgetToUpdate) return;

    const newSpending = updates.spending
      ? (budgetToUpdate.spending || 0) + Number(updates.spending)
      : budgetToUpdate.spending;

    const newMaximum =
      updates.maximum !== undefined
        ? Number(updates.maximum)
        : budgetToUpdate.maximum;

    const newRemaining = newMaximum - newSpending;

    set((state) => ({
      budgets: state.budgets.map((budget) =>
        budget.id === id
          ? {
              ...budget,
              ...updates,
              maximum: newMaximum,
              spending: newSpending,
              remaining: newRemaining,
              theme: updates.theme !== undefined ? updates.theme : budget.theme,
              category:
                updates.category !== undefined
                  ? capitalize(updates.category)
                  : budget.category,
            }
          : budget,
      ),
    }));

    try {
      await patch(`/budgets/${id}`, {
        ...updates,
        spending: updates.spending ? newSpending : undefined,
      });
    } catch (error) {
      console.error('Failed to update budget:', error);
      set({ error: 'Failed to update budget' });
    }
  },

  deleteBudget: async (id) => {
    const currentBudgets = get().budgets;
    const budgetToDelete = currentBudgets.find((b) => b.id === id);

    if (!budgetToDelete) return;

    set((state) => ({
      budgets: state.budgets.filter((budget) => budget.id !== id),
    }));

    try {
      await del(`/budgets/${id}`);
    } catch (error) {
      console.error('Failed to delete budget:', error);
      set({ error: 'Failed to delete budget' });
    }
  },
}));
