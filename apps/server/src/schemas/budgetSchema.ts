import { z } from 'zod';

export const budgetSchema = z.object({
  category_id: z.number().positive(),
  user_id: z.number().positive(),
  budget_amount: z.number(),
  month: z.number().min(1).max(12),
  year: z.number().min(2025).max(2100),
});

export const updateBudgetSchema = z.object({
  budget_amount: z.number().optional(),
  month: z.number().min(1).max(12).optional(),
  year: z.number().min(2025).max(2100).optional(),
});


export const budgetResponseSchema = z.object({
  id: z.number(),
  category_id: z.number(),
  user_id: z.number(),
  budget_amount: z.any(),
  month: z.number(),
  year: z.number(),
  created_at: z.date().optional(),
});

export type Budget = z.infer<typeof budgetSchema>;
export type UpdateBudget = z.infer<typeof updateBudgetSchema>;
export type BudgetResponse = z.infer<typeof budgetResponseSchema>;
