# Part 1, 18 Nov 2026: role CV template + AI calling ROI calculator rebuilt honest

## Why

- `/cv-templates/<role>` (20 pages; /cv-templates/financial-analyst is our best role page by impressions) still used raw hex, black buttons, emerald boxes, a dark "Step 2" card, no mock-interview CTA near the top or end, and copy that overclaimed ("Scored by automated resume parsers", "high-converting", "first 6 seconds", "no human will ever see").
- `/ai-calling-roi-calculator` is a main-nav item and broke red lines: "definitive low-latency standard", "<200ms" latency for our product, "300% to 700% ROI within 60 days", a calculator that gave Tough Tongue AI a 5% conversion rate vs 2.5% for "others", a founder quote we cannot source, and visible GEO-hack text ("Princeton GEO benchmarks +115%"). The same fake calculator sat on /ai-sales-training.

## What the reader can do after

- CV page: get Harvard's template (Word or Google Docs), use the role's keywords, adapt sample bullets (now labelled as made-up numbers), check against a job post, and practise the interview (mock CTA top + MockInterviewCTA end).
- ROI page: compute cost per booked meeting for an AI agent vs human callers from their own numbers; compute cost per minute part by part from vendor list prices (checked 5 Nov 2026, data/voiceAiPricing.ts); check response time against Twilio's published targets.

## Visuals / tools

- CostPerMeeting (new, client): 8 inputs, presets from data/voiceAiPricing.ts ALL_IN + DIY default stack, two bars, a "read this before you compare" note. Maths in data/costPerMeeting.ts.
- CostCalculator + LatencyBudget reused from /voice-ai-calling.

## Sources

- Vendor list prices: data/voiceAiPricing.ts (each with URL, checked 2026-11-05).
- Tough Tongue AI pricing page re-read 18 Nov 2026 (Pro $99/mo, 900 min, $0.11 extra). Custom India AI-calling price ₹3.5–5/min: Rahul (Tough Tongue AI team), 18 Nov 2026.
- Twilio latency targets: data/voiceAiPricing.ts LATENCY_TWILIO.

## Metric

- ROI page: no fake numbers left (grep); clicks/impressions for "ai calling cost per minute", "ai calling roi" on this URL; check back 2 Dec.
- CV role pages: impressions for "<role> resume template"; check back 2 Dec.
