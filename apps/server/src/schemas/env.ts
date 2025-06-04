import dotenv from 'dotenv';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod/v4';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envLocalPath = path.resolve(__dirname, '../../.env.local');
const fallbackEnvPath = path.resolve(__dirname, '../../.env');

if (existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else {
  dotenv.config({ path: fallbackEnvPath });
}

const envSchema = z.object({
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),
});

export const env = envSchema.parse(process.env);
