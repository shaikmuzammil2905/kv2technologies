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
    <section id="contact" style={{ padding: '96px 0', backgroundColor: 'var(--white)', position: 'relative' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">
            <Sparkles size={14} color="var(--blue)" />
            <span>Get In Touch</span>
          </div>
          <h2 className="section-title">
            Let's Make IT <span style={{ color: 'var(--blue)' }}>Simpler</span>
          </h2>
          <p className="section-sub">
            Tell us about your IT environment and let's explore how K²V Technologies can help.
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
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '24px' }}>
              Direct Contact Channels
            </h3>

            {/* Phone numbers list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              {phoneNumbers.map((num, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--bg-light)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--light-blue)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--blue)'
                      }}
                    >
                      <Phone size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--ink-40)', textTransform: 'uppercase', fontWeight: 700 }}>
                        Business Phone Line {idx + 1}
                      </div>
                      <a
                        href={`tel:${num.raw}`}
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: 800,
                          color: 'var(--navy)',
                          textDecoration: 'none',
                          fontFamily: "'Manrope', sans-serif"
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
                backgroundColor: 'rgba(37, 211, 102, 0.08)',
                border: '1px solid rgba(37, 211, 102, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '4px' }}>
                  Need Instant WhatsApp Support?
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--ink-60)' }}>
                  Chat directly with our on-duty desk engineer.
                </div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={onOpenWhatsApp} style={{ backgroundColor: '#25D366', color: '#ffffff', border: 'none', flexShrink: 0 }}>
                <MessageSquare size={16} />
                <span>WhatsApp</span>
              </button>
            </div>

            {/* Remote Location Card */}
            <div
              style={{
                padding: '26px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                backgroundColor: 'var(--bg-light)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <Globe2 size={26} color="var(--blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '4px' }}>
                  Remote-First IT Services Company
                </h4>
                <p style={{ color: 'var(--ink-60)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Serving organizations through technology worldwide with multi-timezone coverage and enterprise operations management.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-md)',
              padding: '36px',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '4px' }}>
                  Send a Message / Request Support
                </h3>

                {/* Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                    Your Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '13px 14px',
                      borderRadius: '9px',
                      backgroundColor: 'var(--bg-light)',
                      border: errors.name ? '1.5px solid #ef4444' : '1.5px solid var(--line)',
                      color: 'var(--navy)',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                  {errors.name && <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>{errors.name}</div>}
                </div>

                {/* Phone & Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                      Phone Number <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="+91 Mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '13px 14px',
                        borderRadius: '9px',
                        backgroundColor: 'var(--bg-light)',
                        border: errors.phone ? '1.5px solid #ef4444' : '1.5px solid var(--line)',
                        color: 'var(--navy)',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                    {errors.phone && <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>{errors.phone}</div>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                      Email Address <span style={{ color: 'var(--ink-40)' }}>(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '13px 14px',
                        borderRadius: '9px',
                        backgroundColor: 'var(--bg-light)',
                        border: errors.email ? '1.5px solid #ef4444' : '1.5px solid var(--line)',
                        color: 'var(--navy)',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                    {errors.email && <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>{errors.email}</div>}
                  </div>
                </div>

                {/* Service dropdown */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                    Service Interested In
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '13px 14px',
                      borderRadius: '9px',
                      backgroundColor: 'var(--bg-light)',
                      border: '1.5px solid var(--line)',
                      color: 'var(--navy)',
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
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                    Requirement Details <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your IT environment, team size, or specific support requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '13px 14px',
                      borderRadius: '9px',
                      backgroundColor: 'var(--bg-light)',
                      border: errors.message ? '1.5px solid #ef4444' : '1.5px solid var(--line)',
                      color: 'var(--navy)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                  {errors.message && <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>{errors.message}</div>}
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '10px' }}>
                  <Send size={18} />
                  <span>Submit Request</span>
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '36px 0' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--light-blue)',
                    color: 'var(--blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '10px' }}>
                  Thank You, {formData.name}!
                </h3>
                <p style={{ color: 'var(--ink-60)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  Your request regarding <strong>{formData.service}</strong> has been received. Our support engineers will contact you shortly at {formData.phone}.
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
