export interface AuthState {
  token: null | string;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User;
}

interface User {
  id: int | null;
  username: string | null;
}
