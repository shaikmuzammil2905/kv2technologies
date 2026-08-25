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
        backgroundColor: 'var(--bg-dark)',
        borderTop: '1px solid var(--line-dark)',
        paddingTop: '64px',
        paddingBottom: '32px',
        color: 'rgba(255, 255, 255, 0.72)'
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div className="footer-grid" style={{ marginBottom: '48px' }}>
          {/* Brand Info */}
          <div>
            <a href="#home" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }}>
              <img
                src="/assets/logo-icon.png"
                alt="K²V Technologies Logo"
                onError={(e) => { e.target.src = '/logo.png'; }}
                style={{ height: '34px', width: 'auto', objectFit: 'contain' }}
              />
              <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, color: '#ffffff', fontSize: '1.2rem' }}>
                K²V Technologies
              </span>
            </a>

            <div style={{ color: 'var(--electric)', fontSize: '0.86rem', fontWeight: 800, marginBottom: '8px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Smart Solutions. Reliable Support. Real Impact.
            </div>

            <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.55)', lineHeight: 1.6, marginBottom: '20px' }}>
              IT Service Desk & Managed IT Support Services company helping businesses maintain reliable, secure and efficient IT operations.
            </p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button className="btn btn-ghost-light btn-sm" onClick={onOpenWhatsApp} title="Chat on WhatsApp">
                <MessageSquare size={14} color="#25D366" />
                <span>WhatsApp</span>
              </button>
              <button className="btn btn-ghost-light btn-sm" onClick={onOpenPhone} title="Call Support">
                <Phone size={14} color="var(--electric)" />
                <span>Call Us</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.84rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '18px' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><a href="#home" style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}>Home</a></li>
              <li><a href="#about" style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}>About Us</a></li>
              <li><a href="#services" style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}>IT Services</a></li>
              <li><a href="#why-us" style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}>Why K²V</a></li>
              <li><a href="#process" style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}>Our Process</a></li>
              <li><a href="#work" style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}>Case Studies</a></li>
              <li><a href="#faq" style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}>FAQs</a></li>
              <li><a href="#contact" style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}>Contact Us</a></li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.84rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '18px' }}>
              Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><a href="#services" style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}>IT Service Desk</a></li>
              <li><a href="#services" style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}>Managed IT Services</a></li>
              <li><a href="#services" style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}>ServiceNow Services</a></li>
              <li><a href="#services" style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}>Cloud & Infrastructure</a></li>
              <li><a href="#services" style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}>Cybersecurity Services</a></li>
              <li><a href="#services" style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}>24/7 NOC Telemetry</a></li>
            </ul>
          </div>

          {/* Contact Lines */}
          <div>
            <h4 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.84rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '18px' }}>
              Direct Lines
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', marginBottom: '16px' }}>
              {phoneNumbers.map((num, idx) => (
                <a
                  key={idx}
                  href={`tel:${num.replace(/\s/g, '')}`}
                  style={{
                    color: '#ffffff',
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Phone size={14} color="var(--electric)" />
                  <span>{num}</span>
                </a>
              ))}
            </div>

            <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.45)', lineHeight: 1.5 }}>
              <Globe size={14} color="var(--electric)" style={{ display: 'inline', marginRight: '4px' }} />
              Remote-First Operations Worldwide
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--line-dark)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.84rem',
            color: 'rgba(255, 255, 255, 0.45)'
          }}
        >
          <div>
            © 2026 K²V Technologies. All rights reserved. • Philosophy: <strong>Every Ticket Matters</strong>
          </div>

          <button
            onClick={scrollToTop}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--line-dark)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
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
