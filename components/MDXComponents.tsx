import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import {
  Figure,
  BarList,
  RangeList,
  ColumnChart,
  LineChart,
  SegmentBar,
  CompareTable,
  StatRow,
  PullQuote,
  Flow,
  Insight,
} from './viz'
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
import AuLmsCalculator from './blog/AuLmsCalculator'
import { AuLmsTable, AuLmsWorkedTable } from './blog/AuLmsTables'
import { UaeLmsTable, UaeLmsWorkedTable } from './blog/UaeLmsTables'
import {
  AiLmsFeatureMatrix,
  AiLmsPriceTable,
  AiLmsWorkedTable,
  AiLmsAcademicTable,
} from './blog/AiLmsTables'
import { SalesLmsVendorTable, SalesLmsWorkedTable } from './blog/SalesLmsTables'
import AiCallingCostCalculator from './blog/AiCallingCostCalculator'
import { AiCallingVendorTable, AiCallingWorkedTable } from './blog/AiCallingSalesTables'
import IndiaSalesTrainerFinder from './blog/IndiaSalesTrainerFinder'
import { IndiaSalesTrainingWorkedTable } from './blog/IndiaSalesTrainingTables'
import { Tweet } from 'react-tweet'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  // Data visuals kit (components/viz): themed charts, comparison tables and panels
  Figure,
  BarList,
  RangeList,
  ColumnChart,
  LineChart,
  SegmentBar,
  CompareTable,
  StatRow,
  PullQuote,
  Flow,
  Insight,
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
  AuLmsCalculator,
  AuLmsTable,
  AuLmsWorkedTable,
  UaeLmsTable,
  UaeLmsWorkedTable,
  AiLmsFeatureMatrix,
  AiLmsPriceTable,
  AiLmsWorkedTable,
  AiLmsAcademicTable,
  SalesLmsVendorTable,
  SalesLmsWorkedTable,
  AiCallingCostCalculator,
  AiCallingVendorTable,
  AiCallingWorkedTable,
  IndiaSalesTrainerFinder,
  IndiaSalesTrainingWorkedTable,
  Tweet,
}
