import { SERVICES_DATA } from '../data/servicesData';
import { PROJECTS_DATA } from '../data/projectsData';
import { FAQ_DATA } from '../data/faqData';

export const INITIAL_HERO = {
  badge: 'K²V TECHNOLOGIES • IT SERVICE DESK & MANAGED SUPPORT',
  title: 'Enterprise IT Support That Keeps Business Moving.',
  subtitle: 'K²V Technologies provides 24/7 IT Service Desk, Managed Operations, ServiceNow Workflows, Cloud Infrastructure & Cybersecurity Solutions. Every Ticket Matters.',
  tags: ['IT Service Desk', 'Managed IT Services', 'ServiceNow Workflows', 'Cloud & Cybersecurity'],
  primaryCtaText: 'Explore IT Services',
  primaryCtaUrl: '#services',
  secondaryCtaText: 'Talk to an Expert',
  secondaryCtaUrl: '#contact'
};

export const INITIAL_ABOUT = {
  eyebrow: 'About K²V Technologies',
  heading: 'Technology problems shouldn\'t slow your business down.',
  description: 'K²V Technologies helps organizations reduce downtime, resolve issues faster, and bring structure to everyday IT operations — from the service desk to the data center to the cloud.',
  subText: 'In today\'s fast-moving enterprise landscape, IT support must be proactive, responsive, and reliable. Whether managing multi-site cloud environments, structuring ServiceNow workflows, or providing 24/7 Service Desk assistance, our team delivers with speed and precision.',
  philosophyTitle: 'Every Ticket Matters.',
  philosophyText: 'Every request deserves immediate attention. Every problem deserves a permanent solution. No issue is too small, no infrastructure too complex. Every ticket matters to your business—and to ours.'
};

export const INITIAL_WHY_US = [
  { num: '01', title: 'Proactive Support', desc: 'Identify problems before they become business disruptions with continuous monitoring and automated telemetry.', display_order: 1, is_active: true },
  { num: '02', title: 'Experienced IT Professionals', desc: 'Skilled support teams focused on fast, reliable L1/L2/L3 resolution and transparent SLA management.', display_order: 2, is_active: true },
  { num: '03', title: 'Automation First', desc: 'Reduce repetitive manual work and improve IT efficiency through intelligent ServiceNow workflows.', display_order: 3, is_active: true },
  { num: '04', title: 'Business-Focused IT', desc: 'Technology solutions aligned with your core business goals, uptime targets, and growth requirements.', display_order: 4, is_active: true }
];

export const INITIAL_PROCESS_STEPS = [
  { num: '01', title: 'Discover', desc: 'We understand your users, systems, challenges, and business requirements.', icon: 'Compass', display_order: 1, is_active: true },
  { num: '02', title: 'Assess', desc: 'We evaluate your current IT environment, workflows, service gaps, and operational needs.', icon: 'FileSearch', display_order: 2, is_active: true },
  { num: '03', title: 'Design', desc: 'We build a structured service model aligned with your business and technology requirements.', icon: 'Layout', display_order: 3, is_active: true },
  { num: '04', title: 'Implement & Optimize', desc: 'We deploy, monitor, measure, and continuously improve IT operations and service delivery.', icon: 'RotateCw', display_order: 4, is_active: true }
];

export const INITIAL_WHATSAPP = {
  countryCode: '+91',
  numbers: [
    { display: '+91 97416 76105', raw: '919741676105', label: 'CEO' },
    { display: '+91 89034 12599', raw: '918903412599', label: 'CTO' },
    { display: '+91 95000 00449', raw: '919500000449', label: 'CIO' }
  ],
  defaultMessage: 'Hello K2V Technologies! I would like to inquire about your IT Service Desk and Managed IT services.',
  buttonText: 'Chat with Us on WhatsApp',
  isVisible: true
};

export const INITIAL_TALK_EXPERT = {
  buttonText: 'Talk to an Expert',
  buttonUrl: '#contact',
  actionType: 'ticket_widget',
  phone: '+91 97416 76105',
  whatsappMsg: 'Hello K2V Technologies! I want to talk to an IT expert.',
  isVisible: true
};

export const INITIAL_NAVIGATION = [
  { name: 'Home', url: '#home', display_order: 1, is_active: true },
  { name: 'About Us', url: '#about', display_order: 2, is_active: true },
  { name: 'IT Services', url: '#services', display_order: 3, is_active: true },
  { name: 'Why K²V', url: '#why-us', display_order: 4, is_active: true },
  { name: 'Our Process', url: '#process', display_order: 5, is_active: true },
  { name: 'Case Studies', url: '#work', display_order: 6, is_active: true },
  { name: 'FAQs', url: '#faq', display_order: 7, is_active: true },
  { name: 'Contact Us', url: '#contact', display_order: 8, is_active: true }
];

export const INITIAL_SITE_SETTINGS = {
  siteName: 'K²V Technologies',
  tagline: 'Smart Solutions. Reliable Support. Real Impact.',
  logoIcon: '/assets/logo-icon.png',
  logoFull: '/assets/logo-full.png',
  copyright: '© 2026 K²V Technologies. All rights reserved.',
  phone1: '+91 97416 76105',
  phone2: '+91 89034 12599',
  phone3: '+91 95000 00449',
  email: 'info@k2vtechnologies.com',
  address: 'Remote-First IT Services Company Worldwide'
};

export const INITIAL_SEO = {
  pageTitle: 'K²V Technologies | Enterprise IT Support & Managed Services',
  metaDescription: '24/7 IT Service Desk, Managed IT Operations, ServiceNow Workflows, Cloud Infrastructure & Cybersecurity Solutions. Every Ticket Matters.',
  keywords: 'IT Service Desk, Managed IT Services, ServiceNow, Cloud Support, Cybersecurity, IT Operations',
  ogTitle: 'K²V Technologies — Enterprise IT Support',
  ogDescription: 'Enterprise IT support that keeps business moving with 24/7 Service Desk and ServiceNow automation.',
  ogImage: '/assets/logo-full.png',
  canonicalUrl: 'https://kv2technologies.vercel.app/'
};

export { SERVICES_DATA, PROJECTS_DATA, FAQ_DATA };
