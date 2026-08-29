-- K²V TECHNOLOGIES — SUPABASE DATABASE SCHEMA & INITIAL SEED DATA
-- Run this complete script in the Supabase SQL Editor for project `tgrbblexrtkiowoglhfo`

-- 1. HERO SECTION TABLE
CREATE TABLE IF NOT EXISTS public.hero_section (
  id INT PRIMARY KEY DEFAULT 1,
  badge TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  "primaryCtaText" TEXT,
  "primaryCtaUrl" TEXT,
  "secondaryCtaText" TEXT,
  "secondaryCtaUrl" TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ABOUT SECTION TABLE
CREATE TABLE IF NOT EXISTS public.about_section (
  id INT PRIMARY KEY DEFAULT 1,
  eyebrow TEXT NOT NULL,
  heading TEXT NOT NULL,
  description TEXT NOT NULL,
  "subText" TEXT,
  "philosophyTitle" TEXT,
  "philosophyText" TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  num TEXT,
  title TEXT NOT NULL,
  "shortDesc" TEXT,
  "fullDesc" TEXT,
  icon TEXT,
  "keyFeatures" JSONB DEFAULT '[]'::jsonb,
  "businessBenefits" JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 1,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PROJECTS / CASE STUDIES TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  client TEXT,
  category TEXT,
  result TEXT,
  description TEXT,
  "shortDesc" TEXT,
  challenge TEXT,
  solution TEXT,
  duration TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  image TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 1,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PROCESS STEPS TABLE
CREATE TABLE IF NOT EXISTS public.process_steps (
  id TEXT PRIMARY KEY,
  num TEXT,
  title TEXT NOT NULL,
  "desc" TEXT,
  icon TEXT,
  display_order INT DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. WHY US TABLE
CREATE TABLE IF NOT EXISTS public.why_us (
  id TEXT PRIMARY KEY,
  num TEXT,
  title TEXT NOT NULL,
  "desc" TEXT,
  display_order INT DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. FAQS TABLE
CREATE TABLE IF NOT EXISTS public.faqs (
  id TEXT PRIMARY KEY,
  num TEXT,
  category TEXT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INT DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CONTACT INFO TABLE
CREATE TABLE IF NOT EXISTS public.contact_info (
  id INT PRIMARY KEY DEFAULT 1,
  email TEXT,
  phone1 TEXT,
  phone2 TEXT,
  phone3 TEXT,
  address TEXT,
  hours TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. CONTACT REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT,
  message TEXT,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  "siteName" TEXT,
  tagline TEXT,
  "logoIcon" TEXT,
  "logoFull" TEXT,
  copyright TEXT,
  phone1 TEXT,
  phone2 TEXT,
  phone3 TEXT,
  email TEXT,
  address TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. SEO SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.seo_settings (
  id INT PRIMARY KEY DEFAULT 1,
  "pageTitle" TEXT,
  "metaDescription" TEXT,
  keywords TEXT,
  "ogTitle" TEXT,
  "ogDescription" TEXT,
  "ogImage" TEXT,
  "canonicalUrl" TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. NAVIGATION ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.navigation_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  display_order INT DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. MEDIA LIBRARY TABLE
CREATE TABLE IF NOT EXISTS public.media_library (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT,
  size TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. WHATSAPP SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.whatsapp_settings (
  id INT PRIMARY KEY DEFAULT 1,
  "countryCode" TEXT,
  numbers JSONB DEFAULT '[]'::jsonb,
  "defaultMessage" TEXT,
  "buttonText" TEXT,
  "isVisible" BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. TALK TO EXPERT TABLE
CREATE TABLE IF NOT EXISTS public.talk_to_expert (
  id INT PRIMARY KEY DEFAULT 1,
  "buttonText" TEXT,
  "buttonUrl" TEXT,
  "actionType" TEXT,
  phone TEXT,
  "whatsappMsg" TEXT,
  "isVisible" BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS) & SET PERMISSIVE PUBLIC POLICIES
DO $$ 
DECLARE 
  tbl TEXT;
  tbls TEXT[] := ARRAY[
    'hero_section', 'about_section', 'services', 'projects', 'process_steps',
    'why_us', 'faqs', 'contact_info', 'contact_requests', 'site_settings',
    'seo_settings', 'navigation_items', 'media_library', 'whatsapp_settings', 'talk_to_expert'
  ];
BEGIN
  FOREACH tbl IN ARRAY tbls LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', tbl);
    
    -- Drop existing policies if any
    EXECUTE format('DROP POLICY IF EXISTS "Public Select" ON public.%I;', tbl);
    EXECUTE format('DROP POLICY IF EXISTS "Public Insert" ON public.%I;', tbl);
    EXECUTE format('DROP POLICY IF EXISTS "Public Update" ON public.%I;', tbl);
    EXECUTE format('DROP POLICY IF EXISTS "Public Delete" ON public.%I;', tbl);
    
    -- Create permissive policies for public anon access to ensure Admin CMS sync works seamlessly
    EXECUTE format('CREATE POLICY "Public Select" ON public.%I FOR SELECT USING (true);', tbl);
    EXECUTE format('CREATE POLICY "Public Insert" ON public.%I FOR INSERT WITH CHECK (true);', tbl);
    EXECUTE format('CREATE POLICY "Public Update" ON public.%I FOR UPDATE USING (true) WITH CHECK (true);', tbl);
    EXECUTE format('CREATE POLICY "Public Delete" ON public.%I FOR DELETE USING (true);', tbl);
  END LOOP;
END $$;

-- INITIAL SEED DATA INSERTS (UPSERT ON CONFLICT)

-- 1. Hero
INSERT INTO public.hero_section (id, badge, title, subtitle, tags, "primaryCtaText", "primaryCtaUrl", "secondaryCtaText", "secondaryCtaUrl")
VALUES (
  1,
  'K²V TECHNOLOGIES • IT SERVICE DESK & MANAGED SUPPORT',
  'Enterprise IT Support That Keeps Business Moving.',
  'K²V Technologies provides 24/7 IT Service Desk, Managed Operations, ServiceNow Workflows, Cloud Infrastructure & Cybersecurity Solutions. Every Ticket Matters.',
  '["IT Service Desk", "Managed IT Services", "ServiceNow Workflows", "Cloud & Cybersecurity"]'::jsonb,
  'Explore IT Services', '#services', 'Talk to an Expert', '#contact'
) ON CONFLICT (id) DO NOTHING;

-- 2. About
INSERT INTO public.about_section (id, eyebrow, heading, description, "subText", "philosophyTitle", "philosophyText")
VALUES (
  1,
  'About K²V Technologies',
  'Technology problems shouldn''t slow your business down.',
  'K²V Technologies helps organizations reduce downtime, resolve issues faster, and bring structure to everyday IT operations — from the service desk to the data center to the cloud.',
  'In today''s fast-moving enterprise landscape, IT support must be proactive, responsive, and reliable. Whether managing multi-site cloud environments, structuring ServiceNow workflows, or providing 24/7 Service Desk assistance, our team delivers with speed and precision.',
  'Every Ticket Matters.',
  'Every request deserves immediate attention. Every problem deserves a permanent solution. No issue is too small, no infrastructure too complex. Every ticket matters to your business—and to ours.'
) ON CONFLICT (id) DO NOTHING;

-- 3. Contact Info
INSERT INTO public.contact_info (id, email, phone1, phone2, phone3, address, hours)
VALUES (
  1,
  'info@k2vtechnologies.com',
  '+91 97416 76105',
  '+91 89034 12599',
  '+91 95000 00449',
  'Remote-First IT Services Company Worldwide',
  '24/7 Support Desk Available Round the Clock'
) ON CONFLICT (id) DO NOTHING;

-- 4. Site Settings
INSERT INTO public.site_settings (id, "siteName", tagline, "logoIcon", "logoFull", copyright, phone1, phone2, phone3, email, address)
VALUES (
  1,
  'K²V Technologies',
  'Smart Solutions. Reliable Support. Real Impact.',
  '/assets/logo-icon.png',
  '/assets/logo-full.png',
  '© 2026 K²V Technologies. All rights reserved.',
  '+91 97416 76105',
  '+91 89034 12599',
  '+91 95000 00449',
  'info@k2vtechnologies.com',
  'Remote-First IT Services Company Worldwide'
) ON CONFLICT (id) DO NOTHING;

-- 5. SEO Settings
INSERT INTO public.seo_settings (id, "pageTitle", "metaDescription", keywords, "ogTitle", "ogDescription", "ogImage", "canonicalUrl")
VALUES (
  1,
  'K²V Technologies | Enterprise IT Support & Managed Services',
  '24/7 IT Service Desk, Managed IT Operations, ServiceNow Workflows, Cloud Infrastructure & Cybersecurity Solutions. Every Ticket Matters.',
  'IT Service Desk, Managed IT Services, ServiceNow, Cloud Support, Cybersecurity, IT Operations',
  'K²V Technologies — Enterprise IT Support',
  'Enterprise IT support that keeps business moving with 24/7 Service Desk and ServiceNow automation.',
  '/assets/logo-full.png',
  'https://kv2technologies.vercel.app/'
) ON CONFLICT (id) DO NOTHING;

-- 6. WhatsApp Settings
INSERT INTO public.whatsapp_settings (id, "countryCode", numbers, "defaultMessage", "buttonText", "isVisible")
VALUES (
  1,
  '+91',
  '[{"display": "+91 97416 76105", "raw": "919741676105", "label": "CEO"}, {"display": "+91 89034 12599", "raw": "918903412599", "label": "CTO"}, {"display": "+91 95000 00449", "raw": "919500000449", "label": "CIO"}]'::jsonb,
  'Hello K2V Technologies! I would like to inquire about your IT Service Desk and Managed IT services.',
  'Chat with Us on WhatsApp',
  true
) ON CONFLICT (id) DO NOTHING;

-- 7. Talk to Expert
INSERT INTO public.talk_to_expert (id, "buttonText", "buttonUrl", "actionType", phone, "whatsappMsg", "isVisible")
VALUES (
  1,
  'Talk to an Expert',
  '#contact',
  'ticket_widget',
  '+91 97416 76105',
  'Hello K2V Technologies! I want to talk to an IT expert.',
  true
) ON CONFLICT (id) DO NOTHING;

-- 8. Services Seed
INSERT INTO public.services (id, num, title, "shortDesc", "fullDesc", icon, "keyFeatures", "businessBenefits", is_active, display_order)
VALUES
('svc-1', '01', 'IT Service Desk (L1 / L2 / L3)', '24/7 multi-channel IT support for user issues, device troubleshooting, user access, and rapid incident resolution.', 'Our 24/7 IT Service Desk operates as the single point of contact for your entire organization. Tiered L1, L2, and L3 engineers handle password resets, hardware diagnostics, OS troubleshooting, software provisioning, and network connectivity with strict SLA compliance.', 'Headphones', '["24/7 Omni-channel Support", "L1, L2, L3 Escalation Matrices", "Strict SLA Response & Resolution Targets", "Remote & On-site Assistance"]'::jsonb, '["Dramatically reduced user downtime", "Consistent SLA-backed resolution times", "Improved employee productivity", "Full visibility into IT ticket metrics"]'::jsonb, true, 1),
('svc-2', '02', 'Managed IT Operations', 'End-to-end management of servers, endpoints, network gear, and IT infrastructure with continuous telemetry.', 'Complete management of your enterprise technology environment. We monitor server health, automate OS patching, manage endpoint security, and maintain network reliability to prevent unexpected downtime.', 'MonitorCheck', '["Proactive Infrastructure Telemetry", "Automated Patch Management", "Server & Network Administration", "Endpoint Security Monitoring"]'::jsonb, '["99.9% Uptime Guarantee", "Minimized operational risk", "Predictable monthly IT expense", "Proactive issue resolution before outage"]'::jsonb, true, 2),
('svc-3', '03', 'ServiceNow & ITSM Workflows', 'Custom ServiceNow implementation, ITSM workflow design, Incident, Problem, Change, and Request Catalog management.', 'Transform IT operations with structured ServiceNow automation. We configure incident management, problem management, change request workflows, automated catalog fulfillment, and customized IT portal interfaces.', 'Workflow', '["Custom ServiceNow Configuration", "Automated Incident & Change Management", "Self-Service Portal & Request Catalog", "Performance Analytics & Reporting"]'::jsonb, '["Streamlined IT service delivery", "Elimination of manual ticketing bottlenecks", "Transparent compliance audit trails", "Standardized enterprise workflows"]'::jsonb, true, 3),
('svc-4', '04', 'Cloud Infrastructure Management', 'Multi-cloud management across AWS, Azure, and Google Cloud — including deployment, backup, and cost optimization.', 'Deploy, optimize, and secure cloud workloads. We manage cloud migration, infrastructure provisioning, automated daily backups, auto-scaling configuration, and cost governance across hybrid cloud environments.', 'Cloud', '["Multi-Cloud Support (AWS/Azure/GCP)", "Automated Backups & Disaster Recovery", "Cost Governance & Resource Optimization", "Cloud Security & Compliance Enforcement"]'::jsonb, '["Flexible scalability for growth", "High availability and business continuity", "Optimized cloud expenditure", "Enterprise-grade cloud posture"]'::jsonb, true, 4),
('svc-5', '05', 'Data Center & Infrastructure', 'On-premise data center operations, rack management, storage configuration, virtualization, and network cabling.', 'Reliable management for physical data centers and hybrid server rooms. We handle server virtualization (VMware/Hyper-V), SAN/NAS storage, UPS redundancy, cabling topology, and disaster recovery planning.', 'Server', '["VMware & Hyper-V Virtualization", "SAN / NAS Storage Operations", "Hardware Diagnostics & Replacement", "Data Center Disaster Recovery"]'::jsonb, '["Maximum physical hardware longevity", "Secure on-premise data retention", "Minimized power & thermal outage risk", "Fast hardware fault recovery"]'::jsonb, true, 5),
('svc-6', '06', 'Cybersecurity & Endpoint Protection', 'Multi-layered endpoint protection, firewall management, threat detection, vulnerability patch management, and zero-trust security.', 'Protect your digital assets against ransomware, phishing, and unauthorized access. We deploy EDR, configure next-gen firewalls, manage identity access (IAM), and conduct regular vulnerability assessments.', 'ShieldCheck', '["Endpoint Detection & Response (EDR)", "Next-Gen Firewall Management", "Zero-Trust Access & Identity Control", "Vulnerability Patch & Audit Reporting"]'::jsonb, '["Protection against data breach & malware", "Regulatory compliance readiness", "Secured remote workforce endpoints", "Immediate incident isolation"]'::jsonb, true, 6),
('svc-7', '07', 'Network Infrastructure & NOC', '24/7 NOC telemetry for switches, routers, firewalls, SD-WAN, Wi-Fi networks, and VPN tunnels.', 'Continuous monitoring and maintenance of your corporate network backbones. Our Network Operations Center monitors latency, packet loss, bandwidth usage, and hardware health to keep networks running smoothly.', 'Radio', '["24/7 NOC Telemetry", "SD-WAN & Site-to-Site VPN", "Managed Router & Switch Config", "Wi-Fi Heatmapping & Optimization"]'::jsonb, '["Zero unmanaged network outages", "High-speed multi-office connectivity", "Prioritized VoIP & business traffic", "Instant WAN failover response"]'::jsonb, true, 7),
('svc-8', '08', 'Enterprise Software & Systems', 'Deployment, configuration, and integration support for Active Directory, Office 365, Google Workspace, and database servers.', 'Comprehensive administration of enterprise software applications. We configure Microsoft 365, Active Directory / Entra ID, Google Workspace tenant migrations, SQL databases, and custom business integrations.', 'Cpu', '["Microsoft 365 & Workspace Management", "Active Directory & SSO Identity Setup", "Database Telemetry & Maintenance", "Custom API & App Integration"]'::jsonb, '["Seamless user onboarding/offboarding", "Centralized user access control", "High software uptime & security", "Optimized SaaS licensing efficiency"]'::jsonb, true, 8)
ON CONFLICT (id) DO NOTHING;

-- 9. Projects Seed
INSERT INTO public.projects (id, title, client, category, result, description, "shortDesc", challenge, solution, duration, tags, image, is_active, display_order)
VALUES
('prj-1', 'Global Service Desk Transformation', 'Enterprise Healthcare Provider', 'IT Service Desk', '65% Reduction in MTTR', 'Overhauled L1-L3 service desk operations across 40+ medical clinics, introducing automated ticket routing and 24/7 SLA monitoring.', 'Overhauled L1-L3 service desk operations across 40+ medical clinics with 24/7 SLA monitoring.', 'Legacy ticketing system caused high resolution times and frustrated staff during critical hospital hours.', 'Implemented structured L1/L2 escalation matrices, deployed remote management tools, and configured automated ticket dispatching.', '6 Months', '["ITSM", "Service Desk", "SLA Management"]'::jsonb, '/assets/logo-full.png', true, 1),
('prj-2', 'ServiceNow Enterprise ITSM Rollout', 'Financial Services Firm', 'ServiceNow Workflows', '99.4% SLA Compliance', 'Designed and deployed ServiceNow ITSM catalog, automating employee onboarding, hardware requests, and change advisory workflows.', 'Deployed ServiceNow ITSM catalog, automating employee onboarding and change advisory workflows.', 'Manual email-based approvals slowed IT provisioning and created compliance gaps for financial audits.', 'Built customized ServiceNow Request Catalogs with multi-level approval workflows and integrated audit logging.', '4 Months', '["ServiceNow", "Workflow Automation", "ITSM"]'::jsonb, '/assets/logo-full.png', true, 2),
('prj-3', 'Hybrid Cloud Migration & Security Hardening', 'Logistics & Supply Chain Group', 'Cloud Infrastructure', '$120k Annual Savings', 'Migrated legacy on-premise servers to Azure hybrid environment with zero-downtime execution and automated backup policies.', 'Migrated legacy on-premise servers to Azure hybrid environment with zero-downtime execution.', 'Aging physical hardware presented imminent failure risk and ballooning maintenance costs.', 'Architected Azure Infrastructure-as-a-Service (IaaS) environment with auto-scaling, site recovery, and EDR security.', '5 Months', '["Cloud Migration", "Azure", "Cybersecurity"]'::jsonb, '/assets/logo-full.png', true, 3)
ON CONFLICT (id) DO NOTHING;

-- 10. Process Steps Seed
INSERT INTO public.process_steps (id, num, title, "desc", icon, display_order, is_active)
VALUES
('proc-1', '01', 'Discover', 'We understand your users, systems, challenges, and business requirements.', 'Compass', 1, true),
('proc-2', '02', 'Assess', 'We evaluate your current IT environment, workflows, service gaps, and operational needs.', 'FileSearch', 2, true),
('proc-3', '03', 'Design', 'We build a structured service model aligned with your business and technology requirements.', 'Layout', 3, true),
('proc-4', '04', 'Implement & Optimize', 'We deploy, monitor, measure, and continuously improve IT operations and service delivery.', 'RotateCw', 4, true)
ON CONFLICT (id) DO NOTHING;

-- 11. Why Us Seed
INSERT INTO public.why_us (id, num, title, "desc", display_order, is_active)
VALUES
('why-1', '01', 'Proactive Support', 'Identify problems before they become business disruptions with continuous monitoring and automated telemetry.', 1, true),
('why-2', '02', 'Experienced IT Professionals', 'Skilled support teams focused on fast, reliable L1/L2/L3 resolution and transparent SLA management.', 2, true),
('why-3', '03', 'Automation First', 'Reduce repetitive manual work and improve IT efficiency through intelligent ServiceNow workflows.', 3, true),
('why-4', '04', 'Business-Focused IT', 'Technology solutions aligned with your core business goals, uptime targets, and growth requirements.', 4, true)
ON CONFLICT (id) DO NOTHING;

-- 12. FAQs Seed
INSERT INTO public.faqs (id, num, category, question, answer, display_order, is_active)
VALUES
('faq-1', '01', 'Service Desk', 'What hours does K²V Technologies Service Desk operate?', 'Our IT Service Desk operates 24/7/365. Support engineers are available around the clock via email, phone, web portal, and WhatsApp for critical incident handling.', 1, true),
('faq-2', '02', 'Managed IT', 'What IT infrastructure do you support?', 'We support servers (Windows/Linux), cloud platforms (AWS, Azure, GCP), endpoints (laptops, desktops, mobile), networks (routers, switches, firewalls, Wi-Fi), and enterprise software (Microsoft 365, Active Directory, ServiceNow).', 2, true),
('faq-3', '03', 'ServiceNow', 'Can you customize ServiceNow workflows for our existing team?', 'Yes! We specialize in custom ServiceNow implementation, ITSM module configuration, automated request catalogs, and workflow integrations tailored to your enterprise processes.', 3, true),
('faq-4', '04', 'Onboarding', 'How fast can K²V Technologies onboard our company?', 'Standard IT Service Desk onboarding takes 1 to 2 weeks. During this period, we complete asset discovery, document access procedures, set up monitoring agents, and conduct knowledge transfer.', 4, true),
('faq-5', '05', 'Security & SLA', 'What SLA response times do you guarantee?', 'We offer customizable SLAs based on incident severity. Critical (P1) incidents receive an immediate response within 15 minutes, with dedicated L3 escalation handling.', 5, true)
ON CONFLICT (id) DO NOTHING;

-- 13. Navigation Items Seed
INSERT INTO public.navigation_items (id, name, url, display_order, is_active)
VALUES
('nav-1', 'Home', '#home', 1, true),
('nav-2', 'About Us', '#about', 2, true),
('nav-3', 'IT Services', '#services', 3, true),
('nav-4', 'Why K²V', '#why-us', 4, true),
('nav-5', 'Our Process', '#process', 5, true),
('nav-6', 'Case Studies', '#work', 6, true),
('nav-7', 'FAQs', '#faq', 7, true),
('nav-8', 'Contact Us', '#contact', 8, true)
ON CONFLICT (id) DO NOTHING;
