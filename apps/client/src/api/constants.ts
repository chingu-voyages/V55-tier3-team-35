// src/api/constants.js

export const BASE_URL = 'http://localhost:3000';

interface AuthEndpoints {
  LOGIN: string;
  REGISTER: string;
  ME: string;
  LOGOUT: string;
  USER_DETAILS: string;
}

// Authentication Endpoints
export const AUTH_ENDPOINTS: AuthEndpoints = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/auth/me',
  LOGOUT: '/auth/logout',
  USER_DETAILS: '/auth/user-details',
};
