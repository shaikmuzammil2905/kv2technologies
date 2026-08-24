import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function CountUp({ end, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  const stats = [
    { label: 'First Response Target', value: 15, prefix: '< ', suffix: ' Mins', desc: 'Rapid SLA ticket response' },
    { label: 'Uptime & Availability', value: 99.9, isFloat: true, suffix: '%', desc: 'Target network stability' },
    { label: 'Ticket Visibility', value: 100, suffix: '%', desc: 'Every ticket tracked & owned' },
    { label: 'Remote Operations', value: 24, suffix: '/7', desc: 'Global support coverage' }
  ];

  return (
    <section
      style={{
        padding: '64px 0',
        backgroundColor: '#070c18',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px'
          }}
          className="grid-4"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(0, 140, 255, 0.2)',
                borderRadius: '16px',
                padding: '28px 20px',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(2.2rem, 3.5vw, 3rem)',
                  fontWeight: 800,
                  color: '#00f0ff',
                  fontFamily: 'Manrope, sans-serif',
                  marginBottom: '6px'
                }}
              >
                {stat.prefix}
                {stat.isFloat ? (
                  '99.9'
                ) : (
                  <CountUp end={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
