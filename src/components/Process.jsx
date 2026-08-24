import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Cpu, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function Process({ onOpenTicketWidget }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Tell Us',
      shortTitle: '01 — Tell Us',
      icon: MessageSquare,
      summary: 'Customer explains requirement or technology problem.',
      details:
        'Submit your inquiry or raise a ticket via our interactive portal, WhatsApp, or phone line. Our remote desk logs your exact requirements with immediate SLA timestamping under our "Every Ticket Matters" commitment.',
      actionText: 'Raise a Ticket Now'
    },
    {
      num: '02',
      title: 'Understand',
      shortTitle: '02 — Understand',
      icon: Search,
      summary: 'K²V Technologies analyzes the requirement.',
      details:
        'Our Tier 2/3 specialists conduct a rapid discovery assessment—evaluating existing system architecture, security policies, and incident history to map out an exact solution plan.',
      actionText: 'See Discovery Plan'
    },
    {
      num: '03',
      title: 'Solve',
      shortTitle: '03 — Solve',
      icon: Cpu,
      summary: 'The targeted technology/service solution is provided.',
      details:
        'We execute the remediation plan—whether deploying automated ServiceNow workflows, hardening cloud servers, establishing EDR security agents, or resolving user desktop issues.',
      actionText: 'Explore Service Options'
    },
    {
      num: '04',
      title: 'Support',
      shortTitle: '04 — Support',
      icon: HeartHandshake,
      summary: 'Continuous 24/7 support & proactive SLA optimization.',
      details:
        'We don’t stop at resolution. Our 24/7 NOC monitoring ensures system stability, delivers monthly performance reports, and proactively optimizes IT operations.',
      actionText: 'Talk to an Expert'
    }
  ];

  return (
    <section id="process" className="section-padding" style={{ backgroundColor: '#090e1c', position: 'relative' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Interactive Workflow</div>
          <h2 className="section-title">
            A Structured Path From <span className="gradient-blue-cyan">First Ticket to Resolution.</span>
          </h2>
          <p className="section-sub">
            How K²V Technologies handles your IT requirements with clarity and speed.
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
                  padding: '16px 14px',
                  borderRadius: '14px',
                  border: isActive ? '2px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: isActive ? 'rgba(0, 102, 255, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                  color: '#ffffff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: isActive ? '#00f0ff' : '#64748b' }}>
                    STEP {step.num}
                  </span>
                  <IconComp size={18} color={isActive ? '#00f0ff' : '#64748b'} />
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 700 }}>{step.title}</div>
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
          className="glass-panel grid-2"
          style={{
            padding: '32px 24px',
            alignItems: 'center'
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: '10px' }}>
              Phase {steps[activeStep].num} Overview
            </div>
            <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
              {steps[activeStep].shortTitle}
            </h3>
            <p style={{ color: '#00f0ff', fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>
              {steps[activeStep].summary}
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
              {steps[activeStep].details}
            </p>

            <button className="btn btn-cyan" onClick={onOpenTicketWidget}>
              <span>{steps[activeStep].actionText}</span>
            </button>
          </div>

          <div
            style={{
              backgroundColor: '#070c18',
              border: '1px solid rgba(0, 140, 255, 0.25)',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 240, 255, 0.12)',
                color: '#00f0ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px auto'
              }}
            >
              <CheckCircle2 size={32} />
            </div>

            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Service Commitment
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginTop: '4px', marginBottom: '6px' }}>
              Every Ticket Matters
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.82rem' }}>
              Complete end-to-end transparency & real-time ticket progress updates.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
