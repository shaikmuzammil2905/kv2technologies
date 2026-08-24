import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Ticket, ShieldCheck, Clock, Globe, Sparkles, CheckCircle2 } from 'lucide-react';
import HeroCanvas from './HeroCanvas';

export default function Hero({ onOpenTicketWidget, onOpenWhatsApp }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        paddingTop: '140px',
        paddingBottom: '90px',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 102, 255, 0.15) 0%, rgba(7, 12, 24, 1) 70%)'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '48px',
            alignItems: 'center'
          }}
          className="hero-grid-responsive"
        >
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
                fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                fontWeight: 700,
                color: '#00f0ff',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}
            >
              Philosophy: Every Ticket Matters
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '20px',
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
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                color: '#94a3b8',
                marginBottom: '32px',
                lineHeight: 1.65,
                maxWidth: '620px'
              }}
            >
              K²V Technologies delivers 24/7 IT Service Desk, Managed IT Support, ServiceNow workflows, Cloud, and Cybersecurity solutions. Built around one core promise: <strong style={{ color: '#ffffff' }}>Every Ticket Matters.</strong>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}
            >
              <button
                className="btn btn-primary btn-lg"
                onClick={onOpenTicketWidget}
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <Ticket size={20} />
                <span>Raise a Request</span>
                <ArrowRight size={18} />
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
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}
              className="hero-badges-responsive"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={20} color="#00f0ff" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>24/7 Support</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Round-the-clock</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={20} color="#00f0ff" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Proactive NOC</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Active Telemetry</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Globe size={20} color="#00f0ff" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Remote First</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Global Operations</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Right Visual Canvas & Floating Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '440px',
              borderRadius: '24px',
              border: '1px solid rgba(0, 140, 255, 0.25)',
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 102, 255, 0.15)',
              padding: '12px'
            }}
          >
            <HeroCanvas />

            {/* Floating Live Ticket Stats Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                background: 'rgba(13, 21, 39, 0.9)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
              }}
              className="hero-floating-card"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>
                    LIVE SUPPORT ENGINE
                  </span>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                  Avg. Response Target: &lt; 15 Mins
                </div>
              </div>

              <button
                className="btn btn-cyan btn-sm"
                onClick={onOpenTicketWidget}
                style={{ fontSize: '0.8rem' }}
              >
                Test Ticket Flow
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .hero-grid-responsive {
            grid-template-columns: 1fr !important;
          }
          .hero-badges-responsive {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .hero-floating-card {
            position: relative !important;
            bottom: auto !important;
            left: auto !important;
            right: auto !important;
            margin-top: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
