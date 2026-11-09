// SAFe® 6.0 Program Increment & Agile Release Train Data Model

export const SAFE_GLOSSARY = [
  {
    term: "Agile Release Train (ART)",
    tag: "Organization",
    icon: "🚂",
    shortDef: "A long-lived team of 5–12 Agile teams (50–125+ people) aligned to a common mission.",
    details: "All teams on an ART share a common cadence, synchronized sprint boundaries, and a unified delivery pipeline. The Release Train Engineer (RTE) serves as Chief Scrum Master.",
    smTip: "In interviews: Mention you were a Scrum Master within an ART, coordinating with peer Scrum Masters to resolve blockers."
  },
  {
    term: "Program Increment (PI)",
    tag: "Cadence",
    icon: "📅",
    shortDef: "A timebox of 8–12 weeks (typically four 2-week feature sprints + one IP sprint).",
    details: "The PI provides the cadence for the ART. Teams set realistic PI Objectives, identify dependencies, and demonstrate working software every 2 weeks.",
    smTip: "In interviews: Explain that 1 PI = 4 feature sprints + 1 IP sprint (usually 10 weeks total)."
  },
  {
    term: "PI Planning (2-Day Event)",
    tag: "Ceremony",
    icon: "🤝",
    shortDef: "The cornerstone cadence event where the entire ART plans the next Program Increment.",
    details: "Day 1 focuses on business context, architecture, vision, and team draft plans. Day 2 addresses cross-team dependencies, management review, ROAMing risks, and the confidence vote.",
    smTip: "In interviews: Describe how you facilitated your team's breakout rooms and drafted team objectives."
  },
  {
    term: "Innovation & Planning (IP) Sprint",
    tag: "Quality Buffer",
    icon: "💡",
    shortDef: "The final sprint of every PI; dedicated to innovation, technical debt, and PI readiness.",
    details: "Never commit new feature stories in the IP sprint! It acts as an estimating buffer, gives engineers hackathon/innovation time, and hosts the Inspect & Adapt event.",
    smTip: "In interviews: Emphasize that the IP sprint protects team predictability and prevents burnout."
  },
  {
    term: "Cross-Team Dependencies",
    tag: "Execution",
    icon: "🔗",
    shortDef: "When Team A cannot complete their feature until Team B delivers an API or enabler.",
    details: "Visualized on the Program Board with red strings. The goal of PI Planning is to identify and resolve these before sprint execution begins.",
    smTip: "In interviews: Mention using Scrum of Scrums to track and clear cross-squad dependencies within 48 hours."
  },
  {
    term: "ROAM Risk Matrix",
    tag: "Governance",
    icon: "🛡️",
    shortDef: "Framework used during PI Planning to categorize program-level risks.",
    details: "R = Resolved (no longer a risk), O = Owned (assigned person responsible), A = Accepted (unavoidable reality), M = Mitigated (contingency plan in place).",
    smTip: "In interviews: Explain how you categorized squad risks into ROAM columns during management review."
  },
  {
    term: "Scrum of Scrums (SoS)",
    tag: "Coordination",
    icon: "👥",
    shortDef: "Twice-weekly sync between Scrum Masters and the Release Train Engineer (RTE).",
    details: "Focuses exclusively on cross-team dependencies, impediments, and risk escalation. Not a personal status update meeting.",
    smTip: "In interviews: Mention answering: (1) Did we deliver promised dependencies? (2) Are incoming dependencies on track? (3) What's blocking us?"
  },
  {
    term: "Confidence Vote (Fist of Five)",
    tag: "Commitment",
    icon: "🖐️",
    shortDef: "End-of-planning vote (1 to 5 fingers) on the feasibility of the overall PI Plan.",
    details: "If the average score is less than 3, the plan is reworked with management until everyone has confidence.",
    smTip: "In interviews: Explain that team psychological safety is proven when members feel safe voting 1 or 2 to flag unrealistic scope."
  }
];

export const INITIAL_TEAMS = [
  {
    id: "team-mobile",
    name: "Mobile Client Squad",
    role: "User Experience & iOS/Android",
    lead: "Bala Palani (Scrum Master)",
    color: "#6366f1",
    avatar: "📱"
  },
  {
    id: "team-payments",
    name: "Payments & Billing Gateway",
    role: "Transaction Processing & PCI",
    lead: "Sarah Chen (Scrum Master)",
    color: "#10b981",
    avatar: "💳"
  },
  {
    id: "team-core",
    name: "Core Platform & APIs",
    role: "Customer Accounts & Ledger",
    lead: "Alex Rivera (Scrum Master)",
    color: "#f59e0b",
    avatar: "⚡"
  },
  {
    id: "team-devops",
    name: "Cloud Infra & SRE",
    role: "CI/CD & Kubernetes Reliability",
    lead: "Jordan Vance (Scrum Master)",
    color: "#ec4899",
    avatar: "☁️"
  }
];

export const SPRINTS = [
  { id: "sprint-1", name: "Sprint 1", dates: "Weeks 1–2", isIP: false },
  { id: "sprint-2", name: "Sprint 2", dates: "Weeks 3–4", isIP: false },
  { id: "sprint-3", name: "Sprint 3", dates: "Weeks 5–6", isIP: false },
  { id: "sprint-4", name: "Sprint 4", dates: "Weeks 7–8", isIP: false },
  { id: "sprint-ip", name: "IP Sprint", dates: "Weeks 9–10", isIP: true }
];

export const INITIAL_STORIES = [
  // Mobile Team
  {
    id: "MOB-101",
    teamId: "team-mobile",
    sprintId: "sprint-1",
    key: "MOB-101",
    title: "Biometric Authentication UI Integration",
    type: "feature",
    points: 5,
    status: "committed"
  },
  {
    id: "MOB-102",
    teamId: "team-mobile",
    sprintId: "sprint-2",
    key: "MOB-102",
    title: "New Checkout Flow Screen Layouts",
    type: "feature",
    points: 8,
    status: "committed"
  },
  {
    id: "MOB-103",
    teamId: "team-mobile",
    sprintId: "sprint-3",
    key: "MOB-103",
    title: "One-Click Apple Pay & Google Pay Checkout",
    type: "feature",
    points: 13,
    status: "committed"
  },
  {
    id: "MOB-104",
    teamId: "team-mobile",
    sprintId: "sprint-4",
    key: "MOB-104",
    title: "End-to-End User Acceptance Test Suite",
    type: "test",
    points: 5,
    status: "committed"
  },
  {
    id: "MOB-105",
    teamId: "team-mobile",
    sprintId: "sprint-ip",
    key: "MOB-105",
    title: "React Native 0.76 Upgrade & Hackathon",
    type: "enabler",
    points: 3,
    status: "uncommitted"
  },

  // Payments Team
  {
    id: "PAY-201",
    teamId: "team-payments",
    sprintId: "sprint-1",
    key: "PAY-201",
    title: "Stripe & Adyen Fallback Routing Service",
    type: "feature",
    points: 8,
    status: "committed"
  },
  {
    id: "PAY-202",
    teamId: "team-payments",
    sprintId: "sprint-2",
    key: "PAY-202",
    title: "Tokenized Payment Method v2 Endpoints",
    type: "enabler",
    points: 13,
    status: "committed"
  },
  {
    id: "PAY-203",
    teamId: "team-payments",
    sprintId: "sprint-3",
    key: "PAY-203",
    title: "Real-Time Fraud & 3D Secure Webhook Handler",
    type: "feature",
    points: 8,
    status: "committed"
  },
  {
    id: "PAY-204",
    teamId: "team-payments",
    sprintId: "sprint-4",
    key: "PAY-204",
    title: "PCI-DSS Level 1 Compliance Audit Logs",
    type: "enabler",
    points: 5,
    status: "committed"
  },

  // Core Platform Team
  {
    id: "CORE-301",
    teamId: "team-core",
    sprintId: "sprint-1",
    key: "CORE-301",
    title: "Customer Account Ledger Schema Migration",
    type: "enabler",
    points: 13,
    status: "committed"
  },
  {
    id: "CORE-302",
    teamId: "team-core",
    sprintId: "sprint-2",
    key: "CORE-302",
    title: "High-Throughput Redis Deduplication Cache",
    type: "enabler",
    points: 8,
    status: "committed"
  },
  {
    id: "CORE-303",
    teamId: "team-core",
    sprintId: "sprint-3",
    key: "CORE-303",
    title: "Invoice Generation & Statement API",
    type: "feature",
    points: 8,
    status: "committed"
  },
  {
    id: "CORE-304",
    teamId: "team-core",
    sprintId: "sprint-4",
    key: "CORE-304",
    title: "PostgreSQL Composite Index Performance Tuning",
    type: "enabler",
    points: 5,
    status: "committed"
  },

  // DevOps / Cloud Team
  {
    id: "OPS-401",
    teamId: "team-devops",
    sprintId: "sprint-1",
    key: "OPS-401",
    title: "EKS Multi-Region Disaster Recovery Cluster",
    type: "enabler",
    points: 8,
    status: "committed"
  },
  {
    id: "OPS-402",
    teamId: "team-devops",
    sprintId: "sprint-2",
    key: "OPS-402",
    title: "ArgoCD Blue/Green Progressive Deployment",
    type: "enabler",
    points: 5,
    status: "committed"
  },
  {
    id: "OPS-403",
    teamId: "team-devops",
    sprintId: "sprint-3",
    key: "OPS-403",
    title: "Distributed OpenTelemetry Tracing Setup",
    type: "enabler",
    points: 5,
    status: "committed"
  },
  {
    id: "OPS-404",
    teamId: "team-devops",
    sprintId: "sprint-ip",
    key: "OPS-404",
    title: "Chaos Engineering GameDay Drill",
    type: "enabler",
    points: 5,
    status: "uncommitted"
  }
];

export const INITIAL_DEPENDENCIES = [
  {
    id: "dep-1",
    fromStoryId: "PAY-202", // Payment Endpoints (Sprint 2)
    toStoryId: "MOB-103",   // Apple Pay in Mobile (Sprint 3)
    type: "blocking",
    description: "Mobile Apple Pay requires Tokenized Payment API v2 to be deployed first.",
    status: "on-track"
  },
  {
    id: "dep-2",
    fromStoryId: "CORE-301", // Ledger Schema Migration (Sprint 1)
    toStoryId: "PAY-202",    // Payment Endpoints (Sprint 2)
    type: "blocking",
    description: "Payments API requires Core Customer Ledger Schema migration.",
    status: "on-track"
  },
  {
    id: "dep-3",
    fromStoryId: "OPS-402", // Blue/Green ArgoCD (Sprint 2)
    toStoryId: "PAY-203",   // Fraud Webhook Handler (Sprint 3)
    type: "critical",
    description: "Real-time fraud webhook requires progressive deployment pipeline.",
    status: "warning"
  }
];

export const INITIAL_RISKS = [
  {
    id: "risk-1",
    title: "PCI-DSS Level 1 Certification Delay",
    category: "Compliance",
    column: "owned",
    owner: "Sarah Chen (Payments SM)",
    impact: "High",
    mitigation: "Third-party QSA auditor scheduled for Week 6 dry-run audit."
  },
  {
    id: "risk-2",
    title: "Apple Pay Merchant Key Re-signing Bottleneck",
    category: "External Dependency",
    column: "mitigated",
    owner: "Bala Palani (Mobile SM)",
    impact: "Medium",
    mitigation: "Enterprise test certificate provisioned in staging sandbox."
  },
  {
    id: "risk-3",
    title: "Core Ledger PostgreSQL Table Lock Downtime",
    category: "Technical",
    column: "resolved",
    owner: "Alex Rivera (Core SM)",
    impact: "High",
    mitigation: "Switched to non-blocking online schema migration (pg-online-schema-change)."
  },
  {
    id: "risk-4",
    title: "AWS US-East-1 Regional Outage",
    category: "Infrastructure",
    column: "accepted",
    owner: "Jordan Vance (DevOps SM)",
    impact: "Severe",
    mitigation: "Standard cloud provider risk; accepted per SLA."
  }
];

export const INITIAL_OBJECTIVES = [
  {
    id: "obj-1",
    teamId: "team-mobile",
    title: "Deliver 1-Click Biometric & Apple/Google Pay Checkout on iOS & Android",
    businessValue: 10,
    actualValue: null,
    isUncommitted: false
  },
  {
    id: "obj-2",
    teamId: "team-payments",
    title: "Establish High-Availability Multi-Provider Payment Routing (<120ms Latency)",
    businessValue: 9,
    actualValue: null,
    isUncommitted: false
  },
  {
    id: "obj-3",
    teamId: "team-core",
    title: "Migrate 2.5M Account Records to Non-Blocking Deduplicated Ledger",
    businessValue: 8,
    actualValue: null,
    isUncommitted: false
  },
  {
    id: "obj-4",
    teamId: "team-mobile",
    title: "Experimental Dynamic Product Carousel A/B Test",
    businessValue: 4,
    actualValue: null,
    isUncommitted: true // Uncommitted objective!
  }
];
