import type { ThemeOption, CategoryOption } from '../types/budget.types';

export const THEME_OPTIONS: ThemeOption[] = [
  { value: 'green', label: 'Green', colorClass: 'bg-Green' },
  { value: 'yellow', label: 'Yellow', colorClass: 'bg-Yellow' },
  { value: 'cyan', label: 'Cyan', colorClass: 'bg-Cyan' },
  { value: 'navy', label: 'Navy', colorClass: 'bg-Navy' },
];

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'bills', label: 'Bills' },
  { value: 'dining', label: 'Dining Out' },
  { value: 'personal', label: 'Personal Care' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'transportation', label: 'Transportation' },
];

export const FORM_VALIDATION = {
  category: {
    required: 'Budget category is required',
  },
  maximum: {
    required: 'Maximum spend amount is required',
    min: {
      value: 0.01,
      message: 'Amount must be greater than 0',
    },
    pattern: {
      value: /^\d+(\.\d{1,2})?$/,
      message: 'Please enter a valid amount (e.g., 100 or 100.50)',
    },
  },
  theme: {
    required: 'Theme selection is required',
  },
};
