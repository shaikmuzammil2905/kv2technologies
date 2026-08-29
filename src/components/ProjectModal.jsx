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

  const techStackList = Array.isArray(project.techStack)
    ? project.techStack
    : Array.isArray(project.tags)
    ? project.tags
    : typeof project.techStack === 'string'
    ? project.techStack.split(',').map(s => s.trim()).filter(Boolean)
    : typeof project.tags === 'string'
    ? project.tags.split(',').map(s => s.trim()).filter(Boolean)
    : ['IT Operations', 'Service Management'];

  const problemText = project.problem || project.description || 'Enterprise IT operational challenge requiring optimization and structured SLA management.';
  const solutionText = project.solution || project.shortDesc || 'K²V Technologies deployed multi-tiered IT support workflows and automated escalation pipelines.';
  const outcomeText = project.outcome || project.result || 'Achieved high SLA compliance and significant downtime reduction across global business units.';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.25 }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close project modal">
          <X size={20} />
        </button>

        <div style={{ marginBottom: '24px' }}>
          <div className="eyebrow" style={{ marginBottom: '10px' }}>
            {project.badge || 'Case Study'} • {project.category || 'IT Services'}
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 800, color: 'var(--navy)' }}>
            {project.title}
          </h2>
        </div>

        {/* Problem, Solution, Outcome Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.06)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '14px',
              padding: '20px'
            }}
          >
            <h4 style={{ color: '#dc2626', fontSize: '0.86rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
              The Operational Challenge
            </h4>
            <p style={{ color: 'var(--navy)', fontSize: '0.94rem', lineHeight: 1.6 }}>
              {problemText}
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--light-blue)',
              border: '1px solid rgba(7, 87, 217, 0.2)',
              borderRadius: '14px',
              padding: '20px'
            }}
          >
            <h4 style={{ color: 'var(--blue)', fontSize: '0.86rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
              K²V Implemented Solution
            </h4>
            <p style={{ color: 'var(--navy)', fontSize: '0.94rem', lineHeight: 1.6 }}>
              {solutionText}
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.06)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '14px',
              padding: '20px'
            }}
          >
            <h4 style={{ color: '#16a34a', fontSize: '0.86rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
              Measured Business Outcome
            </h4>
            <p style={{ color: 'var(--navy)', fontSize: '0.94rem', lineHeight: 1.6 }}>
              {outcomeText}
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div style={{ marginBottom: '32px' }}>
          <h4 style={{ fontSize: '0.86rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-60)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={16} />
            <span>Technologies & Platform Architecture</span>
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {techStackList.map((tech, idx) => (
              <span
                key={idx}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  backgroundColor: 'var(--bg-light)',
                  border: '1px solid var(--line)',
                  color: 'var(--navy)',
                  fontSize: '0.84rem',
                  fontWeight: 700
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
          <button className="btn btn-ghost" onClick={onClose}>
            Close
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onOpenTicketWidget();
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Ticket size={18} />
            <span>Discuss Similar Case Study</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
