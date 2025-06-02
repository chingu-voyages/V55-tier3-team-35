import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { BudgetFormFields } from './budgetFormFields';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useBudgetStore } from '@/stores/budgetStore';
import type { Budget, BudgetFormData } from '@/types/budget.types';

interface BudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  budget?: Budget;
  trigger?: React.ReactNode;
}

export const BudgetDialog: React.FC<BudgetDialogProps> = ({
  open,
  onOpenChange,
  budget,
  trigger,
}) => {
  const { addBudget, updateBudget } = useBudgetStore();
  const isEdit = !!budget;

  const form = useForm<BudgetFormData>();

  useEffect(() => {
    if (open) {
      if (isEdit && budget) {
        form.reset({
          category: budget.category,
          maximum: budget.maximum.toString(),
          theme: budget.theme,
        });
      } else {
        form.reset({
          category: '',
          maximum: '',
          theme: '',
        });
      }
    }
  }, [isEdit, budget, open, form]);

  const onSubmit = async (data: BudgetFormData) => {
    if (isEdit && budget) {
      await updateBudget(budget.id, {
        category: data.category,
        maximum: Number(data.maximum),
        theme: data.theme,
      });
    } else {
      await addBudget({
        category: data.category,
        maximum: data.maximum,
        theme: data.theme,
      });
    }
    onOpenChange(false);
  };

  const handleDialogChange = (open: boolean) => {
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      {trigger}
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-Gray-900 mb-2">
            {isEdit ? `Edit "${budget?.category}" Budget` : 'Add New Budget'}
          </DialogTitle>
          {!isEdit && (
            <DialogDescription className="text-sm text-Gray-500 mb-2">
              Create a new budget to track your spending in a specific category.
            </DialogDescription>
          )}
          {isEdit && (
            <div className="text-sm text-Gray-500 mb-4">
              Make changes to your budget. Only update the fields you want to
              change.
            </div>
          )}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <BudgetFormFields control={form.control} isEdit={isEdit} />
            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 bg-Gray-900 hover:bg-Gray-900/90 text-white rounded-lg py-3"
              >
                {isEdit ? 'Save Changes' : 'Add Budget'}
              </Button>
              {isEdit && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="px-6 border border-Gray-500 text-Gray-900 rounded-lg py-3 hover:bg-Gray-100"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
