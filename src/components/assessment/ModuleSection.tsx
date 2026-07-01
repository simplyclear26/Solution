'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { AssessmentStep } from '@/lib/types'

interface Module {
  id: string
  label: string
  steps: AssessmentStep[]
}

interface ModuleSectionProps {
  module: Module
  moduleIndex: number
  totalModules: number
  sectionNumber: number
  totalSections: number
  overallProgress: number
  existingAnswers: Record<string, string>
  onComplete: (answers: Record<string, string>) => void
  onBack: () => void
}

const MODULE_INTROS: Record<string, string> = {
  leadership:     'The single greatest predictor of change success — or failure. These questions are about what is actually happening, not what should be.',
  clarity:        'Change without clarity is noise. These questions assess whether your people genuinely understand what is changing and why.',
  people:         'Every change affects real people in real ways. These questions surface the human reality of what you are asking your workforce to do.',
  capability:     'Having a plan is not the same as having the capability to deliver it. These questions assess the infrastructure behind your change.',
  communication:  'Most organisations communicate about change. Fewer do it well. These questions test whether your communication is actually landing.',
  momentum:       'A change can be well-designed and still stall. These questions look at the energy and motion behind your initiative.',
  sustainability: 'The most common failure point in change management is not the launch — it is what happens six months later. These questions assess embedding.',
}

export function ModuleSection({
  module, moduleIndex, totalModules, sectionNumber, totalSections,
  overallProgress, existingAnswers, onComplete, onBack
}: ModuleSectionProps) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>(existingAnswers)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [showIntro, setShowIntro] = useState(true)

  const step = module.steps[current]
  const isLast = current === module.steps.length - 1
  const isAnswered = answers[step?.id] !== undefined

  function selectOption(val: string) {
    setAnswers(prev => ({ ...prev, [step.id]: val }))
  }

  function goNext() {
    if (!isAnswered) return
    if (isLast) { onComplete(answers); return }
    setDirection(1)
    setCurrent(c => c + 1)
  }

  function goBack() {
    if (current > 0) {
      setDirection(-1)
      setCurrent(c => c - 1)
    } else {
      onBack()
    }
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  }

  const cols = step?.cols === 4
    ? 'grid-cols-2 sm:grid-cols-4'
    : 'grid-cols-1 sm:grid-cols-2'

  if (showIntro) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full">
          {/* Overall progress */}
          <div className="mb-12">
            <div className="flex justify-between text-xs text-[#8E8E93] mb-2">
              <span>Section {sectionNumber} of {totalSections}</span>
              <span>{overallProgress}% complete</span>
            </div>
            <div className="h-[3px] bg-[#E5E3DF] rounded-full overflow-hidden">
              <div className="h-full bg-[#2AB8A0] rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }} />
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-medium tracking-widest uppercase text-[#2AB8A0] mb-3">
              Module {moduleIndex + 1} of {totalModules}
            </p>
            <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] text-[#1C1C1E] tracking-tight mb-4">
              {module.label}
            </h2>
            <p className="text-[#636366] font-light text-lg leading-relaxed mb-10">
              {MODULE_INTROS[module.id] ?? ''}
            </p>
            <p className="text-sm text-[#8E8E93]">{module.steps.length} questions in this module</p>

            <div className="flex gap-4 mt-8">
              <button onClick={onBack}
                className="text-sm text-[#636366] border border-[#E5E3DF] px-6 py-3 rounded-lg hover:border-[#636366] hover:text-[#1C1C1E] transition-all duration-150">
                Back
              </button>
              <button onClick={() => setShowIntro(false)}
                className="group inline-flex items-center gap-2 bg-[#1C1C1E] text-white text-sm font-medium px-8 py-3 rounded-lg hover:bg-[#3A3A3C] transition-all duration-150">
                Begin this module
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-6 max-w-3xl mx-auto">

      {/* Overall progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-[#8E8E93] mb-2">
          <span>{module.label} — question {current + 1} of {module.steps.length}</span>
          <span>{overallProgress}% complete</span>
        </div>
        <div className="h-[3px] bg-[#E5E3DF] rounded-full overflow-hidden">
          <div className="h-full bg-[#2AB8A0] rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }} />
        </div>
      </div>

      {/* Module progress dots */}
      <div className="flex gap-1 mb-10">
        {module.steps.map((_, i) => (
          <div key={i} className={[
            'h-0.5 rounded-full flex-1 transition-all duration-300',
            i < current ? 'bg-[#2AB8A0]' : i === current ? 'bg-[#2AB8A0] opacity-50' : 'bg-[#E5E3DF]',
          ].join(' ')} />
        ))}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={current} custom={direction} variants={variants}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}>

          <h2 className="font-serif text-[1.65rem] leading-[1.25] text-[#1C1C1E] mb-3">
            {step.question}
          </h2>
          {step.hint && (
            <p className="text-sm text-[#636366] font-light mb-6 leading-relaxed">{step.hint}</p>
          )}

          <div className={`grid gap-2.5 ${cols}`}>
            {step.options?.map(opt => {
              const active = answers[step.id] === opt.val
              return (
                <button key={opt.val} onClick={() => selectOption(opt.val)}
                  className={[
                    'text-left px-4 py-3.5 rounded-lg border transition-all duration-150',
                    active
                      ? 'border-[#2AB8A0] bg-[#E8F8F5] shadow-[0_0_0_3px_rgba(42,184,160,0.12)]'
                      : 'border-[#E5E3DF] bg-white hover:border-[#2AB8A0] hover:bg-[#E8F8F5]',
                  ].join(' ')}>
                  <span className="block text-sm font-medium text-[#1C1C1E] leading-tight">{opt.label}</span>
                  {opt.sub && <span className="block text-xs text-[#8E8E93] mt-0.5">{opt.sub}</span>}
                </button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="flex justify-between mt-12 gap-4">
        <button onClick={goBack}
          className="text-sm text-[#636366] border border-[#E5E3DF] px-6 py-3 rounded-lg hover:border-[#636366] hover:text-[#1C1C1E] transition-all duration-150">
          Back
        </button>
        <button onClick={goNext} disabled={!isAnswered}
          className="ml-auto inline-flex items-center gap-2 bg-[#1C1C1E] text-white text-sm font-medium px-7 py-3 rounded-lg disabled:bg-[#E5E3DF] disabled:text-[#8E8E93] disabled:cursor-not-allowed hover:bg-[#3A3A3C] transition-all duration-150">
          {isLast ? 'Complete this module' : 'Continue'}
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
