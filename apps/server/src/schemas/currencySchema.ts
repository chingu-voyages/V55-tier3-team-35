import { z } from 'zod';

export const currencySchema = z.object({
  id: z.number(),
  name: z.string(),
  symbol: z.string(),
  code: z.string(),
});

export type Currency = z.infer<typeof currencySchema>;
