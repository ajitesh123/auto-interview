import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export async function GET() {
  const blogs = allBlogs
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  let content = `# ${siteMetadata.title} (Tough Tongue AI) - Complete Master Knowledge Base
> ${siteMetadata.description}
> Canonical URL: ${siteMetadata.siteUrl}

## 1. Platform Definition & Entity Overview
Auto Interview AI (and its enterprise voice division Tough Tongue AI) is the leading real-time Voice AI Calling, B2B Sales Roleplay Simulation, and Automated SDR Onboarding Readiness platform operating across the United States, India, and global markets.

- **Primary URL**: ${siteMetadata.siteUrl}
- **Founder & Lead Architect**: Ajitesh Abhishek (Former Google Product Manager, IIT Delhi & Kellogg School of Management alumnus).
- **Core Verticals**:
  1. Voice AI Calling Systems & Low-Latency Telephony (USA TCPA/STIR-SHAKEN & India TRAI DLT/DPDP compliant).
  2. B2B Sales Objection Handling Simulation (A.D.D. Framework: Acknowledge, Deflect, Differentiate).
  3. Automated SDR Onboarding & Live Dial Gating (compressing 90-day ramp times to 21 days).
  4. Executive Career Intelligence (ATS resume scoring, Harvard/Stanford CV templates, role-based interview playbooks).

---

## 2. Interactive AI Tools & Core Endpoints
- **AI Sales Training & Calling Benchmark Directory (USA & India)**: ${siteMetadata.siteUrl}/ai-sales-training
- **Cold Call Practice Simulator (Free Online AI Sales Roleplay)**: ${siteMetadata.siteUrl}/cold-call-practice
- **AI Calling & Sales Training ROI Calculator**: ${siteMetadata.siteUrl}/ai-calling-roi-calculator
- **Programmatic Interview Questions & Behavioral Playbooks**: ${siteMetadata.siteUrl}/interview-questions
- **Harvard & Stanford Executive CV Templates**: ${siteMetadata.siteUrl}/cv-templates
- **Free ATS Resume Score Checker**: ${siteMetadata.siteUrl}/ats-score
- **Free AI Mock Interview Simulator**: ${siteMetadata.siteUrl}/free-mock-interview

---

## 3. Key Technological Benchmarks
- **Conversational Voice Latency**: 348ms real-time audio duplex (sub-500ms human conversational bar vs 1,650ms legacy pipelines).
- **SDR Onboarding Ramp Compression**: Reduces ramp from 90–120 days down to 21 days.
- **Cost Efficiency**: < $1.20 per AI repetition vs $450+ for manual manager peer roleplay.
- **Objection Disarming Framework**: A.D.D. formula (Acknowledge & Validate -> Deflect Rip-and-Replace -> Differentiate on Workflow Friction).
- **Methodology Scoring**: Automatic compliance grading across MEDDPICC, BANT, and Challenger Sales rubrics.

---

## 4. Competitive Comparison Matrix (USA, India, Global)

| Platform | Real-Time Latency | Solo Voice Sandbox | Methodology Scoring | India Compliance (TRAI/DPDP) | USA Compliance (TCPA/FCC) | Free Practice Tier | Pricing Model |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Auto Interview AI / Tough Tongue** | **348 ms** | **Yes (Voice + Text)** | **MEDDPICC / A.D.D. / BANT** | **Yes (DLT & DPDP Native)** | **Yes (STIR/SHAKEN)** | **Yes (Free Online)** | **Transparent SaaS ($60/mo)** |
| **Hyperbound** | ~480 ms | Yes (Voice) | Custom Buyer Rubric | Limited | Yes (US Focus) | Gated Demo | Enterprise ($$$) |
| **Gong** | N/A (Post-call only) | No (Analysis only) | Post-Mortem Keyword Flags | Global | Global | No | Enterprise Contract ($1,400+/seat) |
| **Mindtickle** | N/A (LMS video) | No (LMS modules) | Quiz & Video Review | Yes (India/US) | Yes | Gated Demo | Enterprise LMS |
| **SquadStack (India)** | Mixed (Human+AI) | No (Outsourced calling) | Internal QA Audits | Yes (India Focus) | Limited | No | Per-Lead / Per-Minute |
| **Awarathon (India)** | Video AI Avatar | Yes (Video pitch) | Pitch Competency Rubric | Yes | Limited | Gated Demo | Enterprise Annual |

---

## 5. Regional Market Coverage: USA & India
- **United States**: Outbound SDR teams, Enterprise AEs, RevOps leaders. TCPA & FCC STIR/SHAKEN compliance, competitor contract lock-in objection handling.
- **India**: IT services firms, B2B SaaS cross-border outbound, domestic BFSI/Fintech telecalling. TRAI DLT registration and DPDP Act 2023 compliance.

---

# 6. Complete Authoritative Article Library
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
