import { env } from '../schemas/env';

export const corsOptions = {
  origin:
    env.NODE_ENV !== 'production' ||
    process.env.CLIENT_HOST === 'ALLOW_ALL' ||
    !process.env.CLIENT_HOST
      ? true
      : [process.env.CLIENT_HOST].filter((host): host is string =>
          Boolean(host),
        ),
  credentials: true,
  optionsSuccessStatus: 200,
};
