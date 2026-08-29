import React, { useState, useEffect } from 'react';
import { supabase, fetchSingleRecord, notifyCmsUpdate, setCachedData } from '../lib/supabaseClient';
import { INITIAL_SEO } from '../lib/seedData';
import { Search, Save, CheckCircle2 } from 'lucide-react';

export default function SeoCMS() {
  const [data, setData] = useState(INITIAL_SEO);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadSeo() {
      const record = await fetchSingleRecord('seo_settings', INITIAL_SEO);
      if (record) {
        setData({
          pageTitle: record.pageTitle || INITIAL_SEO.pageTitle,
          metaDescription: record.metaDescription || INITIAL_SEO.metaDescription,
          keywords: record.keywords || INITIAL_SEO.keywords,
          ogTitle: record.ogTitle || INITIAL_SEO.ogTitle,
          ogDescription: record.ogDescription || INITIAL_SEO.ogDescription,
          ogImage: record.ogImage || INITIAL_SEO.ogImage,
          canonicalUrl: record.canonicalUrl || INITIAL_SEO.canonicalUrl
        });
      }
      setLoading(false);
    }

    loadSeo();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = { id: 1, ...data, updated_at: new Date().toISOString() };
    setCachedData('seo_settings', payload);
    notifyCmsUpdate('seo_settings');

    if (data.pageTitle) {
      document.title = data.pageTitle;
    }

    try {
      const { error } = await supabase.from('seo_settings').upsert(payload, { onConflict: 'id' });
      if (error) throw new Error(error.message);

      setToast({ type: 'success', text: 'SEO & OpenGraph meta tags updated in database!' });
    } catch (err) {
      console.error('SeoCMS Save Error:', err);
      setToast({ type: 'error', text: `Save Note: ${err.message}` });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  if (loading) {
    return <div style={{ color: '#38bdf8', padding: '40px 0', textAlign: 'center' }}>Loading SEO CMS...</div>;
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
          SEO & Meta Tags CMS
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
          Configure Google search titles, descriptions, keywords, and social OpenGraph tags
        </p>
      </div>

      {toast && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', backgroundColor: toast.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: toast.type === 'success' ? '#4ade80' : '#fca5a5' }}>
          {toast.text}
        </div>
      )}

      <form onSubmit={handleSave} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>Page Title (&lt;title&gt; tag)</label>
          <input type="text" value={data.pageTitle} onChange={(e) => setData({ ...data, pageTitle: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>Meta Description</label>
          <textarea rows={3} value={data.metaDescription} onChange={(e) => setData({ ...data, metaDescription: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>Keywords (Comma Separated)</label>
          <input type="text" value={data.keywords} onChange={(e) => setData({ ...data, keywords: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>OpenGraph Social Title</label>
            <input type="text" value={data.ogTitle} onChange={(e) => setData({ ...data, ogTitle: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>Canonical URL</label>
            <input type="text" value={data.canonicalUrl} onChange={(e) => setData({ ...data, canonicalUrl: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
          </div>
        </div>

        <button type="submit" disabled={saving} style={{ padding: '14px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
          <Save size={18} />
          <span>{saving ? 'Saving...' : 'Save SEO Meta Tags'}</span>
        </button>
      </form>
    </div>
  );
}
