import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FolderGit2,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Layers,
  Sparkles,
  Ticket,
  ChevronRight,
  MessageSquare,
  Building2,
  TrendingUp,
  Clock
} from 'lucide-react';
import { fetchTableData, subscribeCmsUpdate } from '../lib/supabaseClient';
import { PROJECTS_DATA } from '../data/projectsData';
import Navbar from './Navbar';
import Footer from './Footer';
import TicketWidget from './TicketWidget';
import WhatsAppModal from './WhatsAppModal';
import PhoneModal from './PhoneModal';

export default function CaseStudyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
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
    async function loadProject() {
      const data = await fetchTableData('projects', PROJECTS_DATA);
      const list = Array.isArray(data) && data.length > 0 ? data : PROJECTS_DATA;
      const found = list.find(
        p => String(p.id).toLowerCase() === String(id).toLowerCase()
      ) || PROJECTS_DATA.find(p => String(p.id).toLowerCase() === String(id).toLowerCase()) || list[0];

      setProject(found);
      setLoading(false);
    }
    loadProject();

    const unsubscribe = subscribeCmsUpdate((tableName) => {
      if (tableName === 'projects') {
        loadProject();
      }
    });
    return () => unsubscribe();
  }, [id]);

  if (loading || !project) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#030b1e', color: '#00e5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif" }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sparkles size={24} />
          <span style={{ fontWeight: 700 }}>Loading Case Study...</span>
        </div>
      </div>
    );
  }

  const techStackList = Array.isArray(project.techStack)
    ? project.techStack
    : Array.isArray(project.tags)
    ? project.tags
    : typeof project.techStack === 'string'
    ? project.techStack.split(',').map(s => s.trim()).filter(Boolean)
    : typeof project.tags === 'string'
    ? project.tags.split(',').map(s => s.trim()).filter(Boolean)
    : ['IT Operations', 'Service Management'];

  const problemText = project.problem || project.description || 'Enterprise IT operational challenge requiring optimization and structured SLA management.';
  const solutionText = project.solution || project.shortDesc || 'K²V Technologies deployed multi-tiered IT support workflows and automated escalation pipelines.';
  const outcomeText = project.outcome || project.result || 'Achieved high SLA compliance and significant downtime reduction across global business units.';

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header Navigation */}
      <Navbar
        onOpenTicketWidget={() => setTicketWidgetOpen(true)}
        onOpenWhatsApp={() => {
          setWhatsAppCustomText(`Inquiry regarding Case Study: ${project.title}`);
          setWhatsAppModalOpen(true);
        }}
        onOpenPhone={() => setPhoneModalOpen(true)}
      />

      {/* Hero Banner */}
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
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#94a3b8', marginBottom: '28px' }}
          >
            <Link to="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <ChevronRight size={14} color="#64748b" />
            <Link to="/#work" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }}>Case Studies</Link>
            <ChevronRight size={14} color="#64748b" />
            <span style={{ color: '#ffffff', fontWeight: 700 }}>{project.title}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
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
              <span>{project.badge || 'CASE STUDY'}</span>
              {project.category && <span>• {project.category}</span>}
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
              {project.title}
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                color: 'rgba(225, 238, 255, 0.88)',
                lineHeight: 1.6,
                marginBottom: '32px',
                maxWidth: '820px'
              }}
            >
              {project.shortDesc || project.description}
            </p>

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
                  boxShadow: '0 8px 24px rgba(24, 119, 242, 0.45)'
                }}
              >
                <Ticket size={18} />
                <span>Discuss Similar Implementation</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Body */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div style={{ marginBottom: '40px' }}>
            <button
              onClick={() => navigate('/#work')}
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
              <span>Back to All Case Studies</span>
            </button>
          </div>

          {/* Cards for Problem, Solution, Outcome */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.04)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '16px',
                padding: '32px'
              }}
            >
              <h3 style={{ color: '#dc2626', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>
                The Operational Challenge
              </h3>
              <p style={{ color: 'var(--navy)', fontSize: '1.05rem', lineHeight: 1.75 }}>
                {problemText}
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--light-blue)',
                border: '1px solid rgba(7, 87, 217, 0.2)',
                borderRadius: '16px',
                padding: '32px'
              }}
            >
              <h3 style={{ color: 'var(--blue)', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>
                K²V Implemented Solution
              </h3>
              <p style={{ color: 'var(--navy)', fontSize: '1.05rem', lineHeight: 1.75 }}>
                {solutionText}
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(34, 197, 94, 0.04)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                borderRadius: '16px',
                padding: '32px'
              }}
            >
              <h3 style={{ color: '#16a34a', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>
                Measured Business Outcome
              </h3>
              <p style={{ color: 'var(--navy)', fontSize: '1.05rem', lineHeight: 1.75 }}>
                {outcomeText}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div style={{ marginBottom: '56px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={20} color="var(--blue)" />
              <span>Technologies &amp; Platform Architecture</span>
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {techStackList.map((tech, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '20px',
                    backgroundColor: 'var(--bg-light)',
                    border: '1px solid var(--line)',
                    color: 'var(--navy)',
                    fontSize: '0.9rem',
                    fontWeight: 700
                  }}
                >
                  {tech}
                </span>
              ))}
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
