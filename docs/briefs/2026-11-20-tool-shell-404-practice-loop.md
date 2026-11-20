# Part 1 (Nov 20): one shell on the six free tools, a real 404, the practice loop

## What the walk found (local build, Playwright 390/1280, 12 pages)

- **Six free tools had no site nav and no footer**: /salary-negotiation, /job-offer-comparison,
  /referral-message, /resume-keyword-checker, /salary-calculator, /star-method. A visitor landing
  from search could not reach any other page except through in-page links. Their page.tsx returned a
  bare `<div>` instead of `DomainLayout`. (Grep: built HTML without `nav-bar`.)
- **/job-offer-comparison scrolled sideways at 390** (scrollWidth 409): the mock-interview pill is
  `whitespace-nowrap shrink-0`, and its long label ("Practise the HR round: free mock interview")
  could not wrap. Any long label on any page had the same bug.
- **404 page** was the legacy template: gray/blue palette, `font-extrabold`, no nav, a typo
  ("dont"), one link to the homepage.
- Benchmark (Duolingo method page, Feb 2023, modified Apr 2026): "learn by doing", "bite-sized
  lessons", "more foundational practice for content you need to review". Final Round AI (Nov 19)
  shows the practice loop as 3 steps. Our CTA listed three features but not what happens.

## What the reader can do after

- Move from any free tool to any role guide, salary page or other tool (nav + footer directory).
- See in three steps what a mock interview is (pick a round → answer out loud → read the feedback,
  go again) on every page that ends with MockInterviewCTA (~20 templates) and on /free-mock-interview.
- Land on a dead link and still find a role guide, a tool or a course in one click.

## Changes

1. `DomainLayout` around the six tool pages.
2. `MockInterviewButton`: label wraps below `sm`, `max-w-full`; meter and arrow `shrink-0`.
3. New `components/ai/MockLoopSteps` (server, CSS-only): 3 numbered steps; a 3 px Signal-blue bar
   fills under each in turn over one 9 s cycle; all bars full and still under reduced motion.
   Replaces the 3-tick feature list in MockInterviewCTA; added under the /free-mock-interview header.
4. `app/not-found.tsx` rebuilt on tokens inside the shell: kicker, serif H1, mock button + homepage,
   three link groups (role guides, free tools, learn).

## Visuals

No charts. Motion: the loop bars (CSS keyframes, transform only).

## Claims

"Read the feedback": Tough Tongue AI sessions return strengths/weaknesses (existing CTA copy already
says "tells you what was strong and what was thin"). "43 lessons" = Learn AI PLAN count shown on lessons.

## Measure

Pages per session on tool landing pages (GA4, when Rahul shares access); 404 exits. Check back Dec 4.
