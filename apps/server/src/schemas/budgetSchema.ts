import { z } from 'zod';

export const budgetSchema = z.object({
  category_id: z.number().positive(),
  id: z.number().positive().optional(),
  user_id: z.number().positive(),
  budget_amount: z.number(),
  month: z.number().min(1).max(12),
  year: z.number().min(2025).max(2100),
});

export type Budget = z.infer<typeof budgetSchema>;
