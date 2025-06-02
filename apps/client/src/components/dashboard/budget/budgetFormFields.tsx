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
import type { BudgetFormData } from '@/types/budget.types';

interface BudgetFormFieldsProps {
  control: Control<BudgetFormData>;
  isEdit?: boolean;
}

export const BudgetFormFields: React.FC<BudgetFormFieldsProps> = ({
  control,
  isEdit = false,
}) => {
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
              <Select
                onValueChange={field.onChange}
                value={field.value} // Use value instead of defaultValue for controlled component
              >
                <SelectTrigger className="w-full border border-Gray-500 rounded-lg">
                  <SelectValue placeholder="e.g. Entertainment" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-Gray-500">
                  {CATEGORY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
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
                  {...field}
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder={isEdit ? undefined : 'e.g. 2000'}
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e.target.value)}
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
              <Select
                onValueChange={field.onChange}
                value={field.value} // Use value for controlled component
              >
                <SelectTrigger className="w-full border border-Gray-500 rounded-lg">
                  <SelectValue placeholder="Pick a theme" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-Gray-500">
                  {THEME_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full ${option.colorClass}`}
                        />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
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
