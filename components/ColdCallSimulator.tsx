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
      '"Look, we signed an annual enterprise contract with our incumbent vendor six months ago and we\'re completely satisfied. There\'s zero reason for us to switch right now."',
    context:
      'The prospect feels committed and fears the switching cost of new software. They want to shut down the cold call immediately.',
    benchmarkResponse:
      '"Totally respect that, Sarah—they run a solid platform and most teams we work with were actually using them before talking with us. We\'re definitely not asking you to rip and replace anything today. The main reason VP of Sales chat with us mid-contract is to benchmark their call connect rates and turn-taking latency before renewal season. Out of curiosity, when you look at your team\'s outbound dials, are reps experiencing any awkward audio lag?"',
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
      '"I\'m jumping between back-to-back meetings right now. Just email me your deck and one-pager, and I\'ll take a look when I get a chance."',
    context:
      'A polite brush-off designed to get off the phone. 92% of unsolicited sales decks sent after this objection are never opened.',
    benchmarkResponse:
      '"I\'d be happy to shoot over our 1-pager, John. But to make sure I don\'t clutter your inbox with irrelevant slides—we have separate playbooks for outbound SDR ramp and inbound qualification. Which of those two is a higher priority for your revenue team this quarter?"',
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
      '"We\'re on a complete software and hiring budget freeze until next fiscal year. We literally have zero discretionary dollars allocated right now."',
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
    prompt: '"Not interested. Please take me off your call list."',
    context:
      'The prospect has reacted to your opening pattern with a knee-jerk reflex rejection within the first 6 seconds.',
    benchmarkResponse:
      '"Fair enough, Alex. Totally get that I caught you completely out of the blue. Before I hang up, is it that you\'re not interested because your outbound dials are already converting above 8%, or are you just swamped with back-to-back calls right now?"',
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
  const [speechSupported, setSpeechSupported] = useState(true)
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
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
    ) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      try {
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

        recognition.onerror = (e: any) => {
          console.warn('Speech recognition warning:', e)
          setIsListening(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current = recognition
      } catch (err) {
        console.warn('Speech recognition init error:', err)
        setSpeechSupported(false)
      }
    } else {
      setSpeechSupported(false)
    }
  }, [])

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert(
        'Speech-to-Text is not supported or microphone access is restricted in this browser. You can type your response directly or click "✨ Load Sample Answer"!'
      )
      return
    }

    if (isListening) {
      try {
        recognitionRef.current.stop()
      } catch (err) {
        console.warn(err)
      }
      setIsListening(false)
    } else {
      try {
        setUserResponse('')
        recognitionRef.current.start()
        setIsListening(true)
      } catch (err) {
        console.warn('Speech start error:', err)
        setIsListening(false)
      }
    }
  }

  const playProspectAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const textToSpeak = selectedScenario.prompt.replace(/["']/g, '')
      const utterance = new SpeechSynthesisUtterance(textToSpeak)
      utterance.rate = 1.0
      utterance.pitch = 1.0

      const voices = window.speechSynthesis.getVoices()
      const preferredVoice =
        voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Natural') ||
              v.name.includes('Google') ||
              v.name.includes('Samantha') ||
              v.name.includes('David'))
        ) || voices.find((v) => v.lang.startsWith('en'))

      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      utterance.onstart = () => setIsPlayingAudio(true)
      utterance.onend = () => setIsPlayingAudio(false)
      utterance.onerror = () => setIsPlayingAudio(false)

      utteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
    } else {
      alert(
        'Audio playback is not supported on this device. Please read the objection text on screen.'
      )
    }
  }

  const fillSampleAnswer = () => {
    setUserResponse(selectedScenario.benchmarkResponse)
    setActiveTab('practice')
  }

  const handleEvaluate = () => {
    if (!userResponse.trim()) return

    const lowerResponse = userResponse.toLowerCase()
    const words = lowerResponse.split(/\s+/).filter(Boolean)
    const wordCount = words.length

    // 1. Disarming score (Pacing and tone)
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

    // 4. Question mark pivot (open discovery probe)
    const hasQuestionMark = userResponse.includes('?')
    const pivotScore = hasQuestionMark ? 25 : 10

    // 5. CTA baseline
    const ctaScore = 15

    const rawScore = Math.max(
      25,
      Math.min(98, disarmScore + keywordScore + pivotScore + ctaScore - fillerPenalty)
    )

    let feedback = ''
    if (rawScore >= 85) {
      feedback =
        'Outstanding execution. You disarmed the tension without being argumentative, pivoted with a sharp open-ended probe, and protected conversational control.'
    } else if (rawScore >= 70) {
      feedback =
        'Strong attempt. You maintained composure, but could strengthen the pivot by asking a more specific workflow question instead of explaining your product features.'
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
    <div className="space-y-8">
      {/* Step 1: Scenario Selector */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
            STEP 1 • SELECT PROSPECT OBJECTION
          </p>
          <span className="text-xs text-[#666666]">4 realistic enterprise scenarios</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SCENARIOS.map((s) => {
            const isSelected = selectedScenario.id === s.id
            return (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedScenario(s)
                  setScore(null)
                  setScoreDetails(null)
                  setUserResponse('')
                  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel()
                    setIsPlayingAudio(false)
                  }
                }}
                className={`flex flex-col items-start rounded-[6px] bg-white p-4 text-left transition-all duration-200 ${
                  isSelected ? 'ring-1 ring-[#171717]' : 'hover:bg-[#f5f5f5]'
                }`}
                style={{
                  boxShadow: isSelected
                    ? '0 0 0 1px #171717, 0 1px 3px rgba(0,0,0,0.06)'
                    : '0 0 0 1px #ebebeb',
                }}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-xs font-medium text-[#171717]">{s.title}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] uppercase ${
                      s.difficulty === 'Extreme'
                        ? 'border border-[#fed7aa] bg-[#fff7ed] text-[#ea580c]'
                        : s.difficulty === 'Hard'
                          ? 'border border-[#fed7aa] bg-[#fff7ed] text-[#ea580c]'
                          : 'bg-[#f5f5f5] text-[#666666]'
                    }`}
                  >
                    {s.difficulty}
                  </span>
                </div>
                <span className="mt-1 text-[11px] text-[#666666]">{s.buyerPersona}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 2: The Prospect Objection Simulation Box (Clean Homepage Style) */}
      <div
        className="rounded-[6px] bg-white p-7 transition-all duration-200"
        style={{
          boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 0 0 2px #fafafa',
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ebebeb] pb-4">
          <div className="flex items-center space-x-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#ea580c]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              LIVE SIMULATION • {selectedScenario.buyerPersona}
            </span>
          </div>

          <button
            onClick={playProspectAudio}
            disabled={isPlayingAudio}
            className="inline-flex items-center justify-center rounded-[6px] bg-[#171717] px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-[#333333]"
          >
            {isPlayingAudio ? (
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 animate-ping rounded-full bg-[#ea580c]" />
                <span>Playing Audio...</span>
              </span>
            ) : (
              <span>▶ Listen to Prospect</span>
            )}
          </button>
        </div>

        {/* Large legible prompt */}
        <div className="py-6">
          <p className="text-xl font-normal leading-relaxed tracking-tight text-[#171717] sm:text-2xl">
            {selectedScenario.prompt}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-[#666666]">
            <strong>Buyer Context:</strong> {selectedScenario.context}
          </p>
        </div>

        {/* Telemetry bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#ebebeb] pt-3 font-mono text-[11px] text-[#666666]">
          <span>FRAMEWORK: {selectedScenario.frameworkTip.split(':')[0]}</span>
          <span className="text-[#171717]">TURN-TAKING LATENCY: 348ms (REAL-TIME)</span>
        </div>
      </div>

      {/* Step 3: Response Sandbox */}
      <div
        className="rounded-[6px] bg-white p-7 transition-all duration-200"
        style={{
          boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 0 0 2px #fafafa',
        }}
      >
        {/* Mode Tabs */}
        <div className="mb-5 flex border-b border-[#ebebeb]">
          <button
            onClick={() => setActiveTab('practice')}
            className={`pb-2.5 text-xs font-medium transition ${
              activeTab === 'practice'
                ? 'border-b-2 border-[#171717] text-[#171717]'
                : 'text-[#666666] hover:text-[#171717]'
            }`}
          >
            Your Live Counter-Response
          </button>
          <button
            onClick={() => setActiveTab('benchmark')}
            className={`ml-6 pb-2.5 text-xs font-medium transition ${
              activeTab === 'benchmark'
                ? 'border-b-2 border-[#171717] text-[#171717]'
                : 'text-[#666666] hover:text-[#171717]'
            }`}
          >
            Top 1% Benchmark Script
          </button>
        </div>

        {activeTab === 'practice' ? (
          <div>
            {/* User Input Textarea */}
            <div className="relative mb-4">
              <textarea
                rows={4}
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                placeholder="Type your spoken cold-call objection response here, or tap the microphone to speak out loud..."
                className="w-full rounded-[6px] border border-[#ebebeb] bg-[#fafafa] p-4 text-sm leading-relaxed text-[#171717] placeholder-[#8f8f8f] transition focus:border-[#171717] focus:bg-white focus:outline-none"
              />
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={fillSampleAnswer}
                  className="rounded-[6px] bg-white px-3 py-1.5 text-xs font-medium text-[#171717] transition hover:bg-[#f5f5f5]"
                  style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                >
                  ✨ Load Sample Answer
                </button>

                <button
                  type="button"
                  onClick={toggleListening}
                  className={`flex items-center space-x-1.5 rounded-[6px] px-3.5 py-1.5 text-xs font-medium transition ${
                    isListening
                      ? 'animate-pulse bg-[#ea580c] text-white'
                      : 'bg-white text-[#171717] hover:bg-[#f5f5f5]'
                  }`}
                  style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                >
                  <span>{isListening ? '🔴 Recording (Listening)...' : '🎙️ Speak Response'}</span>
                </button>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#ebebeb] pt-4">
              <p className="text-xs text-[#666666]">
                💡 Tip: Acknowledge the objection first, avoid being defensive, and end with a
                low-friction question.
              </p>
              <div className="flex space-x-2">
                {userResponse && (
                  <button
                    onClick={() => setUserResponse('')}
                    className="rounded-[6px] bg-white px-3.5 py-2 text-xs font-medium text-[#666666] hover:bg-[#f5f5f5] hover:text-[#171717]"
                    style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={handleEvaluate}
                  disabled={!userResponse.trim()}
                  className="inline-flex items-center justify-center rounded-[6px] bg-[#171717] px-6 py-2.5 text-xs font-medium text-white transition-all hover:bg-[#333333] disabled:opacity-40"
                >
                  Evaluate Response →
                </button>
              </div>
            </div>

            {/* Scoring Feedback Scorecard */}
            {score !== null && scoreDetails && (
              <div
                className="mt-8 rounded-[6px] bg-white p-7 transition-all"
                style={{
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 0 0 2px #fafafa',
                }}
              >
                <div className="flex flex-col gap-4 border-b border-[#ebebeb] pb-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
                      AI OBJECTION HANDLING RUBRIC
                    </p>
                    <h3 className="mt-1 text-xl font-normal tracking-tight text-[#171717]">
                      Performance Scorecard
                    </h3>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <span className="text-3xl font-normal leading-none text-[#171717]">
                        {score}
                      </span>
                      <span className="font-mono text-xs text-[#666666]">/100</span>
                    </div>
                    <span
                      className={`rounded px-2.5 py-1 font-mono text-[10px] font-semibold uppercase ${
                        score >= 85
                          ? 'border border-[#fed7aa] bg-[#fff7ed] text-[#ea580c]'
                          : score >= 70
                            ? 'bg-[#f5f5f5] text-[#171717]'
                            : 'bg-[#f5f5f5] text-[#666666]'
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
                <p className="mt-4 text-sm leading-relaxed text-[#4d4d4d]">
                  {scoreDetails.feedbackSummary}
                </p>

                {/* Breakdown Grid */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div
                    className="rounded-[6px] bg-white p-4"
                    style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                  >
                    <span className="font-mono text-[10px] uppercase text-[#666666]">
                      Disarming &amp; Tone
                    </span>
                    <p className="mt-1 text-sm font-medium text-[#171717]">
                      {scoreDetails.disarmScore >= 30
                        ? '✓ Calm & Unfazed'
                        : '⚠ Too rushed / defensive'}
                    </p>
                  </div>
                  <div
                    className="rounded-[6px] bg-white p-4"
                    style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                  >
                    <span className="font-mono text-[10px] uppercase text-[#666666]">
                      Strategic Pivot
                    </span>
                    <p className="mt-1 text-sm font-medium text-[#171717]">
                      {scoreDetails.pivotScore >= 20
                        ? '✓ Open discovery probe'
                        : '⚠ Statement instead of probe'}
                    </p>
                  </div>
                  <div
                    className="rounded-[6px] bg-white p-4"
                    style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                  >
                    <span className="font-mono text-[10px] uppercase text-[#666666]">
                      Keyword Execution
                    </span>
                    <p className="mt-1 text-sm font-medium text-[#171717]">
                      {scoreDetails.detectedKeywords.length >= 2
                        ? `✓ ${scoreDetails.detectedKeywords.length} keywords used`
                        : '⚠ Add benchmark phrases'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Benchmark Script Tab */
          <div className="space-y-4 rounded-[6px] bg-[#fafafa] p-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
                TOP 1% SDR BENCHMARK SCRIPT
              </span>
              <button
                onClick={fillSampleAnswer}
                className="rounded-[6px] bg-white px-3 py-1.5 text-xs font-medium text-[#171717] transition hover:bg-[#f5f5f5]"
                style={{ boxShadow: '0 0 0 1px #ebebeb' }}
              >
                Copy into Sandbox →
              </button>
            </div>
            <p className="text-base font-light italic leading-relaxed text-[#171717]">
              {selectedScenario.benchmarkResponse}
            </p>
            <div className="border-t border-[#ebebeb] pt-3 text-xs text-[#666666]">
              <span className="font-medium text-[#171717]">Strategic Rationale: </span>
              {selectedScenario.frameworkTip}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
