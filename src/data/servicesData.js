export const SERVICES_DATA = [
  {
    id: "it-service-desk",
    num: "01",
    title: "IT Service Desk",
    shortDesc: "L1/L2/L3 support, incident management, request fulfillment and remote assistance.",
    icon: "Headphones",
    category: "Support & Operations",
    overview: "K²V Technologies provides a structured 24/7 IT Service Desk operation designed to resolve employee technology issues quickly and reliably. Under our 'Every Ticket Matters' philosophy, every user request receives prompt tier-based attention with complete end-to-end SLA tracking.",
    benefits: [
      "24/7 Multi-channel support access (Web, Phone, Email & Chat)",
      "Structured L1, L2, and L3 escalation workflows",
      "Rapid resolution times with strict SLA commitments",
      "Comprehensive knowledge base creation and ticket tracking"
    ],
    deliverables: [
      "User Onboarding & Offboarding Ticket Workflows",
      "Hardware, Software & Network Troubleshooting",
      "Remote Desktop Support & Access Management",
      "Monthly SLA & CSAT Performance Analytics"
    ],
    process: [
      "Ticket Ingestion & Triage",
      "First Contact Resolution Attempt",
      "Tiered Specialist Escalation",
      "User Verification & Ticket Closure"
    ]
  },
  {
    id: "managed-it-services",
    num: "02",
    title: "Managed IT Services",
    shortDesc: "Proactive monitoring, maintenance, patching and IT operations management.",
    icon: "MonitorCheck",
    category: "Managed Operations",
    overview: "Transform your IT operations from reactive troubleshooting to a proactive, highly available technology engine. K²V Managed IT Services handle your entire digital ecosystem—ensuring continuous system uptime, security patch compliance, and infrastructure stability.",
    benefits: [
      "Proactive issue detection before business disruption",
      "Automated system updates and OS patch deployment",
      "Single point of ownership for vendor management",
      "Predictable operational budget with no hidden costs"
    ],
    deliverables: [
      "End-to-end Device & Endpoint Management",
      "Server Health & Storage Capacity Monitoring",
      "Automated Patch Management & Compliance Audits",
      "Strategic IT Roadmap & Advisory Reports"
    ],
    process: [
      "Environment Assessment & Tooling Deployment",
      "Baseline Performance Configuration",
      "24/7 Automated Monitoring & Patching",
      "Continuous Optimization & SLA Reporting"
    ]
  },
  {
    id: "servicenow",
    num: "03",
    title: "ServiceNow Services",
    shortDesc: "ITSM implementation, workflows, CMDB, automation and ServiceNow optimization.",
    icon: "Workflow",
    category: "Platform Engineering",
    overview: "Maximize your enterprise ITSM investment with K²V's specialized ServiceNow implementations. We design custom workflow automation, configure CMDB structures, and optimize IT Service Management modules to streamline enterprise-wide service delivery.",
    benefits: [
      "Custom workflow automation tailored to your organizational structure",
      "Accurate Configuration Management Database (CMDB) mapping",
      "Seamless integration with third-party monitoring & Cloud APIs",
      "Enhanced self-service portals to reduce ticket volume"
    ],
    deliverables: [
      "ITSM Module Configuration (Incident, Problem, Change, Catalog)",
      "Custom ServiceNow Dashboard & Reporting Portals",
      "Automated Scripting & REST API Integrations",
      "Platform Upgrades, Audits & User Training"
    ],
    process: [
      "Requirement Gathering & Flow Mapping",
      "Platform Architecture & Customization",
      "Integration Testing & Data Migration",
      "Go-Live Deployment & Continuous Support"
    ]
  },
  {
    id: "cloud",
    num: "04",
    title: "Cloud Services",
    shortDesc: "AWS, Azure, Microsoft 365, cloud migration and managed cloud operations.",
    icon: "Cloud",
    category: "Cloud & Infrastructure",
    overview: "Accelerate your digital transformation with secure, scalable cloud architectures. K²V Technologies delivers comprehensive Cloud Services across AWS, Microsoft Azure, and Microsoft 365—from initial cloud migration strategy to continuous cost optimization and governance.",
    benefits: [
      "Scalable infrastructure customized for workload demands",
      "Enhanced data resiliency and automated cloud backups",
      "Cost optimization strategies to eliminate idle cloud spend",
      "High-availability architecture design with zero downtime goals"
    ],
    deliverables: [
      "Cloud Readiness Assessment & Migration Execution",
      "AWS / Azure Infrastructure Management & IAM Security",
      "Microsoft 365 Tenant Administration & Security Hardening",
      "Disaster Recovery & Backup Automation"
    ],
    process: [
      "Cloud Assessment & Architecture Planning",
      "Phased Data & Workload Migration",
      "Security Enforcement & IAM Policy Build",
      "Ongoing Managed Cloud Operations"
    ]
  },
  {
    id: "infrastructure",
    num: "05",
    title: "Infrastructure Management",
    shortDesc: "Servers, networks, endpoints, virtualization and enterprise infrastructure.",
    icon: "Server",
    category: "Core Infrastructure",
    overview: "Maintain a resilient physical and virtual foundation with K²V Infrastructure Management. We ensure your servers, storage arrays, network hardware, and hypervisors run at peak performance with enterprise-grade reliability.",
    benefits: [
      "High-performance compute and virtualization management (VMware/Hyper-V)",
      "Secure network routing, VPN tunnel setup, and firewall maintenance",
      "Automated hardware diagnostic alerts and lifecycle management",
      "Reduced infrastructure downtime and simplified scalability"
    ],
    deliverables: [
      "Hypervisor & Cluster Management (VMware vSphere / Nutanix)",
      "Network Switch, Router & Firewall Configuration",
      "SAN / NAS Storage Pool Optimization",
      "Routine Infrastructure Security Hardening"
    ],
    process: [
      "Infrastructure Discovery & Vulnerability Scan",
      "Redundancy & Failover Setup",
      "System Optimization & Virtualization Tuning",
      "24/7 Managed Infrastructure Support"
    ]
  },
  {
    id: "cybersecurity",
    num: "06",
    title: "Cybersecurity Services",
    shortDesc: "Security monitoring, endpoint protection, identity and vulnerability support.",
    icon: "ShieldCheck",
    category: "Information Security",
    overview: "Protect your business assets against evolving cyber threats. K²V Cyber Security Services implement multi-layered defenses, continuous endpoint protection, Zero-Trust identity frameworks, and routine vulnerability remediations.",
    benefits: [
      "Real-time threat monitoring and rapid incident mitigation",
      "Next-Gen Endpoint Detection & Response (EDR) implementation",
      "Multi-Factor Authentication (MFA) & Zero-Trust Access Policies",
      "Protection against ransomware, phishing, and credential exposure"
    ],
    deliverables: [
      "EDR / XDR Agent Management & Central Monitoring",
      "Identity & Access Management (Azure AD / Okta Configuration)",
      "Routine Vulnerability Scanning & Patch Prioritization",
      "Security Awareness Training & Simulation Guidance"
    ],
    process: [
      "Security Risk Assessment & Baseline Audit",
      "Multi-Layer Guard Deployment (EDR, MFA, Firewall)",
      "24/7 Threat Monitoring & Anomaly Detection",
      "Incident Containment & Remediation"
    ]
  },
  {
    id: "noc",
    num: "07",
    title: "NOC Services",
    shortDesc: "24/7 infrastructure and network monitoring with proactive issue resolution.",
    icon: "Radio",
    category: "Network Operations",
    overview: "Our 24/7 Network Operations Center (NOC) acts as the watchful eye over your entire IT network. K²V engineers continuously track telemetry, bandwidth, server load, and connectivity—resolving alerts before end users even notice.",
    benefits: [
      "Continuous 24/7/365 active network telemetry oversight",
      "Automated alert escalation and rapid triage processes",
      "Significant reduction in unplanned network outages",
      "Detailed bandwidth usage and ISP performance insights"
    ],
    deliverables: [
      "Real-time Network Telemetry & SNMP Device Monitoring",
      "ISP Circuit Health & Uptime Tracking",
      "Alert Filtering & False-Positive Elimination",
      "Incident Ticket Creation & Escalation to Tier 2/3"
    ],
    process: [
      "Telemetry Integration & Threshold Setup",
      "Continuous Monitoring & Event Correlation",
      "Immediate Incident Remediation & Alerting",
      "Monthly Uptime & Root Cause Analysis (RCA)"
    ]
  },
  {
    id: "ai-automation",
    num: "08",
    title: "AI & Automation",
    shortDesc: "AI-powered service desk, workflow automation and intelligent IT operations.",
    icon: "Cpu",
    category: "Intelligent Systems",
    overview: "Eliminate repetitive manual tasks and speed up issue resolution using K²V AI & IT Automation. We build intelligent chatbot assistants, automated ticket classification algorithms, and self-healing IT scripts that empower your workforce.",
    benefits: [
      "Automated password resets and routine request fulfillment",
      "Intelligent ticket routing powered by NLP classification",
      "Self-healing scripts for automatic service restarts",
      "Higher technician efficiency and lower operational costs"
    ],
    deliverables: [
      "AI Service Assistant & Chatbot Integration",
      "Automated Scripting Libraries (PowerShell / Python / REST API)",
      "Automated User Onboarding & Software Provisioning",
      "Workflow Process Mining & Automation Dashboards"
    ],
    process: [
      "Workflow Audit & Repetitive Task Identification",
      "Automation Script & AI Agent Development",
      "Staging Environment Validation",
      "Production Rollout & Continuous AI Tuning"
    ]
  }
];
