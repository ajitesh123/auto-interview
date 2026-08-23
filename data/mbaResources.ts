export interface MBAResource {
  slug: string
  title: string
  source: string // e.g., "IIM Ahmedabad", "IIM Bangalore"
  description: string
  downloadUrl: string // placeholder for now
  format: 'PDF' | 'DOCX' | 'GOOGLE_DOCS'
  tags: string[]
}

export interface MBASpecialization {
  slug: string
  name: string
  description: string
  icon: string // emoji
  resources: MBAResource[]
  comingSoon?: boolean
}

export const mbaSpecializations: MBASpecialization[] = [
  {
    slug: 'consulting',
    name: 'Consulting',
    description: 'Casebooks and frameworks from top Indian B-Schools to ace consulting interviews.',
    icon: '💼',
    comingSoon: false,
    resources: [
      {
        slug: 'iim-a-casebook',
        title: 'IIM Ahmedabad Casebook',
        source: 'IIM Ahmedabad',
        description:
          "Comprehensive case interview casebook from India's #1 B-School. Covers market sizing, profitability, and strategy cases.",
        downloadUrl: '#iim-a-casebook',
        format: 'PDF',
        tags: ['case interview', 'consulting', 'strategy'],
      },
      {
        slug: 'iim-b-casebook',
        title: 'IIM Bangalore Casebook',
        source: 'IIM Bangalore',
        description:
          'Structured approach casebook from IIM B. Focuses on frameworks, guesstimates, and industry analysis.',
        downloadUrl: '#iim-b-casebook',
        format: 'PDF',
        tags: ['case interview', 'consulting', 'strategy'],
      },
      {
        slug: 'iim-c-casebook',
        title: 'IIM Calcutta Casebook',
        source: 'IIM Calcutta',
        description:
          'Analytical casebook from IIM C. Strong focus on quantitative cases and data interpretation.',
        downloadUrl: '#iim-c-casebook',
        format: 'PDF',
        tags: ['case interview', 'consulting', 'strategy'],
      },
      {
        slug: 'fms-delhi-casebook',
        title: 'FMS Delhi Casebook',
        source: 'FMS Delhi',
        description:
          'Practical case studies from Faculty of Management Studies. Real-world business scenarios and solutions.',
        downloadUrl: '#fms-delhi-casebook',
        format: 'PDF',
        tags: ['case interview', 'consulting', 'strategy'],
      },
    ],
  },
  {
    slug: 'general-management',
    name: 'General Management',
    description: 'Resources and prep material for general management and strategy roles.',
    icon: '📊',
    resources: [],
    comingSoon: true,
  },
  {
    slug: 'finance',
    name: 'Finance',
    description: 'Investment banking, PE/VC, and corporate finance interview materials.',
    icon: '📈',
    resources: [],
    comingSoon: true,
  },
  {
    slug: 'marketing',
    name: 'Marketing',
    description: 'FMCG, digital marketing, and brand management prep guides.',
    icon: '🎯',
    resources: [],
    comingSoon: true,
  },
  {
    slug: 'hr',
    name: 'HR',
    description: 'Human resources, organizational behavior, and behavioral interview resources.',
    icon: '👥',
    resources: [],
    comingSoon: true,
  },
  {
    slug: 'product-management',
    name: 'Product Management',
    description: 'PM tech, design, and strategy resources for top product roles.',
    icon: '📱',
    resources: [],
    comingSoon: true,
  },
]

export function getSpecializationBySlug(slug: string): MBASpecialization | undefined {
  return mbaSpecializations.find((spec) => spec.slug === slug)
}

export function getAllSpecializationSlugs(): string[] {
  return mbaSpecializations.map((spec) => spec.slug)
}
