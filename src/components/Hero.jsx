import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Ticket, ShieldCheck, Clock, Globe, Sparkles } from 'lucide-react';
import HeroCanvas from './HeroCanvas';

export default function Hero({ onOpenTicketWidget, onOpenWhatsApp }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        paddingTop: 'clamp(95px, 12vw, 130px)',
        paddingBottom: 'clamp(40px, 8vw, 75px)',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 102, 255, 0.15) 0%, rgba(7, 12, 24, 1) 70%)'
      }}
    >
      <div className="container">
        <div className="grid-2 hero-grid-layout" style={{ alignItems: 'center' }}>
          {/* Hero Left Content */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Tagline Badge */}
            <motion.div variants={itemVariants} className="eyebrow">
              <Sparkles size={14} color="#00f0ff" />
              <span>Launching Sept 2026 • Remote by Design</span>
            </motion.div>

            {/* Philosophy Accent */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'inline-block',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#00f0ff',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '10px'
              }}
            >
              Philosophy: Every Ticket Matters
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: 'clamp(1.95rem, 4.5vw, 3.5rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: '16px',
                color: '#ffffff'
              }}
            >
              Enterprise IT Support That Keeps Business{' '}
              <span className="gradient-blue-cyan">Moving.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                color: '#94a3b8',
                marginBottom: '24px',
                lineHeight: 1.6,
                maxWidth: '600px'
              }}
            >
              K²V Technologies delivers 24/7 IT Service Desk, Managed IT Support, ServiceNow workflows, Cloud, and Cybersecurity solutions. Built around one core promise: <strong style={{ color: '#ffffff' }}>Every Ticket Matters.</strong>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}
            >
              <button
                className="btn btn-primary btn-lg"
                onClick={onOpenTicketWidget}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Ticket size={18} />
                <span>Raise a Request</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="#services"
                className="btn btn-outline btn-lg"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span>Explore Services</span>
              </a>
            </motion.div>

            {/* Key Value Badges */}
            <motion.div
              variants={itemVariants}
              className="grid-3"
              style={{
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="#00f0ff" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>24/7 Support</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Round-the-clock</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="#00f0ff" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>Proactive NOC</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Active Telemetry</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={18} color="#00f0ff" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>Remote First</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Global Operations</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Right Visual Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '340px',
              borderRadius: '20px',
              border: '1px solid rgba(0, 140, 255, 0.25)',
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 102, 255, 0.15)',
              padding: '10px'
            }}
          >
            <HeroCanvas />

            {/* Floating Live Ticket Stats Card */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                background: 'rgba(13, 21, 39, 0.92)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                borderRadius: '14px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8' }}>
                    LIVE SUPPORT ENGINE
                  </span>
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                  Avg. Response Target: &lt; 15 Mins
                </div>
              </div>

              <button
                className="btn btn-cyan btn-sm"
                onClick={onOpenTicketWidget}
                style={{ fontSize: '0.78rem' }}
              >
                Test Ticket Flow
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
