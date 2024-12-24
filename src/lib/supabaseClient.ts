// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Supabase URL과 API Key (자신의 Supabase 프로젝트에서 URL과 Key를 가져와 사용)
const supabaseUrl = 'https://tqyyhcpdkebanstzughk.supabase.co';  // Supabase 프로젝트 URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxeXloY3Bka2ViYW5zdHp1Z2hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwMDUzOTUsImV4cCI6MjA1MDU4MTM5NX0.ahL9s-ZXs1ZNr_GXwURY8Tf9KiuRc53uLf4gOkIMWYA';  // Supabase anon key

// 클라이언트 생성
const supabase = createClient(supabaseUrl, supabaseKey);



export default supabase;
