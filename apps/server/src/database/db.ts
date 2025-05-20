// database/database.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl: string = process.env.SUPABASE_URL || '';
const supabaseKey: string = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl) {
  console.error('SUPABASE_URL is not defined in environment variables.');
  process.exit(1);
}

if (!supabaseKey) {
  console.error('SUPABASE_ANON_KEY is not defined in environment variables.');
  process.exit(1);
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export { supabase };
