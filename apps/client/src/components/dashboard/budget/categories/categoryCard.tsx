import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

import DeleteBudgetDialog from './deleteBudgetDialog';
import { BudgetDialog } from '../budgetDialog';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import type { Budget } from '@/types/budget.types';

// import EditBudgetDialog from './editBudgetDialog';

interface CategoryCardProps {
  budget: Budget;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ budget }) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const progress = (budget.spent / budget.maximum) * 100;

  return (
    <>
      <div className="bg-white rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full bg-${budget.theme}`} />
            <h3 className="text-lg font-semibold text-Gray-900">
              {budget.category}
            </h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="w-4 h-4 text-Gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white border border-Gray-300 shadow-lg"
            >
              <DropdownMenuItem
                onClick={() => setEditDialogOpen(true)}
                className="px-4 py-2 text-Gray-700 hover:bg-Gray-100 cursor-pointer"
              >
                Edit Budget
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="cursor-pointer hover:bg-Gray-100 text-Red"
              >
                Delete Budget
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mb-4">
          <Progress
            value={progress}
            className="h-8 bg-Beige-100"
            indicatorStyle={`bg-${budget.theme}`}
          />
        </div>
        <div className="flex justify-between text-sm">
          <div>
            <div className="text-Gray-500">Spent</div>
            <div className="text-Gray-900 font-medium">
              ${budget.spent.toFixed(2)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-Gray-500">Remaining</div>
            <div className="text-Gray-900 font-medium">
              ${budget.remaining.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      <BudgetDialog
        open={isEditDialogOpen}
        onOpenChange={setEditDialogOpen}
        budget={budget}
      />
      <DeleteBudgetDialog
        budget={budget}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </>
  );
};

export default CategoryCard;
