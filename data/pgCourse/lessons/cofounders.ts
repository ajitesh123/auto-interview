import type { PgLesson } from '../types'

export const lesson: PgLesson = {
  slug: 'cofounders',
  track: 'founder',
  order: 0,
  title: 'Cofounders',
  metaTitle: 'How to Find a Cofounder: Paul Graham and YC’s Advice',
  metaDescription:
    'How to find, test and keep a cofounder, from Paul Graham, Jessica Livingston and YC: why not go solo, building projects together, founder fights, equity splits.',
  h1: 'Cofounders: how to find, test and keep one, the Paul Graham way',
  tldr: 'Paul Graham calls going solo the first of the 18 mistakes that kill startups: the work is too much for one person. Pick someone you already know well, ideally from building something together, who shares your values. Raise doubts before you start, split equity close to equally with vesting, and fix fights fast: by 2006, about one in five of the startups YC had funded had lost a founder.',
  minutes: 13,
  level: 'Beginner',
  steps: [
    {
      heading: 'Why does PG say not to start alone?',
      body: [
        '"Single founder" is number one in "The 18 Mistakes That Kill Startups" (October 2006). His line: "Starting a startup is too hard for one person." Cofounders bring ideas, talk you out of bad decisions and pick you up on bad days. Going alone also sends a signal: PG calls it "a vote of no confidence", since it suggests the founder could not talk any friends into joining.',
        'In "Why to Not Not Start a Startup" (March 2007) he says that when YC funded two solo founders, it asked them to make finding a cofounder their first job, and both did. In 2023 he told Tyler Cowen he still would not start one alone because it is so much weight to carry. "How to Start a Startup" (March 2005) gives the range: two to four founders.',
      ],
      keyIdea: 'One founder carries everything. PG’s advice is two to four.',
    },
    {
      heading: 'Where do good cofounders come from?',
      body: [
        'From people you already know. In "A Student’s Guide to Startups" (October 2006) PG writes: "Co-founders really should be people you already know." College is the best place, because you see many smart people do the same tasks and everyone’s life is still flexible. The founders of Google, Yahoo and Microsoft met at school.',
        'In "How to Start a Startup" (2005) he says a couple of days as friends tells you more than any company learns in interviews. His tests are simple: is the person genuinely smart, do they get things done, and can you stand working with them. Jessica Livingston says the same in a YC clip (posted 2017) from her 2014 Female Founders Conference talk: start with someone you know well, ideally from working or studying together, not someone who is just available.',
      ],
      bullets: [
        'List 10 people you have worked with on something real: a project, hackathon, college fest, job.',
        'Mark who was smart, who finished things, and who you enjoyed working with. Only people with all three stay on the list.',
        'If you are out of college, PG suggests staying in touch with the best people from it, or joining a company full of smart young people.',
      ],
    },
    {
      heading: 'How do you test a cofounder before committing?',
      body: [
        'Build something together first. In "How to Start Google" (March 2024) PG says it in one line: "You find cofounders by working on projects with them." In "Why to Not Not Start a Startup" he warns that meeting people at events can work, but you need to work with someone before you know if you want them as a cofounder. To Tyler Cowen he put it as: "You just can’t get co-founders instantly."',
        'If no one around you wants to start a company, PG’s 2007 advice is to go where people do, or to switch to an idea people want to work on. YC also runs a free Co-Founder Matching platform. YC takes no equity. When checked in November 2026 the page claimed over 100,000 matches and listed about 1,900 active profiles in Bangalore, next to 3,200 in San Francisco, 3,000 in New York and 2,900 in London.',
      ],
      example: {
        label: 'A cofounder trial, built on PG’s "work on projects together" advice',
        text: 'Weeks 1–2: Talk to 10 possible users together. Write up what you each heard.\nWeeks 3–4: Build the smallest version together and get it to 5 users.\nCheck: Who did what? How did you settle your first disagreement? Would you do 5 more years of this?',
      },
    },
    {
      heading: 'What should you look for in a cofounder?',
      body: [
        'Shared values, different skills. Jessica Livingston’s 2018 advice is to find a cofounder with "complementary skills but the same moral compass as you." She and PG agreed on the big questions and deferred to each other on the small ones. In "Startups in 13 Sentences" (February 2009), "Pick good cofounders" is first, because changing cofounders is much harder than changing your idea.',
        'In a 2018 YC conversation, PG said trust is the thing to look for, and that trustworthiness is harder to judge than intelligence. Find someone you trust, then ask them who they trust. In a tech startup, he adds in the 2005 essay, the founders should include technical people.',
      ],
      bullets: [
        'Do not pick someone you dislike because they have a skill you need. PG lists this as a mistake.',
        'Do not add a friend or housemate just so they do not feel left out.',
        'Ask about money, risk and time openly. If you disagree on a big question now, it gets worse later.',
      ],
    },
    {
      heading: 'How do you stop founder fights from killing the company?',
      body: [
        '"Fights between founders" is mistake 17 in the 2006 essay. PG writes: "About 20% of the startups we’ve funded have had a founder leave." Most of the fights he saw came from the people, not the situation, and most could have been avoided by choosing better. His advice is blunt: "Don’t suppress misgivings." Problems are easier to fix before the company starts.',
        'Jessica Livingston says in her 2017 video that red flags about trust, work ethic or skill rarely go away on their own, so deal with them right away. In the 2005 essay PG notes that with two or three founders you must settle disputes fast or die.',
      ],
      keyIdea: 'If you have a doubt about a cofounder, say it before you incorporate, not after.',
    },
    {
      heading: 'How should cofounders split equity?',
      body: [
        'PG’s 2005 rule of thumb: the split is probably fair when every founder feels they are doing slightly more than their share. It is hard to change later, so "try hard to do it right." He also says all founders should sign an agreement that their ideas belong to the company, and should check what their old employers own.',
        'YC’s more specific advice comes from Michael Seibel (December 2015): split equally or close to it. "If you aren’t willing to give your partner an equal share, then perhaps you are choosing the wrong partner." Use four-year vesting with a one-year cliff, so a cofounder who leaves in year one leaves with nothing and a bad match does not wreck the company.',
      ],
      example: {
        label: 'Seibel’s vesting setup',
        text: 'Two founders, 50 / 50.\nYear 1: nothing vests (the cliff). Leave before 12 months, leave with 0.\nAt month 12: 25% vests.\nMonths 13–48: the rest vests monthly.',
      },
    },
  ],
  keyTerms: [
    {
      term: 'Single founder',
      meaning: 'Starting alone. Number one in PG’s list of mistakes that kill startups.',
    },
    {
      term: 'Cofounder trial',
      meaning:
        'Working on a real project with someone before committing, which is how PG says you actually learn if you can be cofounders.',
    },
    {
      term: 'Vesting',
      meaning:
        'Founders earn their shares over time (often four years) instead of owning them all on day one.',
    },
    {
      term: 'Cliff',
      meaning:
        'A first period, often one year, before any shares vest. Leave before it ends and you get none.',
    },
    {
      term: 'Same moral compass',
      meaning:
        'Jessica Livingston’s phrase for shared values: different skills are fine, different ethics are not.',
    },
  ],
  videos: [
    {
      youtubeId: 'ax24RdYqM54',
      title: 'Jessica Livingston on Cofounder Disputes and Making Something People Want',
      channel: 'Y Combinator',
      minutes: 4,
      why: 'Four minutes on why cofounder breakups hurt startups and why to pick someone you know well. Watch the first minute twice.',
    },
    {
      youtubeId: 'DISocTmEwiI',
      title: 'Co-Founder Equity Mistakes to Avoid | Startup School',
      channel: 'Y Combinator',
      minutes: 20,
      why: 'Michael Seibel on equal splits, vesting and cliffs, and common mistakes like extra equity for having the idea.',
    },
  ],
  tryIt: {
    title: 'Make your cofounder shortlist and plan one trial project',
    steps: [
      'Write down 10 people you have done real work with: classmates, colleagues, hackathon teammates.',
      'For each, answer PG’s three questions from 2005: genuinely smart? gets things done? would I enjoy working with them? Cross out anyone with a no.',
      'Pick the top two. Write one small project you could do together in two weeks, such as interviewing 10 users about a problem you both have.',
      'Write your three biggest misgivings about each person. PG says not to suppress them, so decide how you will raise each one.',
      'If your list is empty, create a profile on YC Co-Founder Matching and start a project with your first match before talking equity.',
    ],
    link: {
      label: 'YC Co-Founder Matching (free)',
      url: 'https://www.ycombinator.com/cofounder-matching',
    },
  },
  check: [
    {
      q: 'You met a strong engineer at a meetup last week. They want to start a company with you tomorrow. What would PG suggest?',
      options: [
        'Incorporate now so you move fast',
        'Work on a real project together first, since you only learn by working with someone',
        'Hire them as an employee instead',
        'Go solo, since cofounders cause fights',
      ],
      answer: 1,
      why: 'PG says you find cofounders by working on projects with them, and that you can’t get cofounders instantly.',
    },
    {
      q: 'Your cofounder misses deadlines and you feel uneasy, but you are about to incorporate. What does PG’s "18 Mistakes" essay advise?',
      options: [
        'Stay quiet to keep the peace',
        'Wait until after funding to raise it',
        'Raise it now: "Don’t suppress misgivings", because problems are easier to fix before the company starts',
        'Give them less equity without telling them',
      ],
      answer: 2,
      why: 'PG says most founder disputes could have been avoided and that it is much easier to fix problems before starting than after.',
    },
    {
      q: 'You had the idea; your cofounder will build the product full time. Following Michael Seibel’s YC advice, what split makes sense?',
      options: [
        '80 / 20 in your favour for having the idea',
        'Equal or close to equal, with four-year vesting and a one-year cliff',
        'Whatever the cofounder accepts today',
        'No equity for the cofounder until revenue',
      ],
      answer: 1,
      why: 'Seibel argues execution matters more than the idea and recommends equal splits with vesting, so a bad fit can be undone early.',
    },
  ],
  fromTheSource: [
    {
      who: 'Paul Graham',
      role: 'Cofounder of Y Combinator. Started Viaweb with Robert Morris and Trevor Blackwell.',
      work: 'The 18 Mistakes That Kill Startups (essay, October 2006)',
      url: 'https://paulgraham.com/startupmistakes.html',
      idea: 'The first mistake on PG’s list is starting with one founder, and one of the last is fights between founders. Both come down to choosing people well.',
      breakdown: [
        'A startup is too hard for one person, and a solo founder is "a vote of no confidence": the friends who know him best did not join.',
        'About 20% of YC startups he had funded had a founder leave.',
        'Most disputes come from the people, not the situation, and could have been avoided with better choices.',
        'Do not choose someone you dislike because of a skill, and do not add someone out of politeness.',
      ],
      use: 'Before you commit, write down every doubt you have about your cofounder and talk through each one. PG’s rule is not to suppress misgivings.',
    },
    {
      who: 'Jessica Livingston',
      role: 'Cofounder of Y Combinator, where she counselled many founders through cofounder disputes. Author of Founders at Work.',
      work: 'Jessica Livingston on Cofounder Disputes (YC clip of her 2014 talk, posted 2017) and her 9 lessons talk (2018)',
      url: 'https://www.youtube.com/watch?v=ax24RdYqM54',
      idea: 'Founder breakups devastate startups, so start only with someone you know very well and share values with, and deal with red flags immediately.',
      breakdown: [
        'Pick someone you know closely, ideally from working or studying together, not whoever is available.',
        'Complementary skills, same moral compass.',
        'Red flags about trust, work ethic or competence rarely fix themselves.',
        'In a two-person team, losing one founder leaves one person with everything.',
      ],
      use: 'Use her two filters on your shortlist: do our skills differ, and do our values match? Anyone who fails the second one is out.',
    },
  ],
  sources: [
    {
      label: 'Paul Graham: The 18 Mistakes That Kill Startups (October 2006)',
      url: 'https://paulgraham.com/startupmistakes.html',
    },
    {
      label: 'Paul Graham: How to Start a Startup (March 2005)',
      url: 'https://paulgraham.com/start.html',
    },
    {
      label: 'Paul Graham: A Student’s Guide to Startups (October 2006)',
      url: 'https://paulgraham.com/mit.html',
    },
    {
      label: 'Paul Graham: Why to Not Not Start a Startup (March 2007)',
      url: 'https://paulgraham.com/notnot.html',
    },
    {
      label: 'Paul Graham: Startups in 13 Sentences (February 2009)',
      url: 'https://paulgraham.com/13sentences.html',
    },
    {
      label: 'Paul Graham: How to Start Google (March 2024)',
      url: 'https://paulgraham.com/google.html',
    },
    {
      label: 'Paul Graham: How Universities Should Prepare Founders (August 2026)',
      url: 'https://paulgraham.com/prepare.html',
    },
    {
      label: 'Paul Graham: What We Look for in Founders (October 2010)',
      url: 'https://paulgraham.com/founders.html',
    },
    {
      label:
        'Conversations with Tyler: Paul Graham on Ambition, Art, and Evaluating Talent (August 2023)',
      url: 'https://conversationswithtyler.com/episodes/paul-graham/',
    },
    {
      label: 'Y Combinator: A Conversation with Paul Graham, moderated by Geoff Ralston (2018)',
      url: 'https://www.youtube.com/watch?v=4WO5kJChg3w',
    },
    {
      label: 'Y Combinator: Jessica Livingston Shares 9 Things She Learned From Founding YC (2018)',
      url: 'https://www.ycombinator.com/blog/jessica-livingston-shares-9-things-she-learned-from-founding-yc/',
    },
    {
      label: 'Y Combinator: Jessica Livingston on Cofounder Disputes (2017)',
      url: 'https://www.youtube.com/watch?v=ax24RdYqM54',
    },
    {
      label: 'Michael Seibel, Y Combinator: How to Split Equity Among Co-Founders (December 2015)',
      url: 'https://www.ycombinator.com/blog/splitting-equity-among-founders',
    },
    {
      label: 'Y Combinator: Co-Founder Matching',
      url: 'https://www.ycombinator.com/cofounder-matching',
    },
  ],
  faqs: [
    {
      q: 'Does Paul Graham think you can start a startup without a cofounder?',
      a: 'He calls being a single founder the first of the 18 mistakes that kill startups, because the work is too much for one person. He does not say it is impossible, but when YC funded solo founders it asked them to find a cofounder first.',
    },
    {
      q: 'How do you find a cofounder if you are not in college?',
      a: 'PG suggests staying in touch with the best people you knew at college, joining a company full of smart young people, or moving to a startup hub. Then work on projects with people before committing. YC’s free Co-Founder Matching platform is another route.',
    },
    {
      q: 'How should cofounders split equity?',
      a: 'YC’s Michael Seibel recommends equal or near-equal splits with four-year vesting and a one-year cliff. Paul Graham’s older rule of thumb is that a split is fair when each founder feels they contribute slightly more than their share.',
    },
  ],
  related: [
    { label: 'What makes a great founder', href: '/paul-graham/what-makes-a-great-founder' },
    { label: 'Next: Founder mode', href: '/paul-graham/founder-mode' },
    { label: 'The mistakes that kill startups', href: '/paul-graham/mistakes-that-kill-startups' },
    { label: 'How to get into YC', href: '/paul-graham/how-to-get-into-yc' },
    { label: 'All Paul Graham lessons', href: '/paul-graham' },
    { label: 'Founder’s office roles', href: '/founders-office' },
  ],
}
