// src/api/constants.ts

interface AuthEndpoints {
  LOGIN: string;
  REGISTER: string;
  ME: string;
  LOGOUT: string;
  USER_DETAILS: string;
}

interface UserEndpoints {
  UPDATE_USER: string;
}

interface CurrencyEndpoints {
  LIST: string;
}

// Authentication Endpoints
export const AUTH_ENDPOINTS: AuthEndpoints = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/auth/me',
  LOGOUT: '/auth/logout',
  USER_DETAILS: '/auth/user-details',
};

// User Endpoints
export const USER_ENDPOINTS: UserEndpoints = {
  UPDATE_USER: '/user/me', // PATCH /user/me for updating current user
};

// Currency Endpoints
export const CURRENCY_ENDPOINTS: CurrencyEndpoints = {
  LIST: '/currencies', // GET /currencies for listing all currencies
};
