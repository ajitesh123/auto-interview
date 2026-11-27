# Brief: lesson rail "In this lesson" + "Say it out loud" card (Part 1, Nov 27 2026)

**Pages:** every Learn AI lesson (45) and every Paul Graham lesson (17) — one shared template, `components/learnAi/LessonPage.tsx`. These are the pages that rank (Learn AI, PG/YC).

**Problem seen on the walk (1280):** lessons run 2,700–3,300 words and 6 steps, but the left rail only lists the other lessons in the track. A reader 3,000 px down has no map of the lesson they are in, no sense of how far they are, and the only mock-interview link is the pill under the short answer (scrolled away) and the closing section.

**What the reader can do after the change (lg+ only; the rail is hidden on phones):**

1. See every step of the current lesson plus "Try it" and "Check yourself" as a numbered list, jump to any of them, and see which one they are reading now (the dot fills Signal blue as they scroll; CSS transition, IntersectionObserver, no library).
2. See a thin progress line through the lesson ("Step 3 of 6").
3. One quiet, always-visible card: "Say it out loud" — explain this lesson to a voice interviewer — linking to /free-mock-interview through the existing voice-meter motion (mi-bar). Not a second blue pill: a text link with the meter, so the viewport keeps one primary button. Wispr Flow benchmark idea 3 (Nov 26: "designed to be forgotten").

**Rules:** tokens only; motion is CSS and off under reduced motion; no pop-up; nothing on phones; the rail scrolls inside itself if taller than the viewport, with the current-lesson map first and the track list after it. Steps get `id="step-N"` + `scroll-mt-24` so links land under the sticky nav. Server-rendered list; JS only adds the active state.

**Visuals list:** none new (a navigation aid, not a data page).

**Metric:** GA4 average engagement time on /learn-ai/_ and /paul-graham/_ lessons, and CTA clicks from lessons to /free-mock-interview (needs GA4). Check back Dec 11.
