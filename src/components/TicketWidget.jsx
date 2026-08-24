import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, AlertCircle, CheckCircle, Clock, Send, MessageSquare, X } from 'lucide-react';

export default function TicketWidget({ isOpen, onClose, onSelectWhatsApp, onOpenContactWithData }) {
  const [priority, setPriority] = useState('P2');
  const [service, setService] = useState('IT Service Desk');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const priorities = [
    { id: 'P1', label: 'P1 - Critical Outage', sla: '< 15 Mins Response', color: '#ef4444' },
    { id: 'P2', label: 'P2 - High Priority', sla: '< 30 Mins Response', color: '#f59e0b' },
    { id: 'P3', label: 'P3 - Standard Request', sla: '< 2 Hours Response', color: '#3b82f6' }
  ];

  const servicesList = [
    'IT Service Desk Support',
    'Managed IT Infrastructure',
    'ServiceNow Implementation',
    'Cloud Migration & AWS/Azure',
    'Cybersecurity Incident',
    '24/7 NOC Telemetry'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello K2V Technologies!\nI would like to raise a support request:\n• Priority: ${priority}\n• Service: ${service}\n• Requirement: ${description || 'General Inquiry'}`
    );
    onSelectWhatsApp(text);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0, 240, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00f0ff'
                }}
              >
                <Ticket size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Raise a Support Ticket</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Every Ticket Matters — Guaranteed SLA Target</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Priority Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
                  Select Priority Level
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {priorities.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPriority(item.id)}
                      style={{
                        padding: '12px 8px',
                        borderRadius: '10px',
                        border: priority === item.id ? `2px solid ${item.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: priority === item.id ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                        color: '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: item.color }}>{item.id}</div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>{item.sla}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Category */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
                  Service Category
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    backgroundColor: '#070c18',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                >
                  {servicesList.map((s, idx) => (
                    <option key={idx} value={s} style={{ backgroundColor: '#070c18' }}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Requirement details */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
                  Requirement / Incident Summary
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your technology request or issue..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    backgroundColor: '#070c18',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Action options */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '10px' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleWhatsAppRedirect}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <MessageSquare size={18} color="#25D366" />
                  <span>Send via WhatsApp</span>
                </button>

                <button
                  type="submit"
                  className="btn btn-cyan"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Send size={18} />
                  <span>Submit Ticket</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                color: '#22c55e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}
            >
              <CheckCircle size={36} />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>
              Ticket Dispatch Initialized!
            </h3>

            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '24px' }}>
              Your ticket request for <strong>{service}</strong> ({priority}) has been registered. Under K²V's philosophy, <strong>Every Ticket Matters</strong> and our team responds promptly!
            </p>

            <div
              style={{
                backgroundColor: '#070c18',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                marginBottom: '24px',
                textAlign: 'left'
              }}
            >
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Assigned Ticket ID</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#00f0ff', fontFamily: 'monospace' }}>
                #K2V-{Math.floor(100000 + Math.random() * 900000)}
              </div>
            </div>

            <button className="btn btn-primary" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
