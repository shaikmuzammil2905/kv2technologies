import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS_DATA } from '../data/projectsData';
import ProjectModal from './ProjectModal';
import { ArrowRight, Sparkles, FolderGit2 } from 'lucide-react';

export default function Projects({ onOpenTicketWidget }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'IT Service Desk', 'ServiceNow', 'Cloud Services', 'Cybersecurity', 'NOC & Infra'];

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="work" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div className="section-head">
          <div className="eyebrow">
            <Sparkles size={14} color="#00f0ff" />
            <span>Work & Case Studies</span>
          </div>
          <h2 className="section-title">
            Structured IT Operations <span className="gradient-blue-cyan">In Action.</span>
          </h2>
          <p className="section-sub">
            Real-world architecture patterns and support transformations designed for modern enterprises.
          </p>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '48px'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: activeCategory === cat ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: activeCategory === cat ? 'rgba(0, 102, 255, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                color: activeCategory === cat ? '#00f0ff' : '#94a3b8',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px'
          }}
          className="grid-3"
        >
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass-panel"
              style={{
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
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
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#00f0ff',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(0, 240, 255, 0.1)',
                      border: '1px solid rgba(0, 240, 255, 0.2)'
                    }}
                  >
                    {project.badge}
                  </span>
                  <FolderGit2 size={20} color="#64748b" />
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '10px'
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    color: '#94a3b8',
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
                  color: '#00f0ff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)'
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
