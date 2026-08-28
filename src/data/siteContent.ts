/**
 * Centralized editorial content for Summit Management Consultancy.
 * Update copy, contact details, awards, and biography information here —
 * components should not contain hardcoded business content.
 */

export const brand = {
  name: "Summit Management Consultancy",
  shortName: "Summit",
  tagline: "Strategic clarity. Executive confidence. Sustainable outcomes.",
};

export const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Expertise", to: "/expertise" },
  { label: "Project Lifecycle", shortLabel: "Lifecycle", to: "/project-lifecycle" },
  { label: "Legal Advisory Support", shortLabel: "Advisory", to: "/legal-support" },
  { label: "Recognition", to: "/recognition" },
  { label: "Collaboration", to: "/collaboration" },
  { label: "Contact", to: "/contact" },
];

export const hero = {
  eyebrow: "STRATEGY  •  GOVERNANCE  •  EXECUTION",
  headlineLine1: "Strategic Leadership",
  headlineLine2: "From Vision to Execution.",
  copy:
    "Summit Management Consultancy provides executive-level strategic oversight, management advisory, legal-support expertise, and complete project lifecycle guidance for institutions navigating complex and high-stakes environments.",
  ctaPrimary: { label: "Explore Our Expertise", to: "/expertise" },
  ctaSecondary: { label: "Request a Consultation", to: "/contact" },
  credibilityStrip: [
    "Government & Public Sector",
    "Executive Advisory",
    "Project Lifecycle Management",
    "Legal & Commercial Strategy",
  ],
};

export const introduction = {
  eyebrow: "SUMMIT MANAGEMENT CONSULTANCY",
  headline: "Clarity at the highest level of decision-making.",
  paragraphs: [
    "Summit Management Consultancy is an elite practice led by seasoned advisors with extensive public-sector and government experience.",
    "We partner with senior executives, C-suite leaders, boards, institutional bodies, project stakeholders, and professional advisors to provide end-to-end strategic oversight, executive decision support, and project lifecycle execution — from initial tender strategy through post-award delivery.",
    "Our role is to transform complex technical, commercial, contractual, institutional, and operational matters into clear strategic direction.",
  ],
};

export type ExpertiseGroup = {
  number: string;
  title: string;
  summary: string;
  subsections: {
    heading: string;
    items: string[];
  }[];
  note?: string;
};

export const expertise: ExpertiseGroup[] = [
  {
    number: "01",
    title: "Strategic Project Management & Lifecycle Execution",
    summary:
      "End-to-end oversight from pre-tender strategy through award, mobilization, and delivery.",
    subsections: [
      {
        heading: "Pre-Tendering & Tendering Stage Facilitation",
        items: [
          "Structuring tender documentation",
          "Evaluating bidder qualifications",
          "Managing pre-award processes",
          "Designing procurement frameworks",
          "Aligning tender requirements with strategic project objectives",
          "Supporting evaluation and executive decision-making",
        ],
      },
      {
        heading: "Award & Post-Award Governance",
        items: [
          "Contractor onboarding",
          "Project mobilization oversight",
          "Milestone tracking",
          "Performance monitoring",
          "Contractual execution oversight",
          "Executive progress reporting",
          "Delivery management through project completion",
        ],
      },
    ],
  },
  {
    number: "02",
    title: "Executive Advisory & High-Level Management Support",
    summary:
      "Decision support and stakeholder alignment for leadership operating under significant pressure.",
    subsections: [
      {
        heading: "Strategic Studies & Decision Support",
        items: [
          "Feasibility studies",
          "Strategic analyses",
          "Executive briefing materials",
          "Decision frameworks",
          "Risk and opportunity assessment",
          "Actionable recommendations for C-suite and government leadership",
        ],
      },
      {
        heading: "Stakeholder & Executive Coordination",
        items: [
          "Ministry officials",
          "Board members",
          "Executive directors",
          "Government entities",
          "Contractors",
          "Consultants",
          "Legal counsel",
          "External partners",
        ],
      },
    ],
    note: "The objective is unified project direction, accountability, and effective decision-making.",
  },
  {
    number: "03",
    title: "Legal Practice Support & Case Strategy Collaboration",
    summary:
      "The bridge between legal, technical, commercial, and operational intelligence for sophisticated legal teams.",
    subsections: [
      {
        heading: "Law Firm Co-Counseling / Professional Support",
        items: [
          "Case documentation",
          "Technical records",
          "Chronologies",
          "Commercial analysis",
          "Project evidence",
          "Contractual background",
          "Executive case summaries",
          "Supporting technical material",
        ],
      },
      {
        heading: "Case Diagnostics & Merit Assessment",
        items: [
          "Detailed case summaries",
          "Fact-pattern analysis",
          "Strength and vulnerability assessments",
          "Document and evidence mapping",
          "Claim background analysis",
          "Pre-litigation strategy support",
          "Arbitration strategy support",
          "Technical-commercial intelligence for external counsel",
        ],
      },
    ],
    note:
      "Summit provides strategic, technical, commercial, and case-support capabilities. Summit is not a law firm and does not act as a substitute for licensed legal counsel where legal representation is required.",
  },
  {
    number: "04",
    title: "Institutional Governance & Commercial Strategy",
    summary:
      "Navigating public institutions and protecting commercial value through disciplined risk engineering.",
    subsections: [
      {
        heading: "Public Sector Integration",
        items: [
          "Public institutions",
          "Administrative frameworks",
          "Government procedures",
          "Regulatory environments",
          "Institutional governance",
          "Public-private partnerships",
          "Multi-stakeholder environments",
        ],
      },
      {
        heading: "Commercial Strategy & Risk Engineering",
        items: [
          "Contract administration",
          "Commercial oversight",
          "Risk identification",
          "Claim management",
          "Dispute avoidance",
          "Contractual risk mitigation",
          "Performance risk assessment",
          "Asset-value protection",
          "Executive reporting",
        ],
      },
    ],
  },
];

export const lifecycle = {
  heading: "From Pre-Tender Strategy to Final Delivery",
  supporting: "One advisory relationship. Complete lifecycle visibility.",
  stages: [
    { number: "01", title: "Strategic Assessment" },
    { number: "02", title: "Pre-Tender Planning" },
    { number: "03", title: "Tender Preparation" },
    { number: "04", title: "Evaluation & Award" },
    { number: "05", title: "Mobilization" },
    { number: "06", title: "Execution & Governance" },
    { number: "07", title: "Performance Monitoring" },
    { number: "08", title: "Claims & Risk Management" },
    { number: "09", title: "Final Delivery" },
    { number: "10", title: "Post-Project Review" },
  ],
};

export const whySummit = {
  heading: "Why Summit",
  pillars: [
    {
      title: "Government-Grade Rigor",
      copy:
        "Direct experience navigating complex public-sector environments, administrative regulations, institutional structures, executive reporting, and high-level governance frameworks.",
    },
    {
      title: "Seamless Legal-Technical Bridge",
      copy:
        "The ability to synthesize complex technical, commercial, contractual, project, and operational information into clear strategic intelligence for executives and external legal counsel.",
    },
    {
      title: "360° Lifecycle Control",
      copy:
        "Turnkey guidance spanning pre-tender strategy, tender evaluation, award, mobilization, post-award execution, contract administration, project governance, and executive reporting.",
    },
    {
      title: "Executive-Level Perspective",
      copy:
        "Advice designed for people responsible for significant decisions, institutional outcomes, project value, reputational exposure, and long-term strategic performance.",
    },
  ],
};

/**
 * Executive profile — kept as data so name/title can be corrected without
 * touching component code. Name confirmed via supplied award artwork
 * (Qatar Business Law Forum, Legal Counsel of the Year, Winner 2024).
 */
export const executiveProfile = {
  name: "Soukeina Awdeh",
  title: "Founder & Lead Advisor",
  headline: "Leadership Built on Strategy, Governance & Execution",
  bio: [
    "Seasoned advisory experience spanning strategic management, public-sector environments, institutional governance, executive decision support, commercial matters, project execution, and legal-support strategy.",
    "Summit Management Consultancy was founded to bring this multidisciplinary perspective to executives, boards, and institutions navigating complex and high-stakes environments.",
  ],
};

export type RecognitionItem = {
  id: string;
  organization: string;
  category: string;
  status: "Winner" | "Shortlisted";
  year: string;
  detail: string;
  image: string;
  imageAlt: string;
};

export const recognition = {
  heading: "Recognition",
  statement: "Experience recognized across Qatar and the Middle East.",
  footer:
    "A track record shaped by high-stakes responsibility, multidisciplinary leadership and recognized professional excellence.",
};

export const collaboration = {
  heading: "Strategic Collaboration",
  subheading: "Connecting management intelligence with specialist legal expertise.",
  copy:
    "Summit Management Consultancy collaborates with Maniar Law PLLC, a Doha-based legal practice, on matters where sophisticated legal, commercial, arbitration, technical, and strategic expertise intersect.",
  copySecondary:
    "This collaboration supports multidisciplinary approaches to complex matters in Qatar, the GCC, and international contexts.",
  attribution: "In collaboration with Maniar Law PLLC",
  ctaLabel: "Visit Maniar Law",
  url: "https://maniarlaw.com/",
};

export const whoWeAdvise = {
  heading: "Who We Advise",
  supporting:
    "Designed for environments where decisions carry significant commercial, institutional, contractual and reputational consequences.",
  groups: [
    "Government Entities",
    "Public Institutions",
    "Boards & Executive Leadership",
    "C-Suite Executives",
    "Project Owners",
    "Developers",
    "Institutional Stakeholders",
    "Corporate Leadership",
    "External Legal Counsel",
    "International Law Firms",
    "Contractors & Project Participants",
  ],
};

export const industries = {
  heading: "Operating Across Complex Environments",
  items: [
    "Government & Public Sector",
    "Infrastructure & Major Projects",
    "Institutional Governance",
    "Commercial & Contractual Matters",
    "Procurement & Tendering",
    "Construction / Project Delivery",
    "Dispute & Claim Strategy",
    "Arbitration Support",
    "Public-Private Partnerships",
    "Executive Transformation",
  ],
};

export const principles = [
  { title: "Clarity", copy: "Complexity translated into decisive direction." },
  { title: "Control", copy: "Visibility across every stage of execution." },
  { title: "Alignment", copy: "Stakeholders moving toward one strategic objective." },
  { title: "Outcome", copy: "Advice measured by real institutional and commercial results." },
];

export const statement = {
  quote:
    "Empowering visionary organizations to reach their summit through expert strategy and leadership, creating clear roadmaps to sustainable excellence.",
};

export const consultation = {
  heading: "Discuss Your Strategic Priorities",
  copy:
    "Whether the challenge involves executive decision-making, project delivery, tender strategy, governance, commercial risk, claims, or legal-support coordination, Summit provides senior-level perspective from strategy through execution.",
  ctaLabel: "Request a Confidential Consultation",
};

export const askQuestion = {
  heading: "Ask a Question",
  copy:
    "Have a specific question rather than a full consultation? Send it through and a member of Summit Management Consultancy will reply directly by email.",
  ctaLabel: "Submit Your Question",
};

export const areasOfInterest = [
  "Strategic Advisory",
  "Project Management",
  "Tender / Procurement Advisory",
  "Executive Decision Support",
  "Contract & Commercial Strategy",
  "Claims / Dispute Support",
  "Legal Practice Support",
  "Government / Institutional Advisory",
  "Other",
];

/**
 * Contact details. Only fields explicitly verified by the practice should be
 * populated — an unset field renders nothing rather than a placeholder value,
 * so we never display invented addresses, numbers, or emails.
 */
export const contact = {
  city: "Doha, Qatar",
  address: undefined as string | undefined,
  phones: ["+974 5595 1904", "+974 6667 8241"] as string[],
  email: "soukayna.awdeh@summit-smc.com" as string | undefined,
  hours: undefined as string | undefined,
  mapUrl: undefined as string | undefined,
};

export const footerNav = [
  { label: "About", to: "/about" },
  { label: "Expertise", to: "/expertise" },
  { label: "Project Lifecycle", to: "/project-lifecycle" },
  { label: "Legal Support", to: "/legal-support" },
  { label: "Recognition", to: "/recognition" },
  { label: "Collaboration", to: "/collaboration" },
  { label: "Contact", to: "/contact" },
  { label: "Ask a Question", to: "/ask-a-question" },
  { label: "Privacy", to: "/privacy" },
];

export const seo = {
  home: {
    title: "Summit Management Consultancy | Strategic Advisory & Project Management — Qatar",
    description:
      "Executive strategic advisory, project lifecycle management, government and institutional consulting, commercial strategy, and legal-support expertise in Qatar and the GCC.",
  },
  about: {
    title: "About Summit | Executive Advisory Practice — Qatar",
    description:
      "Summit Management Consultancy is an elite advisory practice led by seasoned advisors with extensive public-sector and government experience.",
  },
  expertise: {
    title: "Advisory Expertise | Summit Management Consultancy",
    description:
      "Strategic project management, executive advisory, legal practice support, and institutional governance under one integrated advisory framework.",
  },
  projectLifecycle: {
    title: "Project Lifecycle Management | Summit Management Consultancy",
    description:
      "Complete project lifecycle visibility — from pre-tender strategy through award, mobilization, execution, and post-project review.",
  },
  legalSupport: {
    title: "Legal Practice Support | Summit Management Consultancy",
    description:
      "Strategic, technical, and commercial case-support capabilities for sophisticated legal teams — the bridge between legal, technical, and commercial intelligence.",
  },
  recognition: {
    title: "Recognition & Awards | Summit Management Consultancy",
    description: "Professional recognition across Qatar and the Middle East legal and business community.",
  },
  collaboration: {
    title: "Strategic Collaboration | Summit Management Consultancy",
    description: "Summit Management Consultancy's professional collaboration with Maniar Law PLLC, Doha.",
  },
  contact: {
    title: "Contact | Summit Management Consultancy",
    description: "Request a confidential consultation with Summit Management Consultancy in Doha, Qatar.",
  },
  askQuestion: {
    title: "Ask a Question | Summit Management Consultancy",
    description: "Send a specific question to Summit Management Consultancy and receive a reply by email.",
  },
  privacy: {
    title: "Privacy | Summit Management Consultancy",
    description: "Summit Management Consultancy privacy practices.",
  },
};
