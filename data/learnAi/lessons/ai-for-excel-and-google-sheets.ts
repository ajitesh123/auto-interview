import type { Lesson } from '../types'

// Sources opened Nov 11, 2026 (brief: docs/briefs/2026-11-11-ai-for-excel-and-google-sheets.md):
// Microsoft Support "COPILOT function" (retired Sep 14, 2026), "Copilot in Excel" and the Copilot
// in Excel FAQ; Google Docs Editors Help "AI function" and "Gemini in Google Sheets"; Google
// Workspace Updates (Apr 22, 2026); Claude docs "Use Claude for Excel"; OpenAI "ChatGPT for Excel"
// (Mar 5, 2026, updated May 5, 2026); SpreadsheetBench (arXiv 2406.14991v2).
// Worked example: fictional Kestrel Stationery orders, public/downloads/learn-ai/kestrel-october-orders.csv.
// Every number in it was computed in Python from that file: all revenue ₹66,600; October ₹62,550;
// first SUMIFS North ₹5,400; fixed North ₹26,400; South ₹23,850; West ₹12,300; region totals
// without a date filter ₹60,600; top October rep Ravi ₹17,100.
// Video: ID and title from Ben Collins' own post (benlcollins.com, Aug 25, 2025), which embeds it;
// YouTube oEmbed timed out in this run (re-verify next Slot B).
const MS_FN = 'https://support.microsoft.com/en-us/excel/copilot-function'
const MS_COPILOT = 'https://support.microsoft.com/en-us/copilot-excel'
const MS_FAQ =
  'https://support.microsoft.com/excel/copilot/frequently-asked-questions-about-copilot-in-excel'
const G_AI = 'https://support.google.com/docs/answer/15877199'
const G_PANEL = 'https://support.google.com/docs/answer/14356410?hl=en'
const G_BUILD =
  'https://workspaceupdates.googleblog.com/2026/04/build-and-edit-complex-spreadsheets-with-Gemini-in-Google-Sheets.html'
const CLAUDE_XL = 'https://claude.com/docs/office-agents/excel'
const OPENAI_XL = 'https://openai.com/blog/chatgpt-for-excel'
const SSB = 'https://arxiv.org/html/2406.14991v2'

export const lesson: Lesson = {
  slug: 'ai-for-excel-and-google-sheets',
  track: 'use',
  order: 0,
  title: 'AI for Excel and Google Sheets',
  metaTitle: 'AI for Excel and Google Sheets: Copilot, Gemini, ChatGPT',
  metaDescription:
    'Use Copilot, Gemini, Claude and ChatGPT in Excel and Google Sheets: which fits your plan, a worked formula workflow, the =AI() function and 2 error checks.',
  h1: 'AI for Excel and Google Sheets: a workflow that gets the number right',
  tldr: 'Every big assistant now works inside a spreadsheet: Copilot in Excel, Gemini in Google Sheets, and the Claude and ChatGPT add-ins. Ask the AI for a formula you can see, not just an answer, then run two quick checks: do the rows count right, and do the parts add up to the total? In our practice sheet, a correct-looking formula missed ₹21,000 of ₹26,400 in sales until those checks caught it. No paid plan? OpenAI says its Excel and Sheets add-ins work on all ChatGPT plans.',
  minutes: 18,
  level: 'Beginner',
  steps: [
    {
      heading: 'Which AI assistant works in your spreadsheet?',
      body: [
        'Start with the app your data already lives in and the plan you already pay for. As of Nov 2026, each maker’s own help page says the following.',
        'One change trips people up: Microsoft retired the =COPILOT() cell formula. Its help page says: “Starting September 14, 2026, the COPILOT function is no longer available in Microsoft Excel.” Old results stay as values, but a recalculated cell shows #NAME?. Use the Copilot pane instead.',
        'How to open each one: Copilot from its icon at the bottom right of Excel; Gemini from “Ask Gemini” in Sheets; Claude by installing “Claude for Microsoft 365” from Microsoft’s add-in store; ChatGPT from the install link on OpenAI’s page. If a feature is missing, your plan or your workplace admin has not turned it on.',
      ],
      visual: {
        kind: 'compare',
        label: 'Makers’ help pages · 4 assistants',
        title: 'All four can edit a workbook; the plan you already have decides where to start',
        corner: 'As of Nov 2026',
        columns: [
          { name: 'Copilot in Excel', sub: 'Microsoft', href: MS_COPILOT },
          { name: 'Gemini in Sheets', sub: 'Google', href: G_PANEL },
          { name: 'Claude for Excel', sub: 'Anthropic add-in', href: CLAUDE_XL },
          { name: 'ChatGPT for Excel', sub: 'and for Google Sheets', href: OPENAI_XL },
        ],
        rows: [
          {
            label: 'Works in',
            cells: [
              'Windows, Mac, web; iPad chat and plan; phones chat only',
              'Google Sheets; convert .xlsx files first',
              'Excel on web, Windows, Mac; not iPad or Android',
              'Excel and Google Sheets add-ins',
            ],
          },
          {
            label: 'Edits the sheet for you',
            cells: [
              'Yes, in edit mode (the default)',
              'Yes: formulas, pivots, formatting',
              'Yes, warns before overwriting',
              'Yes, asks first; edits can be undone',
            ],
          },
          {
            label: 'AI in a cell formula',
            cells: ['=COPILOT() retired 14 Sep 2026', '=AI(), text answers only', null, null],
          },
          {
            label: 'Plans that include it',
            cells: [
              'Most work M365 plans; Premium; Personal/Family with AI credits',
              'Eligible Workspace or Google AI plan',
              'Claude Pro, Max, Team, Enterprise',
              'All ChatGPT plans (since 5 May 2026)',
            ],
          },
          {
            label: 'The maker’s own warning',
            cells: [
              '“can sometimes make mistakes”',
              '“may suggest inaccurate” information',
              'Not for audit-critical maths unchecked',
              'Complex formulas may need manual refinement',
            ],
          },
        ],
        note: 'Work M365 plans = any business or enterprise plan eligible for Copilot Chat. Gemini’s whole-sheet building is US English only and needs Business/Enterprise Standard or Plus, or Google AI Pro or Ultra. A dash means the maker’s page does not list it. Plans change often; open the linked page on the day you decide.',
        source: [
          { label: 'Microsoft: Copilot in Excel', url: MS_COPILOT },
          { label: 'Microsoft: Copilot in Excel FAQ', url: MS_FAQ },
          { label: 'Microsoft: COPILOT function', url: MS_FN },
          { label: 'Google: AI function', url: G_AI },
          { label: 'Google: Gemini in Sheets', url: G_PANEL },
          { label: 'Google Workspace Updates, 22 Apr 2026', url: G_BUILD },
          { label: 'Anthropic: Claude for Excel', url: CLAUDE_XL },
          { label: 'OpenAI: ChatGPT for Excel', url: OPENAI_XL },
        ],
        updated: 'Checked 11 Nov 2026',
      },
      keyIdea:
        'Pick the assistant built into the app and plan you already have. The checking habit matters more than the brand.',
    },
    {
      heading: 'The workflow: from a question to a number you can defend',
      body: [
        'Here is one real task done end to end on a 10-row practice sheet (the company and people are made up). Download it from “Try it” below and follow along in Excel or Google Sheets with any assistant. In Excel, save it as .xlsx first (File, Save As): Copilot needs a modern workbook format.',
        'The rule that makes it work: ask for a formula you can see, not just an answer. A formula can be checked cell by cell; a sentence in a chat cannot.',
      ],
      workflow: {
        title: 'October revenue by region for Kestrel Stationery',
        input:
          'A sheet with 10 orders. Columns: A Order ID, B Order date, C Region, D Rep, E Units, F Unit price (INR). Question from your manager: “What was October revenue by region, and who was our top rep?”',
        steps: [
          {
            title: 'Describe the sheet and ask for formulas, not answers',
            detail:
              'Tell the assistant where the data is, what each column means, and what you need. Ask it to wait before changing anything.',
            code: `My data is in A1:F11 (header in row 1).
Columns: Order ID, Order date, Region,
Rep, Units, Unit price (INR).
1. Add a Revenue column (Units x Price).
2. Give me one formula per region for
   October 2026 revenue.
3. Explain each part of the formula.
Show me the plan before you edit.`,
          },
          {
            title: 'Read the formula it writes',
            detail:
              'A typical first answer looks like this (we wrote it to show the trap; some assistants flag the bad rows, many do not). It adds Revenue in G2 as =E2*F2, filled down, then sums by region and date window. It looks right. For North it returns ₹5,400.',
            code: `=SUMIFS(G2:G11,C2:C11,"North",B2:B11,">="&DATE(2026,10,1),B2:B11,"<"&DATE(2026,11,1))`,
          },
          {
            title: 'Run two checks before you trust it',
            detail:
              'Check 1: =ROWS(B2:B11) says 10 rows, but =COUNT(B2:B11) says 9 dates, so one date is text. Check 2: add the three region totals for all dates (no date filter) with the formula below. It gives ₹60,600, but =SUM(G2:G11) gives ₹66,600, so ₹6,000 sits under a region name that does not match.',
            code: `=SUMIFS(G2:G11,C2:C11,"North")+SUMIFS(G2:G11,C2:C11,"South")+SUMIFS(G2:G11,C2:C11,"West")`,
          },
          {
            title: 'Fix the data, not the answer',
            detail:
              'Order K-103 says “North ” with a trailing space, and K-107’s date was typed as 21.10.2026, which English-language settings usually keep as text. Type headers in H1 (Region clean) and I1 (Date clean). In H2 put =TRIM(C2). In I2 put the formula below and format column I as a date. Fill both down, then change the SUMIFS ranges from C and B to H and I.',
            code: `=IF(ISNUMBER(B2),B2,DATE(RIGHT(B2,4),MID(B2,4,2),LEFT(B2,2)))`,
          },
          {
            title: 'Answer the second question with a pivot table',
            detail:
              'Ask the assistant to build a PivotTable of Revenue by Rep, filtered to October (use the clean date column). Check that its grand total is ₹62,550, the same as the three region totals added together.',
          },
        ],
        output:
          'October revenue: North ₹26,400, South ₹23,850, West ₹12,300; total ₹62,550 (order K-110 is November, so it is left out). Top rep: Ravi, ₹17,100. The first formula reported North as ₹5,400.',
      },
    },
    {
      heading: 'Two checks that catch silent formula errors',
      body: [
        'The dangerous AI spreadsheet mistake is not an error message. It is a formula that runs, returns a tidy number, and quietly skips rows. Neither check needs you to know the right answer in advance.',
        'Run them every time an AI gives you a total, whichever assistant you use. The chart shows what the first formula would have told your manager.',
      ],
      bullets: [
        'Rows check: compare ROWS (or COUNTA) with COUNT on a date or number column. A gap means some cells are text.',
        'Reconcile check: the parts (regions, reps, months) must add up to the plain SUM of the column. A gap means a label does not match: spaces, spelling or case.',
        'If either check fails, ask the AI to find the rows behind the gap. Then fix the data with TRIM or a clean date column.',
      ],
      visual: {
        kind: 'bars',
        label: 'Worked example · October · 10 fictional orders · INR',
        title:
          'Fixed, North is the top region at ₹26,400; the first formula ranked it last at ₹5,400',
        rows: [
          { label: 'North, after fixes', value: 26400, highlight: true },
          { label: 'South (same in both)', value: 23850 },
          { label: 'West (same in both)', value: 12300 },
          {
            label: 'North, first formula',
            value: 5400,
            note: 'Skips K-103 (“North ” with a space) and K-107 (date stored as text): ₹21,000',
          },
        ],
        format: { prefix: '₹' },
        emphasis: true,
        note: 'The two missed orders were worth ₹21,000. Read alone, the first answer makes the strongest region look like the weakest.',
        source: [
          {
            label: 'Practice sheet (CSV, fictional data)',
            url: 'https://www.autointerviewai.com/downloads/learn-ai/kestrel-october-orders.csv',
          },
        ],
        updated: 'Computed 11 Nov 2026',
      },
      example: {
        label: 'Copy these: three prompts for any formula',
        text: `Explain this formula part by part,
and tell me which rows it skips: [paste]

Why does this cell return #N/A?
Formula: [paste]. Data: [describe].

Write an XLOOKUP that finds [what] in
[range], and say what it returns when
there is no match.`,
      },
      keyIdea:
        'If the parts do not add up to the total, the formula is wrong, however confident it looks.',
    },
    {
      heading: 'Tag a text column with =AI() in Google Sheets',
      body: [
        'For words rather than numbers, Google Sheets has a cell formula: =AI("prompt", range). Google says it can generate text, summarise, categorise and analyse sentiment, with answers “limited to text”.',
        'Know its limits before you rely on it. Only the first 350 selected cells generate at once, it cannot see your whole sheet, and it cannot sit inside another function such as IF.',
      ],
      workflow: {
        title: 'Sort 40 customer comments into themes',
        input:
          'Column B holds 40 short customer comments (B2:B41). You want a theme for each, then a count per theme.',
        steps: [
          {
            title: 'Write a closed list into the prompt',
            detail:
              'Put this in C2. Give the exact labels and an “Other” bucket, and ask for one word only. Open-ended prompts return a different wording on every row.',
            code: `=AI("Classify this comment as Delivery, Price, Quality or Other. Reply with one word only.", B2)`,
          },
          {
            title: 'Test on 5 rows before filling down',
            detail:
              'Fill C2 down to C6, select C2:C6 and click “Generate and insert”; nothing appears until you do. Read the 5 answers against the comments, tighten the labels if two themes overlap, then fill down to C41 and generate again.',
          },
          {
            title: 'Count strays and spot-check',
            detail:
              'This returns 0 when every answer is one of your four labels. Then read 10 random rows yourself.',
            code: `=COUNTA(C2:C41)-SUMPRODUCT(COUNTIF(C2:C41,{"Delivery","Price","Quality","Other"}))`,
          },
          {
            title: 'Freeze the results',
            detail:
              'Copy column C and paste values only, so a later refresh cannot change the labels your report used.',
          },
        ],
        output:
          'A theme for every comment, zero strays, 10 rows checked by hand, and a COUNTIF table per theme you can chart.',
      },
    },
    {
      heading: 'How accurate is AI at spreadsheet work?',
      body: [
        'Researchers measured it. SpreadsheetBench collected 912 real questions from Excel forums and checked each answer against several test sheets. In the 2024 paper, the best model solved 18.35% in one try, Copilot in Excel 20.00% on a hand-checked sample, and Excel experts 71.33% on a 50-question subset.',
        'Tools have improved fast. In April 2026 Google said Gemini in Sheets reached a 70.48% success rate on the full benchmark. That is the maker’s own test, so treat it as a claim, not a guarantee for your sheet.',
      ],
      visual: {
        kind: 'bars',
        label: 'SpreadsheetBench · different setups',
        title: 'AI went from about 1 in 5 spreadsheet tasks (2024) to a reported 7 in 10 (2026)',
        rows: [
          { label: 'Excel experts (2024)', value: 71.33 },
          {
            label: 'Gemini in Sheets (2026)',
            value: 70.48,
            highlight: true,
          },
          {
            label: 'Copilot in Excel (2024)',
            value: 20,
            display: '20.00%',
          },
          { label: 'GPT-4o, one try (2024)', value: 18.35 },
        ],
        format: { suffix: '%', decimals: 2 },
        emphasis: true,
        note: 'Experts: 50 questions. Copilot: about 5% of questions, checked by hand. GPT-4o: all 912, one try. These are the paper’s soft scores. Gemini: Google’s own run on the full set in 2026, not re-run by us.',
        source: [
          { label: 'Ma et al., SpreadsheetBench (arXiv 2406.14991v2)', url: SSB },
          { label: 'Google Workspace Updates, 22 Apr 2026', url: G_BUILD },
        ],
        updated: 'Checked 11 Nov 2026',
      },
      keyIdea:
        'Even at 7 in 10, three tasks in ten go wrong. The checks are how you find which three.',
    },
    {
      heading: 'Keep your workbook and your data safe',
      body: [
        'An assistant that can edit a workbook can also be misled by one. Anthropic’s page says: “Only use Claude for Excel with trusted spreadsheets.” Files from outside can hide instructions that try to make the AI copy or change data.',
        'Treat any upload or add-in like sharing the file with a vendor. Use your employer’s approved tool for company data, and remove names, phone numbers and IDs from practice files.',
      ],
      bullets: [
        'Work on a copy before you let an AI edit widely.',
        'Read every “confirm” prompt before it changes data.',
        'Keep the formulas visible, so a reviewer can follow the maths.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'SUMIFS',
      meaning:
        'An Excel and Sheets formula that adds the cells in one column when other columns meet your conditions, such as a region and a date window.',
    },
    {
      term: 'Reconcile',
      meaning: 'Check that the parts of a breakdown add up to the plain total of the same column.',
    },
    {
      term: 'Helper column',
      meaning:
        'An extra column that cleans or reshapes data, like TRIM on a name, so formulas can read it reliably.',
    },
    {
      term: '=AI() function',
      meaning:
        'A Google Sheets formula that sends a prompt and a cell range to Gemini and returns text into the cell.',
    },
    {
      term: 'Add-in',
      meaning:
        'An app that runs inside Excel or Sheets, like Claude for Excel or ChatGPT for Excel, with access to the open workbook.',
    },
  ],
  videos: [
    {
      youtubeId: 'N7QLBNx8KxM',
      title: 'How to use the AI Function in Google Sheets (with 10 examples)',
      channel: 'Ben Collins',
      why: 'A Sheets trainer walks through 10 real =AI() uses: sentiment, categories, summaries and pulling parts out of addresses. Watch how he checks each result.',
    },
  ],
  tryIt: {
    title: 'Run the workflow on the practice sheet (15 minutes)',
    steps: [
      'Download the 10-row Kestrel Stationery CSV (fictional data). In Excel, save it as .xlsx; in Google Sheets, use File, Import.',
      'Open your assistant (Copilot, Gemini, Claude or ChatGPT) and paste the first prompt from the workflow above.',
      'Before you accept any total, run the rows check and the reconcile check yourself.',
      'Ask the assistant to find the rows behind any gap, fix them with helper columns, and recompute.',
      'Compare with the answers above: North ₹26,400, South ₹23,850, West ₹12,300, top rep Ravi ₹17,100.',
    ],
    link: {
      label: 'Download the practice sheet (CSV)',
      url: '/downloads/learn-ai/kestrel-october-orders.csv',
    },
  },
  check: [
    {
      q: 'Region totals for all dates add up to ₹60,600, but the plain SUM of the revenue column is ₹66,600. What is the most likely cause?',
      options: [
        'Excel rounding',
        'Some rows have a region label that does not match exactly, such as a trailing space',
        'The AI used the wrong currency',
        'Nothing; totals never match',
      ],
      answer: 1,
      why: 'SUMIFS needs an exact label match. “North ” with a space is a different region, so its rows drop out of every total.',
    },
    {
      q: 'You type =COPILOT("Summarize this", A2:A20) in Excel in November 2026. What happens?',
      options: [
        'It summarises the range',
        'It works only on Mac',
        'It returns #NAME?, because Microsoft retired the function on 14 Sep 2026',
        'It opens ChatGPT',
      ],
      answer: 2,
      why: 'Microsoft retired the COPILOT function; recalculated cells show #NAME?. Use the Copilot pane instead.',
    },
    {
      q: 'Which use of =AI() in Google Sheets is safest?',
      options: [
        'Asking it for the total of a revenue column',
        'Nesting it inside IF to decide which rows to keep',
        'Classifying comments into a closed list of labels, testing 5 rows first, then counting strays',
        'Running it on 5,000 cells at once without checking',
      ],
      answer: 2,
      why: 'It returns text and cannot be nested; a closed label list, a small test and a stray count keep it reliable.',
    },
  ],
  sources: [
    { label: 'Microsoft Support: COPILOT function (retired Sep 14, 2026)', url: MS_FN },
    { label: 'Microsoft Support: Copilot in Excel', url: MS_COPILOT },
    { label: 'Microsoft Support: Copilot in Excel FAQ', url: MS_FAQ },
    { label: 'Google Docs Editors Help: Use the AI function in Google Sheets', url: G_AI },
    { label: 'Google Docs Editors Help: Gemini in Google Sheets', url: G_PANEL },
    {
      label: 'Google Workspace Updates: Build and edit spreadsheets with Gemini (Apr 22, 2026)',
      url: G_BUILD,
    },
    { label: 'Claude docs: Use Claude for Excel', url: CLAUDE_XL },
    { label: 'OpenAI: ChatGPT for Excel (Mar 5, 2026; updated May 5, 2026)', url: OPENAI_XL },
    { label: 'Ma et al.: SpreadsheetBench (arXiv 2406.14991v2, 2024)', url: SSB },
    {
      label: 'Ben Collins: How to use the AI Function in Google Sheets (Aug 25, 2025)',
      url: 'https://www.benlcollins.com/?p=21529',
    },
  ],
  faqs: [
    {
      q: 'How do I use AI in Excel?',
      a: 'Open the Copilot pane in Excel (it needs a qualifying Microsoft 365 plan), or install the Claude for Excel or ChatGPT for Excel add-in. Describe your data and ask for a formula you can see, then check that the row count is right and the parts add up to the total before you use the number. Without a paid Microsoft plan, OpenAI says ChatGPT for Excel works on all ChatGPT plans, or you can upload the file to a chatbot (see our AI for data analysis lesson).',
    },
    {
      q: 'Why does the COPILOT function in Excel show #NAME?',
      a: 'Microsoft retired the =COPILOT() function on September 14, 2026. Results already calculated stay as cached values, but a cell that recalculates returns #NAME?. Microsoft points users to the Copilot pane in Excel instead.',
    },
    {
      q: 'Is there an AI function in Google Sheets?',
      a: 'Yes. Type =AI("your prompt", range) to generate, summarise or categorise text with Gemini. It needs an eligible Workspace or Google AI plan, returns text only, generates up to 350 selected cells at a time and cannot be nested inside other functions.',
    },
  ],
  related: [
    { label: 'Previous: AI for data analysis', href: '/learn-ai/ai-for-data-analysis' },
    { label: 'Next: What is an API?', href: '/learn-ai/what-is-an-api' },
    { label: 'Why AI makes things up', href: '/learn-ai/ai-hallucinations' },
    { label: 'Data analyst interview guide', href: '/data-analyst' },
    { label: 'Data analyst concepts to know', href: '/data-analyst/concepts' },
  ],
  fromTheSource: [
    {
      who: 'Zeyao Ma, Jie Tang and colleagues (SpreadsheetBench)',
      role: 'Researchers at Renmin University of China, Tsinghua University and Zhipu AI who built the main test of AI on real spreadsheet tasks.',
      work: 'SpreadsheetBench: Towards Challenging Real World Spreadsheet Manipulation (arXiv, 2024)',
      url: SSB,
      idea: 'They took 912 real questions people asked on Excel forums and scored AI answers against several test sheets per question. Their finding: “Even the most advanced spreadsheet agent, Copilot in Excel, only achieves an accuracy of roughly 20%.”',
      breakdown: [
        'Real forum questions are messy: odd layouts, several tables, unclear wording.',
        'Each answer is tested on more than one sheet, so a formula that works only by luck fails.',
        'Excel experts scored 71.33%, so even people miss some; the gap was the point.',
      ],
      use: 'Test any AI formula the way they did: run it on a second, slightly different sheet, or reconcile it against a plain total.',
    },
  ],
}
