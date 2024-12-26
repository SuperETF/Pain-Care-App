// src/lib/supabaseClient.ts


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tqyyhcpdkebanstzughk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxeXloY3Bka2ViYW5zdHp1Z2hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwMDUzOTUsImV4cCI6MjA1MDU4MTM5NX0.ahL9s-ZXs1ZNr_GXwURY8Tf9KiuRc53uLf4gOkIMWYA'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
