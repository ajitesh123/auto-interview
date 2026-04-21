'use client'

import React, { useState, useEffect } from 'react'

const TIER_THRESHOLDS = [
  { min: 1, max: 999, inr: 9, usd: 0.1 },
  { min: 1000, max: 4999, inr: 8, usd: 0.09 },
  { min: 5000, max: 9999, inr: 7, usd: 0.08 },
  { min: 10000, max: 100000, inr: 6, usd: 0.07 },
]

const OTHERS_RATE_INR = 15
const OTHERS_RATE_USD = 0.18
const MINS_PER_CALL = 3
const CONVERSION_RATE = 0.05
const OTHERS_CONVERSION_RATE = 0.025

function useAnimatedNumber(value: number) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    let startTime: number
    const startValue = displayValue
    const duration = 500 // ms

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      setDisplayValue(startValue + (value - startValue) * easeProgress)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value])

  return Math.round(displayValue)
}

function formatCurrency(num: number, isINR: boolean) {
  return new Intl.NumberFormat(isINR ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency: isINR ? 'INR' : 'USD',
    maximumFractionDigits: 0,
  }).format(num)
}

export default function Calculator() {
  const [calls, setCalls] = useState(1000)
  const [isINR, setIsINR] = useState(true)

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalls(Number(e.target.value))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value.replace(/\D/g, ''))
    if (val > 10000) val = 10000
    if (val < 1) val = 1
    setCalls(val)
  }

  const activeTier =
    TIER_THRESHOLDS.find((t) => calls >= t.min && calls <= t.max) ||
    TIER_THRESHOLDS[TIER_THRESHOLDS.length - 1]

  const ttaiRate = isINR ? activeTier.inr : activeTier.usd
  const othersRate = isINR ? OTHERS_RATE_INR : OTHERS_RATE_USD

  const totalMinutesPerDay = calls * MINS_PER_CALL

  const othersDailyCost = totalMinutesPerDay * othersRate
  const othersMonthlyCost = othersDailyCost * 30

  const ttaiDailyCost = totalMinutesPerDay * ttaiRate
  const ttaiMonthlyCost = ttaiDailyCost * 30

  const monthlySavings = othersMonthlyCost - ttaiMonthlyCost
  const savingsPercent = ((othersMonthlyCost - ttaiMonthlyCost) / othersMonthlyCost) * 100

  // Optional: conversions
  const othersConversionsDay = Math.round(calls * OTHERS_CONVERSION_RATE)
  const ttaiConversionsDay = Math.round(calls * CONVERSION_RATE)

  const othersCostPerConv = othersConversionsDay > 0 ? othersDailyCost / othersConversionsDay : 0
  const ttaiCostPerConv = ttaiConversionsDay > 0 ? ttaiDailyCost / ttaiConversionsDay : 0

  // Animated numbers
  const animTtaiMonthly = useAnimatedNumber(ttaiMonthlyCost)
  const animOthersMonthly = useAnimatedNumber(othersMonthlyCost)
  const animSavings = useAnimatedNumber(monthlySavings)
  const animTtaiConv = useAnimatedNumber(ttaiConversionsDay)
  const animOthersConv = useAnimatedNumber(othersConversionsDay)
  const animTtaiCostConv = useAnimatedNumber(ttaiCostPerConv)
  const animOthersCostConv = useAnimatedNumber(othersCostPerConv)

  return (
    <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white font-sans text-gray-900 shadow-xl">
      <div className="border-b border-gray-200 p-8">
        <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">AI Calling ROI Calculator</h2>
            <p className="mt-1 text-gray-500">
              Estimate your costs, conversions, and monthly savings.
            </p>
          </div>
          <div className="mt-4 flex rounded-lg border border-gray-200 bg-gray-100 p-1 md:mt-0">
            <button
              onClick={() => setIsINR(true)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                isINR
                  ? 'border border-gray-200 bg-white text-black shadow-sm'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => setIsINR(false)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                !isINR
                  ? 'border border-gray-200 bg-white text-black shadow-sm'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <label className="text-sm font-semibold uppercase tracking-wider text-gray-700">
              Outbound Calls Per Day
            </label>
            <input
              type="text"
              value={calls}
              onChange={handleInputChange}
              className="w-24 rounded-lg border border-gray-300 py-1 text-center text-lg font-semibold shadow-sm outline-none focus:border-black focus:ring-black"
            />
          </div>
          <input
            type="range"
            min="1"
            max="10000"
            value={calls}
            onChange={handleSliderChange}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-black"
          />
          <div className="mt-3 flex justify-between text-xs font-medium text-gray-400">
            <span>1</span>
            <span>2,500</span>
            <span>5,000</span>
            <span>7,500</span>
            <span>10,000</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[100, 500, 1000, 2500, 5000].map((preset) => (
              <button
                key={preset}
                onClick={() => setCalls(preset)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  calls === preset
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-400'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Tiers Highlight */}
        <div className="mb-4 mt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Tough Tongue AI Volume Pricing (Per Min)
          </p>
          <div className="grid grid-cols-4 gap-2">
            {TIER_THRESHOLDS.map((tier, idx) => {
              const isActive = activeTier.min === tier.min
              return (
                <div
                  key={idx}
                  className={`rounded-xl border p-3 text-center transition-all ${
                    isActive
                      ? 'scale-[1.02] border-black bg-gray-50 shadow-sm'
                      : 'border-gray-100 bg-white opacity-50'
                  }`}
                >
                  <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-gray-500">
                    {tier.min === 10000 ? '10k+' : `< ${tier.max + 1}`}
                  </p>
                  <p
                    className={`font-bold ${isActive ? 'text-lg text-black' : 'text-sm text-gray-400'}`}
                  >
                    {isINR ? `₹${tier.inr}` : `$${tier.usd}`}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-8">
        {/* Savings Banner */}
        <div className="mb-8 flex flex-col items-center justify-between rounded-2xl bg-black p-6 text-white shadow-lg md:flex-row">
          <div>
            <p className="mb-1 text-sm font-medium uppercase tracking-widest text-gray-400">
              Estimated Monthly Savings
            </p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-4xl font-black tracking-tight md:text-5xl">
                {formatCurrency(animSavings, isINR)}
              </h3>
              <span className="text-lg font-medium text-gray-300">/mo</span>
            </div>
          </div>
          <div className="mt-4 text-center md:mt-0 md:text-right">
            <div className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-bold tracking-wide text-black">
              Cut costs by {savingsPercent.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Side by Side */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Others Card */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="text-gray-400font-semibold mb-6 text-xs uppercase tracking-wide text-gray-400">
              Other Platforms
            </h4>

            <div className="mb-6">
              <p className="mb-1 text-xs font-medium uppercase text-gray-400">Monthly Cost</p>
              <h5 className="text-2xl font-bold text-gray-800">
                {formatCurrency(animOthersMonthly, isINR)}
              </h5>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
              <div>
                <p className="mb-1 text-xs font-medium uppercase text-gray-400">Leads / Day</p>
                <p className="text-lg font-bold text-gray-700">{animOthersConv}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium uppercase text-gray-400">Cost / Lead</p>
                <p className="text-lg font-bold text-gray-700">
                  {formatCurrency(animOthersCostConv, isINR)}
                </p>
              </div>
            </div>

            <div className="absolute right-0 top-0 p-4 opacity-5">
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
          </div>

          {/* TTAI Card */}
          <div className="pattern-dots relative overflow-hidden rounded-2xl border border-gray-900 bg-black p-6 text-white shadow-xl">
            <h4 className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
              Tough Tongue AI
            </h4>

            <div className="mb-6">
              <p className="mb-1 text-xs font-medium uppercase text-gray-400">Monthly Cost</p>
              <h5 className="text-3xl font-black">{formatCurrency(animTtaiMonthly, isINR)}</h5>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-4">
              <div>
                <p className="mb-1 text-xs font-medium uppercase text-gray-400">Leads / Day</p>
                <p className="text-xl font-bold">{animTtaiConv}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium uppercase text-gray-400">Cost / Lead</p>
                <p className="text-xl font-bold">{formatCurrency(animTtaiCostConv, isINR)}</p>
              </div>
            </div>

            <div className="absolute right-0 top-0 p-4 opacity-10">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 16L12 22L22 16M2 12L12 18L22 12M12 2L2 8L12 14L22 8L12 2Z" />
              </svg>
            </div>
          </div>
        </div>

        <p className="mt-6 mt-8 text-center text-xs text-gray-400">
          * Assumes an average conservative call connection duration of {MINS_PER_CALL} minutes.
          Actual costs may vary depending on LLM selection and telephony integration.
        </p>
      </div>
    </div>
  )
}
