import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1),
  id: z.number().positive(),
  user_id: z.number().positive(),
});

export type Category = z.infer<typeof categorySchema>;
