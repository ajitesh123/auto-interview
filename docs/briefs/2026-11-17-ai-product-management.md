# Brief: Learn AI lesson 43, AI product management: spec, cost and ship an AI feature

Date: 17 Nov 2026 (Part 2, learning run). URL: /learn-ai/ai-product-management. Track 3 (Build), after Evals.

## Why this page

- Search data: AI PM queries had 1,679 impressions and 0 clicks (Brain SEARCH DATA); /aipm hub has no lesson that teaches the core AI PM case ("how would you ship / evaluate an AI feature").
- Reported interview question: Visa PM, 26 Apr 2026, "How would you evaluate a generative AI system..." (PracHub).
- SERP gap (subagent teardown, 17 Nov): top AI PRD pages (Product Compass, Product School, Adaline, LogRocket, Figma, Andrew Ng) have no cost maths, no runnable eval set, and fallbacks only as outage states.

## What the reader can do after the page

1. Decide whether a feature needs AI (OpenAI's 3 signs, PAIR's user-need test).
2. Pick the lowest design rung (rule → one call → workflow → agent; Anthropic).
3. Write a one-page AI spec with pass/fail criteria and a launch bar (Anthropic define-success).
4. Write an eval set with edge cases (Hamel Husain: error analysis, binary judgments).
5. Work out a monthly cost per model with the calculator (no AI, list prices).
6. Write the fallback and a staged rollout (PAIR errors chapter, OpenAI human intervention).

## Original asset

- Cost calculator (widget `ai-feature-cost`): 8 models, list prices opened 17 Nov 2026 from Anthropic and OpenAI pricing pages, data/learnAi/aiFeatureCost.ts. Google prices left out: the subagent read only part of the page and flagged them unverified.
- Worked example (fictional, labelled): refund-ticket triage, 20,000 tickets/day, 1,200 in + 200 out tokens. Monthly: $132 (Haiku 5.5, gpt-6-luna) to $5,280 (Opus 5.5). Computed from the data file; text, chart and widget share one source.

## Visuals

- Bars: monthly cost of the same feature on 8 models (computed; sources + date).
- Flow: design ladder. Workflow: idea → launch in 6 steps. Example blocks: one-page spec, 6 eval rows, the Haiku sum.

## CTA and links

- MockInterviewButton near top and MockInterviewCTA at end (lesson template). Related: /aipm, /product-manager, /learn-ai/ai-evals, /star-method. aipm and product-manager hubs now list the lesson; founders-office reverse link.

## Measure

- Metric: GSC impressions for "ai product management", "ai prd", "how to spec an ai feature"; clicks from /aipm to the lesson. Check back 1 Dec 2026.
