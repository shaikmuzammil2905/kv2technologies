import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Zap, Globe2, Sparkles } from 'lucide-react';
import Founders from './Founders';
import { fetchSingleRecord } from '../lib/supabaseClient';
import { INITIAL_ABOUT } from '../lib/seedData';

export default function About() {
  const [aboutData, setAboutData] = useState(INITIAL_ABOUT);

  useEffect(() => {
    async function loadAbout() {
      const data = await fetchSingleRecord('about_section', INITIAL_ABOUT);
      if (data) {
        setAboutData({
          eyebrow: data.eyebrow || INITIAL_ABOUT.eyebrow,
          heading: data.heading || INITIAL_ABOUT.heading,
          description: data.description || INITIAL_ABOUT.description,
          subText: data.subText || INITIAL_ABOUT.subText,
          philosophyTitle: data.philosophyTitle || INITIAL_ABOUT.philosophyTitle,
          philosophyText: data.philosophyText || INITIAL_ABOUT.philosophyText
        });
      }
    }
    loadAbout();
  }, []);

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
            <div className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={14} color="var(--blue)" />
              <span>{aboutData.eyebrow}</span>
              <Sparkles size={14} color="var(--blue)" />
            </div>

            <h2 className="section-title">
              {aboutData.heading}
            </h2>

            <p className="section-sub" style={{ marginBottom: '18px' }}>
              {aboutData.description}
            </p>

            <p style={{ color: 'var(--ink-60)', fontSize: '0.96rem', lineHeight: '1.7', marginBottom: '28px' }}>
              {aboutData.subText}
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
                {aboutData.philosophyTitle}
              </h3>
              <p style={{ color: 'var(--ink-60)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                {aboutData.philosophyText}
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
