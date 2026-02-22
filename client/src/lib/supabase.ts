import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_X_1;
const supabaseKey = import.meta.env.VITE_X_2;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase environment variables are missing!");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

