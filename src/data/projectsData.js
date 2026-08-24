export const PROJECTS_DATA = [
  {
    id: "proj-1",
    title: "Global Enterprise Service Desk Transformation",
    category: "IT Service Desk",
    shortDesc: "Streamlined multi-tiered support for a 2,500+ employee remote workforce with 98% SLA compliance.",
    badge: "Case Study",
    problem: "A growing technology organization experienced high ticket backlog, slow response times, and inconsistent support across remote employees working in multiple time zones.",
    solution: "K²V Technologies deployed a 24/7 Remote Service Desk operation with automated ticket triage, structured L1-L3 escalation protocols, and automated password resets.",
    outcome: "Reduced average first response time to under 12 minutes, resolved 78% of tickets at L1, and achieved a 98% SLA compliance score across all remote teams.",
    techStack: ["ServiceNow ITSM", "Remote Desktop API", "PowerShell Automation", "Azure AD"]
  },
  {
    id: "proj-2",
    title: "ServiceNow ITSM & CMDB Optimization",
    category: "ServiceNow",
    shortDesc: "Implemented automated incident workflows and accurate CMDB asset mapping across hybrid cloud assets.",
    badge: "Implementation",
    problem: "Legacy ticketing system lacked asset visibility, resulting in delayed root-cause analysis and manual, error-prone change management approvals.",
    solution: "Engineered a streamlined ServiceNow ITSM platform with automated CMDB discovery, custom catalog requests, and interactive manager approval pipelines.",
    outcome: "Eliminated 60% of manual approval overhead, established 100% asset visibility across 4,000+ infrastructure items, and reduced change deployment risk.",
    techStack: ["ServiceNow Platform", "REST Integration", "JavaScript", "Discovery Engine"]
  },
  {
    id: "proj-3",
    title: "Hybrid Multi-Cloud Migration & Hardening",
    category: "Cloud Services",
    shortDesc: "Seamless migration of core business workloads to AWS & Azure with zero operational downtime.",
    badge: "Cloud Architecture",
    problem: "Aging on-premises servers caused frequent maintenance outages and lacked elasticity during peak traffic periods.",
    solution: "Designed and executed a phased migration to AWS EC2 and Azure Virtual Desktop, enforcing Zero-Trust security rules and automated daily cloud backups.",
    outcome: "Achieved 99.99% workload availability, reduced compute operational costs by 32%, and enabled instant remote accessibility for all employees.",
    techStack: ["AWS EC2/S3", "Microsoft Azure", "Terraform", "CloudWatch", "Azure Sentinel"]
  },
  {
    id: "proj-4",
    title: "24/7 NOC Telemetry & Proactive Monitoring",
    category: "NOC & Infra",
    shortDesc: "Continuous network telemetry tracking across 45+ distributed locations with proactive alert resolution.",
    badge: "Operations",
    problem: "Frequent unmonitored network drops caused frustration for remote sites and delayed customer support operations.",
    solution: "Established a centralized 24/7 Network Operations Center monitoring framework using automated SNMP probes and real-time alert correlation.",
    outcome: "Caught and resolved 85% of network anomalies before end users reported an outage, reducing unplanned network downtime by 74%.",
    techStack: ["Zabbix", "Grafana", "Cisco Meraki", "Python Telemetry Scripts"]
  },
  {
    id: "proj-5",
    title: "Zero-Trust Endpoint Security & EDR Rollout",
    category: "Cybersecurity",
    shortDesc: "Multi-factor authentication and next-gen endpoint protection deployed across remote endpoint devices.",
    badge: "Security",
    problem: "Distributed remote workforce presented increased exposure to phishing threats and unpatched endpoint vulnerabilities.",
    solution: "Deployed Next-Gen EDR agents, automated vulnerability patch cycles, and enforced hardware-backed MFA across all company laptops.",
    outcome: "Achieved 100% endpoint compliance, blocked 1,200+ phishing attempts automatically, and passed external SOC 2 audit controls clean.",
    techStack: ["CrowdStrike EDR", "Microsoft Defender", "Okta MFA", "Automated Patching"]
  },
  {
    id: "proj-6",
    title: "AI-Powered Service Desk Assistant",
    category: "AI & Automation",
    shortDesc: "Intelligent chatbot assistant providing instant self-service ticket resolution for routine user requests.",
    badge: "AI Automation",
    problem: "Technicians spent over 35% of their daily bandwidth handling repetitive requests like password resets and VPN access checks.",
    solution: "Built a custom AI Virtual Assistant integrated into Teams and Slack that guides employees through automated self-remediation steps.",
    outcome: "Deflected 42% of routine tickets automatically, giving support engineers more bandwidth to handle high-priority infrastructure projects.",
    techStack: ["Python", "NLP / AI Engine", "Microsoft Teams Bot API", "Power Automate"]
  }
];
