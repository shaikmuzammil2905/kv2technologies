import React, { useState, useEffect } from 'react';
import { supabase, fetchSingleRecord, notifyCmsUpdate, setCachedData } from '../lib/supabaseClient';
import { INITIAL_ABOUT } from '../lib/seedData';
import { Save, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function AboutCMS() {
  const [formData, setFormData] = useState(INITIAL_ABOUT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadAboutData() {
      const data = await fetchSingleRecord('about_section', INITIAL_ABOUT);
      if (data) {
        setFormData({
          eyebrow: data.eyebrow || INITIAL_ABOUT.eyebrow,
          heading: data.heading || INITIAL_ABOUT.heading,
          description: data.description || INITIAL_ABOUT.description,
          subText: data.subText || INITIAL_ABOUT.subText,
          philosophyTitle: data.philosophyTitle || INITIAL_ABOUT.philosophyTitle,
          philosophyText: data.philosophyText || INITIAL_ABOUT.philosophyText
        });
      }
      setLoading(false);
    }

    loadAboutData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setToast(null);

    const payload = {
      id: 1,
      ...formData,
      updated_at: new Date().toISOString()
    };

    setCachedData('about_section', payload);
    notifyCmsUpdate('about_section');

    try {
      const { error } = await supabase.from('about_section').upsert(payload, { onConflict: 'id' });
      if (error) throw new Error(error.message);

      setToast({ type: 'success', text: 'About section updated in database!' });
    } catch (err) {
      console.error('AboutCMS Save Error:', err);
      setToast({ type: 'error', text: `Save Note: ${err.message}` });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  if (loading) {
    return <div style={{ color: '#38bdf8', padding: '40px 0', textAlign: 'center' }}>Loading About Section CMS...</div>;
  }

  return (
    <div style={{ maxWidth: '840px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
          About Us Section CMS
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
          Manage company description, mission details, and core philosophy box
        </p>
      </div>

      {toast && (
        <div
          style={{
            padding: '14px 18px',
            borderRadius: '10px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: toast.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: toast.type === 'success' ? '1px solid rgba(34, 197, 94, 0.35)' : '1px solid rgba(239, 68, 68, 0.35)',
            color: toast.type === 'success' ? '#4ade80' : '#fca5a5'
          }}
        >
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{toast.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {/* Eyebrow */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
            Section Eyebrow Badge
          </label>
          <input
            type="text"
            value={formData.eyebrow}
            onChange={(e) => setFormData({ ...formData, eyebrow: e.target.value })}
            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Main Heading */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
            Main Section Heading
          </label>
          <textarea
            rows={2}
            value={formData.heading}
            onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Primary Description */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
            Primary Lead Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Secondary SubText */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
            Secondary Body Paragraph
          </label>
          <textarea
            rows={3}
            value={formData.subText}
            onChange={(e) => setFormData({ ...formData, subText: e.target.value })}
            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Philosophy Title */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
            Core Philosophy Box Title
          </label>
          <input
            type="text"
            value={formData.philosophyTitle}
            onChange={(e) => setFormData({ ...formData, philosophyTitle: e.target.value })}
            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Philosophy Text */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
            Core Philosophy Box Description
          </label>
          <textarea
            rows={3}
            value={formData.philosophyText}
            onChange={(e) => setFormData({ ...formData, philosophyText: e.target.value })}
            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          style={{
            padding: '14px',
            borderRadius: '8px',
            backgroundColor: '#0284c7',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.95rem',
            border: 'none',
            cursor: saving ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '10px'
          }}
        >
          {saving ? <RefreshCw size={18} className="spin-icon" /> : <Save size={18} />}
          <span>{saving ? 'Saving...' : 'Save About Section'}</span>
        </button>
      </form>
    </div>
  );
}
