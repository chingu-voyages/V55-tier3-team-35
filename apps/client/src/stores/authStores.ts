import { create } from 'zustand';

import { post } from '../api/api';
import {
  type AuthState,
  type AuthLoginData,
  type AuthRegisterData,
  type UserDetailsForm,
} from './../types/stores.d';

import { AUTH_ENDPOINTS } from '@/api/constants';
import { type AxioError } from '@/types/stores.d';

export const useAuthStore = create<AuthState>((set) => ({
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
      if (error instanceof Error) {
        const errorMessage =
          (error as AxioError).response?.data?.message ||
          error.message ||
          'An unexpected error occurred.';
        throw new Error(errorMessage);
      }
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
        user: response.user,
        isLoading: false,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage =
          (error as AxioError).response?.data?.message ||
          error.message ||
          'An unexpected error occurred.';
        throw new Error(errorMessage);
      }
      set({ isLoading: false, isAuthenticated: false });
      throw error;
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      set({ isAuthenticated: true });
    }
  },

  saveUserDetails: async (data: UserDetailsForm) => {
    set({ isLoading: true });
    try {
      //   const response = await post(AUTH_ENDPOINTS.USER_DETAILS, data, {});
      console.log('######DATA########################', data);
      set({ defaultCurrency: 'USD', isLoading: false });
      return 'USD';
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage =
          (error as AxioError).response?.data?.message ||
          error.message ||
          'An unexpected error occurred.';
        throw new Error(errorMessage);
      }
      set({ isLoading: false, isAuthenticated: false });
      throw error;
    }
  },
}));
