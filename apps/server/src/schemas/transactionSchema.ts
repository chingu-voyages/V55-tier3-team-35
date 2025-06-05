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

export const getTransactionsSchema = z.object({
  id: z.coerce.number().positive(),
});

export const updateTransactionParamsSchema = z.object({
  userId: z.coerce.number().positive(),
  id: z.coerce.number().positive(),
});

export const updateTransactionBodySchema = z.object({
  name: z.string().max(200).optional(),
  category_id: z.number().positive().optional(),
  transaction_type_id: z.number().positive().optional(),
  amount: z
    .string()
    .transform((val) => Decimal(val))
    .optional(),
  transaction_date: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  notes: z.string().nullable().optional(),
});

export const deleteTransactionSchema = z.object({
  userId: z.coerce.number().positive(),
  id: z.coerce.number().positive(),
});

export const createTransactionSchema = transactionSchema.omit({ id: true });
export type createTransactionInput = z.infer<typeof createTransactionSchema>;
export type updateTransactionInput = z.infer<
  typeof updateTransactionBodySchema
>;
export type Transaction = z.infer<typeof transactionSchema>;
