import React, { useState, useEffect } from 'react';
import { supabase, fetchSingleRecord, fetchTableData } from '../lib/supabaseClient';
import { INITIAL_SITE_SETTINGS } from '../lib/seedData';
import { Mail, Phone, Search, Trash2, Eye, CheckCircle2, Clock, Filter, Save } from 'lucide-react';

export default function ContactCMS() {
  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox' | 'info'
  const [requests, setRequests] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    phone1: INITIAL_SITE_SETTINGS.phone1,
    phone2: INITIAL_SITE_SETTINGS.phone2,
    phone3: INITIAL_SITE_SETTINGS.phone3,
    email: INITIAL_SITE_SETTINGS.email,
    address: INITIAL_SITE_SETTINGS.address,
    businessHours: '24/7 Multi-Timezone Operations Support'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedReq, setSelectedReq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingInfo, setSavingInfo] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    // Load contact info
    const info = await fetchSingleRecord('contact_info', contactInfo);
    if (info) {
      setContactInfo({
        phone1: info.phone1 || contactInfo.phone1,
        phone2: info.phone2 || contactInfo.phone2,
        phone3: info.phone3 || contactInfo.phone3,
        email: info.email || contactInfo.email,
        address: info.address || contactInfo.address,
        businessHours: info.businessHours || contactInfo.businessHours
      });
    }

    // Load contact requests
    try {
      const { data } = await supabase.from('contact_requests').select('*').order('created_at', { ascending: false });
      if (data) setRequests(data);
    } catch (err) {
      console.warn('Requests load fallback:', err);
    }
    setLoading(false);
  }

  const handleSaveContactInfo = async (e) => {
    e.preventDefault();
    setSavingInfo(true);

    try {
      const payload = { id: 1, ...contactInfo, updated_at: new Date().toISOString() };
      await supabase.from('contact_info').upsert(payload, { onConflict: 'id' });
      setToast({ type: 'success', text: 'Public contact channels updated!' });
    } catch (err) {
      setToast({ type: 'error', text: 'Failed to update contact channels.' });
    } finally {
      setSavingInfo(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleToggleRead = async (req) => {
    const newStatus = req.status === 'unread' ? 'read' : 'unread';
    const updated = { ...req, status: newStatus };
    setRequests(requests.map(r => r.id === req.id ? updated : r));
    if (selectedReq?.id === req.id) setSelectedReq(updated);

    try {
      await supabase.from('contact_requests').update({ status: newStatus }).eq('id', req.id);
    } catch (err) {
      console.warn('Status toggle error:', err);
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      await supabase.from('contact_requests').delete().eq('id', id);
      setRequests(requests.filter(r => r.id !== id));
      if (selectedReq?.id === id) setSelectedReq(null);
      setToast({ type: 'success', text: 'Contact request deleted.' });
    } catch (err) {
      setToast({ type: 'error', text: 'Delete failed.' });
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  const filteredRequests = requests.filter(r => {
    const matchesSearch = (r.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (r.phone || '').includes(searchQuery) ||
                          (r.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (r.service || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === 'unread') return matchesSearch && r.status === 'unread';
    if (filterStatus === 'read') return matchesSearch && r.status === 'read';
    return matchesSearch;
  });

  if (loading) {
    return <div style={{ color: '#38bdf8', padding: '40px 0', textAlign: 'center' }}>Loading Contact CMS...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            Contact & Requests CMS
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
            View client inquiries and edit public website phone/email contact channels
          </p>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '4px' }}>
          <button
            onClick={() => setActiveTab('inbox')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: activeTab === 'inbox' ? '#0284c7' : 'transparent',
              color: activeTab === 'inbox' ? '#ffffff' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Inquiries Inbox ({requests.filter(r => r.status === 'unread').length} Unread)
          </button>
          <button
            onClick={() => setActiveTab('info')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: activeTab === 'info' ? '#0284c7' : 'transparent',
              color: activeTab === 'info' ? '#ffffff' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Public Contact Info
          </button>
        </div>
      </div>

      {toast && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', backgroundColor: toast.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: toast.type === 'success' ? '#4ade80' : '#fca5a5' }}>
          {toast.text}
        </div>
      )}

      {activeTab === 'inbox' ? (
        <div>
          {/* Controls Bar */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
              <Search size={18} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search requests by name, phone, service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '8px', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#ffffff', outline: 'none' }}
            >
              <option value="all">All Inquiries</option>
              <option value="unread">Unread Only</option>
              <option value="read">Read Only</option>
            </select>
          </div>

          {/* Table */}
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', overflow: 'hidden' }}>
            {filteredRequests.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                No contact requests match the selected filters.
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155', color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '14px 20px' }}>Name</th>
                    <th style={{ padding: '14px 20px' }}>Phone / Email</th>
                    <th style={{ padding: '14px 20px' }}>Service Interested</th>
                    <th style={{ padding: '14px 20px' }}>Status</th>
                    <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((req) => (
                    <tr key={req.id} style={{ borderBottom: '1px solid #334155', color: '#cbd5e1' }}>
                      <td style={{ padding: '16px 20px', fontWeight: 800, color: '#ffffff' }}>{req.name}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ color: '#ffffff', fontWeight: 600 }}>{req.phone}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{req.email || 'N/A'}</div>
                      </td>
                      <td style={{ padding: '16px 20px', color: '#38bdf8', fontWeight: 600 }}>{req.service}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ padding: '4px 10px', borderRadius: '6px', backgroundColor: req.status === 'unread' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)', color: req.status === 'unread' ? '#ef4444' : '#22c55e', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                          {req.status || 'Received'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button onClick={() => setSelectedReq(req)} style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                            View Details
                          </button>
                          <button onClick={() => handleToggleRead(req)} style={{ background: 'rgba(100, 116, 139, 0.2)', border: '1px solid #334155', color: '#cbd5e1', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>
                            Mark {req.status === 'unread' ? 'Read' : 'Unread'}
                          </button>
                          <button onClick={() => handleDeleteRequest(req.id)} style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : (
        /* Public Contact Info Form */
        <form onSubmit={handleSaveContactInfo} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '32px', maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>CEO Line (Line 1)</label>
            <input type="text" value={contactInfo.phone1} onChange={(e) => setContactInfo({ ...contactInfo, phone1: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>CTO Line (Line 2)</label>
            <input type="text" value={contactInfo.phone2} onChange={(e) => setContactInfo({ ...contactInfo, phone2: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>CIO Line (Line 3)</label>
            <input type="text" value={contactInfo.phone3} onChange={(e) => setContactInfo({ ...contactInfo, phone3: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>Official Email Address</label>
            <input type="email" value={contactInfo.email} onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>Business Location Description</label>
            <input type="text" value={contactInfo.address} onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', boxSizing: 'border-box' }} />
          </div>

          <button type="submit" disabled={savingInfo} style={{ padding: '14px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Save size={18} />
            <span>{savingInfo ? 'Saving...' : 'Save Public Contact Info'}</span>
          </button>
        </form>
      )}

      {/* Details View Modal */}
      {selectedReq && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', width: '100%', maxWidth: '540px', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>Inquiry Details</h3>
              <button onClick={() => setSelectedReq(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <div><strong style={{ color: '#ffffff' }}>Name:</strong> {selectedReq.name}</div>
              <div><strong style={{ color: '#ffffff' }}>Phone:</strong> <a href={`tel:${selectedReq.phone}`} style={{ color: '#38bdf8' }}>{selectedReq.phone}</a></div>
              <div><strong style={{ color: '#ffffff' }}>Email:</strong> {selectedReq.email || 'None'}</div>
              <div><strong style={{ color: '#ffffff' }}>Service Interested:</strong> {selectedReq.service}</div>
              <div><strong style={{ color: '#ffffff' }}>Details / Requirements:</strong></div>
              <div style={{ backgroundColor: '#0f172a', padding: '14px', borderRadius: '8px', border: '1px solid #334155', color: '#f8fafc', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                {selectedReq.message || 'No details provided.'}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => handleToggleRead(selectedReq)} style={{ padding: '10px 16px', borderRadius: '8px', backgroundColor: '#334155', color: '#ffffff', border: 'none', cursor: 'pointer' }}>
                Mark {selectedReq.status === 'unread' ? 'Read' : 'Unread'}
              </button>
              <button onClick={() => setSelectedReq(null)} style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
