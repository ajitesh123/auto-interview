// Total vs active parameters of well-known mixture-of-experts (MoE) models.
// Every row comes from the maker's own page (opened Nov 9, 2026). Used by the
// mixture-of-experts lesson: the server-rendered table and the memory calculator both read
// this one file, so the page never hard-codes a number twice.
// Kimi K3.1 Pro (Oct 2026) is reported at the same 2.8T / 104B by Artificial Analysis, but no
// maker page was found, so the table uses Kimi K3 (maker's GitHub model card).

export interface MoeModel {
  name: string
  maker: string
  released: string // month year, as the maker's page or paper dates it
  totalB: number // total parameters, billions
  activeB: number // parameters used per token, billions
  experts: string // as written by the maker, e.g. "2 of 8 per layer"
  licence: string
  source: { label: string; url: string }
}

export const MOE_MODELS: MoeModel[] = [
  {
    name: 'Mixtral 8x7B',
    maker: 'Mistral AI',
    released: 'Dec 2023',
    totalB: 46.7,
    activeB: 12.9,
    experts: '2 of 8 per layer',
    licence: 'Apache 2.0',
    source: {
      label: 'Mistral AI: Mixtral of experts (Dec 11, 2023)',
      url: 'https://mistral.ai/news/mixtral-of-experts',
    },
  },
  {
    name: 'DeepSeek-V3',
    maker: 'DeepSeek',
    released: 'Dec 2024',
    totalB: 671,
    activeB: 37,
    experts: '8 of 256 routed + 1 shared',
    licence: 'Own licence (see source)',
    source: {
      label: 'DeepSeek-V3 Technical Report (arXiv 2412.19437)',
      url: 'https://arxiv.org/abs/2412.19437',
    },
  },
  {
    name: 'Llama 4 Scout',
    maker: 'Meta',
    released: 'Apr 2025',
    totalB: 109,
    activeB: 17,
    experts: '16 experts',
    licence: 'Meta licence (see source)',
    source: {
      label: 'Meta: The Llama 4 herd (Apr 5, 2025)',
      url: 'https://ai.meta.com/blog/Llama-4-multimodal-intelligence/',
    },
  },
  {
    name: 'Llama 4 Maverick',
    maker: 'Meta',
    released: 'Apr 2025',
    totalB: 400,
    activeB: 17,
    experts: '1 of 128 routed + 1 shared',
    licence: 'Meta licence (see source)',
    source: {
      label: 'Meta: The Llama 4 herd (Apr 5, 2025)',
      url: 'https://ai.meta.com/blog/Llama-4-multimodal-intelligence/',
    },
  },
  {
    name: 'Qwen3-235B-A22B',
    maker: 'Alibaba Qwen',
    released: '2025',
    totalB: 235,
    activeB: 22,
    experts: '8 of 128',
    licence: 'Apache 2.0',
    source: {
      label: 'Qwen3-235B-A22B model card (Hugging Face)',
      url: 'https://huggingface.co/Qwen/Qwen3-235B-A22B',
    },
  },
  {
    name: 'Kimi K2',
    maker: 'Moonshot AI',
    released: '2025',
    totalB: 1000,
    activeB: 32,
    experts: '8 of 384 + 1 shared',
    licence: 'Modified MIT',
    source: {
      label: 'Moonshot AI: Kimi K2 on GitHub',
      url: 'https://github.com/MoonshotAI/Kimi-K2',
    },
  },
  {
    name: 'gpt-oss-20b',
    maker: 'OpenAI',
    released: 'Aug 2025',
    totalB: 21,
    activeB: 3.6,
    experts: '4 of 32',
    licence: 'Apache 2.0',
    source: {
      label: 'OpenAI: gpt-oss repo + model card (arXiv 2508.10925)',
      url: 'https://arxiv.org/abs/2508.10925',
    },
  },
  {
    name: 'gpt-oss-120b',
    maker: 'OpenAI',
    released: 'Aug 2025',
    totalB: 117,
    activeB: 5.1,
    experts: '4 of 128',
    licence: 'Apache 2.0',
    source: {
      label: 'OpenAI: gpt-oss repo + model card (arXiv 2508.10925)',
      url: 'https://arxiv.org/abs/2508.10925',
    },
  },
  {
    name: 'Kimi K3',
    maker: 'Moonshot AI',
    released: '2026',
    totalB: 2800,
    activeB: 104,
    experts: '16 of 896 + 2 shared',
    licence: 'Kimi K3 licence',
    source: {
      label: 'Moonshot AI: Kimi K3 on GitHub',
      url: 'https://github.com/MoonshotAI/Kimi-K3',
    },
  },
]

/** Share of the model used for each token, in percent, one decimal. */
export const activePct = (m: { totalB: number; activeB: number }) =>
  Math.round((m.activeB / m.totalB) * 1000) / 10

/** Bytes per weight at each precision. 4-bit = half a byte. */
export const PRECISIONS = [
  { id: '16', label: '16-bit', bytes: 2 },
  { id: '8', label: '8-bit', bytes: 1 },
  { id: '4', label: '4-bit', bytes: 0.5 },
] as const

/** Memory for the weights alone, in GB (billions of params x bytes per param). */
export const weightsGB = (billions: number, bytes: number) => Math.round(billions * bytes * 10) / 10
