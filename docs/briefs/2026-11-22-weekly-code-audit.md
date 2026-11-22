# Weekly code audit, Sunday 22 Nov 2026 (Part 1)

## What a visitor can do after this

- Read any of the 530+ blog posts in the same Signal Paper chrome as the rest of the site (tokens, not raw hex), with the real mock-interview button near the top and the live mock-interview panel at the end of every interview-prep post.
- Trust the voice AI posts more: 26 posts no longer carry invented Tough Tongue AI latency, accuracy, ranking or outcome numbers.

## Findings (ranked by reach)

1. **Blog template (`layouts/PostLayout.tsx`, every post, ~72% of impressions are blog/off-topic pages).**
   - Emitted a second Article and a second BreadcrumbList on every post (the page already emits BlogPosting + BreadcrumbList), plus `itemScope` microdata: three article entities per page.
   - ~950 lines of hand-written FAQPage/HowTo JSON-LD keyed to 9 slugs, not shown on the pages, with unsourced claims ("300%+ ROI within 90 days", "Harvard Business School Online" lists). FAQ markup must match visible content; HowTo rich results were retired by Google in 2023.
   - 37 raw hex classes; #888888 kicker text fails AA contrast at 11px.
   - Interview-prep posts hand-rolled a mock-interview button (rule: use MockInterviewButton) and had no MockInterviewCTA at the end; the sidebar showed a "Book Live Demo" voice-agent card on interview posts.
2. **Fabricated product claims at scale.** `scripts/audit/ttai-claims.mjs` found 239 posts that pair Tough Tongue AI with a number or superlative; the worst invent a "TTGE" model with sub-40 ms barge-in, "<1.5% human parity", "sub-350ms", fake benchmark tables against named competitors (SquadStack, Gnani, Bolna, Caller Digital), invented quotes and fake SDK code. All are paused claims.
3. **About page** implied Harvard/IIM-tested CVs (Harvard affiliation red line).
4. **Dead code:** `layouts/PostSimple.tsx`, `layouts/PostBanner.tsx` (no post uses them; palette classes).
5. Security: no keys in the repo (sk-, sk-ant-, AIza, ghp\_, xox, AKIA, private keys); only `.env.example`.

## Shipped

- PostLayout: duplicate Article/Breadcrumb + microdata + 9 hand-written FAQ/HowTo blocks removed (1,649 → ~430 lines); tokens only; MockInterviewButton at the top, MockInterviewCTA at the end and a practice card in the sidebar for interview posts; voice/sales posts keep a demo card labelled "Tough Tongue AI · our product".
- 26 posts cleaned of invented Tough Tongue AI claims (titles no longer "Ranked"/"#2"; URLs unchanged; lastmod 22 Nov).
- About page Harvard/IIM line replaced with what the templates are.
- PostSimple/PostBanner deleted; layout map falls back to PostLayout.
- New `scripts/audit/ttai-claims.mjs` for the weekly sweep.

## Left for later (logged in the Brain)

- 227 posts still flagged by the claims script (many weaker hits: "%" near the product name); sweep ~12 a week, top of the list first.
- Raw hex still heavy on `/cold-call-practice` (93), `/interview-questions/behavioral/[question]` (80), `/interview-questions` (60), `/interview-questions/[role]` (51), `/about` (44), `/resources*`, policy pages, blog list (`ListLayoutWithTags`, 25).
- `tailwind.config.js` `accent` colour is legacy green (#297a3a), not Signal blue: a trap for new code. Rename after the lock.

## Measure

- GSC: blog clicks and the 26 cleaned posts' impressions, check back 6 Dec.
- Rich results report: no FAQ/HowTo errors after the removals.
- GA4 (when access arrives): blog → /free-mock-interview clicks.

## Critic (fresh subagent): SHIP AFTER FIXES → applied

1. 9 posts whose frontmatter schema is FAQPage-only would have had no article node → page.tsx now normalises every post's JSON-LD into one @graph with exactly one Article/BlogPosting (default added when missing), authors on it, and the breadcrumb. Fixes the array case (best-employee-training-companies-us-2026) and NewsArticle too.
2. CTA routing: 501/531 posts counted as voice because of the "Tough Tongue AI" tag → career tags are checked first; split now 61 career / 465 voice-sales / 5 other.
3. app/tag-data.json + tsconfig.tsbuildinfo reverted before commit.
4. Tables whose whole column was "Not published" (11 tables) → column dropped.
5. Mock-interview post: invented internals and the 1,200–2,500 ms cell removed; pricing line now says free to start.
6. 329 of 446 posts pointed to a missing hero image (broken box at the top) → page.tsx only passes images that exist in public/.
7. TableOfContents + SocialShareButtons on tokens (#999 at 10px failed AA).
   Not done (logged): Hyperbound column thin; URL slug "why-tough-tongue-ai-is-the-2nd-best..." needs a 301 (Rahul approves redirects); FloatingNav overlaps content at 390.
