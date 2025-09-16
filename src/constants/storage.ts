import { getEnv } from '@/utils';

import { SUPABASE_CONSTANTS } from './supabase';

export const STORAGE = {
  AUTH: () =>
    `sb-${getEnv(SUPABASE_CONSTANTS.ENV.PROJECT_KEY, true)}-auth-token`,
  THEME: 'theme',
};
