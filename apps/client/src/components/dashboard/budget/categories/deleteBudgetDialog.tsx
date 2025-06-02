import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useBudgetStore } from '@/stores/budgetStore';
import type { Budget } from '@/types/budget.types';

interface DeleteBudgetDialogProps {
  budget: Budget;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteBudgetDialog: React.FC<DeleteBudgetDialogProps> = ({
  budget,
  open,
  onOpenChange,
}) => {
  const { deleteBudget } = useBudgetStore();

  const handleDelete = () => {
    deleteBudget(budget.id);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-Gray-900 mb-4">
            Delete '{budget.category}'?
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p className="text-Gray-500 text-sm">
            Are you sure you want to delete this budget? This action cannot be
            reversed, and all associated data will be removed permanently.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleDelete}
              className="w-full bg-Red hover:bg-Red/90 text-white rounded-lg py-3"
            >
              Yes, Confirm Deletion
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="w-full border border-Gray-500 text-Gray-900 rounded-lg py-3 hover:bg-Gray-100"
            >
              No, Go Back
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBudgetDialog;
