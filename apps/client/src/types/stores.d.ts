export interface AuthState {
  token: null | string;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User;
  authLogin: (data: AuthLoginData) => Promise<void>;
  authLogout: () => void;
  authRegister: (data: AuthRegisterData) => Promise<void>;
  checkAuth: () => Promise<void>;
  defaultCurrency: string | null;
  saveUserDetails: (data: UserDetailsForm) => Promise<string>;
}

interface User {
  id: number | null;
  username: string | null;
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
  default_currency: string;
  monthly_budget: number;
}

interface AxioError {
  response?: {
    data?: {
      message?: string;
    };
  };
}
