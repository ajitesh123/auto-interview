# Brief: AI calling pricing owner (21 Nov 2026, Part 3)

**Owner URL:** /blog/ai-calling-pricing-breakdown-what-it-really-costs-2026 (49 inbound links; kept URL)
**Merged into it (canonical + moved note):** how-much-does-an-ai-voice-agent-cost-per-minute-2026, voice-ai-pricing-cost-per-minute-2026 (both carried an unsourced "₹3.50/min Tough Tongue AI" price and a paused sub-200ms claim). Links repointed in 9 posts + /voice-ai-calling library.
**Keywords:** AI calling pricing; AI voice agent cost per minute; voice AI pricing per minute; AI calling cost India; Retell vs Vapi vs Bland pricing.

## Reader and job

Founder, sales/ops lead or agency builder deciding a budget for AI calls. After the page they can: (1) state an all-in per-minute price for a typical setup, (2) see what each vendor's rate covers and what is extra, (3) compute their own monthly bill on 11 platforms in USD or INR, (4) know the hidden lines (numbers, concurrency, rounding, silence, transfers).

## SERP gap (subagent teardown, 21 Nov)

Top results are vendors ranking themselves (Murf, CloudTalk, Aircall, AssemblyAI, Telnyx, zeeg). Only AssemblyAI dates its prices. All-in ranges are wide and unsourced ($0.07-$0.49, $0.01-$1). No page builds an INR all-in from dated component prices; no calculator with INR + telephony.

## Asset

data/aiCallPrice.ts: 16 platforms, price verbatim + covers + extras, low/high line items rebuilt from each vendor's page (opened 21 Nov 2026), one assumed carrier ($0.014 Twilio US outbound) where telephony is separate, rounding per platform, FX ₹93.5 (PTI 19 Nov). Counts computed.

## Visuals

- StatRow (median, lowest, India range, quote-only count) – computed
- RangeList: all-in per minute, 11 platforms, median rule
- BarList: Retell minute line by line
- BarList: worked month 1,000 calls × 3 min
- Price table (stacked under md)
- Client calculator (presets, USD/INR, GST, rounding, TTAI plan line, localStorage)

## Honesty rules

Tough Tongue AI (our product) shown as its own line, not ranked; prices as written; partial all-ins (ElevenLabs LLM, Gemini raw, Twilio CR, OpenAI) excluded from ranking; Bolna/Aircall page contradictions stated.

## Measure

GSC for the owner URL + "ai calling cost per minute" / "voice ai pricing" queries. Check 5 Dec (day 14) and 19 Dec (day 28).
