import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { PATCH, POST } from '@/api/api';
import { TRANSACTION_ENDPOINTS } from '@/api/constants';
import {
  transactionFormSchema,
  transformFormDataToPayload,
  transformTransactionToFormData,
  type Transaction,
  type TransactionFormData,
} from '@/schemas/transactionFormSchema';
import { useAuthStore } from '@/stores/authStores';
import { useCategoryStore } from '@/stores/categoryStore';

import { Button } from '../button';

interface TransactionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingTransaction?: Transaction;
  onSuccess?: () => void;
}

const TransactionFormModal = ({
  isOpen,
  onClose,
  existingTransaction,
  onSuccess,
}: TransactionFormModalProps) => {
  const { user } = useAuthStore();
  const { categories, transactionTypes, isLoadingCategories } =
    useCategoryStore();
  const isEditMode = !!existingTransaction;
  const modalTitle = isEditMode ? 'Edit Transaction' : 'Add New Transaction';
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      name: '',
      amount: 0,
      category_id: 0,
      transaction_type_id: 0,
      transaction_date: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && existingTransaction) {
        const formData = transformTransactionToFormData(existingTransaction);
        Object.entries(formData).forEach(([key, value]) => {
          setValue(key as keyof TransactionFormData, value);
        });
      } else {
        reset();
      }
    }
  }, [isOpen, existingTransaction, isEditMode, reset, setValue]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const onSubmit: SubmitHandler<TransactionFormData> = async (
    data: TransactionFormData,
  ) => {
    if (!user.id) {
      console.error('User Id not found');
      return;
    }

    try {
      if (isEditMode && existingTransaction) {
        const payload = transformFormDataToPayload(
          user.id,
          data,
          existingTransaction.id,
        );
        await PATCH(
          `${TRANSACTION_ENDPOINTS.UPDATE(existingTransaction.id)}`,
          payload,
        );
      } else {
        const payload = transformFormDataToPayload(user.id, data);
        await POST(`${TRANSACTION_ENDPOINTS.CREATE}`, payload);
      }

      onClose();
      reset();
      onSuccess?.();
    } catch (error) {
      console.error('Failed to submit transaction', error);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          disabled={isSubmitting}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black">{modalTitle}</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Transaction Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm text-gray-600">
              Transaction Name *
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              disabled={isSubmitting}
              className="w-full p-2.5 border border-gray-300 rounded-md
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                transition-all duration-200 placeholder:text-gray-400 
                text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="What was it for?"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="amount" className="text-sm text-gray-600">
              Amount *
            </label>
            <input
              type="number"
              id="amount"
              step="0.01"
              min="0"
              {...register('amount', { valueAsNumber: true })}
              disabled={isSubmitting}
              className="w-full p-2.5 border border-gray-300 rounded-md
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                transition-all duration-200 placeholder:text-gray-400 
                text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="0.00"
            />
            {errors.amount && (
              <span className="text-red-500 text-sm">
                {errors.amount.message}
              </span>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="category_id" className="text-sm text-gray-600">
              Category *
            </label>
            <select
              id="category_id"
              {...register('category_id', { valueAsNumber: true })}
              disabled={isSubmitting || isLoadingCategories}
              className="w-full p-2.5 border border-gray-300 rounded-md
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                transition-all duration-200 text-black 
                disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value={0}>
                {isLoadingCategories
                  ? 'Loading categories...'
                  : 'Select a category'}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <span className="text-red-500 text-sm">
                {errors.category_id.message}
              </span>
            )}
          </div>

          {/* Transaction Type */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="transaction_type_id"
              className="text-sm text-gray-600"
            >
              Type *
            </label>
            <select
              id="transaction_type_id"
              {...register('transaction_type_id', { valueAsNumber: true })}
              disabled={isSubmitting}
              className="w-full p-2.5 border border-gray-300 rounded-md
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                transition-all duration-200 text-black 
                disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value={0}>Select transaction type</option>
              {transactionTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            {errors.transaction_type_id && (
              <span className="text-red-500 text-sm">
                {errors.transaction_type_id.message}
              </span>
            )}
          </div>

          {/* Transaction Date */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="transaction_date" className="text-sm text-gray-600">
              Date *
            </label>
            <input
              type="date"
              id="transaction_date"
              {...register('transaction_date')}
              disabled={isSubmitting}
              max={new Date().toISOString().split('T')[0]} // Prevent future dates
              className="w-full p-2.5 border border-gray-300 rounded-md
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                transition-all duration-200 text-black 
                disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            {errors.transaction_date && (
              <span className="text-red-500 text-sm">
                {errors.transaction_date.message}
              </span>
            )}
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="notes" className="text-sm text-gray-600">
              Notes
            </label>
            <textarea
              id="notes"
              {...register('notes')}
              disabled={isSubmitting}
              rows={3}
              className="w-full p-2.5 border border-gray-300 rounded-md
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                transition-all duration-200 placeholder:text-gray-400 
                text-black disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
              placeholder="Any additional notes..."
            />
            {errors.notes && (
              <span className="text-red-500 text-sm">
                {errors.notes.message}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-2.5 bg-gray-300 hover:bg-gray-400 
                text-black font-medium rounded-md
                transition-colors duration-200 
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isLoadingCategories}
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 
                text-white font-medium rounded-md
                transition-colors duration-200 
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? isEditMode
                  ? 'Updating...'
                  : 'Creating...'
                : isEditMode
                  ? 'Update'
                  : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionFormModal;
