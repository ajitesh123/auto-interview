import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import CloudRevenue from './charts/CloudRevenue'
import InvestmentMetrics from './charts/InvestmentMetrics'
import MarketComparison from './charts/MarketComparison'
import LLMMarketShare from './charts/LLMMarketShare'
import CriteriaForGenAI from './charts/CriteriaForGenAI'
import EnterpriseSpendCategories from './charts/EnterpriseSpendCategories'
import EnterpriseSpendByDepartment from './charts/EnterpriseSpendByDepartment'
import QuoteAnimation from './QuoteAnimation'
import { Tweet } from 'react-tweet'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  CloudRevenue,
  InvestmentMetrics,
  MarketComparison,
  LLMMarketShare,
  CriteriaForGenAI,
  EnterpriseSpendCategories,
  EnterpriseSpendByDepartment,
  QuoteAnimation,
  Tweet,
}
