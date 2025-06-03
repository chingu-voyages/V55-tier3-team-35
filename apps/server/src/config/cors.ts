import { env } from '../schemas/env';

export const corsOptions = {
  origin: env.NODE_ENV === 'development' ? true : [process.env.CLIENT_HOST],
  credentials: true,
  optionsSuccessStatus: 200,
};
