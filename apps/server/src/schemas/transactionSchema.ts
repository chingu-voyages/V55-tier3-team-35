import Decimal from 'decimal.js';
import { z } from 'zod';

export const transactionSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(200),
  category_id: z.number().positive(),
  transaction_type_id: z.number().positive(),
  amount: z.string().transform((val) => Decimal(val)),
  user_id: z.number().positive(),
  transaction_date: z.string().transform((val) => new Date(val)),
  notes: z.string().nullable().optional(),
});

export const createTransactionSchema = transactionSchema.omit({ id: true });
export type createTransactionInput = z.infer<typeof createTransactionSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
