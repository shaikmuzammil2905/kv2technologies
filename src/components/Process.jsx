import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Cpu, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function Process({ onOpenTicketWidget }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Discover',
      shortTitle: '01 — Discover',
      icon: MessageSquare,
      summary: 'Understand the business and IT environment.',
      details:
        'Submit your inquiry or raise a ticket via our interactive portal, WhatsApp, or phone line. Our service desk logs your exact requirements with immediate SLA timestamping under our "Every Ticket Matters" commitment.',
      actionText: 'Talk to an Expert'
    },
    {
      num: '02',
      title: 'Assess',
      shortTitle: '02 — Assess',
      icon: Search,
      summary: 'Identify gaps, risks, and improvement opportunities.',
      details:
        'Our L2/L3 specialists conduct a rapid discovery assessment — evaluating existing infrastructure, cloud setup, security policies, and ticket history to map out an exact solution plan.',
      actionText: 'Request Assessment'
    },
    {
      num: '03',
      title: 'Design',
      shortTitle: '03 — Design',
      icon: Cpu,
      summary: 'Build the right support and technology strategy.',
      details:
        'We design structured ITSM workflows, ServiceNow automations, and proactive monitoring pipelines tailored specifically to your organization’s operational needs.',
      actionText: 'Explore Strategy'
    },
    {
      num: '04',
      title: 'Implement & Optimize',
      shortTitle: '04 — Implement & Optimize',
      icon: HeartHandshake,
      summary: 'Deploy solutions with minimal disruption & continuous SLA management.',
      details:
        'We deploy solutions seamlessly, monitor system metrics 24/7, and deliver ongoing optimization to keep your technology running flawlessly.',
      actionText: 'Talk to an Expert'
    }
  ];

  return (
    <section id="process" className="section-padding" style={{ backgroundColor: 'var(--bg-light)', position: 'relative' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">How We Work</div>
          <h2 className="section-title">
            A Structured Path From <span style={{ color: 'var(--blue)' }}>First Call to Ongoing Optimization</span>
          </h2>
          <p className="section-sub">
            How K²V Technologies brings structure, clarity, and speed to everyday IT operations.
          </p>
        </div>

        {/* Step Tabs Nav */}
        <div className="grid-4" style={{ marginBottom: '32px' }}>
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const IconComp = step.icon;

            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                style={{
                  padding: '20px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: isActive ? '2px solid var(--blue)' : '1px solid var(--line)',
                  backgroundColor: isActive ? 'var(--light-blue)' : '#ffffff',
                  color: 'var(--navy)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: isActive ? 'var(--blue)' : 'var(--ink-40)' }}>
                    STEP {step.num}
                  </span>
                  <IconComp size={20} color={isActive ? 'var(--blue)' : 'var(--ink-40)'} />
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)' }}>{step.title}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Display Box */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-md)',
            padding: '36px 32px',
            boxShadow: 'var(--shadow-md)'
          }}
          className="grid-2"
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: '10px' }}>
              Phase {steps[activeStep].num} Overview
            </div>
            <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 800, color: 'var(--navy)', marginBottom: '10px' }}>
              {steps[activeStep].shortTitle}
            </h3>
            <p style={{ color: 'var(--blue)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px' }}>
              {steps[activeStep].summary}
            </p>
            <p style={{ color: 'var(--ink-60)', fontSize: '0.94rem', lineHeight: 1.65, marginBottom: '28px' }}>
              {steps[activeStep].details}
            </p>

            <button className="btn btn-primary" onClick={onOpenTicketWidget}>
              <span>{steps[activeStep].actionText}</span>
            </button>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-light)',
              border: '1px solid var(--line)',
              borderRadius: '16px',
              padding: '28px',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--light-blue)',
                color: 'var(--blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px auto'
              }}
            >
              <CheckCircle2 size={32} />
            </div>

            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--blue)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Service Guarantee
            </div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)', marginTop: '4px', marginBottom: '6px' }}>
              Every Ticket Matters
            </h4>
            <p style={{ color: 'var(--ink-60)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              End-to-end transparency & real-time ticket progress updates from start to finish.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
