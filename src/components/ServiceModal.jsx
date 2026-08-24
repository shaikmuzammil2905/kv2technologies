import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, ArrowRight, Layers, Workflow, ShieldCheck, Ticket } from 'lucide-react';

export default function ServiceModal({ service, onClose, onRequestService }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('modal-open');

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [onClose]);

  if (!service) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        transition={{ duration: 0.3 }}
        style={{ maxWidth: '840px' }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close service details">
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '28px' }}>
          <div className="eyebrow" style={{ marginBottom: '12px' }}>
            Service Detail • {service.category}
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#ffffff' }}>
            {service.title}
          </h2>
          <p style={{ color: '#00f0ff', fontSize: '1.05rem', fontWeight: 600, marginTop: '4px' }}>
            {service.shortDesc}
          </p>
        </div>

        {/* Overview */}
        <div style={{ marginBottom: '32px', color: '#cbd5e1', lineHeight: '1.7', fontSize: '1rem' }}>
          {service.overview}
        </div>

        {/* 2 Column Details: Benefits & Deliverables */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            marginBottom: '32px'
          }}
          className="grid-2"
        >
          {/* Key Benefits */}
          <div
            style={{
              backgroundColor: 'rgba(7, 12, 24, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '24px'
            }}
          >
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="#00f0ff" />
              <span>Key Benefits</span>
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {service.benefits.map((b, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#94a3b8' }}>
                  <CheckCircle size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Deliverables */}
          <div
            style={{
              backgroundColor: 'rgba(7, 12, 24, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '24px'
            }}
          >
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={20} color="#0066ff" />
              <span>Core Deliverables</span>
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {service.deliverables.map((d, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#94a3b8' }}>
                  <CheckCircle size={16} color="#0066ff" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process Steps */}
        <div style={{ marginBottom: '36px' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Workflow size={20} color="#00f0ff" />
            <span>Service Workflow</span>
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px'
            }}
            className="grid-4"
          >
            {service.process.map((step, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#070c18',
                  border: '1px solid rgba(0, 140, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '14px',
                  position: 'relative'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00f0ff', marginBottom: '4px' }}>
                  STEP 0{idx + 1}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer Action */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Philosophy: <strong style={{ color: '#ffffff' }}>Every Ticket Matters</strong>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-ghost" onClick={onClose}>
              Close Details
            </button>
            <button
              className="btn btn-cyan"
              onClick={() => {
                onClose();
                onRequestService(service);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Ticket size={18} />
              <span>Request This Service</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
