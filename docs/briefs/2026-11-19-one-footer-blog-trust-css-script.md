# Brief: one site footer everywhere, honest blog author box, CSS-as-script fix (Part 1, Nov 19 2026)

## What the walk found

- Blog posts (530+ MDX pages, most of our impressions) and blog list pages rendered an old footer
  (`components/Footer.tsx`): raw hex, a different layout from the rest of the site, links to the legacy
  /build-resume, no link to any of the 10 role guides or salary pages, and three external badge images
  (startupbenchmarks, openhunts, mylaunchstash) loaded on every post.
- The site footer (DomainLayout) had no role-guide or salary links either: the 10 hubs and 6 salary
  pages were reachable only from the homepage and each other.
- Every blog post ended with "helping thousands of job seekers land their dream jobs" and a
  "Why trust: Expert-Verified Content / proven strategies" box. Neither is something we can show.
- Every page threw `Uncaught SyntaxError: Invalid or unexpected token`: the next/font CSS file was
  emitted as `<script src="/_next/static/css/….css" async>`. Cause: the custom `splitChunks.vendor`
  cache group in next.config.js matched every node_modules module, CSS included, so the font CSS
  joined the `vendors` chunk that sits in `rootMainFiles`.

## What a visitor can do after this

- From the bottom of any page (posts included) jump to any of 10 role guides, 6 salary pages, the
  CTC calculator and offer comparison, every free tool, CV templates and Learn AI / Paul Graham.
- Read an author box that says who writes the post and how to report an out-of-date fact.
- Find Jobs: "Before you apply" lists all 10 role guides plus the keyword checker and referral builder
  (it listed 4 guides and the legacy resume builder).

## Changes

1. `components/domain/SiteFooter.tsx`: the one footer (brand row + 6 columns: Interactive tools, Role
   guides, Salary data, CV templates, Resources, Company). Used by DomainLayout, PostLayout and
   ListLayoutWithTags. `components/Footer.tsx` deleted (no other importers).
2. `layouts/PostLayout.tsx`: author box on tokens with a factual bio; the trust-badge box replaced by a
   corrections note linking /contact-policy.
3. `next.config.js`: vendor cache group takes JS modules only.
4. `features/find-jobs/FindJobsPage.tsx`: prep links = 10 hubs + 2 tools.

## Visuals

None new; footer is a link directory (benchmark: Exponent/Aced and Final Round AI footers).

## Measure

- Console: zero page errors on the 11 walked routes (Playwright `pageerror`).
- Search Console (check Dec 3): impressions/clicks on /<role>/salary and the 10 hubs; internal-link
  count in GSC Links report for /fde, /gtm-engineer, /ai-engineer (zero impressions today).
