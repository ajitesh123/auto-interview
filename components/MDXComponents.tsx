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
import SalesRoleplayFinder from './blog/SalesRoleplayFinder'
import RoleplayScenarioBuilder from './blog/RoleplayScenarioBuilder'
import {
  RoleplayScenarioStats,
  GongObjectionSplitFigure,
  RoleplaySessionFlow,
  RoleplayRubricTable,
  RoleplayScenarioLibrary,
} from './blog/RoleplayScenarioFigures'
import SalesRoleplayCostCalculator from './blog/SalesRoleplayCostCalculator'
import SalesTrainingCostCalc from './blog/SalesTrainingCostCalc'
import {
  SalesTrainingStats,
  SalesTrainingCostFigure,
  SalesTrainingPlatformTable,
} from './blog/SalesTrainingPlatformFigures'
import {
  SalesRoleplayStats,
  SalesRoleplayPricingFigure,
  SalesRoleplayCostFigure,
  SalesRoleplayEvidenceFigure,
} from './blog/SalesRoleplayFigures'
import HinglishRoleplayDrill from './blog/HinglishRoleplayDrill'
import ObjectionAnswerChecker from './blog/ObjectionAnswerChecker'
import {
  ObjectionStats,
  ObjectionAnswerFlow,
  ObjectionLibrary,
  StopRulesTable,
  ObjectionFrameworkTable,
} from './blog/ObjectionHandlingFigures'
import {
  HinglishRoleplayStats,
  HinglishOriginFigure,
  HinglishRulesTable,
  HinglishVendorTable,
  HinglishRubricTable,
  HinglishSessionFlow,
  HinglishScenarioLibrary,
} from './blog/HinglishRoleplayFigures'
import AtsCheckerFinder from './blog/AtsCheckerFinder'
import {
  AtsCheckerStats,
  AtsApplicationFlow,
  AtsRulesTable,
  AtsScoreSpreadFigure,
  AtsCostFigure,
  AtsCheckerTable,
  AtsClaimsTable,
} from './blog/AtsCheckerFigures'
import FreeNoteTakerFit from './blog/FreeNoteTakerFit'
import {
  FreeNoteTakerStats,
  FreeNoteTakerCapFigure,
  FreeNoteTakerExample,
  FreeNoteTakerTable,
  NotFreeTable,
  ConsentTable,
  CasesList,
} from './blog/FreeNoteTakerFigures'
import RealEstateCallCheck from './blog/RealEstateCallCheck'
import AiCallPriceCalculator from './blog/AiCallPriceCalculator'
import {
  AiCallPriceStats,
  AiCallPriceRanges,
  AiCallMinuteBreakdown,
  AiCallWorkedMonth,
  AiCallPriceTable,
} from './blog/AiCallPriceFigures'
import {
  RealEstateCallingStats,
  RealEstateCallLadder,
  RealEstateCostFigure,
  RealEstateRulesTable,
  RealEstateVendorTable,
  RealEstateScripts,
} from './blog/RealEstateCallingFigures'
import AiCoachingPlanner from './blog/AiCoachingPlanner'
import {
  AiCoachingStats,
  AiCoachingVendorTable,
  AiCoachingTimeChart,
  AiCoachingAvomaCost,
  AiCoachingJobs,
  AiCoachingLoop,
  AiCoachingRules,
} from './blog/AiCoachingFigures'
import MockInterviewButton from './ai/MockInterviewButton'
import MockInterviewCTA from './ai/MockInterviewCTA'
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
  RealEstateCallCheck,
  AiCoachingPlanner,
  AiCoachingStats,
  AiCoachingVendorTable,
  AiCoachingTimeChart,
  AiCoachingAvomaCost,
  AiCoachingJobs,
  AiCoachingLoop,
  AiCoachingRules,
  AiCallPriceCalculator,
  AiCallPriceStats,
  AiCallPriceRanges,
  AiCallMinuteBreakdown,
  AiCallWorkedMonth,
  AiCallPriceTable,
  RealEstateCallingStats,
  RealEstateCallLadder,
  RealEstateCostFigure,
  RealEstateRulesTable,
  RealEstateVendorTable,
  RealEstateScripts,
  AtsCheckerFinder,
  AtsCheckerStats,
  AtsApplicationFlow,
  AtsRulesTable,
  AtsScoreSpreadFigure,
  AtsCostFigure,
  AtsCheckerTable,
  AtsClaimsTable,
  MockInterviewButton,
  MockInterviewCTA,
  FreeNoteTakerFit,
  FreeNoteTakerStats,
  FreeNoteTakerCapFigure,
  FreeNoteTakerExample,
  FreeNoteTakerTable,
  NotFreeTable,
  ConsentTable,
  CasesList,
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
  SalesRoleplayFinder,
  RoleplayScenarioBuilder,
  HinglishRoleplayDrill,
  ObjectionAnswerChecker,
  ObjectionStats,
  ObjectionAnswerFlow,
  ObjectionLibrary,
  StopRulesTable,
  ObjectionFrameworkTable,
  HinglishRoleplayStats,
  HinglishOriginFigure,
  HinglishRulesTable,
  HinglishVendorTable,
  HinglishRubricTable,
  HinglishSessionFlow,
  HinglishScenarioLibrary,
  RoleplayScenarioStats,
  GongObjectionSplitFigure,
  RoleplaySessionFlow,
  RoleplayRubricTable,
  RoleplayScenarioLibrary,
  SalesRoleplayCostCalculator,
  SalesTrainingCostCalc,
  SalesTrainingStats,
  SalesTrainingCostFigure,
  SalesTrainingPlatformTable,
  SalesRoleplayStats,
  SalesRoleplayPricingFigure,
  SalesRoleplayCostFigure,
  SalesRoleplayEvidenceFigure,
  Tweet,
}
