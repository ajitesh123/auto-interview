import type { BatchWeek } from '../types'

export const week: BatchWeek = {
  week: 1,
  slug: 'week-1',
  phase: 1,
  title: 'Kickoff and your one number',
  metaTitle: 'YC Week 1: Kickoff, KPIs and Your First Weekly Update',
  metaDescription:
    'What happens in week 1 of a YC batch: the 3-day kickoff, group partners and one number to grow. Pick your primary metric, set a 12-week goal and send update #1.',
  h1: 'Week 1: kickoff, your one number and your first weekly update',
  tldr: 'A YC batch opens with a 3-day, in-person kickoff where founders meet their batchmates and the group partners they will work with for three months. From then on, progress is judged one week at a time. This week you choose the one number you will grow, set a goal for week 12, and send your first weekly update to people who will hold you to it.',
  minutes: 40,
  atYc: {
    body: [
      'YC’s own pages describe the start of the batch: a 3-day, in-person kickoff in the first few weeks, where founders meet each other, their group partners and the YC team. The FAQ calls it a "3-day, in-person retreat". Startups are sorted into 3 groups led by partners, and each group is split into sections of 6 to 10 companies. Group office hours happen every two weeks, and founders can book one-on-one office hours with partners as often as they want. YC says all the recommended activities take "a few hours per week". The rest of the week is building and selling.',
      'Paul Graham explains what the week is measured against: "During Y Combinator we measure growth rate per week." YC usually advises founders to pick a growth rate they think they can hit and try to hit it every week. YC’s public pages do not describe a weekly update form for the core batch. In its free Startup School, YC asks founders to submit weekly updates tracking their goals and most important metrics, and calls consistent weekly progress "a prerequisite for success".',
      'Founders fill in the detail. Aditya Jayaprakash of Blacksmith (W24) wrote that his batch had four groups of 50 to 60 companies, each with two group partners and two visiting partners and split into sections of 10 by product area, and that group office hours included progress updates: "No one wanted to show up to their next office hours without new updates to share." Rafael Garcia of Kernel (S25) counted 187 companies in three groups, 59 in his. Nathan Leung of Harbor (Spring 2026) says Brian Chesky spoke at kickoff and that his subgroup had 9 healthcare companies.',
      'YC does not publish a day-by-day calendar for week 1, and founders’ accounts differ by batch. John Lafleur, cofounder of Dataline (later Airbyte), wrote that his team was too early to set a revenue goal, so they set one goal per month instead. Their first: 50 customer meetings in four weeks.',
    ],
    confidence: 'documented',
    sources: [
      { label: 'Y Combinator: What Happens at YC', url: 'https://www.ycombinator.com/about' },
      { label: 'Y Combinator: FAQ', url: 'https://www.ycombinator.com/faq' },
      { label: 'Paul Graham, Startup = Growth (2012)', url: 'https://paulgraham.com/growth.html' },
      {
        label: 'Kyle Corbitt, Startup School Relaunching as Continuous Program (YC blog, 2020)',
        url: 'https://www.ycombinator.com/blog/startup-school-relaunch/',
      },
      {
        label: 'Aditya Jayaprakash (Blacksmith, YC W24), What it was like going through YC W24',
        url: 'https://blacksmith.sh/blog/going-through-yc-winter-24',
      },
      {
        label: 'Rafael Garcia (Kernel, YC S25), YC, Take Two (2025)',
        url: 'https://www.raf.xyz/blog/01-yc-take-two',
      },
      {
        label: 'Nathan H. Leung (Harbor, YC Spring 2026), Halfway Through Spring 2026',
        url: 'https://www.natecation.com/notes-on-yc-spring-2026/',
      },
      {
        label: 'John Lafleur (Dataline), How We Pivoted 3 Times in the 1st Month of YC (2020)',
        url: 'https://hackernoon.com/how-we-pivoted-3-times-in-the-1st-month-of-yc-u29s3ytl',
      },
    ],
  },
  challenge: {
    name: 'The one-number challenge',
    task: 'By Sunday, write a precise definition of your primary metric, record today’s value, set a goal for the end of week 12 and the weekly rate it needs, and send weekly update #1 to at least two people.',
    proof:
      'A sent update (email, WhatsApp or Slack) that shows the metric’s one-line definition, today’s value, the week 12 goal and next week’s target.',
    basis:
      'Paul Graham’s "Startup = Growth" (YC measures growth per week), Adora Cheung’s YC talk "How to Set KPIs and Goals", and the weekly updates YC asks for in Startup School.',
  },
  frameworks: [
    {
      name: 'Choose one primary metric and set a goal for it',
      who: 'Adora Cheung, YC partner (Startup School 2019); Paul Graham, Startup = Growth (2012)',
      source: {
        label: 'Adora Cheung - How to Set KPIs and Goals (Y Combinator)',
        url: 'https://www.youtube.com/watch?v=lL6GdUHIBsM',
      },
      explain: [
        'Cheung defines the primary metric as the one number you would be willing to bet the whole company on. By definition there is only one. It should measure value people actually got, recurring over time, that has already happened. Email sign-ups fail that test because they measure interest, not value.',
        'Her first rule is that revenue is always the best metric, with recurring revenue the strongest test. Active users is the exception, for products that will make money from ads at huge scale or marketplaces that must grow both sides first. If you use active users, define "active" exactly, so you can’t fool yourself. A marketplace should pick a number that captures value to both sides; her examples are nights booked for Airbnb and weekly trips for Uber.',
        'Next to the primary metric, keep three to five secondary metrics, nearer three than five, so one number doesn’t hide a problem. Retention is the usual one to add: growth at the top can hide users leaving at the bottom.',
        'Then set a goal as a weekly growth rate. Graham calls 5–7% a week good during YC, 10% exceptional, and 1% a sign you haven’t yet figured out what you are doing. If you are starting near zero, Cheung suggests a second method: time-box an absolute goal, such as a number by the end of the program, and work backward to the weekly rate. Draw the forward-looking chart and put it where you will see it every day.',
      ],
      steps: [
        'Write your metric as one sentence someone else could compute from your data. Use revenue if anyone pays. If not, write "active" precisely, for example "teachers who sent at least one fee reminder this week".',
        'Record today’s value, even if it is zero.',
        'Pick three secondary metrics. Make one of them retention, such as the share of last week’s active users who came back this week.',
        'Choose a week 12 goal. Divide the goal by today’s value and take the 12th root to get the weekly rate it needs. Our check, using Graham’s benchmarks: if that is under 5%, raise the goal; if it is far above 10%, ask whether you believe it.',
        'If you are at zero, set an absolute goal for week 12 (Cheung’s time-boxed method). Our addition: until launch, set weekly targets for the steps that come first, such as conversations held or a ship date.',
        'Draw the 12-week target line and put it on the wall or your phone’s lock screen. Cheung’s talk suggests the desk, the bathroom mirror or the fridge.',
        'Each week, rank your ideas for hitting next week’s target by expected effect and start at the top.',
      ],
      example: {
        label: 'Illustrative: a 12-week goal worked backward',
        text: 'Metric: monthly recurring revenue (MRR)\nToday: ₹40,000\nWeek 12 goal: ₹1,00,000 (2.5x)\nWeekly rate needed: 2.5^(1/12) ≈ 1.079, so about 7.9% a week\n\nWeek 1 target: ₹43,200\nWeek 4 target: ₹54,300\nWeek 8 target: ₹73,700\nWeek 12 target: ₹1,00,000\n\nPre-launch version: metric = weekly active teachers. Today 0. Week 12 goal: 40. Until launch, the weekly target is conversations held (week 2) and a ship date (week 3).',
      },
    },
    {
      name: 'The weekly update',
      who: 'YC Startup School weekly updates; Paul Graham and Adora Cheung on weekly goals',
      source: {
        label: 'Kyle Corbitt, Startup School Relaunching as Continuous Program (YC blog)',
        url: 'https://www.ycombinator.com/blog/startup-school-relaunch/',
      },
      explain: [
        'YC’s Startup School asks founders to "submit weekly company updates tracking their goals and most important metrics", and says the updates push founders to talk to users and launch quickly. To earn its certificate, founders had to keep an 8-week streak. Artem Bugara, a founder who went through Startup School, wrote in 2020 that the form first asks whether you have launched, then how many users you talked to last week.',
        'Inside the batch, founders describe a similar pressure at group office hours, where each company shares its progress with the group. Our view: the value of an update is less the report than the habit. Writing the number down every week, for people who will read it, makes it hard to drift.',
        'Cheung adds the rule that keeps updates honest: missing your goal one or even two weeks in a row is fine, as long as you understand why. If you don’t know why, her answer is to talk to more users.',
        'The five-line format below is ours. It covers the two questions Bugara reports the Startup School form asks first (launched yet, and users talked to) and the goal-and-obstacle questions from Cheung’s talk.',
      ],
      steps: [
        'Pick your readers: a cofounder, two or three founder friends, or a mentor. These are your batchmates for 12 weeks.',
        'Fix a day and time, such as Sunday 8 pm, and send every week, even when the number is bad.',
        'Line 1: your primary metric this week, last week and the target, with the growth rate.',
        'Line 2: launched yet (yes or no) and how many users you talked to.',
        'Line 3: what you shipped or did that moved the number.',
        'Line 4: the biggest obstacle, and if you missed the target, why.',
        'Line 5: next week’s target and one specific ask.',
      ],
      example: {
        label: 'Illustrative: weekly update #1',
        text: 'Subject: FeeKit weekly update #1\n\nMetric: weekly active teachers (sent 1+ fee reminder this week). Today: 0. Week 12 goal: 40.\nLaunched: no. Users talked to: 3.\nDid: wrote the metric definition; listed 30 tuition teachers in Pune to call.\nBiggest obstacle: we don’t yet know whether fee reminders are the real pain or scheduling is.\nNext week: 10 conversations. Ask: intros to tuition teachers or coaching centre owners.',
      },
    },
  ],
  videos: [
    {
      youtubeId: 'lL6GdUHIBsM',
      title: 'Adora Cheung - How to Set KPIs and Goals',
      channel: 'Y Combinator',
      minutes: 24,
      why: 'The source for this week’s framework. Note her tests for a good primary metric and the method for working backward from a goal.',
    },
    {
      youtubeId: 'EiRnSjcVIqk',
      title: 'Inside The Most Powerful Startup Community In The World',
      channel: 'Y Combinator',
      minutes: 6,
      why: 'YC’s own short tour of the batch and Bookface. Watch it as YC’s pitch, and note what founders say they get from each other.',
    },
  ],
  assignments: [
    {
      id: 'w1-metric',
      text: 'Write a one-sentence definition of your primary metric and record today’s value.',
      why: 'Cheung’s test: the one number you would bet the company on, measuring value already delivered.',
      done: 'A definition another person could compute from your data, plus today’s number (zero counts).',
    },
    {
      id: 'w1-secondary',
      text: 'Choose three secondary metrics, including one for retention.',
      why: 'Cheung says no single number tells the whole story; retention shows whether growth is leaking.',
      done: 'Three named metrics with how you will measure each.',
    },
    {
      id: 'w1-goal',
      text: 'Set a week 12 goal, work out the weekly rate it needs and draw the target line.',
      why: 'Graham’s benchmark is 5–7% a week; Cheung says to put the forward-looking chart where you see it daily.',
      done: 'A goal, a weekly rate and a 12-point chart saved where you will see it every day.',
    },
    {
      id: 'w1-batch',
      text: 'Pick two to five people as your batch and book a 30-minute call with them every two weeks.',
      why: 'YC holds group office hours every two weeks, where founders share progress with peers.',
      done: 'Names agreed and the first fortnightly call in the calendar.',
    },
    {
      id: 'w1-update',
      text: 'Send weekly update #1 using the five-line format.',
      why: 'YC asks Startup School founders for weekly updates on goals and key metrics.',
      done: 'Update sent to at least two people, with your number, goal and one ask.',
    },
  ],
  officeHours: [
    {
      q: 'What exactly is your primary metric, and what is it today?',
      why: 'Cheung’s talk starts here: one number, precisely defined. A vague "users" lets you fool yourself.',
    },
    {
      q: 'Why that metric and not revenue?',
      why: 'Cheung says revenue is always the best metric and most companies should use it; you need a reason to pick something else.',
    },
    {
      q: 'What is your goal for the end of the batch, and what weekly rate does it take?',
      why: 'Cheung’s method of time-boxing an absolute goal and working backward to a weekly rate.',
    },
    {
      q: 'If you grow 1% a week, what would that tell you?',
      why: 'Graham writes in "Startup = Growth" that 1% a week is a sign you haven’t yet figured out what you are doing.',
    },
    {
      q: 'What is the single biggest thing stopping you from hitting next week’s number?',
      why: 'Cheung suggests stack-ranking ideas by expected effect each week; Graham calls the growth target a compass for decisions.',
    },
  ],
  weeklyUpdate: {
    metric: 'your one number',
    prompt:
      'Update #1: define your metric in one sentence, give today’s value, your week 12 goal and the weekly rate it needs, whether you have launched, how many users you talked to, your biggest obstacle and one ask.',
  },
  checkpoint:
    'Before week 2: one primary metric defined so someone else could compute it, today’s value written down, a week 12 goal with its weekly rate, and update #1 sent to at least two people. This follows the weekly measurement Paul Graham describes in "Startup = Growth" and the goal-setting method in Adora Cheung’s "How to Set KPIs and Goals".',
  faqs: [
    {
      q: 'What happens in the first week of YC?',
      a: 'YC describes a 3-day, in-person kickoff early in the batch where founders meet batchmates, group partners and the YC team. Startups are split into 3 groups and sections of 6 to 10 companies. YC does not publish a day-by-day schedule, and founders’ accounts vary by batch. See /paul-graham/what-happens-at-yc for the full picture.',
    },
    {
      q: 'Do YC founders send weekly updates?',
      a: 'Paul Graham writes that YC measures growth per week, and YC’s Startup School asks founders for weekly updates on goals and key metrics. YC’s public pages don’t describe the exact update form used in the core batch. Founders report that group office hours, every two weeks, include each company’s progress update.',
    },
    {
      q: 'What KPI should an early-stage startup track?',
      a: 'Adora Cheung’s YC talk says revenue if anyone pays, and precisely defined active users if not, plus three to five secondary metrics including retention. Graham calls 5–7% weekly growth good. More in /paul-graham/startup-equals-growth.',
    },
  ],
  sources: [
    { label: 'Y Combinator: What Happens at YC', url: 'https://www.ycombinator.com/about' },
    { label: 'Y Combinator: FAQ', url: 'https://www.ycombinator.com/faq' },
    { label: 'Paul Graham, Startup = Growth (2012)', url: 'https://paulgraham.com/growth.html' },
    {
      label: 'Adora Cheung - How to Set KPIs and Goals (Y Combinator, 2019)',
      url: 'https://www.youtube.com/watch?v=lL6GdUHIBsM',
    },
    {
      label: 'Transcript: Adora Cheung - How to Set KPIs and Goals (rosetta.to)',
      url: 'https://rosetta.to/u/ycombinator/adora-cheung-how-to-set-kpis-and-goals',
    },
    {
      label: 'Kyle Corbitt, Startup School Relaunching as Continuous Program (YC blog, June 2020)',
      url: 'https://www.ycombinator.com/blog/startup-school-relaunch/',
    },
    {
      label: 'Kevin Hale, Announcing Startup School 2019 (YC blog)',
      url: 'https://www.ycombinator.com/blog/announcing-startup-school-2019',
    },
    {
      label: 'Artem Bugara, One simple yet crucial thing I learned from YC’s Startup School (2020)',
      url: 'https://codarium.substack.com/p/one-simple-yet-crucial-thing-i-learned',
    },
    {
      label: 'Aditya Jayaprakash (Blacksmith, YC W24), What it was like going through YC W24',
      url: 'https://blacksmith.sh/blog/going-through-yc-winter-24',
    },
    {
      label: 'Rafael Garcia (Kernel, YC S25), YC, Take Two (2025)',
      url: 'https://www.raf.xyz/blog/01-yc-take-two',
    },
    {
      label: 'Nathan H. Leung (Harbor, YC Spring 2026), Halfway Through Spring 2026',
      url: 'https://www.natecation.com/notes-on-yc-spring-2026/',
    },
    {
      label: 'John Lafleur (Dataline), How We Pivoted 3 Times in the 1st Month of YC (2020)',
      url: 'https://hackernoon.com/how-we-pivoted-3-times-in-the-1st-month-of-yc-u29s3ytl',
    },
    {
      label: 'Y Combinator (YouTube), Inside The Most Powerful Startup Community In The World',
      url: 'https://www.youtube.com/watch?v=EiRnSjcVIqk',
    },
  ],
}
