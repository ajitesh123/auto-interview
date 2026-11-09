# Brief: Mixture of experts (Learn AI lesson)

- URL: /learn-ai/mixture-of-experts
- Slot: B (Learn AI + engagement)
- Date: 2026-11-09 Author run: 15:42 IST

## 1. Who is searching and why

- Main query: "mixture of experts" / "what is mixture of experts".
- Fan-outs: "MoE vs dense model", "total vs active parameters", "why is MoE faster",
  "does MoE need less memory" (no), "how does the router choose experts",
  "Mixtral 8x7B why 46.7B not 56B", "which models use mixture of experts",
  "Qwen3-235B-A22B meaning of A22B", "can I run an MoE model locally".
- The reader: someone who has read about a new model launch (Kimi K3.1 Pro, released Oct 2026 per Artificial Analysis and listed in ThursdAI's Nov 5 2026 roundup,
  2.8T total / 104B active; gpt-oss; Llama 4) and sees "total" and "active" parameters
  and does not know what that means, or an AI engineer / AIPM candidate who expects the
  question in interviews.
- Success: can explain MoE in two sentences, read a model card's total/active numbers, and
  estimate whether an MoE model fits on their machine.

## 2. What we already have (inventory check)

- grep "mixture|expert|MoE" across data/blog, data/learnAi, data/roleHubs: one bullet in
  /learn-ai/run-llm-locally (gpt-oss-20b 21B total / 3.6B active) and a mention in
  /learn-ai/transformers-explained (no MoE section). No blog post covers MoE.
- Overlap verdict: NEW lesson. Extend run-llm-locally and transformers-explained with a link
  and one line each (done in the same run as REFRESH audit fixes).
- Links in: transformers-explained, run-llm-locally, key-ai-papers (prev), how-llms-are-trained
  (next), /ai-engineer hub via the new "roles that need this lesson" block.
- Links out: transformers-explained, run-llm-locally, reasoning-models, /ai-engineer.

## 3. What is ranking and being cited (opened)

| #   | URL                                                   | Type             | Does well                                                  | Misses                                                             |
| --- | ----------------------------------------------------- | ---------------- | ---------------------------------------------------------- | ------------------------------------------------------------------ |
| 1   | en.wikipedia.org/wiki/Mixture_of_experts              | Encyclopedia     | Full history from 1991, maths                              | No beginner intuition, no total vs active table for 2025–26 models |
| 2   | ibm.com/topics/mixture-of-experts (Apr 2024)          | Vendor explainer | Routing, load balancing, says memory does not shrink       | Dated (Mixtral is newest), no diagram, nothing to do               |
| 3   | huggingface.co/blog/moe (Dec 2023)                    | Technical blog   | Best depth: VRAM of a dense 47B, speed of 12B; fine-tuning | Stops at 2023 models; long and dense for beginners                 |
| 4   | hai.stanford.edu/ai-definitions/...mixture-of-experts | Glossary         | One clear paragraph                                        | No numbers, no memory point, no examples                           |
| 5   | localaimaster.com, datanorth.ai, hivenet.com          | SEO explainers   | Plain-English intros                                       | Secondary numbers, no primary sources, no tool                     |

- AI answers (ChatGPT / Perplexity style) repeat the Mixtral 46.7B / 12.9B example and the
  "only some experts run" idea; they rarely say memory is set by TOTAL parameters.

## 4. Our information gain

- Original asset 1: a table of 9 MoE models (2023 → 2026) with total and active parameters
  from each maker's own page, and the active share computed in code: Mixtral used 27.6% of
  itself per token; the 2025–26 giants use 3.2–5.5% (DeepSeek-V3 5.5%, Kimi K2 3.2%,
  Kimi K3 3.7%). Nobody ranking shows the trend toward sparser models.
- Original asset 2: a no-AI, in-browser "Will it fit?" calculator: pick a model or type
  total/active, pick 16/8/4-bit, get weights memory (from total) and per-token compute
  (from active), with a plain verdict for 8/16/32/80 GB machines.
- Primary-source breakdowns: Shazeer et al. 2017 (sparsely-gated MoE, >1000x capacity,
  load-balancing loss) and DeepSeek-V3 (aux-loss-free balancing, 2.788M H800 GPU hours).

## 5. Sources (primary first, every one opened Nov 9 2026)

| Claim                                                          | Source                                             | Quote or number                                                      |
| -------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| Sparsely-gated MoE, gating network, >1000x capacity, 137B      | arxiv.org/abs/1701.06538 (Jan 23 2017)             | "greater than 1000x improvements in model capacity"                  |
| Experts collapse onto a few; balancing loss                    | arxiv.org/pdf/1701.06538                           | "This imbalance is self-reinforcing"                                 |
| 1991 origin                                                    | mlanthology.org (Jacobs, Jordan, Nowlan, Hinton)   | Neural Computation 3(1), 1991                                        |
| Switch Transformer top-1, 7x pre-training speed, 1.6T          | arxiv.org/abs/2101.03961                           | "up to 7x increases in pre-training speed"                           |
| Mixtral 46.7B / 12.9B, 2 of 8, Apache 2.0                      | mistral.ai/news/mixtral-of-experts (Dec 11 2023)   | "only uses 12.9B parameters per token"                               |
| All experts must sit in memory                                 | huggingface.co/blog/moe                            | "Require high VRAM as all experts are loaded in memory"              |
| DeepSeek-V3 671B / 37B, 14.8T tokens, 2.788M H800 GPU hours    | arxiv.org/abs/2412.19437                           | "671B total parameters with 37B activated for each token"            |
| DeepSeek-V3 1 shared + 256 routed, 8 active; bias-only routing | arxiv.org/abs/2412.19437 (PDF section 4.2, 2.1.2)  | "the bias term is only used for routing"                             |
| Llama 4 Scout 109B/17B/16 experts; Maverick 400B/17B/128       | ai.meta.com/blog/Llama-4-multimodal-intelligence   | "Each token is sent to the shared expert and also to one of the 128" |
| Qwen3-235B-A22B: 128 experts, 8 active                         | huggingface.co/Qwen/Qwen3-235B-A22B                | "235B in total and 22B activated"                                    |
| gpt-oss 117B/5.1B and 21B/3.6B; 80 GB GPU; 16 GB               | github.com/openai/gpt-oss                          | "(21B parameters with 3.6B active parameters)"                       |
| gpt-oss experts 128 / 32, top-4                                | arxiv.org/pdf/2508.10925 (OpenAI model card)       | "top-4 experts for each token" (opened by research subagent)         |
| Kimi K2 1T / 32B, 384 experts, 8 selected                      | github.com/MoonshotAI/Kimi-K2                      | table                                                                |
| Kimi K3 2.8T / 104B, 896 experts, 16 selected, 2 shared        | github.com/MoonshotAI/Kimi-K3                      | table                                                                |
| Kimi K3.1 Pro Oct 2026, 2.8T / 104B (news hook)                | thursdai.news/releases/2026-11; artificialanalysis | third-party, used only as "reported"                                 |

## 6. Shape and engagement plan

- TL;DR: MoE = many expert sub-networks + a router; each token uses a few; speed follows
  ACTIVE parameters, memory follows TOTAL parameters.
- 5 steps: the idea (restaurant kitchen analogy + flow) → the router and top-k → total vs active
  (the table trend, Mixtral maths) → the catch: memory, balancing, fine-tuning → how to read a
  model card and choose (A22B naming, local use).
- To DO: the "Will it fit?" calculator + 9-model table; the try-it task (read a model card,
  run the calculator for your laptop); 3-question check.
- Next step: up next lesson; roles that need it (/ai-engineer) shown high on the page.

## 7. Review (filled after the independent critic)

- Critic verdict (independent general-purpose subagent, did not write the page): NOT YET,
  "about two hours of fixes away from SHIP". It beat all four competitors opened (Wikipedia,
  IBM Apr 2024, Hugging Face Dec 2023, Stanford HAI) on the total/active table, calculator and
  sparsity trend. Every total/active count, %, GB, 14.8T tokens, 2.788M GPU hours, >1000x and
  137B matched the sources it opened.
- Fixed after review (all 10): DeepSeek-V3 balancing now "mainly a routing bias plus a light
  complementary sequence-wise balance loss" (re-opened the PDF; 3 places); gpt-oss expert counts
  now cite the model card (arXiv 2508.10925); unsourced release months dropped to years (Qwen3,
  Kimi K2, Kimi K3); 4-bit numbers labelled a floor ("real files are a bit bigger") in the step,
  the calculator and the fit message; llama.cpp CPU-offload line added (re-opened the man page:
  "keep all Mixture of Experts (MoE) weights in the CPU"); calculator label now "Compute per
  token like a XB dense model, if the weights sit in fast memory"; experts-are-not-topics note
  added from the Mixtral paper (re-opened: "we do not observe obvious patterns ... based on the
  topic"); "brought MoE to open models" → "made open MoE models popular"; fine-tuning advice now
  Hugging Face's freeze-the-experts result, dated 2023 (re-opened); "per word" → "per token";
  Kimi K3.1 Pro hook added as "reported"; brief date contradiction fixed. YouTube IDs verified
  by me with oEmbed (critic's proxy got 403). Not done: GShard 2020 in the timeline and
  Qwen3-30B-A3B row (optional; not opened this run, queued).
- Verdict after fixes: SHIP (all blocking items resolved).

## 8. Measure

- Metric: indexed by Nov 23 (14 days); impressions for "mixture of experts" family by Dec 7
  (28 days); lesson completion clicks once GA4 access exists.
