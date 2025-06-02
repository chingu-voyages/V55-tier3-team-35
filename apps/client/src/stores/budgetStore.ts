import { create } from 'zustand';

import { post, patch, del, get as apiGet } from '../api/api';

import { capitalize } from '@/lib/utils';
import type { Budget, BudgetFormData } from '@/types/budget.types';

// Mock data for fallback
const mockBudgets: Budget[] = [
  {
    id: '1',
    category: 'Entertainment',
    maximum: 50,
    spent: 15,
    remaining: 35,
    theme: 'Green',
  },
  {
    id: '2',
    category: 'Bills',
    maximum: 750,
    spent: 150,
    remaining: 600,
    theme: 'Red',
  },
  {
    id: '3',
    category: 'Food',
    maximum: 75,
    spent: 133,
    remaining: -58,
    theme: 'Green',
  },
  {
    id: '4',
    category: 'Personal',
    maximum: 100,
    spent: 40,
    remaining: 60,
    theme: 'Yellow',
  },
];

interface BudgetStore {
  budgets: Budget[];
  error: string | null;
  addBudget: (budgetData: BudgetFormData) => Promise<void>;
  updateBudget: (id: string, updates: Partial<Budget>) => Promise<void>;
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
    const newBudget: Budget = {
      ...budgetData,
      id: tempId,
      category: capitalize(budgetData.category),
      maximum: Number(budgetData.maximum),
      spent: 0,
      remaining: Number(budgetData.maximum),
      theme: budgetData.theme || 'Green',
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
    }
  },

  updateBudget: async (id, updates) => {
    const currentBudgets = get().budgets;
    const budgetToUpdate = currentBudgets.find((b) => b.id === id);

    if (!budgetToUpdate) return;

    // Optimistic update
    set((state) => ({
      budgets: state.budgets.map((budget) =>
        budget.id === id
          ? {
              ...budget,
              ...updates,
              maximum:
                updates.maximum !== undefined
                  ? Number(updates.maximum)
                  : budget.maximum,
              remaining:
                updates.maximum !== undefined
                  ? Number(updates.maximum) - budget.spent
                  : budget.remaining,
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
      await patch(`/budgets/${id}`, updates);
    } catch (error) {
      console.error('Failed to update budget:', error);
    }
  },

  deleteBudget: async (id) => {
    const currentBudgets = get().budgets;
    const budgetToDelete = currentBudgets.find((b) => b.id === id);

    if (!budgetToDelete) return;

    // Optimistic update
    set((state) => ({
      budgets: state.budgets.filter((budget) => budget.id !== id),
    }));

    try {
      // Background server request
      await del(`/budgets/${id}`);
    } catch (error) {
      console.error('Failed to delete budget:', error);
    }
  },
}));
