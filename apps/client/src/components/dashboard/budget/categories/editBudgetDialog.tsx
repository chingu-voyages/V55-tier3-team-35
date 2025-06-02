import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
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
import { CATEGORY_OPTIONS, THEME_OPTIONS } from '@/constants/budgetOptions';
import { useBudgetStore } from '@/stores/budgetStore';
import type { Budget } from '@/types/budget.types';

interface EditBudgetDialogProps {
  budget: Budget;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface BudgetForm {
  category: string;
  maximum: number;
  theme: string;
}

const EditBudgetDialog: React.FC<EditBudgetDialogProps> = ({
  budget,
  open,
  onOpenChange,
}) => {
  const { updateBudget } = useBudgetStore();

  const form = useForm<BudgetForm>({
    defaultValues: {
      category: budget.category,
      maximum: budget.maximum,
      theme: budget.theme,
    },
  });

  const onSubmit = (data: BudgetForm) => {
    updateBudget(budget.id, {
      category: data.category,
      maximum: data.maximum,
      theme: data.theme,
    });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-Gray-900 mb-4">
            Edit Budget
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="text-sm text-Gray-500 mb-4">
              Update your budget details as needed.
            </div>

            <FormField
              control={form.control}
              name="category"
              rules={{ required: 'Category is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-Gray-500">
                    Budget Category
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full border border-Gray-500 rounded-lg">
                        <SelectValue />
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
              control={form.control}
              name="maximum"
              rules={{
                required: 'Maximum spend is required',
                min: { value: 0.01, message: 'Amount must be positive' },
              }}
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
                        placeholder="e.g. 100.00"
                        value={field.value || ''}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                        className="w-full pl-8 pr-4 py-2 border border-Gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-Green"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="theme"
              rules={{ required: 'Theme is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-Gray-500">
                    Theme
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full border border-Gray-500 rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-Gray-500">
                        {THEME_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 rounded-full bg-${option.value.toLowerCase()}-500`}
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

            <Button
              type="submit"
              className="w-full bg-Gray-900 hover:bg-Gray-900/90 text-white rounded-lg py-3"
            >
              Save Changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBudgetDialog;
