import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Activity, Factory, ShoppingCart, Cpu, GraduationCap, CheckCircle } from 'lucide-react';

export default function Industries() {
  const industries = [
    { title: 'Financial Services', icon: Landmark, desc: 'Uptime-critical environments with strict SLA requirements.' },
    { title: 'Healthcare', icon: Activity, desc: 'Reliable IT infrastructure supporting clinical care teams.' },
    { title: 'Manufacturing', icon: Factory, desc: 'OT and distributed multi-site network telemetry.' },
    { title: 'Retail & E-commerce', icon: ShoppingCart, desc: 'High-transaction POS and multi-location IT support.' },
    { title: 'Technology & SaaS', icon: Cpu, desc: 'Fast-moving, developer-driven remote organizations.' },
    { title: 'Education', icon: GraduationCap, desc: 'Institutions supporting staff, students, and digital learning.' }
  ];

  const techEcosystem = [
    { category: 'Cloud Infrastructure', tags: ['AWS', 'Microsoft Azure', 'Microsoft 365'] },
    { category: 'Enterprise ITSM', tags: ['ServiceNow Platform', 'CMDB', 'Service Catalog'] },
    { category: 'OS & Virtualization', tags: ['Windows Server', 'Linux', 'VMware vSphere', 'Nutanix'] },
    { category: 'Automation & AI', tags: ['PowerShell', 'Python', 'REST APIs', 'OpenAI / NLP'] },
    { category: 'Containers & DevOps', tags: ['Docker', 'Kubernetes', 'GitOps'] },
    { category: 'Cybersecurity & EDR', tags: ['CrowdStrike', 'Defender', 'Okta MFA', 'Azure AD'] }
  ];

  return (
    <section style={{ padding: '100px 0', backgroundColor: '#090e1c', position: 'relative' }}>
      <div className="container">
        {/* Industries Head */}
        <div className="section-head">
          <div className="eyebrow">Target Sectors</div>
          <h2 className="section-title">
            Solutions Designed For <span className="gradient-blue-cyan">Organizations Like Yours.</span>
          </h2>
          <p className="section-sub">
            Tailored remote IT management designed for compliance-driven, high-uptime industries.
          </p>
        </div>

        {/* Industries Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            marginBottom: '80px'
          }}
          className="grid-3"
        >
          {industries.map((ind, idx) => {
            const IconComp = ind.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-panel"
                style={{ padding: '28px 24px', display: 'flex', gap: '16px' }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(0, 240, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00f0ff',
                    flexShrink: 0
                  }}
                >
                  <IconComp size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                    {ind.title}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{ind.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Ecosystem */}
        <div className="section-head" style={{ marginBottom: '40px' }}>
          <div className="eyebrow">Technology Stack</div>
          <h2 className="section-title">Built On Enterprise Platforms</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px'
          }}
          className="grid-3"
        >
          {techEcosystem.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '24px'
              }}
            >
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
                {item.category}
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {item.tags.map((t, tidx) => (
                  <span
                    key={tidx}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      backgroundColor: '#070c18',
                      border: '1px solid rgba(0, 140, 255, 0.2)',
                      color: '#38bdf8',
                      fontSize: '0.82rem',
                      fontWeight: 600
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
