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
  LIST_BY_USER: (userId: string | number) => string;
  CREATE: string;
  UPDATE: (userId: string | number) => string;
  DELETE: (userId: string | number) => string;
}

export interface CategoryEndpoints {
  LIST_BY_USER: (userId: string | number) => string;
}
