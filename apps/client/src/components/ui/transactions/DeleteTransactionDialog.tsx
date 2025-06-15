import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useTransactionStore } from '@/stores/transactionStore';
import type { Transaction } from '@/schemas/transactionFormSchema';

interface DeleteTransactionDialogProps {
  transaction: Transaction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteTransactionDialog: React.FC<DeleteTransactionDialogProps> = ({
  transaction,
  open,
  onOpenChange,
}) => {
  const { deleteTransaction } = useTransactionStore();

  const handleDelete = async () => {
    await deleteTransaction(transaction.id);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby="delete-dialog-description"
        className="sm:max-w-md bg-white"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-Gray-900 mb-4">
            Delete Transaction '{transaction.name}'?
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <DialogDescription
            className="text-Gray-500 text-sm"
            id="delete-dialog-description"
          >
            Are you sure you want to delete this transaction? This action cannot be
            reversed.
          </DialogDescription>
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleDelete}
              className="w-full bg-Red hover:bg-Red/90 text-white rounded-lg py-3"
            >
              Yes, Delete Transaction
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="w-full border border-Gray-500 text-Gray-900 rounded-lg py-3 hover:bg-Gray-100"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTransactionDialog; 