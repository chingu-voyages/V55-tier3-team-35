// src/api/axiosConfig.js
import axios, { type AxiosResponse, type AxiosError } from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}/api/v1`
    : 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true, // Enable sending cookies with requests
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

API.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized request. Redirecting to login...');

      // Clear authentication state
      import('../stores/authStores').then(({ useAuthStore }) => {
        useAuthStore.getState().authLogout();
      });

      // Redirect to login page for better UX
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default API;
