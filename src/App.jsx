import React, { useState } from 'react';
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

export default function App() {
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
