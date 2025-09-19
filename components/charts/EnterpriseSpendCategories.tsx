'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { useTheme } from 'next-themes'

const data = [
  {
    category: 'Vertical AI',
    spend2023: 15,
    spend2024: 42,
    growth: 180,
    highlight: true,
  },
  {
    category: 'Department AI',
    spend2023: 12,
    spend2024: 31,
    growth: 158,
    highlight: true,
  },
  {
    category: 'Developer Tools',
    spend2023: 18,
    spend2024: 28,
    growth: 56,
    highlight: false,
  },
  {
    category: 'Infrastructure',
    spend2023: 22,
    spend2024: 25,
    growth: 14,
    highlight: false,
  },
  {
    category: 'Foundation Models',
    spend2023: 20,
    spend2024: 22,
    growth: 10,
    highlight: false,
  },
  {
    category: 'Enterprise Platforms',
    spend2023: 25,
    spend2024: 20,
    growth: -20,
    highlight: false,
  },
]

function EnterpriseSpendCategoriesChart() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const chartColors = {
    background: isDark ? '#000000' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    bar2023: isDark ? '#4B5563' : '#9CA3AF',
    bar2024: '#FF6B00',
    highlight: '#10B981',
    tooltip: {
      background: isDark ? '#1F2937' : '#ffffff',
      border: isDark ? '#374151' : '#e5e7eb',
      text: isDark ? '#ffffff' : '#000000',
    },
  }

  // Custom shape for the 2024 bars that includes the pulsing outline for highlighted items
  const CustomBar = (props) => {
    const { x, y, width, height, fill, highlight } = props

    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill={fill} rx={4} ry={4} />
        {highlight && (
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill="none"
            stroke={chartColors.highlight}
            strokeWidth={2}
            rx={4}
            ry={4}
            className="animate-pulse"
          />
        )}
      </g>
    )
  }

  return (
    <div className={`h-full w-full rounded-lg p-6 shadow-lg ${isDark ? 'bg-black' : 'bg-white'}`}>
      <h2 className={`mb-6 text-center text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
        Enterprise AI Spend by Category
      </h2>
      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 120, left: 150, bottom: 5 }}
          >
            <XAxis
              type="number"
              domain={[0, 45]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: chartColors.text }}
            />
            <YAxis
              type="category"
              dataKey="category"
              tick={{
                fill: chartColors.text,
                textAnchor: 'end',
              }}
              width={140}
            />
            <Tooltip
              formatter={(value, name) => [
                `${value}%`,
                name === 'spend2023' ? '2023 Spend' : '2024 Spend',
              ]}
              contentStyle={{
                backgroundColor: chartColors.tooltip.background,
                borderColor: chartColors.tooltip.border,
                color: chartColors.tooltip.text,
              }}
            />
            <Legend />
            <Bar
              dataKey="spend2023"
              name="2023"
              fill={chartColors.bar2023}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
            <Bar
              dataKey="spend2024"
              name="2024"
              fill={chartColors.bar2024}
              barSize={24}
              radius={[4, 4, 4, 4]}
              shape={(props) => <CustomBar {...props} highlight={data[props.index].highlight} />}
              label={(props) => {
                const { x, y, width, value, index } = props
                const growth = data[index].growth
                return (
                  <text
                    x={x + width + 10}
                    y={y + 12}
                    fill={growth >= 0 ? '#10B981' : '#EF4444'}
                    fontSize={12}
                    textAnchor="start"
                    className={data[index].highlight ? 'animate-shuttle' : ''}
                  >
                    {growth >= 0 ? '+' : ''}
                    {growth}%
                  </text>
                )
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div
        className={`mt-4 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
      ></div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(EnterpriseSpendCategoriesChart), {
  ssr: false,
})
