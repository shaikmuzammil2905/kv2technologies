import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Briefcase, ChevronDown, ChevronUp, Cpu, Server, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';

const foundersData = [
  {
    id: 'vinay',
    name: 'Gitigi Vinay',
    title: 'Founder & CEO',
    subtitle: 'Service Desk & Cloud',
    experience: '8+ Years IT Experience',
    photo: '/assets/vinay.png',
    philosophy: 'Head of IT Service Management (ITSM)',
    highlights: [
      '8+ Years of IT Experience',
      'Service Desk',
      'IT Support',
      'Managed IT Services',
      'Cloud Services',
      'ITSM',
      'Cloud Support',
      'IT Operations'
    ],
    paragraphs: [
      'Gitigi Vinay, Founder and CEO of K²V Technologies, brings 8+ years of professional IT experience specializing in IT Service Desk, Managed IT Services, IT Support, Cloud Services, ITSM, and IT Operations. With extensive experience supporting users, managing incidents and service requests, resolving technical issues, handling escalations, and maintaining service quality, Vinay understands what businesses need from a reliable technology partner.',
      'At K²V Technologies, Vinay focuses on delivering professional Service Desk and Cloud solutions that help businesses improve IT operations, strengthen service delivery, reduce downtime, and support business growth. His expertise covers Service Desk Management, Remote IT Support, ITSM, Incident Management, Request Management, SLA Management, Cloud Support, Cloud Operations, IT Infrastructure, and Managed IT Services.',
      'As Founder and CEO, Vinay leads K²V Technologies with a service-first philosophy built around reliability, accountability, responsiveness, and customer satisfaction. His principle, “Every Ticket Matters,” reflects the company’s commitment to giving every IT issue the attention, ownership, communication, and resolution it deserves.',
      'Vinay’s vision is to build K²V Technologies into a trusted global Service Desk and Cloud Services provider, helping organizations modernize IT operations, optimize support, adopt cloud technologies, and create reliable, scalable, and cost-effective technology environments.'
    ],
    skills: [
      'Service Desk Management',
      'Remote IT Support',
      'ITSM',
      'Incident Management',
      'Request Management',
      'SLA Management',
      'Cloud Support',
      'Cloud Operations',
      'IT Infrastructure',
      'Managed IT Services'
    ]
  },
  {
    id: 'kingston',
    name: 'Kingston',
    title: 'Co-Founder & CIO | IT Infrastructure, Desktop & Network Engineering',
    subtitle: 'Desktop Support & Network Infrastructure',
    experience: '10+ Years IT Experience',
    photo: '/assets/kingston.png',
    philosophy: 'Responsive, Reliable & Scalable Network Operations',
    highlights: [
      '10+ Years of Experience',
      'Desktop Support',
      'Network Engineering',
      'IT Infrastructure',
      'Network Troubleshooting',
      'IT Operations'
    ],
    paragraphs: [
      'Kingston, Co-Founder and Desktop & Network Engineer at K²V Technologies, brings 10+ years of professional IT experience specializing in Desktop Support, Network Engineering, IT Infrastructure, Network Troubleshooting, Technical Support, System Administration, and IT Operations.',
      'He helps businesses maintain reliable IT environments by resolving desktop and network issues, optimizing connectivity, supporting users, and ensuring stable day-to-day technology operations. His expertise includes Windows Desktop Support, Hardware & Software Troubleshooting, LAN/WAN, TCP/IP, DNS, DHCP, VPN, Network Monitoring, Network Security, Endpoint Support, IT Infrastructure, and Technical Operations.',
      'At K²V Technologies, Kingston focuses on delivering responsive, reliable, and scalable Desktop Support and Networking solutions that improve productivity and keep businesses connected.'
    ],
    skills: [
      'Windows Desktop Support',
      'Hardware & Software Troubleshooting',
      'LAN / WAN Architecture',
      'TCP/IP & DNS/DHCP',
      'VPN & Network Security',
      'Network Telemetry & Monitoring',
      'Endpoint Support',
      'IT Infrastructure & Ops'
    ]
  },
  {
    id: 'kevin',
    name: 'Kevin Frank',
    title: 'Co-Founder & CTO',
    subtitle: 'ServiceNow & IT Automation',
    experience: '7 Years IT Experience',
    photo: '/assets/kevin.png',
    philosophy: 'Transforming IT Operations Through Automation & Intelligent Technology',
    highlights: [
      '7 Years of IT Experience',
      'ServiceNow',
      'ITSM',
      'IT Automation',
      'Workflow Automation',
      'Service Desk Automation',
      'IT Operations'
    ],
    paragraphs: [
      'Kevin Frank is the Co-Founder and CTO of K²V Technologies, with 7 years of professional IT experience specializing in ServiceNow, ITSM, IT Automation, Workflow Automation, Service Desk Automation, and IT Operations.',
      'He helps businesses streamline IT service management, automate repetitive workflows, optimize ticketing processes, and improve operational efficiency through scalable technology solutions.',
      'Kevin’s expertise spans ServiceNow implementation and support, Incident Management, Request Management, Problem Management, Change Management, Service Catalog, Knowledge Management, workflow automation, process optimization, and IT Service Desk transformation.',
      'As CTO, he leads K²V Technologies’ technical strategy, delivering reliable, automated, and scalable ServiceNow and IT automation solutions that help organizations reduce manual work, improve service delivery, and modernize IT operations.'
    ],
    skills: [
      'ServiceNow Implementation',
      'ITSM & Workflows',
      'IT & Service Desk Automation',
      'Incident & Problem Mgmt',
      'Change Management',
      'Service Catalog Optimization',
      'Knowledge Management',
      'Process Transformation'
    ]
  }
];

export default function Founders() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div style={{ marginTop: '72px', paddingTop: '64px', borderTop: '1px solid var(--line)' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
        <div className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={15} color="var(--blue)" />
          <span>Executive Leadership &amp; Founders</span>
        </div>
        <h2 className="section-title" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.75rem)', marginTop: '8px' }}>
          Meet the Minds Behind <span style={{ color: 'var(--blue)' }}>K²V Technologies</span>
        </h2>
        <p className="section-sub" style={{ fontSize: '1.02rem', margin: '14px auto 0' }}>
          Our leadership combines decades of enterprise IT experience across Service Desk, Cloud Operations, Network Engineering, and ServiceNow Automation.
        </p>
      </div>

      {/* Founders Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}
      >
        {foundersData.map((founder, index) => {
          const isExpanded = expandedId === founder.id;

          return (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="founder-card"
            >
              {/* Card Header & Avatar */}
              <div className="founder-card-inner">
                {/* Profile Image & Badges Frame */}
                <div className="founder-photo-wrapper">
                  <div className="founder-photo-glow" />
                  <img
                    src={founder.photo}
                    alt={founder.name}
                    className="founder-photo"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="founder-exp-badge">
                    <Award size={13} color="#00e5ff" />
                    <span>{founder.experience}</span>
                  </div>
                </div>

                {/* Founder Info */}
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <h3 className="founder-name">{founder.name}</h3>
                  <div className="founder-title-pill">
                    <span>{founder.title}</span>
                  </div>

                  {founder.philosophy && (
                    <div className="founder-quote-banner">
                      <p>{founder.philosophy}</p>
                    </div>
                  )}

                  {/* Highlights Bar */}
                  <div className="founder-highlights-wrap">
                    {founder.highlights.map((hl, i) => (
                      <span key={i} className="founder-hl-tag">
                        {hl}
                      </span>
                    ))}
                  </div>

                  {/* Paragraph Content Preview / Expanded */}
                  <div className="founder-bio-body">
                    <p className="founder-lead-para">
                      {founder.paragraphs[0]}
                    </p>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35 }}
                        >
                          {founder.paragraphs.slice(1).map((p, pIdx) => (
                            <p key={pIdx} style={{ marginTop: '12px' }}>
                              {p}
                            </p>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Read More / Read Less Toggle Button */}
                  <button
                    onClick={() => toggleExpand(founder.id)}
                    className="founder-expand-btn"
                  >
                    <span>{isExpanded ? 'Show Less Details' : 'Read Full Leadership Bio'}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {/* Skills Grid */}
                  <div className="founder-skills-section">
                    <div className="founder-skills-title">
                      <Briefcase size={14} color="var(--blue)" />
                      <span>Key Expertise &amp; Technical Capabilities</span>
                    </div>
                    <div className="founder-skills-list">
                      {founder.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="founder-skill-chip">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Styled JSX for Founders component */}
      <style>{`
        .founder-card {
          background: #ffffff;
          border: 1px solid rgba(7, 87, 217, 0.15);
          border-radius: 24px;
          padding: 28px 24px;
          box-shadow: 0 10px 30px rgba(7, 87, 217, 0.05);
          transition: all 0.35s cubic-bezier(0.16, 0.8, 0.24, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .founder-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(7, 87, 217, 0.12);
          border-color: rgba(7, 87, 217, 0.35);
        }

        .founder-card-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
        }

        .founder-photo-wrapper {
          position: relative;
          width: 170px;
          height: 170px;
          margin: 0 auto;
        }

        .founder-photo-glow {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0757d9 0%, #00e5ff 100%);
          opacity: 0.85;
          filter: blur(8px);
          z-index: 1;
        }

        .founder-photo {
          position: relative;
          z-index: 2;
          width: 170px;
          height: 170px;
          border-radius: 50%;
          object-fit: cover;
          object-position: center 15%;
          border: 4px solid #ffffff;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .founder-exp-badge {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 9999px;
          background: #030b1e;
          color: #ffffff;
          font-family: var(--font-heading);
          font-size: 0.76rem;
          font-weight: 800;
          white-space: nowrap;
          border: 1px solid rgba(0, 229, 255, 0.4);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
        }

        .founder-name {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--navy);
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }

        .founder-title-pill {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--blue);
          background: var(--light-blue);
          padding: 6px 14px;
          border-radius: 9999px;
          margin-bottom: 14px;
          line-height: 1.35;
        }

        .founder-quote-banner {
          background: linear-gradient(135deg, rgba(7, 87, 217, 0.05) 0%, rgba(0, 229, 255, 0.08) 100%);
          border-left: 3px solid var(--blue);
          border-radius: 0 12px 12px 0;
          padding: 10px 14px;
          margin-bottom: 16px;
          text-align: left;
        }

        .founder-quote-banner p {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--navy);
          font-style: italic;
          margin: 0;
        }

        .founder-highlights-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 6px;
          margin-bottom: 18px;
        }

        .founder-hl-tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: #0757d9;
          background: rgba(7, 87, 217, 0.08);
          border: 1px solid rgba(7, 87, 217, 0.18);
          padding: 4px 10px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .founder-bio-body {
          text-align: left;
          color: var(--ink-60);
          font-size: 0.92rem;
          line-height: 1.65;
          margin-bottom: 16px;
        }

        .founder-lead-para {
          margin: 0;
        }

        .founder-expand-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1.5px solid var(--blue);
          color: var(--blue);
          padding: 8px 18px;
          border-radius: 9999px;
          font-family: var(--font-heading);
          font-size: 0.84rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          margin-bottom: 20px;
        }

        .founder-expand-btn:hover {
          background: var(--blue);
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(7, 87, 217, 0.25);
        }

        .founder-skills-section {
          width: 100%;
          border-top: 1px dashed rgba(7, 87, 217, 0.18);
          padding-top: 16px;
          margin-top: auto;
          text-align: left;
        }

        .founder-skills-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--navy);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 10px;
        }

        .founder-skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .founder-skill-chip {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--ink-80);
          background: var(--bg-light);
          border: 1px solid var(--line);
          padding: 4px 10px;
          border-radius: 6px;
        }

        @media (max-width: 768px) {
          .founder-card {
            padding: 24px 18px;
            border-radius: 20px;
          }

          .founder-photo-wrapper, .founder-photo {
            width: 140px;
            height: 140px;
          }

          .founder-name {
            font-size: 1.3rem;
          }

          .founder-title-pill {
            font-size: 0.8rem;
            padding: 5px 12px;
          }

          .founder-bio-body {
            font-size: 0.88rem;
          }
        }
      `}</style>
    </div>
  );
}
