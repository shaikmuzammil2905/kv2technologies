import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 12;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <div style={{ position: 'relative', textAlign: 'center' }}>
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '16px' }}
        >
          <img
            src="/assets/logo-icon.png"
            alt="K²V Technologies"
            onError={(e) => { e.target.src = '/logo.png'; }}
            style={{
              maxHeight: '48px',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
          <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '1.6rem', color: 'var(--navy)' }}>
            K²V Technologies
          </span>
        </motion.div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: 'var(--blue)',
            textTransform: 'uppercase',
            marginBottom: '24px'
          }}
        >
          Smart Solutions • Reliable Support • Real Impact
        </motion.div>

        {/* Progress Bar Container */}
        <div
          style={{
            width: '240px',
            height: '4px',
            backgroundColor: 'var(--light-blue)',
            borderRadius: '4px',
            overflow: 'hidden',
            margin: '0 auto 12px auto'
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--blue) 0%, var(--electric) 100%)',
              width: `${progress}%`
            }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        <div style={{ color: 'var(--ink-60)', fontSize: '0.82rem', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
          Loading Operations {progress}%
        </div>
      </div>
    </motion.div>
  );
}
