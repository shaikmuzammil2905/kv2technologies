import React, { useState, useEffect } from 'react';
import { supabase, fetchTableData, notifyCmsUpdate, setCachedData } from '../lib/supabaseClient';
import { INITIAL_NAVIGATION } from '../lib/seedData';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, CheckCircle2, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';

export default function NavigationCMS() {
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadNav();
  }, []);

  async function loadNav() {
    const data = await fetchTableData('navigation_items', INITIAL_NAVIGATION);
    setNavItems(data);
    setLoading(false);
  }

  const handleOpenNew = () => {
    setEditingItem({
      id: `nav-${Date.now()}`,
      name: '',
      url: '#',
      is_active: true,
      display_order: navItems.length + 1
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingItem.name.trim()) return;

    const payload = {
      ...editingItem,
      id: editingItem.id || `nav-${Date.now()}`,
      updated_at: new Date().toISOString()
    };

    const exists = navItems.find(n => n.id === payload.id);
    let updatedList;
    if (exists) {
      updatedList = navItems.map(n => n.id === payload.id ? payload : n);
    } else {
      updatedList = [...navItems, payload];
    }

    try {
      const { error } = await supabase.from('navigation_items').upsert(payload, { onConflict: 'id' });
      if (error) throw new Error(error.message);

      setNavItems(updatedList);
      setCachedData('navigation_items', updatedList);
      notifyCmsUpdate('navigation_items');
      setEditingItem(null);
      setToast({ type: 'success', text: 'Navigation menu item saved to database!' });
    } catch (err) {
      console.error('NavigationCMS Save Error:', err);
      setNavItems(updatedList);
      setCachedData('navigation_items', updatedList);
      notifyCmsUpdate('navigation_items');
      setEditingItem(null);
      setToast({ type: 'error', text: `Save Note: ${err.message}` });
    } finally {
      setTimeout(() => setToast(null), 4000);
    }
  };

  const handleToggleStatus = async (item) => {
    const updated = { ...item, is_active: !item.is_active };
    const updatedList = navItems.map(n => n.id === item.id || n.name === item.name ? updated : n);
    setNavItems(updatedList);
    setCachedData('navigation_items', updatedList);

    try {
      const { error } = await supabase.from('navigation_items').upsert(updated, { onConflict: 'id' });
      if (error) console.warn('Status toggle DB error:', error.message);
    } catch (err) {
      console.warn('Status toggle error:', err);
    } finally {
      notifyCmsUpdate('navigation_items');
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    const updatedList = navItems.filter(n => n.id !== deletingId);

    try {
      const { error } = await supabase.from('navigation_items').delete().eq('id', deletingId);
      if (error) throw new Error(error.message);

      setNavItems(updatedList);
      setCachedData('navigation_items', updatedList);
      notifyCmsUpdate('navigation_items');
      setToast({ type: 'success', text: 'Navigation item deleted from database.' });
    } catch (err) {
      console.error('NavigationCMS Delete Error:', err);
      setNavItems(updatedList);
      setCachedData('navigation_items', updatedList);
      notifyCmsUpdate('navigation_items');
      setToast({ type: 'error', text: `Delete Note: ${err.message}` });
    } finally {
      setDeletingId(null);
      setTimeout(() => setToast(null), 4000);
    }
  };

  if (loading) {
    return <div style={{ color: '#38bdf8', padding: '40px 0', textAlign: 'center' }}>Loading Navigation CMS...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            Header Navigation CMS
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
            Control desktop and mobile navigation links, labels, and visibility
          </p>
        </div>

        <button onClick={handleOpenNew} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', border: 'none', cursor: 'pointer' }}>
          <Plus size={18} />
          <span>Add Menu Item</span>
        </button>
      </div>

      {toast && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', backgroundColor: toast.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: toast.type === 'success' ? '#4ade80' : '#fca5a5' }}>
          {toast.text}
        </div>
      )}

      {/* Desktop Table View */}
      <div className="cms-table-desktop" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155', color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '14px 20px' }}>Order</th>
              <th style={{ padding: '14px 20px' }}>Menu Label</th>
              <th style={{ padding: '14px 20px' }}>Target URL / Hash</th>
              <th style={{ padding: '14px 20px' }}>Status</th>
              <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {navItems.map((item, idx) => (
              <tr key={item.id || idx} style={{ borderBottom: '1px solid #334155', color: '#cbd5e1' }}>
                <td style={{ padding: '16px 20px', fontWeight: 800, color: '#38bdf8' }}>{item.display_order || idx + 1}</td>
                <td style={{ padding: '16px 20px', fontWeight: 700, color: '#ffffff' }}>{item.name}</td>
                <td style={{ padding: '16px 20px', color: '#94a3b8' }}>{item.url}</td>
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
                    <span>{item.is_active !== false ? 'Visible' : 'Hidden'}</span>
                  </button>
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button onClick={() => setEditingItem(item)} style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Edit</button>
                    <button onClick={() => setDeletingId(item.id)} style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="cms-mobile-cards" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {navItems.map((item, idx) => (
          <div key={item.id || idx} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                  #{item.display_order || idx + 1}
                </span>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  {item.name}
                </h3>
              </div>
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
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {item.is_active !== false ? <Eye size={12} /> : <EyeOff size={12} />}
                <span>{item.is_active !== false ? 'Visible' : 'Hidden'}</span>
              </button>
            </div>

            <div style={{ fontSize: '0.84rem', color: '#94a3b8' }}>Target URL: <span style={{ color: '#38bdf8' }}>{item.url}</span></div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button onClick={() => setEditingItem(item)} style={{ flex: 1, background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}>Edit Item</button>
              <button onClick={() => setDeletingId(item.id)} style={{ flex: 1, background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', width: '100%', maxWidth: '480px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>{editingItem.id ? 'Edit Menu Item' : 'Add Menu Item'}</h3>
              <button onClick={() => setEditingItem(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>Menu Label Text</label>
                <input type="text" value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} required style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>Link URL (e.g. #services)</label>
                <input type="text" value={editingItem.url} onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })} required style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>Display Order Number</label>
                <input type="number" value={editingItem.display_order} onChange={(e) => setEditingItem({ ...editingItem, display_order: parseInt(e.target.value, 10) })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setEditingItem(null)} style={{ padding: '10px 16px', borderRadius: '8px', backgroundColor: '#334155', color: '#ffffff', border: 'none', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Save Item</button>
              </div>
            </form>
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
