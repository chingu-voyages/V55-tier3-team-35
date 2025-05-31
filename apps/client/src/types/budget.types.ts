export interface BudgetFormData {
  category: string;
  maximum: string;
  theme: string;
  period?: string;
}

export interface Budget {
  id: string;
  category: string;
  maximum: number;
  theme: string;
  spent: number;
  remaining: number;
  period: string;
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
