'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { useTheme } from 'next-themes'

const vcData = [
  { year: '2023', value: 21 },
  { year: '2024', value: 12 },
]

const arrData = [
  { company: 'Github Copilot', value: 100 },
  { company: 'MidJourney', value: 200 },
  { company: 'Glean', value: 40 },
]

const comparisonData = [
  { metric: 'Revenue ($B)', openai: 10, google: 3.2 },
  { metric: 'Valuation ($B)', openai: 150, google: 23 },
  { metric: 'Age (Years)', openai: 8, google: 6 },
]

const MetricRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between border-b border-gray-800 py-2">
    <span className="text-gray-400">{label}</span>
    <span className="font-bold text-gray-200">{value}</span>
  </div>
)

function InvestmentMetricsChart() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const chartColors = {
    background: isDark ? '#111827' : '#ffffff',
    border: isDark ? '#374151' : '#e5e7eb',
    text: isDark ? '#9CA3AF' : '#4B5563',
    openai: isDark ? '#60A5FA' : '#3B82F6', // Blue for OpenAI
    google: isDark ? '#F472B6' : '#EC4899', // Pink for Google
    tooltip: {
      background: isDark ? '#1F2937' : '#ffffff',
      border: isDark ? '#374151' : '#e5e7eb',
      text: isDark ? '#E5E7EB' : '#111827',
    },
  }

  return (
    <div className="h-full w-full rounded-lg bg-white p-4 shadow-lg dark:bg-black">
      {/* Upper Grid - Two Columns */}
      <div className="mb-8 grid grid-cols-2 gap-6">
        {/* Left Column - VC Investment */}
        <div className="rounded border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-black">
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">VC Investment</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vcData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <XAxis
                  dataKey="year"
                  tick={{ fill: chartColors.text }}
                  axisLine={{ stroke: chartColors.border }}
                />
                <YAxis
                  tick={{ fill: chartColors.text }}
                  axisLine={{ stroke: chartColors.border }}
                  label={{
                    value: 'Billion $',
                    angle: -90,
                    position: 'insideLeft',
                    fill: chartColors.text,
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartColors.tooltip.background,
                    border: `1px solid ${chartColors.tooltip.border}`,
                    color: chartColors.tooltip.text,
                  }}
                />
                <Bar dataKey="value" fill={chartColors.openai} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column - ARR */}
        <div className="rounded border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-black">
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">Notable ARR</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={arrData}
                layout="vertical"
                margin={{ top: 10, right: 10, left: 100, bottom: 20 }}
              >
                <XAxis
                  type="number"
                  tick={{ fill: chartColors.text }}
                  axisLine={{ stroke: chartColors.border }}
                />
                <YAxis
                  type="category"
                  dataKey="company"
                  tick={{ fill: chartColors.text }}
                  axisLine={{ stroke: chartColors.border }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartColors.tooltip.background,
                    border: `1px solid ${chartColors.tooltip.border}`,
                    color: chartColors.tooltip.text,
                  }}
                  formatter={(value) => [`$${value}M`, 'ARR']}
                />
                <Bar dataKey="value" fill={chartColors.openai} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Middle Row - OpenAI vs Google Comparison */}
      <div className="mb-8 rounded border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-black">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            OpenAI vs Google at IPO
          </h2>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: chartColors.openai }}
              ></div>
              <span className="text-gray-600 dark:text-gray-400">OpenAI</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: chartColors.google }}
              ></div>
              <span className="text-gray-600 dark:text-gray-400">Google</span>
            </div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis
                dataKey="metric"
                tick={{ fill: chartColors.text }}
                axisLine={{ stroke: chartColors.border }}
              />
              <YAxis tick={{ fill: chartColors.text }} axisLine={{ stroke: chartColors.border }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartColors.tooltip.background,
                  border: `1px solid ${chartColors.tooltip.border}`,
                  color: chartColors.tooltip.text,
                }}
                formatter={(value, name) => [
                  `${value} ${name === 'openai' ? '(OpenAI)' : '(Google)'}`,
                  '',
                ]}
              />
              <Bar dataKey="openai" name="OpenAI" fill={chartColors.openai} />
              <Bar dataKey="google" name="Google" fill={chartColors.google} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          OpenAI Valuation: $150B | Current Revenue: $10B
        </div>
      </div>

      {/* Bottom Section - Infrastructure Investment */}
      <div className="rounded border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-black">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">
              Infrastructure Investment
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Based on GPU Accelerator Market
            </p>
          </div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">$300B</div>
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(InvestmentMetricsChart), {
  ssr: false,
})
