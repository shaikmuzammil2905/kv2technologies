import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Activity, Factory, ShoppingCart, Cpu, GraduationCap } from 'lucide-react';

export default function Industries() {
  const industries = [
    { title: 'Financial Services', icon: Landmark, desc: 'Solutions designed for regulated, uptime-critical environments.' },
    { title: 'Healthcare', icon: Activity, desc: 'Solutions designed for reliability where systems support patient care.' },
    { title: 'Manufacturing', icon: Factory, desc: 'Solutions designed for distributed sites and operational technology.' },
    { title: 'Retail', icon: ShoppingCart, desc: 'Solutions designed for multi-location, high-transaction IT environments.' },
    { title: 'Technology', icon: Cpu, desc: 'Solutions designed for fast-moving, engineering-driven organizations.' },
    { title: 'Education', icon: GraduationCap, desc: 'Solutions designed for institutions supporting staff, students and campuses.' }
  ];

  const techEcosystem = [
    { category: 'Cloud Infrastructure', tags: ['AWS', 'Microsoft Azure', 'Microsoft 365'] },
    { category: 'Enterprise ITSM', tags: ['ServiceNow Platform', 'CMDB', 'Service Catalog'] },
    { category: 'OS & Virtualization', tags: ['Windows Server', 'Linux', 'VMware', 'Nutanix'] },
    { category: 'Automation & AI', tags: ['PowerShell', 'Python', 'REST APIs', 'OpenAI / NLP'] },
    { category: 'Containers & DevOps', tags: ['Docker', 'Kubernetes', 'GitOps'] },
    { category: 'Cybersecurity & EDR', tags: ['Endpoint', 'Identity', 'Monitoring', 'Azure AD'] }
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-light)', position: 'relative' }}>
      <div className="container">
        {/* Industries Head */}
        <div className="section-head">
          <div className="eyebrow">Industries</div>
          <h2 className="section-title">
            Solutions Designed For <span style={{ color: 'var(--blue)' }}>Organizations Like Yours</span>
          </h2>
          <p className="section-sub">
            Tailored remote IT management designed for high-uptime, compliance-driven industries.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid-3" style={{ marginBottom: '64px' }}>
          {industries.map((ind, idx) => {
            const IconComp = ind.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                style={{
                  padding: '30px 24px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(150deg, var(--navy), #0b2b5c)',
                  color: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '170px',
                  boxShadow: 'var(--shadow-md)',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', top: '24px', right: '24px', opacity: 0.35 }}>
                  <IconComp size={28} color="#ffffff" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                    {ind.title}
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    {ind.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Ecosystem */}
        <div className="section-head" style={{ marginBottom: '32px' }}>
          <div className="eyebrow">Technology Ecosystem</div>
          <h2 className="section-title">Built On the Platforms Enterprise IT Runs On</h2>
        </div>

        <div className="grid-3">
          {techEcosystem.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-md)',
                padding: '26px 22px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 800, color: 'var(--blue)', marginBottom: '14px' }}>
                {item.category}
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {item.tags.map((t, tidx) => (
                  <span
                    key={tidx}
                    style={{
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      padding: '7px 12px',
                      borderRadius: '7px',
                      backgroundColor: 'var(--light-blue)',
                      color: 'var(--navy)'
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
