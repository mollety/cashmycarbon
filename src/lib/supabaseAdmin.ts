// src/lib/supabaseAdmin.ts
import { createClient } from '@supabase/supabase-js';
export const supabaseAdmin = createClient(
  'https://tcjrcieasqixejxvueau.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjanJjaWVhc3FpeGVqeHZ1ZWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMzEzMzMsImV4cCI6MjA2MTYwNzMzM30.SUkE2DL7Lfpr6DrgkqLZbbCsS5JFtLwJmrid2BeZOHM'
);