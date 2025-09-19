'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts'
import { useTheme } from 'next-themes'

const data = [
  {
    company: 'OpenAI',
    share2023: 50,
    share2024: 34,
    yoyGain: -16,
  },
  {
    company: 'Anthropic',
    share2023: 12,
    share2024: 24,
    yoyGain: 12,
  },
  {
    company: 'Meta',
    share2023: 16,
    share2024: 16,
    yoyGain: 0,
  },
  {
    company: 'Google',
    share2023: 7,
    share2024: 12,
    yoyGain: 5,
  },
  {
    company: 'Mistral AI',
    share2023: 6,
    share2024: 5,
    yoyGain: -1,
  },
  {
    company: 'Cohere',
    share2023: 3,
    share2024: 3,
    yoyGain: 0,
  },
  {
    company: 'Internal model',
    share2023: 3,
    share2024: 3,
    yoyGain: 0,
  },
  {
    company: 'Other',
    share2023: 3,
    share2024: 3,
    yoyGain: 0,
  },
]

function LLMMarketShareChart() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const chartColors = {
    background: isDark ? '#000000' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    grid: isDark ? '#333333' : '#e5e7eb',
    bar2023: isDark ? '#4B5563' : '#9CA3AF', // Lighter gray for 2023
    bar2024: isDark ? '#6B7280' : '#6B7280', // Darker gray for 2024
    tooltip: {
      background: isDark ? '#1F2937' : '#ffffff',
      border: isDark ? '#374151' : '#e5e7eb',
      text: isDark ? '#ffffff' : '#000000',
    },
  }

  return (
    <div className={`h-full w-full rounded-lg p-6 shadow-lg ${isDark ? 'bg-black' : 'bg-white'}`}>
      <h2 className={`mb-6 text-center text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
        LLM Market Share Evolution
      </h2>
      <div className="h-[500px]">
        {' '}
        {/* Increased height for better visibility */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
            barGap={8} // Add gap between bars of same category
            barCategoryGap={20} // Add gap between different categories
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke={chartColors.grid}
              opacity={0.3}
            />
            <XAxis
              type="number"
              domain={[0, 60]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: chartColors.text }}
              axisLine={{ stroke: chartColors.grid }}
              tickLine={{ stroke: chartColors.grid }}
            />
            <YAxis
              type="category"
              dataKey="company"
              tick={{ fill: chartColors.text }}
              axisLine={{ stroke: chartColors.grid }}
              tickLine={{ stroke: chartColors.grid }}
            />
            <Tooltip
              formatter={(value, name) => [`${value}%`, name]}
              contentStyle={{
                backgroundColor: chartColors.tooltip.background,
                borderColor: chartColors.tooltip.border,
                color: chartColors.tooltip.text,
                borderRadius: '6px',
                padding: '8px 12px',
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '20px',
              }}
            />
            <Bar
              dataKey="share2023"
              name="2023 Market Share"
              fill={chartColors.bar2023}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
            <Bar
              dataKey="share2024"
              name="2024 Market Share"
              fill={chartColors.bar2024}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-8 grid grid-cols-4 gap-6 text-sm">
        {data.map(
          (item) =>
            item.yoyGain !== 0 && (
              <div key={item.company} className="text-center">
                <div className={`font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {item.company}
                </div>
                <div
                  className={`${
                    item.yoyGain > 0 ? 'text-emerald-500' : 'text-red-500'
                  } font-medium`}
                >
                  {item.yoyGain > 0 ? '+' : ''}
                  {item.yoyGain}% YoY
                </div>
              </div>
            )
        )}
      </div>
      <div className={`mt-6 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        Source: Menlo Ventures, 2024
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(LLMMarketShareChart), {
  ssr: false,
})
