# Brief: homepage on Signal Paper, honest and action-first (Part 1, Nov 16 2026)

## Why

The homepage (about 19% of Google clicks, mostly branded) was the last big page off-theme:
~140 raw hex / palette hits, emerald and blue-50 badges, a black CTA card, a 3D glass cube
in the hero, no mock-interview button. It also carried numbers we cannot source
("14,363 resumes analyzed", "3.4× higher callback rate", "58% fail on missing keywords",
"2 min average build time", "14,000+") and linked to dead AI routes (/build-resume,
/resume-job-matcher return 503) and a "coming soon" communities card.

## What the visitor can do after the page

1. Pick their role in the first screen (right-hand "Pick your role" list, 10 guides with
   question counts) — borrowed from Google Interview Warmup's "pick a field" first step.
2. Follow a 4-step path to real pages: role guide → resume keyword checker → CTC to in-hand →
   free mock interview.
3. Start the free mock interview from the hero (MockInterviewButton) or the closing
   MockInterviewCTA panel, which cycles real questions from 4 hubs.

## Content rules

- Every number is counted from data files at build time: hubs (10), questions (305),
  Learn AI lessons (42, 5 tracks, ~8 h), PG lessons (17). No user counts, no outcome claims.
- Only working tools are linked (keyword checker, salary calculator, offer comparison,
  CV templates, cover letters, question bank). Dead AI routes removed.
- FAQ: one source (components/domain/homeFaqs.ts) feeds the visible `<details>` and the
  FAQPage schema. "100% free, zero gatekeeping" replaced with what is true.
- Title unchanged (avoid ranking churn); OG/Twitter copy updated (no "communities", no "100%").

## Visuals

- Hero: serif display H1, informational kicker, computed stat row, role list card (e2).
- Path: 4 numbered step cards, last one Signal blue.
- Role guides grid with existing Poster Kit hero stills.
- Closing MockInterviewCTA (live panel, waveform, timer; off under reduced motion).
- Motion: one-time hero fade-rise (existing CSS, off under reduced motion), hover arrows.

## Not done (needs Rahul)

- Signal Aura glow behind heroes (gradient rule change) — still awaiting his yes.

## Measure

GSC: homepage CTR and clicks (branded + "free mock interview" queries); /free-mock-interview
entrances from the homepage. Check back Nov 30.
