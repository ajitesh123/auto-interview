# Brief: Part 1, Nov 26 2026: CTA feedback card + homepage proof strip

## Why

- Nov 25 walk: the closing MockInterviewCTA (on ~every learning page) left a tall empty gap in its
  right panel at 1280 when the left column ran long (`justify-between` spread three small items).
- Hyperbound benchmark (Nov 24): show what comes back after the call, not only the call.
- Linear benchmark (Nov 25): checkable proof instead of logo walls; every number links to the page that backs it.

## What the visitor can do after

- See, before clicking, what a mock interview gives back: a strong point, a thin point with the fix,
  and the follow-up question an interviewer asks (labelled "example").
- Click any homepage number (role guides, questions, free tools, Learn AI lessons) and land on what it counts.

## Changes

1. `components/ai/MockInterviewCTA.tsx`: panel content centred (`justify-center`), new "Feedback after
   each answer" card at md+ (hidden on phones to keep the section short). Rows fade up one by one
   (900/1500/2100 ms) each time the question changes; uses the existing `cta-q` keyframe, so it is
   off under prefers-reduced-motion. Decorative panel stays `aria-hidden`.
2. `components/domain/DomainHomePage.tsx`: hero stat strip becomes 4 links (2 columns on phones,
   4 from sm): role guides → #roles, questions → #roles, free tools and templates (TOOLS.length) →
   #tools-title, Learn AI lessons → /learn-ai. All counts computed from data files at build time.

## Claims check

- Feedback copy mirrors what the CTA body already says the interviewer does ("follows up on your
  answers, tells you what was strong and what was thin"). No scores, no percentages, marked "example".

## Visuals

- No new chart types. Motion: CSS only, existing tokens.

## Measure

- Clicks on /free-mock-interview from learning pages (needs GA4); homepage stat-link clicks. Check back Dec 10.
