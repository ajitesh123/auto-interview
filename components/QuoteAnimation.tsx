'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'

const quotes = [
  {
    text: 'When you stop chasing the wrong things, you give the right things a chance to catch you',
    author: 'Lolly Daskal',
  },
  {
    text: 'A great product is the secret to long term growth hacking. You should get that right before you worry about anything else.',
    author: 'Sam Altman',
  },
  {
    text: "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
    author: 'Jimmy Dean',
  },
  {
    text: 'The only way to avoid pissing people off is to do nothing important.',
    author: 'Oliver Emberton',
  },
  {
    text: 'The best time to plant a tree was 20 years ago. The second best time is now.',
    author: 'Chinese Proverb',
  },
  {
    text: "Walk out of a meeting … as soon as it is obvious you aren't adding value … It is not rude to leave, it is rude to make someone stay and waste their time.",
    author: 'Elon Musk',
  },
  {
    text: 'Your true essence is not defined by circumstances, but by the choices you make along your path.',
    author: 'Anonymous',
  },
  {
    text: "Time is a created thing. To say 'I don't have time,' is like saying, 'I don't want to.'",
    author: 'Lao Tzu',
  },
  {
    text: 'The biggest risk is not taking any risk',
    author: 'Mark Zuckerberg',
  },
  {
    text: 'Sometimes when you innovate, you make mistakes. It is best to admit them quickly, and get on with improving your other innovations.',
    author: 'Steve Jobs',
  },
  {
    text: "You should never let anybody trap you with anything you've said in the past. Life is complicated; the world is complicated.",
    author: 'Jeff Bezos',
  },
  {
    text: 'Those who wish to sing always find a song.',
    author: 'Swedish proverb',
  },
  {
    text: 'Some things are up to us, and some things are not up to us.',
    author: 'Epictetus, Stoic philosopher',
  },
  {
    text: 'Criticism may not be agreeable, but it is necessary. It fulfils the same function as pain in the human body. It calls attention to an unhealthy state of things.',
    author: 'Winston Churchill',
  },
]

export default function QuoteAnimation() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className={`flex min-h-[400px] items-center justify-center ${isDark ? 'bg-gradient-to-r from-purple-900 via-pink-900 to-red-900' : 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'}`}
    >
      <div
        className={`mx-4 w-full max-w-2xl rounded-lg p-6 ${isDark ? 'bg-white' : 'bg-white'} shadow-xl`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuoteIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <blockquote
              className={`mb-4 text-xl font-semibold md:text-2xl ${isDark ? 'text-gray-900' : 'text-gray-900'}`}
            >
              &ldquo;{quotes[currentQuoteIndex].text}&rdquo;
            </blockquote>
            <cite className={`text-sm md:text-base ${isDark ? 'text-gray-600' : 'text-gray-600'}`}>
              - {quotes[currentQuoteIndex].author}
            </cite>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
