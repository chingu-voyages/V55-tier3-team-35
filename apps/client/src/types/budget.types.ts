export interface BudgetFormData {
  category: string;
  maximum: string;
  theme: string;
  spending?: string;
  category_id?: number;
}

export interface Budget {
  id: string;
  category_id: number;
  category: string;
  maximum: number;
  theme: string;
  spending: number;
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
