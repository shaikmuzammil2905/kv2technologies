import React, { useState, useEffect } from 'react';
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
import { fetchTableData } from '../lib/supabaseClient';

export default function Services({ onOpenTicketWidget }) {
  const [selectedService, setSelectedService] = useState(null);
  const [servicesList, setServicesList] = useState(SERVICES_DATA);

  useEffect(() => {
    async function loadServices() {
      const data = await fetchTableData('services', SERVICES_DATA);
      const activeData = data.filter(s => s.is_active !== false);
      if (activeData.length > 0) {
        setServicesList(activeData);
      }
    }
    loadServices();
  }, []);

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
    <section id="services" className="section-padding" style={{ position: 'relative', background: 'var(--bg-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-head">
          <div className="eyebrow">
            <Sparkles size={14} color="var(--blue)" />
            <span>OUR IT SERVICES</span>
          </div>
          <h2 className="section-title">
            IT Services Built Around <span style={{ color: 'var(--blue)' }}>Your Business</span>
          </h2>
          <p className="section-sub">
            Eight core IT capabilities working together to deliver reliable, scalable, and efficient IT operations.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid-4">
          {servicesList.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Headphones;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={{ y: -5 }}
                className="glass-panel"
                style={{
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  background: '#ffffff',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-md)'
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
                        width: '46px',
                        height: '46px',
                        borderRadius: '11px',
                        backgroundColor: 'var(--light-blue)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--blue)'
                      }}
                    >
                      <IconComponent size={22} />
                    </div>

                    <span
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: 'var(--ink-40)',
                        fontFamily: "'Manrope', sans-serif"
                      }}
                    >
                      {service.num}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: 'var(--navy)',
                      marginBottom: '10px'
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      color: 'var(--ink-60)',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      marginBottom: '20px'
                    }}
                  >
                    {service.shortDesc}
                  </p>
                </div>

                {/* Bottom Card Action */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--blue)',
                    fontSize: '0.88rem',
                    fontWeight: 700
                  }}
                >
                  <span>Learn more</span>
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
