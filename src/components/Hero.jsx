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
      transition: { duration: 0.5, ease: [0.16, 0.8, 0.24, 1] }
    }
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        paddingTop: 'clamp(90px, 10vw, 120px)',
        paddingBottom: 'clamp(50px, 8vw, 90px)',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #ffffff 0%, var(--light-blue) 130%)'
      }}
    >
      <div className="container">
        <div className="grid-2 hero-grid-layout" style={{ alignItems: 'center', gap: '48px' }}>
          {/* Hero Left Content */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Tagline Eyebrow */}
            <motion.div variants={itemVariants} className="eyebrow" style={{ marginBottom: '16px' }}>
              <Sparkles size={14} color="var(--blue)" />
              <span>IT Service Desk & Managed IT Support Services</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: 'clamp(2.1rem, 4.5vw, 3.6rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: '18px',
                color: 'var(--navy)',
                letterSpacing: '-0.025em'
              }}
            >
              Enterprise IT Support That Keeps Business{' '}
              <span style={{ color: 'var(--blue)' }}>Moving.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.18rem)',
                color: 'var(--ink-60)',
                marginBottom: '28px',
                lineHeight: 1.7,
                maxWidth: '560px'
              }}
            >
              Reliable service desk, managed IT, ServiceNow, cloud, automation, and cybersecurity solutions designed around your business. Smart Solutions. Reliable Support. Real Impact.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '36px' }}
            >
              <button
                className="btn btn-primary btn-lg"
                onClick={onOpenTicketWidget}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span>Talk to an Expert</span>
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
              className="grid-3"
              style={{
                paddingTop: '24px',
                borderTop: '1px solid var(--line)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--electric)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--navy)' }}>24/7 Support Model</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-60)' }}>Round-the-clock</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--electric)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--navy)' }}>Proactive Monitoring</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-60)' }}>Active Telemetry</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--electric)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--navy)' }}>Enterprise Ready</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-60)' }}>Global Operations</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Right Visual Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '380px',
              borderRadius: '20px',
              border: '1px solid var(--line)',
              backgroundColor: '#ffffff',
              boxShadow: 'var(--shadow-md)',
              padding: '12px'
            }}
          >
            <HeroCanvas />

            {/* Floating Live Ticket Stats Card */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--line)',
                borderRadius: '14px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Live Support Engine
                  </span>
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--navy)' }}>
                  Avg. First Response Target: &lt; 15 Mins
                </div>
              </div>

              <button
                className="btn btn-primary btn-sm"
                onClick={onOpenTicketWidget}
                style={{ fontSize: '0.82rem' }}
              >
                Talk to an Expert
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
