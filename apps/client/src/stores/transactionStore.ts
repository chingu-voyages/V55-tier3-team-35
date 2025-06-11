import { create } from 'zustand';

import { TRANSACTION_ENDPOINTS } from '@/api/constants';
import type { Transaction } from '@/schemas/transactionFormSchema';

import { GET } from './../api/api';
import { useAuthStore } from './authStores';

interface TransactionState {
  transactions: Transaction[];
  isLoadingTransactions: boolean;
  error: string | null;
  addTransaction: (transaction: Transaction) => void;
  fetchTransactions: () => Promise<void>;
  updateTransaction: (id: number, transaction: Transaction) => void;
  removeTransaction: (id: number) => void;
}

export const useTransactionStore = create<TransactionState>()((set, get) => ({
  transactions: [],
  isLoadingTransactions: false,
  error: null,

  addTransaction: (transaction: Transaction) => {
    const currentTransactions = get().transactions;
    set({
      transactions: [transaction, ...currentTransactions],
    });
  },

  fetchTransactions: async () => {
    const authState = useAuthStore.getState();
    if (!authState.user.id) {
      console.error('User ID not found in auth store');
      set({ error: 'User not authenticated' });
      return;
    }
    set({ isLoadingTransactions: true, error: null });

    try {
      const response = await GET(
        TRANSACTION_ENDPOINTS.LIST_BY_USER(authState.user.id),
      );
      const transactionData = response.data;
      console.log(`transaction data received from Backend: ${transactionData}`);
      set({
        transactions: transactionData,
        isLoadingTransactions: false,
      });
    } catch (error) {
      console.error('Failed to fetch transactions', error);
      set({
        error: 'Failed to load transactions',
        isLoadingTransactions: false,
      });
    }
  },

  updateTransaction: async (id: number, updatedTransaction: Transaction) => {
    console.log(
      `This action will update a transaction with ID of ${id} to ${updatedTransaction}`,
    );
  },

  removeTransaction: async (id: number) => {
    console.log(`This action will remove a transaction with ID of ${id}`);
  },
}));
