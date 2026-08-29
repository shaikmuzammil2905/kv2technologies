import React, { useState, useEffect } from 'react';
import { supabase, fetchSingleRecord, notifyCmsUpdate, setCachedData } from '../lib/supabaseClient';
import { INITIAL_WHATSAPP } from '../lib/seedData';
import { MessageSquare, Save, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';

export default function WhatsAppCMS() {
  const [data, setData] = useState(INITIAL_WHATSAPP);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadWhatsApp() {
      const record = await fetchSingleRecord('whatsapp_settings', INITIAL_WHATSAPP);
      if (record) {
        setData({
          countryCode: record.countryCode || INITIAL_WHATSAPP.countryCode,
          numbers: Array.isArray(record.numbers) ? record.numbers : INITIAL_WHATSAPP.numbers,
          defaultMessage: record.defaultMessage || INITIAL_WHATSAPP.defaultMessage,
          buttonText: record.buttonText || INITIAL_WHATSAPP.buttonText,
          isVisible: record.isVisible !== undefined ? record.isVisible : true
        });
      }
      setLoading(false);
    }

    loadWhatsApp();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = { id: 1, ...data, updated_at: new Date().toISOString() };
    setCachedData('whatsapp_settings', payload);
    notifyCmsUpdate('whatsapp_settings');

    try {
      const { error } = await supabase.from('whatsapp_settings').upsert(payload, { onConflict: 'id' });
      if (error) throw new Error(error.message);

      setToast({ type: 'success', text: 'WhatsApp configuration saved to database!' });
    } catch (err) {
      console.error('WhatsAppCMS Save Error:', err);
      setToast({ type: 'error', text: `Save Note: ${err.message}` });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  const updateNumber = (index, field, value) => {
    const updated = [...data.numbers];
    updated[index] = { ...updated[index], [field]: value };
    if (field === 'display') {
      updated[index].raw = value.replace(/[^0-9]/g, '');
    }
    setData({ ...data, numbers: updated });
  };

  const generateTestLink = (rawNum) => {
    const encodedMsg = encodeURIComponent(data.defaultMessage);
    return `https://wa.me/${rawNum}?text=${encodedMsg}`;
  };

  if (loading) {
    return <div style={{ color: '#38bdf8', padding: '40px 0', textAlign: 'center' }}>Loading WhatsApp CMS...</div>;
  }

  return (
    <div style={{ maxWidth: '840px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
          WhatsApp Floating & Modal CMS
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
          Control WhatsApp business numbers (CEO, CTO, CIO), pre-filled inquiry messages, and CTA button labels
        </p>
      </div>

      {toast && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', backgroundColor: toast.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: toast.type === 'success' ? '#4ade80' : '#fca5a5' }}>
          {toast.text}
        </div>
      )}

      <form onSubmit={handleSave} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {/* Floating Button Text & Visibility */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>Floating Button Text</label>
            <input type="text" value={data.buttonText} onChange={(e) => setData({ ...data, buttonText: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>Visibility</label>
            <button
              type="button"
              onClick={() => setData({ ...data, isVisible: !data.isVisible })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: data.isVisible ? 'rgba(34, 197, 94, 0.2)' : 'rgba(100, 116, 139, 0.2)',
                color: data.isVisible ? '#4ade80' : '#94a3b8',
                border: '1px solid #334155',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {data.isVisible ? '● Button Visible' : '○ Button Hidden'}
            </button>
          </div>
        </div>

        {/* 3 WhatsApp Phone Lines */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '12px' }}>
            Business WhatsApp Lines & Executive Labels
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {data.numbers.map((num, idx) => (
              <div key={idx} style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Role / Tagline</span>
                    <input type="text" value={num.label} onChange={(e) => updateNumber(idx, 'label', e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Phone Number (with Country Code)</span>
                    <input type="text" value={num.display} onChange={(e) => updateNumber(idx, 'display', e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
                  </div>
                </div>

                <a
                  href={generateTestLink(num.raw)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(37, 211, 102, 0.15)',
                    border: '1px solid rgba(37, 211, 102, 0.35)',
                    color: '#25D366',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    flexShrink: 0
                  }}
                >
                  <span>Test Link</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Default Pre-filled Message */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
            Default Pre-filled Chat Message
          </label>
          <textarea
            rows={3}
            value={data.defaultMessage}
            onChange={(e) => setData({ ...data, defaultMessage: e.target.value })}
            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" disabled={saving} style={{ padding: '14px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Save size={18} />
          <span>{saving ? 'Saving...' : 'Save WhatsApp Settings'}</span>
        </button>
      </form>
    </div>
  );
}
