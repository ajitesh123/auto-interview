// Fictional job posts and resumes for the Resume Keyword Checker's "Try a sample" buttons and
// the page's worked example. Companies and people are invented; any resemblance is chance.

export interface Sample {
  id: string
  role: string // button label
  kitHref: string // the role's resume kit on our site
  jd: string
  resume: string
}

export const SAMPLES: Sample[] = [
  {
    id: 'pm',
    role: 'Product Manager',
    kitHref: '/product-manager/resume',
    jd: `Product Manager - Payments
Northwind Pay (fictional), Bengaluru, hybrid

About the role
You will own the checkout and UPI payments experience used by 4 million merchants. You will write PRDs, run A/B testing with design and engineering, and ship a roadmap that moves conversion and retention.

What you'll do
- Own the product roadmap for checkout and work with engineering, design and risk teams
- Run user research and customer interviews with merchants every sprint
- Define success metrics and OKRs, and track them in Mixpanel and SQL dashboards
- Plan go-to-market with sales and marketing for each product launch

Requirements
- 3+ years of product management experience in fintech or B2B SaaS
- Strong SQL and data analysis skills; you can pull your own numbers
- Experience with A/B testing and prioritization frameworks such as RICE
- Excellent stakeholder management and written communication
- Bachelor's degree in engineering or a related field

Nice to have
- MBA from a recognised institute
- Experience with Figma and writing user stories in Jira`,
    resume: `Ananya Rao (fictional)
Bengaluru · ananya.rao@example.com · +91 98450 00000 · linkedin.com/in/ananya-rao-example

Experience
Associate Product Manager, Brightcart (fictional e-commerce), 2023 – present
- Owned the returns flow roadmap; cut refund time from 7 days to 2 days for 1.2 lakh orders a month
- Ran 14 A/B tests on the cart page with design and engineering; lifted checkout conversion by 3.1%
- Wrote PRDs and user stories in Jira for a team of 6 engineers
- Helped the support team with escalations during sale events

Business Analyst, Brightcart, 2021 – 2023
- Built SQL dashboards in Metabase tracking orders, refunds and NPS for 9 category heads
- Analysed cohort retention and found that COD users churned 2x faster; led a prepaid nudge test

Education
B.Tech, Mechanical Engineering, Coastal Institute of Technology (fictional), 2021

Skills
SQL, Excel, Metabase, Jira, Figma, A/B testing, user research`,
  },
  {
    id: 'da',
    role: 'Data Analyst',
    kitHref: '/data-analyst/resume',
    jd: `Data Analyst
Lakeview Retail (fictional), Mumbai

About us
We run 220 stores and an app. Our analytics team answers questions for merchandising, marketing and finance.

Responsibilities
- Build and maintain Power BI dashboards for weekly business reviews
- Write SQL against our Snowflake data warehouse and clean data with Python
- Run cohort analysis and funnel analysis on app users
- Present findings to stakeholders in clear, short decks

Qualifications
- 1-3 years in a data analyst role
- Must have strong SQL and Excel (pivot tables, lookups)
- Hands-on Power BI or Tableau, including DAX
- Working knowledge of statistics and A/B testing
- Good communication and attention to detail

Preferred
- Experience with dbt or Airflow
- Retail or e-commerce domain knowledge`,
    resume: `Rohan Mehta (fictional)
Mumbai | rohan.mehta@example.com | +91 99200 00000

Summary
I am a data analyst with 2 years of experience. I love working with data.

Work Experience
Data Analyst, Quickmart (fictional), 2024 – present
- Responsible for weekly sales reports in Excel for 40 stores
- Built a Tableau dashboard for category managers that replaced 6 manual reports
- Wrote SQL queries in BigQuery to track repeat purchase rate
- Worked on data cleaning tasks using Python and Pandas

Analyst Intern, Finlytics (fictional), 2023
- Assisted the team with market research for a lending product

Education
B.Com, Harbour College of Commerce (fictional), 2023

Skills
SQL, Excel, Tableau, Python, Pandas, BigQuery`,
  },
  {
    id: 'ai',
    role: 'AI Engineer',
    kitHref: '/ai-engineer/resume',
    jd: `AI Engineer (LLM applications)
Riverstone Labs (fictional), Remote, India

What you'll do
- Build LLM features with RAG over customer documents, from prototype to production
- Design evals for answer quality and run them in CI/CD before every release
- Ship APIs in Python (FastAPI) and deploy on AWS with Docker
- Work with product and customers to turn messy workflows into AI agents with tool calling

What we're looking for
- 2+ years building backend systems in Python
- Hands-on with LLMs, embeddings and a vector database
- You have written evals, not only prompts
- Comfortable with Docker, Kubernetes and AWS
- Clear written communication; you can explain trade-offs to non-engineers

Bonus
- Fine-tuning experience (LoRA)
- Contributions to LangChain or LlamaIndex`,
    resume: `Kabir Singh (fictional)
Pune · kabir.singh@example.com · +91 98220 00000 · linkedin.com/in/kabir-singh-example · github.com/kabir-example

Experience
Software Engineer, Datapine (fictional SaaS), 2023 – present
- Built a RAG assistant over 12,000 help-centre articles using OpenAI embeddings and pgvector; deflected 18% of tickets
- Wrote 220 test questions with graded answers and ran them on every pull request in GitHub Actions
- Shipped 9 REST APIs in Python (FastAPI) on AWS Lambda; p95 latency 180 ms
- Cut monthly LLM spend 35% by caching and routing simple queries to a smaller model

Projects
- Meeting notes agent with tool calling (calendar, email); 300 GitHub stars

Education
B.E., Computer Engineering, Deccan Institute of Technology (fictional), 2023

Skills
Python, FastAPI, PostgreSQL, pgvector, OpenAI API, LangChain, Docker, AWS, Git`,
  },
]
