import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import {
  LayoutDashboard,
  Home,
  Info,
  Briefcase,
  Sparkles,
  Workflow,
  FolderGit2,
  HelpCircle,
  Mail,
  MessageSquare,
  PhoneCall,
  Menu as MenuIcon,
  Image,
  Settings,
  Search,
  LogOut,
  ChevronRight,
  ExternalLink,
  X,
  User,
  Shield,
  Bell
} from 'lucide-react';

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const localSession = localStorage.getItem('k2v_admin_session');
    if (localSession) {
      try {
        const parsed = JSON.parse(localSession);
        setUser({ email: parsed.email || 'admin.k2v@gmail.com' });
        setLoading(false);
        return;
      } catch (e) {}
    }

    // Check active Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && !localStorage.getItem('k2v_admin_session')) {
        navigate('/admin/login');
      } else if (session) {
        setUser(session.user);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' && !localStorage.getItem('k2v_admin_session')) {
        setUser(null);
        navigate('/admin/login');
      } else if (session) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    localStorage.removeItem('k2v_admin_session');
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', color: '#38bdf8' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="admin-spinner" />
          <p style={{ marginTop: '16px', fontWeight: 600 }}>Authenticating Session...</p>
        </div>
      </div>
    );
  }

  const menuSections = [
    {
      title: 'MAIN',
      items: [
        { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'WEBSITE CONTENT',
      items: [
        { path: '/admin/home', label: 'Home Page', icon: Home },
        { path: '/admin/about', label: 'About Us', icon: Info },
        { path: '/admin/services', label: 'IT Services', icon: Briefcase },
        { path: '/admin/why-us', label: 'Why Us', icon: Sparkles },
        { path: '/admin/process', label: 'Process Steps', icon: Workflow },
        { path: '/admin/projects', label: 'Projects / Work', icon: FolderGit2 },
        { path: '/admin/faq', label: 'FAQ', icon: HelpCircle }
      ]
    },
    {
      title: 'COMMUNICATION',
      items: [
        { path: '/admin/whatsapp', label: 'WhatsApp Settings', icon: MessageSquare },
        { path: '/admin/talk-to-expert', label: 'Talk to Expert', icon: PhoneCall }
      ]
    },
    {
      title: 'WEBSITE MANAGEMENT',
      items: [
        { path: '/admin/navigation', label: 'Navigation Menu', icon: MenuIcon },
        { path: '/admin/media', label: 'Media Library', icon: Image },
        { path: '/admin/settings', label: 'Global Settings', icon: Settings },
        { path: '/admin/seo', label: 'SEO Settings', icon: Search }
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 40 }}
        />
      )}

      {/* Sidebar Navigation Container */}
      <aside
        style={{
          width: '260px',
          backgroundColor: '#1e293b',
          borderRight: '1px solid #334155',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: sidebarOpen ? 0 : '-260px',
          zIndex: 50,
          transition: 'left 0.3s ease'
        }}
        className="admin-sidebar"
      >
        {/* Sidebar Brand Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
              <Shield size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#ffffff', letterSpacing: '-0.01em' }}>K²V Admin</div>
              <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 600 }}>CMS Control Center</div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="mobile-close-btn" style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Navigation Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 12px' }}>
          {menuSections.map((sec, idx) => (
            <div key={idx} style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.08em', padding: '0 12px 8px 12px' }}>
                {sec.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {sec.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  const IconComp = item.icon;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '0.88rem',
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? '#ffffff' : '#94a3b8',
                        backgroundColor: isActive ? '#0284c7' : 'transparent',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <IconComp size={18} color={isActive ? '#ffffff' : '#64748b'} />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight size={14} color="#ffffff" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar User Footer */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f8fafc' }}>
              <User size={16} />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email || 'Admin User'}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#22c55e' }}>● Authenticated</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Sign Out"
            style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', borderRadius: '6px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }} className="admin-main-content">
        {/* Top Navbar */}
        <header style={{ height: '64px', backgroundColor: '#1e293b', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 30 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mobile-menu-toggle"
              style={{ background: '#334155', border: 'none', color: '#ffffff', borderRadius: '8px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <MenuIcon size={20} />
            </button>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              K²V CMS Panel
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: 'rgba(2, 132, 199, 0.15)',
                border: '1px solid rgba(2, 132, 199, 0.35)',
                color: '#38bdf8',
                fontSize: '0.84rem',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <span>View Live Website</span>
              <ExternalLink size={14} />
            </a>

            <button
              onClick={handleLogout}
              className="btn-logout-header"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#ef4444',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content Body */}
        <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .admin-sidebar {
            left: 0 !important;
          }
          .admin-main-content {
            margin-left: 260px;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
          .mobile-close-btn {
            display: none !important;
          }
        }
        .admin-spinner {
          width: 38px;
          height: 38px;
          border: 3px solid rgba(56, 189, 248, 0.2);
          border-top-color: #38bdf8;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
