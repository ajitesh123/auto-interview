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
  'devops-engineer': {
    slug: 'devops-engineer',
    roleName: 'DevOps & Cloud Engineer',
    category: 'Engineering & Cloud',
    metaTitle: 'DevOps Engineer Resume Template (2026 Free ATS Word)',
    metaDescription:
      'Download free ATS-optimized DevOps Engineer resume template (Harvard DOCX & Google Docs). Includes Terraform, Kubernetes, CI/CD bullets, and ATS keywords.',
    heroTitle: 'DevOps Engineer Resume Template (ATS-Optimized)',
    heroDescription:
      'Engineered for Site Reliability Engineers (SRE), Cloud Architects, and DevOps Engineers. Single-column format highlighting uptime, IaC automation, and CI/CD throughput.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl:
      'https://docs.google.com/document/d/1tbnWMFkKT0c4Mh_IKhrobi_yK8qtjL6vkCgvXWCIKI0/edit?tab=t.0',
    atsKeywords: [
      'Terraform (IaC)',
      'Kubernetes (EKS/GKE)',
      'Docker Containerization',
      'AWS / Azure / GCP',
      'CI/CD Pipelines (GitHub Actions, GitLab CI)',
      'Helm Charts',
      'Prometheus & Grafana',
      'Site Reliability Engineering (SRE)',
      'Zero-Downtime Deployments',
      'ArgoCD / GitOps',
      'Infrastructure Security & IAM',
      'Disaster Recovery (RTO/RPO)',
      'Cost Optimization (FinOps)',
    ],
    sampleBullets: [
      {
        heading: 'Infrastructure as Code & Multi-Cloud',
        bullet:
          'Migrated 140+ bare-metal services to containerized AWS EKS clusters using modular Terraform and Helm charts.',
        metric:
          'Cut annual AWS cloud spend by $180,000 (32%) while achieving 99.99% service availability.',
      },
      {
        heading: 'GitOps CI/CD Automation',
        bullet:
          'Architected automated GitOps deployment pipeline utilizing ArgoCD and GitHub Actions across staging and production.',
        metric:
          'Increased daily deployment frequency by 4.8x (from 3/week to 20+/week) with automated rollbacks.',
      },
      {
        heading: 'Observability & Incident Response',
        bullet:
          'Deployed centralized Prometheus, Grafana, and OpenTelemetry logging cluster covering 35 microservices.',
        metric: 'Reduced Mean Time to Detect (MTTD) from 24 minutes to under 90 seconds.',
      },
    ],
    skillsMatrix: [
      {
        category: 'Cloud Providers',
        skills: ['AWS (EKS, EC2, S3, RDS)', 'Google Cloud (GCP)', 'Microsoft Azure'],
      },
      {
        category: 'IaC & Configuration',
        skills: ['Terraform', 'Ansible', 'Helm', 'CloudFormation'],
      },
      {
        category: 'CI/CD & Containers',
        skills: ['Docker', 'Kubernetes', 'GitHub Actions', 'ArgoCD', 'Jenkins'],
      },
      {
        category: 'Monitoring & Security',
        skills: ['Prometheus', 'Grafana', 'Datadog', 'HashiCorp Vault', 'SonarQube'],
      },
    ],
    dosAndDonts: [
      {
        do: 'Quantify uptime percentages (e.g. 99.99%) and cloud dollar savings in your experience bullets.',
        dont: 'Do not simply list tools like "Docker, Kubernetes, AWS" without contextual infrastructure metrics.',
      },
      {
        do: 'Highlight incident management frameworks like RTO, RPO, MTTR, and post-mortem automation.',
        dont: 'Avoid cluttering your header with graphical vendor badges—keep certifications in plain text.',
      },
    ],
    faqs: [
      {
        q: 'How should I format DevOps certifications on an ATS resume?',
        a: 'List role-relevant professional certifications (AWS Certified Solutions Architect Professional, CKA - Certified Kubernetes Administrator, or HashiCorp Terraform Associate) at the top of your Education or Certifications section in plain text.',
      },
    ],
  },

  'frontend-developer': {
    slug: 'frontend-developer',
    roleName: 'Frontend Developer',
    category: 'Engineering & UI',
    metaTitle: 'Frontend Developer Resume Template (2026 Free ATS Word)',
    metaDescription:
      'Download free ATS-optimized Frontend Developer resume template (Harvard DOCX & Google Docs). Features React, Next.js, Core Web Vitals, and performance bullets.',
    heroTitle: 'Frontend Developer Resume Template (ATS-Optimized)',
    heroDescription:
      'Built for React, Next.js, and TypeScript UI engineers. Single-column format structured to showcase Core Web Vitals optimization, state architecture, and accessible UX.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl:
      'https://docs.google.com/document/d/1tbnWMFkKT0c4Mh_IKhrobi_yK8qtjL6vkCgvXWCIKI0/edit?tab=t.0',
    atsKeywords: [
      'React.js',
      'Next.js App Router',
      'TypeScript',
      'Tailwind CSS',
      'Redux Toolkit / Zustand',
      'Core Web Vitals (LCP, FID, CLS)',
      'Server-Side Rendering (SSR)',
      'REST & GraphQL APIs',
      'Web Accessibility (WCAG 2.1 AA)',
      'Jest & React Testing Library',
      'Micro-Frontends',
      'Bundle Size Optimization',
      'Responsive Mobile-First UI',
    ],
    sampleBullets: [
      {
        heading: 'Core Web Vitals & Performance',
        bullet:
          'Refactored enterprise web portal from legacy SPA to Next.js App Router with dynamic imports and image optimization.',
        metric:
          'Lifted Google Lighthouse Performance score from 48 to 96; improved LCP by 64% (from 4.1s to 1.4s).',
      },
      {
        heading: 'Component Design System',
        bullet:
          'Engineered an accessible, WCAG 2.1 AA compliant UI component library in TypeScript, Tailwind CSS, and Storybook across 8 engineering pods.',
        metric: 'Accelerated frontend feature delivery time by 35% across 22 web applications.',
      },
      {
        heading: 'State Management & Caching',
        bullet:
          'Implemented React Query / TanStack Query client caching and optimistic mutations for complex data table application.',
        metric:
          'Reduced redundant backend API round-trips by 72% across 80,000 daily active users.',
      },
    ],
    skillsMatrix: [
      {
        category: 'Frameworks & Libraries',
        skills: ['React', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS'],
      },
      {
        category: 'Languages',
        skills: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3/PostCSS'],
      },
      {
        category: 'State & Data Fetching',
        skills: ['TanStack Query', 'Zustand', 'Redux Toolkit', 'GraphQL', 'REST'],
      },
      {
        category: 'Testing & Tools',
        skills: ['Jest', 'React Testing Library', 'Cypress', 'Playwright', 'Vite', 'Webpack'],
      },
    ],
    dosAndDonts: [
      {
        do: 'Include live URLs to your production web portfolio or GitHub repositories in plain text.',
        dont: 'Do not use multi-column graphical portfolio resumes that crash ATS text parsers.',
      },
      {
        do: 'Quantify client-side metrics: bundle size reduction, Lighthouse scores, and conversion lifts.',
        dont: 'Never omit TypeScript; 90%+ of mid-to-senior frontend screens filter for TypeScript proficiency.',
      },
    ],
    faqs: [
      {
        q: 'How should I include my portfolio and GitHub links on a frontend resume?',
        a: 'Place clickable plain-text links in your header (e.g. portfolio.dev, github.com/username) so both automated parsers and human reviewers can evaluate your live work effortlessly.',
      },
    ],
  },

  'full-stack-developer': {
    slug: 'full-stack-developer',
    roleName: 'Full Stack Developer',
    category: 'Engineering',
    metaTitle: 'Full Stack Developer Resume Template (2026 Free ATS Word)',
    metaDescription:
      'Download free ATS Full Stack Developer resume template (Harvard DOCX & Google Docs). Features React, Node.js, PostgreSQL, and scalable architecture bullets.',
    heroTitle: 'Full Stack Developer Resume Template (ATS-Optimized)',
    heroDescription:
      'Tailored for Full Stack Engineers across React, Node.js, Python, and cloud databases. Demonstrates end-to-end technical ownership from responsive UI to database indexes.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl:
      'https://docs.google.com/document/d/1tbnWMFkKT0c4Mh_IKhrobi_yK8qtjL6vkCgvXWCIKI0/edit?tab=t.0',
    atsKeywords: [
      'Full Stack Development',
      'React.js / Next.js',
      'Node.js / Express',
      'Python / Django / FastAPI',
      'PostgreSQL / MySQL',
      'MongoDB',
      'REST & GraphQL APIs',
      'AWS Cloud Deployment',
      'Docker & Containerization',
      'Redis Caching',
      'Authentication (OAuth, JWT)',
      'Database Optimization & Indexing',
      'End-to-End System Ownership',
    ],
    sampleBullets: [
      {
        heading: 'End-to-End SaaS Feature Delivery',
        bullet:
          'Engineered full-stack multi-tenant analytics dashboard from Figma specs to production using Next.js, Node.js, and PostgreSQL.',
        metric: 'Supported 250,000 monthly active users with sub-300ms API response times.',
      },
      {
        heading: 'API & Microservice Scalability',
        bullet:
          'Re-architected monolithic backend into decoupled Node.js microservices with Redis caching and PostgreSQL connection pooling.',
        metric:
          'Increased maximum concurrent transaction capacity by 400% during seasonal flash sales.',
      },
      {
        heading: 'Security & Payment Integration',
        bullet:
          'Integrated Stripe Billing API with webhook verification and role-based access control (RBAC) across 4 subscription tiers.',
        metric:
          'Automated recurring billing across 12,000 paid subscribers with 99.98% billing accuracy.',
      },
    ],
    skillsMatrix: [
      {
        category: 'Frontend',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
      },
      {
        category: 'Backend',
        skills: ['Node.js', 'Express', 'FastAPI', 'Python', 'Go', 'REST', 'GraphQL'],
      },
      {
        category: 'Databases & Cache',
        skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM'],
      },
      {
        category: 'DevOps & Deployment',
        skills: ['Docker', 'AWS (S3, ECS, RDS)', 'Vercel', 'Git'],
      },
    ],
    dosAndDonts: [
      {
        do: 'Demonstrate balance: show clear competence in both frontend UI performance and backend data consistency.',
        dont: 'Avoid claiming expert proficiency in 15 unrelated backend languages; focus on your core stack (e.g. MERN or Next.js+Python).',
      },
    ],
    faqs: [
      {
        q: 'Why is the Harvard format ideal for Full Stack Developers?',
        a: 'The single-column Harvard format is universally recognized by technical recruiters because it clearly delineates front-end vs back-end achievements without jumbling technical keywords.',
      },
    ],
  },

  'data-scientist': {
    slug: 'data-scientist',
    roleName: 'Data Scientist',
    category: 'AI & Analytics',
    metaTitle: 'Data Scientist Resume Template (2026 Free ATS Word Format)',
    metaDescription:
      'Download free ATS-optimized Data Scientist resume template (Harvard DOCX & Google Docs). Features ML models, Python, NLP, and business impact bullets.',
    heroTitle: 'Data Scientist Resume Template (ATS-Optimized)',
    heroDescription:
      'Engineered for Data Scientists, Applied Scientists, and ML Practitioners. Highlights predictive modeling, statistical rigor, feature engineering, and bottom-line revenue lift.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl:
      'https://docs.google.com/document/d/1tbnWMFkKT0c4Mh_IKhrobi_yK8qtjL6vkCgvXWCIKI0/edit?tab=t.0',
    atsKeywords: [
      'Machine Learning Models',
      'Python (Scikit-Learn, PyTorch)',
      'Statistical Analysis & A/B Testing',
      'Feature Engineering',
      'Natural Language Processing (NLP)',
      'Deep Learning',
      'SQL Data Querying',
      'Model Evaluation (ROC-AUC, F1-Score)',
      'MLOps & Model Deployment',
      'Cross-Validation',
      'Data Pipeline ETL',
      'Pandas & NumPy',
    ],
    sampleBullets: [
      {
        heading: 'Predictive Modeling & Revenue Growth',
        bullet:
          'Developed customer lifetime value (LTV) predictive model in Python (LightGBM, Scikit-learn) analyzing 1.8M historical transactions.',
        metric:
          'Lifted target marketing campaign ROI by 24%, generating an incremental $1.2M in annual pipeline.',
      },
      {
        heading: 'A/B Experimentation & Statistical Inference',
        bullet:
          'Designed and evaluated randomized control trial (RCT) experiment framework for 400,000 weekly active users with Bonferroni correction.',
        metric: 'Detected a 3.8% lift in checkout conversion rate with 99% statistical confidence.',
      },
      {
        heading: 'NLP & Automated Text Classification',
        bullet:
          'Trained and deployed RoBERTa-based sentiment analysis model classifying 50,000 daily inbound customer support tickets.',
        metric:
          'Reduced manual ticket routing time by 82% while improving classification precision to 94.2% F1-score.',
      },
    ],
    skillsMatrix: [
      {
        category: 'Machine Learning',
        skills: [
          'Supervised/Unsupervised Learning',
          'PyTorch',
          'Scikit-Learn',
          'XGBoost',
          'LightGBM',
        ],
      },
      {
        category: 'Languages & Tools',
        skills: ['Python', 'R', 'SQL', 'Git', 'Jupyter', 'MLflow'],
      },
      {
        category: 'Statistics & Math',
        skills: [
          'Hypothesis Testing',
          'A/B Testing',
          'Bayesian Inference',
          'Multivariate Regression',
        ],
      },
      {
        category: 'Cloud & Big Data',
        skills: ['AWS SageMaker', 'Snowflake', 'BigQuery', 'Spark / PySpark'],
      },
    ],
    dosAndDonts: [
      {
        do: 'Always pair technical model metrics (ROC-AUC, RMSE, F1) with actual commercial business impact ($ revenue, churn saved).',
        dont: 'Never treat Kaggle competitions as full enterprise experience; emphasize production deployments.',
      },
    ],
    faqs: [
      {
        q: 'Should I include research papers and patents on a Data Science resume?',
        a: 'Yes. If you have published papers in NeurIPS, ICML, KDD, or arXiv, create a "Publications & Patents" section directly beneath your experience.',
      },
    ],
  },

  'machine-learning-engineer': {
    slug: 'machine-learning-engineer',
    roleName: 'Machine Learning Engineer',
    category: 'AI & ML',
    metaTitle: 'Machine Learning Engineer Resume Template (2026 Free ATS)',
    metaDescription:
      'Download free ATS ML Engineer resume template (Harvard DOCX & Google Docs). Highlights LLM fine-tuning, PyTorch, MLOps, Triton inference, and latency metrics.',
    heroTitle: 'Machine Learning Engineer Resume Template (ATS-Optimized)',
    heroDescription:
      'Built for MLEs, LLM Engineers, and AI Systems Architects. Single-column Harvard format proving production model serving, quantization, and GPU inference throughput.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl:
      'https://docs.google.com/document/d/1tbnWMFkKT0c4Mh_IKhrobi_yK8qtjL6vkCgvXWCIKI0/edit?tab=t.0',
    atsKeywords: [
      'Machine Learning Systems',
      'LLM Fine-Tuning (LoRA, QLoRA)',
      'PyTorch / TensorRT',
      'MLOps (Kubeflow, MLflow)',
      'vLLM / Triton Inference Server',
      'GPU Memory Optimization',
      'Vector Databases (Pinecone, Qdrant)',
      'RAG Architecture',
      'Model Quantization (FP8, INT4)',
      'Distributed Training (DeepSpeed, FSDP)',
      'P99 Latency Reduction',
    ],
    sampleBullets: [
      {
        heading: 'LLM Inference Optimization & Serving',
        bullet:
          'Optimized enterprise open-source LLM inference serving using vLLM, TensorRT-LLM, and FP8 quantization across 8x H100 GPUs.',
        metric:
          'Reduced p99 token generation latency from 450ms to 92ms while tripling concurrent request throughput.',
      },
      {
        heading: 'Fine-Tuning & Parameter-Efficient Training',
        bullet:
          'Fine-tuned domain-specific 70B parameter model using LoRA and synthetic customer feedback data on 40,000 enterprise conversations.',
        metric:
          'Achieved 89.4% task accuracy on proprietary legal contract review, outperforming generic frontier models.',
      },
      {
        heading: 'Production MLOps & Vector Search RAG',
        bullet:
          'Architected enterprise Retrieval-Augmented Generation (RAG) pipeline with hybrid sparse-dense vector search in Qdrant.',
        metric:
          'Maintained 99.9% uptime over 2.4M monthly user queries with sub-180ms retrieval latency.',
      },
    ],
    skillsMatrix: [
      {
        category: 'Deep Learning & LLMs',
        skills: ['PyTorch', 'Hugging Face', 'DeepSpeed', 'vLLM', 'LoRA/QLoRA', 'LangChain'],
      },
      {
        category: 'Serving & MLOps',
        skills: ['Triton Inference Server', 'Docker', 'Kubernetes', 'MLflow', 'Ray Train/Serve'],
      },
      {
        category: 'Databases & Vector',
        skills: ['Qdrant', 'Pinecone', 'ChromaDB', 'PostgreSQL (pgvector)'],
      },
    ],
    dosAndDonts: [
      {
        do: 'Quantify hardware efficiency: GPU utilization, VRAM savings, throughput (tokens/sec), and p99 latency.',
        dont: 'Do not use vague claims like "Experienced in GenAI" without specifying frameworks and model sizes.',
      },
    ],
    faqs: [
      {
        q: 'What is the key difference between an MLE resume and a Data Scientist resume?',
        a: 'An MLE resume focuses heavily on production engineering: distributed training, low-latency inference serving, model quantization, and CI/CD pipelines, whereas Data Science emphasizes statistical exploration and business hypothesis testing.',
      },
    ],
  },

  'cybersecurity-analyst': {
    slug: 'cybersecurity-analyst',
    roleName: 'Cybersecurity Analyst',
    category: 'Security & IT',
    metaTitle: 'Cybersecurity Analyst Resume Template (2026 Free ATS Word)',
    metaDescription:
      'Download free ATS Cybersecurity Analyst resume template (Harvard DOCX & Google Docs). Highlights SIEM, SOC incident response, NIST frameworks, and threat analysis.',
    heroTitle: 'Cybersecurity Analyst Resume Template (ATS-Optimized)',
    heroDescription:
      'Engineered for SOC Analysts, Information Security Engineers, and Incident Responders. Demonstrates vulnerability management, SIEM triage, and zero-trust enterprise compliance.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl:
      'https://docs.google.com/document/d/1tbnWMFkKT0c4Mh_IKhrobi_yK8qtjL6vkCgvXWCIKI0/edit?tab=t.0',
    atsKeywords: [
      'Incident Response & Triage',
      'SIEM (Splunk, Microsoft Sentinel)',
      'Threat Intelligence & Hunting',
      'Vulnerability Assessment (Nessus, Qualys)',
      'NIST / ISO 27001 / SOC 2 Compliance',
      'Endpoint Detection & Response (EDR / CrowdStrike)',
      'Zero-Trust Architecture',
      'Penetration Testing',
      'Firewalls & Network Security',
      'Identity & Access Management (IAM)',
    ],
    sampleBullets: [
      {
        heading: 'SOC Incident Response & Threat Hunting',
        bullet:
          'Monitored and investigated 400+ daily security alerts across 12,000 corporate endpoints using Splunk SIEM and CrowdStrike Falcon.',
        metric:
          'Reduced Mean Time to Remediate (MTTR) critical security incidents by 46% (from 85 minutes to 46 minutes).',
      },
      {
        heading: 'Vulnerability Management & Patching',
        bullet:
          'Led bi-weekly vulnerability scanning across AWS cloud infrastructure and on-premises servers using Tenable Nessus.',
        metric:
          'Remediated 180+ critical and high CVE vulnerabilities within 14-day SLA, achieving 100% SOC 2 audit compliance.',
      },
      {
        heading: 'Security Awareness & Phishing Simulation',
        bullet:
          'Executed automated phishing awareness campaigns and security training modules for 1,800 enterprise employees.',
        metric:
          'Decreased simulated phishing click-through rate from 16.4% to under 2.1% in 6 months.',
      },
    ],
    skillsMatrix: [
      {
        category: 'SIEM & Monitoring',
        skills: ['Splunk', 'Microsoft Sentinel', 'CrowdStrike Falcon', 'Wireshark'],
      },
      {
        category: 'Frameworks & Standards',
        skills: ['NIST CSF', 'ISO 27001', 'SOC 2 Type II', 'MITRE ATT&CK'],
      },
      {
        category: 'Tools & Security',
        skills: ['Nessus', 'Qualys', 'Burp Suite', 'Metasploit', 'Okta IAM', 'Palo Alto Firewalls'],
      },
    ],
    dosAndDonts: [
      {
        do: 'List certifications prominently: CISSP, CompTIA Security+, CEH, or CySA+ at the top of your resume.',
        dont: 'Never disclose confidential breach details or sensitive customer network topology names.',
      },
    ],
    faqs: [
      {
        q: 'How can I ensure my cybersecurity resume passes enterprise ATS filters?',
        a: 'Ensure your resume includes industry-standard framework terms like NIST, MITRE ATT&CK, SIEM, and EDR, alongside verified certifications (Security+, CISSP).',
      },
    ],
  },

  'ui-ux-designer': {
    slug: 'ui-ux-designer',
    roleName: 'UI/UX Product Designer',
    category: 'Design & Product',
    metaTitle: 'UI/UX Designer Resume Template (2026 Free ATS Word Format)',
    metaDescription:
      'Download free ATS UI/UX Designer resume template (Harvard DOCX & Google Docs). Highlights Figma design systems, usability testing, and conversion lift bullets.',
    heroTitle: 'UI/UX Designer Resume Template (ATS-Optimized)',
    heroDescription:
      'Crafted for Product Designers, UI/UX Specialists, and UX Researchers. Single-column format engineered to showcase design systems, user testing, and measurable conversion gains.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl:
      'https://docs.google.com/document/d/1tbnWMFkKT0c4Mh_IKhrobi_yK8qtjL6vkCgvXWCIKI0/edit?tab=t.0',
    atsKeywords: [
      'User Experience (UX) Design',
      'Figma & FigJam',
      'Design Systems & Component Libraries',
      'User Research & Usability Testing',
      'Wireframing & Prototyping',
      'Information Architecture (IA)',
      'Conversion Rate Optimization (CRO)',
      'Accessibility (WCAG 2.1)',
      'Cross-Functional Collaboration',
      'Mobile-First Responsive Design',
      'Interaction Design',
    ],
    sampleBullets: [
      {
        heading: 'Design System & Component Library',
        bullet:
          'Built and governed a centralized multi-brand Figma design system comprising 120+ tokens and 85 responsive accessible components.',
        metric: 'Reduced design-to-development handoff cycle by 40% across 5 core product squads.',
      },
      {
        heading: 'UX Redesign & Funnel Conversion',
        bullet:
          'Conducted 28 unmoderated usability tests on SaaS checkout onboarding flow, identifying high-friction mobile form inputs.',
        metric:
          'Increased mobile sign-up completion rate by 22.4%, boosting monthly ARR by $310,000.',
      },
      {
        heading: '0-to-1 Product Discovery & Prototyping',
        bullet:
          'Iterated interactive high-fidelity clickable prototypes for new enterprise analytics dashboard from customer journey mapping.',
        metric: 'Secured 92% System Usability Scale (SUS) score during enterprise beta testing.',
      },
    ],
    skillsMatrix: [
      {
        category: 'Design & Prototyping',
        skills: ['Figma', 'FigJam', 'Adobe Creative Cloud', 'Protopie', 'Wireframing'],
      },
      {
        category: 'Research & Strategy',
        skills: [
          'User Journey Mapping',
          'Usability Testing',
          'User Interviews',
          'Card Sorting',
          'A/B Testing',
        ],
      },
      {
        category: 'Technical Familiarity',
        skills: ['HTML5/CSS3', 'Design Tokens', 'WCAG Accessibility', 'Storybook'],
      },
    ],
    dosAndDonts: [
      {
        do: 'Include your portfolio URL (e.g. yourname.design) directly below your name in plain text.',
        dont: 'Never submit an image-heavy PDF or non-text graphical resume that ATS scanners cannot parse.',
      },
    ],
    faqs: [
      {
        q: 'Why do UI/UX designers need an ATS-friendly text resume if they have a portfolio?',
        a: 'Recruiting systems parse your written resume first before routing your portfolio link to the hiring manager. If your resume fails the ATS parse, no human will ever see your Figma prototypes.',
      },
    ],
  },

  'account-executive': {
    slug: 'account-executive',
    roleName: 'Account Executive (AE)',
    category: 'Sales & GTM',
    metaTitle: 'Account Executive Resume Template (2026 Free ATS Word)',
    metaDescription:
      'Download free ATS Account Executive resume template (Harvard DOCX & Google Docs). Highlights annual quota attainment %, enterprise closing, and MEDDPICC deal execution.',
    heroTitle: 'Account Executive Resume Template (ATS-Optimized)',
    heroDescription:
      'Designed for Mid-Market, Commercial, and Enterprise Account Executives. Proves revenue closing velocity, sales cycle compression, and multi-year contract values.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl: 'https://docs.google.com/document/d/1AVi3XeRchX1VkuRta5Jiy1zhMJz0S3qa/edit',
    atsKeywords: [
      'Quota Attainment (%)',
      'Closed-Won Revenue ($ ARR)',
      'MEDDPICC / MEDDIC Deal Qualification',
      'Contract Negotiation & Closing',
      'Enterprise Sales Cycles',
      'C-Suite Executive Presentations',
      'Annual Contract Value (ACV)',
      'Pipeline Forecasting',
      'Salesforce CRM Pipeline Management',
      'Challenger Sales Methodology',
      'Complex Stakeholder Management',
    ],
    sampleBullets: [
      {
        heading: 'Quota Attainment & Closed-Won Revenue',
        bullet:
          'Closed $2.4M in new enterprise software ARR across 18 multi-year contracts, leading team in deal velocity.',
        metric:
          "Achieved 142% of annual sales quota; awarded President's Club top performer for 2025.",
      },
      {
        heading: 'Deal Qualification & MEDDPICC Execution',
        bullet:
          'Executed MEDDPICC qualification frameworks across complex multi-stakeholder buying committees with 6+ executive decision-makers.',
        metric:
          'Shortened average sales cycle from 120 days to 74 days while increasing average ACV by 28%.',
      },
      {
        heading: 'Competitive Displacement & Renewals',
        bullet:
          'Navigated intense incumbent vendor pushback by leading ROI benchmark workshops with CFO and CTO prospects.',
        metric:
          'Displaced legacy incumbent in 8 competitive bake-offs, totaling $820k in high-margin SaaS revenue.',
      },
    ],
    skillsMatrix: [
      {
        category: 'Methodologies',
        skills: ['MEDDPICC', 'Challenger Sale', 'Sandler Selling System', 'Force Management'],
      },
      {
        category: 'Sales Tools',
        skills: ['Salesforce', 'Gong.io', 'Outreach', 'ZoomInfo', 'LinkedIn Sales Navigator'],
      },
    ],
    dosAndDonts: [
      {
        do: 'Put your quota % attainment and exact ARR dollar figures in bold in the very first bullet.',
        dont: 'Do not hide behind team metrics—enterprise VPs of Sales want to see YOUR individual contributor numbers.',
      },
    ],
    faqs: [
      {
        q: 'What do sales leaders look for first on an Account Executive resume?',
        a: 'Direct proof of quota attainment over multiple quarters (e.g. "135% quota attainment in 2024; 142% in 2025") and total dollar revenue generated.',
      },
    ],
  },

  'customer-success-manager': {
    slug: 'customer-success-manager',
    roleName: 'Customer Success Manager (CSM)',
    category: 'GTM & Retention',
    metaTitle: 'Customer Success Manager Resume Template (2026 Free ATS)',
    metaDescription:
      'Download free ATS Customer Success Manager resume template (Harvard DOCX & Google Docs). Highlights Net Retention Rate (NRR), churn reduction, and account expansion.',
    heroTitle: 'Customer Success Manager Resume Template (ATS-Optimized)',
    heroDescription:
      'Tailored for Enterprise CSMs, Account Managers, and Retention Leaders. Demonstrates Net Retention Rate (NRR) expansion, customer health scoring, and renewals.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl:
      'https://docs.google.com/document/d/1tbnWMFkKT0c4Mh_IKhrobi_yK8qtjL6vkCgvXWCIKI0/edit?tab=t.0',
    atsKeywords: [
      'Net Retention Rate (NRR)',
      'Gross Retention Rate (GRR)',
      'Customer Health Scoring',
      'Churn Reduction & Mitigation',
      'Executive Business Reviews (QBRs)',
      'Upsell & Cross-Sell Expansion',
      'Client Onboarding & Adoption',
      'Customer Advocacy & NPS',
      'Gainsight / Totango',
      'Contract Renewal Management',
    ],
    sampleBullets: [
      {
        heading: 'Account Retention & NRR Growth',
        bullet:
          'Managed portfolio of 38 tier-1 enterprise SaaS accounts representing $4.8M in Annual Recurring Revenue (ARR).',
        metric:
          'Achieved 118% Net Retention Rate (NRR) and 96% Gross Retention Rate (GRR) over 4 consecutive quarters.',
      },
      {
        heading: 'Account Expansion & Upselling',
        bullet:
          'Partnered with product and sales to identify expansion use cases during quarterly executive business reviews (QBRs).',
        metric:
          'Generated $680,000 in expansion and upsell ARR across existing enterprise client portfolio.',
      },
      {
        heading: 'Onboarding & Time-to-Value',
        bullet:
          'Redesigned customer onboarding playbook with milestone-based health score tracking in Gainsight.',
        metric:
          'Reduced customer Time-to-Value (TTV) by 38% (from 60 days to 37 days) across 45 new customer cohorts.',
      },
    ],
    skillsMatrix: [
      {
        category: 'Customer Success Platforms',
        skills: ['Gainsight', 'Totango', 'ChurnZero', 'Salesforce CRM'],
      },
      {
        category: 'Core Metrics',
        skills: [
          'Net Revenue Retention (NRR)',
          'Gross Retention Rate (GRR)',
          'NPS / CSAT',
          'QBR Delivery',
        ],
      },
    ],
    dosAndDonts: [
      {
        do: 'Quantify your portfolio size ($ ARR managed) and specific NRR/GRR percentages.',
        dont: 'Do not list generic customer support duties like "Answered client emails and resolved tickets".',
      },
    ],
    faqs: [
      {
        q: 'How should a CSM prove revenue retention impact on a resume?',
        a: 'By leading with commercial retention metrics: NRR above 110%, low gross churn, and concrete upsell ARR generated through strategic relationship building.',
      },
    ],
  },

  'financial-analyst': {
    slug: 'financial-analyst',
    roleName: 'Financial Analyst',
    category: 'Finance & Banking',
    metaTitle: 'Financial Analyst Resume Template (2026 Free ATS Word)',
    metaDescription:
      'Download free ATS Financial Analyst resume template (Harvard DOCX & Google Docs). Highlights financial modeling, DCF valuation, variance analysis, and Excel macros.',
    heroTitle: 'Financial Analyst Resume Template (ATS-Optimized)',
    heroDescription:
      'Engineered for Corporate FP&A, Investment Banking, and Private Equity analysts. Proven Harvard single-column layout showcasing valuation models, budgeting, and variance analysis.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl: 'https://docs.google.com/document/d/1AVi3XeRchX1VkuRta5Jiy1zhMJz0S3qa/edit',
    atsKeywords: [
      'Financial Modeling & Forecasting',
      'Discounted Cash Flow (DCF)',
      'Variance Analysis (Budget vs Actual)',
      'Corporate FP&A',
      'Advanced Excel (VBA, Power Query)',
      'Capital Budgeting & CapEx',
      'Three-Statement Financial Models',
      'ERP Systems (SAP, NetSuite)',
      'Cost Optimization Analysis',
      'Mergers & Acquisitions (M&A) Due Diligence',
    ],
    sampleBullets: [
      {
        heading: 'Corporate Financial Modeling & Forecasting',
        bullet:
          'Built dynamic 3-statement integrated financial forecast and annual operating budget for $140M business unit.',
        metric:
          'Improved quarterly revenue forecasting accuracy within 2.1% variance over 8 quarters.',
      },
      {
        heading: 'Variance Analysis & Cost Reduction',
        bullet:
          'Conducted monthly OPEX and CAPEX variance analysis across 14 operational cost centers in NetSuite.',
        metric:
          'Identified redundant vendor licensing and procurement discrepancies, eliminating $480,000 in unbudgeted overhead.',
      },
      {
        heading: 'M&A Valuation & Due Diligence',
        bullet:
          'Constructed Discounted Cash Flow (DCF) and comparable company analysis (Comps) for $45M target acquisition.',
        metric:
          'Delivered executive board deck modeling synergies and debt payback schedules, supporting successful deal close.',
      },
    ],
    skillsMatrix: [
      {
        category: 'Financial Modeling',
        skills: ['3-Statement Models', 'DCF Valuation', 'LBO Models', 'Scenario Analysis'],
      },
      {
        category: 'Software & Tools',
        skills: ['Advanced Excel', 'SAP ERP', 'Oracle NetSuite', 'Bloomberg Terminal', 'Power BI'],
      },
    ],
    dosAndDonts: [
      {
        do: 'Use the official Harvard Career Services template—it is the gold standard across Wall Street and Fortune 500 finance.',
        dont: 'Never use colorful charts or graphics; finance recruiters demand clean, monochrome typography.',
      },
    ],
    faqs: [
      {
        q: 'Why do investment banks insist on single-column resume formats?',
        a: 'Top investment banks and corporate finance departments require single-column, cleanly aligned chronological resumes that allow immediate audit of educational pedigree, modeling experience, and dollar scale.',
      },
    ],
  },

  'business-analyst': {
    slug: 'business-analyst',
    roleName: 'Business Analyst',
    category: 'Strategy & Operations',
    metaTitle: 'Business Analyst Resume Template (2026 Free ATS Word Format)',
    metaDescription:
      'Download free ATS Business Analyst resume template (Harvard DOCX & Google Docs). Highlights requirements gathering, SQL, process mapping, and stakeholder management.',
    heroTitle: 'Business Analyst Resume Template (ATS-Optimized)',
    heroDescription:
      'Built for Business Systems Analysts, Operations Analysts, and Strategy Consultants. Demonstrates BRD authoring, workflow optimization, and data-backed operational savings.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl:
      'https://docs.google.com/document/d/1tbnWMFkKT0c4Mh_IKhrobi_yK8qtjL6vkCgvXWCIKI0/edit?tab=t.0',
    atsKeywords: [
      'Business Requirements Document (BRD)',
      'Process Mapping (BPMN)',
      'SQL Querying',
      'Stakeholder Management',
      'Gap Analysis',
      'Agile / Scrum Frameworks',
      'Cost-Benefit Analysis',
      'User Acceptance Testing (UAT)',
      'Jira & Confluence',
      'Cross-Functional Process Optimization',
    ],
    sampleBullets: [
      {
        heading: 'Requirements Gathering & Process Automation',
        bullet:
          'Authored comprehensive BRD and functional specifications to automate manual loan application approval pipeline.',
        metric:
          'Reduced loan application processing cycle from 5 days to 4 hours; saved 2,400 operational hours annually.',
      },
      {
        heading: 'SQL Data Analysis & Gap Identification',
        bullet:
          'Executed SQL queries across 1.2M customer fulfillment records in PostgreSQL to pinpoint supply chain bottlenecks.',
        metric:
          'Eliminated order fulfillment delays by 28%, improving customer satisfaction (CSAT) from 78% to 92%.',
      },
      {
        heading: 'User Acceptance Testing (UAT) & Rollout',
        bullet:
          'Coordinated UAT testing across 60 business users and 14 engineers, tracking 110 bug tickets to resolution in Jira.',
        metric:
          'Delivered CRM migration on schedule with zero critical post-launch business interruptions.',
      },
    ],
    skillsMatrix: [
      {
        category: 'Analysis & Methodologies',
        skills: ['Requirements Gathering', 'Gap Analysis', 'BPMN Mapping', 'Agile/Scrum', 'UAT'],
      },
      {
        category: 'Data & Tools',
        skills: ['SQL', 'Jira', 'Confluence', 'Visio', 'Excel Power Query', 'Tableau'],
      },
    ],
    dosAndDonts: [
      {
        do: 'Connect process improvements to tangible business value: hours saved, error rates reduced, and cost savings.',
        dont: 'Do not simply list business documents created without explaining the problem they resolved.',
      },
    ],
    faqs: [
      {
        q: 'How do I highlight business analysis competencies for ATS parsers?',
        a: 'Use single-column layout highlighting key methodologies (BRD, BPMN, UAT, Agile) and data competencies (SQL, Tableau) in clear bullet points.',
      },
    ],
  },

  'scrum-master': {
    slug: 'scrum-master',
    roleName: 'Scrum Master & Agile Coach',
    category: 'Agile & Project Management',
    metaTitle: 'Scrum Master Resume Template (2026 Free ATS Word Format)',
    metaDescription:
      'Download free ATS Scrum Master resume template (Harvard DOCX & Google Docs). Highlights sprint velocity, release cadences, team retrospectives, and agile metrics.',
    heroTitle: 'Scrum Master Resume Template (ATS-Optimized)',
    heroDescription:
      'Engineered for Certified Scrum Masters (CSM), Agile Coaches, and Delivery Leads. Demonstrates sprint velocity improvement, blocker removal, and scaled agile delivery.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl:
      'https://docs.google.com/document/d/1tbnWMFkKT0c4Mh_IKhrobi_yK8qtjL6vkCgvXWCIKI0/edit?tab=t.0',
    atsKeywords: [
      'Certified Scrum Master (CSM / PSM)',
      'Sprint Planning & Retrospectives',
      'Sprint Velocity & Burndown',
      'Blocker Removal & Impediment Clearing',
      'Jira Software Administration',
      'Scaled Agile Framework (SAFe)',
      'Cross-Functional Team Facilitation',
      'Kanban Flow Optimization',
      'Cycle Time & Lead Time Reduction',
    ],
    sampleBullets: [
      {
        heading: 'Sprint Facilitation & Team Velocity',
        bullet:
          'Facilitated bi-weekly sprint planning, daily stand-ups, backlog refinement, and retrospectives for 3 distributed development squads (24 engineers).',
        metric:
          'Increased average team sprint velocity by 34% over 6 months while decreasing sprint rollover tasks to under 5%.',
      },
      {
        heading: 'Cycle Time & Workflow Optimization',
        bullet:
          'Transitioned legacy waterfall release cycle to continuous 2-week agile delivery cadences with automated Jira workflow gates.',
        metric:
          'Reduced average feature lead time from 45 days to 14 days, boosting on-time delivery from 68% to 94%.',
      },
      {
        heading: 'Cross-Squad Dependency & Blocker Resolution',
        bullet:
          'Identified and cleared critical cross-team blockers between infrastructure and mobile development squads.',
        metric:
          'Prevented an estimated 120 engineering hours of blocked sprint downtime across quarterly product releases.',
      },
    ],
    skillsMatrix: [
      {
        category: 'Certifications',
        skills: ['CSM (Certified Scrum Master)', 'PSM I / PSM II', 'SAFe Agilist', 'PMP'],
      },
      {
        category: 'Agile Frameworks',
        skills: ['Scrum', 'Kanban', 'Scaled Agile (SAFe)', 'Continuous Delivery'],
      },
      {
        category: 'Tools',
        skills: ['Jira Software', 'Confluence', 'Miro', 'Azure DevOps', 'Trello'],
      },
    ],
    dosAndDonts: [
      {
        do: 'Feature verified certifications (CSM, PSM) in your resume header right beside your name.',
        dont: 'Do not portray yourself as a command-and-control project manager; emphasize servant leadership and team enablement.',
      },
    ],
    faqs: [
      {
        q: 'Which agile certifications should be prioritized on a Scrum Master resume?',
        a: 'Both CSM (Scrum Alliance) and PSM (Scrum.org) are recognized worldwide and should be listed in your title and certification sections.',
      },
    ],
  },

  'marketing-manager': {
    slug: 'marketing-manager',
    roleName: 'Marketing Manager',
    category: 'Growth & Brand',
    metaTitle: 'Marketing Manager Resume Template (2026 Free ATS Word)',
    metaDescription:
      'Download free ATS Marketing Manager resume template (Harvard DOCX & Google Docs). Features CAC reduction, demand gen, pipeline ROI, and performance marketing bullets.',
    heroTitle: 'Marketing Manager Resume Template (ATS-Optimized)',
    heroDescription:
      'Built for Performance Marketers, Growth Leads, and Brand Managers. Proves customer acquisition cost (CAC) reduction, pipeline pipeline generation, and campaign ROI.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl:
      'https://docs.google.com/document/d/1tbnWMFkKT0c4Mh_IKhrobi_yK8qtjL6vkCgvXWCIKI0/edit?tab=t.0',
    atsKeywords: [
      'Customer Acquisition Cost (CAC)',
      'Demand Generation & Pipeline',
      'Paid Acquisition (Google Ads, Meta, LinkedIn)',
      'Search Engine Optimization (SEO)',
      'Marketing Qualified Leads (MQLs)',
      'Conversion Rate Optimization (CRO)',
      'Multi-Touch Attribution',
      'HubSpot / Marketo Marketing Automation',
      'Brand Positioning & Content Strategy',
    ],
    sampleBullets: [
      {
        heading: 'Demand Generation & Pipeline Sourcing',
        bullet:
          'Managed a $120,000 monthly paid growth budget across Google Search, LinkedIn Ads, and Meta Ads for B2B SaaS platform.',
        metric:
          'Generated $3.4M in sales-qualified pipeline at a 28% lower Customer Acquisition Cost (CAC).',
      },
      {
        heading: 'Organic SEO & Inbound Traffic Scaling',
        bullet:
          'Architected programmatic SEO content cluster strategy and technical backlink acquisition campaign.',
        metric:
          'Increased organic website traffic by 340% (from 45k to 198k monthly visits), driving 1,200+ monthly inbound MQLs.',
      },
      {
        heading: 'Lifecycle Marketing & Email Automation',
        bullet:
          'Revamped automated nurture workflows and product-onboarding email sequences in HubSpot.',
        metric:
          'Lifted trial-to-paid conversion rate by 18%, recovering $420,000 in annual recurring revenue.',
      },
    ],
    skillsMatrix: [
      {
        category: 'Growth & Performance',
        skills: [
          'Google Ads',
          'LinkedIn Campaign Manager',
          'Meta Ads',
          'SEO (Ahrefs, Semrush)',
          'Google Analytics 4',
        ],
      },
      {
        category: 'Automation & CRM',
        skills: ['HubSpot', 'Marketo', 'Klaviyo', 'Salesforce CRM'],
      },
    ],
    dosAndDonts: [
      {
        do: 'Lead with financial returns: return on ad spend (ROAS), pipeline generated, and CAC reduction.',
        dont: 'Do not rely on vanity metrics like "impressions" or "likes" without connecting them to pipeline or revenue.',
      },
    ],
    faqs: [
      {
        q: 'How should modern growth and marketing managers quantify their resumes?',
        a: 'Connect campaign activity directly to revenue metrics: pipeline generated, CAC reduction percentage, ROAS multiples, and inbound sales-qualified leads.',
      },
    ],
  },

  'human-resources-specialist': {
    slug: 'human-resources-specialist',
    roleName: 'HR Specialist & Talent Partner',
    category: 'HR & Talent',
    metaTitle: 'HR Specialist Resume Template (2026 Free ATS Word Format)',
    metaDescription:
      'Download free ATS HR Specialist resume template (Harvard DOCX & Google Docs). Highlights employee retention, onboarding, talent acquisition, and HRIS systems.',
    heroTitle: 'HR Specialist Resume Template (ATS-Optimized)',
    heroDescription:
      'Tailored for People Operations, HR Business Partners, and Talent Acquisition specialists. Demonstrates retention improvements, HRIS system automation, and compliance.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl:
      'https://docs.google.com/document/d/1tbnWMFkKT0c4Mh_IKhrobi_yK8qtjL6vkCgvXWCIKI0/edit?tab=t.0',
    atsKeywords: [
      'Talent Acquisition & Full-Cycle Recruiting',
      'Employee Onboarding & Retention',
      'HRIS Administration (Workday, BambooHR)',
      'Performance Management & OKRs',
      'Employee Relations & Compliance',
      'Compensation & Benefits Strategy',
      'Diversity, Equity & Inclusion (DEI)',
      'HR Policy & Labor Law',
    ],
    sampleBullets: [
      {
        heading: 'Talent Acquisition & Time-to-Hire',
        bullet:
          'Managed full-cycle recruitment across technical and business departments, sourcing and screening 140+ hires annually.',
        metric:
          'Reduced average Time-to-Hire from 52 days to 28 days while decreasing external agency recruiting spend by $160,000.',
      },
      {
        heading: 'Onboarding & First-Year Employee Retention',
        bullet:
          'Revamped corporate employee onboarding experience with automated 30-60-90 day milestone check-ins in BambooHR.',
        metric:
          'Increased first-year employee retention rate from 74% to 91% across 220 new hires.',
      },
      {
        heading: 'Performance Management & Culture',
        bullet:
          'Implemented semi-annual 360-degree performance evaluation and compensation calibration framework across 600 employees.',
        metric: 'Boosted employee engagement eNPS score from +14 to +48 in 12 months.',
      },
    ],
    skillsMatrix: [
      {
        category: 'HRIS & ATS Platforms',
        skills: ['Workday', 'BambooHR', 'Greenhouse', 'Lever', 'Rippling'],
      },
      {
        category: 'Certifications & Skills',
        skills: ['SHRM-CP / SHRM-SCP', 'PHR / SPHR', 'Employee Relations', 'Compliance'],
      },
    ],
    dosAndDonts: [
      {
        do: 'Demonstrate measurable workforce outcomes: retention rates, time-to-hire reduction, and cost savings.',
        dont: 'Do not use casual conversational language; maintain rigorous human resources terminology.',
      },
    ],
    faqs: [
      {
        q: 'Where should HR certifications like SHRM-CP or PHR be placed?',
        a: 'SHRM-CP, SHRM-SCP, PHR, and SPHR certifications should be featured prominently at the top of your resume and in your summary.',
      },
    ],
  },

  'internship-resume': {
    slug: 'internship-resume',
    roleName: 'College Internship & Co-op',
    category: 'Students & Graduates',
    metaTitle: 'Internship Resume Template (2026 Free ATS Word Format)',
    metaDescription:
      'Download free ATS resume template for summer internships and co-ops (Harvard DOCX). Zero work experience formatting tips, projects, and coursework.',
    heroTitle: 'College Internship Resume Template (ATS-Optimized)',
    heroDescription:
      'Designed for college students applying for competitive summer internships, co-ops, and research fellowships. Highlights relevant coursework, leadership, and class projects.',
    docxUrl:
      'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    gdocsUrl: 'https://docs.google.com/document/d/1AVi3XeRchX1VkuRta5Jiy1zhMJz0S3qa/edit',
    atsKeywords: [
      'University Coursework',
      "Academic Honors & Dean's List",
      'Student Leadership',
      'Technical Projects',
      'Problem-Solving Skills',
      'Team Collaboration',
      'Research & Presentation',
      'Extracurricular Activities',
      'Fast Learner',
    ],
    sampleBullets: [
      {
        heading: 'Course Project & Hands-On Application',
        bullet:
          'Collaborated with 3 peers to develop an interactive web data visualizer analyzing campus dining sustainability metrics.',
        metric:
          'Presented findings to campus administration; project awarded 1st place in Annual Department Showcase.',
      },
      {
        heading: 'Campus Organization Leadership',
        bullet:
          'Elected Treasurer of student business association, managing financial allocations for 8 annual networking events.',
        metric:
          'Organized career fair with 15 corporate sponsors, attracting 400+ student attendees.',
      },
      {
        heading: 'Academic Excellence & Coursework',
        bullet:
          'Maintained 3.8/4.0 GPA with relevant coursework in Data Structures, Linear Algebra, and Corporate Finance.',
        metric: "Awarded Dean's Honor List for 4 consecutive academic semesters.",
      },
    ],
    skillsMatrix: [
      {
        category: 'Technical Skills',
        skills: ['Python / Java', 'Excel (Pivot Tables)', 'Google Workspace', 'Git Basics'],
      },
      {
        category: 'Core Competencies',
        skills: [
          'Public Speaking',
          'Critical Thinking',
          'Project Coordination',
          'Technical Writing',
        ],
      },
    ],
    dosAndDonts: [
      {
        do: 'Place your Education and Expected Graduation Date (e.g. "Expected May 2027") at the very top of your resume.',
        dont: 'Do not include high school achievements if you are past your freshman year of university.',
      },
    ],
    faqs: [
      {
        q: 'How long should a student or internship resume be?',
        a: 'Strictly 1 page. Recruiters review internship resumes in under 10 seconds; concise single-column layouts with clear project bullets perform best.',
      },
    ],
  },
}
