import { env } from './env';

export const corsOptions = {
  origin:
    env.NODE_ENV === 'development'
      ? true // Allow all origins in development
      : [''], // Set Production Host when deploying
  credentials: true,
  optionsSuccessStatus: 200,
};
