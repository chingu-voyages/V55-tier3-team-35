import { z } from 'zod';
export const transactionFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Transaction name is required' })
    .max(200, { message: 'Name must be less than 200 characters' })
    .refine((val) => val.trim().length > 0, {
      message: 'Transaction name cannot be just spaces.',
    }),
  amount: z
    .number()
    .positive({ message: 'Amount must be greater than 0' })
    .max(999999999, { message: 'Amount is too large' }),

  category_id: z.number().positive({ message: 'Please select a category' }),

  transaction_type_id: z
    .number()
    .positive({ message: 'Please select a transaction type' }),

  transaction_date: z
    .string()
    .min(1, { message: 'Transaction date is required' })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Please enter a valid date',
    }),

  notes: z.string().optional(),
});

export const transformFormDataToPayloadSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  amount: z.string(),
  category_id: z.number(),
  transaction_type_id: z.number(),
  user_id: z.number(),
  transaction_date: z.string(),
  notes: z.string().optional(),
});

export type TransactionFormData = z.infer<typeof transactionFormSchema>;
export type CreateTransactionPayload = z.infer<
  typeof transformFormDataToPayloadSchema
>;

export interface Transaction {
  id: number;
  name: string;
  amount: string;
  category_id: number;
  transaction_type_id: number;
  user_id: number;
  transaction_date: string;
  notes?: string;
}

export const transformFormDataToPayload = (
  userId: number,
  formData: TransactionFormData,
  transactionId?: number,
): CreateTransactionPayload => ({
  id: transactionId,
  name: formData.name,
  amount: formData.amount.toString(),
  category_id: formData.category_id,
  transaction_type_id: formData.transaction_type_id,
  user_id: userId,
  transaction_date: formData.transaction_date,
  notes: formData.notes || '',
});

export const transformTransactionToFormData = (transaction: Transaction) => ({
  name: transaction.name,
  amount: parseFloat(transaction.amount),
  category_id: transaction.category_id,
  transaction_type_id: transaction.transaction_type_id,
  transaction_date: transaction.transaction_date.split('T')[0], // Extract date part for date input
  notes: transaction.notes || '',
});
