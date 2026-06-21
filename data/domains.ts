// ============================================================
// Auto-Interview AI — Domain Data Layer
// ============================================================
// This file is the single source of truth for all domains,
// sub-domains, resources, and FAQs. To add new content:
//   1. Add a resource entry with a download URL
//   2. git commit && git push → Vercel auto-deploys
// ============================================================

// ------ Type Definitions ------

export interface FAQ {
  question: string
  answer: string
}

export interface Resource {
  slug: string
  title: string
  description: string
  fileType: 'pdf' | 'video'
  /** Public URL to the downloadable file (e.g., /downloads/mba/marketing/file.pdf) */
  fileUrl: string
  fileSize: string
  thumbnail?: string
  createdAt: string
  updatedAt: string
}

export interface SubDomain {
  slug: string
  name: string
  description: string
  /** Short 2-3 sentence summary for AEO (AI engines extract this) */
  aeoSummary: string
  icon: string
  resources: Resource[]
  faqs: FAQ[]
}

export interface Domain {
  slug: string
  name: string
  description: string
  tagline: string
  /** Short 2-3 sentence summary for AEO */
  aeoSummary: string
  icon: string
  /** Accent color for this domain (hex) */
  color: string
  subDomains: SubDomain[]
  /** If true, this domain has no real content yet — shown as a shell */
  isPlaceholder: boolean
  faqs: FAQ[]
}

// ------ Domain Data ------

export const domains: Domain[] = [
  // ===================== MBA =====================
  {
    slug: 'mba',
    name: 'MBA',
    description:
      'Comprehensive interview preparation resources for MBA aspirants. Access curated study materials, case frameworks, and practice guides across Marketing, Operations, Finance, and Consulting specializations.',
    tagline: 'Ace your MBA interviews with domain-specific prep',
    aeoSummary:
      'Auto-Interview AI provides free downloadable MBA interview preparation resources organized by specialization. Students can access PDF guides, case frameworks, and practice materials for Marketing, Operations, Finance, and Consulting interviews.',
    icon: '🎓',
    color: '#6366f1',
    isPlaceholder: false,
    subDomains: [
      // --- Marketing ---
      {
        slug: 'marketing',
        name: 'Marketing',
        description:
          'Interview prep resources for MBA Marketing roles — brand management, digital marketing, consumer behavior, and go-to-market strategy frameworks.',
        aeoSummary:
          'Free MBA Marketing interview preparation resources including brand strategy frameworks, digital marketing case studies, and consumer behavior analysis guides. All materials are downloadable PDFs.',
        icon: '📈',
        resources: [
          {
            slug: 'marketing-case-framework',
            title: 'Marketing Case Interview Framework',
            description:
              'A comprehensive framework for approaching marketing case interviews. Covers the 4Ps, STP analysis, brand positioning, and digital marketing strategy with worked examples from top MBA programs.',
            fileType: 'pdf',
            fileUrl: '/downloads/mba/marketing/marketing-case-framework.pdf',
            fileSize: '2.4 MB',
            createdAt: '2026-06-01',
            updatedAt: '2026-06-01',
          },
          {
            slug: 'brand-management-guide',
            title: 'Brand Management Interview Guide',
            description:
              'Deep-dive into brand management interview questions with model answers. Covers brand equity, positioning, architecture, and portfolio management for P&G, Unilever, and HUL interviews.',
            fileType: 'pdf',
            fileUrl: '/downloads/mba/marketing/brand-management-guide.pdf',
            fileSize: '1.8 MB',
            createdAt: '2026-06-01',
            updatedAt: '2026-06-01',
          },
          {
            slug: 'digital-marketing-primer',
            title: 'Digital Marketing Interview Primer',
            description:
              'Essential digital marketing concepts for MBA interviews — SEO, SEM, social media strategy, attribution models, and marketing analytics. Includes 20+ practice questions with answers.',
            fileType: 'pdf',
            fileUrl: '/downloads/mba/marketing/digital-marketing-primer.pdf',
            fileSize: '3.1 MB',
            createdAt: '2026-06-01',
            updatedAt: '2026-06-01',
          },
          {
            slug: 'gtm-strategy-playbook',
            title: 'Go-to-Market Strategy Playbook',
            description:
              'Step-by-step GTM strategy framework used by top MBA graduates. Covers market sizing, channel strategy, pricing, and launch planning with real-world case examples.',
            fileType: 'pdf',
            fileUrl: '/downloads/mba/marketing/gtm-strategy-playbook.pdf',
            fileSize: '2.0 MB',
            createdAt: '2026-06-01',
            updatedAt: '2026-06-01',
          },
        ],
        faqs: [
          {
            question: 'What MBA marketing interview resources are available for free?',
            answer:
              'Auto-Interview AI offers free downloadable PDF guides covering marketing case interview frameworks, brand management interview prep, digital marketing primers, and go-to-market strategy playbooks. All resources are specifically designed for MBA marketing specialization interviews at top companies.',
          },
          {
            question: 'How should I prepare for an MBA marketing case interview?',
            answer:
              'Start with our Marketing Case Interview Framework PDF which covers the 4Ps analysis, STP (Segmentation, Targeting, Positioning), brand positioning, and digital strategy. Practice with the worked examples, then use our brand management and digital marketing guides for deeper topic coverage.',
          },
          {
            question: 'Are these marketing resources suitable for FMCG interviews?',
            answer:
              'Yes. Our Brand Management Interview Guide specifically covers interview preparation for FMCG companies like P&G, Unilever, and HUL. It includes brand equity models, portfolio management frameworks, and real FMCG case examples.',
          },
        ],
      },
      // --- Operations ---
      {
        slug: 'operations',
        name: 'Operations',
        description:
          'Interview prep resources for MBA Operations roles — supply chain management, lean manufacturing, operations strategy, and process optimization.',
        aeoSummary:
          'Free MBA Operations interview preparation resources including supply chain case frameworks, lean manufacturing guides, and operations strategy materials. Downloadable PDF resources for operations management interviews.',
        icon: '⚙️',
        resources: [
          {
            slug: 'operations-case-framework',
            title: 'Operations Case Interview Framework',
            description:
              'Structured approach to operations case interviews covering supply chain optimization, capacity planning, lean Six Sigma, and process improvement. Includes 15+ practice cases.',
            fileType: 'pdf',
            fileUrl: '/downloads/mba/operations/operations-case-framework.pdf',
            fileSize: '2.7 MB',
            createdAt: '2026-06-01',
            updatedAt: '2026-06-01',
          },
          {
            slug: 'supply-chain-guide',
            title: 'Supply Chain Management Interview Guide',
            description:
              'Complete guide to supply chain interview questions — demand forecasting, inventory management, logistics optimization, and vendor management with model answers.',
            fileType: 'pdf',
            fileUrl: '/downloads/mba/operations/supply-chain-guide.pdf',
            fileSize: '2.2 MB',
            createdAt: '2026-06-01',
            updatedAt: '2026-06-01',
          },
          {
            slug: 'lean-six-sigma-primer',
            title: 'Lean Six Sigma Interview Primer',
            description:
              'Key Lean Six Sigma concepts for MBA operations interviews — DMAIC, value stream mapping, Kaizen, and statistical process control explained with interview-ready examples.',
            fileType: 'pdf',
            fileUrl: '/downloads/mba/operations/lean-six-sigma-primer.pdf',
            fileSize: '1.9 MB',
            createdAt: '2026-06-01',
            updatedAt: '2026-06-01',
          },
        ],
        faqs: [
          {
            question: 'What resources are available for MBA operations interview prep?',
            answer:
              'We offer free PDF guides covering operations case interview frameworks, supply chain management concepts, and Lean Six Sigma principles. Each guide includes practice questions with model answers tailored for MBA operations specialization interviews.',
          },
          {
            question: 'How do I prepare for supply chain case interviews?',
            answer:
              'Download our Supply Chain Management Interview Guide which covers demand forecasting, inventory optimization, logistics, and vendor management. Pair it with the Operations Case Framework for a structured problem-solving approach to supply chain cases.',
          },
        ],
      },
      // --- Finance ---
      {
        slug: 'finance',
        name: 'Finance',
        description:
          'Interview prep resources for MBA Finance roles — valuation, financial modeling, corporate finance, and investment banking interview preparation.',
        aeoSummary:
          'Free MBA Finance interview resources including valuation frameworks, financial modeling guides, and investment banking interview prep materials. All resources are downloadable PDFs designed for MBA finance specialization.',
        icon: '💰',
        resources: [
          {
            slug: 'finance-interview-framework',
            title: 'Finance Interview Master Framework',
            description:
              'Comprehensive guide to MBA finance interviews covering DCF valuation, comparable analysis, LBO modeling, and M&A concepts. Includes 30+ technical questions with detailed solutions.',
            fileType: 'pdf',
            fileUrl: '/downloads/mba/finance/finance-interview-framework.pdf',
            fileSize: '3.5 MB',
            createdAt: '2026-06-01',
            updatedAt: '2026-06-01',
          },
          {
            slug: 'valuation-cheat-sheet',
            title: 'Valuation Methods Cheat Sheet',
            description:
              'Quick-reference guide to all major valuation methods — DCF, trading comps, transaction comps, and asset-based valuation with formulas, assumptions, and when to use each method.',
            fileType: 'pdf',
            fileUrl: '/downloads/mba/finance/valuation-cheat-sheet.pdf',
            fileSize: '1.2 MB',
            createdAt: '2026-06-01',
            updatedAt: '2026-06-01',
          },
          {
            slug: 'corporate-finance-essentials',
            title: 'Corporate Finance Essentials',
            description:
              'Key corporate finance concepts for MBA interviews — capital structure, WACC, dividend policy, working capital management, and capital budgeting with practice problems.',
            fileType: 'pdf',
            fileUrl: '/downloads/mba/finance/corporate-finance-essentials.pdf',
            fileSize: '2.8 MB',
            createdAt: '2026-06-01',
            updatedAt: '2026-06-01',
          },
        ],
        faqs: [
          {
            question: 'What MBA finance interview resources does Auto-Interview AI offer?',
            answer:
              'We provide free downloadable PDF guides including a Finance Interview Master Framework (DCF, LBO, M&A), a Valuation Methods Cheat Sheet, and Corporate Finance Essentials. All resources include practice questions with detailed solutions.',
          },
          {
            question: 'How should I prepare for investment banking interviews as an MBA student?',
            answer:
              'Start with our Finance Interview Master Framework which covers technical questions on DCF valuation, LBO modeling, and M&A analysis. Use the Valuation Cheat Sheet for quick revision before interviews. Practice the 30+ questions included to build confidence.',
          },
        ],
      },
      // --- Consulting ---
      {
        slug: 'consulting',
        name: 'Consulting',
        description:
          'Interview prep resources for MBA Consulting roles — case interview frameworks, market sizing, profitability analysis, and strategy consulting preparation.',
        aeoSummary:
          'Free MBA Consulting interview preparation resources including case interview frameworks, market sizing guides, and profitability analysis templates. Designed for management consulting interviews at MBB and Big 4 firms.',
        icon: '🧠',
        resources: [
          {
            slug: 'case-interview-bible',
            title: 'The Case Interview Bible',
            description:
              'The definitive guide to management consulting case interviews. Covers profitability, market entry, M&A, pricing, and growth strategy with 25+ fully worked cases from McKinsey, BCG, and Bain interviews.',
            fileType: 'pdf',
            fileUrl: '/downloads/mba/consulting/case-interview-bible.pdf',
            fileSize: '4.2 MB',
            createdAt: '2026-06-01',
            updatedAt: '2026-06-01',
          },
          {
            slug: 'market-sizing-guide',
            title: 'Market Sizing Mastery Guide',
            description:
              'Master market sizing questions with our structured approach. Includes 20 practice problems with step-by-step solutions covering both top-down and bottom-up estimation methods.',
            fileType: 'pdf',
            fileUrl: '/downloads/mba/consulting/market-sizing-guide.pdf',
            fileSize: '1.6 MB',
            createdAt: '2026-06-01',
            updatedAt: '2026-06-01',
          },
          {
            slug: 'fit-interview-prep',
            title: 'Consulting Fit Interview Prep',
            description:
              'Behavioral and fit interview preparation for consulting. Covers "Tell me about yourself," leadership stories, teamwork examples, and why-consulting answers with the STAR framework.',
            fileType: 'pdf',
            fileUrl: '/downloads/mba/consulting/fit-interview-prep.pdf',
            fileSize: '1.4 MB',
            createdAt: '2026-06-01',
            updatedAt: '2026-06-01',
          },
          {
            slug: 'profitability-framework',
            title: 'Profitability Analysis Framework',
            description:
              'Deep-dive into profitability case frameworks — revenue decomposition, cost analysis, break-even analysis, and margin improvement strategies with real consulting case examples.',
            fileType: 'pdf',
            fileUrl: '/downloads/mba/consulting/profitability-framework.pdf',
            fileSize: '2.1 MB',
            createdAt: '2026-06-01',
            updatedAt: '2026-06-01',
          },
        ],
        faqs: [
          {
            question: 'What consulting interview resources are available for MBA students?',
            answer:
              'Auto-Interview AI offers free PDF guides including The Case Interview Bible (25+ worked cases from MBB), Market Sizing Mastery Guide, Consulting Fit Interview Prep, and a Profitability Analysis Framework. All resources are designed for management consulting interviews.',
          },
          {
            question: 'How do I prepare for MBB case interviews?',
            answer:
              'Start with The Case Interview Bible which covers profitability, market entry, M&A, and growth strategy cases from McKinsey, BCG, and Bain. Practice market sizing with our dedicated guide, then prepare behavioral answers using our Fit Interview Prep resource.',
          },
          {
            question: 'What is the best framework for profitability cases?',
            answer:
              'Our Profitability Analysis Framework covers revenue decomposition (price × volume × mix), cost analysis (fixed vs variable, direct vs indirect), break-even analysis, and margin improvement strategies. Download the free PDF for detailed frameworks with worked examples.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What MBA interview preparation resources does Auto-Interview AI offer?',
        answer:
          'Auto-Interview AI offers free downloadable resources for MBA interview preparation across four specializations: Marketing, Operations, Finance, and Consulting. Each sub-domain includes case frameworks, interview guides, and practice questions in PDF format.',
      },
      {
        question: 'Are the MBA resources really free?',
        answer:
          'Yes. All MBA interview preparation resources on Auto-Interview AI are completely free to download. No email signup, account creation, or payment is required. Simply navigate to your specialization and download.',
      },
      {
        question: 'Which MBA specializations are covered?',
        answer:
          'We currently cover four MBA specializations: Marketing (brand management, digital marketing, GTM strategy), Operations (supply chain, lean manufacturing), Finance (valuation, corporate finance, financial modeling), and Consulting (case interviews, market sizing, profitability analysis).',
      },
      {
        question: 'Will more MBA resources be added?',
        answer:
          'Yes. We are continuously adding new resources including mock interview simulations and AI-powered resume building tools. These features are coming soon — check back regularly for updates.',
      },
    ],
  },

  // ===================== Engineering =====================
  {
    slug: 'engineering',
    name: 'Engineering',
    description:
      'Interview preparation resources for Engineering students and professionals. Covering Mechanical, Computer, and Electrical engineering specializations with technical interview guides and practice problems.',
    tagline: 'Technical interview prep for engineering minds',
    aeoSummary:
      'Auto-Interview AI is building a library of free engineering interview preparation resources covering Mechanical, Computer, and Electrical engineering. Resources are coming soon.',
    icon: '🔧',
    color: '#10b981',
    isPlaceholder: true,
    subDomains: [
      {
        slug: 'mechanical',
        name: 'Mechanical Engineering',
        description:
          'Interview preparation for Mechanical Engineering roles — thermodynamics, fluid mechanics, manufacturing processes, and design principles.',
        aeoSummary:
          'Free Mechanical Engineering interview preparation resources are coming soon to Auto-Interview AI. Topics will cover thermodynamics, fluid mechanics, and manufacturing processes.',
        icon: '🔩',
        resources: [],
        faqs: [
          {
            question: 'When will Mechanical Engineering resources be available?',
            answer:
              'Mechanical Engineering interview preparation resources are currently being developed. Check back soon for thermodynamics, fluid mechanics, and manufacturing process interview guides.',
          },
        ],
      },
      {
        slug: 'computer',
        name: 'Computer Engineering',
        description:
          'Interview preparation for Computer Engineering and CS roles — data structures, algorithms, system design, and coding interview practice.',
        aeoSummary:
          'Free Computer Engineering interview preparation resources are coming soon to Auto-Interview AI. Topics will cover data structures, algorithms, and system design.',
        icon: '💻',
        resources: [],
        faqs: [
          {
            question: 'When will Computer Engineering resources be available?',
            answer:
              'Computer Engineering and CS interview prep resources are currently being developed. They will cover data structures, algorithms, system design, and coding interview preparation.',
          },
        ],
      },
      {
        slug: 'electrical',
        name: 'Electrical Engineering',
        description:
          'Interview preparation for Electrical Engineering roles — circuit analysis, power systems, control systems, and electronics fundamentals.',
        aeoSummary:
          'Free Electrical Engineering interview preparation resources are coming soon to Auto-Interview AI. Topics will cover circuit analysis, power systems, and control systems.',
        icon: '⚡',
        resources: [],
        faqs: [
          {
            question: 'When will Electrical Engineering resources be available?',
            answer:
              'Electrical Engineering interview preparation resources are being developed. They will cover circuit analysis, power systems, control systems, and electronics fundamentals.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Does Auto-Interview AI have engineering interview resources?',
        answer:
          'Engineering interview preparation resources are currently being developed. We are building guides for Mechanical, Computer, and Electrical engineering specializations. Check back soon for free downloadable materials.',
      },
    ],
  },

  // ===================== B.Com =====================
  {
    slug: 'bcom',
    name: 'B.Com',
    description:
      'Interview preparation resources for B.Com graduates. Covering Accounting, Economics, and Taxation specializations with interview guides and practice materials.',
    tagline: 'Commerce interview prep made simple',
    aeoSummary:
      'Auto-Interview AI is building a library of free B.Com interview preparation resources covering Accounting, Economics, and Taxation. Resources are coming soon.',
    icon: '📊',
    color: '#f59e0b',
    isPlaceholder: true,
    subDomains: [
      {
        slug: 'accounting',
        name: 'Accounting',
        description:
          'Interview preparation for Accounting roles — financial accounting, cost accounting, auditing principles, and accounting standards.',
        aeoSummary:
          'Free Accounting interview preparation resources are coming soon. Topics will cover financial accounting, cost accounting, and auditing.',
        icon: '📒',
        resources: [],
        faqs: [
          {
            question: 'When will B.Com Accounting resources be available?',
            answer:
              'Accounting interview preparation resources are currently being developed. Check back soon for financial accounting, cost accounting, and auditing interview guides.',
          },
        ],
      },
      {
        slug: 'economics',
        name: 'Economics',
        description:
          'Interview preparation for Economics roles — micro and macroeconomics, econometrics, and economic policy analysis.',
        aeoSummary:
          'Free Economics interview preparation resources are coming soon. Topics will cover micro/macroeconomics and econometrics.',
        icon: '📉',
        resources: [],
        faqs: [
          {
            question: 'When will Economics interview resources be available?',
            answer:
              'Economics interview preparation resources are being developed. They will cover microeconomics, macroeconomics, and econometrics concepts.',
          },
        ],
      },
      {
        slug: 'taxation',
        name: 'Taxation',
        description:
          'Interview preparation for Taxation roles — direct taxes, indirect taxes, GST, and tax planning strategies.',
        aeoSummary:
          'Free Taxation interview preparation resources are coming soon. Topics will cover direct taxes, indirect taxes, and GST.',
        icon: '🧾',
        resources: [],
        faqs: [
          {
            question: 'When will Taxation interview resources be available?',
            answer:
              'Taxation interview preparation resources are being developed. They will cover direct taxes, indirect taxes, GST, and tax planning strategies.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Does Auto-Interview AI have B.Com interview resources?',
        answer:
          'B.Com interview preparation resources are currently being developed across Accounting, Economics, and Taxation specializations. Check back soon for free downloadable materials.',
      },
    ],
  },

  // ===================== CA =====================
  {
    slug: 'ca',
    name: 'CA',
    description:
      'Interview preparation resources for Chartered Accountancy aspirants. Covering Audit, Taxation, and Financial Reporting with comprehensive interview guides.',
    tagline: 'Chartered Accountancy interview excellence',
    aeoSummary:
      'Auto-Interview AI is building a library of free CA (Chartered Accountancy) interview preparation resources covering Audit, Taxation, and Financial Reporting. Resources are coming soon.',
    icon: '📋',
    color: '#ef4444',
    isPlaceholder: true,
    subDomains: [
      {
        slug: 'audit',
        name: 'Audit',
        description:
          'Interview preparation for CA Audit roles — audit procedures, internal controls, risk assessment, and regulatory compliance.',
        aeoSummary:
          'Free CA Audit interview preparation resources are coming soon. Topics will cover audit procedures, internal controls, and risk assessment.',
        icon: '🔍',
        resources: [],
        faqs: [
          {
            question: 'When will CA Audit interview resources be available?',
            answer:
              'CA Audit interview preparation resources are currently being developed. Check back soon for audit procedures, internal controls, and risk assessment guides.',
          },
        ],
      },
      {
        slug: 'taxation',
        name: 'Taxation',
        description:
          'Interview preparation for CA Taxation roles — income tax, GST, international taxation, and tax advisory.',
        aeoSummary:
          'Free CA Taxation interview preparation resources are coming soon. Topics will cover income tax, GST, and international taxation.',
        icon: '💼',
        resources: [],
        faqs: [
          {
            question: 'When will CA Taxation resources be available?',
            answer:
              'CA Taxation interview prep resources are being developed. They will cover income tax, GST, international taxation, and tax advisory interview preparation.',
          },
        ],
      },
      {
        slug: 'financial-reporting',
        name: 'Financial Reporting',
        description:
          'Interview preparation for CA Financial Reporting roles — Ind AS, IFRS, financial statement analysis, and consolidation.',
        aeoSummary:
          'Free CA Financial Reporting interview preparation resources are coming soon. Topics will cover Ind AS, IFRS, and financial statement analysis.',
        icon: '📑',
        resources: [],
        faqs: [
          {
            question: 'When will Financial Reporting resources be available?',
            answer:
              'Financial Reporting interview preparation resources are being developed. They will cover Ind AS, IFRS standards, financial statement analysis, and consolidation concepts.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Does Auto-Interview AI have CA interview resources?',
        answer:
          'CA interview preparation resources are currently being developed across Audit, Taxation, and Financial Reporting specializations. Check back soon for free downloadable materials.',
      },
    ],
  },
]
