import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Phone, Copy, Check } from 'lucide-react';

export default function PhoneModal({ isOpen, onClose }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const phoneNumbers = [
    { display: '+91 97416 76105', tel: 'tel:+919741676105', label: 'Primary Desk Line' },
    { display: '+91 93421 74058', tel: 'tel:+919342174058', label: 'Technical Operations' },
    { display: '+91 95000 00449', tel: 'tel:+919500000449', label: 'Client Relations' }
  ];

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25 }}
        style={{ maxWidth: '520px' }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close phone options modal">
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--light-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--blue)'
            }}
          >
            <Phone size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)' }}>Call K²V Technologies</h3>
            <p style={{ color: 'var(--ink-60)', fontSize: '0.88rem' }}>Tap to dial on mobile or copy phone number</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
          {phoneNumbers.map((num, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-light)',
                border: '1px solid var(--line)'
              }}
            >
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--blue)', fontWeight: 800, textTransform: 'uppercase' }}>
                  {num.label}
                </div>
                <a
                  href={num.tel}
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: 'var(--navy)',
                    textDecoration: 'none',
                    fontFamily: "'Manrope', sans-serif"
                  }}
                >
                  {num.display}
                </a>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={num.tel}
                  className="btn btn-primary btn-sm"
                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Phone size={14} />
                  <span>Call</span>
                </a>

                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => handleCopy(num.display, idx)}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check size={14} color="#16a34a" />
                      <span style={{ color: '#16a34a' }}>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
