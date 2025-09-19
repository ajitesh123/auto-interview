'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'

function MarketComparisonChart() {
  const [aiMarketSize, setAiMarketSize] = useState(3)
  const [isVisible, setIsVisible] = useState(false)
  const maxAIMarket = 8000
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  const barVariants = {
    hidden: { width: 0 },
    visible: (custom) => ({
      width: `${custom}%`,
      transition: {
        duration: 1,
        ease: 'easeOut',
        delay: 0.3,
      },
    }),
  }

  return (
    <motion.div
      className={`min-h-fit w-full ${isDark ? 'bg-black' : 'bg-white'} p-8 ${isDark ? 'text-white' : 'text-gray-900'}`}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <div className="flex flex-col items-center gap-8">
        {/* 2010 Cloud/Software */}
        <motion.div className="flex flex-col items-center gap-4" variants={itemVariants}>
          <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg font-semibold`}>
            2010: Cloud in Software Market
          </div>
          <div className="relative h-12 w-96">
            <div
              className={`absolute h-full w-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-full`}
            />
            <motion.div
              className="absolute h-full rounded-full bg-emerald-500"
              variants={barVariants}
              custom={(6 / 350) * 100}
              whileHover={{ scale: 1.02 }}
            />
            <motion.div
              className="absolute top-12 w-full pt-2 text-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="text-emerald-500">Cloud: $6B</span>
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}> of </span>
              <span className={`${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Total Software Market: $350B
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* 2024 Cloud/Software */}
        <motion.div className="flex flex-col items-center gap-4" variants={itemVariants}>
          <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg font-semibold`}>
            2024: Cloud Dominance in Software
          </div>
          <div className="relative h-12 w-96">
            <div
              className={`absolute h-full w-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-full`}
            />
            <motion.div
              className="absolute h-full rounded-full bg-emerald-500"
              variants={barVariants}
              custom={(400 / 650) * 100}
              whileHover={{ scale: 1.02 }}
            />
            <motion.div
              className="absolute top-12 w-full pt-2 text-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="text-emerald-500">Cloud: $400B</span>
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}> of </span>
              <span className={`${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Total Software Market: $650B
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* 2024 AI/Total Market */}
        <motion.div className="flex flex-col items-center gap-4" variants={itemVariants}>
          <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg font-semibold`}>
            AI in Software & Services Market
          </div>
          <div className="relative h-12 w-96">
            <div
              className={`absolute h-full w-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-full`}
            />
            <motion.div
              className="absolute h-full rounded-full bg-emerald-500"
              animate={{ width: `${(aiMarketSize / 10000) * 100}%` }}
              transition={{ type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute right-0 h-full w-1 bg-emerald-300"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <motion.div
              className="absolute top-12 w-full pt-2 text-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="text-emerald-500">AI: ${aiMarketSize}B</span>
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}> of </span>
              <span className={`${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Total Software & Services: $10T+ (2024)
              </span>
            </motion.div>
          </div>

          {/* Interactive Slider */}
          <motion.div className="mt-8 w-96" whileTap={{ scale: 0.98 }}>
            <input
              type="range"
              min="3"
              max={maxAIMarket}
              value={aiMarketSize}
              onChange={(e) => setAiMarketSize(Number(e.target.value))}
              className={`h-2 w-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'} cursor-pointer appearance-none rounded-lg transition-all duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
            />
            <motion.div
              className="mt-2 flex justify-between text-xs text-gray-400"
              animate={{ opacity: [0.7, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
            >
              <span>Current ($3B)</span>
              <span>Projected Growth Potential ($5T)</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default dynamic(() => Promise.resolve(MarketComparisonChart), {
  ssr: false,
})
