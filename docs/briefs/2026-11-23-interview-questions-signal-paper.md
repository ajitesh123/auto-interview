# Brief: /interview-questions family on Signal Paper (Part 1, 23 Nov 2026)

## Why

The interview-questions family is 37 indexable pages (hub, 14 behavioural question guides, 22 role
question pages) aimed at the biggest career queries we can win ("how to answer tell me about
yourself", "<role> interview questions"). The Nov 22 audit listed them as the most off-theme pages
left (59 / 51 / 77 raw hex). Reading the code found worse than colour:

- Dark #171717 CTA bands on all 37 pages (Rahul, Nov 14: no dark bands).
- Unsourced claims: "the exact questions asked in 95% of job interviews", "Over 2,000,000 global job
  seekers search these exact 10 questions monthly" (there are 14), "interviewer attention drops 60%
  after 90 seconds", "Free Harvard DOCX" (Harvard is a red line), "Auto Interview AI offers a free
  real-time voice simulator ... scorecard" (it is Tough Tongue AI), "instant telemetry".
- Two widgets that invent percentile tiers ("Top 5% Strong Hire", "Top 5% STAR Delivery") from
  slider positions, with emerald palette colours.
- A "benchmark" table with invented precision (70% I / 30% We, 135–150 WPM, 15/12/53/20 STAR split).
- No MockInterviewButton near the top, no MockInterviewCTA at the end; hand-rolled CTA buttons.
- FAQs not in <details>; breadcrumbs, kickers ("2026 Interview Intelligence Library") decorative.

## What the reader can do after the page

- Hub: find their question or role in one screen, see how many guides exist, start a mock interview.
- Question guide: get the short answer first, see a strong vs weak answer side by side, open the
  matching free tool (STAR builder, "tell me about yourself" builder, salary negotiation script),
  practise it out loud on Tough Tongue AI.
- Role page: read the questions with model answers, jump to the full role hub when we have one,
  then practise.

## Changes

1. All three templates rebuilt on tokens (bg, surface, border, fg/fg-2/fg-3, signal-\*), serif H1,
   informational kickers with real counts, FAQ as native <details>.
2. MockInterviewButton in every hero; MockInterviewCTA (with the page's own questions cycling) at the
   end. Dark bands removed.
3. Fake percentile widgets removed from these pages; replaced by links to the real rule-check
   tools (/star-method, /tell-me-about-yourself, /salary-negotiation).
4. Invented-precision table replaced by a plain strong-vs-weak table with no made-up numbers.
5. Copy fixes: 95%, 2,000,000, Harvard, 60% attention, simulator attribution, telemetry.

## Visuals

No new chart: these pages have no collected numbers. The visual is the strong-vs-weak table
(tokens, sticky first column, swipe cue) and the live MockInterviewCTA panel.

## Measure

GSC impressions/CTR for /interview-questions/\* (Rahul's export), clicks to /free-mock-interview from
these pages (GA4). Check back 7 Dec 2026.
