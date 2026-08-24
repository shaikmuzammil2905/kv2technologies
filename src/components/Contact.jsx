import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Mail, Globe2, Send, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export default function Contact({ onOpenWhatsApp, onOpenPhone }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'IT Service Desk',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const phoneNumbers = [
    { display: '+91 97416 76105', raw: '+919741676105' },
    { display: '+91 93421 74058', raw: '+919342174058' },
    { display: '+91 95000 00449', raw: '+919500000449' }
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full Name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Contact Number is required';
    } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(formData.phone)) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) errs.message = 'Please provide details about your request';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" style={{ padding: '100px 0', backgroundColor: '#090e1c', position: 'relative' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">
            <Sparkles size={14} color="#00f0ff" />
            <span>Get In Touch</span>
          </div>
          <h2 className="section-title">
            Let's Make IT <span className="gradient-blue-cyan">Simpler.</span>
          </h2>
          <p className="section-sub">
            Tell us about your IT environment. Our technical team is ready to respond under our <strong>Every Ticket Matters</strong> commitment.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.9fr 1.1fr',
            gap: '48px',
            alignItems: 'start'
          }}
          className="grid-2"
        >
          {/* Left Column: Direct Phone & Remote Info */}
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '20px' }}>
              Direct Contact Channels
            </h3>

            {/* Phone numbers list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {phoneNumbers.map((num, idx) => (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Phone size={20} color="#00f0ff" />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>
                        Business Phone Line {idx + 1}
                      </div>
                      <a
                        href={`tel:${num.raw}`}
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          textDecoration: 'none',
                          fontFamily: 'monospace'
                        }}
                      >
                        {num.display}
                      </a>
                    </div>
                  </div>

                  <a href={`tel:${num.raw}`} className="btn btn-outline btn-sm">
                    Call
                  </a>
                </div>
              ))}
            </div>

            {/* Quick WhatsApp Banner */}
            <div
              style={{
                backgroundColor: 'rgba(37, 211, 102, 0.1)',
                border: '1px solid rgba(37, 211, 102, 0.3)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  Need Instant WhatsApp Support?
                </div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Chat directly with our on-duty desk engineer.
                </div>
              </div>
              <button className="btn btn-cyan btn-sm" onClick={onOpenWhatsApp} style={{ backgroundColor: '#25D366', color: '#ffffff', flexShrink: 0 }}>
                <MessageSquare size={16} />
                <span>WhatsApp</span>
              </button>
            </div>

            {/* Remote Location Card */}
            <div
              className="glass-panel"
              style={{ padding: '24px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}
            >
              <Globe2 size={28} color="#00f0ff" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  Remote-First Technology Company
                </h4>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.6' }}>
                  Serving clients through technology, wherever they are. We operate fully remote with multi-timezone coverage and no physical office boundaries.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="glass-panel" style={{ padding: '36px' }}>
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                  Send a Message / Consultation Request
                </h3>

                {/* Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Your Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      backgroundColor: '#070c18',
                      border: errors.name ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                  {errors.name && <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>{errors.name}</div>}
                </div>

                {/* Phone & Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                      Phone Number <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="+91 Mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        backgroundColor: '#070c18',
                        border: errors.phone ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#ffffff',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                    {errors.phone && <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>{errors.phone}</div>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                      Email Address <span style={{ color: '#64748b' }}>(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        backgroundColor: '#070c18',
                        border: errors.email ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#ffffff',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                    {errors.email && <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>{errors.email}</div>}
                  </div>
                </div>

                {/* Service dropdown */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Service Interested In
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
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
                    <option value="IT Service Desk">IT Service Desk</option>
                    <option value="Managed IT Services">Managed IT Services</option>
                    <option value="ServiceNow Services">ServiceNow Services</option>
                    <option value="Cloud Services">Cloud Services</option>
                    <option value="Infrastructure Management">Infrastructure Management</option>
                    <option value="Cybersecurity Services">Cybersecurity Services</option>
                    <option value="NOC Services">NOC Services</option>
                    <option value="AI & Automation">AI & Automation</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Requirement Details <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your team size, technology environment, or specific requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      backgroundColor: '#070c18',
                      border: errors.message ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                  {errors.message && <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>{errors.message}</div>}
                </div>

                <button type="submit" className="btn btn-cyan btn-lg" style={{ marginTop: '10px' }}>
                  <Send size={18} />
                  <span>Submit Consultation Request</span>
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '36px 0' }}>
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
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
                  Thank You, {formData.name}!
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px' }}>
                  Your request regarding <strong>{formData.service}</strong> has been logged. Under K²V Technologies' philosophy, <strong>Every Ticket Matters</strong>, and our team will contact you shortly on {formData.phone}.
                </p>

                <button className="btn btn-outline" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
