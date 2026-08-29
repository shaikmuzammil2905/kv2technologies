import React, { useState, useEffect } from 'react';
import { supabase, fetchTableData, notifyCmsUpdate, setCachedData } from '../lib/supabaseClient';
import { FAQ_DATA } from '../lib/seedData';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function FaqCMS() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadFaqs();
  }, []);

  async function loadFaqs() {
    const data = await fetchTableData('faqs', FAQ_DATA);
    setFaqs(data);
    setLoading(false);
  }

  const handleOpenNew = () => {
    setEditingItem({
      id: `faq-${Date.now()}`,
      question: '',
      answer: '',
      q: '',
      a: '',
      is_active: true,
      display_order: faqs.length + 1
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const qText = editingItem.question || editingItem.q || '';
    const aText = editingItem.answer || editingItem.a || '';
    if (!qText.trim()) return;

    const payload = {
      ...editingItem,
      question: qText,
      answer: aText,
      q: qText,
      a: aText,
      updated_at: new Date().toISOString()
    };

    const exists = faqs.find(f => f.id === editingItem.id);
    let updatedList;
    if (exists) {
      updatedList = faqs.map(f => f.id === editingItem.id ? payload : f);
    } else {
      updatedList = [...faqs, payload];
    }

    try {
      const { error } = await supabase.from('faqs').upsert(payload, { onConflict: 'id' });
      if (error) throw new Error(error.message);

      setFaqs(updatedList);
      setCachedData('faqs', updatedList);
      notifyCmsUpdate('faqs');
      setEditingItem(null);
      setToast({ type: 'success', text: 'FAQ saved to database!' });
    } catch (err) {
      console.error('FaqCMS Save Error:', err);
      setFaqs(updatedList);
      setCachedData('faqs', updatedList);
      notifyCmsUpdate('faqs');
      setEditingItem(null);
      setToast({ type: 'error', text: `Save Note: ${err.message}` });
    } finally {
      setTimeout(() => setToast(null), 4000);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    const updatedList = faqs.filter(f => f.id !== deletingId);

    try {
      const { error } = await supabase.from('faqs').delete().eq('id', deletingId);
      if (error) throw new Error(error.message);

      setFaqs(updatedList);
      setCachedData('faqs', updatedList);
      notifyCmsUpdate('faqs');
      setToast({ type: 'success', text: 'FAQ deleted from database.' });
    } catch (err) {
      console.error('FaqCMS Delete Error:', err);
      setFaqs(updatedList);
      setCachedData('faqs', updatedList);
      notifyCmsUpdate('faqs');
      setToast({ type: 'error', text: `Delete Note: ${err.message}` });
    } finally {
      setDeletingId(null);
      setTimeout(() => setToast(null), 4000);
    }
  };

  if (loading) {
    return <div style={{ color: '#38bdf8', padding: '40px 0', textAlign: 'center' }}>Loading FAQs CMS...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            FAQs CMS (Full CRUD)
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
            Manage accordion questions and answers displayed on the public website
          </p>
        </div>

        <button onClick={handleOpenNew} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', border: 'none', cursor: 'pointer' }}>
          <Plus size={18} />
          <span>Add New FAQ</span>
        </button>
      </div>

      {toast && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', backgroundColor: toast.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: toast.type === 'success' ? '#4ade80' : '#fca5a5' }}>
          {toast.text}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {faqs.map((faq, idx) => (
          <div key={faq.id || idx} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                {idx + 1}. {faq.q || faq.question}
              </div>
              <div style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.5 }}>
                {faq.a || faq.answer}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button onClick={() => setEditingItem({ ...faq, q: faq.q || faq.question, a: faq.a || faq.answer })} style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Edit</button>
              <button onClick={() => setDeletingId(faq.id)} style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', width: '100%', maxWidth: '540px', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>{editingItem.id ? 'Edit FAQ' : 'Add FAQ'}</h3>
              <button onClick={() => setEditingItem(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>Question</label>
                <input type="text" value={editingItem.q} onChange={(e) => setEditingItem({ ...editingItem, q: e.target.value })} required style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>Answer</label>
                <textarea rows={4} value={editingItem.a} onChange={(e) => setEditingItem({ ...editingItem, a: e.target.value })} required style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setEditingItem(null)} style={{ padding: '10px 16px', borderRadius: '8px', backgroundColor: '#334155', color: '#ffffff', border: 'none', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Save FAQ</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingId && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', textAlign: 'center', maxWidth: '400px' }}>
            <AlertTriangle size={36} color="#ef4444" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '16px' }}>Delete this FAQ?</h3>
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
