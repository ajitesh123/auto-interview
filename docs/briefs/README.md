# Research briefs

Every new page (role hub, matrix page, Learn AI lesson, blog post, tool) and every major
rewrite starts with a brief in this folder: `docs/briefs/<yyyy-mm-dd>-<slug>.md`.
No brief, no page. The brief is committed together with the page, so anyone can open it and
see why the page exists, what it beats, and where every fact came from.

Rahul, Nov 8 2026: "This is like a thorough research that we need to add whenever we are
creating new content. This is not random generic content. We have to be very, very thorough."

## Template (copy this)

```md
# Brief: <page title>

- URL: /<path>
- Slot: A (interview prep) | B (Learn AI + engagement) | C (blogs + search)
- Date: <yyyy-mm-dd> Author run: <time IST>

## 1. Who is searching and why

- Main query and 3–6 fan-out queries (People Also Ask, autocomplete, AI follow-ups):
- The reader: who they are, what they are trying to get done, what they already know:
- Success for the reader (what they can do or decide after this page):

## 2. What we already have (inventory check)

- Our pages on this topic (grep data/blog, data/roleHubs, data/learnAi, app/) with URL:
- Overlap verdict: new page | extend an existing page | merge pages (and which):
- Pages that must link to this one (at least 2) and pages this one links to:

## 3. What is ranking and being cited (opened, not guessed)

| #   | URL | Type | What it does well | What it misses or gets wrong |
| --- | --- | ---- | ----------------- | ---------------------------- |

- Google top 5–10 for the main query, plus what an AI answer (Google AI Overview,
  ChatGPT, Perplexity) says and cites:

## 4. Our information gain (why ours will be the best page)

- The original asset (data we collected, a tool, a primary-source breakdown, measured
  examples, real reported questions, a worked calculation):
- What we will say that no ranking page says:

## 5. Sources (primary first, every one opened)

| Claim | Source URL | Opened on | Quote or number |
| ----- | ---------- | --------- | --------------- |

## 6. Shape and engagement plan (5–10 minutes, no walls of text)

- Answer-first TL;DR:
- Sections as short cards (one idea each):
- The thing to DO on the page (quiz, checklist, calculator, practice, download, video):
- The next step at the end:

## 7. Review (filled after the independent critic)

- Critic verdict (best page for the query? yes / not yet, why):
- Facts checked and fixed:
- Rubric score:

## 8. Measure

- Metric and check-back dates (indexing 14 days, impressions 28 days):
```

# Audit of existing pages

`docs/content-audit.md` is the loop over what already exists. Each run audits pages in its
slot's area (see the scheduled task prompt) and logs one row per page.
