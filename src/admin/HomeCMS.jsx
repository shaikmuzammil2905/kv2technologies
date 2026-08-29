import React, { useState, useEffect } from 'react';
import { supabase, fetchSingleRecord, notifyCmsUpdate } from '../lib/supabaseClient';
import { INITIAL_HERO } from '../lib/seedData';
import { Save, Sparkles, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function HomeCMS() {
  const [formData, setFormData] = useState(INITIAL_HERO);
  const [tagsInput, setTagsInput] = useState(INITIAL_HERO.tags.join(', '));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadHeroData() {
      const data = await fetchSingleRecord('hero_section', INITIAL_HERO);
      if (data) {
        setFormData({
          badge: data.badge || INITIAL_HERO.badge,
          title: data.title || INITIAL_HERO.title,
          subtitle: data.subtitle || INITIAL_HERO.subtitle,
          tags: Array.isArray(data.tags) ? data.tags : INITIAL_HERO.tags,
          primaryCtaText: data.primaryCtaText || INITIAL_HERO.primaryCtaText,
          primaryCtaUrl: data.primaryCtaUrl || INITIAL_HERO.primaryCtaUrl,
          secondaryCtaText: data.secondaryCtaText || INITIAL_HERO.secondaryCtaText,
          secondaryCtaUrl: data.secondaryCtaUrl || INITIAL_HERO.secondaryCtaUrl
        });
        if (Array.isArray(data.tags)) {
          setTagsInput(data.tags.join(', '));
        }
      }
      setLoading(false);
    }

    loadHeroData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setToast(null);

    const tagsArray = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    const payload = {
      id: 1,
      badge: formData.badge,
      title: formData.title,
      subtitle: formData.subtitle,
      tags: tagsArray,
      primaryCtaText: formData.primaryCtaText,
      primaryCtaUrl: formData.primaryCtaUrl,
      secondaryCtaText: formData.secondaryCtaText,
      secondaryCtaUrl: formData.secondaryCtaUrl,
      updated_at: new Date().toISOString()
    };

    try {
      const { error } = await supabase.from('hero_section').upsert(payload, { onConflict: 'id' });

      if (error) {
        throw new Error(error.message);
      }

      setFormData({ ...payload, tags: tagsArray });
      setToast({ type: 'success', text: 'Home / Hero section successfully updated in production database!' });
    } catch (err) {
      console.error('HomeCMS Save Error:', err);
      // Still update cache as fallback & notify subscribers
      setFormData({ ...payload, tags: tagsArray });
      setToast({ type: 'error', text: `Database Save Note: ${err.message || 'Updated in local session.'}` });
    } finally {
      notifyCmsUpdate('hero_section');
      setSaving(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  if (loading) {
    return <div style={{ color: '#38bdf8', padding: '40px 0', textAlign: 'center' }}>Loading Hero Section CMS...</div>;
  }

  return (
    <div style={{ maxWidth: '840px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            Home Section CMS
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
            Manage the hero banner, main headline, subtitle, service tags, and CTAs
          </p>
        </div>
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
        {/* Top Eyebrow Badge */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
            Top Eyebrow Badge Text
          </label>
          <input
            type="text"
            value={formData.badge}
            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '8px',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              color: '#ffffff',
              fontSize: '0.92rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Main Headline */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
            Main Headline
          </label>
          <textarea
            rows={2}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '8px',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              color: '#ffffff',
              fontSize: '0.95rem',
              outline: 'none',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Subtitle Statement */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
            Subtitle Statement (Single Sentence)
          </label>
          <textarea
            rows={3}
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '8px',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              color: '#ffffff',
              fontSize: '0.92rem',
              outline: 'none',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
          <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '6px' }}>
            Do not put quotation marks at start or end. This displays as a single continuous statement on the home page.
          </div>
        </div>

        {/* Service Tags */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
            Hero Service Tags (Comma Separated)
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="IT Service Desk, Managed IT Services, ServiceNow Workflows, Cloud & Cybersecurity"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '8px',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              color: '#ffffff',
              fontSize: '0.92rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* CTAs Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
              Primary Button Text
            </label>
            <input
              type="text"
              value={formData.primaryCtaText}
              onChange={(e) => setFormData({ ...formData, primaryCtaText: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
              Primary Button Link URL
            </label>
            <input
              type="text"
              value={formData.primaryCtaUrl}
              onChange={(e) => setFormData({ ...formData, primaryCtaUrl: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
              Secondary Button Text
            </label>
            <input
              type="text"
              value={formData.secondaryCtaText}
              onChange={(e) => setFormData({ ...formData, secondaryCtaText: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
              Secondary Button Link URL
            </label>
            <input
              type="text"
              value={formData.secondaryCtaUrl}
              onChange={(e) => setFormData({ ...formData, secondaryCtaUrl: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Submit Button */}
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
          <span>{saving ? 'Saving to Database...' : 'Save Changes'}</span>
        </button>
      </form>
    </div>
  );
}
