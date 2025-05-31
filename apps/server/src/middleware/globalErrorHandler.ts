import type { Request, Response } from 'express';

import { env } from '../schemas/env';

export const errorHandler = (err: Error, req: Request, res: Response) => {
  res.status(500).json({
    message: err.message || 'Unexpected server error',
    error: env.NODE_ENV == 'production' ? undefined : err.stack,
  });
};
