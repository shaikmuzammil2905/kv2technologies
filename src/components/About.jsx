import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Zap, Globe2 } from 'lucide-react';
import Founders from './Founders';

export default function About() {
  return (
    <section id="about" className="section-padding" style={{ position: 'relative', background: 'var(--white)' }}>
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center', gap: '48px' }}>
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="eyebrow">About K²V Technologies</div>

            <h2 className="section-title">
              Technology problems shouldn't slow your business down.
            </h2>

            <p className="section-sub" style={{ marginBottom: '18px' }}>
              K²V Technologies helps organizations reduce downtime, resolve issues faster, and bring structure to everyday IT operations — from the service desk to the data center to the cloud.
            </p>

            <p style={{ color: 'var(--ink-60)', fontSize: '0.96rem', lineHeight: '1.7', marginBottom: '28px' }}>
              In today's fast-moving enterprise landscape, IT support must be proactive, responsive, and reliable. Whether managing multi-site cloud environments, structuring ServiceNow workflows, or providing 24/7 Service Desk assistance, our team delivers with speed and precision.
            </p>

            {/* Philosophy Box */}
            <div
              style={{
                background: 'var(--light-blue)',
                border: '1px solid rgba(7, 87, 217, 0.2)',
                borderRadius: '16px',
                padding: '24px',
                position: 'relative'
              }}
            >
              <div
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  color: 'var(--blue)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '6px'
                }}
              >
                Our Core Philosophy
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
                Every Ticket Matters.
              </h3>
              <p style={{ color: 'var(--ink-60)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                Every request deserves immediate attention. Every problem deserves a permanent solution. No issue is too small, no infrastructure too complex. Every ticket matters to your business—and to ours.
              </p>
            </div>
          </motion.div>

          {/* Right Pillar Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
          >
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '18px', background: 'var(--bg-light)' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '11px',
                  background: 'linear-gradient(135deg, var(--blue), var(--electric))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  flexShrink: 0
                }}
              >
                <Globe2 size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '4px' }}>
                  24/7 Global Support
                </h3>
                <p style={{ color: 'var(--ink-60)', fontSize: '0.9rem' }}>
                  Round-the-clock availability for critical issues across timezones, remote endpoints, NOC telemetry, and multi-site environments.
                </p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '18px', background: 'var(--bg-light)' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '11px',
                  background: 'linear-gradient(135deg, var(--blue), var(--electric))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  flexShrink: 0
                }}
              >
                <Zap size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '4px' }}>
                  Proactive Monitoring
                </h3>
                <p style={{ color: 'var(--ink-60)', fontSize: '0.9rem' }}>
                  Systems watched continuously so problems are caught and resolved before they ever disrupt business operations.
                </p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '18px', background: 'var(--bg-light)' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '11px',
                  background: 'linear-gradient(135deg, var(--blue), var(--electric))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  flexShrink: 0
                }}
              >
                <HeartHandshake size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '4px' }}>
                  Enterprise-Ready Solutions
                </h3>
                <p style={{ color: 'var(--ink-60)', fontSize: '0.9rem' }}>
                  Structured processes, strict SLA management, and IT automation built to scale seamlessly with growing IT environments.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Founders & Leadership Showcase */}
        <Founders />
      </div>
    </section>
  );
}
