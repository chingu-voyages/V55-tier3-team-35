import { z } from 'zod';

export const paramsSchema = z.object({
  id: z.string(),
});

export type Params = z.infer<typeof paramsSchema>;
