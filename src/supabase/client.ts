import { createClient } from '@supabase/supabase-js';

import { SUPABASE_CONSTANTS } from '@/constants';
import { getEnv } from '@/utils';

const projectUrl = getEnv(SUPABASE_CONSTANTS.ENV.PROJECT_URL, true);
const anonKey = getEnv(SUPABASE_CONSTANTS.ENV.ANON_KEY, true);

export const supabase = createClient(projectUrl, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});
