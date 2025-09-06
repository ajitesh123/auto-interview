'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts'
import { useTheme } from 'next-themes'

const data = [
  { department: 'IT', value: 22 },
  { department: 'Product + Engineering', value: 19 },
  { department: 'Customer Support', value: 9 },
  { department: 'Sales', value: 8 },
  { department: 'Data Science', value: 8 },
  { department: 'Marketing', value: 7 },
  { department: 'Human Resources', value: 7 },
  { department: 'Accounting/Finance', value: 7 },
  { department: 'Design', value: 6 },
  { department: 'Legal', value: 3 },
  { department: 'Other', value: 6 },
]

const COLORS = [
  '#FF6B00', // Orange for IT
  '#00B4D8', // Blue for Product + Engineering
  '#4CAF50', // Green for Customer Support
  '#9C27B0', // Purple for Sales
  '#FF9800', // Light Orange for Data Science
  '#E91E63', // Pink for Marketing
  '#3F51B5', // Indigo for HR
  '#607D8B', // Blue Grey for Accounting
  '#795548', // Brown for Design
  '#9E9E9E', // Grey for Legal
  '#BDBDBD', // Light Grey for Other
]

function EnterpriseSpendByDepartmentChart() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const [activeIndex, setActiveIndex] = React.useState(-1)

  // Calculate the angle for each segment
  const getAngle = (index: number) => {
    // Start angle of the segment (in radians)
    const startAngle = (((index * 360) / data.length) * Math.PI) / 180
    // Get the actual value for this segment
    const value = data[index].value
    // Calculate the middle angle of the segment
    const midAngle = startAngle + (value * Math.PI) / 100
    return midAngle
  }

  const onPieEnter = (event: unknown, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(-1)
  }

  const chartColors = {
    background: isDark ? '#000000' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    tooltip: {
      background: isDark ? '#374151' : '#ffffff',
      border: isDark ? '#374151' : '#e5e7eb',
      text: isDark ? '#ffffff' : '#000000',
    },
  }

  return (
    <div className={`h-full w-full rounded-lg p-6 shadow-lg ${isDark ? 'bg-black' : 'bg-white'}`}>
      <h2 className={`mb-6 text-center text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
        Enterprise AI Spend by Department
      </h2>
      <div className="h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={180}
              fill="#8884d8"
              dataKey="value"
              nameKey="department"
              label={false}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              animationBegin={0}
              animationDuration={400}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  transform={`translate(${
                    activeIndex === index ? -Math.cos(getAngle(index)) * 20 : 0
                  }, ${activeIndex === index ? -Math.sin(getAngle(index)) * 20 : 0})`}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}%`, name]}
              contentStyle={{
                backgroundColor: isDark ? '#000000' : '#ffffff',
                borderColor: isDark ? '#374151' : '#e5e7eb',
                color: isDark ? '#ffffff' : '#000000',
                padding: '8px 12px',
                borderRadius: '6px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              }}
              labelStyle={{ color: isDark ? '#ffffff' : '#000000' }}
              itemStyle={{ color: isDark ? '#ffffff' : '#000000' }}
            />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              formatter={(value, entry, index) => (
                <span style={{ color: chartColors.text, fontSize: '0.9rem' }}>
                  {`${value} (${data[index].value}%)`}
                </span>
              )}
              wrapperStyle={{
                paddingLeft: '20px',
                maxWidth: '200px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(EnterpriseSpendByDepartmentChart), {
  ssr: false,
})
