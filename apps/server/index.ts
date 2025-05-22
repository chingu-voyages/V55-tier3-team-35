import bodyParser from 'body-parser';
import express from 'express';
import type { Express } from 'express';

import userRouter from './src/routes/user.routes';

export default function createApp(): Express {
  const app = express();

  app.use(bodyParser.json());
  app.use(express.json()); // Middleware to parse JSON request bodies

  app.use('/api/v1/', userRouter);

  app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
  });

  return app;
}
