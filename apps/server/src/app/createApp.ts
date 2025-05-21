import express from 'express';
import type { Express } from 'express';

import authRouter from '../routes/auth.routes';
import userRouter from '../routes/user.routes';

export default function createApp(): Express {
  const app = express();

  app.use(express.json());

  app.use('/api/v1/', userRouter);
  app.use('/api/v1/auth', authRouter);

  app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
  });

  return app;
}
