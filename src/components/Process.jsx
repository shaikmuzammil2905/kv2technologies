import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  FileSearch,
  Layout,
  RotateCw,
  MessageSquare,
  Search,
  Settings,
  Target,
  ShieldCheck,
  Gauge,
  TrendingUp,
  ChevronRight,
  Sparkles,
  Sliders,
  CheckCircle,
  Zap,
  Cpu
} from 'lucide-react';
import { fetchTableData } from '../lib/supabaseClient';
import { INITIAL_PROCESS_STEPS } from '../lib/seedData';

const iconMap = {
  Compass: Compass,
  FileSearch: FileSearch,
  Layout: Layout,
  RotateCw: RotateCw,
  MessageSquare: MessageSquare,
  Search: Search,
  Settings: Settings,
  Sliders: Sliders,
  CheckCircle: CheckCircle,
  Zap: Zap,
  Cpu: Cpu
};

const defaultIcons = [Compass, FileSearch, Layout, RotateCw];

export default function Process() {
  const [steps, setSteps] = useState(INITIAL_PROCESS_STEPS);

  useEffect(() => {
    async function loadProcess() {
      const data = await fetchTableData('process_steps', INITIAL_PROCESS_STEPS);
      const activeData = data.filter(s => s.is_active !== false);
      if (activeData.length > 0) {
        setSteps(activeData);
      }
    }
    loadProcess();
  }, []);

  const features = [
    {
      icon: Target,
      title: 'Structured Process',
      desc: 'Every step is defined and measurable.'
    },
    {
      icon: ShieldCheck,
      title: 'Reliable Outcomes',
      desc: 'Built on proven practices and enterprise standards.'
    },
    {
      icon: Gauge,
      title: 'Operational Speed',
      desc: 'Faster resolution. Better experience.'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Improvement',
      desc: 'Optimization is ongoing, not one-time.'
    }
  ];

  return (
    <section id="process" className="section-padding" style={{ backgroundColor: '#f8fafc', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-head" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <Sparkles size={14} color="#0757d9" />
            <span>HOW WE WORK</span>
            <Sparkles size={14} color="#0757d9" />
          </div>
          <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginTop: '8px' }}>
            A Structured Approach From <br className="hidden-mobile" />
            First Call to <span style={{ color: '#0757d9' }}>Continuous Optimization</span>
          </h2>
          <p className="section-sub" style={{ fontSize: '1.05rem', color: '#64748b', marginTop: '12px' }}>
            How K²V Technologies brings structure, clarity, and speed to everyday IT operations.
          </p>
        </div>

        {/* 4 Process Cards Grid */}
        <div className="process-grid-wrapper" style={{ position: 'relative', marginBottom: '40px' }}>
          <div className="grid-4" style={{ gap: '20px', position: 'relative', zIndex: 2 }}>
            {steps.map((step, idx) => {
              const IconComp = (typeof step.icon === 'function' || typeof step.icon === 'object')
                ? step.icon
                : (iconMap[step.icon] || defaultIcons[idx % defaultIcons.length]);

              return (
                <div key={idx} style={{ position: 'relative' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '20px',
                      padding: '36px 24px 28px',
                      textAlign: 'center',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative'
                    }}
                  >
                    {/* Top Number Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '-18px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#0757d9',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(7, 87, 217, 0.3)'
                      }}
                    >
                      {step.num}
                    </div>

                    {/* Icon Circle */}
                    <div
                      style={{
                        width: '68px',
                        height: '68px',
                        borderRadius: '50%',
                        backgroundColor: '#eff6ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0757d9',
                        marginTop: '8px',
                        marginBottom: '20px'
                      }}
                    >
                      <IconComp size={30} strokeWidth={1.75} />
                    </div>

                    {/* Step Title */}
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                      {step.title}
                    </h3>

                    {/* Blue Accent Line */}
                    <div
                      style={{
                        width: '28px',
                        height: '3px',
                        backgroundColor: '#0757d9',
                        borderRadius: '2px',
                        marginBottom: '16px'
                      }}
                    />

                    {/* Description */}
                    <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                      {step.desc}
                    </p>
                  </motion.div>

                  {/* Arrow Indicator between cards (for desktop) */}
                  {idx < steps.length - 1 && (
                    <div className="process-arrow-connector">
                      <div className="arrow-badge">
                        <ChevronRight size={14} color="#ffffff" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom 4 Feature Pillars Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            padding: '28px 32px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
          }}
        >
          <div className="grid-4" style={{ gap: '24px', alignItems: 'center' }}>
            {features.map((feat, fIdx) => {
              const FeatIcon = feat.icon;

              return (
                <div
                  key={fIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    paddingRight: fIdx < features.length - 1 ? '12px' : 0,
                    borderRight: fIdx < features.length - 1 ? '1px solid #f1f5f9' : 'none'
                  }}
                  className="feature-pillar-item"
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: '#eff6ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0757d9',
                      flexShrink: 0
                    }}
                  >
                    <FeatIcon size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a', marginBottom: '2px' }}>
                      {feat.title}
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.45, margin: 0 }}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <style>{`
        .process-arrow-connector {
          position: absolute;
          top: 50%;
          right: -16px;
          transform: translateY(-50%);
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .arrow-badge {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background-color: #0757d9;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(7, 87, 217, 0.3);
        }

        @media (max-width: 991px) {
          .process-arrow-connector {
            display: none;
          }
          .feature-pillar-item {
            border-right: none !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
