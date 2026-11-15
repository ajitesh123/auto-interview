# Weekly code audit (Part 1, Sunday) — 15 Nov 2026

## What a visitor can do after this ships

- Finish any Learn AI or Paul Graham lesson (our top-ranking pages) and land on the light live
  mock-interview panel cycling that lesson's own questions, instead of a dark ink band; a
  mock-interview button now sits near the top of every lesson too.
- Read any of the 530+ blog posts without a dark glass dock with a pink/purple glow in the corner,
  and see a light Signal Paper product card (no "#1", "sub-500ms", "+36%" or "1/10th the cost"
  claims) on voice-AI and sales posts.
- Use /find-jobs and /cover-letter in the same light theme, nav and footer as the rest of the site,
  with the mock-interview panel at the end.

## Audit method

1. Dead code: every file in components/ checked for an import anywhere in app, components,
   layouts, lib, data (MDX), scripts. 15 components with zero imports, plus /api/test and
   /api/visitors (only caller was the dead VisitorCounter) and lib/visitorStorage.ts.
2. Tokens: grep for palette classes, gradients, raw hex and dark bands (bg-ink / bg-black) in
   app, components, layouts, features.
3. Security: grep for API key shapes (OpenAI, Anthropic, Google, GitHub, Slack, AWS, private keys)
   and committed .env files. Only .env.example (placeholder). IndexNow key is public by design.
4. Red lines: grep for paused claims and Harvard wording in app/components.

## Fixes in this commit

| Area                                             | Before                                                                                  | After                                                                                                                      |
| ------------------------------------------------ | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| LessonPage (Learn AI + Paul Graham lessons)      | ink closing band, no top CTA                                                            | MockInterviewButton under the hero, MockInterviewCTA at the end (lesson's question-shaped step headings, course fallbacks) |
| /voice-ai-calling                                | ink CTA band                                                                            | light card, Signal-blue button                                                                                             |
| FloatingNav (every blog post)                    | neutral-950 glass dock, pink/purple/cyan glow                                           | surface capsule, hairline, tokens                                                                                          |
| CTABanner (every voice/sales post + 15 MDX uses) | orange conic beam, raw hex, "close a lead in under 3 minutes"                           | Signal Paper card, voice meter, plain product description                                                                  |
| 12 MDX CTABanner props                           | +26–41% outcome claims, "1/10th the cost", "#1", "sub-500ms", "double your pipeline"    | what the product does                                                                                                      |
| DomainLayout footer + GlassNav                   | 70+ raw hex classes                                                                     | tokens                                                                                                                     |
| /find-jobs, /cover-letter                        | dark AppLayout, gradient H1                                                             | DomainLayout, tokens, MockInterviewCTA                                                                                     |
| RelatedTools                                     | gray-900 cards, "AI-powered" copy, links to dead generators                             | light cards, links to live tools                                                                                           |
| Homepage meta + FAQ schema, llms.txt             | "CV templates from Harvard and IIM-A", "Harvard/Stanford CV templates", ramp-time claim | plain description of what the site has                                                                                     |
| Dead code                                        | 15 components, 2 API routes, 1 lib                                                      | deleted                                                                                                                    |

## Logged, not fixed (backlog)

- AppLayout still wraps /resume-job-matcher, /certificate, /cover-letter/result, /build-resume:
  dark features (features/\* ~230 palette classes) and their AI routes return 503. Convert or retire.
- /ai-calling-roi-calculator: 74 palette classes; components/Calculator.tsx 51.
- 54 blog posts still contain paused claims in the body (sub-500ms, 348 ms, 42.8%, 50,000+ ...).
- Industry roleplay posts (insurance, NBFC, automotive, admissions) state outcome lifts in the body.

## Measure

- Learn AI / Paul Graham lessons: clicks to /free-mock-interview from lesson pages (GA4 when Rahul
  shares access). Check back 29 Nov.
- No new 404s from deleted routes (none were linked).
