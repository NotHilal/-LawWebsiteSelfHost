/**
 * FRANÇAIS — traduction de travail (draft).
 * ⚠️  À RELIRE ET CORRIGER par la direction avant mise en ligne.
 *
 * La structure des clés est identique à content.en.ts : il suffit de remplacer
 * les valeurs texte. Ne PAS modifier :
 *   - les `to:` de `nav` / `footerNav` (routes de l'application)
 *   - les `value:` de `areasOfInterest` (identifiants stockés en base)
 *   - les `id:` de `recognition.items`
 *   - `presentationVideo.src` / `presentationVideo.poster`
 *   - le nom de marque « Summit Management Consultancy »
 */
import type { SiteContent } from "./content.en";
import { contactFacts, COLLABORATION_URL } from "../data/contact";

const fr: SiteContent = {
  brand: {
    name: "Summit Management Consultancy",
    shortName: "Summit",
    tagline: "Clarté stratégique. Confiance des dirigeants. Résultats durables.",
  },

  nav: [
    { label: "Accueil", to: "/" },
    { label: "À propos", to: "/about" },
    { label: "Expertise", to: "/expertise" },
    { label: "Cycle de projet", shortLabel: "Cycle", to: "/project-lifecycle" },
    { label: "Appui juridique stratégique", shortLabel: "Appui", to: "/legal-support" },
    { label: "Distinctions", to: "/recognition" },
    { label: "Collaboration", to: "/collaboration" },
    { label: "Contact", to: "/contact" },
  ],

  footerNav: [
    { label: "À propos", to: "/about" },
    { label: "Expertise", to: "/expertise" },
    { label: "Cycle de projet", to: "/project-lifecycle" },
    { label: "Appui juridique", to: "/legal-support" },
    { label: "Distinctions", to: "/recognition" },
    { label: "Collaboration", to: "/collaboration" },
    { label: "Contact", to: "/contact" },
    { label: "Poser une question", to: "/ask-a-question" },
    { label: "Confidentialité", to: "/privacy" },
  ],

  hero: {
    eyebrow: "STRATÉGIE  •  GOUVERNANCE  •  EXÉCUTION",
    headlineLine1: "Leadership stratégique",
    headlineLine2: "De la vision à l'exécution.",
    copy:
      "Summit Management Consultancy assure une supervision stratégique au plus haut niveau, un conseil en management, une expertise d'appui juridique et un accompagnement complet du cycle de vie des projets, au service des institutions confrontées à des environnements complexes et à fort enjeu.",
    ctaPrimary: { label: "Découvrir notre expertise", to: "/expertise" },
    ctaSecondary: { label: "Demander une consultation", to: "/contact" },
    credibilityStrip: [
      "Secteur public et gouvernemental",
      "Conseil aux dirigeants",
      "Gestion du cycle de projet",
      "Stratégie juridique et commerciale",
    ],
    portraitAlt:
      "Portrait de Soukeina Awdeh, fondatrice et conseillère principale de Summit Management Consultancy",
  },

  introduction: {
    eyebrow: "SUMMIT MANAGEMENT CONSULTANCY",
    headline: "La clarté au plus haut niveau de décision.",
    paragraphs: [
      "Summit Management Consultancy est un cabinet d'élite dirigé par des conseillers chevronnés dotés d'une solide expérience du secteur public et gouvernemental.",
      "Nous accompagnons les cadres dirigeants, les comités de direction, les conseils d'administration, les organismes institutionnels, les parties prenantes de projets et les conseils professionnels en offrant une supervision stratégique de bout en bout, un appui à la décision et l'exécution du cycle de vie des projets — de la stratégie d'appel d'offres initiale jusqu'à la livraison après attribution.",
      "Notre rôle est de transformer des questions techniques, commerciales, contractuelles, institutionnelles et opérationnelles complexes en une orientation stratégique claire.",
    ],
  },

  expertise: [
    {
      number: "01",
      title: "Gestion stratégique de projet et exécution du cycle de vie",
      summary:
        "Supervision de bout en bout, de la stratégie de pré-appel d'offres jusqu'à l'attribution, la mobilisation et la livraison.",
      subsections: [
        {
          heading: "Facilitation des phases de pré-appel d'offres et d'appel d'offres",
          items: [
            "Structuration des dossiers d'appel d'offres",
            "Évaluation des qualifications des soumissionnaires",
            "Gestion des processus de pré-attribution",
            "Conception des cadres de passation de marchés",
            "Alignement des exigences de l'appel d'offres sur les objectifs stratégiques du projet",
            "Appui à l'évaluation et à la décision de la direction",
          ],
        },
        {
          heading: "Gouvernance de l'attribution et de l'après-attribution",
          items: [
            "Intégration du titulaire du marché",
            "Supervision de la mobilisation du projet",
            "Suivi des jalons",
            "Suivi de la performance",
            "Supervision de l'exécution contractuelle",
            "Reporting d'avancement à la direction",
            "Pilotage de la livraison jusqu'à l'achèvement du projet",
          ],
        },
      ],
    },
    {
      number: "02",
      title: "Conseil aux dirigeants et appui au management de haut niveau",
      summary:
        "Appui à la décision et alignement des parties prenantes pour des dirigeants soumis à une forte pression.",
      subsections: [
        {
          heading: "Études stratégiques et appui à la décision",
          items: [
            "Études de faisabilité",
            "Analyses stratégiques",
            "Supports de briefing pour la direction",
            "Cadres de décision",
            "Évaluation des risques et des opportunités",
            "Recommandations opérationnelles pour les dirigeants et les responsables publics",
          ],
        },
        {
          heading: "Coordination des parties prenantes et des dirigeants",
          items: [
            "Responsables ministériels",
            "Membres de conseils d'administration",
            "Directeurs exécutifs",
            "Entités gouvernementales",
            "Titulaires de marchés",
            "Consultants",
            "Conseils juridiques",
            "Partenaires externes",
          ],
        },
      ],
      note: "L'objectif est une direction de projet unifiée, la responsabilisation et une prise de décision efficace.",
    },
    {
      number: "03",
      title: "Appui aux cabinets juridiques et collaboration sur la stratégie des dossiers",
      summary:
        "Le pont entre l'intelligence juridique, technique, commerciale et opérationnelle, au service des équipes juridiques exigeantes.",
      subsections: [
        {
          heading: "Co-conseil / appui professionnel aux cabinets d'avocats",
          items: [
            "Documentation des dossiers",
            "Dossiers techniques",
            "Chronologies",
            "Analyse commerciale",
            "Éléments de preuve liés au projet",
            "Contexte contractuel",
            "Synthèses de dossier pour la direction",
            "Documentation technique de soutien",
          ],
        },
        {
          heading: "Diagnostic des dossiers et évaluation du fond",
          items: [
            "Synthèses détaillées des dossiers",
            "Analyse de la matérialité des faits",
            "Évaluation des points forts et des vulnérabilités",
            "Cartographie des documents et des preuves",
            "Analyse du contexte de la réclamation",
            "Appui à la stratégie pré-contentieuse",
            "Appui à la stratégie d'arbitrage",
            "Intelligence technique et commerciale pour les conseils externes",
          ],
        },
      ],
      note: "Summit apporte des capacités stratégiques, techniques, commerciales et d'appui aux dossiers. Summit n'est pas un cabinet d'avocats et ne se substitue pas à un conseil juridique agréé lorsqu'une représentation légale est requise.",
    },
    {
      number: "04",
      title: "Gouvernance institutionnelle et stratégie commerciale",
      summary:
        "Naviguer dans les institutions publiques et protéger la valeur commerciale grâce à une ingénierie des risques rigoureuse.",
      subsections: [
        {
          heading: "Intégration au secteur public",
          items: [
            "Institutions publiques",
            "Cadres administratifs",
            "Procédures gouvernementales",
            "Environnements réglementaires",
            "Gouvernance institutionnelle",
            "Partenariats public-privé",
            "Environnements multi-parties prenantes",
          ],
        },
        {
          heading: "Stratégie commerciale et ingénierie des risques",
          items: [
            "Administration des contrats",
            "Supervision commerciale",
            "Identification des risques",
            "Gestion des réclamations",
            "Prévention des différends",
            "Atténuation des risques contractuels",
            "Évaluation des risques de performance",
            "Protection de la valeur des actifs",
            "Reporting à la direction",
          ],
        },
      ],
    },
  ],

  lifecycle: {
    heading: "De la stratégie de pré-appel d'offres à la livraison finale",
    supporting: "Une seule relation de conseil. Une visibilité complète sur le cycle de vie.",
    stages: [
      { number: "01", title: "Évaluation stratégique" },
      { number: "02", title: "Planification pré-appel d'offres" },
      { number: "03", title: "Préparation de l'appel d'offres" },
      { number: "04", title: "Évaluation et attribution" },
      { number: "05", title: "Mobilisation" },
      { number: "06", title: "Exécution et gouvernance" },
      { number: "07", title: "Suivi de la performance" },
      { number: "08", title: "Gestion des réclamations et des risques" },
      { number: "09", title: "Livraison finale" },
      { number: "10", title: "Revue de fin de projet" },
    ],
  },

  whySummit: {
    heading: "Pourquoi Summit",
    pillars: [
      {
        title: "Une rigueur de niveau gouvernemental",
        copy:
          "Une expérience directe des environnements complexes du secteur public, des réglementations administratives, des structures institutionnelles, du reporting à la direction et des cadres de gouvernance de haut niveau.",
      },
      {
        title: "Un pont fluide entre le juridique et le technique",
        copy:
          "La capacité de synthétiser des informations techniques, commerciales, contractuelles, opérationnelles et liées au projet en une intelligence stratégique claire pour les dirigeants et les conseils juridiques externes.",
      },
      {
        title: "Un contrôle du cycle de vie à 360°",
        copy:
          "Un accompagnement clé en main couvrant la stratégie de pré-appel d'offres, l'évaluation des offres, l'attribution, la mobilisation, l'exécution après attribution, l'administration des contrats, la gouvernance du projet et le reporting à la direction.",
      },
      {
        title: "Une perspective de dirigeant",
        copy:
          "Un conseil conçu pour les personnes responsables de décisions majeures, de résultats institutionnels, de la valeur des projets, de l'exposition réputationnelle et de la performance stratégique à long terme.",
      },
    ],
  },

  executiveProfile: {
    name: "Soukeina Awdeh",
    title: "Fondatrice et conseillère principale",
    headline: "Un leadership fondé sur la stratégie, la gouvernance et l'exécution",
    bio: [
      "Une expérience de conseil confirmée couvrant le management stratégique, les environnements du secteur public, la gouvernance institutionnelle, l'appui à la décision des dirigeants, les questions commerciales, l'exécution de projets et la stratégie d'appui juridique.",
      "Summit Management Consultancy a été fondé pour apporter cette perspective pluridisciplinaire aux dirigeants, aux conseils d'administration et aux institutions confrontés à des environnements complexes et à fort enjeu.",
    ],
  },

  presentationVideo: {
    eyebrow: "Un mot de notre part",
    headline: "Un conseil guidé par la responsabilité, non par le volume.",
    copy: "Une brève présentation de la manière dont Summit aborde les décisions à fort enjeu, la gouvernance institutionnelle et les dirigeants qu'il accompagne.",
    src: "/video/videoPres.mp4",
    poster: "/img/carte0.png",
    caption: "Summit Management Consultancy",
  },

  recognition: {
    heading: "Distinctions",
    statement: "Une expérience reconnue au Qatar et au Moyen-Orient.",
    footer:
      "Un parcours façonné par des responsabilités à fort enjeu, un leadership pluridisciplinaire et une excellence professionnelle reconnue.",
    items: [
      {
        id: "qatar-business-law-forum-2024",
        variant: "winner",
        organization: "Qatar Business Law Forum",
        category: "Juriste de l'année",
        status: "Lauréate",
        year: "2024",
        detail: "Soukeina Awdeh — Tadmur Holding WLL",
        imageAlt:
          "Prix du Qatar Business Law Forum — Juriste de l'année, lauréate 2024, décerné à Soukeina Awdeh, Tadmur Holding WLL",
      },
      {
        id: "lexisnexis-mena-legal-awards-2025",
        variant: "shortlisted",
        organization: "LexisNexis Middle East Legal Awards",
        category: "Équipe juridique interne de l'année",
        status: "Finaliste",
        year: "2025",
        detail: "Middle East Legal Awards — Équipe juridique interne de l'année",
        imageAlt:
          "LexisNexis Middle East Legal Awards — Finaliste 2025, Équipe juridique interne de l'année",
      },
    ],
  },

  collaboration: {
    heading: "Collaboration stratégique",
    subheading: "Relier l'intelligence du management à une expertise juridique spécialisée.",
    copy:
      "Summit Management Consultancy collabore avec Maniar Law PLLC, un cabinet juridique basé à Doha, sur les dossiers où se rejoignent une expertise juridique, commerciale, arbitrale, technique et stratégique de haut niveau.",
    copySecondary:
      "Cette collaboration soutient des approches pluridisciplinaires sur des dossiers complexes au Qatar, dans le CCG et à l'international.",
    attribution: "En collaboration avec Maniar Law PLLC",
    ctaLabel: "Visiter Maniar Law",
    url: COLLABORATION_URL,
  },

  whoWeAdvise: {
    heading: "Qui nous conseillons",
    supporting:
      "Conçu pour les environnements où les décisions emportent des conséquences commerciales, institutionnelles, contractuelles et réputationnelles importantes.",
    groups: [
      "Entités gouvernementales",
      "Institutions publiques",
      "Conseils d'administration et directions",
      "Cadres dirigeants",
      "Maîtres d'ouvrage",
      "Promoteurs",
      "Parties prenantes institutionnelles",
      "Directions d'entreprise",
      "Conseils juridiques externes",
      "Cabinets d'avocats internationaux",
      "Titulaires de marchés et intervenants de projet",
    ],
  },

  industries: {
    heading: "Une intervention dans des environnements complexes",
    items: [
      "Secteur public et gouvernemental",
      "Infrastructures et grands projets",
      "Gouvernance institutionnelle",
      "Questions commerciales et contractuelles",
      "Passation de marchés et appels d'offres",
      "Construction / livraison de projets",
      "Stratégie des différends et des réclamations",
      "Appui à l'arbitrage",
      "Partenariats public-privé",
      "Transformation des directions",
    ],
  },

  principles: [
    { title: "Clarté", copy: "La complexité traduite en une orientation décisive." },
    { title: "Contrôle", copy: "Une visibilité à chaque étape de l'exécution." },
    { title: "Alignement", copy: "Des parties prenantes tournées vers un même objectif stratégique." },
    { title: "Résultat", copy: "Un conseil mesuré à l'aune de résultats institutionnels et commerciaux réels." },
  ],

  statement: {
    quote:
      "Permettre aux organisations visionnaires d'atteindre leur sommet grâce à une stratégie et un leadership experts, en traçant des feuilles de route claires vers une excellence durable.",
  },

  consultation: {
    heading: "Parlons de vos priorités stratégiques",
    copy:
      "Qu'il s'agisse de décision au niveau de la direction, de livraison de projet, de stratégie d'appel d'offres, de gouvernance, de risque commercial, de réclamations ou de coordination de l'appui juridique, Summit apporte une perspective de haut niveau, de la stratégie jusqu'à l'exécution.",
    ctaLabel: "Demander une consultation confidentielle",
  },

  askQuestion: {
    heading: "Poser une question",
    copy:
      "Vous avez une question précise plutôt qu'une consultation complète ? Envoyez-la et un membre de Summit Management Consultancy vous répondra directement par e-mail.",
    ctaLabel: "Envoyer votre question",
  },

  areasOfInterest: [
    { value: "Strategic Advisory", label: "Conseil stratégique" },
    { value: "Project Management", label: "Gestion de projet" },
    { value: "Tender / Procurement Advisory", label: "Conseil en appels d'offres / passation de marchés" },
    { value: "Executive Decision Support", label: "Appui à la décision des dirigeants" },
    { value: "Contract & Commercial Strategy", label: "Stratégie contractuelle et commerciale" },
    { value: "Claims / Dispute Support", label: "Appui aux réclamations / différends" },
    { value: "Legal Practice Support", label: "Appui aux cabinets juridiques" },
    { value: "Government / Institutional Advisory", label: "Conseil gouvernemental / institutionnel" },
    { value: "Other", label: "Autre" },
  ],

  contact: {
    ...contactFacts,
    city: "Doha, Qatar",
  },

  seo: {
    home: {
      title: "Summit Management Consultancy | Conseil stratégique et gestion de projet — Qatar",
      description:
        "Conseil stratégique aux dirigeants, gestion du cycle de vie des projets, conseil gouvernemental et institutionnel, stratégie commerciale et expertise d'appui juridique au Qatar et dans le CCG.",
    },
    about: {
      title: "À propos de Summit | Cabinet de conseil aux dirigeants — Qatar",
      description:
        "Summit Management Consultancy est un cabinet de conseil d'élite dirigé par des conseillers chevronnés dotés d'une solide expérience du secteur public et gouvernemental.",
    },
    expertise: {
      title: "Expertise de conseil | Summit Management Consultancy",
      description:
        "Gestion stratégique de projet, conseil aux dirigeants, appui aux cabinets juridiques et gouvernance institutionnelle au sein d'un cadre de conseil intégré.",
    },
    projectLifecycle: {
      title: "Gestion du cycle de vie des projets | Summit Management Consultancy",
      description:
        "Une visibilité complète sur le cycle de vie des projets — de la stratégie de pré-appel d'offres à l'attribution, la mobilisation, l'exécution et la revue de fin de projet.",
    },
    legalSupport: {
      title: "Appui aux cabinets juridiques | Summit Management Consultancy",
      description:
        "Des capacités stratégiques, techniques et commerciales d'appui aux dossiers pour les équipes juridiques exigeantes — le pont entre l'intelligence juridique, technique et commerciale.",
    },
    recognition: {
      title: "Distinctions et prix | Summit Management Consultancy",
      description: "Une reconnaissance professionnelle au sein de la communauté juridique et économique du Qatar et du Moyen-Orient.",
    },
    collaboration: {
      title: "Collaboration stratégique | Summit Management Consultancy",
      description: "La collaboration professionnelle de Summit Management Consultancy avec Maniar Law PLLC, Doha.",
    },
    contact: {
      title: "Contact | Summit Management Consultancy",
      description: "Demandez une consultation confidentielle à Summit Management Consultancy, à Doha, Qatar.",
    },
    askQuestion: {
      title: "Poser une question | Summit Management Consultancy",
      description: "Envoyez une question précise à Summit Management Consultancy et recevez une réponse par e-mail.",
    },
    privacy: {
      title: "Confidentialité | Summit Management Consultancy",
      description: "Les pratiques de confidentialité de Summit Management Consultancy.",
    },
  },

  pages: {
    about: {
      eyebrow: "À propos de Summit",
      title: "Un cabinet d'élite bâti sur l'expérience du secteur public et de la direction.",
    },
    expertise: {
      eyebrow: "Expertise de conseil",
      title: "Stratégie, exécution et gouvernance au sein d'un même cadre.",
      copy: "Quatre compétences intégrées couvrant la gestion du cycle de vie des projets, le conseil aux dirigeants, l'appui aux cabinets juridiques et la gouvernance institutionnelle.",
    },
    projectLifecycle: {
      eyebrow: "Cycle de projet",
      title: "Une visibilité complète sur le cycle de vie, de la stratégie à la livraison.",
      copy: "Une seule relation de conseil couvrant dix étapes — de l'évaluation stratégique initiale à la revue de fin de projet.",
    },
    legalSupport: {
      eyebrow: "Appui juridique stratégique",
    },
    recognition: {
      eyebrow: "Distinctions",
      title: "Une reconnaissance professionnelle, gagnée par des responsabilités à fort enjeu.",
      copy: "Un regard sur les prix et sélections qui reflètent le parcours professionnel de la conseillère principale.",
    },
    collaboration: {
      eyebrow: "Collaboration stratégique",
      title: "Relier l'intelligence du management à une expertise juridique spécialisée.",
      copy: "Summit Management Consultancy travaille aux côtés de partenaires juridiques de confiance sur les dossiers où se rejoignent une expertise juridique, commerciale, arbitrale, technique et stratégique de haut niveau.",
    },
    contact: {
      eyebrow: "Contact",
    },
    askQuestion: {
      eyebrow: "Poser une question",
    },
    privacy: {
      eyebrow: "Confidentialité",
      title: "Pratiques de confidentialité",
      copy: "Comment Summit Management Consultancy traite les informations partagées via ce site web.",
      sections: [
        {
          heading: "Informations que nous collectons",
          body: "Lorsque vous soumettez une demande de consultation, nous collectons les informations que vous fournissez directement — notamment votre nom, votre organisation, votre fonction, votre adresse e-mail, votre numéro de téléphone, votre domaine d'intérêt et le contenu de votre message.",
        },
        {
          heading: "Comment nous utilisons vos informations",
          body: "Les informations soumises via notre formulaire de consultation sont utilisées uniquement pour répondre à votre demande et, lorsqu'une relation de travail s'ensuit, pour administrer cette mission. Nous ne vendons ni ne louons de données personnelles à des tiers.",
        },
        {
          heading: "Confidentialité",
          body: "Les demandes sont traitées avec la même discrétion que celle attendue d'un cabinet de conseil aux dirigeants. Les informations que vous nous communiquez sont traitées de manière confidentielle, en cohérence avec la sensibilité des dossiers que nous accompagnons.",
        },
        {
          heading: "Conservation des données",
          body: "Nous conservons les informations relatives aux demandes uniquement pendant la durée raisonnablement nécessaire pour répondre à votre demande ou, lorsqu'une mission formelle s'ensuit, conformément aux conditions de cette mission.",
        },
        {
          heading: "Contact",
          body: "Toute question relative à la présente politique de confidentialité peut être adressée à Summit Management Consultancy via le formulaire de consultation de notre page Contact.",
        },
      ],
    },
  },

  ui: {
    langName: "Français",
    navCta: {
      askQuestion: "Poser une question",
      requestConsultation: "Demander une consultation",
    },
    footer: {
      contactHeading: "Contact",
      collaborationHeading: "Collaboration professionnelle",
      rights: "Tous droits réservés.",
    },
    sectionLabels: {
      industries: "Secteurs et environnements",
      integratedExpertise: "Une expertise de conseil intégrée",
      integratedExpertiseHeadline:
        "Stratégie, exécution et gouvernance au sein d'un même cadre de conseil.",
      whySummit: "Pourquoi Summit",
      leadership: "Direction",
      projectLifecycle: "Cycle de projet",
      getInTouch: "Nous contacter",
    },
    common: {
      skipToContent: "Aller au contenu",
      backToHome: "Retour à l'accueil",
    },
    legalBridge: {
      nodes: ["Juridique", "Technique", "Commercial", "Opérationnel"],
    },
    lifecycle: {
      scrollHint: "Faites défiler horizontalement pour voir toutes les étapes",
    },
    businessCard: {
      open: "Obtenir ma carte",
      drag: "Faites glisser la carte pour la retourner",
      flip: "Retourner la carte",
      dialogLabel: "Carte de visite numérique",
      close: "Fermer la carte",
      frontAlt: "Carte de visite de Summit Management Consultancy — recto",
      backAlt:
        "Carte de visite de Summit Management Consultancy — verso, avec les coordonnées de Soukeina Awdeh, directrice générale",
    },
    contactPage: {
      confidentialityNote:
        "Toutes les demandes sont traitées de manière confidentielle. Un membre de Summit Management Consultancy vous répondra directement.",
    },
    askPage: {
      preferConsultation: "Vous préférez une consultation complète ?",
      requestHere: "Demandez-en une ici",
    },
    forms: {
      labels: {
        fullName: "Nom complet",
        name: "Nom",
        organization: "Organisation",
        title: "Fonction / poste",
        email: "E-mail",
        phone: "Téléphone",
        interest: "Domaine d'intérêt",
        message: "Message",
        question: "Votre question",
      },
      consentConsultation:
        "Je consens à ce que Summit Management Consultancy traite les informations fournies afin de répondre à cette demande, conformément aux pratiques de confidentialité du cabinet.",
      consentQuestion:
        "Je consens à ce que Summit Management Consultancy traite les informations fournies afin de répondre à cette question, conformément aux pratiques de confidentialité du cabinet.",
      validation: {
        nameRequired: "Le nom complet est obligatoire.",
        nameRequiredShort: "Le nom est obligatoire.",
        emailRequired: "L'e-mail est obligatoire.",
        emailInvalid: "Saisissez une adresse e-mail valide.",
        messageRequired: "Merci de partager un bref message.",
        questionRequired: "Merci de partager votre question.",
        consentRequired: "Le consentement est requis pour envoyer ce formulaire.",
      },
      success: {
        title: "Merci.",
        consultationBody:
          "Votre demande a bien été reçue. Un membre de Summit Management Consultancy vous recontactera directement et en toute confidentialité.",
        questionBody:
          "Votre question a bien été reçue. Un membre de Summit Management Consultancy vous répondra par e-mail.",
      },
      error: {
        consultation:
          "Une erreur est survenue lors de l'envoi de votre demande. Merci de réessayer, ou de nous contacter directement.",
        question:
          "Une erreur est survenue lors de l'envoi de votre question. Merci de réessayer, ou de nous contacter directement.",
      },
      submit: {
        consultation: "Demander une consultation confidentielle",
        question: "Envoyer votre question",
        sending: "Envoi",
      },
    },
    chat: {
      title: "Assistant Summit",
      subtitle: "Demandes générales",
      greeting:
        "Bonjour, je suis l'assistant Summit. Posez-moi vos questions sur nos domaines d'intervention ou sur la façon de prendre rendez-vous pour une consultation. Je ne suis pas juriste et ne peux pas donner de conseil juridique.",
      placeholder: "Écrivez un message…",
      pickerPrompt: "Choisissez la catégorie qui correspond le mieux à votre demande",
      typing: "En train d'écrire…",
      error: "Impossible de joindre l'assistant. Merci de réessayer dans un instant.",
      openAria: "Ouvrir la discussion",
      closeAria: "Fermer la discussion",
      sendAria: "Envoyer le message",
      dismissOptionsAria: "Masquer les catégories",
      askQuestionLink: "Poser une question",
    },
    admin: {
      backToHome: "Retour à l'accueil",
      label: "Admin",
      loginTitle: "Demandes des clients",
      email: "E-mail",
      password: "Mot de passe",
      signIn: "Se connecter",
      signingIn: "Connexion",
      loginFailed: "Échec de la connexion",
      requestsTitle: "Demandes des clients",
      questionsTitle: "Questions",
      tabRequests: "Demandes",
      tabQuestions: "Questions",
      logOut: "Se déconnecter",
      loading: "Chargement…",
      loadError: "Impossible de charger les demandes.",
      total: "au total",
      unread: "non lues",
      searchPlaceholder: "Rechercher un nom, un e-mail, un message…",
      filterAll: "Toutes",
      filterUnread: "Non lues",
      noRequests: "Aucune demande pour l'instant.",
      noQuestions: "Aucune question pour l'instant.",
      noMatches: "Aucun résultat.",
      selectPrompt: "Sélectionnez une demande pour voir les détails.",
      back: "Retour",
      markRead: "Marquer comme lu",
      markUnread: "Marquer comme non lu",
      deleteRequest: "Supprimer la demande",
      replyByEmail: "Répondre par e-mail",
      deleteConfirmRequest: "Supprimer cette demande ?",
      deleteConfirmQuestion: "Supprimer cette question ?",
      deleteFrom: "De la part de",
      deleteIrreversible: "Cette action est irréversible.",
      cancel: "Annuler",
      delete: "Supprimer",
      deleting: "Suppression",
      justNow: "à l'instant",
    },
  },
};

export default fr;
