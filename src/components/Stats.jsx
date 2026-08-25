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
        padding: '56px 0',
        backgroundColor: 'var(--white)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)'
      }}
    >
      <div className="container">
        <div className="grid-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              style={{
                backgroundColor: 'var(--bg-light)',
                border: '1px solid var(--line)',
                borderRadius: '14px',
                padding: '24px 20px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
                  fontWeight: 800,
                  color: 'var(--blue)',
                  fontFamily: "'Manrope', sans-serif",
                  marginBottom: '4px'
                }}
              >
                {stat.prefix}
                {stat.isFloat ? (
                  '99.9%'
                ) : (
                  <CountUp end={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <div style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '2px' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--ink-60)' }}>
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
