import type { Lesson } from '../types'

// Sources opened Nov 9, 2026: Shazeer et al. 2017 (arXiv 1701.06538), Jacobs et al. 1991,
// Switch Transformer (arXiv 2101.03961), Mistral AI Mixtral post (Dec 2023), Hugging Face
// "Mixture of Experts Explained" (Dec 2023), DeepSeek-V3 report (arXiv 2412.19437), Meta Llama 4
// post (Apr 2025), Qwen3-235B-A22B card, OpenAI gpt-oss repo + model card, Moonshot Kimi K2 and
// Kimi K3 repos. The model table and calculator read data/learnAi/moeModels.ts.
// Videos verified with YouTube oEmbed on Nov 9, 2026.
export const lesson: Lesson = {
  slug: 'mixture-of-experts',
  track: 'foundations',
  order: 7,
  title: 'Mixture of experts (MoE)',
  metaTitle: 'Mixture of Experts (MoE) Explained: Total vs Active',
  metaDescription:
    'Mixture of experts explained simply: how the router picks experts, why speed follows active parameters but memory follows total. 9-model table and calculator.',
  h1: 'Mixture of experts (MoE): why big AI models only use part of themselves',
  tldr: 'A mixture-of-experts model splits part of its network into many smaller “experts” and adds a router that sends each token to only a few of them. So a model can be huge in total but cheap to run per token: DeepSeek-V3 has 671B parameters but uses 37B for each token. The catch is memory: every expert must still be loaded, so speed follows the active parameters and memory follows the total.',
  minutes: 14,
  level: 'Intermediate',
  steps: [
    {
      heading: 'What is a mixture of experts?',
      body: [
        'A normal (dense) model runs every one of its parameters for every token it reads. A mixture-of-experts model replaces one part of each transformer layer, the feed-forward block, with many smaller copies called experts, plus a small router that picks which experts each token should use.',
        'Think of a kitchen with 128 cooks where each order goes to only 2 or 8 of them. The kitchen holds a lot of skill, but each dish costs the time of a few cooks.',
        'One warning about that picture: experts are not topic specialists. Studying Mixtral’s router, Mistral did “not observe obvious patterns in the assignment of experts based on the topic”; routing followed syntax, such as code indentation, more than subject.',
      ],
      flow: ['Token', 'Router scores the experts', 'Top few experts run', 'Outputs mixed by score'],
      keyIdea:
        'MoE gives a model many parameters to store knowledge in, but only runs a few of them for each token.',
    },
    {
      heading: 'Where it came from: 1991 to 2017 to today',
      body: [
        'The idea is old. In 1991 Robert Jacobs, Michael Jordan, Steven Nowlan and Geoffrey Hinton described systems “composed of many separate networks”, each learning part of a task. It became practical for language in 2017, when a Google Brain team led by Noam Shazeer put thousands of experts inside one layer and reported “greater than 1000x improvements in model capacity” with small losses in efficiency.',
        'In 2021 Google’s Switch Transformer simplified it to one expert per token and reported up to 7x faster pre-training than a dense model with the same compute. Mistral’s Mixtral 8x7B (Dec 2023) made open MoE models popular, and many large open-weight releases since are MoE, including DeepSeek-V3, Llama 4, Qwen3, gpt-oss and Kimi.',
      ],
      example: {
        label: 'Timeline',
        text: `1991  Jacobs, Jordan, Nowlan, Hinton
      "adaptive mixtures of local experts"
2017  Shazeer et al. (Google Brain)
      sparsely-gated MoE, 137B params
2021  Switch Transformer
      1 expert per token, 1.6T params
2023  Mixtral 8x7B (open weights)
2024  DeepSeek-V3: 671B total, 37B active
2026  Kimi K3: 2.8T total, 104B active
      (K3.1 Pro, reported Nov 2026: same)`,
        code: true,
      },
    },
    {
      heading: 'Total vs active parameters: the two numbers on every model card',
      body: [
        'Model cards for MoE models now give two sizes. Total parameters is everything stored in the file. Active parameters is how many are used to process one token, which sets the compute cost and most of the speed.',
        'Mixtral 8x7B is a good first example. It has 8 experts per layer, but only the feed-forward part is split into experts and the rest is shared, so the total is 46.7B, not 8 × 7 = 56B. The router picks 2 experts per layer for each token, so it uses 12.9B parameters per token.',
        'Newer models are much sparser. Mixtral used 27.6% of itself per token; DeepSeek-V3 uses 5.5%, Kimi K2 3.2% and Kimi K3 3.7% (computed from the makers’ numbers in the table below).',
      ],
      example: {
        label: 'Active share per token (maker numbers)',
        text: `Mixtral 8x7B    12.9 / 46.7B  = 27.6%
Llama 4 Scout     17 / 109B   = 15.6%
DeepSeek-V3       37 / 671B   =  5.5%
gpt-oss-120b     5.1 / 117B   =  4.4%
Kimi K3          104 / 2,800B =  3.7%`,
        code: true,
      },
      keyIdea: 'Speed and cost per token follow ACTIVE parameters. File size follows TOTAL.',
    },
    {
      heading: 'The catch: memory, balance and fine-tuning',
      body: [
        'Memory does not shrink. The router can pick any expert for the next token, so every expert must be loaded. Hugging Face puts it plainly: MoE models “require high VRAM as all experts are loaded in memory”. Mixtral needs the memory of a 46.7B model while each token costs the compute of a 12.9B one. Some local tools work around this: llama.cpp can “keep all Mixture of Experts (MoE) weights in the CPU” RAM and run the rest on the GPU, which is slower but lets bigger models run.',
        'Balance is hard. Shazeer’s team found the router tends to favour the same few experts, and “this imbalance is self-reinforcing”, so they added an extra training loss to spread the work. DeepSeek-V3 mainly uses a small bias on each expert’s routing score, nudged up or down during training, plus a light “complementary sequence-wise balance loss”.',
        'Fine-tuning is trickier. Hugging Face’s 2023 guide notes sparse models “are more prone to overfitting”, and reports that freezing the expert layers and tuning the rest worked almost as well as tuning everything.',
      ],
      bullets: [
        'Memory: plan for the total parameters',
        'Speed: expect roughly the speed of a dense model the size of the active parameters',
        'Training: needs load balancing so experts share the work',
        'Fine-tuning: try freezing the expert layers first (Hugging Face, 2023)',
      ],
      keyIdea: 'MoE trades memory for speed. It is cheaper to run, not cheaper to store.',
    },
    {
      heading: 'How to use this: reading model names and picking models',
      body: [
        'Some names carry both numbers. Qwen3-235B-A22B means 235B total, 22B active (A for active). When a launch post says “2.8T parameters”, look for the active figure before you compare it with a dense model.',
        'For your own laptop, memory decides. At 4-bit, weights take about half a gigabyte per billion total parameters, so gpt-oss-20b (21B total) needs at least 10.5 GB and OpenAI says it runs within 16 GB, while Llama 4 Scout (109B) needs at least 54.5 GB. Real 4-bit files are a little bigger, because they store scaling numbers and keep some layers at higher precision. Use the calculator below to check a model before you download it.',
      ],
      example: {
        label: 'Weights at 4-bit = total billions × 0.5 GB',
        text: `gpt-oss-20b    21B   → ~10.5 GB
Mixtral 8x7B   46.7B → ~23.4 GB
Llama 4 Scout  109B  → ~54.5 GB
DeepSeek-V3    671B  → ~335.5 GB
(a floor: real files are a bit bigger,
 plus room for the conversation and apps)`,
        code: true,
      },
      keyIdea:
        'To judge an MoE model: total parameters tell you if it fits; active parameters tell you how fast it runs.',
    },
  ],
  keyTerms: [
    {
      term: 'Mixture of experts (MoE)',
      meaning:
        'A model design where many expert sub-networks share a layer and a router sends each token to only a few of them.',
    },
    {
      term: 'Expert',
      meaning:
        'One of the smaller feed-forward networks inside an MoE layer. Experts are learned, not assigned topics by people.',
    },
    {
      term: 'Router (gating network)',
      meaning:
        'A small network that scores every expert for each token and keeps the top few (top-k).',
    },
    {
      term: 'Active parameters',
      meaning:
        'The parameters used to process one token. They set compute cost and most of the speed.',
    },
    {
      term: 'Total parameters',
      meaning: 'Every parameter stored in the model. They set how much memory you need.',
    },
    {
      term: 'Dense model',
      meaning: 'A normal model that uses all of its parameters for every token.',
    },
  ],
  videos: [
    {
      youtubeId: 'sYDlVVyJYn4',
      title: 'What is Mixture of Experts?',
      channel: 'IBM Technology',
      minutes: 8,
      why: 'IBM’s Martin Keen explains experts, the router and sparse activation with a whiteboard. Start here if the idea is new.',
    },
    {
      youtubeId: 'mwO6v4BlgZQ',
      title: 'Mixtral of Experts (Paper Explained)',
      channel: 'Yannic Kilcher',
      minutes: 34,
      why: 'A walk through the Mixtral paper itself: the router, top-2 selection and what the experts actually specialise in. Watch after the lesson if you want the paper-level detail.',
    },
  ],
  tryIt: {
    title: 'Check if an MoE model fits your machine (10 minutes)',
    steps: [
      'Find how much memory you have: on Windows open Task Manager → Performance → Memory; on a Mac open About This Mac.',
      'In the calculator above, pick gpt-oss-20b at 4-bit. Compare the weights memory with your RAM.',
      'Now pick Llama 4 Scout. Note how the active parameters stay at 17B while memory jumps to about 54.5 GB.',
      'Open the model card of any new model you saw in the news this week and find its total and active numbers. Type them into the calculator.',
      'Write one sentence you could say in an interview: “It has X total and Y active parameters, so it needs about Z GB at 4-bit but runs like a Y-billion model.”',
    ],
    link: {
      label: 'Read Hugging Face’s Mixture of Experts Explained',
      url: 'https://huggingface.co/blog/moe',
    },
  },
  check: [
    {
      q: 'A model card says 235B total, 22B active. What sets how much memory you need to run it?',
      options: [
        'The 22B active parameters',
        'The 235B total parameters',
        'Only the router',
        'The number of experts per token',
      ],
      answer: 1,
      why: 'Every expert can be picked for the next token, so all 235B must be loaded. The 22B active parameters set compute per token, not memory.',
    },
    {
      q: 'Why is Mixtral 8x7B 46.7B parameters and not 56B (8 × 7B)?',
      options: [
        'Mistral rounded the number down',
        'Two experts are removed after training',
        'Only the feed-forward blocks are split into experts; attention and other parts are shared',
        'The router stores the missing parameters elsewhere',
      ],
      answer: 2,
      why: 'Experts replace only the feed-forward block of each layer. Everything else is shared across experts, so the total is less than eight full 7B models.',
    },
    {
      q: 'Shazeer’s 2017 team found routers tend to keep picking the same few experts. What did they do?',
      options: [
        'Removed the router',
        'Added a training loss that rewards spreading tokens across experts',
        'Made every expert run for every token',
        'Trained each expert on a separate topic chosen by people',
      ],
      answer: 1,
      why: 'They added a balancing loss that “encourages all experts to have equal importance”. DeepSeek-V3 later moved most of this job to a routing bias, keeping only a light balance loss.',
    },
  ],
  fromTheSource: [
    {
      who: 'Noam Shazeer, Azalia Mirhoseini, Quoc Le, Geoffrey Hinton, Jeff Dean and colleagues',
      role: 'Google Brain researchers; Shazeer is also a co-author of “Attention Is All You Need”.',
      work: 'Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer (arXiv, Jan 2017)',
      url: 'https://arxiv.org/abs/1701.06538',
      idea: 'Use conditional computation, where “parts of the network are active on a per-example basis”. A trainable gating network picks a sparse combination of up to thousands of experts, which grew capacity more than 1000x with small efficiency losses.',
      breakdown: [
        'Conditional computation: run only the parts of the network a given input needs.',
        'Noisy top-k gating: score all experts, add a little noise, keep the top k, ignore the rest.',
        'Their largest MoE layer held up to 137 billion parameters, huge for 2017.',
        'Problem found: the router favours a few experts, so they added a loss to balance the load.',
      ],
      use: 'When you read “1T parameters” in a launch post, remember this paper: size alone no longer tells you the cost. Ask how many parameters are active per token.',
    },
    {
      who: 'DeepSeek-AI',
      role: 'Chinese AI lab whose open-weight MoE models set the pattern many 2025–2026 models follow.',
      work: 'DeepSeek-V3 Technical Report (arXiv, Dec 2024)',
      url: 'https://arxiv.org/abs/2412.19437',
      idea: 'A 671B-parameter MoE with 37B activated per token, trained on 14.8 trillion tokens using 2.788M H800 GPU hours, with load balancing done mainly by a routing bias rather than a large extra loss.',
      breakdown: [
        'Each MoE layer has 1 shared expert every token uses, plus 256 routed experts; 8 are picked per token.',
        'A bias added to each expert’s score is raised for underused experts and lowered for busy ones; the paper notes “the bias term is only used for routing”.',
        'It keeps a light “complementary sequence-wise balance loss” so no single sequence overloads a few experts.',
        'The GPU-hour figure covers the final training run only; the paper says it excludes earlier research and experiments.',
      ],
      use: 'Use DeepSeek-V3 as your reference example: 671B total, 37B active, about 5.5% of the model per token. Compare any new MoE model against it.',
    },
  ],
  sources: [
    {
      label: 'Shazeer et al.: The Sparsely-Gated Mixture-of-Experts Layer (arXiv 1701.06538, 2017)',
      url: 'https://arxiv.org/abs/1701.06538',
    },
    {
      label: 'Jacobs, Jordan, Nowlan, Hinton: Adaptive Mixtures of Local Experts (1991)',
      url: 'https://mlanthology.org/neco/1991/jacobs1991neco-adaptive',
    },
    {
      label: 'Fedus, Zoph, Shazeer: Switch Transformers (arXiv 2101.03961, 2021)',
      url: 'https://arxiv.org/abs/2101.03961',
    },
    {
      label: 'Mistral AI: Mixtral of experts (Dec 11, 2023)',
      url: 'https://mistral.ai/news/mixtral-of-experts',
    },
    {
      label: 'Jiang et al.: Mixtral of Experts (arXiv 2401.04088, routing analysis)',
      url: 'https://arxiv.org/abs/2401.04088',
    },
    {
      label: 'Hugging Face: Mixture of Experts Explained (Dec 2023)',
      url: 'https://huggingface.co/blog/moe',
    },
    {
      label: 'DeepSeek-V3 Technical Report (arXiv 2412.19437)',
      url: 'https://arxiv.org/abs/2412.19437',
    },
    {
      label: 'Meta: The Llama 4 herd (Apr 5, 2025)',
      url: 'https://ai.meta.com/blog/Llama-4-multimodal-intelligence/',
    },
    {
      label: 'Qwen3-235B-A22B model card (Hugging Face)',
      url: 'https://huggingface.co/Qwen/Qwen3-235B-A22B',
    },
    { label: 'OpenAI: gpt-oss on GitHub', url: 'https://github.com/openai/gpt-oss' },
    {
      label: 'OpenAI: gpt-oss-120b and gpt-oss-20b model card (arXiv 2508.10925)',
      url: 'https://arxiv.org/abs/2508.10925',
    },
    { label: 'Moonshot AI: Kimi K2 on GitHub', url: 'https://github.com/MoonshotAI/Kimi-K2' },
    { label: 'Moonshot AI: Kimi K3 on GitHub', url: 'https://github.com/MoonshotAI/Kimi-K3' },
    {
      label: 'llama.cpp: llama-server options (--cpu-moe, --n-cpu-moe)',
      url: 'https://manpages.debian.org/unstable/llama.cpp-tools/llama-server.1.en.html',
    },
    {
      label: 'ThursdAI: AI releases, November 2026 (Kimi K3.1 Pro, reported)',
      url: 'https://thursdai.news/releases/2026-11',
    },
  ],
  faqs: [
    {
      q: 'What is a mixture of experts in simple terms?',
      a: 'It is a model built from many smaller expert networks plus a router. For each token the router picks a few experts to run, so the model can be very large while each token costs only a fraction of the compute.',
    },
    {
      q: 'Does a mixture-of-experts model need less memory?',
      a: 'No. All experts must be loaded because any of them can be picked for the next token. Memory follows the total parameters; speed and compute follow the active parameters.',
    },
    {
      q: 'Which AI models use mixture of experts?',
      a: 'As of Nov 2026, many large open-weight models do, including Mixtral, DeepSeek-V3, Llama 4 Scout and Maverick, Qwen3-235B-A22B, OpenAI’s gpt-oss and Moonshot’s Kimi K2 and K3. Closed models often do not publish their architecture, so you cannot always tell.',
    },
  ],
  related: [
    { label: 'Previous: The papers that built modern AI', href: '/learn-ai/key-ai-papers' },
    { label: 'Next: How ChatGPT and Claude are trained', href: '/learn-ai/how-llms-are-trained' },
    { label: 'Transformers and attention', href: '/learn-ai/transformers-explained' },
    { label: 'Open models: run an LLM on your laptop', href: '/learn-ai/run-llm-locally' },
    { label: 'AI engineer interview guide', href: '/ai-engineer' },
  ],
  widget: 'moe-calculator',
}
