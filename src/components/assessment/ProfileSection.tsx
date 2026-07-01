'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { AssessmentStep } from '@/lib/types'
import { SectionProgress } from '@/components/SectionProgress'

interface ProfileSectionProps {
  title: string
  subtitle: string
  steps: AssessmentStep[]
  sectionNumber: number
  totalSections: number
  initialAnswers?: Record<string, string>
  onComplete: (answers: Record<string, string>) => void
  currentSection: string
  completedSections: string[]
}

export function ProfileSection({ title, subtitle, steps, sectionNumber, totalSections, initialAnswers = {}, onComplete, currentSection, completedSections }: ProfileSectionProps) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers)
  const [direction, setDirection] = useState<1 | -1>(1)

  const step = steps[current]
  const isLast = current === steps.length - 1
  const isAnswered = step.type === 'text'
    ? (answers[step.id] ?? '').trim().length > 0
    : answers[step.id] !== undefined

  const overallPct = Math.round(((sectionNumber - 1) / totalSections) * 100)

  function selectOption(val: string) { setAnswers(prev => ({ ...prev, [step.id]: val })) }

  function goNext() {
    if (!isAnswered) return
    if (isLast) { onComplete(answers); return }
    setDirection(1); setCurrent(c => c + 1)
  }

  function goBack() {
    if (current === 0) return
    setDirection(-1); setCurrent(c => c - 1)
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  }

  const cols = step.cols === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'

  return (
    <div className="min-h-screen py-12 px-6 max-w-3xl mx-auto pb-28">

      <div className="mb-10">
        <div className="flex justify-between text-xs text-[#8E8E93] mb-2">
          <span>Section {sectionNumber} of {totalSections}</span>
          <span>{overallPct}% complete</span>
        </div>
        <div className="h-[3px] bg-[#E5E3DF] rounded-full overflow-hidden">
          <motion.div className="h-full bg-[#2AB8A0] rounded-full"
            initial={{ width: 0 }} animate={{ width: `${overallPct}%` }} transition={{ duration: 0.4 }} />
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs font-medium tracking-widest uppercase text-[#2AB8A0] mb-2">{title}</p>
        <p className="text-sm text-[#636366] font-light">{subtitle}</p>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={current} custom={direction} variants={variants}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}>

          <h2 className="font-serif text-[1.7rem] leading-[1.25] text-[#1C1C1E] mb-2">{step.question}</h2>
          {step.hint && <p className="text-sm text-[#636366] font-light mb-6">{step.hint}</p>}

          {step.type === 'text' ? (
            <input type="text" value={answers[step.id] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, [step.id]: e.target.value }))}
              onKeyDown={e => { if (e.key === 'Enter' && isAnswered) goNext() }}
              placeholder="Type your answer here"
              className="w-full px-5 py-4 text-base border border-[#E5E3DF] rounded-lg focus:outline-none focus:border-[#2AB8A0] transition-colors bg-white mt-2"
              autoFocus />
          ) : (
            <div className={`grid gap-2.5 ${cols}`}>
              {step.options?.map(opt => {
                const active = answers[step.id] === opt.val
                return (
                  <button key={opt.val} onClick={() => selectOption(opt.val)}
                    className={['text-left px-4 py-3.5 rounded-lg border transition-all duration-150',
                      active ? 'border-[#2AB8A0] bg-[#E8F8F5] shadow-[0_0_0_3px_rgba(42,184,160,0.12)]'
                             : 'border-[#E5E3DF] bg-white hover:border-[#2AB8A0] hover:bg-[#E8F8F5]'
                    ].join(' ')}>
                    <span className="block text-sm font-medium text-[#1C1C1E] leading-tight">{opt.label}</span>
                    {opt.sub && <span className="block text-xs text-[#8E8E93] mt-0.5">{opt.sub}</span>}
                  </button>
                )
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-12 gap-4">
        {current > 0 ? (
          <button onClick={goBack} className="text-sm text-[#636366] border border-[#E5E3DF] px-6 py-3 rounded-lg hover:border-[#636366] hover:text-[#1C1C1E] transition-all">Back</button>
        ) : <div />}
        <button onClick={goNext} disabled={!isAnswered}
          className="ml-auto inline-flex items-center gap-2 bg-[#1C1C1E] text-white text-sm font-medium px-7 py-3 rounded-lg disabled:bg-[#E5E3DF] disabled:text-[#8E8E93] disabled:cursor-not-allowed hover:bg-[#3A3A3C] transition-all">
          {isLast ? 'Continue to assessment' : 'Continue'}
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      <div className="flex justify-center gap-1.5 mt-8">
        {steps.map((_, i) => (
          <div key={i} className={['w-1.5 h-1.5 rounded-full transition-all duration-200',
            i === current ? 'bg-[#2AB8A0] w-4' : i < current ? 'bg-[#2AB8A0]' : 'bg-[#E5E3DF]'
          ].join(' ')} />
        ))}
      </div>

      <SectionProgress currentSection={currentSection} completedSections={completedSections} />
    </div>
  )
}
