'use client'

import React, { useState, useId } from 'react'
import Link from 'next/link'

interface Props {
  roleName: string
  category: string
}

export default function InterviewReadinessCalculator({ roleName, category }: Props) {
  const durationInputId = useId()
  const [duration, setDuration] = useState<number>(85)
  const [metricsCount, setMetricsCount] = useState<number>(2)
  const [fillerWords, setFillerWords] = useState<'low' | 'med' | 'high'>('low')
  const [frameworkDepth, setFrameworkDepth] = useState<'deep' | 'moderate' | 'shallow'>('deep')

  // Calculate score (0 to 100)
  let score = 50

  // Duration scoring: optimal 70-95s
  if (duration >= 70 && duration <= 95) {
    score += 25
  } else if (duration >= 50 && duration < 70) {
    score += 15
  } else if (duration > 95 && duration <= 120) {
    score += 12
  } else {
    score += 5
  }

  // Metrics count scoring
  if (metricsCount >= 3) score += 25
  else if (metricsCount === 2) score += 20
  else if (metricsCount === 1) score += 10
  else score += 0

  // Filler words
  if (fillerWords === 'low') score += 25
  else if (fillerWords === 'med') score += 12
  else score += 0

  // Framework depth
  if (frameworkDepth === 'deep') score += 25
  else if (frameworkDepth === 'moderate') score += 15
  else score += 5

  const normalizedScore = Math.min(100, Math.max(10, score))

  const getTier = (s: number) => {
    if (s >= 88)
      return {
        label: 'Top 5% Strong Hire',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        barColor: 'bg-emerald-600',
        advice: `Your pacing (${duration}s) and structured metrics place you in the top 5% of ${roleName} candidates. You sound authoritative, direct, and outcome-driven.`,
      }
    if (s >= 70)
      return {
        label: 'Competitive / Lean Hire',
        color: 'text-[#ea580c] bg-[#fff7ed] border-[#fed7aa]',
        barColor: 'bg-[#ea580c]',
        advice: `Solid baseline, but tighten your response closer to the 75-90s window and ensure at least 2 hard business impact numbers (%, $, time saved).`,
      }
    return {
      label: 'Needs Calibration',
      color: 'text-red-700 bg-red-50 border-red-200',
      barColor: 'bg-red-500',
      advice: `High risk of losing interviewer attention. Shorten verbose setup, eliminate filler pauses, and lead immediately with your direct answer before expanding.`,
    }
  }

  const tier = getTier(normalizedScore)

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
              Proprietary Information Gain Tool
            </span>
          </div>
          <h3 className="mt-1 text-xl font-normal tracking-tight text-[#171717] sm:text-2xl">
            {roleName} Answer Pacing &amp; Rubric Calculator
          </h3>
          <p className="mt-1 text-xs text-[#666666]">
            Simulate your spoken interview delivery against Google &amp; Tier-1 hiring benchmarks.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#fafafa] px-3 py-1 font-mono text-[11px] text-[#555555] sm:self-auto">
          <span>Target Pacing:</span>
          <strong className="text-[#171717]">135–150 WPM</strong>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Controls Column */}
        <div className="space-y-5">
          {/* Duration Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label htmlFor={durationInputId} className="font-medium text-[#171717]">
                Spoken Answer Duration
              </label>
              <span className="font-mono font-semibold text-[#ea580c]">{duration} seconds</span>
            </div>
            <input
              id={durationInputId}
              type="range"
              min={30}
              max={180}
              step={5}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#f0f0f0] accent-[#ea580c]"
            />
            <div className="flex justify-between font-mono text-[10px] text-[#888888]">
              <span>30s (Too brief)</span>
              <span className="text-[#ea580c]">75-90s (Sweet spot)</span>
              <span>180s (Rambling)</span>
            </div>
          </div>

          {/* Quantifiable Metrics */}
          <div className="space-y-2">
            <span className="block text-xs font-medium text-[#171717]">
              Concrete Metrics / Numbers Cited
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setMetricsCount(cnt)}
                  className={`rounded-lg border px-3 py-2 font-mono text-xs font-medium transition-all ${
                    metricsCount === cnt
                      ? 'border-[#ea580c] bg-[#fff7ed] text-[#ea580c]'
                      : 'border-[#ebebeb] bg-[#fafafa] text-[#666666] hover:border-[#cccccc]'
                  }`}
                >
                  {cnt === 3 ? '3+ metrics' : `${cnt} metric${cnt === 1 ? '' : 's'}`}
                </button>
              ))}
            </div>
          </div>

          {/* Delivery & Filler Words */}
          <div className="space-y-2">
            <span className="block text-xs font-medium text-[#171717]">
              Filler Word Frequency (Um, Like, You Know)
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'low' as const, label: '< 2 / min (Crisp)' },
                { id: 'med' as const, label: '3-5 / min (Average)' },
                { id: 'high' as const, label: '> 5 / min (Hesitant)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFillerWords(opt.id)}
                  className={`rounded-lg border px-2 py-2 text-center font-mono text-xs transition-all ${
                    fillerWords === opt.id
                      ? 'border-[#ea580c] bg-[#fff7ed] font-medium text-[#ea580c]'
                      : 'border-[#ebebeb] bg-[#fafafa] text-[#666666] hover:border-[#cccccc]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Framework Depth */}
          <div className="space-y-2">
            <span className="block text-xs font-medium text-[#171717]">
              Structured Framework Execution
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'deep' as const, label: 'STAR / Tradeoffs' },
                { id: 'moderate' as const, label: 'General Steps' },
                { id: 'shallow' as const, label: 'Unstructured' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFrameworkDepth(opt.id)}
                  className={`rounded-lg border px-2 py-2 text-center font-mono text-xs transition-all ${
                    frameworkDepth === opt.id
                      ? 'border-[#ea580c] bg-[#fff7ed] font-medium text-[#ea580c]'
                      : 'border-[#ebebeb] bg-[#fafafa] text-[#666666] hover:border-[#cccccc]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Feedback Score Card */}
        <div className="flex flex-col justify-between rounded-xl border border-[#ebebeb] bg-[#fafafa] p-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[#666666]">
                Readiness Score
              </span>
              <span
                className={`rounded-full border px-2.5 py-0.5 font-mono text-xs font-bold ${tier.color}`}
              >
                {tier.label}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-mono text-5xl font-bold tracking-tight text-[#171717]">
                {normalizedScore}
              </span>
              <span className="font-mono text-lg text-[#999999]">/ 100</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#e5e5e5]">
              <div
                className={`h-full transition-all duration-300 ${tier.barColor}`}
                style={{ width: `${normalizedScore}%` }}
              />
            </div>

            {/* AI Diagnostics Box */}
            <div className="space-y-2 rounded-lg border border-[#ebebeb] bg-white p-3.5 text-xs text-[#555555]">
              <div className="font-mono font-semibold uppercase text-[#171717]">
                Interviewer Assessment:
              </div>
              <p className="leading-relaxed">{tier.advice}</p>
            </div>

            {/* STAR Distribution Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between font-mono text-[10px] text-[#666666]">
                <span>STAR Balance</span>
                <span>Optimal Ratio: 15% S · 15% T · 50% A · 20% R</span>
              </div>
              <div className="flex h-2 overflow-hidden rounded-full font-mono text-[9px] text-white">
                <div
                  className="flex items-center justify-center bg-[#94a3b8]"
                  style={{ width: '15%' }}
                  title="Situation"
                />
                <div
                  className="flex items-center justify-center bg-[#cbd5e1]"
                  style={{ width: '15%' }}
                  title="Task"
                />
                <div
                  className="flex items-center justify-center bg-[#ea580c]"
                  style={{ width: '50%' }}
                  title="Action"
                />
                <div
                  className="flex items-center justify-center bg-[#10b981]"
                  style={{ width: '20%' }}
                  title="Result"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-[#ebebeb] pt-4">
            <Link
              href="/free-mock-interview"
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#171717] px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              Test This Live in Free Voice Simulator →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
