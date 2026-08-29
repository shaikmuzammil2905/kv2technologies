import React, { useState, useEffect } from 'react';
import { supabase, fetchTableData } from '../lib/supabaseClient';
import { INITIAL_PROCESS_STEPS } from '../lib/seedData';
import { Plus, Edit2, Trash2, Save, X, CheckCircle2 } from 'lucide-react';

export default function ProcessCMS() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStep, setEditingStep] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadSteps();
  }, []);

  async function loadSteps() {
    const data = await fetchTableData('process_steps', INITIAL_PROCESS_STEPS);
    setSteps(data);
    setLoading(false);
  }

  const handleSaveStep = async (e) => {
    e.preventDefault();
    if (!editingStep.title.trim()) return;

    try {
      const payload = { ...editingStep, updated_at: new Date().toISOString() };
      await supabase.from('process_steps').upsert(payload);

      const exists = steps.find(s => s.num === editingStep.num || s.id === editingStep.id);
      if (exists) {
        setSteps(steps.map(s => (s.id === editingStep.id || s.num === editingStep.num) ? payload : s));
      } else {
        setSteps([...steps, payload]);
      }
      setEditingStep(null);
      setToast({ type: 'success', text: 'Process step saved.' });
    } catch (err) {
      setToast({ type: 'error', text: 'Failed to save step.' });
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (loading) {
    return <div style={{ color: '#38bdf8', padding: '40px 0', textAlign: 'center' }}>Loading Process CMS...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            How We Work — Process CMS
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
            Manage the 4 structured process step cards and descriptions
          </p>
        </div>
      </div>

      {toast && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', backgroundColor: toast.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: toast.type === 'success' ? '#4ade80' : '#fca5a5' }}>
          {toast.text}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {steps.map((step, idx) => (
          <div key={idx} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: 800, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              {step.num}
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>{step.title}</h3>
            <div style={{ fontSize: '0.78rem', color: '#38bdf8', marginBottom: '10px' }}>Icon: {step.icon}</div>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '20px' }}>{step.desc}</p>
            <button onClick={() => setEditingStep(step)} style={{ width: '100%', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
              Edit Step Details
            </button>
          </div>
        ))}
      </div>

      {editingStep && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', width: '100%', maxWidth: '500px', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>Edit Step {editingStep.num}</h3>
              <button onClick={() => setEditingStep(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveStep} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>Step Title</label>
                <input type="text" value={editingStep.title} onChange={(e) => setEditingStep({ ...editingStep, title: e.target.value })} required style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>Lucide Icon Name</label>
                <input type="text" value={editingStep.icon} onChange={(e) => setEditingStep({ ...editingStep, icon: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>Description</label>
                <textarea rows={3} value={editingStep.desc} onChange={(e) => setEditingStep({ ...editingStep, desc: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setEditingStep(null)} style={{ padding: '10px 16px', borderRadius: '8px', backgroundColor: '#334155', color: '#ffffff', border: 'none', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Save Step</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
