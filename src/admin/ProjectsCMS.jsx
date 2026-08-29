import React, { useState, useEffect } from 'react';
import { supabase, fetchTableData, notifyCmsUpdate, setCachedData } from '../lib/supabaseClient';
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
      id: `prj-${Date.now()}`,
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

    const payload = { ...editingItem, updated_at: new Date().toISOString() };
    const exists = projects.find(p => p.id === editingItem.id);
    let updatedList;
    if (exists) {
      updatedList = projects.map(p => p.id === editingItem.id ? payload : p);
    } else {
      updatedList = [...projects, payload];
    }

    try {
      const { error } = await supabase.from('projects').upsert(payload, { onConflict: 'id' });
      if (error) throw new Error(error.message);

      setProjects(updatedList);
      setCachedData('projects', updatedList);
      notifyCmsUpdate('projects');
      setEditingItem(null);
      setToast({ type: 'success', text: 'Project case study saved successfully to database!' });
    } catch (err) {
      console.error('ProjectsCMS Save Error:', err);
      setProjects(updatedList);
      setCachedData('projects', updatedList);
      notifyCmsUpdate('projects');
      setEditingItem(null);
      setToast({ type: 'error', text: `Save Note: ${err.message}` });
    } finally {
      setTimeout(() => setToast(null), 4000);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    const updatedList = projects.filter(p => p.id !== deletingId);

    try {
      const { error } = await supabase.from('projects').delete().eq('id', deletingId);
      if (error) throw new Error(error.message);

      setProjects(updatedList);
      setCachedData('projects', updatedList);
      notifyCmsUpdate('projects');
      setToast({ type: 'success', text: 'Project deleted from database.' });
    } catch (err) {
      console.error('ProjectsCMS Delete Error:', err);
      setProjects(updatedList);
      setCachedData('projects', updatedList);
      notifyCmsUpdate('projects');
      setToast({ type: 'error', text: `Delete Note: ${err.message}` });
    } finally {
      setDeletingId(null);
      setTimeout(() => setToast(null), 4000);
    }
  };

  if (loading) {
    return <div style={{ color: '#38bdf8', padding: '40px 0', textAlign: 'center' }}>Loading Projects CMS...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            Projects / Case Studies CMS
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
            Manage client case studies, results, categories, and tags
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', border: 'none', cursor: 'pointer' }}
        >
          <Plus size={18} />
          <span>Add Project</span>
        </button>
      </div>

      {toast && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', backgroundColor: toast.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: toast.type === 'success' ? '#4ade80' : '#fca5a5' }}>
          {toast.text}
        </div>
      )}

      {/* Desktop Table View */}
      <div className="cms-table-desktop" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
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
                    <button onClick={() => setEditingItem(p)} style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Edit2 size={14} />
                      <span>Edit</span>
                    </button>
                    <button onClick={() => setDeletingId(p.id)} style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="cms-mobile-cards" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {projects.map((p) => (
          <div
            key={p.id}
            style={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '14px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                {p.category}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#4ade80', fontWeight: 700 }}>
                {p.result}
              </span>
            </div>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              {p.title}
            </h3>

            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.45, margin: 0 }}>
              {p.shortDesc || p.description}
            </p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button
                onClick={() => setEditingItem(p)}
                style={{ flex: 1, background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', padding: '10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700 }}
              >
                <Edit2 size={15} />
                <span>Edit Case Study</span>
              </button>
              <button
                onClick={() => setDeletingId(p.id)}
                style={{ flex: 1, background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700 }}
              >
                <Trash2 size={15} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingItem && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>{editingItem.id ? 'Edit Case Study' : 'Add Case Study'}</h3>
              <button onClick={() => setEditingItem(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>Title</label>
                <input type="text" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} required style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
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

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
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

      <style>{`
        @media (max-width: 767px) {
          .cms-table-desktop {
            display: none !important;
          }
          .cms-mobile-cards {
            display: flex !important;
          }
        }
        @media (min-width: 768px) {
          .cms-table-desktop {
            display: block !important;
          }
          .cms-mobile-cards {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
