import type { ThemeOption, CategoryOption } from '../types/budget.types';

export const THEME_OPTIONS: ThemeOption[] = [
  { value: 'Green', label: 'Green', colorClass: 'bg-Green' },
  { value: 'Yellow', label: 'Yellow', colorClass: 'bg-Yellow' },
  { value: 'Cyan', label: 'Cyan', colorClass: 'bg-Cyan' },
  { value: 'Navy', label: 'Navy', colorClass: 'bg-Navy' },
  { value: 'Turquoise', label: 'Turquoise', colorClass: 'bg-Turquoise' },
  { value: 'Brown', label: 'Brown', colorClass: 'bg-Brown' },
  { value: 'Magenta', label: 'Magenta', colorClass: 'bg-Magenta' },
  { value: 'Blue', label: 'Blue', colorClass: 'bg-Blue' },
  { value: 'NavyGrey', label: 'Navy Grey', colorClass: 'bg-NavyGrey' },
  { value: 'ArmyGreen', label: 'Army Green', colorClass: 'bg-ArmyGreen' },
  { value: 'Gold', label: 'Gold', colorClass: 'bg-Gold' },
  { value: 'Orange', label: 'Orange', colorClass: 'bg-Orange' },
];

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'bills', label: 'Bills' },
  { value: 'dining', label: 'Dining Out' },
  { value: 'personal', label: 'Personal Care' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'groceries', label: 'Groceries' },
  { value: 'health', label: 'Health' },
  { value: 'travel', label: 'Travel' },
  { value: 'education', label: 'Education' },
];


export const CATEGORY_THEME_MAP: Record<string, string> = {
  entertainment: 'Magenta',
  bills: 'Blue',
  dining: 'Orange',
  personal: 'Turquoise',
  shopping: 'Gold',
  transportation: 'Navy',
  groceries: 'Green',
  health: 'Cyan',
  travel: 'Yellow',
  education: 'Brown',
  rent: 'NavyGrey',
  mortgage: 'ArmyGreen',
  utilities: 'Gold',
  internet: 'Orange',
  phone: 'Turquoise',
  cable: 'Navy',
  insurance: 'Green',
};

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
