import { env } from '../schemas/env';

export const corsOptions = {
  origin: process.env.CLIENT_HOST === 'ALLOW_ALL' 
    ? true 
    : process.env.CLIENT_HOST 
      ? [process.env.CLIENT_HOST] 
      : ['http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
