import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tgrbblexrtkiowoglhfo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRncmJibGV4cnRraW93b2dsaGZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5Nzk0MTEsImV4cCI6MjEwMzU1NTQxMX0.xBLpDzltjNi1z7MWJc9y9HlpeOiHVNW4oin5f3Gqw6k';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Helper to check if a table exists / fetch table data safely
export async function fetchTableData(tableName, defaultData) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('id', { ascending: true });

    if (error || !data || data.length === 0) {
      return defaultData;
    }
    return data;
  } catch (err) {
    console.warn(`Supabase fetch failed for ${tableName}, using default data:`, err);
    return defaultData;
  }
}

// Helper to fetch single record
export async function fetchSingleRecord(tableName, defaultData) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return defaultData;
    }
    return data;
  } catch (err) {
    console.warn(`Supabase fetch single failed for ${tableName}:`, err);
    return defaultData;
  }
}
