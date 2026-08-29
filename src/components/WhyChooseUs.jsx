import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { fetchTableData } from '../lib/supabaseClient';
import { INITIAL_WHY_US } from '../lib/seedData';

export default function WhyChooseUs() {
  const [reasons, setReasons] = useState(INITIAL_WHY_US);

  useEffect(() => {
    async function loadWhyUs() {
      const data = await fetchTableData('why_us', INITIAL_WHY_US);
      const activeData = data.filter(w => w.is_active !== false);
      if (activeData.length > 0) {
        setReasons(activeData);
      }
    }
    loadWhyUs();
  }, []);

  return (
    <section id="why-us" className="section-padding" style={{ position: 'relative', background: 'var(--white)' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">
            <Sparkles size={14} color="var(--blue)" />
            <span>WHY K²V</span>
            <Sparkles size={14} color="var(--blue)" />
          </div>
          <h2 className="section-title">
            More Than IT Support. <span style={{ color: 'var(--blue)' }}>A Technology Partner.</span>
          </h2>
          <p className="section-sub">
            Built on accountability, enabled by enterprise-grade technology, and driven by an unwavering commitment to operational excellence
          </p>
        </div>

        <div className="grid-4" style={{ gap: '20px' }}>
          {reasons.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-md)',
                padding: '32px 24px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s ease'
              }}
            >
              <div
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  color: 'var(--electric)',
                  fontFamily: "'Manrope', sans-serif",
                  letterSpacing: '0.06em',
                  marginBottom: '14px'
                }}
              >
                {item.num}
              </div>

              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: 'var(--navy)',
                  marginBottom: '10px'
                }}
              >
                {item.title}
              </h3>

              <p style={{ color: 'var(--ink-60)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
