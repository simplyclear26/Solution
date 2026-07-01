'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GeneratingProps {
  orgName: string
  initName: string
}

const MESSAGES = [
  'Reading your responses carefully',
  'Identifying patterns and risk signals',
  'Building your risk register',
  'Sequencing your 90-day action plan',
  'Preparing your communication guide',
  'Composing your executive briefing',
  'Finalising your report',
]

export function Generating({ orgName, initName }: GeneratingProps) {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(i => Math.min(i + 1, MESSAGES.length - 1))
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#FAF8F4]">
      <div className="text-center max-w-lg">
        {/* Animated dots */}
        <div className="flex justify-center gap-2 mb-10">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-[#2AB8A0]"
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>

        <h2 className="font-serif text-2xl text-[#1C1C1E] mb-3">
          Building your report
        </h2>

        {orgName && initName && (
          <p className="text-sm text-[#8E8E93] mb-6 font-light">
            {initName} at {orgName}
          </p>
        )}

        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-sm text-[#636366] font-light"
          >
            {MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="mt-8 h-[2px] bg-[#E5E3DF] rounded-full overflow-hidden max-w-xs mx-auto">
          <motion.div
            className="h-full bg-[#2AB8A0] rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  )
}
