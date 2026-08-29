import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Monitor, MessageSquare } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import { fetchSingleRecord, subscribeCmsUpdate } from '../lib/supabaseClient';
import { INITIAL_HERO } from '../lib/seedData';

export default function Hero({ onOpenTicketWidget, onOpenWhatsApp }) {
  const [heroData, setHeroData] = useState(INITIAL_HERO);

  useEffect(() => {
    async function loadHero() {
      const data = await fetchSingleRecord('hero_section', INITIAL_HERO);
      if (data) {
        setHeroData({
          badge: data.badge || INITIAL_HERO.badge,
          title: data.title || INITIAL_HERO.title,
          subtitle: data.subtitle || INITIAL_HERO.subtitle,
          tags: Array.isArray(data.tags) ? data.tags : INITIAL_HERO.tags,
          primaryCtaText: data.primaryCtaText || INITIAL_HERO.primaryCtaText,
          primaryCtaUrl: data.primaryCtaUrl || INITIAL_HERO.primaryCtaUrl,
          secondaryCtaText: data.secondaryCtaText || INITIAL_HERO.secondaryCtaText,
          secondaryCtaUrl: data.secondaryCtaUrl || INITIAL_HERO.secondaryCtaUrl
        });
      }
    }
    loadHero();

    const unsubscribe = subscribeCmsUpdate((tableName) => {
      if (tableName === 'hero_section') {
        loadHero();
      }
    });
    return () => unsubscribe();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 0.8, 0.24, 1] }
    }
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 'clamp(100px, 12vw, 140px)',
        paddingBottom: 'clamp(70px, 10vw, 110px)',
        overflow: 'hidden',
        backgroundColor: '#030b1e',
        color: '#ffffff'
      }}
    >
      {/* Animated Cyber Network Canvas Background */}
      <HeroCanvas />

      {/* Hero Content Container */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '980px',
          margin: '0 auto'
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Top Pill Tag / Eyebrow Badge */}
          <motion.div variants={itemVariants} className="hero-top-badge">
            <Shield size={16} color="#00e5ff" />
            <span>{heroData.badge}</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="hero-main-title">
            {heroData.title}
          </motion.h1>

          {/* Subtitle Quote */}
          <motion.p variants={itemVariants} className="hero-subtitle-quote">
            {heroData.subtitle.includes('Every Ticket Matters') ? (
              <>
                {heroData.subtitle.replace(/Every Ticket Matters\.?/, '').trim()}
                <span style={{ display: 'block', marginTop: '8px', fontWeight: 800, color: '#00e5ff' }}>
                  Every Ticket Matters.
                </span>
              </>
            ) : (
              heroData.subtitle
            )}
          </motion.p>

          {/* Bullet-Separated Concept & Services List */}
          <motion.div variants={itemVariants} className="hero-services-tags">
            {heroData.tags.map((tag, tIdx) => (
              <React.Fragment key={tIdx}>
                <span>{tag}</span>
                {tIdx < heroData.tags.length - 1 && <span className="bullet-dot">•</span>}
              </React.Fragment>
            ))}
          </motion.div>

        </motion.div>
      </div>

      {/* Floating Bottom Right WhatsApp Widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="hero-whatsapp-floating"
      >
        <button
          onClick={onOpenWhatsApp}
          className="whatsapp-pill-btn"
          title="Chat with us on WhatsApp"
        >
          <span className="online-pulse-dot" />
          <span>Chat with Us on WhatsApp</span>
        </button>

        <button
          onClick={onOpenWhatsApp}
          className="whatsapp-icon-btn"
          aria-label="WhatsApp Chat"
        >
          <MessageSquare size={22} color="#ffffff" fill="#ffffff" />
        </button>
      </motion.div>

      {/* Component Styles */}
      <style>{`
        .hero-top-badge {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 8px 20px;
          border-radius: 9999px;
          background: rgba(0, 229, 255, 0.07);
          border: 1.5px solid rgba(0, 229, 255, 0.35);
          box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #00e5ff;
          text-transform: uppercase;
          margin-bottom: 28px;
        }

        .hero-main-title {
          font-size: clamp(2.4rem, 5.5vw, 4.4rem);
          font-weight: 800;
          line-height: 1.14;
          letter-spacing: -0.025em;
          color: #ffffff;
          margin-bottom: 24px;
          max-width: 940px;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
        }

        .hero-subtitle-quote {
          font-size: clamp(1rem, 1.8vw, 1.22rem);
          color: rgba(225, 238, 255, 0.85);
          line-height: 1.65;
          max-width: 780px;
          margin-bottom: 24px;
          font-weight: 400;
          font-style: normal;
        }

        .hero-services-tags {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          font-size: clamp(0.88rem, 1.5vw, 1.05rem);
          font-weight: 700;
          color: #00e5ff;
          margin-bottom: 38px;
          letter-spacing: -0.01em;
        }

        .hero-services-tags .bullet-dot {
          color: #00e5ff;
          font-size: 1.2rem;
          line-height: 1;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 32px;
          border-radius: 9999px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 0.8, 0.24, 1);
          text-decoration: none;
          white-space: nowrap;
        }

        .hero-btn-primary {
          background: linear-gradient(135deg, #1877f2 0%, #0052cc 100%);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 30px rgba(24, 119, 242, 0.45);
        }

        .hero-btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 14px 40px rgba(24, 119, 242, 0.65);
          background: linear-gradient(135deg, #2482ff 0%, #0062f5 100%);
        }

        .hero-btn-secondary {
          background: rgba(15, 28, 56, 0.65);
          color: #ffffff;
          border: 1.5px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        }

        .hero-btn-secondary:hover {
          transform: translateY(-3px) scale(1.02);
          border-color: #00e5ff;
          color: #00e5ff;
          background: rgba(20, 40, 80, 0.85);
          box-shadow: 0 8px 30px rgba(0, 229, 255, 0.25);
        }

        /* WhatsApp Floating Bottom-Right Controls */
        .hero-whatsapp-floating {
          position: absolute;
          bottom: 28px;
          right: 28px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .whatsapp-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 9999px;
          background: rgba(10, 24, 46, 0.82);
          border: 1.5px solid rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #ffffff;
          font-family: var(--font-heading);
          font-size: 0.86rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .whatsapp-pill-btn:hover {
          border-color: #25D366;
          color: #25D366;
          transform: translateY(-2px);
        }

        .online-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #25D366;
          box-shadow: 0 0 10px #25D366;
          animation: pulseGreen 2s infinite;
        }

        @keyframes pulseGreen {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }

        .whatsapp-icon-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #25D366;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45);
          transition: all 0.25s ease;
        }

        .whatsapp-icon-btn:hover {
          transform: scale(1.08) rotate(5deg);
          box-shadow: 0 10px 28px rgba(37, 211, 102, 0.65);
        }

        /* Mobile Viewport Optimizations */
        @media (max-width: 768px) {
          #home {
            min-height: 100vh;
            padding-top: 110px;
            padding-bottom: 90px;
          }

          .hero-top-badge {
            font-size: 0.74rem;
            padding: 6px 14px;
            margin-bottom: 20px;
          }

          .hero-main-title {
            font-size: 2.1rem;
            line-height: 1.2;
            margin-bottom: 18px;
          }

          .hero-subtitle-quote {
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 20px;
            padding: 0 6px;
          }

          .hero-services-tags {
            gap: 6px;
            font-size: 0.84rem;
            margin-bottom: 28px;
          }

          .hero-cta-group {
            flex-direction: column;
            width: 100%;
            max-width: 320px;
            gap: 12px;
          }

          .hero-btn {
            width: 100%;
            padding: 13px 22px;
            font-size: 0.95rem;
          }

          .hero-whatsapp-floating {
            bottom: 16px;
            right: 16px;
          }

          .whatsapp-pill-btn span:nth-child(2) {
            display: none;
          }

          .whatsapp-pill-btn {
            padding: 8px 12px;
          }
        }
      `}</style>
    </section>
  );
}
