import type { NextFunction, Request, Response } from 'express';

import { env } from '../schemas/env';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    message: 'Internal Server Error',
    error: env.NODE_ENV == 'production' ? undefined : err.stack,
  });
};
