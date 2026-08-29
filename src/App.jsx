import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Public Website Components
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TicketWidget from './components/TicketWidget';
import About from './components/About';
import Services from './components/Services';
import Stats from './components/Stats';
import WhyChooseUs from './components/WhyChooseUs';
import Process from './components/Process';
import Projects from './components/Projects';
import Industries from './components/Industries';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import WhatsAppModal from './components/WhatsAppModal';
import PhoneModal from './components/PhoneModal';
import Footer from './components/Footer';

// Admin Panel CMS Components
import AdminLayout from './admin/AdminLayout';
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';
import HomeCMS from './admin/HomeCMS';
import AboutCMS from './admin/AboutCMS';
import ServicesCMS from './admin/ServicesCMS';
import WhyUsCMS from './admin/WhyUsCMS';
import ProcessCMS from './admin/ProcessCMS';
import ProjectsCMS from './admin/ProjectsCMS';
import FaqCMS from './admin/FaqCMS';
import ContactCMS from './admin/ContactCMS';
import WhatsAppCMS from './admin/WhatsAppCMS';
import TalkToExpertCMS from './admin/TalkToExpertCMS';
import NavigationCMS from './admin/NavigationCMS';
import MediaCMS from './admin/MediaCMS';
import SettingsCMS from './admin/SettingsCMS';
import SeoCMS from './admin/SeoCMS';

// Public Website Page Wrapper
function PublicSite() {
  const [loading, setLoading] = useState(true);

  // Modal controls
  const [ticketWidgetOpen, setTicketWidgetOpen] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [whatsAppCustomText, setWhatsAppCustomText] = useState('');

  const handleOpenWhatsAppWithText = (text) => {
    setWhatsAppCustomText(text);
    setWhatsAppModalOpen(true);
  };

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        {/* Navigation */}
        <Navbar
          onOpenTicketWidget={() => setTicketWidgetOpen(true)}
          onOpenWhatsApp={() => {
            setWhatsAppCustomText('');
            setWhatsAppModalOpen(true);
          }}
          onOpenPhone={() => setPhoneModalOpen(true)}
        />

        {/* Hero Section */}
        <Hero
          onOpenTicketWidget={() => setTicketWidgetOpen(true)}
          onOpenWhatsApp={() => {
            setWhatsAppCustomText('');
            setWhatsAppModalOpen(true);
          }}
        />

        {/* About Section */}
        <About />

        {/* Core Services */}
        <Services onOpenTicketWidget={() => setTicketWidgetOpen(true)} />

        {/* Live Metrics & Animated Number Counters */}
        <Stats />

        {/* Why K2V Technologies */}
        <WhyChooseUs />

        {/* Interactive Process Workflow */}
        <Process onOpenTicketWidget={() => setTicketWidgetOpen(true)} />

        {/* Work & Projects Case Studies */}
        <Projects onOpenTicketWidget={() => setTicketWidgetOpen(true)} />

        {/* Industries & Technology Ecosystem */}
        <Industries />

        {/* Accordion FAQ */}
        <FAQ />

        {/* Contact & Request Form */}
        <Contact
          onOpenWhatsApp={() => {
            setWhatsAppCustomText('');
            setWhatsAppModalOpen(true);
          }}
          onOpenPhone={() => setPhoneModalOpen(true)}
        />

        {/* Footer */}
        <Footer
          onOpenWhatsApp={() => {
            setWhatsAppCustomText('');
            setWhatsAppModalOpen(true);
          }}
          onOpenPhone={() => setPhoneModalOpen(true)}
        />

        {/* Popups & Modals */}
        <TicketWidget
          isOpen={ticketWidgetOpen}
          onClose={() => setTicketWidgetOpen(false)}
          onSelectWhatsApp={(text) => {
            setTicketWidgetOpen(false);
            handleOpenWhatsAppWithText(text);
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
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Route */}
        <Route path="/" element={<PublicSite />} />

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin CMS Panel Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="home" element={<HomeCMS />} />
          <Route path="about" element={<AboutCMS />} />
          <Route path="services" element={<ServicesCMS />} />
          <Route path="why-us" element={<WhyUsCMS />} />
          <Route path="process" element={<ProcessCMS />} />
          <Route path="projects" element={<ProjectsCMS />} />
          <Route path="faq" element={<FaqCMS />} />
          <Route path="contact" element={<ContactCMS />} />
          <Route path="whatsapp" element={<WhatsAppCMS />} />
          <Route path="talk-to-expert" element={<TalkToExpertCMS />} />
          <Route path="navigation" element={<NavigationCMS />} />
          <Route path="media" element={<MediaCMS />} />
          <Route path="settings" element={<SettingsCMS />} />
          <Route path="seo" element={<SeoCMS />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        {/* Catch-all fallback redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
