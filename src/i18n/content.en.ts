/**
 * English — the canonical dictionary. `SiteContent` (the shape every other
 * language must match) is derived from this file, so keep it complete and keep
 * every value a plain string / string[] (no `as const`) unless a wider type is
 * explicitly annotated.
 *
 * Components read this through `useContent()` (src/i18n/useContent.ts) rather
 * than importing it directly, so switching languages re-renders them.
 */
import type { ExpertiseGroup, RecognitionText } from "./types";
import { contactFacts, COLLABORATION_URL } from "../data/contact";

const en = {
  brand: {
    name: "Summit Management Consultancy",
    shortName: "Summit",
    tagline: "Strategic clarity. Executive confidence. Sustainable outcomes.",
  },

  nav: [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Expertise", to: "/expertise" },
    { label: "Project Lifecycle", shortLabel: "Lifecycle", to: "/project-lifecycle" },
    { label: "Legal Advisory Support", shortLabel: "Advisory", to: "/legal-support" },
    { label: "Recognition", to: "/recognition" },
    { label: "Collaboration", to: "/collaboration" },
    { label: "Contact", to: "/contact" },
  ] as { label: string; to: string; shortLabel?: string }[],

  footerNav: [
    { label: "About", to: "/about" },
    { label: "Expertise", to: "/expertise" },
    { label: "Project Lifecycle", to: "/project-lifecycle" },
    { label: "Legal Support", to: "/legal-support" },
    { label: "Recognition", to: "/recognition" },
    { label: "Collaboration", to: "/collaboration" },
    { label: "Contact", to: "/contact" },
    { label: "Ask a Question", to: "/ask-a-question" },
    { label: "Privacy", to: "/privacy" },
  ] as { label: string; to: string }[],

  hero: {
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
    portraitAlt:
      "Portrait of Soukeina Awdeh, Founder and Lead Advisor at Summit Management Consultancy",
  },

  introduction: {
    eyebrow: "SUMMIT MANAGEMENT CONSULTANCY",
    headline: "Clarity at the highest level of decision-making.",
    paragraphs: [
      "Summit Management Consultancy is an elite practice led by seasoned advisors with extensive public-sector and government experience.",
      "We partner with senior executives, C-suite leaders, boards, institutional bodies, project stakeholders, and professional advisors to provide end-to-end strategic oversight, executive decision support, and project lifecycle execution — from initial tender strategy through post-award delivery.",
      "Our role is to transform complex technical, commercial, contractual, institutional, and operational matters into clear strategic direction.",
    ],
  },

  expertise: [
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
      note: "Summit provides strategic, technical, commercial, and case-support capabilities. Summit is not a law firm and does not act as a substitute for licensed legal counsel where legal representation is required.",
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
  ] as ExpertiseGroup[],

  lifecycle: {
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
  },

  whySummit: {
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
  },

  executiveProfile: {
    name: "Soukeina Awdeh",
    title: "Founder & Lead Advisor",
    headline: "Leadership Built on Strategy, Governance & Execution",
    bio: [
      "Seasoned advisory experience spanning strategic management, public-sector environments, institutional governance, executive decision support, commercial matters, project execution, and legal-support strategy.",
      "Summit Management Consultancy was founded to bring this multidisciplinary perspective to executives, boards, and institutions navigating complex and high-stakes environments.",
    ],
  },

  presentationVideo: {
    eyebrow: "A Word From Us",
    headline: "Advisory shaped by responsibility, not volume.",
    copy: "A short introduction to how Summit approaches high-stakes decisions, institutional governance, and the executives it serves.",
    src: "/video/videoPres.mp4",
    poster: "/img/carte0.png",
    caption: "Summit Management Consultancy",
  },

  recognition: {
    heading: "Recognition",
    statement: "Experience recognized across Qatar and the Middle East.",
    footer:
      "A track record shaped by high-stakes responsibility, multidisciplinary leadership and recognized professional excellence.",
    items: [
      {
        id: "qatar-business-law-forum-2024",
        variant: "winner",
        organization: "Qatar Business Law Forum",
        category: "Legal Counsel of the Year",
        status: "Winner",
        year: "2024",
        detail: "Soukeina Awdeh — Tadmur Holding WLL",
        imageAlt:
          "Qatar Business Law Forum award — Legal Counsel of the Year, Winner 2024, presented to Soukeina Awdeh, Tadmur Holding WLL",
      },
      {
        id: "lexisnexis-mena-legal-awards-2025",
        variant: "shortlisted",
        organization: "LexisNexis Middle East Legal Awards",
        category: "In-House Team of the Year",
        status: "Shortlisted",
        year: "2025",
        detail: "Middle East Legal Awards — In-House Team of the Year",
        imageAlt:
          "LexisNexis Middle East Legal Awards — Shortlisted 2025, In-House Team of the Year",
      },
    ] as RecognitionText[],
  },

  collaboration: {
    heading: "Strategic Collaboration",
    subheading: "Connecting management intelligence with specialist legal expertise.",
    copy:
      "Summit Management Consultancy collaborates with Maniar Law PLLC, a Doha-based legal practice, on matters where sophisticated legal, commercial, arbitration, technical, and strategic expertise intersect.",
    copySecondary:
      "This collaboration supports multidisciplinary approaches to complex matters in Qatar, the GCC, and international contexts.",
    attribution: "In collaboration with Maniar Law PLLC",
    ctaLabel: "Visit Maniar Law",
    url: COLLABORATION_URL,
  },

  whoWeAdvise: {
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
  },

  industries: {
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
  },

  principles: [
    { title: "Clarity", copy: "Complexity translated into decisive direction." },
    { title: "Control", copy: "Visibility across every stage of execution." },
    { title: "Alignment", copy: "Stakeholders moving toward one strategic objective." },
    { title: "Outcome", copy: "Advice measured by real institutional and commercial results." },
  ],

  statement: {
    quote:
      "Empowering visionary organizations to reach their summit through expert strategy and leadership, creating clear roadmaps to sustainable excellence.",
  },

  consultation: {
    heading: "Discuss Your Strategic Priorities",
    copy:
      "Whether the challenge involves executive decision-making, project delivery, tender strategy, governance, commercial risk, claims, or legal-support coordination, Summit provides senior-level perspective from strategy through execution.",
    ctaLabel: "Request a Confidential Consultation",
  },

  askQuestion: {
    heading: "Ask a Question",
    copy:
      "Have a specific question rather than a full consultation? Send it through and a member of Summit Management Consultancy will reply directly by email.",
    ctaLabel: "Submit Your Question",
  },

  /**
   * `value` is the canonical (English) identifier stored in the database and
   * used by the chatbot's function-calling enum; `label` is what the visitor
   * sees. Keep `value` identical across every language.
   */
  areasOfInterest: [
    { value: "Strategic Advisory", label: "Strategic Advisory" },
    { value: "Project Management", label: "Project Management" },
    { value: "Tender / Procurement Advisory", label: "Tender / Procurement Advisory" },
    { value: "Executive Decision Support", label: "Executive Decision Support" },
    { value: "Contract & Commercial Strategy", label: "Contract & Commercial Strategy" },
    { value: "Claims / Dispute Support", label: "Claims / Dispute Support" },
    { value: "Legal Practice Support", label: "Legal Practice Support" },
    { value: "Government / Institutional Advisory", label: "Government / Institutional Advisory" },
    { value: "Other", label: "Other" },
  ] as { value: string; label: string }[],

  contact: {
    ...contactFacts,
    city: "Doha, Qatar",
  },

  seo: {
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
  },

  /** Page-header (hero) blocks for interior pages. */
  pages: {
    about: {
      eyebrow: "About Summit",
      title: "An elite practice built on public-sector and executive experience.",
    },
    expertise: {
      eyebrow: "Advisory Expertise",
      title: "Strategy, execution and governance under one framework.",
      copy: "Four integrated capabilities spanning project lifecycle management, executive advisory, legal practice support, and institutional governance.",
    },
    projectLifecycle: {
      eyebrow: "Project Lifecycle",
      title: "Complete lifecycle visibility, from strategy to delivery.",
      copy: "A single advisory relationship spanning ten stages — from initial strategic assessment through post-project review.",
    },
    legalSupport: {
      eyebrow: "Legal Advisory Support",
    },
    recognition: {
      eyebrow: "Recognition",
      title: "Professional recognition, earned through high-stakes responsibility.",
      copy: "A closer look at the awards and shortlists reflecting the lead advisor's professional track record.",
    },
    collaboration: {
      eyebrow: "Strategic Collaboration",
      title: "Connecting management intelligence with specialist legal expertise.",
      copy: "Summit Management Consultancy works alongside trusted legal partners on matters where sophisticated legal, commercial, arbitration, technical, and strategic expertise intersect.",
    },
    contact: {
      eyebrow: "Contact",
    },
    askQuestion: {
      eyebrow: "Ask a Question",
    },
    privacy: {
      eyebrow: "Privacy",
      title: "Privacy Practices",
      copy: "How Summit Management Consultancy handles information shared through this website.",
      sections: [
        {
          heading: "Information We Collect",
          body: "When you submit a consultation request, we collect the information you provide directly — including your name, organization, position, email address, phone number, area of interest, and message content.",
        },
        {
          heading: "How We Use Your Information",
          body: "Information submitted through our consultation form is used solely to respond to your enquiry and, where a working relationship follows, to administer that engagement. We do not sell or rent personal information to third parties.",
        },
        {
          heading: "Confidentiality",
          body: "Enquiries are treated with the same discretion expected of an executive advisory practice. Details shared with us are handled on a confidential basis, consistent with the sensitivity of the matters we support.",
        },
        {
          heading: "Data Retention",
          body: "We retain enquiry information only for as long as reasonably necessary to respond to your request or, where a formal engagement follows, in accordance with that engagement's terms.",
        },
        {
          heading: "Contact",
          body: "Questions about this privacy notice may be directed to Summit Management Consultancy through the consultation form on our Contact page.",
        },
      ],
    },
  },

  /** Interface strings that are not editorial "content". */
  ui: {
    langName: "English",
    navCta: {
      askQuestion: "Ask a Question",
      requestConsultation: "Request a Consultation",
    },
    footer: {
      contactHeading: "Contact",
      collaborationHeading: "Professional collaboration",
      rights: "All rights reserved.",
    },
    sectionLabels: {
      industries: "Industries & Environments",
      integratedExpertise: "Integrated Advisory Expertise",
      integratedExpertiseHeadline:
        "Strategy, execution and governance under one advisory framework.",
      whySummit: "Why Summit",
      leadership: "Leadership",
      projectLifecycle: "Project Lifecycle",
      getInTouch: "Get in touch",
    },
    common: {
      skipToContent: "Skip to content",
      backToHome: "Back to Homepage",
    },
    legalBridge: {
      nodes: ["Legal", "Technical", "Commercial", "Operational"],
    },
    lifecycle: {
      scrollHint: "Scroll horizontally to view all stages",
    },
    businessCard: {
      open: "Get My Card",
      drag: "Drag the card to turn it around",
      flip: "Flip card",
      dialogLabel: "Digital business card",
      close: "Close card",
      frontAlt: "Summit Management Consultancy business card — front",
      backAlt:
        "Summit Management Consultancy business card — back, with contact details for Soukeina Awdeh, Managing Director",
    },
    contactPage: {
      confidentialityNote:
        "All enquiries are treated in confidence. A member of Summit Management Consultancy will respond directly.",
    },
    askPage: {
      preferConsultation: "Prefer a full consultation instead?",
      requestHere: "Request one here",
    },
    forms: {
      labels: {
        fullName: "Full Name",
        name: "Name",
        organization: "Organization",
        title: "Position / Title",
        email: "Email",
        phone: "Phone",
        interest: "Area of Interest",
        message: "Message",
        question: "Your Question",
      },
      consentConsultation:
        "I consent to Summit Management Consultancy processing the information provided in order to respond to this enquiry, in accordance with the practice's privacy practices.",
      consentQuestion:
        "I consent to Summit Management Consultancy processing the information provided in order to respond to this question, in accordance with the practice's privacy practices.",
      validation: {
        nameRequired: "Full name is required.",
        nameRequiredShort: "Name is required.",
        emailRequired: "Email is required.",
        emailInvalid: "Enter a valid email address.",
        messageRequired: "Please share a brief message.",
        questionRequired: "Please share your question.",
        consentRequired: "Consent is required to submit this form.",
      },
      success: {
        title: "Thank you.",
        consultationBody:
          "Your request has been received. A member of Summit Management Consultancy will follow up directly and in confidence.",
        questionBody:
          "Your question has been received. A member of Summit Management Consultancy will reply by email.",
      },
      error: {
        consultation:
          "Something went wrong sending your request. Please try again, or reach out directly.",
        question:
          "Something went wrong sending your question. Please try again, or reach out directly.",
      },
      submit: {
        consultation: "Request a Confidential Consultation",
        question: "Submit Your Question",
        sending: "Sending",
      },
    },
    chat: {
      title: "Summit Assistant",
      subtitle: "General inquiries",
      greeting:
        "Hello, I'm the Summit assistant. Ask me about our practice areas or how to book a consultation. I'm not a lawyer and can't give legal advice.",
      placeholder: "Type a message…",
      pickerPrompt: "Choose the category that matches most your request",
      typing: "Typing…",
      error: "Couldn't reach the assistant. Please try again in a moment.",
      openAria: "Open chat",
      closeAria: "Close chat",
      sendAria: "Send message",
      dismissOptionsAria: "Dismiss category options",
      askQuestionLink: "Ask a Question",
    },
    admin: {
      backToHome: "Back to Homepage",
      label: "Admin",
      loginTitle: "Client Requests",
      email: "Email",
      password: "Password",
      signIn: "Sign In",
      signingIn: "Signing in",
      loginFailed: "Login failed",
      requestsTitle: "Client Requests",
      questionsTitle: "Questions",
      tabRequests: "Requests",
      tabQuestions: "Questions",
      logOut: "Log Out",
      loading: "Loading…",
      loadError: "Couldn't load requests.",
      total: "total",
      unread: "unread",
      searchPlaceholder: "Search name, email, message…",
      filterAll: "All",
      filterUnread: "Unread",
      noRequests: "No requests yet.",
      noQuestions: "No questions yet.",
      noMatches: "No matches.",
      selectPrompt: "Select a request to view details.",
      back: "Back",
      markRead: "Mark read",
      markUnread: "Mark unread",
      deleteRequest: "Delete request",
      replyByEmail: "Reply by Email",
      deleteConfirmRequest: "Delete this request?",
      deleteConfirmQuestion: "Delete this question?",
      deleteFrom: "From",
      deleteIrreversible: "This can't be undone.",
      cancel: "Cancel",
      delete: "Delete",
      deleting: "Deleting",
      justNow: "just now",
    },
  },
};

export type SiteContent = typeof en;

export default en;
