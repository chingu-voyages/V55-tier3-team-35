import React from 'react';
import type { Control } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CATEGORY_OPTIONS,
  THEME_OPTIONS,
  FORM_VALIDATION,
} from '@/constants/budgetOptions';
import { useBudgetStore } from '@/stores/budgetStore';
import type { BudgetFormData } from '@/types/budget.types';

interface BudgetFormFieldsProps {
  control: Control<BudgetFormData>;
  isEdit?: boolean;
}

export const BudgetFormFields: React.FC<BudgetFormFieldsProps> = ({
  control,
  isEdit = false,
}) => {
  const { budgets } = useBudgetStore();

  const usedCategories = budgets.map((b) => b.category.toLowerCase());
  const usedThemes = budgets.map((b) => b.theme);

  return (
    <>
      <FormField
        control={control}
        name="category"
        rules={FORM_VALIDATION.category}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-Gray-500">
              Budget Category
            </FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full border border-Gray-500 rounded-lg">
                  <SelectValue placeholder="e.g. Entertainment" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-Gray-500">
                  {CATEGORY_OPTIONS.map((option) => {
                    const isUsed =
                      usedCategories.includes(option.value.toLowerCase()) &&
                      option.value.toLowerCase() !== field.value.toLowerCase();
                    return (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        disabled={isUsed}
                        className={
                          isUsed ? 'opacity-50 cursor-not-allowed' : ''
                        }
                      >
                        {option.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="maximum"
        rules={FORM_VALIDATION.maximum}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-Gray-500">
              Maximum Spend
            </FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-Gray-500">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder={isEdit ? undefined : 'e.g. 2000'}
                  value={field.value || ''}
                  onChange={field.onChange}
                  className="w-full pl-8 pr-4 py-2 border border-Gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-Green"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="spending"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-Gray-500">
              Add Spending
            </FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-Gray-500">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder={isEdit ? 'e.g. 100' : '0'}
                  value={field.value || ''}
                  onChange={field.onChange}
                  className="w-full pl-8 pr-4 py-2 border border-Gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-Green"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="theme"
        rules={FORM_VALIDATION.theme}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-Gray-500">
              Theme
            </FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full border border-Gray-500 rounded-lg">
                  <SelectValue placeholder="Pick a theme" />
                </SelectTrigger>
                <SelectContent>
                  {THEME_OPTIONS.map((option) => {
                    const isUsed =
                      usedThemes.includes(option.value) &&
                      option.value !== field.value;
                    return (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        disabled={isUsed}
                        className={
                          isUsed ? 'opacity-50 cursor-not-allowed' : ''
                        }
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-4 h-4 rounded-full bg-${option.value}`}
                          />
                          {option.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
