import React from 'react';
import { motion } from 'framer-motion';
import { X, MessageSquare, ExternalLink } from 'lucide-react';

export default function WhatsAppModal({ isOpen, onClose, customMessage }) {
  if (!isOpen) return null;

  const phoneNumbers = [
    { display: '+91 97416 76105', raw: '919741676105', label: 'CEO' },
    { display: '+91 89034 12599', raw: '918903412599', label: 'CTO' },
    { display: '+91 95000 00449', raw: '919500000449', label: 'CIO' }
  ];

  const defaultMsg = customMessage || encodeURIComponent('Hello K2V Technologies! I would like to inquire about your IT Service Desk and Managed IT services.');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25 }}
        style={{ maxWidth: '540px' }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close WhatsApp modal">
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'rgba(37, 211, 102, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#25D366'
            }}
          >
            <MessageSquare size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)' }}>Chat on WhatsApp</h3>
            <p style={{ color: 'var(--ink-60)', fontSize: '0.88rem' }}>Select an available K²V Technologies business number</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
          {phoneNumbers.map((num, idx) => {
            const link = `https://wa.me/${num.raw}?text=${defaultMsg}`;

            return (
              <a
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-light)',
                  border: '1px solid var(--line)',
                  color: 'var(--navy)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#25D366';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--line)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#25D366', fontWeight: 800, textTransform: 'uppercase' }}>
                    {num.label}
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: "'Manrope', sans-serif" }}>
                    {num.display}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#25D366', fontWeight: 700, fontSize: '0.9rem' }}>
                  <span>Open Chat</span>
                  <ExternalLink size={16} />
                </div>
              </a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
