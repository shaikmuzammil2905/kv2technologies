import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Headphones, Eye, Activity, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      num: '01',
      title: 'Every Ticket Matters',
      desc: 'No request gets lost in a queue. We track every incident from initial triage to complete root-cause resolution.'
    },
    {
      num: '02',
      title: 'Remote-First Agility',
      desc: 'Built for speed without physical borders. Multi-region support engineers ready to assist remote teams instantly.'
    },
    {
      num: '03',
      title: 'Proactive NOC Telemetry',
      desc: 'We watch server metrics, network links, and cloud services continuously so errors are fixed before users notice.'
    },
    {
      num: '04',
      title: 'Automation-Driven SLA',
      desc: 'Intelligent ServiceNow workflows and PowerShell scripts eliminate repetitive delays and ensure rapid turnarounds.'
    }
  ];

  return (
    <section id="why-us" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">
            <Sparkles size={14} color="#00f0ff" />
            <span>Why K²V Technologies</span>
          </div>
          <h2 className="section-title">
            More Than IT Support. <span className="gradient-blue-cyan">A Technology Partner.</span>
          </h2>
          <p className="section-sub">
            Built on accountability, enterprise tooling, and an unyielding commitment to customer success.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px'
          }}
          className="grid-4"
        >
          {reasons.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel"
              style={{
                padding: '32px 24px',
                position: 'relative'
              }}
            >
              <div
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  color: '#00f0ff',
                  fontFamily: 'Manrope, sans-serif',
                  marginBottom: '16px'
                }}
              >
                {item.num}
              </div>

              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '12px'
                }}
              >
                {item.title}
              </h3>

              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
