import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import type { Express } from 'express';

import { corsOptions } from '../config/cors';
import authRouter from '../routes/auth.routes';
import userRouter from '../routes/user.routes';

export default function createApp(): Express {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(cors(corsOptions));

  app.use('/api/v1/', userRouter);
  app.use('/api/v1/auth', authRouter);

  app.get('/', (_, res) => {
    res.json({ message: 'Hello World' });
  });

  return app;
}
