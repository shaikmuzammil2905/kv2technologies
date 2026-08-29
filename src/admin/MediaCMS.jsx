import React, { useState, useEffect } from 'react';
import { supabase, fetchTableData } from '../lib/supabaseClient';
import { uploadToCloudinary } from '../lib/cloudinary';
import { UploadCloud, Image as ImageIcon, Copy, Check, Trash2, ExternalLink, RefreshCw } from 'lucide-react';

export default function MediaCMS() {
  const [mediaList, setMediaList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadMedia();
  }, []);

  async function loadMedia() {
    const data = await fetchTableData('media_library', []);
    setMediaList(data);
    setLoading(false);
  }

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setToast(null);

    try {
      const file = files[0];
      const result = await uploadToCloudinary(file);

      const record = {
        id: Date.now().toString(),
        title: file.name,
        url: result.url,
        public_id: result.public_id,
        file_size: `${(file.size / 1024).toFixed(1)} KB`,
        created_at: new Date().toISOString()
      };

      await supabase.from('media_library').insert([record]);
      setMediaList([record, ...mediaList]);
      setToast({ type: 'success', text: `Image "${file.name}" uploaded successfully to Cloudinary!` });
    } catch (err) {
      setToast({ type: 'error', text: err.message || 'Image upload failed.' });
    } finally {
      setUploading(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  const handleCopyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteMedia = async (id) => {
    try {
      await supabase.from('media_library').delete().eq('id', id);
      setMediaList(mediaList.filter(m => m.id !== id));
      setToast({ type: 'success', text: 'Media item deleted.' });
    } catch (err) {
      setToast({ type: 'error', text: 'Delete failed.' });
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (loading) {
    return <div style={{ color: '#38bdf8', padding: '40px 0', textAlign: 'center' }}>Loading Media Library CMS...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            Media & Image Library (Cloudinary)
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
            Upload, preview, replace, and copy asset URLs for K²V website CMS
          </p>
        </div>

        {/* Upload Button */}
        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '8px',
            backgroundColor: uploading ? '#334155' : '#0284c7',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: uploading ? 'not-allowed' : 'pointer'
          }}
        >
          {uploading ? <RefreshCw size={18} className="spin-icon" /> : <UploadCloud size={18} />}
          <span>{uploading ? 'Uploading Image...' : 'Upload Image'}</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} style={{ display: 'none' }} />
        </label>
      </div>

      {toast && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', backgroundColor: toast.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: toast.type === 'success' ? '#4ade80' : '#fca5a5' }}>
          {toast.text}
        </div>
      )}

      {/* Grid of uploaded media */}
      {mediaList.length === 0 ? (
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '60px 20px', textAlign: 'center' }}>
          <ImageIcon size={48} color="#64748b" style={{ margin: '0 auto 16px auto' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>No media uploaded yet</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '20px' }}>
            Click the "Upload Image" button above to upload images directly to Cloudinary (cloud: jdobykmp).
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {mediaList.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '150px', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                <img src={item.url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '4px' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.file_size || 'Cloudinary'}</div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                  <button
                    onClick={() => handleCopyUrl(item.url, item.id)}
                    style={{ flex: 1, padding: '6px 10px', borderRadius: '6px', backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                  >
                    {copiedId === item.id ? <Check size={13} color="#22c55e" /> : <Copy size={13} />}
                    <span>{copiedId === item.id ? 'Copied' : 'Copy URL'}</span>
                  </button>
                  <button
                    onClick={() => handleDeleteMedia(item.id)}
                    style={{ padding: '6px 10px', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', fontSize: '0.78rem', cursor: 'pointer' }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
