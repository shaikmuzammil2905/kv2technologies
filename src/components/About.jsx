import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, HeartHandshake, Zap, Target, Globe2 } from 'lucide-react';

export default function About() {
  return (
    <section id="about" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center'
          }}
          className="grid-2"
        >
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow">About K²V Technologies</div>

            <h2 className="section-title">
              Remote by Design.{' '}
              <span className="gradient-blue-cyan">Connected by Technology.</span>
            </h2>

            <p className="section-sub" style={{ marginBottom: '20px' }}>
              Launching in <strong>September 2026</strong>, K²V Technologies is a modern, fully remote IT Service Desk and Managed IT Support company. We engineered our company without physical office boundaries so we can deliver agile, global IT operations for organizations wherever they operate.
            </p>

            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.7', marginBottom: '32px' }}>
              In today's fast-moving digital landscape, IT issues should never hold your workforce back. Whether managing complex cloud migrations, structuring ServiceNow ITSM workflows, or providing 24/7 Service Desk assistance, our team operates with precision and purpose.
            </p>

            {/* Philosophy Box */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.1) 0%, rgba(0, 240, 255, 0.05) 100%)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                borderRadius: '16px',
                padding: '24px',
                position: 'relative'
              }}
            >
              <div
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#00f0ff',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}
              >
                Our Core Philosophy
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
                Every Ticket Matters.
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Every request deserves immediate attention. Every problem deserves an optimal solution. No issue is too small, no infrastructure too complex. Every ticket matters to your business—and to ours.
              </p>
            </div>
          </motion.div>

          {/* Right Pillar Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}
          >
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '20px' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(0, 102, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0066ff',
                  flexShrink: 0
                }}
              >
                <Globe2 size={26} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>
                  Fully Remote Company
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  No legacy physical constraints. Continuous remote desktop, NOC telemetry, and multi-timezone support accessibility worldwide.
                </p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '20px' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(0, 240, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00f0ff',
                  flexShrink: 0
                }}
              >
                <Zap size={26} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>
                  Automation-First Mindset
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  We leverage intelligent scripting and ServiceNow automation to resolve routine requests fast and focus technician time on complex challenges.
                </p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '20px' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(34, 197, 94, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#22c55e',
                  flexShrink: 0
                }}
              >
                <HeartHandshake size={26} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>
                  Uncompromising Support Quality
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  Clear communication, strict SLA management, and genuine human support for every single user ticket.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
