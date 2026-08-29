import React, { useState, useEffect } from 'react';
import { supabase, fetchSingleRecord, notifyCmsUpdate, setCachedData } from '../lib/supabaseClient';
import { INITIAL_SITE_SETTINGS } from '../lib/seedData';
import { Settings, Save, CheckCircle2 } from 'lucide-react';

export default function SettingsCMS() {
  const [data, setData] = useState(INITIAL_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      const record = await fetchSingleRecord('site_settings', INITIAL_SITE_SETTINGS);
      if (record) {
        setData({
          siteName: record.siteName || INITIAL_SITE_SETTINGS.siteName,
          tagline: record.tagline || INITIAL_SITE_SETTINGS.tagline,
          logoIcon: record.logoIcon || INITIAL_SITE_SETTINGS.logoIcon,
          logoFull: record.logoFull || INITIAL_SITE_SETTINGS.logoFull,
          copyright: record.copyright || INITIAL_SITE_SETTINGS.copyright,
          phone1: record.phone1 || INITIAL_SITE_SETTINGS.phone1,
          phone2: record.phone2 || INITIAL_SITE_SETTINGS.phone2,
          phone3: record.phone3 || INITIAL_SITE_SETTINGS.phone3,
          email: record.email || INITIAL_SITE_SETTINGS.email,
          address: record.address || INITIAL_SITE_SETTINGS.address
        });
      }
      setLoading(false);
    }

    loadSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = { id: 1, ...data, updated_at: new Date().toISOString() };
    setCachedData('site_settings', payload);
    notifyCmsUpdate('site_settings');

    try {
      const { error } = await supabase.from('site_settings').upsert(payload, { onConflict: 'id' });
      if (error) throw new Error(error.message);

      setToast({ type: 'success', text: 'Global website settings saved to database!' });
    } catch (err) {
      console.error('SettingsCMS Save Error:', err);
      setToast({ type: 'error', text: `Save Note: ${err.message}` });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  if (loading) {
    return <div style={{ color: '#38bdf8', padding: '40px 0', textAlign: 'center' }}>Loading Website Settings CMS...</div>;
  }

  return (
    <div style={{ maxWidth: '760px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
          Global Website Settings CMS
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
          Configure company branding, site name, copyright footer line, and business info
        </p>
      </div>

      {toast && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', backgroundColor: toast.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: toast.type === 'success' ? '#4ade80' : '#fca5a5' }}>
          {toast.text}
        </div>
      )}

      <form onSubmit={handleSave} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>Website Name</label>
            <input type="text" value={data.siteName} onChange={(e) => setData({ ...data, siteName: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>Tagline</label>
            <input type="text" value={data.tagline} onChange={(e) => setData({ ...data, tagline: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>Footer Copyright Line</label>
          <input type="text" value={data.copyright} onChange={(e) => setData({ ...data, copyright: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>Logo Icon Image Path / URL</label>
            <input type="text" value={data.logoIcon} onChange={(e) => setData({ ...data, logoIcon: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>Full Logo Image Path / URL</label>
            <input type="text" value={data.logoFull} onChange={(e) => setData({ ...data, logoFull: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
          </div>
        </div>

        <button type="submit" disabled={saving} style={{ padding: '14px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
          <Save size={18} />
          <span>{saving ? 'Saving...' : 'Save Global Settings'}</span>
        </button>
      </form>
    </div>
  );
}
