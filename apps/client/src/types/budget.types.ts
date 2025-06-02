export interface BudgetFormData {
  category: string;
  maximum: string;
  theme: string;
}

export interface Budget {
  id: string;
  category: string;
  maximum: number;
  theme: string;
  spent: number;
  remaining: number;
}

export interface ThemeOption {
  value: string;
  label: string;
  colorClass: string;
}

export interface CategoryOption {
  value: string;
  label: string;
}
