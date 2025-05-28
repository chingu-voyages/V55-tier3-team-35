import axios from 'axios';

const API = axios.create({
  baseURL: '/api/v1', // Use relative URL to leverage Vite proxy
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
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
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized request. Redirecting to login...');
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  },
);

export default API;
