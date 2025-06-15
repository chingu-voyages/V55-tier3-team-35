import { create } from 'zustand';

import { capitalize } from '@/lib/utils';
import { CATEGORY_THEME_MAP, CATEGORY_OPTIONS } from '@/constants/budgetOptions';
import type { Budget, BudgetFormData } from '@/types/budget.types';
import { useAuthStore } from '@/stores/authStores';
import { useCategoryStore } from '@/stores/categoryStore';
import { BUDGET_ENDPOINTS } from '@/api/constants';

import { POST, PATCH, GET as apiGet, DEL } from '../api/api';

const transformServerBudget = async (serverBudget: any): Promise<Budget> => {
  const maximum = Number(serverBudget.budget_amount);
  const spending = serverBudget.spending !== undefined ? Number(serverBudget.spending) : 0;
  
  let categoryName = '';
  if (serverBudget.categories?.name) {
    categoryName = serverBudget.categories.name;
  } else {
    const categoryStore = useCategoryStore.getState();
    
    if (!categoryStore.hasFetched) {
      await categoryStore.fetchCategories();
    }
    
    const category = categoryStore.categories.find(cat => cat.id === serverBudget.category_id);
    if (!category) {
      console.error('Category not found for budget:', serverBudget);
      categoryName = 'Unknown Category';
    } else {
      categoryName = category.name;
    }
  }
  
  return {
    id: serverBudget.id.toString(),
    category_id: serverBudget.category_id,
    category: categoryName,
    maximum,
    spending,
    remaining: maximum - spending,
    theme: CATEGORY_THEME_MAP[categoryName.toLowerCase()] || 'Green',
  };
};

const calculateTotals = (budgets: Budget[]) => ({
  totalSpending: budgets.reduce((sum, b) => sum + b.spending, 0),
  totalMaximum: budgets.reduce((sum, b) => sum + b.maximum, 0),
  totalRemaining: budgets.reduce((sum, b) => sum + b.remaining, 0),
});

interface BudgetStore {
  budgets: Budget[];
  totalSpending: number;
  totalMaximum: number;
  totalRemaining: number;
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
  updateTotals: (totals: { totalSpending: number; totalMaximum: number; totalRemaining: number }) => void;
}

export const useBudgetStore = create<BudgetStore>((set, get) => ({
  budgets: [],
  totalSpending: 0,
  totalMaximum: 0,
  totalRemaining: 0,
  error: null,
  hasFetchedBudgets: false,

  clearError: () => set({ error: null }),

  updateTotals: (totals) => set(totals),

  fetchBudgets: async () => {
    const categoryStore = useCategoryStore.getState();
    if (!categoryStore.hasFetched) {
      await categoryStore.fetchCategories();
    }

    const userId = useAuthStore.getState().user?.id;
    if (!userId) {
      set({ error: 'User not authenticated' });
      return;
    }

    try {
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      const [budgetsResponse, spendingResponse] = await Promise.all([
        apiGet(BUDGET_ENDPOINTS.LIST_BY_USER(userId)),
        apiGet(`${BUDGET_ENDPOINTS.GET_USER_SPENDING(userId)}?year=${currentYear}&month=${currentMonth}`)
      ]);

      if (!budgetsResponse.data) {
        throw new Error('No budget data received');
      }

      const spendingMap = new Map();
      if (spendingResponse.data?.budgets) {
        spendingResponse.data.budgets.forEach((budgetSpending: { categoryId: number; spentAmount: number }) => {
          spendingMap.set(budgetSpending.categoryId, budgetSpending.spentAmount);
        });
      }

      const categories = categoryStore.categories;
      const categoryMap = new Map(categories.map(cat => [cat.id, cat]));

      const transformedBudgets = await Promise.all(
        budgetsResponse.data.map(async (serverBudget: any) => {
          const category = categoryMap.get(serverBudget.category_id);
          if (!category) {
            console.error('Category not found for budget:', serverBudget);
            return null;
          }

          const maximum = Number(serverBudget.budget_amount);
          const spending = spendingMap.get(serverBudget.category_id) || 0;

          return {
            id: serverBudget.id.toString(),
            category_id: serverBudget.category_id,
            category: category.name,
            maximum,
            spending,
            remaining: maximum - spending,
            theme: CATEGORY_THEME_MAP[category.name.toLowerCase()] || 'Green',
          };
        })
      ).then(budgets => budgets.filter(Boolean)); 
      
      set({
        budgets: transformedBudgets,
        ...calculateTotals(transformedBudgets),
        hasFetchedBudgets: true
      });
    } catch (error) {
      console.error('Failed to fetch budgets:', error);
      set({ error: 'Failed to fetch budgets' });
    }
  },

  addBudget: async (budgetData) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) {
      set({ error: 'User not authenticated' });
      return;
    }

    const maximum = Number(budgetData.maximum);
    const spending = Number(budgetData.spending) || 0;
    
    const categoryStore = useCategoryStore.getState();
    if (!categoryStore.hasFetched) {
      await categoryStore.fetchCategories();
    }
    
    const serverCategory = categoryStore.categories.find(
      cat => cat.name.toLowerCase() === budgetData.category.toLowerCase()
    );

    if (!serverCategory) {
      set({ error: 'Category not found' });
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const newBudget: Budget = {
      id: tempId,
      category_id: serverCategory.id,
      category: serverCategory.name,
      maximum,
      spending,
      remaining: maximum - spending,
      theme: CATEGORY_THEME_MAP[budgetData.category.toLowerCase()] || 'Green',
    };

    const newBudgets = [...get().budgets, newBudget];
    set({
      budgets: newBudgets,
      ...calculateTotals(newBudgets),
    });

    try {
      const currentDate = new Date();
      const serverBudgetData = {
        category_id: serverCategory.id,
        user_id: userId,
        budget_amount: maximum,
        month: currentDate.getMonth() + 1,
        year: Math.max(2025, currentDate.getFullYear()),
      };

      const response = await POST('/budgets', serverBudgetData);
      if (!response.data) {
        throw new Error('No response data received');
      }

      const savedBudget = await transformServerBudget(response.data);

      set((state) => ({
        budgets: state.budgets.map((budget) =>
          budget.id === tempId ? savedBudget : budget
        ),
        ...calculateTotals(state.budgets.map((budget) =>
          budget.id === tempId ? savedBudget : budget
        ))
      }));
    } catch (error) {
      console.error('Failed to add budget:', error);
      set({ error: 'Failed to add budget' });
      const currentBudgets = get().budgets.filter(b => b.id !== tempId);
      set({
        budgets: currentBudgets,
        ...calculateTotals(currentBudgets),
      });
    }
  },

  updateBudget: async (id, updates) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) {
      set({ error: 'User not authenticated' });
      return;
    }

    const currentBudgets = get().budgets;
    const budgetToUpdate = currentBudgets.find((b) => b.id === id);

    if (!budgetToUpdate) return;

    const newSpending = updates.spending
      ? Number(updates.spending)
      : budgetToUpdate.spending;

    const newMaximum =
      updates.maximum !== undefined
        ? Number(updates.maximum)
        : budgetToUpdate.maximum;

    const newRemaining = newMaximum - newSpending;

    let newCategory = budgetToUpdate.category;
    let newTheme = budgetToUpdate.theme;

    if (updates.category) {
      const categoryOption = CATEGORY_OPTIONS.find(
        opt => opt.value === updates.category
      );
      if (categoryOption) {
        newCategory = categoryOption.label;
        newTheme = CATEGORY_THEME_MAP[updates.category] || 'Green';
      }
    }

    const updatedBudget = {
      ...budgetToUpdate,
      ...updates,
      maximum: newMaximum,
      spending: newSpending,
      remaining: newRemaining,
      category: newCategory,
      theme: newTheme,
    };
    const updatedBudgets = currentBudgets.map((budget) =>
      budget.id === id ? updatedBudget : budget
    );

    set({
      budgets: updatedBudgets,
      ...calculateTotals(updatedBudgets),
    });

    if (updates.maximum !== undefined) {
      try {
        const serverUpdateData = {
          budget_amount: newMaximum,
          month: new Date().getMonth() + 1,
          year: Math.max(2025, new Date().getFullYear())
        };

        const response = await PATCH(BUDGET_ENDPOINTS.UPDATE(Number(id), userId), serverUpdateData);
        if (!response.data) {
          throw new Error('No response data received');
        }

        const updatedServerBudget = {
          ...await transformServerBudget(response.data),
          spending: newSpending,
          remaining: newMaximum - newSpending,
          theme: newTheme
        };

        set((state) => ({
          budgets: state.budgets.map((budget) =>
            budget.id === id ? updatedServerBudget : budget
          ),
          ...calculateTotals(state.budgets.map((budget) =>
            budget.id === id ? updatedServerBudget : budget
          ))
        }));
      } catch (error) {
        console.error('Failed to update budget:', error);
        set({ error: 'Failed to update budget' });
        // Revert to original state on error
        set({
          budgets: currentBudgets,
          ...calculateTotals(currentBudgets),
        });
      }
    }
  },

  deleteBudget: async (id) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) {
      set({ error: 'User not authenticated' });
      return;
    }

    const currentBudgets = get().budgets;
    const budgetToDelete = currentBudgets.find((b) => b.id === id);

    if (!budgetToDelete) return;
    const updatedBudgets = currentBudgets.filter((budget) => budget.id !== id);
    set({
      budgets: updatedBudgets,
      ...calculateTotals(updatedBudgets),
    });

    try {
      const response = await DEL(BUDGET_ENDPOINTS.DELETE(Number(id), userId));
      if (!response.data) {
        throw new Error('No response data received');
      }
    } catch (error) {
      console.error('Failed to delete budget:', error);
      set({ error: 'Failed to delete budget' });
      set({
        budgets: currentBudgets,
        ...calculateTotals(currentBudgets),
      });
    }
  },
}));
