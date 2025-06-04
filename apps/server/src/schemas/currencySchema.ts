import { z } from 'zod';

export const currencySchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  symbol: z.string().min(1),
  code: z.string().min(3),
});

export type Currency = z.infer<typeof currencySchema>;
