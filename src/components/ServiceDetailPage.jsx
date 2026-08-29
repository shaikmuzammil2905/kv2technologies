import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Layers,
  Sparkles,
  MessageSquare,
  Ticket,
  ChevronRight,
  Phone
} from 'lucide-react';
import { fetchTableData, subscribeCmsUpdate } from '../lib/supabaseClient';
import { SERVICES_DATA } from '../data/servicesData';
import Navbar from './Navbar';
import Footer from './Footer';
import TicketWidget from './TicketWidget';
import WhatsAppModal from './WhatsAppModal';
import PhoneModal from './PhoneModal';

const iconMap = {
  Headphones,
  MonitorCheck,
  Workflow,
  Cloud,
  Server,
  ShieldCheck,
  Radio,
  Cpu
};

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modals
  const [ticketWidgetOpen, setTicketWidgetOpen] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [whatsAppCustomText, setWhatsAppCustomText] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    async function loadService() {
      const data = await fetchTableData('services', SERVICES_DATA);
      const found = (Array.isArray(data) ? data : SERVICES_DATA).find(
        s => String(s.id).toLowerCase() === String(id).toLowerCase() ||
             String(s.num) === String(id)
      ) || SERVICES_DATA.find(s => String(s.id).toLowerCase() === String(id).toLowerCase()) || SERVICES_DATA[0];

      setService(found);
      setLoading(false);
    }
    loadService();

    const unsubscribe = subscribeCmsUpdate((tableName) => {
      if (tableName === 'services') {
        loadService();
      }
    });
    return () => unsubscribe();
  }, [id]);

  if (loading || !service) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#030b1e', color: '#00e5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif" }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sparkles className="spin-icon" size={24} />
          <span style={{ fontWeight: 700 }}>Loading Service Details...</span>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[service.icon] || Headphones;

  // Extract arrays safely
  const keyBenefits = Array.isArray(service.benefits) ? service.benefits :
                      Array.isArray(service.businessBenefits) ? service.businessBenefits : [
                        "24/7 Omni-channel support access (Web, Phone, Email & WhatsApp)",
                        "Tiered escalation matrices (L1, L2, L3) with strict SLA commitments",
                        "Proactive monitoring to detect and isolate issues before downtime",
                        "Comprehensive performance reports & transparent SLA metrics"
                      ];

  const keyDeliverables = Array.isArray(service.deliverables) ? service.deliverables :
                         Array.isArray(service.keyFeatures) ? service.keyFeatures : [
                           "User Onboarding & Offboarding Ticket Workflows",
                           "Hardware, OS & Software Diagnostics & Troubleshooting",
                           "Remote Management & Security Patch Compliance",
                           "Dedicated Incident Escalation & Response Logs"
                         ];

  const processWorkflow = Array.isArray(service.process) ? service.process : [
    "Initial Request Ingestion & Automatic SLA Triage",
    "First Contact Resolution & Remote Diagnostics",
    "Tiered Escalation to Senior L2/L3 Engineers",
    "User Verification, Resolution & Knowledge Update"
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header Navigation */}
      <Navbar
        onOpenTicketWidget={() => setTicketWidgetOpen(true)}
        onOpenWhatsApp={() => {
          setWhatsAppCustomText(`Inquiry regarding ${service.title}`);
          setWhatsAppModalOpen(true);
        }}
        onOpenPhone={() => setPhoneModalOpen(true)}
      />

      {/* Service Detail Hero Banner */}
      <section
        style={{
          position: 'relative',
          paddingTop: 'clamp(110px, 12vw, 150px)',
          paddingBottom: 'clamp(60px, 8vw, 90px)',
          backgroundColor: '#030b1e',
          color: '#ffffff',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1040px' }}>
          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#94a3b8', marginBottom: '28px' }}
          >
            <Link to="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <ChevronRight size={14} color="#64748b" />
            <Link to="/#services" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }}>IT Services</Link>
            <ChevronRight size={14} color="#64748b" />
            <span style={{ color: '#ffffff', fontWeight: 700 }}>{service.title}</span>
          </motion.div>

          {/* Hero Header Grid */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ flex: '1 1 540px' }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(0, 229, 255, 0.1)',
                  border: '1.5px solid rgba(0, 229, 255, 0.35)',
                  color: '#00e5ff',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '20px'
                }}
              >
                <span>SERVICE CAPABILITY {service.num || '01'}</span>
                {service.category && <span>• {service.category}</span>}
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  marginBottom: '20px'
                }}
              >
                {service.title}
              </h1>

              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                  color: 'rgba(225, 238, 255, 0.88)',
                  lineHeight: 1.6,
                  marginBottom: '32px'
                }}
              >
                {service.shortDesc || service.overview}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <button
                  onClick={() => setTicketWidgetOpen(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 28px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #1877f2 0%, #0052cc 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(24, 119, 242, 0.45)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <Ticket size={18} />
                  <span>Request This Service</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => {
                    setWhatsAppCustomText(`Hello K2V Technologies! I would like to inquire about ${service.title}.`);
                    setWhatsAppModalOpen(true);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 24px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1.5px solid rgba(255, 255, 255, 0.22)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer'
                  }}
                >
                  <MessageSquare size={18} color="#25D366" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </motion.div>

            {/* Service Icon Badge Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '24px',
                backgroundColor: 'rgba(7, 87, 217, 0.2)',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00e5ff',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                margin: '0 auto'
              }}
            >
              <IconComponent size={64} color="#00e5ff" />
              <span style={{ marginTop: '12px', fontSize: '0.85rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>
                CODE {service.num || '01'}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          {/* Back Button */}
          <div style={{ marginBottom: '40px' }}>
            <button
              onClick={() => navigate('/#services')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-light)',
                border: '1px solid var(--line)',
                color: 'var(--navy)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={18} />
              <span>Back to All IT Services</span>
            </button>
          </div>

          {/* Overview Statement */}
          <div style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '16px' }}>
              Service Overview &amp; Capability Statement
            </h2>
            <p style={{ color: 'var(--ink-60)', fontSize: '1.08rem', lineHeight: 1.75, maxWidth: '920px' }}>
              {service.fullDesc || service.overview || `${service.title} is an essential component of K²V Technologies' enterprise IT operations suite. Under our "Every Ticket Matters" philosophy, we ensure continuous availability, high SLA compliance, rapid issue escalation, and complete operational transparency across your organization.`}
            </p>
          </div>

          {/* Two Column Grid: Key Benefits & Deliverables */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '64px' }} className="grid-2">
            {/* Key Benefits */}
            <div
              style={{
                backgroundColor: 'var(--bg-light)',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                padding: '32px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--light-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)' }}>
                  <ShieldCheck size={22} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                  Key Business Benefits
                </h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {keyBenefits.map((benefit, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.96rem', color: 'var(--ink-60)', lineHeight: 1.5 }}>
                    <CheckCircle size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Deliverables */}
            <div
              style={{
                backgroundColor: 'var(--bg-light)',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                padding: '32px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--light-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)' }}>
                  <Layers size={22} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                  Core Deliverables &amp; Features
                </h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {keyDeliverables.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.96rem', color: 'var(--ink-60)', lineHeight: 1.5 }}>
                    <CheckCircle size={18} color="var(--blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Workflow Steps */}
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '24px' }}>
              Service Execution &amp; Workflow Steps
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="grid-4">
              {processWorkflow.map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--bg-light)',
                    border: '1px solid var(--line)',
                    borderRadius: '14px',
                    padding: '24px',
                    position: 'relative'
                  }}
                >
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--blue)', marginBottom: '8px', letterSpacing: '0.05em' }}>
                    STEP 0{idx + 1}
                  </div>
                  <h4 style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--navy)', margin: 0, lineHeight: 1.4 }}>
                    {step}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Contact / Request Service Card CTA */}
          <div
            style={{
              backgroundColor: '#030b1e',
              borderRadius: '24px',
              padding: '48px 40px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px',
              boxShadow: '0 20px 40px rgba(3, 11, 30, 0.25)'
            }}
          >
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#00e5ff', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                READY TO ELEVATE YOUR IT OPERATIONS?
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Get Started with {service.title}
              </h3>
              <p style={{ color: 'rgba(225, 238, 255, 0.8)', fontSize: '0.98rem', marginTop: '6px', margin: 0 }}>
                Our 24/7 Service Desk team is ready to evaluate your requirements and start onboarding.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setTicketWidgetOpen(true)}
                style={{
                  padding: '14px 28px',
                  borderRadius: '9999px',
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Ticket size={18} />
                <span>Talk to an IT Expert</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        onOpenWhatsApp={() => {
          setWhatsAppCustomText('');
          setWhatsAppModalOpen(true);
        }}
        onOpenPhone={() => setPhoneModalOpen(true)}
      />

      {/* Modals */}
      <TicketWidget
        isOpen={ticketWidgetOpen}
        onClose={() => setTicketWidgetOpen(false)}
        onSelectWhatsApp={(text) => {
          setTicketWidgetOpen(false);
          setWhatsAppCustomText(text);
          setWhatsAppModalOpen(true);
        }}
      />

      <WhatsAppModal
        isOpen={whatsAppModalOpen}
        onClose={() => setWhatsAppModalOpen(false)}
        customMessage={whatsAppCustomText}
      />

      <PhoneModal
        isOpen={phoneModalOpen}
        onClose={() => setPhoneModalOpen(false)}
      />
    </div>
  );
}
