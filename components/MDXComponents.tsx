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
import CTABanner from './CTABanner'
import PracticeQuestion from './blog/PracticeQuestion'
import KeyFacts from './blog/KeyFacts'
import SalesLmsCalculator from './blog/SalesLmsCalculator'
import AiLmsPicker from './blog/AiLmsPicker'
import IndiaLmsCalculator from './blog/IndiaLmsCalculator'
import DpdpLdChecker from './blog/DpdpLdChecker'
import { IndiaLmsTable, IndiaLmsWorkedTable } from './blog/IndiaLmsTables'
import UaeLmsCalculator from './blog/UaeLmsCalculator'
import { UaeLmsTable, UaeLmsWorkedTable } from './blog/UaeLmsTables'
import {
  AiLmsFeatureMatrix,
  AiLmsPriceTable,
  AiLmsWorkedTable,
  AiLmsAcademicTable,
} from './blog/AiLmsTables'
import { SalesLmsVendorTable, SalesLmsWorkedTable } from './blog/SalesLmsTables'
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
  CTABanner,
  PracticeQuestion,
  KeyFacts,
  SalesLmsCalculator,
  AiLmsPicker,
  IndiaLmsCalculator,
  DpdpLdChecker,
  IndiaLmsTable,
  IndiaLmsWorkedTable,
  UaeLmsCalculator,
  UaeLmsTable,
  UaeLmsWorkedTable,
  AiLmsFeatureMatrix,
  AiLmsPriceTable,
  AiLmsWorkedTable,
  AiLmsAcademicTable,
  SalesLmsVendorTable,
  SalesLmsWorkedTable,
  Tweet,
}
