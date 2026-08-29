import React, { useState, useEffect } from 'react';
import { supabase, fetchTableData } from '../lib/supabaseClient';
import { PROJECTS_DATA } from '../lib/seedData';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ProjectsCMS() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const data = await fetchTableData('projects', PROJECTS_DATA);
    setProjects(data);
    setLoading(false);
  }

  const handleOpenNew = () => {
    setEditingItem({
      id: Date.now().toString(),
      title: '',
      category: 'Service Desk',
      client: '',
      duration: '',
      description: '',
      result: '',
      tags: [],
      image: '',
      is_active: true,
      display_order: projects.length + 1
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingItem.title.trim()) return;

    try {
      const payload = { ...editingItem, updated_at: new Date().toISOString() };
      await supabase.from('projects').upsert(payload);

      const exists = projects.find(p => p.id === editingItem.id);
      if (exists) {
        setProjects(projects.map(p => p.id === editingItem.id ? payload : p));
      } else {
        setProjects([...projects, payload]);
      }
      setEditingItem(null);
      setToast({ type: 'success', text: 'Project case study saved successfully.' });
    } catch (err) {
      setToast({ type: 'error', text: 'Failed to save project.' });
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      await supabase.from('projects').delete().eq('id', deletingId);
      setProjects(projects.filter(p => p.id !== deletingId));
      setToast({ type: 'success', text: 'Project deleted.' });
    } catch (err) {
      setToast({ type: 'error', text: 'Failed to delete.' });
    } finally {
      setDeletingId(null);
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (loading) {
    return <div style={{ color: '#38bdf8', padding: '40px 0', textAlign: 'center' }}>Loading Projects CMS...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            Projects / Case Studies CMS
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
            Manage client case studies, results, categories, and tags
          </p>
        </div>

        <button onClick={handleOpenNew} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', border: 'none', cursor: 'pointer' }}>
          <Plus size={18} />
          <span>Add Project</span>
        </button>
      </div>

      {toast && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', backgroundColor: toast.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: toast.type === 'success' ? '#4ade80' : '#fca5a5' }}>
          {toast.text}
        </div>
      )}

      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155', color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '14px 20px' }}>Project Title</th>
              <th style={{ padding: '14px 20px' }}>Category</th>
              <th style={{ padding: '14px 20px' }}>Client</th>
              <th style={{ padding: '14px 20px' }}>Result</th>
              <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #334155', color: '#cbd5e1' }}>
                <td style={{ padding: '16px 20px', fontWeight: 700, color: '#ffffff' }}>{p.title}</td>
                <td style={{ padding: '16px 20px', color: '#38bdf8' }}>{p.category}</td>
                <td style={{ padding: '16px 20px', color: '#94a3b8' }}>{p.client || 'Enterprise Client'}</td>
                <td style={{ padding: '16px 20px', color: '#4ade80', fontWeight: 600 }}>{p.result}</td>
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button onClick={() => setEditingItem(p)} style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Edit</button>
                    <button onClick={() => setDeletingId(p.id)} style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingItem && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>{editingItem.id ? 'Edit Case Study' : 'Add Case Study'}</h3>
              <button onClick={() => setEditingItem(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>Title</label>
                <input type="text" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} required style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>Category</label>
                  <input type="text" value={editingItem.category} onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>Client Name</label>
                  <input type="text" value={editingItem.client} onChange={(e) => setEditingItem({ ...editingItem, client: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>Result / Highlight Metric</label>
                <input type="text" value={editingItem.result} onChange={(e) => setEditingItem({ ...editingItem, result: e.target.value })} placeholder="e.g. 45% MTTR Reduction" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>Description</label>
                <textarea rows={3} value={editingItem.description} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setEditingItem(null)} style={{ padding: '10px 16px', borderRadius: '8px', backgroundColor: '#334155', color: '#ffffff', border: 'none', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingId && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', textAlign: 'center', maxWidth: '400px' }}>
            <AlertTriangle size={36} color="#ef4444" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '16px' }}>Delete this project?</h3>
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
