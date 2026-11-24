# Brief: /resources, /resources/mba/\*, /about rebuilt on Signal Paper (Part 1, Nov 24, 2026)

## Why

Nov 23 walk scored /about 2/3/2/5 and /resources 2/3/2/5. Audit this run found worse:

- /resources: "Domain-specific intelligence", 3 of 4 cards "Coming soon", FAQ promising "official casebooks from IIM Ahmedabad, IIM Bangalore, IIM Calcutta, and FMS Delhi".
- /resources/mba/consulting: four "Download PDF" buttons whose href was `#iim-a-casebook` etc. (no files exist). A visitor clicks and nothing happens.
- /resources/mba/{general-management,finance,marketing,hr,product-management}: five "Coming soon" pages, indexed and in the sitemap.
- /about: "Democratizing career intelligence", "world-class", "verified domain casebooks", a "Role Communities" pillar that does not exist, a dark #171717 CTA band.

## What the reader can do after

- /resources: find the free tool for the stage they are at (learn the role → resume → answers → practise out loud → offer), each stage with a "done when" line and checked outside reading.
- /resources/mba/<track>: know what that MBA interview tests (3 checks), read our matching guide, open the firms' own cases and the casebook collection on the publisher's site.
- /about: know who makes the site (team behind Tough Tongue AI), the 6 rules every page is held to, and how to report a wrong number.

## Assets (all from the site's own data or already-checked sources)

- Counts computed at build time from data/roleHubs, roleSalary, roleConcepts, roleInterviewTips, learnAi, pgCourse, freeResources (305 questions, 10 hubs, 6 salary pages, 61 lessons, 35 checked links).
- Outside links reused from data/freeResources.ts (each opened and checked Nov 4, 2026), referenced by URL so a dead link is fixed in one place.

## Visuals and motion

- Stage picker card with numbered stepper (hero, fade-rise entry), stage sections with "Done when", MockLoopSteps (animated) in stage 4, MockInterviewButton top + MockInterviewCTA end on every page. No dark bands, tokens only.

## Not done (needs Rahul)

- Whether to keep the 5 thin MBA track pages indexed long-term or fold them into /resources/mba (redirects = Rahul's call).

## Measure

- GSC: /resources and /resources/mba/consulting impressions + CTR, check back Dec 8, 2026.
