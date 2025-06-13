import { create } from 'zustand';

import { GET } from '@/api/api';
import { CATEGORY_ENDPOINTS } from '@/api/constants';

import { useAuthStore } from './authStores';
import type { Category } from '../types/categories.d.ts';

interface TransactionType {
  id: number;
  name: string;
}

interface CategoryState {
  categories: Category[];
  transactionTypes: TransactionType[];
  isLoadingCategories: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>()((set) => ({
  categories: [],
  transactionTypes: [
    { id: 1, name: 'Income' },
    { id: 2, name: 'Expense' },
  ],
  isLoadingCategories: false,
  error: null,

  fetchCategories: async () => {
    const authState = useAuthStore.getState();
    if (!authState.user.id) {
      console.error('User ID not found in auth store');
      set({ error: 'User not authenticated!' });
      return;
    }

    set({ isLoadingCategories: true, error: null });
    try {
      const response = await GET(
        `${CATEGORY_ENDPOINTS.LIST_BY_USER(authState.user.id)}`,
      );
      const categoriesData = response.data;
      set({
        categories: categoriesData,
        isLoadingCategories: false,
      });
    } catch (error) {
      console.error('Failed to fetch categories', error);
      set({
        error: 'Failed to load categories',
        isLoadingCategories: false,
      });
    }
  },
}));
