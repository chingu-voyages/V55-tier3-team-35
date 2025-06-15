import { create } from 'zustand';

import { DEL, GET } from '@/api/api';
import { TRANSACTION_ENDPOINTS } from '@/api/constants';
import type { Transaction } from '@/schemas/transactionFormSchema';
import { useAuthStore } from './authStores';

interface TransactionState {
  transactions: Transaction[];
  isLoadingTransactions: boolean;
  error: string | null;
  addTransaction: (transaction: Transaction) => void;
  fetchTransactions: () => Promise<void>;
  updateTransaction: (id: number, transaction: Transaction) => void;
  deleteTransaction: (id: number) => Promise<void>;
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
      const response = await GET(TRANSACTION_ENDPOINTS.LIST_BY_USER);
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

  deleteTransaction: async (id: number) => {
    const authState = useAuthStore.getState();
    if (!authState.user?.id) {
      console.error('User ID not found in auth store');
      set({ error: 'User not authenticated' });
      return;
    }

    const currentTransactions = get().transactions;
    
    set({
      transactions: currentTransactions.filter(t => t.id !== id),
    });

    try {
      await DEL(TRANSACTION_ENDPOINTS.DELETE(id));
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      set({
        transactions: currentTransactions,
        error: 'Failed to delete transaction',
      });
    }
  },
}));
