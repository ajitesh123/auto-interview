import type { Lesson } from '../types'
import { PRICE_CHECKED, WORKED, fmtUsd, perRequest, workedRows } from '../aiFeatureCost'

// Worked numbers are computed from data/learnAi/aiFeatureCost.ts so the chart, the text and the
// calculator agree. The ticket-triage feature is our own fictional example, not a measured product.
const rows = workedRows()
const cheapest = rows[0]
const sonnet = rows.find((r) => r.model.id === 'claude-sonnet-5-5')!
const opus = rows.find((r) => r.model.id === 'claude-opus-5-5')!
const haiku = rows.find((r) => r.model.id === 'claude-haiku-5-5')!
const monthReq = WORKED.perDay * (WORKED.days ?? 30)
const inM = (WORKED.inTok * monthReq) / 1_000_000
const outM = (WORKED.outTok * monthReq) / 1_000_000
const usd0 = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`

export const lesson: Lesson = {
  slug: 'ai-product-management',
  track: 'build',
  order: 0,
  title: 'AI product management: spec and ship',
  metaTitle: 'AI Product Management: How to Spec and Ship an AI Feature',
  metaDescription:
    'How an AI PM specs and ships an AI feature: when to use AI, the simplest design, pass/fail criteria, an eval set, the monthly cost maths and a fallback plan.',
  h1: 'AI product management: how to spec, cost and ship an AI feature',
  tldr: `An AI feature is specified differently from a normal one: you write example inputs with pass/fail answers, not just user stories, because the model will sometimes be wrong. The order that works is: check the problem needs AI, pick the simplest design (a single prompt before an agent), write measurable success criteria, build a small eval set, work out the monthly cost per model, and design what happens when the answer is wrong. In our worked example the same feature costs anywhere from ${usd0(cheapest.month)} to ${usd0(opus.month)} a month, depending on the model.`,
  minutes: 18,
  level: 'Intermediate',
  steps: [
    {
      heading: 'Does this feature need AI at all?',
      body: [
        'Start from the user’s problem, not from the model. Google’s People + AI Guidebook says to stop asking "Can we use AI to ___?" and to ask what the user needs first, because sometimes the most valuable thing is a product that behaves the same way every time. A rule or a form is cheaper, faster and never makes things up.',
        'OpenAI’s guide to building agents lists three signs that work is worth handing to a model rather than to more rules (it frames them as the test for an agent, but they work as a first filter for any AI feature): decisions that need nuanced judgment and exceptions, rule sets that have become unwieldy to maintain, and work that depends on reading unstructured text such as emails, documents or chat messages.',
      ],
      bullets: [
        'Judgment with exceptions: approving a refund that depends on the story, not one field',
        'Too many rules: a policy with hundreds of if-then branches nobody wants to edit',
        'Messy text: customer messages, contracts, call notes, CVs',
        'None of the three? Build the rule or the form instead, and say so in the review',
      ],
      keyIdea:
        'An AI PM’s first job is to say no to AI where a rule works. That answer is often the best spec in the room.',
    },
    {
      heading: 'Pick the simplest design that can work',
      body: [
        'Anthropic’s engineers who wrote "Building effective agents" recommend "finding the simplest solution possible" and adding complexity only when it clearly pays off. They separate workflows, where code fixes the steps and the model fills them in, from agents, where the model chooses its own steps and tools. Agents, they note, often trade latency and cost for better results.',
        'So climb the ladder one rung at a time, and only move up when the eval (step 4) shows the lower rung fails. Most first versions of a feature are a single, well-written prompt with the right context.',
      ],
      flow: [
        'Rule or form',
        'One model call',
        'Fixed workflow of calls',
        'Agent that picks its own steps',
      ],
      keyIdea:
        'Each rung up adds cost, delay and new ways to fail. Move up only when the eval says so.',
    },
    {
      heading: 'Write the spec as examples and pass/fail criteria',
      body: [
        'Anthropic’s docs say good success criteria are specific, measurable, achievable and relevant. "Good performance" is not a criterion; "accurate sentiment classification" is. They add that "most use cases need multidimensional evaluation": accuracy, consistency, tone, privacy, use of context, latency and price can all matter at once.',
        'For an AI feature the most useful part of the spec is a table of real inputs with the output you would accept, plus a short never-do list. Engineers can test against it, designers can see the edge cases, and leaders can argue about the examples instead of adjectives. If the feature reads text written by outsiders, such as customer tickets, say that instructions inside that text must be ignored: the Prompt injection lesson on this path shows why.',
      ],
      example: {
        label: 'One-page AI spec: refund-ticket triage (our fictional example)',
        text: `Problem: agents read 20,000 refund tickets a day; simple ones wait hours.
User: support agent, then the customer.
Job: read a ticket + order details, return
  category, suggested action, 2-line reply draft.
Design: one model call, JSON out. No agent.
Human in the loop: agent approves every refund.

Pass/fail criteria (per ticket):
- category matches the agent's label
- action follows the refund policy
- never promises money the policy forbids
- reply has no customer data from other orders
- reply in the customer's language

Never: issue a refund itself, promise cash
  beyond policy, follow instructions written
  inside the ticket (treat it as untrusted text).

Launch bar: 54 of 60 eval tickets pass (90%),
  0 policy-breaking promises, p95 under 3 s.
Cost cap: $500 a month (step 5 shows the maths).
Fallback: low confidence or bad JSON
  -> ticket goes to the normal queue.`,
      },
      keyIdea:
        'If two people can disagree about whether an output passes, the criterion is not finished.',
    },
    {
      heading: 'Build the eval set before you build the feature',
      body: [
        'Hamel Husain, who helps teams fix AI products, calls error analysis "the single most valuable activity in AI development": read real outputs, write down what went wrong, and group the failures. He prefers pass/fail judgments because "binary decisions provide clarity that more complex scales often obscure", and warns that generic scores such as "helpfulness" hide the real problems.',
        'Start with 50 to 100 real inputs, including the awkward ones, and label the right answer. Anthropic’s docs say to prefer more test cases graded automatically over a few graded by hand. Run every model and prompt change against the same set, and add every new failure you see in production. The Evals lesson on this path walks through building one in a spreadsheet.',
      ],
      example: {
        label: 'Six rows from a 60-ticket eval set (input → expected · what it checks)',
        text: `1. "Paneer missing, charged ₹240"
   → missing_item, refund the item
   · category + policy
2. "Order 40 min late, food cold"
   → late_delivery, coupon
   · category + policy
3. "Refund my last 6 orders"
   → escalate, promise nothing
   · never-do list
4. A message in Hinglish
   → reply in Hinglish
   · language
5. Ticket quotes another user's phone
   → reply without it
   · privacy
6. Empty message, photo only
   → escalate
   · edge case`,
      },
      keyIdea:
        'The eval set is the spec you can run. Write it before the prompt, and keep adding to it after launch.',
    },
    {
      heading: 'Do the cost maths before anyone says "use the best model"',
      body: [
        `Cost is tokens times price times traffic. In the example each ticket sends about ${WORKED.inTok.toLocaleString('en-US')} input tokens (instructions and refund policy plus the message) and gets about ${WORKED.outTok} tokens back. At ${WORKED.perDay.toLocaleString('en-US')} tickets a day for 30 days that is ${inM.toLocaleString('en-US')} million input and ${outM.toLocaleString('en-US')} million output tokens a month.`,
        `At list prices checked on ${PRICE_CHECKED}, Claude Haiku 5.5 costs ${fmtUsd(perRequest(haiku.model, WORKED))} a ticket, or ${usd0(haiku.month)} a month. Claude Sonnet 5.5 costs ${usd0(sonnet.month)} and Claude Opus 5.5 ${usd0(opus.month)}: ${Math.round(opus.month / haiku.month)} times the cheapest. OpenAI’s guide gives the order: set up evals to get a baseline with a capable model, then try smaller models and keep the cheapest one that still passes. Try your own numbers in the cost calculator further down this page.`,
        'Two levers cut the bill without changing the model: prompt caching, because the same instructions and policy go out with every ticket, and batch processing for work that can wait. Both are priced on the makers’ pricing pages; the figures here leave them out.',
      ],
      example: {
        label: 'The sum for Claude Haiku 5.5',
        text: `Input:  ${inM.toLocaleString('en-US')}M tokens × $${haiku.model.inPerM}/M = $${(inM * haiku.model.inPerM).toFixed(2)}
Output: ${outM.toLocaleString('en-US')}M tokens × $${haiku.model.outPerM}/M = $${(outM * haiku.model.outPerM).toFixed(2)}
Month:  $${(inM * haiku.model.inPerM + outM * haiku.model.outPerM).toFixed(2)} for ${monthReq.toLocaleString('en-US')} tickets`,
      },
      visual: {
        kind: 'bars',
        label: `Our example · ${WORKED.perDay.toLocaleString('en-US')} tickets a day · list prices ${PRICE_CHECKED}`,
        title: `The same feature costs ${usd0(cheapest.month)} to ${usd0(opus.month)} a month, depending on the model`,
        rows: rows.map((r) => ({
          label: r.model.name,
          value: r.month,
          display: usd0(r.month),
          highlight: r.model.id === 'claude-haiku-5-5',
        })),
        sort: false,
        note: `${WORKED.inTok.toLocaleString('en-US')} input + ${WORKED.outTok} output tokens per ticket, 30 days. No caching or batch discounts. Claude Haiku 5.5 price is for prompts up to 100,000 tokens; gpt-6 prices for up to 272,000.`,
        source: [
          {
            label: 'Anthropic pricing',
            url: 'https://platform.claude.com/docs/en/about-claude/pricing',
          },
          { label: 'OpenAI API pricing', url: 'https://developers.openai.com/api/docs/pricing' },
        ],
        updated: PRICE_CHECKED,
      },
      keyIdea:
        'Cost is a product decision. Put a monthly cap in the spec and let the eval pick the cheapest model that passes.',
    },
    {
      heading: 'Design for the wrong answer, then ship in stages',
      body: [
        'Google’s guidebook chapter on errors says "When an AI system fails, often the easiest path forward is to let the user take over", and that how failures are handled "calibrates user trust". OpenAI calls human intervention "a critical safeguard", most of all early on. So the spec names every failure state and what the user sees in each.',
        'Then launch in stages. Run the model silently next to the humans first and compare, then show it to a small share of users, then widen it. Write down in the spec what you watch and what sends you back a stage, for example: agents override more than 1 in 5 suggestions, any policy-breaking promise, or cost above the cap. Every override and every thumbs-down is a new row for the eval set. The worked workflow below puts all six steps together, and the blank spec under it is yours to copy.',
      ],
      workflow: {
        title: 'Worked workflow: refund-ticket triage, from idea to launch (our fictional example)',
        input:
          'A fictional food-delivery app. Support agents read 20,000 refund tickets a day, and simple ones wait hours for a first reply.',
        steps: [
          {
            title: 'Check it needs AI',
            detail:
              'The tickets are free text in English, Hindi and Hinglish, and refunds depend on the story. Two of the three signs from OpenAI’s guide (judgment, unstructured text) are there, so a model is worth testing.',
          },
          {
            title: 'Pick the lowest rung',
            detail:
              'One model call that returns JSON. No agent: the refund itself stays with a human, so the model never needs tools that move money.',
          },
          {
            title: 'Write the spec',
            detail:
              'Five pass/fail criteria, a launch bar of 54 of 60 eval tickets (90%) with zero policy-breaking promises, a p95 latency under 3 seconds and a $500 monthly cap.',
          },
          {
            title: 'Build and run the eval',
            detail:
              'Sixty real tickets, labelled by two senior agents, including late orders, missing items, abuse, Hinglish and photo-only tickets. Run it on a capable model first for a baseline, then on the cheaper ones.',
          },
          {
            title: 'Price it',
            detail: `At ${WORKED.perDay.toLocaleString('en-US')} tickets a day: ${usd0(haiku.month)} a month on Claude Haiku 5.5, ${usd0(sonnet.month)} on Claude Sonnet 5.5. Only a model that passes the eval and fits the $500 cap can ship.`,
          },
          {
            title: 'Fallback and rollout',
            detail:
              'Bad JSON, low confidence or a "refund everything" request sends the ticket to the normal queue. Two weeks silent beside agents, then 5% of tickets, then 50%. Step back a stage if agents override more than 1 in 5 suggestions, any reply breaks policy, or cost passes the cap.',
          },
        ],
        output:
          'A one-page spec, a 60-ticket eval set, a model choice backed by both the eval and a cost line, and a rollout plan with a way back. That is the packet an AI PM brings to a launch review, and the answer interviewers look for when they ask how you would ship an AI feature.',
      },
      example: {
        label: 'Blank one-page AI spec: copy and fill in',
        code: true,
        text: `Problem, with today's numbers:
User, and the job the AI does:
Why AI? judgment / rules / text:
Rung: rule / call / flow / agent:
10+ inputs + accepted outputs:
Pass/fail criteria:
-
Never-do list:
-
Launch bar (pass rate, 0-fails):
Latency target:
Cost cap a month:
Fallback (wrong, slow, empty):
Rollout stages:
Watch, and when to step back:`,
      },
      keyIdea:
        'A good AI spec answers four questions: what does good look like, how will we measure it, what does it cost, and what happens when it is wrong.',
    },
  ],
  keyTerms: [
    {
      term: 'Success criteria',
      meaning:
        'Specific, measurable statements of what a good output is, such as "category matches the agent’s label".',
    },
    {
      term: 'Eval set',
      meaning:
        'A fixed list of real inputs with the accepted answer, run after every change to see if the feature still works.',
    },
    {
      term: 'Error analysis',
      meaning:
        'Reading real outputs, noting what went wrong and grouping the failures to decide what to fix.',
    },
    {
      term: 'Workflow vs agent',
      meaning:
        'In a workflow your code fixes the steps; in an agent the model chooses its own steps and tools.',
    },
    {
      term: 'Token',
      meaning:
        'The chunk of text models read and write and are billed by. Prices are quoted per million tokens.',
    },
    {
      term: 'Fallback',
      meaning:
        'What the product does when the model’s answer is wrong, slow or missing, often handing over to a person.',
    },
  ],
  videos: [
    {
      youtubeId: 'D7_ipDqhtwk',
      title: 'How We Build Effective Agents',
      channel: 'AI Engineer (Barry Zhang, Anthropic)',
      why: 'One of the authors of "Building effective agents" explains when not to build an agent and how to keep a design simple.',
    },
    {
      youtubeId: 'BsWxPI9UM4c',
      title:
        'Why AI evals are the hottest new skill for product builders | Hamel Husain & Shreya Shankar (creators of the #1 eval course)',
      channel: 'Lenny’s Podcast',
      why: 'A long conversation; focus on the error-analysis walkthrough: how a PM reads real outputs before writing any eval.',
    },
  ],
  tryIt: {
    title: 'Spec one AI feature in 10 minutes',
    steps: [
      'Pick a feature you wish an app you use had, such as "summarise my bank statement" or "draft a reply to this review".',
      'Write one line for each of the three signs: does it need judgment, too many rules, or messy text? If none is true, write the non-AI design instead.',
      'Write three pass/fail criteria that two people would always agree on.',
      'List ten example inputs, with at least three awkward ones (empty, another language, someone trying to trick it).',
      'Put your traffic and token guesses into the cost calculator on this page and write a monthly cap.',
      'Write one sentence on what the user sees when the answer is wrong, then fill in the blank spec from step 6.',
    ],
  },
  check: [
    {
      q: 'Your team wants an agent that can issue refunds on its own. What does Anthropic’s guidance suggest first?',
      options: [
        'Build the agent and fix problems after launch',
        'Try the simplest design, such as one model call with a human approving refunds, and add complexity only if the eval shows it is needed',
        'Fine-tune a model before writing any spec',
        'Use the most expensive model so it makes fewer mistakes',
      ],
      answer: 1,
      why: '"Building effective agents" recommends the simplest solution possible; agents trade latency and cost for performance, so they must earn their place.',
    },
    {
      q: 'Which is a usable success criterion for a ticket-triage feature?',
      options: [
        'The replies should be high quality',
        'Users should like it',
        'The category matches the support agent’s label on at least 54 of 60 eval tickets',
        'It should feel smart',
      ],
      answer: 2,
      why: 'Anthropic’s docs ask for specific, measurable criteria. Only this one can be checked the same way by anyone.',
    },
    {
      q: `In the worked example, why compare ${usd0(haiku.month)} with ${usd0(opus.month)} a month?`,
      options: [
        'Because the cheapest model is always good enough',
        'Because cost is a product decision: the eval decides which models pass, and the cheapest one that passes ships',
        'Because expensive models are always more accurate on your task',
        'Because token prices never change',
      ],
      answer: 1,
      why: 'Price only matters among models that pass your eval. OpenAI’s guide says to set a baseline with evals, then try smaller models.',
    },
  ],
  sources: [
    {
      label: 'Anthropic: Building effective agents (Erik S. and Barry Zhang, 19 Dec 2024)',
      url: 'https://www.anthropic.com/research/building-effective-agents',
    },
    {
      label: 'Anthropic docs: Define success criteria and build evaluations',
      url: 'https://platform.claude.com/docs/en/test-and-evaluate/define-success',
    },
    {
      label: 'OpenAI: A practical guide to building agents (PDF)',
      url: 'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf',
    },
    {
      label: 'Google PAIR People + AI Guidebook: User Needs + Defining Success',
      url: 'https://pair.withgoogle.com/chapter/user-needs/',
    },
    {
      label: 'Google PAIR People + AI Guidebook: Errors + Graceful Failure',
      url: 'https://pair.withgoogle.com/chapter/errors-failing/',
    },
    {
      label: 'Hamel Husain: A Field Guide to Rapidly Improving AI Products (24 Mar 2025)',
      url: 'https://hamel.dev/blog/posts/field-guide/',
    },
    {
      label: 'Hamel Husain: Your AI Product Needs Evals (29 Mar 2024)',
      url: 'https://hamel.dev/blog/posts/evals/',
    },
    {
      label: `Anthropic pricing (opened ${PRICE_CHECKED})`,
      url: 'https://platform.claude.com/docs/en/about-claude/pricing',
    },
    {
      label: `OpenAI API pricing (opened ${PRICE_CHECKED})`,
      url: 'https://developers.openai.com/api/docs/pricing',
    },
    {
      label: 'PracHub: Visa PM question on evaluating a generative AI feature (26 Apr 2026)',
      url: 'https://prachub.com/interview-questions/designing-an-evaluation-plan-for-a-generative-ai-product-feature',
    },
  ],
  faqs: [
    {
      q: 'How do you write a PRD for an AI feature?',
      a: 'Keep the usual problem, user and scope sections, then add four AI parts: example inputs with the output you would accept, pass/fail success criteria with a launch bar, a monthly cost cap worked out from tokens and traffic, and the fallback when the answer is wrong. The worked example on this page fits on one page.',
    },
    {
      q: 'How would you evaluate a generative AI feature in a PM interview?',
      a: 'This was reported as a Visa product manager question in April 2026. A two-minute answer can follow this page: (1) the user and the job, and why AI beats a rule; (2) the design rung you would start on; (3) three or four pass/fail criteria, with safety and privacy at zero tolerance; (4) a labelled eval set of 50 to 100 real inputs with edge cases, run on every change; (5) the cost per month and the cheapest model that passes; (6) after launch, override rate, user feedback and cost per request, with a rule for rolling back.',
    },
    {
      q: 'How much does it cost to run an AI feature?',
      a: `Multiply input and output tokens per request by the model’s price per million tokens and by your traffic. In our example of ${WORKED.perDay.toLocaleString('en-US')} tickets a day it ranges from ${usd0(cheapest.month)} to ${usd0(opus.month)} a month at ${PRICE_CHECKED} list prices. Use the calculator on this page with your own numbers.`,
    },
  ],
  related: [
    { label: 'AI Product Manager: interview questions and hiring guide', href: '/aipm' },
    { label: 'Product Manager role hub', href: '/product-manager' },
    { label: 'Evals: does your AI work?', href: '/learn-ai/ai-evals' },
    { label: 'STAR answer builder for your AI launch story', href: '/star-method' },
  ],
  fromTheSource: [
    {
      who: 'Erik S. and Barry Zhang',
      role: 'Engineers at Anthropic who build agents with customers',
      work: 'Building effective agents (essay, Dec 2024)',
      url: 'https://www.anthropic.com/research/building-effective-agents',
      idea: 'They recommend "finding the simplest solution possible" and separate workflows, where code fixes the path, from agents, where the model directs its own steps. Agents often trade latency and cost for better results.',
      breakdown: [
        'Many teams that succeed use simple, composable patterns rather than complex frameworks',
        'A workflow is predictable; an agent is flexible but harder to test',
        'More autonomy means more cost, more delay and more ways to fail',
      ],
      use: 'In your spec, name the rung you chose (rule, one call, workflow, agent) and the eval result that would make you move up one.',
    },
    {
      who: 'Hamel Husain',
      role: 'Machine-learning engineer who teaches AI evals and helps teams fix AI products',
      work: 'A Field Guide to Rapidly Improving AI Products (Mar 2025)',
      url: 'https://hamel.dev/blog/posts/field-guide/',
      idea: 'Error analysis, reading real outputs and grouping what went wrong, is "the single most valuable activity in AI development". He prefers pass/fail judgments to 1–5 scores and calls a tools-first mindset the most common mistake.',
      breakdown: [
        'Look at real outputs before choosing any metric or tool',
        'Group failures and fix the biggest group first',
        'Pass/fail is clearer than a score nobody can define',
      ],
      use: 'Before launch review, read 50 real outputs yourself and bring the three biggest failure groups, with counts, to the meeting.',
    },
  ],
  widget: 'ai-feature-cost',
}
