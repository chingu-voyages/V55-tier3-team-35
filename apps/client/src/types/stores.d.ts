export interface LoginResponse {
  message: string;
  user: {
    id: number;
    username: string;
    defaultCurrencyId?: number;
  };
}

export interface AuthState {
  token: null | string;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User;
  authLogin: (data: AuthLoginData) => Promise<LoginResponse>;
  authLogout: () => void;
  authRegister: (data: AuthRegisterData) => Promise<void>;
  checkAuth: () => Promise<void>;
  defaultCurrencyId: string | number | null;
  saveUserDetails: (data: UserDetailsForm) => Promise<number>;
}

interface User {
  id: number | null;
  username: string | null;
  firstName?: string | null;
  lastName?: string | null;
  defaultCurrencyId?: number | null;
}

export interface AuthLoginData {
  username: string;
  password: string;
}

export interface AuthRegisterData {
  username: string;
  password: string;
}

export interface UserDetailsForm {
  firstName: string;
  lastName: string;
  default_currency_id: number;
}

export interface Currency {
  id: number;
  name: string;
  symbol: string;
  code: string;
}

interface AxioError {
  response?: {
    data?: {
      message?: string;
    };
  };
}
