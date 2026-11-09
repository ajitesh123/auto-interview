// Week 7: prioritise and hit the growth number. Sources opened Nov 9, 2026; see `sources`.
import type { BatchWeek } from '../types'

export const week: BatchWeek = {
  week: 7,
  slug: 'week-7',
  phase: 2,
  title: 'Prioritise and hit your number',
  metaTitle: 'YC Batch Week 7: Prioritise and Hit Your Growth Target',
  metaDescription:
    'Week 7 of a YC batch, run yourself: grade every task by impact the way YC partner Adora Cheung teaches, cut one distraction and try to hit 5–7% weekly growth.',
  h1: 'Week 7: prioritise hard and hit this week’s growth number',
  tldr: 'Past the middle of the batch, office hours keep coming back to one question: did you hit your number, and if not, why not? This week you grade every task by its impact on your weekly goal, the way YC partner Adora Cheung teaches, cut one distraction, and aim for 5–7% growth.',
  minutes: 35,
  atYc: {
    body: [
      'YC’s “What Happens at YC” page says partners hold group office hours every two weeks and one-on-one office hours as often as founders want, and that what founders discuss depends on their stage and where they are in the batch. Each group is split into sections of 6 to 10 companies.',
      'Paul Graham described the loop in 2022: founders bring the problems they are worried about, partners help find the one that matters most, and founders try fixes “at a resolution of a week or less”, then report back. His summary: “Speed defines startups. Focus enables speed. YC improves focus.” In “Startup = Growth” (2012) he says YC measures growth per week, and that 5–7% a week is good.',
      'Founders’ accounts match. Nathan Leung (Harbor, S26), writing six weeks in, says his subgroup is 9 healthcare companies, that group office hours run every two weeks with founders sharing what has and hasn’t worked, and that outside the weekly events “the YC program has largely been hands-off”. Katia Damer (Prolific, S19) writes that their first office hours with group partner Jared Friedman found growth rate to be the main bottleneck, and that he pushed for a goal “so ambitious that you could barely imagine it working, but is theoretically possible.”',
      'In March 2025, YC CEO Garry Tan told CNBC that “the whole batch is growing 10% week on week” for Winter 2025, without saying which metric. YC’s public pages do not describe a formal mid-batch review, so we don’t claim one.',
    ],
    confidence: 'documented',
    sources: [
      { label: 'Y Combinator: What Happens at YC', url: 'https://www.ycombinator.com/about' },
      {
        label: 'Paul Graham, What I’ve Learned from Users (2022)',
        url: 'https://paulgraham.com/users.html',
      },
      { label: 'Paul Graham, Startup = Growth (2012)', url: 'https://paulgraham.com/growth.html' },
      {
        label: 'Nathan Leung (Harbor, S26): Notes on YC, halfway through Spring 2026',
        url: 'https://www.natecation.com/notes-on-yc-spring-2026/',
      },
      {
        label: 'Katia Damer (Prolific, S19): Reflecting on Y Combinator, 3 lessons',
        url: 'https://www.prolific.com/resources/reflecting-on-ycombinator-3-lessons',
      },
      {
        label:
          'CNBC (via NBC New York): YC startups are fastest growing in fund history (Mar 2025)',
        url: 'https://www.nbcnewyork.com/news/business/money-report/y-combinator-startups-are-fastest-growing-most-profitable-in-fund-history-because-of-ai/6188199/',
      },
    ],
  },
  challenge: {
    name: 'The one-number week',
    task: 'Set this week’s target at 5–7% above last week’s value of your one number. Work only on tasks you graded high impact, and cut one recurring distraction for the whole week.',
    proof:
      'A Sunday update with last week’s value, this week’s target, this week’s actual, your graded task list showing what you finished, and the distraction you cut. You pass if you hit the target; if you missed, name the biggest blocker and the fix you will try next week.',
    basis:
      'Paul Graham’s “Startup = Growth” (5–7% a week is good during YC), Adora Cheung’s YC Startup School talk “How to Prioritize Your Time” (2019), and the group office hours described on YC’s “What Happens at YC” page.',
  },
  frameworks: [
    {
      name: 'Real vs fake progress, graded by impact and complexity',
      who: 'Adora Cheung, YC partner (Startup School, 2019)',
      source: {
        label: 'Adora Cheung - How to Prioritize Your Time',
        url: 'https://www.youtube.com/watch?v=XcCmMOWuAF4',
      },
      explain: [
        'Cheung’s first test: real progress moves your main metric, usually revenue or active users. Fake progress feels productive but doesn’t: conferences, awards, networking events, polishing a metric that isn’t the main one. YC’s recap of the talk quotes her: “If it contributes to real startup progress, you should consider doing it, and if it doesn’t, then don’t.” Most real tasks turn out to be a version of talking to users or building the product.',
        'Keep one running list of ideas, but don’t act on each one as it arrives; she says switching every time causes whiplash. Once a week, set a goal on your main metric. Then grade each task twice. Impact: high, medium or low, meaning how likely it is to help hit this week’s goal compared with the other tasks. Complexity: easy (under a day), medium (one to two days) or hard (many days).',
        'Do high-impact easy tasks first, then high-impact medium ones. Avoid low-impact hard ones. Take on only as many as you can finish well. Her example is a SaaS founder whose weekly goal is five new paying customers: visiting 10 prospects they have been introduced to ranks at the top, and most programming tasks rank near the bottom.',
        'To check yourself, she suggests writing down every hour of a past week with the impact you expected and the impact you got, and a weekly update with the goal, whether you hit it, the biggest blocker, and what you learned. Group similar work into long blocks (a version of Graham’s maker’s schedule), and decide quickly: “Time is often wasted in indecisiveness.”',
      ],
      steps: [
        'Write this week’s goal as a number on your one metric.',
        'Put every task idea into one list. Don’t start any of them yet.',
        'Grade each task’s impact on this week’s goal: high, medium or low.',
        'Grade each task’s complexity: easy (under a day), medium (one to two days), hard (longer).',
        'Order the list: high impact and easy, then high impact and medium. Cut low impact and hard.',
        'Commit to only what you can finish, and block your days (for example, mornings building, afternoons with users).',
        'On Sunday, compare the impact you expected with what happened, and write it in your update.',
      ],
      example: {
        label: 'Illustrative: a graded list for a clinic booking tool',
        text: 'Goal: weekly active clinics 60 → 64 (+6.7%)\n\nHigh impact, easy     call the 6 clinics that went quiet last week\nHigh impact, easy     ask the 5 happiest clinics for one introduction each\nHigh impact, medium   build the SMS reminder 4 clinics asked for\nMedium impact, easy   fix the calendar sync bug (2 complaints)\nLow impact, hard      redesign the dashboard            → cut\nLow impact, medium    apply for a startup awards list   → cut (fake progress)',
      },
    },
    {
      name: 'A weekly growth target, checked at the resolution of a week',
      who: 'Paul Graham, “Startup = Growth” (2012) and “What I’ve Learned from Users” (2022)',
      source: { label: 'Paul Graham, Startup = Growth', url: 'https://paulgraham.com/growth.html' },
      explain: [
        'Graham writes that YC measures growth per week, partly because there is so little time before Demo Day and partly because early startups need frequent feedback. “A good growth rate during YC is 5-7% a week.” 10% is exceptional. 1% is “a sign you haven’t yet figured out what you’re doing.”',
        'A weekly target turns “we’re making progress” into a yes or no answer every Sunday. A miss is information: it tells you which problem to bring to office hours. Graham’s point about office hours is that founders often arrive with a small problem and leave having found the bigger one behind it.',
        'Founders don’t all agree that a week is the right unit. Katia Damer of Prolific (S19) wrote that their customers took months to convert, so weekly experiments were not meaningful and pushed short-term thinking. If your sales cycle is long, set the weekly target on a leading number you control, such as qualified demos or pilots started, and check revenue monthly. Our lesson on the essay is at /paul-graham/startup-equals-growth.',
      ],
      steps: [
        'Take last week’s actual value and multiply by 1.05 and 1.07. That is your target range.',
        'Write the target where your cofounder sees it before Monday noon.',
        'Midweek, check your pace. If you are behind, ask which high-impact task moves the number fastest.',
        'On Sunday, write hit or miss. If you missed, name the single biggest blocker.',
        'Take that blocker to your own office hours: a mentor or two other founders, with one specific question.',
      ],
      example: {
        label: 'Illustrative: one week of the loop',
        text: 'Last week: 60 active clinics\nTarget: 63–64 (+5% to +7%)\nActual: 61 (+1.7%)\nBiggest blocker: 6 clinics went quiet when their free month ended\nFix for next week: call each clinic before day 25 of the free month and agree a paid start date',
      },
    },
  ],
  videos: [
    {
      youtubeId: 'XcCmMOWuAF4',
      title: 'Adora Cheung - How to Prioritize Your Time',
      channel: 'Y Combinator',
      minutes: 17,
      why: 'Cheung grades tasks live. Watch “Grading impact” and “Grading complexity”, then grade your own list.',
    },
  ],
  assignments: [
    {
      id: 'w7-target',
      text: 'Set this week’s target at 5–7% above last week’s value of your one number.',
      why: 'Graham calls 5–7% a week a good growth rate during YC.',
      done: 'Target written down before Monday noon, with last week’s value next to it.',
    },
    {
      id: 'w7-grade',
      text: 'Put every task in one list and grade each for impact and complexity.',
      why: 'Cheung’s grading turns a long to-do list into a short, ordered one.',
      done: 'A list where every task has an impact grade and a complexity grade, and a line under the ones you will do.',
    },
    {
      id: 'w7-cut',
      text: 'Cut one recurring distraction for the whole week and tell your cofounder which one.',
      why: 'Cheung’s fake progress, and YC’s pocket guide: avoid conferences unless they are the best way to get customers.',
      done: 'The distraction named in your update, with the hours it freed.',
    },
    {
      id: 'w7-journal',
      text: 'For three days, log what you did each hour, the impact you expected and the impact you got.',
      why: 'Cheung expects most founders to find more low-value hours than they thought.',
      done: 'Three days of hourly notes, with the low-value hours marked.',
    },
    {
      id: 'w7-goh',
      text: 'Run your own group office hours: 3–5 founders or friends building something, 5 minutes each on goal, result and biggest blocker.',
      why: 'YC runs group office hours every two weeks, and founders describe them as the place to share what has and hasn’t worked.',
      done: 'The session held, and one piece of advice you will act on this week written down.',
    },
  ],
  officeHours: [
    {
      q: 'What was your goal last week, and did you hit it?',
      why: 'Cheung puts this at the top of the weekly update, and Graham describes YC’s loop as trying fixes within a week and reporting back.',
    },
    {
      q: 'What is the one problem that most limits your growth right now?',
      why: 'Graham (2022): founders often come in with a small problem, and the conversation finds the bigger one behind it.',
    },
    {
      q: 'What did you spend time on this week that didn’t move the number?',
      why: 'Cheung’s real-versus-fake progress test.',
    },
    {
      q: 'If you could do only one thing next week, what would it be?',
      why: 'YC’s pocket guide: startups can only solve one problem well at any given time.',
    },
    {
      q: 'Is your goal ambitious enough?',
      why: 'Damer (Prolific, S19) reports group partner Jared Friedman pushing for a goal you can barely imagine working but is theoretically possible.',
    },
  ],
  weeklyUpdate: {
    metric: 'one number: target vs actual, growth %',
    prompt:
      'Week 7: last week’s value, this week’s target and actual, growth %, the tasks you finished with their impact grades, the distraction you cut, your biggest blocker and next week’s target.',
  },
  checkpoint:
    'A target 5–7% above last week, a graded task list, one distraction cut, and an update showing target against actual with your biggest blocker. Graham calls 5–7% a week good in “Startup = Growth” (2012); hitting it once matters less than knowing why you did or didn’t.',
  faqs: [
    {
      q: 'What happens at YC group office hours?',
      a: 'YC says partners run them every two weeks, with groups split into sections of 6 to 10 companies. Founders’ accounts, such as Nathan Leung’s from Spring 2026, describe each company sharing what has and hasn’t worked and getting advice from partners and peers. YC does not publish a fixed agenda.',
    },
    {
      q: 'Is there a formal mid-batch review at YC?',
      a: 'YC’s public pages don’t describe one. They describe group office hours every two weeks, one-on-one office hours on request and weekly events. If a site claims a specific mid-batch review, ask for its source.',
    },
    {
      q: 'What if my growth is about 1% a week?',
      a: 'Graham says 1% is a sign you haven’t yet figured out what you’re doing. Go back to week 6: check whether your cohorts flatten and who would be very disappointed, and spend next week on the product and on those users rather than on new channels.',
    },
  ],
  sources: [
    { label: 'Y Combinator: What Happens at YC', url: 'https://www.ycombinator.com/about' },
    { label: 'Paul Graham, Startup = Growth (2012)', url: 'https://paulgraham.com/growth.html' },
    {
      label: 'Paul Graham, What I’ve Learned from Users (2022)',
      url: 'https://paulgraham.com/users.html',
    },
    {
      label: 'YC blog: Startup School week 8 recap, Adora Cheung on prioritizing your time (2019)',
      url: 'https://www.ycombinator.com/blog/startup-school-week-8-recap-adora-cheung-on-prioritizing-your-time-and-kevin-hale-on-evaluating-startup-ideas/',
    },
    {
      label: 'YouTube: Adora Cheung - How to Prioritize Your Time',
      url: 'https://www.youtube.com/watch?v=XcCmMOWuAF4',
    },
    {
      label: 'Transcript: Adora Cheung, How to Prioritize Your Time (Rosetta)',
      url: 'https://rosetta.to/u/ycombinator/adora-cheung-how-to-prioritize-your-time',
    },
    {
      label: 'Y Combinator blog: YC’s Essential Startup Advice (Geoff Ralston, 2017)',
      url: 'https://www.ycombinator.com/blog/ycs-essential-startup-advice/',
    },
    {
      label: 'Nathan Leung (Harbor, S26): Notes on YC, halfway through Spring 2026',
      url: 'https://www.natecation.com/notes-on-yc-spring-2026/',
    },
    {
      label: 'Katia Damer (Prolific, S19): Reflecting on Y Combinator, 3 lessons',
      url: 'https://www.prolific.com/resources/reflecting-on-ycombinator-3-lessons',
    },
    {
      label: 'CNBC (via NBC New York): YC startups are fastest growing in fund history (Mar 2025)',
      url: 'https://www.nbcnewyork.com/news/business/money-report/y-combinator-startups-are-fastest-growing-most-profitable-in-fund-history-because-of-ai/6188199/',
    },
    {
      label: 'Snappr: What the Y Combinator experience actually looks like (W17)',
      url: 'https://www.snappr.com/blog/what-the-y-combinator-experience-actually-looks-like',
    },
    { label: 'Our lesson: Startup = Growth', url: '/paul-graham/startup-equals-growth' },
  ],
}
