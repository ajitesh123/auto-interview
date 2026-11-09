import type { PlanMonth } from './types'

// "If Paul Graham mentored you for six months." Every action is traced to the essay or YC page
// it comes from. Checkpoints use the tests PG and YC themselves use.
export const SIX_MONTH_PLAN: PlanMonth[] = [
  {
    month: 1,
    theme: 'Find the idea',
    goal: 'You have one idea that came from a real problem, and you can name at least ten people who have that problem and what they do about it today.',
    lessons: [
      'how-to-get-startup-ideas',
      'make-something-people-want',
      'mistakes-that-kill-startups',
    ],
    actions: [
      {
        id: 'm1-a1',
        text: 'Keep a problems log for two weeks: every time something is annoying, slow or missing in your work or life, write one line.',
        why: 'Graham says the way to get startup ideas is to look for problems, preferably your own, and that the right verb is "notice", not "think up".',
        source: {
          label: 'Paul Graham, How to Get Startup Ideas (2012)',
          url: 'https://paulgraham.com/startupideas.html',
        },
      },
      {
        id: 'm1-a2',
        text: 'Pick the three most promising problems and talk to ten people who have them. Ask how they deal with it now and what it costs them.',
        why: 'Michael Seibel lists "not knowing where your first users will come from" as a top first-time founder mistake. In the video he says it is odd to pick a problem when you don’t know anyone who has it, including yourself.',
        source: {
          label: 'Michael Seibel, The Biggest Mistakes First-Time Founders Make (YC, 2019)',
          url: 'https://www.ycombinator.com/blog/the-biggest-mistakes-first-time-founders-make/',
        },
      },
      {
        id: 'm1-a3',
        text: 'For each idea, write who wants it urgently. Prefer a small group who need it badly over a big group who would find it nice.',
        why: 'Graham says good ideas are usually narrow and deep, "like a well": intense demand from a small group first.',
        source: {
          label: 'Paul Graham, How to Get Startup Ideas (2012)',
          url: 'https://paulgraham.com/startupideas.html',
        },
      },
      {
        id: 'm1-a4',
        text: 'Ask of every idea: would I use this myself if I hadn’t built it?',
        why: 'When user growth is slow, Graham says the product is often the real problem, and asks founders: "Would you use this yourself, if you hadn’t built it?"',
        source: {
          label: 'Paul Graham, What I’ve Learned from Users (2022)',
          url: 'https://paulgraham.com/users.html',
        },
      },
      {
        id: 'm1-a5',
        text: 'Read the 18 mistakes and cross out any idea that is a marginal niche or a copy of something that exists.',
        why: '"Marginal Niche" and "Derivative Idea" are on Graham’s list of mistakes that kill startups, along with having no specific user in mind.',
        source: {
          label: 'Paul Graham, The 18 Mistakes That Kill Startups (2006)',
          url: 'https://paulgraham.com/startupmistakes.html',
        },
      },
    ],
    checkpoint:
      'Can you name a specific group of people who want this badly now, and have you heard it from them, not just imagined it? That is the "well-shaped" test from How to Get Startup Ideas (2012).',
  },
  {
    month: 2,
    theme: 'Build a first version and launch',
    goal: 'A first version is in the hands of real users outside your friends, and you are measuring what they do.',
    lessons: ['launch-and-talk-to-users', 'make-something-people-want'],
    actions: [
      {
        id: 'm2-a1',
        text: 'Write a one-page spec for a version you can build in weeks, then cut every feature your first ten users won’t miss.',
        why: 'Seibel’s MVP advice: time-box the spec, write it down, cut features hard, and aim for weeks, not months.',
        source: {
          label: 'Michael Seibel, How to Plan an MVP (YC, 2019)',
          url: 'https://www.youtube.com/watch?v=1hHMwLxN6EM',
        },
      },
      {
        id: 'm2-a2',
        text: 'Set a launch date three to six weeks out and launch on it, even if it embarrasses you.',
        why: '"Release early" is the first of Graham’s hardest lessons, and "Launch now" is the first line of YC’s pocket guide.',
        source: {
          label: 'Paul Graham, The Hardest Lessons for Startups to Learn (2006)',
          url: 'https://paulgraham.com/startuplessons.html',
        },
      },
      {
        id: 'm2-a3',
        text: 'Install basic analytics before launch: signups, weekly active users and the one action that shows a user got value.',
        why: 'Seibel names "not using analytics" as a first-time founder mistake: you need to know what is being used and what is not.',
        source: {
          label: 'Michael Seibel, The Biggest Mistakes First-Time Founders Make (YC, 2019)',
          url: 'https://www.ycombinator.com/blog/the-biggest-mistakes-first-time-founders-make/',
        },
      },
      {
        id: 'm2-a4',
        text: 'Sit with three users while they use the product. Say nothing; write down every place they hesitate.',
        why: 'Sam Altman: "Literally watch them use your product. Sit in their office if you can."',
        source: {
          label: 'Sam Altman, Startup Playbook (2015)',
          url: 'https://playbook.samaltman.com/',
        },
      },
      {
        id: 'm2-a5',
        text: 'Ship a small improvement every day or two after launch.',
        why: 'Graham: "You should make your system better at least in some small way every day or two."',
        source: {
          label: 'Paul Graham, The Hardest Lessons for Startups to Learn (2006)',
          url: 'https://paulgraham.com/startuplessons.html',
        },
      },
    ],
    checkpoint:
      'Can you write three things you learned from users that changed what you built? Graham calls "Explain what you’ve learned from users" the best per-word advice for getting into YC (What I’ve Learned from Users, 2022).',
  },
  {
    month: 3,
    theme: 'Do things that don’t scale, and grow every week',
    goal: 'You recruit users by hand, you track one growth number every week, and a small group of users would be upset if you shut down.',
    lessons: ['do-things-that-dont-scale', 'startup-equals-growth'],
    actions: [
      {
        id: 'm3-a1',
        text: 'Recruit users one at a time: write to 30 named people who have the problem and offer to set them up personally.',
        why: 'Graham calls recruiting users manually "the most common unscalable thing founders have to do at the start".',
        source: {
          label: 'Paul Graham, Do Things that Don’t Scale (2013)',
          url: 'https://paulgraham.com/ds.html',
        },
      },
      {
        id: 'm3-a2',
        text: 'When someone agrees to try it, set them up on the spot: on a call, on their laptop, right then.',
        why: 'This is the "Collison installation" Stripe’s founders used inside YC.',
        source: {
          label: 'Paul Graham, Do Things that Don’t Scale (2013)',
          url: 'https://paulgraham.com/ds.html',
        },
      },
      {
        id: 'm3-a3',
        text: 'Send every new user a personal thank-you, and reply to every message the same day.',
        why: 'Graham says to take extraordinary measures to make early users happy; Wufoo sent each new user a hand-written thank-you note.',
        source: {
          label: 'Paul Graham, Do Things that Don’t Scale (2013)',
          url: 'https://paulgraham.com/ds.html',
        },
      },
      {
        id: 'm3-a4',
        text: 'Choose one growth number (revenue, or active users if you don’t charge) and a weekly target. Check it every Monday.',
        why: 'YC measures growth per week during the batch. Graham says to pick a rate you think you can hit and try to hit it every week.',
        source: {
          label: 'Paul Graham, Startup = Growth (2012)',
          url: 'https://paulgraham.com/growth.html',
        },
      },
      {
        id: 'm3-a5',
        text: 'Each week, rank your three most important problems, try a fix within the week, and check the result the next week.',
        why: 'Graham says founders should try things "at a resolution of a week or less" and report results at the next office hours.',
        source: {
          label: 'Paul Graham, What I’ve Learned from Users (2022)',
          url: 'https://paulgraham.com/users.html',
        },
      },
    ],
    checkpoint:
      'Weekly growth of 5–7% is good, 10% is exceptional, and 1% means you haven’t figured out what you are doing yet (Startup = Growth, 2012). YC’s pocket guide adds the second test: 10–100 customers who love you.',
  },
  {
    month: 4,
    theme: 'Founder habits',
    goal: 'You protect long blocks of build time, you have a cofounder (or a serious search for one), and you keep shipping through setbacks.',
    lessons: [
      'what-makes-a-great-founder',
      'cofounders',
      'founder-mode',
      'how-to-do-great-work',
      'how-to-think-clearly',
    ],
    actions: [
      {
        id: 'm4-a1',
        text: 'Block at least two half-days a week with no meetings, and push calls to the end of the day.',
        why: 'Makers work in units of half a day, and "a single meeting can blow a whole afternoon". Graham held office hours at the end of his working day.',
        source: {
          label: 'Paul Graham, Maker’s Schedule, Manager’s Schedule (2009)',
          url: 'https://paulgraham.com/makersschedule.html',
        },
      },
      {
        id: 'm4-a2',
        text: 'If you are alone, look for a cofounder: create a profile on YC’s free co-founder matching and meet three people this month.',
        why: '"Single Founder" is the first of Graham’s 18 mistakes: "Starting a startup is too hard for one person." YC’s matching is free.',
        source: {
          label: 'Y Combinator: Co-founder matching',
          url: 'https://www.ycombinator.com/cofounder-matching',
        },
      },
      {
        id: 'm4-a3',
        text: 'Hold a weekly 30-minute cofounder check-in, and write down roles and equity while things are going well.',
        why: 'Seibel lists not having transparent conversations with your cofounder as a top mistake; YC’s pocket guide says founder relationships matter more than you think.',
        source: {
          label: 'Michael Seibel, The Biggest Mistakes First-Time Founders Make (YC, 2019)',
          url: 'https://www.ycombinator.com/blog/the-biggest-mistakes-first-time-founders-make/',
        },
      },
      {
        id: 'm4-a4',
        text: 'Keep a setbacks log: each time something goes wrong, write what you did next. Review it monthly.',
        why: 'Graham: "The most important quality in a startup founder is determination. Not intelligence-- determination."',
        source: {
          label: 'Paul Graham, The Hardest Lessons for Startups to Learn (2006)',
          url: 'https://paulgraham.com/startuplessons.html',
        },
      },
      {
        id: 'm4-a5',
        text: 'Protect sleep and exercise. Put them in your calendar like customer meetings.',
        why: 'The last line of YC’s pocket guide: "Get sleep and exercise – take care of yourself".',
        source: {
          label: 'Geoff Ralston, YC’s Essential Startup Advice (2017)',
          url: 'https://www.ycombinator.com/blog/ycs-essential-startup-advice',
        },
      },
    ],
    checkpoint:
      'Rate yourself, and ask your cofounder to rate you, on the five qualities in What We Look for in Founders (2010): determination, flexibility, imagination, naughtiness and friendship. Any score you can’t back with a real example is the one to work on.',
  },
  {
    month: 5,
    theme: 'Default alive and ready to raise',
    goal: 'You know in numbers whether you will reach profitability on the money you have, and you could raise money if you chose to.',
    lessons: ['default-alive-or-dead', 'how-to-raise-money'],
    actions: [
      {
        id: 'm5-a1',
        text: 'Work out if you are default alive: with expenses flat and revenue growing at its recent rate, do you reach profitability before the money runs out?',
        why: 'Graham says founders should know this early, and that asking too early is far less dangerous than asking too late.',
        source: {
          label: 'Paul Graham, Default Alive or Default Dead? (2015)',
          url: 'https://paulgraham.com/aord.html',
        },
      },
      {
        id: 'm5-a2',
        text: 'Cut costs until revenue could cover the founders’ basic living expenses. Aim for ramen profitable.',
        why: 'Ramen profitable means you are "no longer at the mercy of investors", so you can raise on better terms or not at all.',
        source: {
          label: 'Paul Graham, Ramen Profitable (2009)',
          url: 'https://paulgraham.com/ramenprofitable.html',
        },
      },
      {
        id: 'm5-a3',
        text: 'Freeze hiring until growth is real. Do the work yourselves for now.',
        why: 'Graham: "Hiring too fast is by far the biggest killer of startups that raise money."',
        source: {
          label: 'Paul Graham, Default Alive or Default Dead? (2015)',
          url: 'https://paulgraham.com/aord.html',
        },
      },
      {
        id: 'm5-a4',
        text: 'If you raise, list investors and talk to them in parallel, not one by one, and ask at every meeting what happens next.',
        why: 'Graham’s rules: breadth-first search weighted by expected value, and "never leave a meeting with an investor without asking what happens next".',
        source: {
          label: 'Paul Graham, How to Raise Money (2013)',
          url: 'https://paulgraham.com/fr.html',
        },
      },
      {
        id: 'm5-a5',
        text: 'Learn how a SAFE and the YC deal work, so you know what 7% plus an MFN SAFE would cost you.',
        why: 'YC’s standard deal is $500,000: $125,000 for a fixed 7% plus $375,000 on an uncapped MFN SAFE (as of November 2026).',
        source: { label: 'Y Combinator: The YC Deal', url: 'https://www.ycombinator.com/deal' },
      },
    ],
    checkpoint:
      'Can you answer "default alive or default dead?" in one sentence, with your burn, revenue growth and months of runway? Graham says the rest of the conversation depends on the answer (Default Alive or Default Dead?, 2015).',
  },
  {
    month: 6,
    theme: 'Apply to YC and write your Demo Day update',
    goal: 'Your YC application is submitted, you can handle a 10-minute interview, and you have a one-page update any investor could read.',
    lessons: [
      'what-happens-at-yc',
      'how-to-get-into-yc',
      'yc-founder-stories',
      'yc-essential-startup-advice',
    ],
    actions: [
      {
        id: 'm6-a1',
        text: 'Write the application. Make the first sentence of every answer say the point plainly, and cut every word that adds no fact.',
        why: 'Graham: "Whatever you have to say, give it to us right in the first sentence, in the simplest possible terms."',
        source: {
          label: 'Paul Graham, How to Apply to Y Combinator',
          url: 'https://www.ycombinator.com/howtoapply',
        },
      },
      {
        id: 'm6-a2',
        text: 'Record the founder video with all founders. Don’t skip it.',
        why: 'Graham says YC is much more likely to interview people who submit a video.',
        source: {
          label: 'Paul Graham, How to Apply to Y Combinator',
          url: 'https://www.ycombinator.com/howtoapply',
        },
      },
      {
        id: 'm6-a3',
        text: 'Do three 10-minute mock interviews. Know your users, growth, revenue, burn and retention without looking.',
        why: 'In this 2019 video Garry Tan, now YC’s president, says "The YC interview is only ten minutes" and lists the numbers to know: revenue, growth, burn, retention.',
        source: {
          label: 'Garry Tan, 3 Tips to Nail the Y Combinator Interview',
          url: 'https://www.youtube.com/watch?v=rfTgzA6iKZc',
        },
      },
      {
        id: 'm6-a4',
        text: 'Write a one-page Demo-Day-style update: what you make, who uses it, weekly growth, what you learned, what you need.',
        why: 'Demo Day is where each YC startup presents to investors and press; writing it now shows whether your story and numbers hold up.',
        source: {
          label: 'Y Combinator: What Happens at YC',
          url: 'https://www.ycombinator.com/about',
        },
      },
      {
        id: 'm6-a5',
        text: 'Submit before the on-time deadline on ycombinator.com/apply. If the answer is no, keep building and apply again next batch.',
        why: 'YC’s FAQ says that in a typical batch about half the companies applied multiple times before being accepted.',
        source: { label: 'Y Combinator: FAQ', url: 'https://www.ycombinator.com/faq' },
      },
    ],
    checkpoint:
      'Could a stranger repeat what you make after one sentence, and can you say what you have learned from users and your weekly growth rate? Those are the first things YC reads (How to Apply to Y Combinator; What I’ve Learned from Users, 2022).',
  },
]
