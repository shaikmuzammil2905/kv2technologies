import React, { useState, useEffect } from 'react';
import { supabase, fetchSingleRecord, notifyCmsUpdate, setCachedData } from '../lib/supabaseClient';
import { INITIAL_TALK_EXPERT } from '../lib/seedData';
import { PhoneCall, Save, CheckCircle2 } from 'lucide-react';

export default function TalkToExpertCMS() {
  const [data, setData] = useState(INITIAL_TALK_EXPERT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadData() {
      const record = await fetchSingleRecord('talk_to_expert', INITIAL_TALK_EXPERT);
      if (record) {
        setData({
          buttonText: record.buttonText || INITIAL_TALK_EXPERT.buttonText,
          buttonUrl: record.buttonUrl || INITIAL_TALK_EXPERT.buttonUrl,
          actionType: record.actionType || INITIAL_TALK_EXPERT.actionType,
          phone: record.phone || INITIAL_TALK_EXPERT.phone,
          whatsappMsg: record.whatsappMsg || INITIAL_TALK_EXPERT.whatsappMsg,
          isVisible: record.isVisible !== undefined ? record.isVisible : true
        });
      }
      setLoading(false);
    }

    loadData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = { id: 1, ...data, updated_at: new Date().toISOString() };
    setCachedData('talk_to_expert', payload);
    notifyCmsUpdate('talk_to_expert');

    try {
      const { error } = await supabase.from('talk_to_expert').upsert(payload, { onConflict: 'id' });
      if (error) throw new Error(error.message);

      setToast({ type: 'success', text: '"Talk to an Expert" settings saved to database!' });
    } catch (err) {
      console.error('TalkToExpertCMS Save Error:', err);
      setToast({ type: 'error', text: `Save Note: ${err.message}` });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  if (loading) {
    return <div style={{ color: '#38bdf8', padding: '40px 0', textAlign: 'center' }}>Loading Talk to Expert CMS...</div>;
  }

  return (
    <div style={{ maxWidth: '720px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
          "Talk to an Expert" CMS
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
          Control button text, action targets, and modal popups for "Talk to an Expert" calls-to-action
        </p>
      </div>

      {toast && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', backgroundColor: toast.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: toast.type === 'success' ? '#4ade80' : '#fca5a5' }}>
          {toast.text}
        </div>
      )}

      <form onSubmit={handleSave} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>Button Text Label</label>
          <input type="text" value={data.buttonText} onChange={(e) => setData({ ...data, buttonText: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>Action Trigger Behavior</label>
          <select
            value={data.actionType}
            onChange={(e) => setData({ ...data, actionType: e.target.value })}
            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', outline: 'none' }}
          >
            <option value="ticket_widget">Open Interactive Support / Inquiry Modal</option>
            <option value="whatsapp_modal">Open WhatsApp Selection Modal</option>
            <option value="scroll_contact">Scroll directly to Contact Form (#contact)</option>
            <option value="direct_phone">Direct Phone Call (tel:)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>Target Direct Phone Line</label>
          <input type="text" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>Visibility Toggle</label>
          <button
            type="button"
            onClick={() => setData({ ...data, isVisible: !data.isVisible })}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: data.isVisible ? 'rgba(34, 197, 94, 0.2)' : 'rgba(100, 116, 139, 0.2)',
              color: data.isVisible ? '#4ade80' : '#94a3b8',
              border: '1px solid #334155',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {data.isVisible ? '● Buttons Enabled & Active' : '○ Buttons Disabled'}
          </button>
        </div>

        <button type="submit" disabled={saving} style={{ padding: '14px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
          <Save size={18} />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </form>
    </div>
  );
}
