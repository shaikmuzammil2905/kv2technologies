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
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(defaultData)) {
          return Array.isArray(parsed) ? parsed : defaultData;
        }
        return parsed;
      }
    }
  } catch (e) {
    // Ignore parse error
  }
  if (memoryCache.has(key)) {
    const cached = memoryCache.get(key);
    if (Array.isArray(defaultData)) {
      return Array.isArray(cached) ? cached : defaultData;
    }
    return cached;
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

export function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Contact submission persistence helper (Saves to both Supabase & Local Cache)
export async function saveContactSubmission(submission) {
  const isUUID = submission.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(submission.id);
  const reqId = isUUID ? submission.id : generateUUID();

  const reqRecord = {
    id: reqId,
    name: (submission.name || 'Website Visitor').trim(),
    phone: (submission.phone || '').trim() || 'N/A',
    email: (submission.email || '').trim() || 'inquiry@k2vtechnologies.com',
    service: submission.service || 'IT Service Desk',
    message: (submission.message || '').trim() || 'No additional details provided.',
    status: submission.status || 'unread',
    created_at: submission.created_at || new Date().toISOString()
  };

  // 1. Immediately store in local cache so it appears in Admin panel right away
  try {
    const rawExisting = getCachedData('contact_requests', []);
    const existing = Array.isArray(rawExisting) ? rawExisting : [];
    const updatedList = [reqRecord, ...existing.filter(r => r && r.id !== reqRecord.id)];
    setCachedData('contact_requests', updatedList);
    notifyCmsUpdate('contact_requests');
  } catch (cacheErr) {
    console.warn('Local cache save note:', cacheErr);
  }

  // 2. Persist to Supabase Database
  try {
    const { data, error } = await supabase
      .from('contact_requests')
      .insert([reqRecord])
      .select('*');

    if (error) {
      console.warn('Supabase contact_requests insert note:', error.message);
    } else if (data && data.length > 0) {
      const savedRecord = data[0];
      const rawExisting = getCachedData('contact_requests', []);
      const existing = Array.isArray(rawExisting) ? rawExisting : [];
      const freshList = [savedRecord, ...existing.filter(r => r && r.id !== reqRecord.id && r.id !== savedRecord.id)];
      setCachedData('contact_requests', freshList);
      notifyCmsUpdate('contact_requests');
      return savedRecord;
    }
  } catch (err) {
    console.warn('Supabase contact_requests insert exception:', err);
  }

  return reqRecord;
}

// Helper to fetch combined contact requests from Supabase & Local Cache
export async function getContactRequests() {
  const rawLocal = getCachedData('contact_requests', []);
  const localItems = Array.isArray(rawLocal) ? rawLocal : [];
  let dbItems = [];

  try {
    const { data, error } = await supabase
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data)) {
      dbItems = data;
    } else if (error) {
      console.warn('Supabase getContactRequests note:', error.message);
    }
  } catch (err) {
    console.warn('Contact requests DB fetch exception:', err);
  }

  // Merge local & DB items by ID, prioritizing local updates
  const itemMap = new Map();

  // Add local items first so locally submitted inquiries are always preserved
  localItems.forEach(item => {
    if (item && item.id) itemMap.set(String(item.id), item);
  });

  // Merge DB items
  dbItems.forEach(item => {
    if (item && item.id) {
      const existingLocal = itemMap.get(String(item.id));
      itemMap.set(String(item.id), { ...item, ...existingLocal });
    }
  });

  const merged = Array.from(itemMap.values());
  merged.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

  setCachedData('contact_requests', merged);
  return merged;
}


