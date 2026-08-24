import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, Ticket, Layers } from 'lucide-react';

export default function ProjectModal({ project, onClose, onOpenTicketWidget }) {
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

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        transition={{ duration: 0.3 }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close project modal">
          <X size={20} />
        </button>

        <div style={{ marginBottom: '24px' }}>
          <div className="eyebrow" style={{ marginBottom: '10px' }}>
            {project.badge} • {project.category}
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 800, color: '#ffffff' }}>
            {project.title}
          </h2>
        </div>

        {/* Problem, Solution, Outcome Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              borderRadius: '14px',
              padding: '20px'
            }}
          >
            <h4 style={{ color: '#f87171', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
              The Operational Challenge
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {project.problem}
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(0, 102, 255, 0.08)',
              border: '1px solid rgba(0, 102, 255, 0.25)',
              borderRadius: '14px',
              padding: '20px'
            }}
          >
            <h4 style={{ color: '#38bdf8', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
              K²V Implemented Solution
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {project.solution}
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.08)',
              border: '1px solid rgba(34, 197, 94, 0.25)',
              borderRadius: '14px',
              padding: '20px'
            }}
          >
            <h4 style={{ color: '#4ade80', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
              Measured Business Outcome
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {project.outcome}
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div style={{ marginBottom: '32px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#94a3b8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={16} />
            <span>Technologies & Platform Architecture</span>
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  backgroundColor: '#070c18',
                  border: '1px solid rgba(0, 240, 255, 0.25)',
                  color: '#00f0ff',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button className="btn btn-ghost" onClick={onClose}>
            Close
          </button>
          <button
            className="btn btn-cyan"
            onClick={() => {
              onClose();
              onOpenTicketWidget();
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Ticket size={18} />
            <span>Discuss Similar Project</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
