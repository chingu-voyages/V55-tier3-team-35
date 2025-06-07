import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import type { Express } from 'express';

import { corsOptions } from '../config/cors';
import requireAuth from '../middleware/auth';
import { errorHandler } from '../middleware/globalErrorHandler';
import authRouter from '../routes/auth.routes';
import budgetRouter from '../routes/budget.routes';
import categoryRouter from '../routes/category.routes';
import currencyRouter from '../routes/currency.routes';
import transactionRouter from '../routes/transaction.routes';
import userRouter from '../routes/user.routes';

export default function createApp(): Express {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(cors(corsOptions));
  app.set('trust proxy', 1);
  app.use('/api/v1/user', requireAuth, userRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/currencies', currencyRouter);
  app.use('/api/v1/transactions', requireAuth, transactionRouter);
  app.use('/api/v1/categories', requireAuth, categoryRouter);
  app.use('/api/v1/budgets', budgetRouter);
  app.get('/', (_, res) => {
    res.json({ message: 'Hello World' });
  });

  app.use(errorHandler);

  return app;
}
