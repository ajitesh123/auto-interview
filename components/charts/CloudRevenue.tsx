'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { quarter: "Q1'22", AWS: 74, Azure: 32, GoogleCloud: 23, Growth: 40 },
  { quarter: "Q2'22", AWS: 79, Azure: 36, GoogleCloud: 25, Growth: 35 },
  { quarter: "Q3'22", AWS: 82, Azure: 38, GoogleCloud: 27, Growth: 31 },
  { quarter: "Q4'22", AWS: 86, Azure: 41, GoogleCloud: 29, Growth: 25 },
  { quarter: "Q1'23", AWS: 85, Azure: 40, GoogleCloud: 30, Growth: 21 },
  { quarter: "Q2'23", AWS: 89, Azure: 45, GoogleCloud: 32, Growth: 19 },
  { quarter: "Q3'23", AWS: 92, Azure: 49, GoogleCloud: 34, Growth: 19 },
  { quarter: "Q4'23", AWS: 97, Azure: 54, GoogleCloud: 37, Growth: 21 },
  { quarter: "Q1'24", AWS: 100, Azure: 54, GoogleCloud: 38, Growth: 24 },
  { quarter: "Q2'24", AWS: 105, Azure: 61, GoogleCloud: 41, Growth: 25 },
  { quarter: "Q3'24", AWS: 110, Azure: 66, GoogleCloud: 45, Growth: 26 },
]

function CloudRevenueChart() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const chartColors = {
    background: isDark ? '#000000' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    grid: isDark ? '#333333' : '#e5e7eb',
    tooltip: {
      background: isDark ? '#1a1a1a' : '#ffffff',
      border: isDark ? '#333333' : '#e5e7eb',
      text: isDark ? '#ffffff' : '#000000',
    },
  }

  return (
    <div className={`h-full w-full rounded-lg p-4 shadow-lg ${isDark ? 'bg-black' : 'bg-white'}`}>
      <h2 className={`mb-4 text-center text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
        Cloud Services Quarterly Revenue and YoY Growth
      </h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis
              dataKey="quarter"
              tick={{ fill: chartColors.text }}
              axisLine={{ stroke: chartColors.text }}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: chartColors.text }}
              axisLine={{ stroke: chartColors.text }}
              label={{
                value: 'Revenue (Billions USD)',
                angle: -90,
                position: 'insideLeft',
                fill: chartColors.text,
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 50]}
              tick={{ fill: chartColors.text }}
              axisLine={{ stroke: chartColors.text }}
              label={{
                value: 'YoY Growth (%)',
                angle: 90,
                position: 'insideRight',
                fill: chartColors.text,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: chartColors.tooltip.background,
                borderRadius: '8px',
                border: `1px solid ${chartColors.tooltip.border}`,
                color: chartColors.tooltip.text,
              }}
              formatter={(value, name) => [
                `${value}${name === 'Growth' ? '%' : 'B'}`,
                name === 'Growth' ? 'YoY Growth' : name,
              ]}
            />
            <Legend wrapperStyle={{ color: chartColors.text }} />
            <Bar
              yAxisId="left"
              dataKey="AWS"
              stackId="a"
              fill="#FF9900"
              radius={[4, 4, 0, 0]}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Bar
              yAxisId="left"
              dataKey="Azure"
              stackId="a"
              fill="#008AD7"
              radius={[4, 4, 0, 0]}
              animationBegin={500}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Bar
              yAxisId="left"
              dataKey="GoogleCloud"
              stackId="a"
              fill="#34A853"
              radius={[4, 4, 0, 0]}
              animationBegin={1000}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Growth"
              stroke={chartColors.text}
              strokeWidth={3}
              dot={(props) => {
                const { cx, cy, payload, index } = props
                const prevGrowth = index > 0 ? data[index - 1].Growth : payload.Growth

                let color = '#FF1493'
                if (payload.Growth < prevGrowth) {
                  color = '#ff4d4d'
                } else if (payload.Growth > prevGrowth) {
                  color = '#00ff00'
                }

                return (
                  <g>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={6}
                      fill="none"
                      stroke={color}
                      strokeWidth={2}
                      opacity={0.5}
                      className="animate-pulse"
                    />
                    <circle cx={cx} cy={cy} r={4} fill={color} stroke="none" />
                    <text
                      x={cx}
                      y={cy - 15}
                      textAnchor="middle"
                      fill={color}
                      fontSize="12"
                      className="animate-fadeIn"
                    >
                      <tspan
                        style={{
                          filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.8))',
                          backgroundColor: chartColors.background,
                          padding: '2px 4px',
                          borderRadius: '3px',
                        }}
                      >
                        {`${payload.Growth}%`}
                      </tspan>
                    </text>
                  </g>
                )
              }}
              activeDot={{
                r: 8,
                stroke: chartColors.text,
                strokeWidth: 2,
                fill: '#FF1493',
              }}
              animationBegin={1500}
              animationDuration={2000}
              animationEasing="ease-out"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className={`mt-4 text-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        Data shown quarterly from Q1 2022 to Q3 2024
      </div>
    </div>
  )
}

// Export as a dynamic component with SSR disabled
export default dynamic(() => Promise.resolve(CloudRevenueChart), {
  ssr: false,
})
