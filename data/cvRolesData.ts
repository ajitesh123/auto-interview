export interface CVRoleData {
  slug: string
  roleName: string
  category: string
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroDescription: string
  docxUrl: string
  gdocsUrl: string
  atsKeywords: string[]
  sampleBullets: {
    heading: string
    bullet: string
    metric: string
  }[]
  skillsMatrix: {
    category: string
    skills: string[]
  }[]
  dosAndDonts: {
    do: string
    dont: string
  }[]
  faqs: {
    q: string
    a: string
  }[]
}

export const CV_ROLES: Record<string, CVRoleData> = {
  'software-engineer': {
    slug: 'software-engineer',
    roleName: 'Software Engineer',
    category: 'Engineering',
    metaTitle: 'Software Engineer Resume Template (2026 Free ATS Word)',
    metaDescription:
      'Download free ATS-optimized Software Engineer resume template (Harvard single-column DOCX & Google Docs). Includes high-impact engineering bullets and ATS keywords.',
    heroTitle: 'Software Engineer Resume Template (ATS-Optimized)',
    heroDescription:
      'Engineered for FAANG, scale-up, and enterprise technical screens. Single-column, zero-table Harvard format proven to parse at 99%+ accuracy in Greenhouse, Lever, and Workday.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl:
      'https://docs.google.com/document/d/1tbnWMFkKT0c4Mh_IKhrobi_yK8qtjL6vkCgvXWCIKI0/edit?tab=t.0',
    atsKeywords: [
      'Distributed Systems',
      'Microservices',
      'CI/CD Pipelines',
      'System Design',
      'REST APIs',
      'GraphQL',
      'Kubernetes',
      'Docker',
      'AWS / GCP / Azure',
      'PostgreSQL',
      'Redis Caching',
      'Test-Driven Development (TDD)',
      'Async Processing',
      'Event-Driven Architecture',
      'P99 Latency Reduction',
      'Kafka / RabbitMQ',
    ],
    sampleBullets: [
      {
        heading: 'Distributed Systems & Latency',
        bullet:
          'Architected an asynchronous event-driven billing service using Node.js, Kafka, and Redis, decoupling payment processing from the primary transaction loop.',
        metric:
          'Reduced p99 checkout latency by 42% (from 620ms to 360ms) across 4.2M daily requests.',
      },
      {
        heading: 'Database & Throughput Optimization',
        bullet:
          'Redesigned PostgreSQL indexing schema and implemented read-replicas for high-volume customer analytics dashboard.',
        metric:
          'Eliminated database connection pool timeouts, increasing query throughput by 3.4x during peak traffic.',
      },
      {
        heading: 'Infrastructure & CI/CD',
        bullet:
          'Spearheaded automated Kubernetes deployment pipeline using GitHub Actions, Helm charts, and multi-stage Docker builds.',
        metric:
          'Cut average deployment cycle from 45 minutes to 7.5 minutes with zero recorded production downtime over 12 months.',
      },
      {
        heading: 'System Reliability & Fault Tolerance',
        bullet:
          'Implemented distributed tracing with OpenTelemetry and circuit breakers with Resilience4j across 18 backend microservices.',
        metric: 'Lowered MTTR (Mean Time to Resolution) for production alerts by 58%.',
      },
    ],
    skillsMatrix: [
      {
        category: 'Languages',
        skills: ['TypeScript', 'Python', 'Go', 'Java', 'C++', 'SQL'],
      },
      {
        category: 'Backend & Frameworks',
        skills: ['Node.js', 'Next.js', 'FastAPI', 'Spring Boot', 'gRPC', 'GraphQL'],
      },
      {
        category: 'Cloud & DevOps',
        skills: ['AWS (ECS, S3, RDS)', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
      },
      {
        category: 'Databases & Message Queues',
        skills: ['PostgreSQL', 'Redis', 'MongoDB', 'Apache Kafka', 'RabbitMQ'],
      },
    ],
    dosAndDonts: [
      {
        do: 'Use the Google X-Y-Z formula: "Accomplished [X], measured by [Y], by doing [Z]".',
        dont: 'Never list generic tasks like "Responsible for writing backend code and fixing bugs".',
      },
      {
        do: 'Put technical skills at the top or bottom in clear, comma-separated plain text categories.',
        dont: 'Avoid graphical skill rating bars (e.g. "Python: 4/5 stars")—ATS parsers cannot read them.',
      },
      {
        do: 'Quantify latency, concurrency, cost savings, or test coverage in every single bullet.',
        dont: 'Do not use multi-column tables or text boxes; ATS engines jumble column order during parsing.',
      },
    ],
    faqs: [
      {
        q: 'Why is a single-column layout strictly required for software engineer resumes?',
        a: 'Enterprise ATS systems like Workday, Taleo, and Greenhouse parse resumes linearly from left to right. Multi-column templates cause text from column A and column B to be merged on the same line, corrupting your technical skills and project descriptions in the recruiter dashboard.',
      },
      {
        q: 'Should I include a GitHub profile and live project links?',
        a: 'Yes. Include clean text hyperlinks to your GitHub profile and production applications. Ensure the URLs are plain text (e.g. github.com/username) so that both automated parsers and human engineers can access them without broken link errors.',
      },
      {
        q: 'How many pages should a Software Engineer resume be?',
        a: 'Strictly 1 page for engineers with under 8 years of experience. Candidates with 8-15+ years of extensive architectural leadership or patents may expand to 2 pages, provided every bullet provides measurable technical impact.',
      },
    ],
  },

  'product-manager': {
    slug: 'product-manager',
    roleName: 'Product Manager',
    category: 'Product',
    metaTitle: 'Product Manager Resume Template (2026 Free ATS Word)',
    metaDescription:
      'Download free ATS-friendly Product Manager resume template (Harvard DOCX & Google Docs). Includes high-converting PM metric bullets, product frameworks, and ATS keywords.',
    heroTitle: 'Product Manager Resume Template (ATS-Optimized)',
    heroDescription:
      'Designed for APM, Senior PM, and Group PM hiring bars at top tech companies. Single-column format that highlights product strategy, revenue growth, and cross-functional leadership.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl:
      'https://docs.google.com/document/d/1tbnWMFkKT0c4Mh_IKhrobi_yK8qtjL6vkCgvXWCIKI0/edit?tab=t.0',
    atsKeywords: [
      'Product Strategy',
      'Roadmap Prioritization',
      'User Research & Interviews',
      'A/B Testing & Experimentation',
      'PRD Documentation',
      'Go-To-Market (GTM) Strategy',
      'Customer Discovery',
      'North Star Metric',
      'Agile / Scrum Sprint Planning',
      'Churn Reduction',
      'Product-Led Growth (PLG)',
      'Data Analytics (SQL, Amplitude)',
      'Cross-Functional Leadership',
      'Feature Flag Rollouts',
      'Conversion Rate Optimization (CRO)',
    ],
    sampleBullets: [
      {
        heading: 'Product-Led Growth & Onboarding',
        bullet:
          'Spearheaded a redesigned self-serve user onboarding flow based on 45+ customer interviews and Amplitude funnel drop-off analytics.',
        metric:
          'Increased Day-14 free-to-paid conversion from 3.2% to 6.8%, generating +$1.4M ARR in Q3.',
      },
      {
        heading: 'A/B Experimentation & Revenue',
        bullet:
          'Formulated hypothesis, authored PRD, and executed multi-variant pricing tier test across 120,000 monthly active users.',
        metric:
          'Drove a 19% lift in ARPU (Average Revenue Per User) with zero statistically significant negative churn impact.',
      },
      {
        heading: '0-to-1 Product Launch & GTM',
        bullet:
          'Owned end-to-end launch of enterprise SSO and audit-log compliance module, collaborating across 14 engineers, 2 designers, and GTM sales leadership.',
        metric:
          'Unlocked $2.8M in stalled enterprise pipeline within 90 days of general availability.',
      },
      {
        heading: 'Churn & Customer Retention',
        bullet:
          'Identified core activation churn triggers using SQL cohort analysis and partnered with UX team to ship proactive smart-reengagement alerts.',
        metric: 'Decreased 90-day logo churn by 22% across 3,500 SMB SaaS accounts.',
      },
    ],
    skillsMatrix: [
      {
        category: 'Product Strategy & Discovery',
        skills: [
          'Roadmapping',
          'User Journey Mapping',
          'Customer Discovery',
          'Jobs-to-be-Done (JTBD)',
          'GTM Strategy',
        ],
      },
      {
        category: 'Analytics & Tools',
        skills: ['SQL', 'Amplitude', 'Mixpanel', 'Google Analytics 4', 'FullStory', 'Looker'],
      },
      {
        category: 'Agile & Execution',
        skills: [
          'Jira',
          'Confluence',
          'Figma',
          'PRD Authoring',
          'Scrum Sprint Facilitation',
          'User Stories',
        ],
      },
    ],
    dosAndDonts: [
      {
        do: 'Frame bullets around business outcomes (ARR, retention, conversion, ARPU) rather than feature shipping.',
        dont: 'Do not simply say "Shipped feature X on time and within budget".',
      },
      {
        do: 'Highlight cross-functional leverage (e.g. "Led cross-functional team of 8 engineers and 2 designers").',
        dont: 'Never present yourself as an isolated project manager; PMs must demonstrate commercial ownership.',
      },
      {
        do: 'Prove data literacy by mentioning SQL, experimentation design, and statistical significance.',
        dont: 'Avoid buzzword stuffing without contextual metric proof.',
      },
    ],
    faqs: [
      {
        q: 'What do hiring managers look for first on a Product Manager resume?',
        a: 'Product hiring managers scan for two things in the first 6 seconds: measurable business impact (revenue, conversion, retention metrics) and evidence of customer empathy/discovery methodology (PRDs, A/B testing, user research).',
      },
      {
        q: 'Should an APM or aspiring PM include technical skills on their CV?',
        a: 'Yes. Mentioning data querying (SQL), user analytics (Amplitude, Mixpanel), and technical architecture comprehension helps differentiate you, especially in technical infrastructure or B2B SaaS product roles.',
      },
    ],
  },

  'sales-sdr': {
    slug: 'sales-sdr',
    roleName: 'Sales & SDR Executive',
    category: 'Sales & GTM',
    metaTitle: 'Sales & SDR Resume Template (2026 Free ATS Word)',
    metaDescription:
      'Download free ATS-optimized SDR & Account Executive resume template (Harvard DOCX & Google Docs). Features quota attainment metrics, cold calling playbooks, and sales keywords.',
    heroTitle: 'SDR & Sales Executive Resume Template (ATS-Optimized)',
    heroDescription:
      'Built specifically for SDRs, BDRs, and Account Executives targeting high-growth SaaS and enterprise tech. Proven single-column layout that highlights quota attainment and pipeline generated.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl: 'https://docs.google.com/document/d/1AVi3XeRchX1VkuRta5Jiy1zhMJz0S3qa/edit',
    atsKeywords: [
      'Quota Attainment',
      'Outbound Prospecting',
      'MEDDPICC Framework',
      'Cold Calling & Cold Emailing',
      'Pipeline Generation',
      'Salesforce CRM',
      'HubSpot CRM',
      'Salesloft / Outreach.io',
      'Lead Qualification (BANT / CHAMP)',
      'Discovery Call Execution',
      'Multi-Touch Cadences',
      'Enterprise Account Mapping',
      'Contract Negotiation & Closing',
      'Turn-Taking Objection Handling',
      'Annual Contract Value (ACV)',
    ],
    sampleBullets: [
      {
        heading: 'Quota Attainment & Pipeline',
        bullet:
          'Executed multi-channel outbound outbound prospecting sequences (cold calls, personalized LinkedIn video, email cadences) targeting VP/C-suite decision makers in cybersecurity SaaS.',
        metric:
          'Maintained 138% average quota attainment over 4 consecutive quarters; sourced $3.1M in qualified sales pipeline.',
      },
      {
        heading: 'Cold Call Conversion & Connect Rates',
        bullet:
          'Conducted 60+ daily cold outbound dials, applying the A.D.D. framework (Acknowledge, Deflect, Differentiate) to overcome incumbent competitor lock-in.',
        metric:
          'Boosted cold connect-to-discovery meeting booking rate from 4.1% to 8.4%, ranking #1 across 18 team SDRs.',
      },
      {
        heading: 'Enterprise Account Mapping & MEDDPICC',
        bullet:
          'Partnered with 3 Strategic Account Executives to map buying committees across 45 Fortune 1000 target enterprise accounts using Apollo and LinkedIn Sales Navigator.',
        metric: 'Generated 28 enterprise discovery calls with average deal size of $85,000 ACV.',
      },
      {
        heading: 'Sales Enablement & Coaching',
        bullet:
          'Authored high-converting objection handling playbook for competitor displacement and conducted weekly peer voice roleplay drills for 6 junior BDRs.',
        metric: 'Shortened ramp time for new SDR cohorts from 75 days to 42 days.',
      },
    ],
    skillsMatrix: [
      {
        category: 'Sales Methodologies',
        skills: [
          'MEDDPICC',
          'Challenger Sale',
          'Sandler Training',
          'BANT Qualification',
          'SPIN Selling',
        ],
      },
      {
        category: 'CRM & Sales Tech',
        skills: [
          'Salesforce',
          'HubSpot',
          'Salesloft',
          'Outreach',
          'Gong.io',
          'ZoomInfo',
          'Apollo.io',
        ],
      },
      {
        category: 'Core Competencies',
        skills: [
          'Cold Calling',
          'Objection Handling',
          'Account-Based Marketing (ABM)',
          'Email Copywriting',
          'Executive Discovery',
        ],
      },
    ],
    dosAndDonts: [
      {
        do: 'Put your % quota attainment number in the very first bullet under each sales position.',
        dont: 'Never leave quota ambiguous; stating "met expectations" raises red flags for VP of Sales.',
      },
      {
        do: 'Include dollar numbers: total pipeline generated, closed-won revenue, and average contract size (ACV).',
        dont: 'Do not simply list daily activity volume (e.g. "Made 50 calls a day") without conversion outcomes.',
      },
    ],
    faqs: [
      {
        q: 'What is the most critical metric on an SDR or AE resume?',
        a: 'Quota attainment percentage. A sales manager immediately looks for bold percentages like "124% of annual quota" and the dollar volume of pipeline created or closed.',
      },
      {
        q: 'Which sales tools should be listed on a modern sales resume?',
        a: 'Salesforce or HubSpot CRM, along with modern outbound sequencing tools (Outreach, Salesloft) and intelligence tools (Gong, ZoomInfo, Apollo).',
      },
    ],
  },

  'data-analyst': {
    slug: 'data-analyst',
    roleName: 'Data Analyst',
    category: 'Data & Analytics',
    metaTitle: 'Data Analyst Resume Template (2026 Free ATS Word)',
    metaDescription:
      'Download free ATS-friendly Data Analyst resume template (Harvard DOCX & Google Docs). Includes high-impact SQL/Python bullets, BI dashboard metrics, and ATS keywords.',
    heroTitle: 'Data Analyst Resume Template (ATS-Optimized)',
    heroDescription:
      'Engineered for Data Analysts, BI Engineers, and Business Analytics professionals. Clean single-column Harvard layout highlighting SQL optimization, data visualization, and statistical modeling.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl:
      'https://docs.google.com/document/d/1tbnWMFkKT0c4Mh_IKhrobi_yK8qtjL6vkCgvXWCIKI0/edit?tab=t.0',
    atsKeywords: [
      'SQL Query Optimization',
      'Python (Pandas, NumPy)',
      'Tableau Dashboard Design',
      'Power BI Visualization',
      'ETL Pipeline Maintenance',
      'Statistical Hypothesis Testing',
      'Cohort Analysis',
      'dbt (data build tool)',
      'Snowflake / BigQuery / Redshift',
      'Data Modeling (Star Schema)',
      'Regression Modeling',
      'Executive KPI Reporting',
      'A/B Testing Analysis',
      'Root Cause Analysis',
      'Automated Reporting Cadence',
    ],
    sampleBullets: [
      {
        heading: 'SQL Optimization & Data Warehousing',
        bullet:
          'Constructed optimized dbt models and SQL queries in Snowflake, aggregating 85M+ daily transaction logs into star-schema analytical marts.',
        metric:
          'Reduced executive reporting run times by 65% and cut annual cloud compute expenditure by $34,000.',
      },
      {
        heading: 'Executive BI Dashboards & Decision Support',
        bullet:
          'Built and deployed automated Tableau dashboards tracking company-wide North Star KPIs (LTV, CAC, Net Churn, MRR) for the executive leadership team.',
        metric:
          'Saved 16 hours/week of manual Excel reporting across Finance and Operations teams.',
      },
      {
        heading: 'Statistical Modeling & Experimentation',
        bullet:
          'Conducted two-tailed hypothesis testing and multivariate regression on 250,000 user checkout sessions to evaluate payment gateway friction.',
        metric:
          'Identified a high-friction checkout drop-off, recommending optimizations that recovered $820k in abandoned cart transactions.',
      },
      {
        heading: 'Predictive Analytics & Churn Modeling',
        bullet:
          'Developed a customer churn risk scoring model using Python (Pandas, Scikit-Learn) with an ROC-AUC of 0.84.',
        metric:
          'Enabled Customer Success to proactively intercept 310 at-risk accounts, preserving $540k in ARR.',
      },
    ],
    skillsMatrix: [
      {
        category: 'Querying & Modeling',
        skills: [
          'Advanced SQL (Window Functions, CTEs)',
          'Python (Pandas, NumPy, Scikit-learn)',
          'dbt',
          'Data Modeling',
        ],
      },
      {
        category: 'Data Warehouses',
        skills: ['Snowflake', 'Google BigQuery', 'Amazon Redshift', 'PostgreSQL'],
      },
      {
        category: 'BI & Visualization',
        skills: ['Tableau', 'Power BI', 'Looker', 'Metabase', 'Excel (VBA, Power Query)'],
      },
    ],
    dosAndDonts: [
      {
        do: 'Connect data analysis directly to business impact (e.g. "Cut cloud costs by $34k", "Saved 16 hours/week").',
        dont: 'Do not just say "Wrote complex SQL queries and created charts in Tableau".',
      },
      {
        do: 'Specify query scale: row volumes (millions/billions of rows) and database engines used.',
        dont: 'Avoid listing beginner formulas like VLOOKUP when applying for mid-to-senior analyst roles.',
      },
    ],
    faqs: [
      {
        q: 'Should I showcase portfolio projects or GitHub repos on a Data Analyst CV?',
        a: 'Yes. Direct links to GitHub repositories showing well-commented SQL scripts, Jupyter notebooks, or public Tableau Public profile links provide tangible proof of competency that interviewers love.',
      },
      {
        q: 'What is the most tested skill in Data Analyst technical interviews?',
        a: 'Advanced SQL: window functions (RANK, ROW_NUMBER, LEAD/LAG), Common Table Expressions (CTEs), self-joins, and aggregation optimizations.',
      },
    ],
  },

  fresher: {
    slug: 'fresher',
    roleName: 'Fresher & Entry-Level Graduate',
    category: 'Students & Graduates',
    metaTitle: 'Fresher Resume Template (2026 Free ATS Word Format)',
    metaDescription:
      'Download free ATS resume template for freshers and college graduates (Harvard single-column DOCX). Tips for zero-experience candidates, academic projects, and ATS formatting.',
    heroTitle: 'Fresher & Entry-Level Resume Template (ATS-Optimized)',
    heroDescription:
      'Designed for college graduates, career switchers, and entry-level applicants. High-authority single-column Harvard format structured to emphasize capstone projects, academic rigor, and internships.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl: 'https://docs.google.com/document/d/1AVi3XeRchX1VkuRta5Jiy1zhMJz0S3qa/edit',
    atsKeywords: [
      'Capstone Project',
      'Academic Achievements',
      'Internship Experience',
      'Problem-Solving',
      'Team Collaboration',
      'Quick Learner',
      'Coursework & Certifications',
      'Technical Communication',
      'Agile Basics',
      'Data Analysis',
      'Git / GitHub Version Control',
      'Presentation Skills',
    ],
    sampleBullets: [
      {
        heading: 'Capstone Project / Real-World Simulation',
        bullet:
          'Led a 4-person engineering team to design and build a full-stack automated scheduling application using React, Node.js, and PostgreSQL.',
        metric:
          'Delivered project 2 weeks ahead of deadline; selected among Top 3 capstone projects in 2025 graduating class.',
      },
      {
        heading: 'Summer Internship Impact',
        bullet:
          'Assisted senior analysts with daily data reconciliation and customer feedback synthesis using Python and Excel.',
        metric:
          'Automated 3 manual reporting spreadsheets, cutting team preparation time by 5 hours weekly.',
      },
      {
        heading: 'Leadership & Extracurricular Excellence',
        bullet:
          'Elected Vice President of University Tech & Entrepreneurship Society, managing a $12,000 annual event budget and coordinating 6 technical workshops.',
        metric:
          'Increased club active membership by 65% (from 140 to 230 members) across 2 academic semesters.',
      },
    ],
    skillsMatrix: [
      {
        category: 'Technical Fundamentals',
        skills: ['Python', 'Java', 'SQL Basics', 'Git / GitHub', 'HTML/CSS', 'Excel'],
      },
      {
        category: 'Soft Skills & Execution',
        skills: [
          'Analytical Thinking',
          'Cross-Functional Teamwork',
          'Technical Writing',
          'Time Management',
          'Rapid Prototyping',
        ],
      },
    ],
    dosAndDonts: [
      {
        do: 'Put Education and Capstone Projects at the top of your resume above work history.',
        dont: 'Do not leave the resume blank if you lack formal experience; treat university capstone projects like real jobs.',
      },
      {
        do: 'Always keep your resume to strictly 1 single page.',
        dont: 'Never include a photograph, marital status, or full street address—these trigger discrimination compliance filters.',
      },
    ],
    faqs: [
      {
        q: 'How can a fresher with no work experience pass an ATS resume filter?',
        a: 'ATS systems look for relevant skill keywords and clear structure, not just years of experience. By detailing substantial course projects, internships, leadership roles, and technical tools using clear bullet points with metrics, your score will match or beat experienced candidates.',
      },
      {
        q: 'Should I include my GPA or college percentage on my resume?',
        a: 'Include your GPA or percentage only if it is strong (e.g. 3.5/4.0 GPA or 75%+ / First Class with Distinction). If not, highlight capstone projects, coding repositories, and certifications instead.',
      },
    ],
  },
}
