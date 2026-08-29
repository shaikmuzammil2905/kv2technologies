import React, { useState, useEffect } from 'react';
import { supabase, fetchTableData } from '../lib/supabaseClient';
import { SERVICES_DATA } from '../lib/seedData';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ServicesCMS() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    const data = await fetchTableData('services', SERVICES_DATA);
    setServices(data);
    setLoading(false);
  }

  const handleOpenNew = () => {
    setEditingItem({
      id: Date.now().toString(),
      num: `0${services.length + 1}`,
      title: '',
      shortDesc: '',
      fullDesc: '',
      icon: 'Headphones',
      keyFeatures: [],
      businessBenefits: [],
      is_active: true,
      display_order: services.length + 1
    });
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    if (!editingItem.title.trim()) return;

    try {
      const payload = {
        ...editingItem,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('services').upsert(payload);
      if (error) console.warn('Supabase upsert warning:', error);

      const exists = services.find(s => s.id === editingItem.id);
      let updatedList;
      if (exists) {
        updatedList = services.map(s => s.id === editingItem.id ? payload : s);
      } else {
        updatedList = [...services, payload];
      }

      setServices(updatedList);
      setEditingItem(null);
      setToast({ type: 'success', text: 'Service saved successfully!' });
    } catch (err) {
      setToast({ type: 'error', text: 'Failed to save service.' });
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleToggleStatus = async (item) => {
    const updated = { ...item, is_active: !item.is_active };
    const updatedList = services.map(s => s.id === item.id ? updated : s);
    setServices(updatedList);

    try {
      await supabase.from('services').upsert(updated);
    } catch (err) {
      console.warn('Status update error:', err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;

    try {
      await supabase.from('services').delete().eq('id', deletingId);
      setServices(services.filter(s => s.id !== deletingId));
      setToast({ type: 'success', text: 'Service deleted successfully.' });
    } catch (err) {
      setToast({ type: 'error', text: 'Failed to delete service.' });
    } finally {
      setDeletingId(null);
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (loading) {
    return <div style={{ color: '#38bdf8', padding: '40px 0', textAlign: 'center' }}>Loading Services CMS...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            IT Services CMS (Full CRUD)
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
            Manage the 8 core IT service cards displayed on the public website
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '8px',
            backgroundColor: '#0284c7',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.88rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Plus size={18} />
          <span>Add New Service</span>
        </button>
      </div>

      {toast && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: toast.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: toast.type === 'success' ? '1px solid rgba(34, 197, 94, 0.35)' : '1px solid rgba(239, 68, 68, 0.35)',
            color: toast.type === 'success' ? '#4ade80' : '#fca5a5'
          }}
        >
          <CheckCircle2 size={18} />
          <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{toast.text}</span>
        </div>
      )}

      {/* Services Table */}
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155', color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '14px 20px' }}>Num</th>
              <th style={{ padding: '14px 20px' }}>Icon</th>
              <th style={{ padding: '14px 20px' }}>Service Title</th>
              <th style={{ padding: '14px 20px' }}>Description Preview</th>
              <th style={{ padding: '14px 20px' }}>Status</th>
              <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #334155', color: '#cbd5e1' }}>
                <td style={{ padding: '16px 20px', fontWeight: 800, color: '#38bdf8' }}>{item.num}</td>
                <td style={{ padding: '16px 20px', color: '#94a3b8' }}>{item.icon}</td>
                <td style={{ padding: '16px 20px', fontWeight: 700, color: '#ffffff' }}>{item.title}</td>
                <td style={{ padding: '16px 20px', color: '#94a3b8', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.shortDesc}
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <button
                    onClick={() => handleToggleStatus(item)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: item.is_active !== false ? 'rgba(34, 197, 94, 0.15)' : 'rgba(100, 116, 139, 0.2)',
                      color: item.is_active !== false ? '#4ade80' : '#94a3b8',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {item.is_active !== false ? <Eye size={13} /> : <EyeOff size={13} />}
                    <span>{item.is_active !== false ? 'Active' : 'Disabled'}</span>
                  </button>
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                    <button
                      onClick={() => setEditingItem(item)}
                      style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}
                    >
                      <Edit2 size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeletingId(item.id)}
                      style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}
                    >
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

      {/* Edit / Add Modal */}
      {editingItem && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                {editingItem.id ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={() => setEditingItem(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveItem} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>Number Code</label>
                  <input type="text" value={editingItem.num} onChange={(e) => setEditingItem({ ...editingItem, num: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>Lucide Icon Name</label>
                  <input type="text" value={editingItem.icon} onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })} placeholder="Headphones, Cloud, Workflow..." style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>Service Title</label>
                <input type="text" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} required style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>Short Card Description</label>
                <textarea rows={3} value={editingItem.shortDesc} onChange={(e) => setEditingItem({ ...editingItem, shortDesc: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>Full Detail Description (Modal)</label>
                <textarea rows={4} value={editingItem.fullDesc} onChange={(e) => setEditingItem({ ...editingItem, fullDesc: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setEditingItem(null)} style={{ padding: '10px 16px', borderRadius: '8px', backgroundColor: '#334155', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', width: '100%', maxWidth: '420px', padding: '24px', textAlign: 'center' }}>
            <AlertTriangle size={36} color="#ef4444" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>Are you sure you want to delete this service?</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '20px' }}>This action will remove the service card from the public website.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setDeletingId(null)} style={{ padding: '10px 18px', borderRadius: '8px', backgroundColor: '#334155', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={handleDeleteConfirm} style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
