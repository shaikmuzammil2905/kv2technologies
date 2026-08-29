import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  Clock,
  Building2,
  CheckCircle2,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';
import ProjectModal from './ProjectModal';
import { fetchTableData } from '../lib/supabaseClient';

export default function Projects({ onOpenTicketWidget }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsList, setProjectsList] = useState(PROJECTS_DATA);

  useEffect(() => {
    async function loadProjects() {
      const data = await fetchTableData('projects', PROJECTS_DATA);
      const activeData = data.filter(p => p.is_active !== false);
      if (activeData.length > 0) {
        setProjectsList(activeData);
      }
    }
    loadProjects();
  }, []);

  const categories = ['All', 'IT Service Desk', 'ServiceNow', 'Cloud Services', 'Cybersecurity', 'NOC & Infra'];

  const filteredProjects =
    activeCategory === 'All'
      ? projectsList
      : projectsList.filter((p) => p.category && p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="work" className="section-padding" style={{ position: 'relative', background: 'var(--white)' }}>
      <div className="container">
        {/* Header */}
        <div className="section-head">
          <div className="eyebrow">
            <Sparkles size={14} color="var(--blue)" />
            <span>Case Studies</span>
          </div>
          <h2 className="section-title">
            How Structured IT Operations <span style={{ color: 'var(--blue)' }}>Change Outcomes</span>
          </h2>
          <p className="section-sub">
            Real-world support case studies and operational transformations.
          </p>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '36px'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: activeCategory === cat ? '1px solid var(--blue)' : '1px solid var(--line)',
                backgroundColor: activeCategory === cat ? 'var(--light-blue)' : '#ffffff',
                color: activeCategory === cat ? 'var(--blue)' : 'var(--ink-60)',
                fontSize: '0.86rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid-3">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              style={{
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                backgroundColor: '#ffffff',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setSelectedProject(project)}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: 'var(--blue)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--light-blue)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {project.badge}
                  </span>
                  <FolderGit2 size={18} color="var(--ink-40)" />
                </div>

                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: 'var(--navy)',
                    marginBottom: '10px'
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    color: 'var(--ink-60)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    marginBottom: '20px'
                  }}
                >
                  {project.shortDesc}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--blue)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  paddingTop: '16px',
                  borderTop: '1px solid var(--line)'
                }}
              >
                <span>View Case Study</span>
                <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenTicketWidget={onOpenTicketWidget}
        />
      )}
    </section>
  );
}
