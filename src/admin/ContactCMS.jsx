import React, { useState, useEffect } from 'react';
import { supabase, fetchSingleRecord, fetchTableData, notifyCmsUpdate, setCachedData, getContactRequests, subscribeCmsUpdate } from '../lib/supabaseClient';
import { Mail, Phone, MapPin, Clock, CheckCircle2, AlertCircle, RefreshCw, MessageSquare, Trash2, Eye, EyeOff, Shield, Search, Filter, Save } from 'lucide-react';

export default function ContactCMS() {
  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox' | 'info'
  const [contactInfo, setContactInfo] = useState({
    email: 'info@k2vtechnologies.com',
    phone1: '+91 97416 76105',
    phone2: '+91 89034 12599',
    phone3: '+91 95000 00449',
    address: 'Remote-First IT Services Company Worldwide',
    hours: '24/7 Support Desk Available Round the Clock'
  });
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingInfo, setSavingInfo] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadData();

    const unsubscribe = subscribeCmsUpdate((tableName) => {
      if (tableName === 'contact_requests' || tableName === 'contact_info') {
        loadData();
      }
    });
    return () => unsubscribe();
  }, []);

  async function loadData() {
    const info = await fetchSingleRecord('contact_info', contactInfo);
    if (info) {
      setContactInfo({
        email: info.email || contactInfo.email,
        phone1: info.phone1 || contactInfo.phone1,
        phone2: info.phone2 || contactInfo.phone2,
        phone3: info.phone3 || contactInfo.phone3,
        address: info.address || contactInfo.address,
        hours: info.hours || contactInfo.hours
      });
    }

    // Load contact requests combined from Supabase DB & Local Cache
    try {
      const allRequests = await getContactRequests();
      setRequests(allRequests);
    } catch (err) {
      console.warn('Requests load fallback:', err);
    }
    setLoading(false);
  }

  const handleSaveContactInfo = async (e) => {
    e.preventDefault();
    setSavingInfo(true);

    const payload = { id: 1, ...contactInfo, updated_at: new Date().toISOString() };
    setCachedData('contact_info', payload);
    notifyCmsUpdate('contact_info');

    try {
      const { error } = await supabase.from('contact_info').upsert(payload, { onConflict: 'id' });
      if (error) throw new Error(error.message);

      setToast({ type: 'success', text: 'Public contact channels updated in database!' });
    } catch (err) {
      console.error('ContactCMS Save Error:', err);
      setToast({ type: 'error', text: `Save Note: ${err.message}` });
    } finally {
      setSavingInfo(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  const handleToggleRead = async (req) => {
    const newStatus = req.status === 'unread' ? 'read' : 'unread';
    const updatedReq = { ...req, status: newStatus };
    const newList = requests.map(r => r.id === req.id ? updatedReq : r);
    setRequests(newList);
    setCachedData('contact_requests', newList);
    notifyCmsUpdate('contact_requests');

    if (selectedReq?.id === req.id) setSelectedReq(updatedReq);

    try {
      await supabase.from('contact_requests').update({ status: newStatus }).eq('id', req.id);
    } catch (err) {
      console.warn('Status toggle error:', err);
    }
  };

  const handleDeleteRequest = async (id) => {
    const newList = requests.filter(r => r.id !== id);
    setRequests(newList);
    setCachedData('contact_requests', newList);
    notifyCmsUpdate('contact_requests');

    if (selectedReq?.id === id) setSelectedReq(null);

    try {
      await supabase.from('contact_requests').delete().eq('id', id);
      setToast({ type: 'success', text: 'Contact request deleted.' });
    } catch (err) {
      setToast({ type: 'error', text: 'Delete note: removed locally.' });
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleAddTestInquiry = async () => {
    try {
      await saveContactSubmission({
        name: 'Sample Client Inquiry',
        phone: '+91 98765 43210',
        email: 'client.test@domain.com',
        service: 'Managed IT Services',
        message: 'Looking for 24/7 Service Desk & ITSM infrastructure support for a 50+ user team.',
        status: 'unread'
      });
      await loadData();
      setToast({ type: 'success', text: 'Test inquiry created & saved successfully!' });
    } catch (err) {
      console.error('Test inquiry error:', err);
      setToast({ type: 'error', text: `Failed to create test inquiry: ${err?.message || err}` });
    } finally {
      setTimeout(() => setToast(null), 4000);
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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            Contact & Requests CMS
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
            View client inquiries and edit public website phone/email contact channels
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleAddTestInquiry}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #334155',
              backgroundColor: '#1e293b',
              color: '#38bdf8',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            + Create Test Inquiry
          </button>

          {/* Tab Selector */}
          <div style={{ display: 'flex', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '4px' }}>
            <button
              onClick={() => setActiveTab('inbox')}
              style={{
                padding: '8px 14px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: activeTab === 'inbox' ? '#0284c7' : 'transparent',
                color: activeTab === 'inbox' ? '#ffffff' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              Inbox ({requests.filter(r => r.status === 'unread').length} Unread)
            </button>
            <button
              onClick={() => setActiveTab('info')}
              style={{
                padding: '8px 14px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: activeTab === 'info' ? '#0284c7' : 'transparent',
                color: activeTab === 'info' ? '#ffffff' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              Public Contact Info
            </button>
          </div>
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
            <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
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

          {/* Desktop Table View */}
          <div className="cms-table-desktop" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', overflowX: 'auto' }}>
            {filteredRequests.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                No contact requests match the selected filters.
              </div>
            ) : (
              <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
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

          {/* Mobile Card View */}
          <div className="cms-mobile-cards" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredRequests.map((req) => (
              <div key={req.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    {req.name}
                  </h3>
                  <span style={{ padding: '3px 8px', borderRadius: '6px', backgroundColor: req.status === 'unread' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)', color: req.status === 'unread' ? '#ef4444' : '#22c55e', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>
                    {req.status || 'Received'}
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 700 }}>
                  Service: {req.service}
                </div>

                <div style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
                  Phone: <a href={`tel:${req.phone}`} style={{ color: '#ffffff', fontWeight: 700, textDecoration: 'none' }}>{req.phone}</a> {req.email ? `• ${req.email}` : ''}
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <button onClick={() => setSelectedReq(req)} style={{ flex: 1, background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}>
                    View Inquiry
                  </button>
                  <button onClick={() => handleToggleRead(req)} style={{ flex: 1, background: 'rgba(100, 116, 139, 0.2)', border: '1px solid #334155', color: '#cbd5e1', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>
                    {req.status === 'unread' ? 'Mark Read' : 'Mark Unread'}
                  </button>
                  <button onClick={() => handleDeleteRequest(req.id)} style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Public Contact Info Form */
        <form onSubmit={handleSaveContactInfo} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', width: '100%', maxWidth: '540px', padding: '24px' }}>
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
