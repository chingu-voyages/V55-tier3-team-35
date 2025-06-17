// src/api/constants.ts

export interface AuthEndpoints {
  LOGIN: string;
  REGISTER: string;
  ME: string;
  LOGOUT: string;
  USER_DETAILS: string;
  CHECK_STATUS: string;
}

export interface UserEndpoints {
  UPDATE_USER: string;
}

export interface CurrencyEndpoints {
  LIST: string;
}

export interface TransactionEndpoints {
  LIST_BY_USER: (userId: number) => string;
  CREATE: string;
  UPDATE: (transactionId: string | number) => string;
  DELETE: (transactionId: string | number) => string;
}

export interface CategoryEndpoints {
  LIST_BY_USER: (userId: number) => string;
}

export interface BudgetEndpoints {
  CREATE: string;
  LIST_BY_USER: (userId: number) => string;
  UPDATE: (budgetId: number, userId: number) => string;
  DELETE: (budgetId: number, userId: number) => string;
  GET_USER_SPENDING: (userId: number) => string;
}
