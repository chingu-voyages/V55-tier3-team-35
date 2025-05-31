import { z } from 'zod';

export const transactionSchema = z.object({
  name: z.string(),
  amount: z.number(),
  type: z.enum(['income', 'expense']),
  categoryId: z.number(),
  userId: z.number(),
  createdAt: z.date(),
  transactionDate: z.date(),
});
