import { create } from 'zustand';

import { post, patch, get } from '../api/api';
import {
  type AuthState,
  type AuthLoginData,
  type AuthRegisterData,
  type UserDetailsForm,
  type Currency,
} from './../types/stores.d';

import {
  AUTH_ENDPOINTS,
  USER_ENDPOINTS,
  CURRENCY_ENDPOINTS,
} from '@/api/constants';

export const useAuthStore = create<AuthState>()((set) => ({
  token: null,
  isLoading: false,
  isAuthenticated: false,
  user: {
    id: null,
    username: null,
  },
  defaultCurrency: null,

  authLogin: async (data: AuthLoginData) => {
    set({ isLoading: true });
    try {
      const response = await post(AUTH_ENDPOINTS.LOGIN, data);
      set({
        token: response.token,
        isAuthenticated: true,
        user: response.user,
        defaultCurrency: response.default_currency,
        isLoading: false,
      });
      return response;
    } catch (error: unknown) {
      set({ isLoading: false, isAuthenticated: false });
      throw error;
    }
  },

  authLogout: () => {
    set({
      token: null,
      isAuthenticated: false,
      user: { id: null, username: null },
    });
  },

  authRegister: async (data: AuthRegisterData) => {
    set({ isLoading: true });
    try {
      const response = await post(AUTH_ENDPOINTS.REGISTER, data);
      set({
        token: response.token,
        isAuthenticated: true,
        user: {
          id: response.data.id,
          username: response.data.username,
          defaultCurrencyId: response.data.default_currency_id,
        },
        isLoading: false,
      });
    } catch (error: unknown) {
      set({ isLoading: false, isAuthenticated: false });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isAuthenticated: true });
  },

  saveUserDetails: async (data: UserDetailsForm) => {
    set({ isLoading: true });
    try {
      const currentState = useAuthStore.getState();

      if (!currentState.user.id) {
        throw new Error('User ID not found. Please log in again.');
      }

      // Fetch currencies from the API so that we can map the currency code to the currency id
      const currenciesResponse = await get(CURRENCY_ENDPOINTS.LIST);
      const currencies: Currency[] =
        currenciesResponse.data || currenciesResponse;

      // currency mapping
      const selectedCurrency = currencies.find(
        (currency) => currency.code === data.default_currency,
      );

      if (!selectedCurrency) {
        throw new Error(`Currency ${data.default_currency} not found`);
      }

      const updateData = {
        firstName: data.firstName,
        lastName: data.lastName,
        defaultCurrencyId: selectedCurrency.id,
        userId: currentState.user.id,
      };

      await patch(USER_ENDPOINTS.UPDATE_USER, updateData);

      set({
        defaultCurrency: data.default_currency,
        user: {
          ...currentState.user,
          firstName: data.firstName,
          lastName: data.lastName,
        },
        isLoading: false,
      });

      return data.default_currency;
    } catch (error: unknown) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
