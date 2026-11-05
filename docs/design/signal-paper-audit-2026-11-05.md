# Signal Paper legacy-style audit (step 1a), Nov 5, 2026

Scope: `app/`, `components/`, `layouts/`. Commands from the signal-paper-ui skill §8.1.

## Totals

- Tailwind palette classes: 465. By family: gray 322, blue 44, emerald 28, red 21, pink 20, purple 13, neutral 5, green 5, slate 3, amber 3, cyan 1.
- Raw hex in .tsx (top): #171717 ×630, #666666 ×238, #ebebeb ×235, #3B5BFF ×142, #fafafa ×112, #4d4d4d ×87, #ffffff ×38, #f5f5f5 ×38, #EEF1FF ×29, #f0f0f0 ×20, #000000 ×18, #C9D3FF ×17, #383838 ×13, #333333 ×13, #555555 ×12.
- Files using gradients or backdrop-blur: 10.

## Codemod map for step 1b (zero visual diff)

| Hex                       | Token class                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------ |
| #171717                   | fg                                                                                   |
| #666666, #4d4d4d, #555555 | fg-2 (check contrast: #666666 → fg-2 #525252 is slightly darker; verify screenshots) |
| #ebebeb, #f0f0f0          | border                                                                               |
| #fafafa                   | bg                                                                                   |
| #f5f5f5                   | muted (#F4F4F5)                                                                      |
| #ffffff                   | surface                                                                              |
| #3B5BFF                   | accent / signal                                                                      |
| #EEF1FF                   | accent-soft / signal-tint                                                            |

Hex values with no exact token (#666666, #f5f5f5, #383838, #333333, #000000, #C9D3FF) are NOT zero-diff; map them in a separate, screenshot-checked step.

## Files with banned colours (purple/violet/indigo/emerald/orange/pink), gradients or blur

app/certificate/page.tsx · app/cv-templates/[role]/page.tsx · components/VoiceSearchOptimized.tsx · components/QuoteAnimation.tsx · components/STARAnswerScorer.tsx · components/CVTemplatesPage.tsx · components/ResumeBuilderMotivation.tsx · components/CertificateGenerator.tsx · components/InterviewReadinessCalculator.tsx · components/AppLayout.tsx · components/WelcomeCard.tsx · components/MinimalFooter.tsx · components/domain/DomainCard.tsx · components/domain/GlassNav.tsx · components/domain/DomainHomePage.tsx · components/FloatingNav.tsx · components/Calculator.tsx · components/charts/MarketComparison.tsx · components/charts/LLMMarketShare.tsx

## Heaviest raw-hex files (convert first in 1b)

app/ai-sales-training/page.tsx (191) · app/cold-call-practice/page.tsx (105) · components/domain/DomainHomePage.tsx (96) · app/interview-questions/behavioral/[question]/page.tsx (80) · app/interview-questions/[role]/page.tsx (74) · app/cv-templates/[role]/page.tsx (65) · components/ColdCallSimulator.tsx (63) · app/interview-questions/page.tsx (60) · layouts/PostLayout.tsx (53) · components/CVTemplatesPage.tsx (46)

## Shell

The site nav still has a black "Get Started" button and no single primary CTA; the hub template is Signal Paper but the shell is legacy (step 1d).
