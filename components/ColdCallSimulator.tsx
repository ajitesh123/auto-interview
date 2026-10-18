'use client'

import React, { useState, useEffect, useRef } from 'react'

interface ObjectionScenario {
  id: string
  title: string
  buyerPersona: string
  difficulty: 'Moderate' | 'Hard' | 'Extreme'
  prompt: string
  context: string
  benchmarkResponse: string
  frameworkTip: string
  keywordsToInclude: string[]
  fillerWordsToAvoid: string[]
}

const SCENARIOS: ObjectionScenario[] = [
  {
    id: 'competitor-lock',
    title: 'Competitor Lock-In',
    buyerPersona: 'VP of Engineering / Sales Leader',
    difficulty: 'Hard',
    prompt:
      '"Look, we signed an annual enterprise contract with [Competitor] six months ago and we\'re completely happy with them. There\'s no reason for us to switch."',
    context:
      'The prospect feels committed and fears the switching cost of new software. They want to shut down the call immediately.',
    benchmarkResponse:
      '"Totally respect that, Sarah—[Competitor] is a solid platform, and most teams we work with were actually using them before talking to us. We\'re definitely not asking you to rip and replace anything today. The main reason VP of Sales talk to us halfway through their contract is to benchmark turn-taking latency and pricing before renewal season. Out of curiosity, when you look at your team\'s call connect rates, are reps experiencing any awkward audio pauses or lag?"',
    frameworkTip:
      'A.D.D. Framework: Acknowledge & Validate vendor choice -> Deflect away from rip-and-replace -> Differentiate on specific workflow friction.',
    keywordsToInclude: [
      'respect',
      'rip and replace',
      'benchmark',
      'renewal',
      'latency',
      'connect rate',
    ],
    fillerWordsToAvoid: [
      'um',
      'uh',
      'honestly',
      'cheap',
      'better than them',
      'sorry to bother you',
    ],
  },
  {
    id: 'brush-off-email',
    title: 'The "Send Me An Email" Brush-Off',
    buyerPersona: 'Head of Operations / Director',
    difficulty: 'Moderate',
    prompt:
      '"I\'m in between back-to-back meetings right now. Just email me your deck and one-pager, and I\'ll take a look when I get a chance."',
    context:
      'A polite brush-off designed to get off the phone. 92% of unsolicited sales decks sent after this objection are never opened.',
    benchmarkResponse:
      '"I\'d be happy to shoot over our 1-pager, John. But to make sure I don\'t clutter your inbox with irrelevant slides—we have separate playbooks for outbound SDR ramp and inbound qualification. Which of those two is higher priority for your revenue team this quarter?"',
    frameworkTip:
      'Agree to the request, then immediately ask a qualifying binary question to earn conversational permission.',
    keywordsToInclude: ['happy to', 'clutter', 'irrelevant', 'priority', 'quarter', 'specific'],
    fillerWordsToAvoid: ['just checking in', 'touching base', 'can i have 15 minutes', 'please'],
  },
  {
    id: 'budget-freeze',
    title: 'Quarterly Budget Freeze',
    buyerPersona: 'Chief Financial Officer / RevOps Lead',
    difficulty: 'Hard',
    prompt:
      '"We\'re on a complete hiring and software budget freeze until Q4. We literally have zero dollars allocated for new tools right now."',
    context:
      'The prospect is using macro-economic budget constraints as a defensive shield before discovering the ROI proposition.',
    benchmarkResponse:
      "\"Completely understand, Mark—with macroeconomic headwinds right now, virtually every CFO has strict budget caps in place. That's actually why we reached out: our customers aren't taking on new CapEx budget—they're consolidating 3 separate telephony and coaching tools into one, saving $38k in operating costs within 60 days. If we could show you a cash-flow positive model that pays for itself in month one, would you be open to seeing a 5-minute math breakdown?\"",
    frameworkTip: 'Reframe cost from an expense to an immediate cash-flow consolidation lever.',
    keywordsToInclude: [
      'completely understand',
      'consolidate',
      'operating cost',
      'cash-flow',
      'pays for itself',
      'math breakdown',
    ],
    fillerWordsToAvoid: ['discount', 'special price', 'cheap', 'free trial', 'please consider'],
  },
  {
    id: 'not-interested',
    title: 'Immediate Reflex "Not Interested"',
    buyerPersona: 'Senior Executive / Busy Founder',
    difficulty: 'Extreme',
    prompt: '"Not interested. Take me off your list."',
    context:
      'The prospect has reacted to your opening pattern with a knee-jerk reflex rejection within the first 6 seconds.',
    benchmarkResponse:
      '"Fair enough, Alex. Totally get that I caught you out of the blue. Before I hang up, is it that you\'re not interested because your outbound dials are already converting above 8%, or are you just swamped with back-to-back calls right now?"',
    frameworkTip:
      'Disarm with a calm "Fair enough" and give them an easy out between a positive performance benchmark and bad timing.',
    keywordsToInclude: ['fair enough', 'out of the blue', 'converting', 'swamped', 'timing'],
    fillerWordsToAvoid: ['wait', 'give me 30 seconds', 'why not', 'are you sure'],
  },
]

export default function ColdCallSimulator() {
  const [selectedScenario, setSelectedScenario] = useState<ObjectionScenario>(SCENARIOS[0])
  const [userResponse, setUserResponse] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [scoreDetails, setScoreDetails] = useState<{
    disarmScore: number
    pivotScore: number
    ctaScore: number
    detectedKeywords: string[]
    detectedFillers: string[]
    feedbackSummary: string
  } | null>(null)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [activeTab, setActiveTab] = useState<'practice' | 'benchmark'>('practice')

  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Initialize Web Speech API if supported in browser
    if (
      typeof window !== 'undefined' &&
      ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
    ) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onresult = (event: any) => {
        let transcript = ''
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' '
        }
        setUserResponse(transcript.trim())
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
  }, [])

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech-to-Text is not supported on this browser. You can type your response directly!')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      setUserResponse('')
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const playProspectAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(selectedScenario.prompt)
      utterance.rate = 1.05
      utterance.pitch = 0.95
      utterance.onstart = () => setIsPlayingAudio(true)
      utterance.onend = () => setIsPlayingAudio(false)
      utterance.onerror = () => setIsPlayingAudio(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleEvaluate = () => {
    if (!userResponse.trim()) return

    const lowerResponse = userResponse.toLowerCase()
    const words = lowerResponse.split(/\s+/).filter(Boolean)
    const wordCount = words.length

    // 1. Disarming score (Length and tone)
    let disarmScore = 20
    if (wordCount >= 25 && wordCount <= 85) disarmScore += 15
    else if (wordCount > 85) disarmScore += 5

    // 2. Keyword detection
    const detectedKeywords = selectedScenario.keywordsToInclude.filter((kw) =>
      lowerResponse.includes(kw.toLowerCase())
    )
    const keywordScore = Math.min(35, detectedKeywords.length * 10)

    // 3. Filler word detection
    const detectedFillers = selectedScenario.fillerWordsToAvoid.filter((fw) =>
      lowerResponse.includes(fw.toLowerCase())
    )
    const fillerPenalty = detectedFillers.length * 8

    // 4. Question mark pivot (discovery question)
    const hasQuestionMark = userResponse.includes('?')
    const pivotScore = hasQuestionMark ? 25 : 10

    // 5. CTA score
    const ctaScore = 15

    const rawScore = Math.max(
      20,
      Math.min(98, disarmScore + keywordScore + pivotScore + ctaScore - fillerPenalty)
    )

    let feedback = ''
    if (rawScore >= 85) {
      feedback =
        'Outstanding execution! You disarmed the tension without being argumentative, pivoted with a sharp open-ended probe, and protected conversational control.'
    } else if (rawScore >= 70) {
      feedback =
        'Strong attempt. You maintained composure, but could strengthen the pivot by asking a more specific workflow question instead of explaining your product.'
    } else {
      feedback =
        'Needs polish. Avoid defensive arguing or overly long monologues. Follow the A.D.D. framework: 1) Acknowledge warmly, 2) Deflect away from switching costs, 3) Differentiate on concrete metric friction.'
    }

    setScore(rawScore)
    setScoreDetails({
      disarmScore,
      pivotScore,
      ctaScore,
      detectedKeywords,
      detectedFillers,
      feedbackSummary: feedback,
    })
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
      {/* Scenario Selector */}
      <div className="mb-6">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
          Step 1: Select Live Prospect Objection
        </label>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedScenario(s)
                setScore(null)
                setScoreDetails(null)
                setUserResponse('')
              }}
              className={`flex flex-col items-start rounded-xl border p-3.5 text-left transition-all ${
                selectedScenario.id === s.id
                  ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="text-xs font-bold text-gray-900">{s.title}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    s.difficulty === 'Extreme'
                      ? 'bg-red-100 text-red-700'
                      : s.difficulty === 'Hard'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {s.difficulty}
                </span>
              </div>
              <span className="mt-1 text-[11px] text-gray-500">{s.buyerPersona}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Prospect Simulation Box */}
      <div className="border-slate-800 bg-slate-900 relative mb-6 overflow-hidden rounded-xl border p-6 text-white shadow-inner">
        <div className="border-slate-800 flex items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
            </span>
            <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">
              Live Phone Call Simulation • {selectedScenario.buyerPersona}
            </span>
          </div>

          <button
            onClick={playProspectAudio}
            disabled={isPlayingAudio}
            className="border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center space-x-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition"
          >
            <span>{isPlayingAudio ? '🔊 Playing...' : '▶ Listen to Prospect'}</span>
          </button>
        </div>

        {/* Audio Wave Visualizer Simulation */}
        <div className="py-6">
          <p className="text-slate-100 text-lg font-medium leading-relaxed sm:text-xl">
            {selectedScenario.prompt}
          </p>
          <p className="text-slate-400 mt-3 text-xs italic">Context: {selectedScenario.context}</p>
        </div>

        {/* Telemetry bar */}
        <div className="border-slate-800/80 text-slate-400 flex flex-wrap items-center justify-between gap-2 border-t pt-3 font-mono text-[11px]">
          <span>FRAMEWORK: {selectedScenario.frameworkTip.split(':')[0]}</span>
          <span className="text-emerald-400">TURN-TAKING LATENCY: 340ms (REAL-TIME)</span>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="mb-4 flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('practice')}
          className={`px-4 pb-2.5 text-sm font-semibold transition ${
            activeTab === 'practice'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Your Live Counter-Response
        </button>
        <button
          onClick={() => setActiveTab('benchmark')}
          className={`px-4 pb-2.5 text-sm font-semibold transition ${
            activeTab === 'benchmark'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Top 1% Benchmark Script
        </button>
      </div>

      {activeTab === 'practice' ? (
        <div>
          {/* User Input Sandbox */}
          <div className="relative mb-4">
            <textarea
              rows={4}
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Type your spoken cold-call objection response here, or tap the microphone to speak out loud..."
              className="w-full rounded-xl border border-gray-300 p-4 text-sm leading-relaxed text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <div className="absolute bottom-3 right-3 flex items-center space-x-2">
              <button
                type="button"
                onClick={toggleListening}
                className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm transition ${
                  isListening
                    ? 'animate-pulse bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{isListening ? '🔴 Recording...' : '🎙️ Speak Response'}</span>
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
              💡 Tip: Acknowledge the objection first, avoid being defensive, and end with a
              low-friction question.
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setUserResponse('')}
                className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                Clear
              </button>
              <button
                onClick={handleEvaluate}
                disabled={!userResponse.trim()}
                className="rounded-lg bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
              >
                Evaluate Response
              </button>
            </div>
          </div>

          {/* Scoring Feedback Scorecard */}
          {score !== null && scoreDetails && (
            <div className="animate-fadeIn mt-8 rounded-xl border border-blue-200 bg-blue-50/50 p-6">
              <div className="flex flex-col gap-4 border-b border-blue-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    AI Objection Handling Rubric
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">Performance Scorecard</h3>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-blue-900">{score}</span>
                    <span className="text-sm font-semibold text-gray-500">/100</span>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      score >= 85
                        ? 'bg-emerald-100 text-emerald-800'
                        : score >= 70
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {score >= 85
                      ? 'Top 5% Performer'
                      : score >= 70
                        ? 'Proficient'
                        : 'Needs Practice'}
                  </span>
                </div>
              </div>

              {/* Feedback Summary */}
              <p className="mt-4 text-sm font-medium leading-relaxed text-gray-800">
                {scoreDetails.feedbackSummary}
              </p>

              {/* Breakdown Grid */}
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white p-3.5">
                  <span className="text-xs font-bold text-gray-600">Disarming & Tone</span>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {scoreDetails.disarmScore >= 30
                      ? '✅ Calm & Unfazed'
                      : '⚠️ Too rushed / defensive'}
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-3.5">
                  <span className="text-xs font-bold text-gray-600">Strategic Pivot</span>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {scoreDetails.pivotScore >= 20
                      ? '✅ Open discovery question'
                      : '⚠️ Statement instead of probe'}
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-3.5">
                  <span className="text-xs font-bold text-gray-600">Key Value Signals</span>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {scoreDetails.detectedKeywords.length} power words used
                  </p>
                </div>
              </div>

              {/* Fillers / Keyword Pills */}
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {scoreDetails.detectedKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-emerald-100 px-2 py-1 font-mono text-emerald-800"
                  >
                    + keyword: "{kw}"
                  </span>
                ))}
                {scoreDetails.detectedFillers.map((fw, i) => (
                  <span key={i} className="rounded-md bg-red-100 px-2 py-1 font-mono text-red-800">
                    - filler detected: "{fw}"
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Battle-Tested Benchmark Script
            </span>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
              Verified 28% Meeting Booking Rate
            </span>
          </div>

          <blockquote className="mt-4 rounded-lg border border-gray-200 bg-white p-5 text-base italic leading-relaxed text-gray-900 shadow-sm">
            {selectedScenario.benchmarkResponse}
          </blockquote>

          <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-4 text-xs leading-relaxed text-blue-900">
            <span className="font-bold">Tactical Breakdown: </span>
            {selectedScenario.frameworkTip}
          </div>
        </div>
      )}
    </div>
  )
}
