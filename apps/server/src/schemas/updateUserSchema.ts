import { z } from 'zod';

export const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  defaultCurrencyId: z.number().optional(),
  userId: z.number(),
});

export type User = z.infer<typeof updateUserSchema>;
