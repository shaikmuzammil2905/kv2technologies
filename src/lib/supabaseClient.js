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

// Real-time local event bus for instant sync between Admin Panel & Public Website
export function notifyCmsUpdate(tableName) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('k2v_cms_update', { detail: { tableName } }));
  }
}

export function subscribeCmsUpdate(callback) {
  if (typeof window === 'undefined') return () => {};
  const handler = (event) => callback(event.detail?.tableName);
  window.addEventListener('k2v_cms_update', handler);
  return () => window.removeEventListener('k2v_cms_update', handler);
}

const memoryCache = new Map();

// Helper to save data in cache as backup
export function getCachedData(key, defaultData) {
  try {
    if (typeof localStorage !== 'undefined') {
      const cached = localStorage.getItem(`k2v_cms_${key}`);
      if (cached) return JSON.parse(cached);
    }
  } catch (e) {
    // Ignore parse error
  }
  if (memoryCache.has(key)) {
    return memoryCache.get(key);
  }
  return defaultData;
}

export function setCachedData(key, data) {
  memoryCache.set(key, data);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(`k2v_cms_${key}`, JSON.stringify(data));
    }
  } catch (e) {
    // Ignore storage error
  }
}

// Helper to fetch table data safely with DB priority and cached fallback
export async function fetchTableData(tableName, defaultData) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('display_order', { ascending: true, nullsFirst: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      setCachedData(tableName, data);
      return data;
    }

    // Try fallback ordering if display_order doesn't exist
    if (error && error.code === '42703') { // column display_order does not exist
      const { data: dataNoOrder, error: err2 } = await supabase.from(tableName).select('*');
      if (!err2 && Array.isArray(dataNoOrder) && dataNoOrder.length > 0) {
        setCachedData(tableName, dataNoOrder);
        return dataNoOrder;
      }
    }

    if (error) {
      console.warn(`Supabase fetch failed for ${tableName}:`, error.message);
    }
    return getCachedData(tableName, defaultData);
  } catch (err) {
    console.warn(`Supabase fetch error for ${tableName}:`, err);
    return getCachedData(tableName, defaultData);
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

    if (!error && data) {
      setCachedData(tableName, data);
      return data;
    }
    if (error) {
      console.warn(`Supabase fetch single record failed for ${tableName}:`, error.message);
    }
    return getCachedData(tableName, defaultData);
  } catch (err) {
    console.warn(`Supabase fetch single error for ${tableName}:`, err);
    return getCachedData(tableName, defaultData);
  }
}

// Post-update DB verification helper
export async function verifyAndSaveRecord(tableName, idKey, idValue, payload, isDelete = false) {
  if (isDelete) {
    const { error } = await supabase.from(tableName).delete().eq(idKey, idValue);
    if (error) {
      // If DB fails, throw explicit error so caller handles it
      throw new Error(`Database delete failed: ${error.message}`);
    }
    notifyCmsUpdate(tableName);
    return true;
  }

  // Perform DB Upsert
  const { error } = await supabase.from(tableName).upsert(payload, { onConflict: idKey });
  if (error) {
    throw new Error(`Database update failed: ${error.message}`);
  }

  // Post-verification fetch directly from database
  const { data: verified, error: verifyErr } = await supabase
    .from(tableName)
    .select('*')
    .eq(idKey, idValue)
    .maybeSingle();

  if (verifyErr || !verified) {
    console.warn(`Post-verification warn for ${tableName}: database query returned empty after save.`);
  }

  // Update local cache & notify subscribers
  setCachedData(tableName, payload);
  notifyCmsUpdate(tableName);
  return verified || payload;
}
