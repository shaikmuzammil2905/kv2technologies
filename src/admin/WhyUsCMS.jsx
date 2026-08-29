import React, { useState, useEffect } from 'react';
import { supabase, fetchTableData } from '../lib/supabaseClient';
import { INITIAL_WHY_US } from '../lib/seedData';
import { Plus, Edit2, Trash2, Save, X, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function WhyUsCMS() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const data = await fetchTableData('why_us', INITIAL_WHY_US);
    setItems(data);
    setLoading(false);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingItem.title.trim()) return;

    try {
      const payload = { ...editingItem, updated_at: new Date().toISOString() };
      await supabase.from('why_us').upsert(payload);

      const exists = items.find(i => i.num === editingItem.num || i.id === editingItem.id);
      if (exists) {
        setItems(items.map(i => (i.id === editingItem.id || i.num === editingItem.num) ? payload : i));
      } else {
        setItems([...items, payload]);
      }
      setEditingItem(null);
      setToast({ type: 'success', text: 'Why Us pillar saved successfully.' });
    } catch (err) {
      setToast({ type: 'error', text: 'Failed to save pillar.' });
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      await supabase.from('why_us').delete().eq('id', deletingId);
      setItems(items.filter(i => i.id !== deletingId && i.num !== deletingId));
      setToast({ type: 'success', text: 'Pillar deleted.' });
    } catch (err) {
      setToast({ type: 'error', text: 'Delete failed.' });
    } finally {
      setDeletingId(null);
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (loading) {
    return <div style={{ color: '#38bdf8', padding: '40px 0', textAlign: 'center' }}>Loading Why Us CMS...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            Why K²V Section CMS
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
            Manage the pillar cards in the "Why Choose K²V" section
          </p>
        </div>

        <button
          onClick={() => setEditingItem({ num: `0${items.length + 1}`, title: '', desc: '', display_order: items.length + 1, is_active: true })}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', border: 'none', cursor: 'pointer' }}
        >
          <Plus size={18} />
          <span>Add Pillar</span>
        </button>
      </div>

      {toast && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', backgroundColor: toast.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: toast.type === 'success' ? '#4ade80' : '#fca5a5' }}>
          {toast.text}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '14px', padding: '24px', position: 'relative' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', marginBottom: '8px' }}>{item.num}</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '20px' }}>{item.desc}</p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={() => setEditingItem(item)} style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Edit</button>
              <button onClick={() => setDeletingId(item.id || item.num)} style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', width: '100%', maxWidth: '500px', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>Edit Why Us Pillar</h3>
              <button onClick={() => setEditingItem(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>Number Code (e.g. 01)</label>
                <input type="text" value={editingItem.num} onChange={(e) => setEditingItem({ ...editingItem, num: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>Pillar Title</label>
                <input type="text" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} required style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>Description</label>
                <textarea rows={3} value={editingItem.desc} onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setEditingItem(null)} style={{ padding: '10px 16px', borderRadius: '8px', backgroundColor: '#334155', color: '#ffffff', border: 'none', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Save Pillar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingId && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', textAlign: 'center', maxWidth: '400px' }}>
            <AlertTriangle size={36} color="#ef4444" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '16px' }}>Delete this pillar card?</h3>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setDeletingId(null)} style={{ padding: '10px 16px', borderRadius: '8px', backgroundColor: '#334155', color: '#ffffff', border: 'none', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleDelete} style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
