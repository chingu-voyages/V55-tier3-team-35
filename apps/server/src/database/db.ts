// database/database.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { env } from '../schemas/env';

const supabase: SupabaseClient = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY,
);

export { supabase };
