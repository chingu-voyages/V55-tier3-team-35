import { create } from 'zustand';

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

export const useAuthStore = create<AuthState>()((set) => ({
  token: null,
  isLoading: true,
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
      set({
        token: 'set_by_cookie',
        isAuthenticated: true,
        user: response.user,
        defaultCurrencyId: response.default_currency_id,
        isLoading: false,
      });
      return response;
    } catch (error: unknown) {
      set({ isLoading: false, isAuthenticated: false });
      throw error;
    }
  },

  authLogout: async () => {
    await POST(AUTH_ENDPOINTS.LOGOUT, {});
    set({
      token: null,
      isAuthenticated: false,
      user: { id: null, username: null },
    });
  },

  authRegister: async (data: AuthRegisterData) => {
    set({ isLoading: true });
    try {
      const response = await POST(AUTH_ENDPOINTS.REGISTER, data);
      set({
        token: 'set_by_cookie',
        isAuthenticated: true,
        user: response.user,
        isLoading: false,
        defaultCurrencyId: null,
      });
    } catch (error: unknown) {
      set({ isLoading: false, isAuthenticated: false });
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      const response = await GET(AUTH_ENDPOINTS.CHECK_STATUS);
      set({
        isAuthenticated: true,
        user: response.user,
        defaultCurrencyId: response.default_currency,
        isLoading: false,
      });
    } catch (error) {
      set({
        isAuthenticated: false,
        user: { id: null, username: null },
        isLoading: false,
      });
      console.error('User is not authenticated', error);
    }
  },

  saveUserDetails: async (data: UserDetailsForm) => {
    set({ isLoading: true });
    try {
      const currentState = useAuthStore.getState();

      if (!currentState.user.id) {
        throw new Error('User ID not found. Please log in again.');
      }

      // Fetch currencies from the API so that we can map the currency code to the currency id
      const currenciesResponse = await GET(CURRENCY_ENDPOINTS.LIST);
      const currencies: Currency[] =
        currenciesResponse.data || currenciesResponse;

      // currency mapping
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

      set({
        defaultCurrencyId: data.default_currency_id,
        user: {
          ...currentState.user,
          firstName: data.firstName,
          lastName: data.lastName,
        },
        isLoading: false,
      });

      return data.default_currency_id;
    } catch (error: unknown) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
