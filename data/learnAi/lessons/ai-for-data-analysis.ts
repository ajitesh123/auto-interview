import type { Lesson } from '../types'

// Sources opened Nov 10, 2026: OpenAI Help "Data analysis with ChatGPT" + File Uploads FAQ,
// Claude Help "Create and edit files with Claude", Google Docs Editors Help "Gemini in Sheets",
// Google Workspace Updates (Jan 29 2025, Python in Gemini in Sheets), Microsoft Support
// "Welcome to Copilot in Excel" + "Introduction to Python in Excel" (the Copilot-with-Python
// article now says it is retired), DSBench (arXiv 2409.07703), DA-Code (arXiv 2410.07331),
// InfiAgent-DABench (arXiv 2401.05507), Ethan Mollick, One Useful Thing (Jul 7, 2023).
// The practice widget and the CSV read data/learnAi/dataAnalysisPractice.ts (fictional data).
// Video: title and channel checked on the YouTube watch page Nov 10, 2026 (duration not shown).
export const lesson: Lesson = {
  slug: 'ai-for-data-analysis',
  track: 'use',
  order: 0,
  title: 'AI for data analysis',
  metaTitle: 'AI for Data Analysis Without Code: ChatGPT, Claude, Gemini',
  metaDescription:
    'How to use ChatGPT, Claude, Gemini in Sheets and Copilot in Excel to analyse data without code, how accurate they are, and 5 checks that catch their mistakes.',
  h1: 'AI for data analysis without code: how it works and how to check it',
  tldr: 'Upload a CSV or Excel file to ChatGPT, Claude, Gemini in Sheets or Copilot in Excel, and the AI writes and runs code (usually Python) to answer your question. So the arithmetic is usually done by code, but the AI still makes analyst mistakes: in the DSBench research test, the best agent solved only 34.12% of data analysis tasks. Use it for speed, and run five quick checks before any number goes into a report.',
  minutes: 15,
  level: 'Beginner',
  steps: [
    {
      heading: 'What actually happens when you upload a spreadsheet',
      body: [
        'Modern chatbots do not “look at” your numbers and guess. OpenAI’s help page lists the steps: ChatGPT will “Write Python code to process the data and produce the required analytical output”, using pandas for the maths and Matplotlib for charts. Claude does the same in a sandbox: it can “write and run code (for example Python or Javascript)”.',
        'This matters because the numbers come from code, not from the model guessing digits. The mistakes come earlier: the code answers a slightly different question, drops rows, or treats a blank as zero. So your job moves from doing the sums to checking the method.',
      ],
      flow: [
        'Your file',
        'AI writes Python',
        'Code runs in a sandbox',
        'Answer + chart',
        'You check',
      ],
      keyIdea:
        'If the AI ran code, the maths is probably right. Check whether it did the right maths on the right rows.',
    },
    {
      heading: 'Which tool to use (as of Nov 2026)',
      body: [
        'All four big assistants can analyse a spreadsheet, but they differ in where the data lives and what they accept. Here is what each maker’s own help page says.',
        'If your data already lives in Excel or Google Sheets, start with the assistant built into that app; it can also write the formula or pivot table for you, which you can then check cell by cell. If you have a one-off CSV, ChatGPT or Claude is quicker. Dedicated tools (Julius, Copilot in Power BI) exist, but learn the checks on a general assistant first.',
      ],
      example: {
        label: 'What the help pages say (Nov 2026)',
        text: `ChatGPT data analysis
  Runs: Python (pandas, Matplotlib)
  Files: .xlsx, .csv, .pdf, JSON
  Limit: 512 MB a file;
    CSV about 50 MB
  Free plan: 3 uploads a day

Claude
  Runs: Python or JavaScript
  Limit: 30 MB a file
  Plans: all, Free included

Gemini in Google Sheets
  Does: formulas, charts, insights
  Python: yes, per Google’s
    Jan 2025 launch post
  Needs: eligible Workspace or
    Google AI plan

Copilot in Excel
  Does: build, summarise, chart
  Python: separately, type =PY
    in a cell (runs in MS cloud)
  Needs: a qualifying M365 plan`,
      },
    },
    {
      heading: 'How accurate is it? Better than guessing, worse than you think',
      body: [
        'Researchers have measured this. DSBench gave models and agents 466 real data analysis tasks; the best agent solved only 34.12%. DA-Code found that the best LLMs it tested reached only 30.5% accuracy on data science code tasks. InfiAgent-DABench built 257 questions from 52 CSV files to test the same skill.',
        'These are hard, multi-step tasks, tested on 2024 models; we found no public 2026 score on the same tests. The lesson holds either way: a confident, well-formatted answer is not evidence that it is right. Our rules of thumb from using these tools:',
      ],
      bullets: [
        'Simple totals and counts on a clean file: usually right',
        'Multi-step questions, joins, messy files: often wrong',
        'Charts look right even when the numbers behind them are not',
      ],
      keyIdea:
        'In the best test we found, the best agent got about 1 in 3 realistic analysis tasks right.',
    },
    {
      heading: 'A workflow that works: inspect, ask, show the method',
      body: [
        'Ethan Mollick, who studies AI at Wharton, gives the most useful advice: “Treat it like an analyst”, and have a conversation instead of writing one giant prompt. Start by asking it to describe the file, then ask one question at a time.',
        'Always ask it to state its method in plain words. In ChatGPT you can also click the blue [>_] link at the end of a message to see the Python it ran.',
      ],
      example: {
        label: 'Copy this: first message with a file',
        text: `Before any analysis, describe this file:
1. How many rows and columns?
2. What does each column mean?
3. How many blank or odd values
   per column, and what will you
   do with them?
Wait for my OK before you analyse.

Then: [one question, e.g. average
order value by city in July].
Show the formula you used in
plain words.`,
      },
    },
    {
      heading: 'Before you upload: keep data safe',
      body: [
        'Treat an upload like an email to a vendor. OpenAI says whether your files help train its models “depends on the service you are using”, and that it does not use content from business offerings such as ChatGPT Enterprise. Check your plan’s data controls before you upload anything real.',
        'Files can also carry attacks. Anthropic warns that a bad actor can hide instructions in a file so Claude “can be tricked into sending information from its context” to third parties. Only upload files you trust.',
      ],
      bullets: [
        'Remove names, phone numbers, emails and IDs first',
        'Use your employer’s approved tool for company data',
        'ChatGPT’s analysis sandbox is destroyed within 13 hours of the chat going inactive (OpenAI)',
      ],
    },
    {
      heading: 'The 5 checks that catch most AI analysis mistakes',
      body: [
        'Run these before a number goes into a deck, a report or an interview answer. Each takes under a minute, and together they catch the four mistakes in the practice below.',
      ],
      bullets: [
        'Rows and blanks: does the row count match your file, and what happened to blanks?',
        'Totals reconcile: do the parts add up to the total you can see?',
        'Right denominator: averages of averages and “per user” vs “per order”',
        'Points vs percent: 20% to 25% is +5 points, a 25% rise',
        'Spot-check one claim against the raw rows yourself',
      ],
      keyIdea:
        'You do not need to code to check AI analysis. You need to know where analysis goes wrong.',
    },
  ],
  keyTerms: [
    {
      term: 'Code execution',
      meaning:
        'The AI writes a small program and runs it on your file, instead of predicting numbers as text.',
    },
    {
      term: 'pandas',
      meaning:
        'The Python library most assistants use to load and calculate on tables. ChatGPT names it on its help page.',
    },
    {
      term: 'Weighted average',
      meaning:
        'An average where bigger groups count more. Total revenue ÷ total orders is weighted; averaging city averages is not.',
    },
    {
      term: 'Percentage points',
      meaning:
        'The plain difference between two percentages. 20% to 25% is +5 points, which is a 25% relative rise.',
    },
    {
      term: 'Like-for-like',
      meaning:
        'Comparing only the items that exist in both periods, so a missing row does not look like a fall.',
    },
  ],
  videos: [
    {
      youtubeId: 'Hp6HnxFyd10',
      title:
        'Use Gemini in Sheets to generate charts and get advanced data insights instantly from a prompt.',
      channel: 'Google Workspace',
      why: 'A short official demo of asking Sheets a question in plain words; watch for where the chart comes from, then run check 5 on it.',
    },
  ],
  tryIt: {
    title: 'Catch an AI mistake with a real chatbot (10 minutes)',
    steps: [
      'Download the 12-row Kettle Lane Cafés CSV from the practice above (the data is made up).',
      'Upload it to ChatGPT or Claude (or import it into Google Sheets and open Gemini) and paste the “first message” prompt from step 4.',
      'Check its description: it should find 12 rows and 1 blank revenue cell. If it does not, tell it.',
      'Ask the four questions from the practice: July average order value, September to October revenue change, Mumbai’s share of orders, and Bengaluru’s best month.',
      'Compare each answer with the right answers above. Note which of the 5 checks you needed.',
    ],
    link: { label: 'Practise explaining your analysis out loud', url: '/free-mock-interview' },
  },
  check: [
    {
      q: 'You upload a CSV to ChatGPT and ask for the average. What does it actually do?',
      options: [
        'Reads the numbers and predicts the answer as text',
        'Writes Python code, runs it on the file, and reports the result',
        'Sends the file to Excel',
        'Looks the answer up on the web',
      ],
      answer: 1,
      why: 'OpenAI’s help page says it writes Python (pandas) and runs it. The risk is in the method, not the arithmetic.',
    },
    {
      q: 'An AI says “average order value is ₹323” by averaging three city averages. Cities sold 4,500, 1,200 and 300 orders. What is wrong?',
      options: [
        'Nothing, that is how averages work',
        'It should have used the median',
        'Bigger cities should count more: divide total revenue by total orders',
        'It should have rounded to ₹300',
      ],
      answer: 2,
      why: 'An average of averages ignores group size. The weighted answer here is ₹271.50.',
    },
    {
      q: 'A conversion rate goes from 20% to 25%. Which sentence is correct?',
      options: [
        'It rose by 5%',
        'It rose by 5 percentage points, a 25% relative rise',
        'It rose by 25 percentage points',
        'It rose by 0.05%',
      ],
      answer: 1,
      why: 'The gap between two percentages is in points; the relative change is in percent.',
    },
  ],
  sources: [
    {
      label: 'OpenAI Help: Data analysis with ChatGPT',
      url: 'https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt',
    },
    {
      label: 'OpenAI Help: File uploads FAQ (plan limits)',
      url: 'https://help-lb.openai.com/en/articles/8555545-file-uploads-faq',
      // help-lb is OpenAI's own help-centre host; it is the URL we opened
    },
    {
      label: 'Claude Help: Create and edit files with Claude',
      url: 'https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude',
    },
    {
      label: 'Google Docs Editors Help: Gemini in Google Sheets',
      url: 'https://support.google.com/docs/answer/14356410?hl=en',
    },
    {
      label: 'Google Workspace Updates: charts and insights with Gemini in Sheets (Jan 29, 2025)',
      url: 'https://workspaceupdates.googleblog.com/2025/01/generate-charts-and-insights-with-gemini-google-sheets.html',
    },
    {
      label: 'Microsoft Support: Welcome to Copilot in Excel',
      url: 'https://support.microsoft.com/en-us/excel/welcome-to-copilot-in-excel',
    },
    {
      label: 'Microsoft Support: Introduction to Python in Excel',
      url: 'https://support.microsoft.com/en-us/office/introduction-to-python-in-excel-55643c2e-ff56-4168-b1ce-9428c8308545',
    },
    {
      label: 'Jing et al.: DSBench (arXiv 2409.07703, 2024)',
      url: 'https://arxiv.org/abs/2409.07703v2',
    },
    {
      label: 'Huang et al.: DA-Code (arXiv 2410.07331, 2024)',
      url: 'https://arxiv.org/abs/2410.07331v2',
    },
    {
      label: 'Hu et al.: InfiAgent-DABench (arXiv 2401.05507)',
      url: 'https://arxiv.org/abs/2401.05507',
    },
    {
      label: 'Ethan Mollick: What AI can do with a toolbox (One Useful Thing, Jul 7, 2023)',
      url: 'https://www.oneusefulthing.org/p/what-ai-can-do-with-a-toolbox-getting',
    },
  ],
  faqs: [
    {
      q: 'Can I use AI for data analysis without knowing how to code?',
      a: 'Yes. ChatGPT, Claude, Gemini in Google Sheets and Copilot in Excel take plain-English questions and write the code themselves. You still need to know where analysis goes wrong (blanks, averages of averages, percentage points) so you can check the answer.',
    },
    {
      q: 'Is ChatGPT accurate for data analysis?',
      a: 'It is accurate at the arithmetic because it runs Python, but it can apply the wrong method. On the DSBench research test the best agent solved 34.12% of realistic analysis tasks. Check row counts, totals and one number by hand before you rely on it.',
    },
    {
      q: 'Can ChatGPT analyse Excel data, and which AI is best for it?',
      a: 'Yes: ChatGPT accepts .xls and .xlsx files as well as CSV, PDF and JSON. Which AI is best depends where your data lives. Inside Excel use Copilot (and Python in Excel); inside Google Sheets use Gemini. For a one-off file, ChatGPT accepts CSVs up to about 50 MB and Claude accepts files up to 30 MB on every plan, as of Nov 2026.',
    },
  ],
  related: [
    {
      label: 'Previous: Use AI to prepare for interviews',
      href: '/learn-ai/ai-for-interview-prep',
    },
    { label: 'Next: What is an API?', href: '/learn-ai/what-is-an-api' },
    { label: 'Why AI makes things up', href: '/learn-ai/ai-hallucinations' },
    { label: 'Data analyst interview guide', href: '/data-analyst' },
    { label: 'Data analyst salary in India and the US', href: '/data-analyst/salary' },
  ],
  fromTheSource: [
    {
      who: 'Ethan Mollick',
      role: 'Wharton professor who studies how people work with AI; writes One Useful Thing.',
      work: 'What AI can do with a toolbox... Getting started with Code Interpreter (Jul 7, 2023)',
      url: 'https://www.oneusefulthing.org/p/what-ai-can-do-with-a-toolbox-getting',
      idea: 'Once ChatGPT could run code on uploaded files, it could do real analysis. His advice: “Treat it like an analyst”, talk with it, and keep “double-checking the results and process, rather than blindly trusting the AI.”',
      breakdown: [
        'A short first request is often enough: his example was “look through it and tell me what you find”.',
        'Share a data dictionary if you have one, so it knows what each column means.',
        'Refine with follow-ups: more tests, a cleaner chart, a different cut.',
        'Check both the numbers and the process, because it still makes mistakes.',
      ],
      use: 'Open every analysis by asking the AI to describe the file, then question it like a junior analyst whose work you sign off.',
    },
    {
      who: 'Liqiang Jing, Dong Yu and colleagues (DSBench)',
      role: 'Researchers behind DSBench, a benchmark of realistic data science tasks for AI agents.',
      work: 'DSBench: How Far Are Data Science Agents from Becoming Data Science Experts? (arXiv, 2024)',
      url: 'https://arxiv.org/abs/2409.07703v2',
      idea: 'They built 466 data analysis tasks and 74 data modelling tasks from real competitions (Eloquence and Kaggle) and tested leading models and agents. The best agent solved “only 34.12% of data analysis tasks”.',
      breakdown: [
        'Tasks come from Eloquence and Kaggle competitions, not toy questions.',
        'They are realistic on purpose: long contexts, large data files and several tables.',
        'Leading LLMs, vision models and agents “struggle with most tasks”, the authors write.',
      ],
      use: 'Use AI to get a first answer fast, then treat that answer as a draft that still needs your checks.',
    },
  ],
  widget: 'spot-the-mistake',
}
