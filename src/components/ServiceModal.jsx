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
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        style={{ maxWidth: '840px' }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close service details">
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '24px' }}>
          <div className="eyebrow" style={{ marginBottom: '10px' }}>
            Service Detail • {service.category}
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--navy)' }}>
            {service.title}
          </h2>
          <p style={{ color: 'var(--blue)', fontSize: '1.05rem', fontWeight: 700, marginTop: '4px' }}>
            {service.shortDesc}
          </p>
        </div>

        {/* Overview */}
        <div style={{ marginBottom: '28px', color: 'var(--ink-60)', lineHeight: 1.7, fontSize: '1rem' }}>
          {service.overview}
        </div>

        {/* 2 Column Details: Benefits & Deliverables */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '28px'
          }}
          className="grid-2"
        >
          {/* Key Benefits */}
          <div
            style={{
              backgroundColor: 'var(--bg-light)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-md)',
              padding: '24px'
            }}
          >
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="var(--blue)" />
              <span>Key Benefits</span>
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {service.benefits.map((b, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--ink-60)' }}>
                  <CheckCircle size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Deliverables */}
          <div
            style={{
              backgroundColor: 'var(--bg-light)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-md)',
              padding: '24px'
            }}
          >
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={20} color="var(--blue)" />
              <span>Core Deliverables</span>
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {service.deliverables.map((d, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--ink-60)' }}>
                  <CheckCircle size={16} color="var(--blue)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process Steps */}
        <div style={{ marginBottom: '32px' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Workflow size={20} color="var(--blue)" />
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
                  backgroundColor: 'var(--bg-light)',
                  border: '1px solid var(--line)',
                  borderRadius: '10px',
                  padding: '14px'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--blue)', marginBottom: '4px' }}>
                  STEP 0{idx + 1}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)' }}>
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
            borderTop: '1px solid var(--line)',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ fontSize: '0.85rem', color: 'var(--ink-60)' }}>
            Philosophy: <strong style={{ color: 'var(--navy)' }}>Every Ticket Matters</strong>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-ghost" onClick={onClose}>
              Close Details
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                onClose();
                onRequestService(service);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Ticket size={18} />
              <span>Talk to an Expert</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
