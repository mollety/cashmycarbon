// /src/lib/supabase.ts

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =  'https://tcjrcieasqixejxvueau.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjanJjaWVhc3FpeGVqeHZ1ZWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMzEzMzMsImV4cCI6MjA2MTYwNzMzM30.SUkE2DL7Lfpr6DrgkqLZbbCsS5JFtLwJmrid2BeZOHM'
;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
