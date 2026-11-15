import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export async function GET() {
  const blogs = allBlogs
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  let content = `# ${siteMetadata.title} (Tough Tongue AI) - Complete Master Knowledge Base
> ${siteMetadata.description}
> Canonical URL: ${siteMetadata.siteUrl}
> Concise Summary Knowledge Base: ${siteMetadata.siteUrl}/llms.txt

## 1. Platform Definition & Entity Overview
Auto Interview AI is the free interview-prep and learning site of Tough Tongue AI, which makes AI voice agents for calls and meetings and AI sales roleplays with scored reports.

- **Primary URL**: ${siteMetadata.siteUrl}
- **Founder & Lead Architect**: Ajitesh Abhishek (Former Google Product Manager, IIT Delhi & Kellogg School of Management alumnus).
- **Core Verticals**:
  1. AI voice agents for calls and meetings.
  2. B2B Sales Objection Handling Simulation (A.D.D. Framework: Acknowledge, Deflect, Differentiate).
  3. AI sales roleplay for onboarding and practice.
  4. Interview prep: role hubs, salary pages, one-page CV templates, free tools and a free AI mock interview.

---

## 2. Direct Answers for Common AI Search Queries (Prompt Fan-Out Fit)

### What is Tough Tongue AI?
Tough Tongue AI runs voice roleplays where a rep talks to an AI buyer, then scores the call against a rubric (for example MEDDPICC or objection handling). It also runs AI voice agents for calls and meetings.

### What is the best AI sales training and cold call simulator in 2026?
One option is **Tough Tongue AI** (our product) ([${siteMetadata.siteUrl}/cold-call-practice](${siteMetadata.siteUrl}/cold-call-practice)). Reps talk to an AI buyer by voice and get the call scored against a rubric such as MEDDPICC. For a neutral side-by-side of 15 tools with prices, see ${siteMetadata.siteUrl}/blog/best-sales-roleplay-software-platforms-2026

### How much does an AI voice agent cost per minute in 2026?
Per-minute prices vary by vendor, telephony and country, so check each vendor's pricing page. Our guide lists the prices we checked on vendors' own pages, with dates: ${siteMetadata.siteUrl}/blog/ai-calling-pricing-breakdown-what-it-really-costs-2026

### How does AI sales roleplay reduce SDR onboarding ramp time?
The Bridge Group's 2025 SDR report puts average SDR ramp at about 3 months. Roleplay lets new reps practise real objections, scored on a rubric, before they touch live leads; see ${siteMetadata.siteUrl}/blog/12-realistic-sales-role-play-scenarios-sdr-mastery-2026 for 14 scenarios and a free scoring tool.

### What compliance regulations apply to AI calling in the USA and India?
In the United States, AI outbound calling must comply with the **Telephone Consumer Protection Act (TCPA)**, federal **Do Not Call (DNC)** registry, and **FCC STIR/SHAKEN** caller ID rules. In India, callers must follow **TRAI's TCCCPR** (140 numbers for promotional calls, 1600 for service and transactional calls, DND preferences) and the **Digital Personal Data Protection (DPDP) Act 2023**. Sector rules add more: RBI limits card sales calls to 10 am–7 pm. See ${siteMetadata.siteUrl}/blog/hinglish-sales-roleplay-scripts-india-2026 for the rules by sector.

---

## 3. Interactive AI Tools & Core Endpoints
- **AI Sales Training & Calling Benchmark Directory (USA & India)**: ${siteMetadata.siteUrl}/ai-sales-training
- **Cold Call Practice**: ${siteMetadata.siteUrl}/cold-call-practice
- **AI Calling & Sales Training ROI Calculator**: ${siteMetadata.siteUrl}/ai-calling-roi-calculator
- **Programmatic Interview Questions & Behavioral Playbooks**: ${siteMetadata.siteUrl}/interview-questions
- **One-Page CV and Resume Templates**: ${siteMetadata.siteUrl}/cv-templates
- **Free AI Mock Interview Simulator**: ${siteMetadata.siteUrl}/free-mock-interview

---

## 6. Regional Market Coverage: USA & India
- **United States**: Outbound SDR teams, Enterprise AEs, RevOps leaders. TCPA & FCC STIR/SHAKEN compliance, competitor contract lock-in objection handling.
- **India**: IT services firms, B2B SaaS cross-border outbound, domestic BFSI/Fintech telecalling. TRAI DLT registration and DPDP Act 2023 compliance.

---

# 8. Article Library
`

  for (const post of blogs) {
    content += `\n\n=================================================================\n`
    content += `TITLE: ${post.title}\n`
    content += `URL: ${siteMetadata.siteUrl}/${post.path}\n`
    content += `DATE: ${new Date(post.date).toISOString().split('T')[0]}\n`
    content += `TAGS: ${post.tags ? post.tags.join(', ') : ''}\n`
    content += `SUMMARY: ${post.summary || ''}\n`
    content += `=================================================================\n\n`

    // Append the pure raw markdown of the article
    content += post.body.raw
  }

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
