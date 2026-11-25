# /find-jobs rebuild (Part 1, Nov 25, 2026)

**Why:** /find-jobs scored 3/5 "modern" and 3/5 "valuable" on four walks (Nov 19, 21, 23, 24): a centred "Find Jobs" H1, a form, and an empty state. It answered nothing until you typed, and the board notes made unsourced claims ("Largest global listing", "Best coverage for India").

**What a visitor can do after the page:** type a role once and open four ready searches (LinkedIn, Naukri, Indeed, Google Jobs) with "last 24 hours / last 7 days" and "fresher / internship" filters carried over where the board's URL accepts them; see what to set by hand where it does not; then go to the four tools that matter after finding a post (keyword match, ATS read, referral message, prep plan) or a role's interview guide.

**First screen:** informational kicker, serif H1 that answers the query ("Search LinkedIn, Naukri, Indeed and Google Jobs in one go"), the form beside the four live board cards. The cards show the product working: each prints the exact search it will open and updates as you type (CSS fade on change; off under reduced motion). Green chips = filter applied in the link; amber chips = set it on the board.

**URL parameters (research subagent, Nov 25, opened pages):**

- LinkedIn `f_TPR=r86400 | r604800`, `f_E=1` internship, `2` entry level: trykondo.com/blog/linkedin-job-search-hacks (high)
- Indeed `fromage` = max days since posted: serpapi.com/indeed-jobs-api; `q`, `l` on in.indeed.com: in.indeed.com/llms.txt (high). `explvl` UNKNOWN → not used; card says "set Experience level on Indeed".
- Naukri slug `/<role>-jobs-in-<city>` and `experience=0`: apify.com/scrapewise/naukri-scraper (high). `jobAge` as a URL param UNKNOWN → not used; card says "set Freshness".
- Google Jobs `ibp=htl;jobs` (medium); `htichips=date_posted:*` not proven → not used; card says "set Date posted".

**Visuals:** live board cards (the tool itself); one table "Two of four boards take the date filter from a link" (board × date × entry level × internship) with a source line and "Swipe →"; numbered next-step cards.

**CTA:** "Already have an interview lined up?" strip with MockInterviewButton under the tool (first screen at 1280, second at 390); MockInterviewCTA at the end (unchanged).

**Schema:** FAQPage only (existing, 2 new Q&As on 24-hour and fresher searches). No ratings.

**Metric:** GSC impressions and CTR for /find-jobs and queries containing "naukri linkedin indeed" / "jobs posted in last 24 hours"; check back Dec 9.

**Benchmark (Linear, via third-party teardowns; linear.app fetch blocked):** single primary CTA in the hero, real product UI instead of illustration, a public changelog as proof the product is maintained.

**Critic (fresh subagent, Nov 25): SHIP AFTER MUST-FIXES.** Applied: India/US country switch (default India, pre-picked from the city typed; Indeed site follows it); "Remote" no longer sent as a city (manual chip instead, "remote" added to Google); Naukri slugs handle apostrophes, C++, C#, & and Naukri city names (bangalore, gurgaon) plus `k`/`l` query params; shown text matches the real URL (C++ survives); screen readers hear the filter chips (no aria-label override) and one live announcement; disabled cards say "Type a job title"; table sources linked; tap targets 40px; picking a common search resets Posted. Not done (backlog): bookmarkable ?q= URL, Internshala/Foundit/Wellfound/Cutshort boards, a Greenhouse/Lever site: search, "Copy all 4 links".
