'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { useTheme } from 'next-themes'

const data = [
  { criteria: 'Easily quantifiable ROI', value: 30 },
  { criteria: 'Customizable for my org/industry', value: 26 },
  { criteria: 'Performance and accuracy', value: 7 },
  { criteria: 'Easy integration with existing IT systems', value: 6 },
  { criteria: 'Robust post-purchase services', value: 5 },
  { criteria: 'Scalability', value: 2 },
  { criteria: 'Inexpensive', value: 1 },
  { criteria: 'Good reputation', value: 1 },
  { criteria: 'Allows for headcount reduction', value: 1 },
  { criteria: 'A tool I use frequently', value: 1 },
  { criteria: 'Existing familiarity', value: 1 },
]

function CriteriaForGenAIChart() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const chartColors = {
    background: isDark ? '#000000' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    bar: isDark ? '#4B5563' : '#9CA3AF', // Gray color for bars
    highlight: {
      stroke: '#FF6B00',
      strokeWidth: 2,
    },
  }

  // Pre-process data to add highlight property for top 2 items
  const processedData = data.map((item, index) => ({
    ...item,
    highlight: index < 2, // First two items get highlighted
  }))

  return (
    <div className={`h-full w-full rounded-lg p-6 shadow-lg ${isDark ? 'bg-black' : 'bg-white'}`}>
      <h2 className={`mb-6 text-center text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
        Selection Criteria for Generative AI Tools
      </h2>
      <div className="h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 200, bottom: 5 }}
          >
            <XAxis
              type="number"
              domain={[0, 35]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: chartColors.text }}
            />
            <YAxis
              type="category"
              dataKey="criteria"
              tick={{
                fill: chartColors.text,
                textAnchor: 'start', // This aligns text to the start (left)
                dx: -180, // This moves the text left by 180 pixels
              }}
              width={180}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, 'Response Rate']}
              contentStyle={{
                backgroundColor: isDark ? '#1F2937' : '#ffffff',
                borderColor: isDark ? '#374151' : '#e5e7eb',
                color: chartColors.text,
              }}
            />
            <Bar
              dataKey="value"
              fill={chartColors.bar}
              radius={[4, 4, 4, 4]}
              animationDuration={1500}
              animationBegin={0}
              label={{
                position: 'right',
                fill: chartColors.text,
                formatter: (value) => `${value}%`,
              }}
              shape={(props) => {
                const { highlight, fill, x, y, width, height } = props
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
                        stroke={chartColors.highlight.stroke}
                        strokeWidth={chartColors.highlight.strokeWidth}
                        rx={4}
                        ry={4}
                      />
                    )}
                  </g>
                )
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={`mt-4 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Source: Menlo Ventures, 2024
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(CriteriaForGenAIChart), {
  ssr: false,
})
