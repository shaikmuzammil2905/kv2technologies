import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

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
    <section id="why-us" className="section-padding" style={{ position: 'relative' }}>
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

        <div className="grid-4">
          {reasons.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-panel"
              style={{
                padding: '24px 20px',
                position: 'relative'
              }}
            >
              <div
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  color: '#00f0ff',
                  fontFamily: 'Manrope, sans-serif',
                  marginBottom: '12px'
                }}
              >
                {item.num}
              </div>

              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '10px'
                }}
              >
                {item.title}
              </h3>

              <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.55' }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
