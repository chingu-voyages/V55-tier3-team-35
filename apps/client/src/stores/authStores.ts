import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  AUTH_ENDPOINTS,
  CURRENCY_ENDPOINTS,
  USER_ENDPOINTS,
} from '@/api/constants';

import { GET, PATCH, POST } from '../api/api';
import {
  type AuthState,
  type AuthLoginData,
  type AuthRegisterData,
  type UserDetailsForm,
  type Currency,
} from './../types/stores.d';


type PersistedAuthState = Pick<AuthState, 'isAuthenticated' | 'user' | 'defaultCurrencyId'>;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isLoading: false,
      isAuthenticated: false,
      user: {
        id: null,
        username: null,
      },
      defaultCurrencyId: null,

      authLogin: async (data: AuthLoginData) => {
        set({ isLoading: true });
        try {
          const response = await POST(AUTH_ENDPOINTS.LOGIN, data);
          const newState = {
            token: 'set_by_cookie',
            isAuthenticated: true,
            user: response.user,
            defaultCurrencyId: response.default_currency_id,
            isLoading: false,
          };
          set(newState);
          return response;
        } catch (error: unknown) {
          set({ isLoading: false, isAuthenticated: false });
          throw error;
        }
      },

      authLogout: async () => {
        try {
          await POST(AUTH_ENDPOINTS.LOGOUT, {});
        } catch (error) {
          console.error('Logout request failed:', error);
        } finally {
          set({
            token: null,
            isAuthenticated: false,
            user: { id: null, username: null },
            defaultCurrencyId: null,
          });
        }
      },

      authRegister: async (data: AuthRegisterData) => {
        set({ isLoading: true });
        try {
          const response = await POST(AUTH_ENDPOINTS.REGISTER, data);
          const newState = {
            token: 'set_by_cookie',
            isAuthenticated: true,
            user: response.user,
            isLoading: false,
            defaultCurrencyId: null,
          };
          set(newState);
        } catch (error: unknown) {
          set({ isLoading: false, isAuthenticated: false });
          throw error;
        }
      },

      checkAuth: async () => {
        const persistedState = get() as PersistedAuthState;
        if (persistedState.isAuthenticated && persistedState.user.id) {
          set({ isLoading: true });
        }

        try {
          const response = await GET(AUTH_ENDPOINTS.CHECK_STATUS);
          const newState = {
            isAuthenticated: true,
            user: response.user,
            defaultCurrencyId: response.default_currency,
            isLoading: false,
          };
          set(newState);
        } catch (error) {
          console.error('Auth check failed:', error);
          if (error instanceof Error && !error.message.includes('Network Error')) {
            set({
              isAuthenticated: false,
              user: { id: null, username: null },
              defaultCurrencyId: null,
              isLoading: false,
            });
          }
        }
      },

      saveUserDetails: async (data: UserDetailsForm) => {
        set({ isLoading: true });
        try {
          const currentState = get();
          if (!currentState.user.id) {
            throw new Error('User ID not found. Please log in again.');
          }

          const currenciesResponse = await GET(CURRENCY_ENDPOINTS.LIST);
          const currencies: Currency[] = currenciesResponse.data || currenciesResponse;

          const selectedCurrency = currencies.find(
            (currency) => currency.id === data.default_currency_id,
          );

          if (!selectedCurrency) {
            throw new Error(`Currency ${data.default_currency_id} not found`);
          }

          const updateData = {
            firstName: data.firstName,
            lastName: data.lastName,
            defaultCurrencyId: selectedCurrency.id,
            userId: currentState.user.id,
          };

          await PATCH(USER_ENDPOINTS.UPDATE_USER, updateData);

          const newState = {
            defaultCurrencyId: data.default_currency_id,
            user: {
              ...currentState.user,
              firstName: data.firstName,
              lastName: data.lastName,
            },
            isLoading: false,
          };
          set(newState);

          return data.default_currency_id;
        } catch (error: unknown) {
          set({ isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        defaultCurrencyId: state.defaultCurrencyId,
      }),
    }
  )
);
