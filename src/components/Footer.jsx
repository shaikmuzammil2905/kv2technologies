import React from 'react';
import { Phone, MessageSquare, Globe, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenWhatsApp, onOpenPhone }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const phoneNumbers = ['+91 97416 76105', '+91 93421 74058', '+91 95000 00449'];

  return (
    <footer
      style={{
        backgroundColor: '#050811',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '70px',
        paddingBottom: '40px',
        color: '#94a3b8'
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr',
            gap: '40px',
            marginBottom: '60px'
          }}
          className="grid-4"
        >
          {/* Brand Info */}
          <div>
            <a href="#home" style={{ display: 'inline-block', marginBottom: '16px' }}>
              <img src="/logo.png" alt="K²V Technologies Logo" style={{ height: '48px', objectFit: 'contain' }} />
            </a>

            <div style={{ color: '#00f0ff', fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px' }}>
              Every Ticket Matters
            </div>

            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
              Smart Solutions. Reliable Support. Real Impact. A remote-first technology company delivering enterprise IT Service Desk, ServiceNow, Cloud, and Managed Operations.
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-outline btn-sm" onClick={onOpenWhatsApp} title="Chat on WhatsApp">
                <MessageSquare size={14} color="#25D366" />
                <span>WhatsApp</span>
              </button>
              <button className="btn btn-outline btn-sm" onClick={onOpenPhone} title="Call Support">
                <Phone size={14} color="#38bdf8" />
                <span>Call Us</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '18px' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><a href="#home" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a></li>
              <li><a href="#about" style={{ color: '#94a3b8', textDecoration: 'none' }}>About Us</a></li>
              <li><a href="#services" style={{ color: '#94a3b8', textDecoration: 'none' }}>IT Services</a></li>
              <li><a href="#why-us" style={{ color: '#94a3b8', textDecoration: 'none' }}>Why K²V</a></li>
              <li><a href="#process" style={{ color: '#94a3b8', textDecoration: 'none' }}>Our Process</a></li>
              <li><a href="#work" style={{ color: '#94a3b8', textDecoration: 'none' }}>Work & Case Studies</a></li>
              <li><a href="#faq" style={{ color: '#94a3b8', textDecoration: 'none' }}>FAQs</a></li>
              <li><a href="#contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contact Us</a></li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '18px' }}>
              Capabilities
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><a href="#services" style={{ color: '#94a3b8', textDecoration: 'none' }}>IT Service Desk</a></li>
              <li><a href="#services" style={{ color: '#94a3b8', textDecoration: 'none' }}>Managed IT Services</a></li>
              <li><a href="#services" style={{ color: '#94a3b8', textDecoration: 'none' }}>ServiceNow Services</a></li>
              <li><a href="#services" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cloud & AWS / Azure</a></li>
              <li><a href="#services" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cybersecurity Services</a></li>
              <li><a href="#services" style={{ color: '#94a3b8', textDecoration: 'none' }}>24/7 NOC Telemetry</a></li>
              <li><a href="#services" style={{ color: '#94a3b8', textDecoration: 'none' }}>AI & IT Automation</a></li>
            </ul>
          </div>

          {/* Contact Lines */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '18px' }}>
              Direct Business Lines
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', marginBottom: '16px' }}>
              {phoneNumbers.map((num, idx) => (
                <a
                  key={idx}
                  href={`tel:${num.replace(/\s/g, '')}`}
                  style={{
                    color: '#ffffff',
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Phone size={14} color="#00f0ff" />
                  <span>{num}</span>
                </a>
              ))}
            </div>

            <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>
              <Globe size={14} color="#00f0ff" style={{ display: 'inline', marginRight: '4px' }} />
              Remote-First Company • Launching September 2026
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.85rem'
          }}
        >
          <div>
            © 2026 K²V Technologies. All rights reserved. • Philosophy: <strong>Every Ticket Matters</strong>
          </div>

          <button
            onClick={scrollToTop}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
