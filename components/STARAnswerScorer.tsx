'use client'

import React, { useState, useId } from 'react'
import Link from 'next/link'

interface Props {
  questionText: string
  framework: string
}

export default function STARAnswerScorer({ questionText, framework }: Props) {
  const situationInputId = useId()
  const taskInputId = useId()
  const actionInputId = useId()
  const resultInputId = useId()
  const [situationSec, setSituationSec] = useState<number>(14)
  const [taskSec, setTaskSec] = useState<number>(12)
  const [actionSec, setActionSec] = useState<number>(44)
  const [resultSec, setResultSec] = useState<number>(16)
  const [metricsIncluded, setMetricsIncluded] = useState<boolean>(true)

  const totalSec = situationSec + taskSec + actionSec + resultSec

  // Scoring
  let score = 50

  // Total duration sweet spot: 75-90s
  if (totalSec >= 75 && totalSec <= 90) {
    score += 25
  } else if (totalSec >= 60 && totalSec < 75) {
    score += 15
  } else if (totalSec > 90 && totalSec <= 110) {
    score += 10
  } else {
    score += 0
  }

  // Action ratio should be >= 45% of total
  const actionRatio = actionSec / totalSec
  if (actionRatio >= 0.45 && actionRatio <= 0.6) {
    score += 15
  } else if (actionRatio > 0.6) {
    score += 10
  } else {
    score += 5
  }

  // Metrics bonus
  if (metricsIncluded) score += 10

  const normalizedScore = Math.min(100, Math.max(15, score))

  const getVerdict = (s: number, total: number) => {
    if (total > 115) {
      return {
        title: 'Too Verbose (>115s)',
        badge: 'text-red-700 bg-red-50 border-red-200',
        text: 'Interviewer attention drops sharply after 90 seconds. Trim context and jump straight to your personal ownership in the Action step.',
      }
    }
    if (total < 55) {
      return {
        title: 'Lacks Depth (<55s)',
        badge: 'text-amber-700 bg-amber-50 border-amber-200',
        text: 'Your answer is too brief. Provide more specific architectural tradeoffs, collaboration steps, and measurable business outcomes.',
      }
    }
    if (s >= 85) {
      return {
        title: 'Top 5% STAR Delivery',
        badge: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        text: 'Perfect 80–90 second cadence. 50%+ of your time is spent on your personal Actions, supported by concrete business metrics.',
      }
    }
    return {
      title: 'Passable Delivery',
      badge: 'text-[#ea580c] bg-[#fff7ed] border-[#fed7aa]',
      text: 'Good foundation. Make sure the Result step includes at least two hard metrics (%, $, hours saved) to stand out.',
    }
  }

  const verdict = getVerdict(normalizedScore, totalSec)

  return (
    <div
      className="space-y-6 rounded-2xl border border-[#ebebeb] bg-white p-6 shadow-sm sm:p-8"
      style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}
    >
      <div className="flex flex-col justify-between gap-2 border-b border-[#f0f0f0] pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#ea580c]" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#ea580c]">
              Interactive STAR Pacing Simulator
            </span>
          </div>
          <h3 className="mt-1 text-xl font-normal tracking-tight text-[#171717] sm:text-2xl">
            STAR Duration &amp; Impact Auditor
          </h3>
          <p className="mt-1 text-xs text-[#666666]">
            Audit your answer timing for &ldquo;{questionText}&rdquo; before stepping into live
            interviews.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#fafafa] px-3 py-1 font-mono text-[11px] text-[#555555] sm:self-auto">
          <span>Max Ceiling:</span>
          <strong className="text-[#171717]">90 Seconds</strong>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Sliders */}
        <div className="space-y-4">
          {/* Situation */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <label htmlFor={situationInputId} className="font-medium text-[#171717]">
                [S] Situation Duration: <span className="text-[#666666]">(10–15s ideal)</span>
              </label>
              <span className="font-mono font-semibold text-[#171717]">{situationSec}s</span>
            </div>
            <input
              id={situationInputId}
              type="range"
              min={5}
              max={40}
              value={situationSec}
              onChange={(e) => setSituationSec(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#f0f0f0] accent-[#ea580c]"
            />
          </div>

          {/* Task */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <label htmlFor={taskInputId} className="font-medium text-[#171717]">
                [T] Task Duration: <span className="text-[#666666]">(10–15s ideal)</span>
              </label>
              <span className="font-mono font-semibold text-[#171717]">{taskSec}s</span>
            </div>
            <input
              id={taskInputId}
              type="range"
              min={5}
              max={30}
              value={taskSec}
              onChange={(e) => setTaskSec(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#f0f0f0] accent-[#ea580c]"
            />
          </div>

          {/* Action */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <label htmlFor={actionInputId} className="font-medium text-[#171717]">
                [A] Action Duration: <span className="text-[#ea580c]">(40–50s core focus)</span>
              </label>
              <span className="font-mono font-semibold text-[#ea580c]">{actionSec}s</span>
            </div>
            <input
              id={actionInputId}
              type="range"
              min={15}
              max={80}
              value={actionSec}
              onChange={(e) => setActionSec(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#f0f0f0] accent-[#ea580c]"
            />
          </div>

          {/* Result */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <label htmlFor={resultInputId} className="font-medium text-[#171717]">
                [R] Result Duration: <span className="text-[#666666]">(15–20s impact)</span>
              </label>
              <span className="font-mono font-semibold text-[#171717]">{resultSec}s</span>
            </div>
            <input
              id={resultInputId}
              type="range"
              min={5}
              max={40}
              value={resultSec}
              onChange={(e) => setResultSec(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#f0f0f0] accent-[#ea580c]"
            />
          </div>

          {/* Metrics Checkbox */}
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#ebebeb] bg-[#fafafa] p-3 text-xs text-[#171717]">
            <input
              type="checkbox"
              checked={metricsIncluded}
              onChange={(e) => setMetricsIncluded(e.target.checked)}
              className="h-4 w-4 rounded border-[#cccccc] text-[#ea580c] focus:ring-[#ea580c]"
            />
            <span>I stated at least 1 concrete quantifiable result (%, $, time saved)</span>
          </label>
        </div>

        {/* Real-time Diagnostics Output */}
        <div className="flex flex-col justify-between rounded-xl border border-[#ebebeb] bg-[#fafafa] p-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[#666666]">
                Total Duration
              </span>
              <span
                className={`rounded-full border px-2.5 py-0.5 font-mono text-xs font-bold ${verdict.badge}`}
              >
                {verdict.title}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-mono text-5xl font-bold tracking-tight text-[#171717]">
                {totalSec}
              </span>
              <span className="font-mono text-sm text-[#888888]">seconds (target: 75–90s)</span>
            </div>

            {/* Visual Balance Bar */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[10px] text-[#666666]">
                <span>Allocation: S ({Math.round((situationSec / totalSec) * 100)}%)</span>
                <span>T ({Math.round((taskSec / totalSec) * 100)}%)</span>
                <span className="font-bold text-[#ea580c]">
                  A ({Math.round((actionSec / totalSec) * 100)}%)
                </span>
                <span>R ({Math.round((resultSec / totalSec) * 100)}%)</span>
              </div>
              <div className="flex h-3 overflow-hidden rounded-full font-mono text-[9px] text-white">
                <div
                  className="bg-slate-400 flex items-center justify-center"
                  style={{ width: `${(situationSec / totalSec) * 100}%` }}
                  title="Situation"
                />
                <div
                  className="bg-slate-300 text-slate-700 flex items-center justify-center"
                  style={{ width: `${(taskSec / totalSec) * 100}%` }}
                  title="Task"
                />
                <div
                  className="flex items-center justify-center bg-[#ea580c]"
                  style={{ width: `${(actionSec / totalSec) * 100}%` }}
                  title="Action"
                />
                <div
                  className="flex items-center justify-center bg-emerald-600"
                  style={{ width: `${(resultSec / totalSec) * 100}%` }}
                  title="Result"
                />
              </div>
            </div>

            {/* Critique Feedback */}
            <div className="rounded-lg border border-[#ebebeb] bg-white p-3.5 text-xs text-[#555555]">
              <span className="font-mono font-semibold uppercase text-[#171717]">
                AI Timing Verdict:{' '}
              </span>
              <p className="mt-1 leading-relaxed">{verdict.text}</p>
            </div>
          </div>

          <div className="mt-5 border-t border-[#ebebeb] pt-4">
            <Link
              href="/free-mock-interview"
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#171717] px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              Rehearse This Answer Out Loud in Voice AI →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
