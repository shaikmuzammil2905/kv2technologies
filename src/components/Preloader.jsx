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
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 10;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#070c18',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <div style={{ position: 'relative', textAlign: 'center' }}>
        {/* Glow behind logo */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.25) 0%, rgba(0, 102, 255, 0) 70%)',
            filter: 'blur(20px)',
            pointerEvents: 'none'
          }}
        />

        {/* Logo */}
        <motion.img
          src="/logo.png"
          alt="K²V Technologies"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            maxHeight: '90px',
            objectFit: 'contain',
            marginBottom: '20px',
            position: 'relative'
          }}
        />

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: '#38bdf8',
            textTransform: 'uppercase',
            marginBottom: '24px'
          }}
        >
          Every Ticket Matters
        </motion.div>

        {/* Progress Bar Container */}
        <div
          style={{
            width: '240px',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            overflow: 'hidden',
            margin: '0 auto 12px auto'
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #0066ff 0%, #00f0ff 100%)',
              width: `${progress}%`
            }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        <div style={{ color: '#64748b', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
          Launching Remote Operations {progress}%
        </div>
      </div>
    </motion.div>
  );
}
