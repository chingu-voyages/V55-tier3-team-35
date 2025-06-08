import type {
  AuthEndpoints,
  UserEndpoints,
  CurrencyEndpoints,
  CategoryEndpoints,
  TransactionEndpoints,
} from '@/types/endpoints';

// Authentication Endpoints
export const AUTH_ENDPOINTS: AuthEndpoints = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/auth/me',
  LOGOUT: '/auth/logout',
  USER_DETAILS: '/auth/user-details',
  CHECK_STATUS: '/auth/status',
};

// User Endpoints
export const USER_ENDPOINTS: UserEndpoints = {
  UPDATE_USER: '/user/me', // PATCH /user/me for updating current user
};

// Currency Endpoints
export const CURRENCY_ENDPOINTS: CurrencyEndpoints = {
  LIST: '/currencies', // GET /currencies for listing all currencies
};

// Transaction Endpoints
export const TRANSACTION_ENDPOINTS: TransactionEndpoints = {
  CREATE: '/transactions',
  UPDATE: (transactionId) => `transactions/${transactionId}`,
  LIST_BY_USER: (userId) => `transactions/user/${userId}`,
  DELETE: (transactionId) => `transactions/${transactionId}`,
} as const;

// Category Endpoints
export const CATEGORY_ENDPOINTS: CategoryEndpoints = {
  LIST_BY_USER: (userId) => `categories/user/${userId}`,
} as const;
