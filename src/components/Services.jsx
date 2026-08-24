import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Headphones,
  MonitorCheck,
  Workflow,
  Cloud,
  Server,
  ShieldCheck,
  Radio,
  Cpu,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import ServiceModal from './ServiceModal';

export default function Services({ onOpenTicketWidget }) {
  const [selectedService, setSelectedService] = useState(null);

  const iconMap = {
    Headphones: Headphones,
    MonitorCheck: MonitorCheck,
    Workflow: Workflow,
    Cloud: Cloud,
    Server: Server,
    ShieldCheck: ShieldCheck,
    Radio: Radio,
    Cpu: Cpu
  };

  return (
    <section id="services" style={{ padding: '100px 0', position: 'relative', background: '#090e1c' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-head">
          <div className="eyebrow">
            <Sparkles size={14} color="#00f0ff" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="section-title">
            IT Services Built Around <span className="gradient-blue-cyan">Your Business.</span>
          </h2>
          <p className="section-sub">
            Eight core IT capabilities designed to function as one dependable, high-performance IT operation.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px'
          }}
          className="grid-4"
        >
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Headphones;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="glass-panel"
                style={{
                  padding: '30px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
                onClick={() => setSelectedService(service)}
              >
                {/* Top Row: Icon & Number Indicator */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '20px'
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '14px',
                        backgroundColor: 'rgba(0, 102, 255, 0.12)',
                        border: '1px solid rgba(0, 240, 255, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#00f0ff'
                      }}
                    >
                      <IconComponent size={26} />
                    </div>

                    <span
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: '#64748b',
                        fontFamily: 'monospace'
                      }}
                    >
                      {service.num}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '10px'
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      color: '#94a3b8',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      marginBottom: '24px'
                    }}
                  >
                    {service.shortDesc}
                  </p>
                </div>

                {/* Bottom Card Action */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#00f0ff',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  <span>Learn More</span>
                  <ArrowRight size={16} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal Popup */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onRequestService={(svc) => {
            onOpenTicketWidget();
          }}
        />
      )}
    </section>
  );
}
