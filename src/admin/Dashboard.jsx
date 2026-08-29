import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase, getContactRequests, subscribeCmsUpdate } from '../lib/supabaseClient';
import {
  Briefcase,
  FolderGit2,
  HelpCircle,
  Mail,
  Image,
  Menu as MenuIcon,
  MessageSquare,
  PhoneCall,
  ArrowUpRight,
  Sparkles,
  CheckCircle,
  Clock
} from 'lucide-react';
import { SERVICES_DATA, PROJECTS_DATA, FAQ_DATA } from '../lib/seedData';

export default function Dashboard() {
  const [stats, setStats] = useState({
    servicesCount: SERVICES_DATA.length,
    projectsCount: PROJECTS_DATA.length,
    faqsCount: FAQ_DATA.length,
    mediaCount: 0,
    contactRequestsCount: 0,
    unreadRequestsCount: 0,
    navItemsCount: 8
  });

  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardMetrics() {
      try {
        // Fetch services count
        const { count: svcCount } = await supabase.from('services').select('*', { count: 'exact', head: true });
        // Fetch projects count
        const { count: prjCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
        // Fetch FAQs count
        const { count: faqCount } = await supabase.from('faqs').select('*', { count: 'exact', head: true });
        // Fetch media count
        const { count: mediaCount } = await supabase.from('media_library').select('*', { count: 'exact', head: true });

        // Fetch contact requests merged from DB & Local Cache
        const allRequests = await getContactRequests();
        const unreadCount = allRequests.filter(r => r.status === 'unread').length;

        setStats({
          servicesCount: svcCount ?? SERVICES_DATA.length,
          projectsCount: prjCount ?? PROJECTS_DATA.length,
          faqsCount: faqCount ?? FAQ_DATA.length,
          mediaCount: mediaCount ?? 0,
          contactRequestsCount: allRequests.length,
          unreadRequestsCount: unreadCount,
          navItemsCount: 8
        });

        setRecentRequests(allRequests.slice(0, 5));
      } catch (err) {
        console.warn('Dashboard stats fetch fallback:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardMetrics();

    const unsubscribe = subscribeCmsUpdate((tableName) => {
      if (tableName === 'contact_requests') {
        loadDashboardMetrics();
      }
    });
    return () => unsubscribe();
  }, []);

  const metricCards = [
    { label: 'Total Services', value: stats.servicesCount, icon: Briefcase, color: '#0284c7', link: '/admin/services' },
    { label: 'Total Projects', value: stats.projectsCount, icon: FolderGit2, color: '#8b5cf6', link: '/admin/projects' },
    { label: 'Total FAQs', value: stats.faqsCount, icon: HelpCircle, color: '#ec4899', link: '/admin/faq' },
    { label: 'Media Assets', value: stats.mediaCount, icon: Image, color: '#10b981', link: '/admin/media' },
    { label: 'Contact Requests', value: stats.contactRequestsCount, icon: Mail, color: '#f59e0b', link: '/admin/contact' },
    { label: 'Unread Requests', value: stats.unreadRequestsCount, icon: Clock, color: '#ef4444', link: '/admin/contact' }
  ];

  const quickLinks = [
    { title: 'Manage Home Section', desc: 'Edit hero titles, subtitle, and badges', link: '/admin/home', icon: Sparkles },
    { title: 'Manage IT Services', desc: 'Add, edit, or disable core IT services', link: '/admin/services', icon: Briefcase },
    { title: 'Manage WhatsApp Lines', desc: 'Update numbers for CEO, CTO, CIO', link: '/admin/whatsapp', icon: MessageSquare },
    { title: 'Manage Talk to Expert', desc: 'Update button action and target line', link: '/admin/talk-to-expert', icon: PhoneCall }
  ];

  return (
    <div>
      {/* Top Banner */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
          CMS Dashboard Overview
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
          Real-time metrics and dynamic content management for K²V Technologies
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '36px' }}>
        {metricCards.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              style={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '14px',
                padding: '20px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                  {card.label}
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
                  {loading ? '...' : card.value}
                </div>
              </div>

              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: `${card.color}18`,
                  border: `1px solid ${card.color}35`,
                  color: card.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <IconComp size={22} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Links Section */}
      <div style={{ marginBottom: '36px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
          Quick Management Actions
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
          {quickLinks.map((ql, idx) => {
            const QlIcon = ql.icon;
            return (
              <Link
                key={idx}
                to={ql.link}
                style={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '14px',
                  padding: '20px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <QlIcon size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{ql.title}</span>
                    <ArrowUpRight size={16} color="#64748b" />
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.4 }}>
                    {ql.desc}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Contact Submissions */}
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            Recent Contact Form Inquiries
          </h3>
          <Link to="/admin/contact" style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none' }}>
            View All Requests →
          </Link>
        </div>

        {recentRequests.length === 0 ? (
          <div style={{ padding: '32px 0', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
            No recent contact form submissions found in database.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentRequests.map((req, rIdx) => (
              <div
                key={rIdx}
                style={{
                  padding: '14px 18px',
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>
                    {req.name} — <span style={{ color: '#38bdf8' }}>{req.service || 'Inquiry'}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                    {req.phone} • {req.email || 'No email provided'}
                  </div>
                </div>
                <span style={{ fontSize: '0.72rem', padding: '4px 10px', borderRadius: '6px', backgroundColor: req.status === 'unread' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)', color: req.status === 'unread' ? '#ef4444' : '#22c55e', fontWeight: 800, textTransform: 'uppercase' }}>
                  {req.status || 'Received'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
